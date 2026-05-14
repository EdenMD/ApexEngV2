'use strict';
/**
 * encoder.js
 * 
 * High-quality video encoder using FFmpeg.
 * Accepts JPEG frame stream via stdin, mixes audio, outputs MP4.
 * 
 * Output spec (social media optimised):
 *   - 1080×1920 (9:16 portrait) or custom from config
 *   - H.264 High 4.1, CRF 18, preset medium
 *   - AAC 192kbps stereo
 *   - faststart (web/mobile playback)
 *   - yuv420p (universal compatibility)
 */

const { spawn } = require('child_process');
const path      = require('path');
const fs        = require('fs');

class VideoEncoder {
    /**
     * @param {object} opts
     * @param {string} opts.outPath      - output .mp4 file path
     * @param {number} opts.fps          - frames per second (default 30)
     * @param {number} opts.width        - frame width  (default 1080)
     * @param {number} opts.height       - frame height (default 1920)
     * @param {string[]} opts.audioPaths - array of WAV paths to mix
     * @param {object} opts.audioMix     - {volumes: [0.9, 0.3], bgLoop: true}
     * @param {string} opts.bgMusic      - optional background music file
     * @param {number} opts.bgMusicVol   - background music volume 0-1 (default 0.25)
     * @param {number} opts.crf          - quality (default 18, lower=better)
     * @param {string} opts.preset       - ffmpeg preset (default 'medium')
     * @param {string} opts.format       - 'portrait' | 'landscape' | 'square'
     */
    constructor(opts = {}) {
        this.opts     = opts;
        this.outPath  = opts.outPath || 'output.mp4';
        this.fps      = opts.fps    || 30;
        this.crf      = opts.crf    || 18;
        this.preset   = opts.preset || 'medium';

        // Resolve dimensions from format shorthand
        const fmt = opts.format || 'portrait';
        if (opts.width && opts.height) {
            this.W = opts.width; this.H = opts.height;
        } else {
            const dims = { portrait: [1080,1920], landscape: [1920,1080], square: [1080,1080] };
            [this.W, this.H] = dims[fmt] || dims.portrait;
        }

        this.proc     = null;
        this.started  = false;
        this.frameCount = 0;
        this._dead    = false;   // true once ffmpeg stdin is closed/errored
    }

    /**
     * Start the FFmpeg process.
     * Audio files are mixed together and merged with video.
     */
    async start(audioPaths = [], bgMusic = null, bgMusicVol = 0.25) {
        const args = this._buildArgs(audioPaths, bgMusic, bgMusicVol);

        console.log('[Encoder] Starting FFmpeg...');
        console.log('[Encoder] Output:', this.outPath);
        console.log('[Encoder] Size:', `${this.W}×${this.H}`, '| FPS:', this.fps, '| CRF:', this.crf, '| Preset:', this.preset);

        this.proc = spawn('ffmpeg', args, {
            stdio: ['pipe', 'pipe', 'pipe']
        });

        // Silence EPIPE — we guard writes with this._dead instead
        this.proc.stdin.on('error', (err) => {
            if (err.code === 'EPIPE' || err.code === 'ERR_STREAM_DESTROYED') {
                this._dead = true;
            } else {
                console.warn('[Encoder] stdin error:', err.message);
            }
        });

        this.proc.stderr.on('data', d => {
            const msg = d.toString();
            if (msg.includes('frame=') || msg.includes('Error') || msg.includes('error')) {
                process.stderr.write('[FFmpeg] ' + msg.split('\n')[0] + '\n');
            }
        });

        this.proc.stdout.on('data', () => {});

        this.started = true;
        this._closePromise = new Promise((resolve, reject) => {
            this.proc.on('close', code => {
                this._dead = true;
                if (code === 0) {
                    const stat = fs.existsSync(this.outPath) ? fs.statSync(this.outPath) : null;
                    const mb   = stat ? (stat.size/1024/1024).toFixed(1) : '?';
                    console.log(`[Encoder] ✓ Done — ${mb} MB — ${this.frameCount} frames`);
                    resolve(this.outPath);
                } else {
                    reject(new Error(`FFmpeg exited with code ${code}`));
                }
            });
            this.proc.on('error', (err) => { this._dead = true; reject(err); });
        });

        return this._closePromise;
    }

    /**
     * Write a JPEG frame buffer to stdin.
     * Returns false if encoder is no longer accepting frames.
     */
    writeFrame(jpegBuffer) {
        if (this._dead || !this.proc || !this.proc.stdin.writable) return false;
        try {
            this.frameCount++;
            const ok = this.proc.stdin.write(jpegBuffer);
            // Basic backpressure: if buffer is full, we just continue (CI is single-threaded)
            return ok;
        } catch (e) {
            this._dead = true;
            return false;
        }
    }

    /**
     * Signal end of frames then wait for FFmpeg to finish.
     */
    async finish() {
        if (!this._dead && this.proc && this.proc.stdin.writable) {
            await new Promise(r => this.proc.stdin.end(r));
        }
        return this._closePromise;
    }

    // ── FFmpeg argument builder ─────────────────────────────────────────────
    _buildArgs(audioPaths, bgMusic, bgMusicVol) {
        const args = ['-y'];

        // ── Video input (JPEG pipe) ──────────────────────────────────────────
        args.push(
            '-f',   'image2pipe',
            '-vcodec', 'mjpeg',
            '-r',   String(this.fps),
            '-i',   'pipe:0'
        );

        // ── Audio inputs ─────────────────────────────────────────────────────
        // Scene WAV files are CONCATENATED sequentially (not mixed in parallel)
        const voicePaths = audioPaths.filter(ap => ap && fs.existsSync(ap) && fs.statSync(ap).size > 100);
        for (const ap of voicePaths) args.push('-i', ap);

        const hasBg  = bgMusic && fs.existsSync(bgMusic);
        if (hasBg) args.push('-stream_loop', '-1', '-i', bgMusic);

        const nVoice   = voicePaths.length;
        const hasAudio = nVoice > 0 || hasBg;

        // ── Filter complex ──────────────────────────────────────────────────
        if (hasAudio) {
            const parts = [];

            if (nVoice > 0) {
                // Normalise every voice track to 44100 stereo
                for (let i = 0; i < nVoice; i++) {
                    parts.push(`[${i+1}:a]aresample=44100,aformat=channel_layouts=stereo[a${i}]`);
                }
                // CONCAT all scenes end-to-end  →  [voice]
                if (nVoice === 1) {
                    parts.push(`[a0]anull[voice]`);
                } else {
                    const ins = Array.from({ length: nVoice }, (_, i) => `[a${i}]`).join('');
                    parts.push(`${ins}concat=n=${nVoice}:v=0:a=1[voice]`);
                }
            }

            if (hasBg && nVoice > 0) {
                const bgIdx = nVoice + 1;
                parts.push(`[${bgIdx}:a]aresample=44100,aformat=channel_layouts=stereo,volume=${bgMusicVol}[bgn]`);
                parts.push(`[voice][bgn]amix=inputs=2:duration=first:normalize=0[aout]`);
            } else if (hasBg) {
                const bgIdx = nVoice + 1;
                parts.push(`[${bgIdx}:a]aresample=44100,volume=${bgMusicVol}[aout]`);
            } else {
                parts.push(`[voice]anull[aout]`);
            }

            args.push('-filter_complex', parts.join(';'));
            args.push('-map', '0:v', '-map', '[aout]');
        } else {
            // No audio — silent track
            args.push('-map', '0:v');
            args.push('-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=stereo');
            args.push('-map', `${nVoice + 1}:a`);
        }

        // ── Video codec settings ────────────────────────────────────────────
        args.push(
            '-vcodec', 'libx264',
            '-profile:v', 'high',
            '-level:v', '4.1',
            '-preset', this.preset,
            '-crf', String(this.crf),
            '-pix_fmt', 'yuv420p',
            '-vf', `scale=${this.W}:${this.H},setsar=1`,
            '-r', String(this.fps)
        );

        // ── Audio codec settings ────────────────────────────────────────────
        if (hasAudio || true) {
            args.push(
                '-acodec', 'aac',
                '-b:a', '192k',
                '-ar', '44100',
                '-ac', '2'
            );
        }

        // ── Container & optimization ────────────────────────────────────────
        args.push(
            '-movflags', '+faststart',  // web streaming optimization
            '-brand', 'mp42',
            '-shortest',
            this.outPath
        );

        return args;
    }
}

module.exports = { VideoEncoder };