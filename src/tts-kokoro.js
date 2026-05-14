'use strict';
/**
 * tts-kokoro.js  —  APEX Engine v2.0
 *
 * Primary:  Kokoro-82M via kokoro Python package (neural, emotional)
 * Fallback: espeak-ng (robotic but always works)
 *
 * Kokoro voice naming:
 *   a = American English,  b = British English
 *   f = female,  m = male
 *   e.g. af_heart = American Female "Heart"
 */

const { spawn, execSync } = require('child_process');
const fs   = require('fs');
const path = require('path');

// ── Voice catalogue ────────────────────────────────────────────────────────
const VOICES = {
    'af_heart':    { lang: 'a', gender: 'female', style: 'warm, expressive' },
    'af_bella':    { lang: 'a', gender: 'female', style: 'bright, clear' },
    'af_sarah':    { lang: 'a', gender: 'female', style: 'natural, conversational' },
    'af_nicole':   { lang: 'a', gender: 'female', style: 'soft, gentle' },
    'af_sky':      { lang: 'a', gender: 'female', style: 'energetic, youthful' },
    'am_adam':     { lang: 'a', gender: 'male',   style: 'authoritative, deep' },
    'am_michael':  { lang: 'a', gender: 'male',   style: 'friendly, mid-range' },
    'bf_emma':     { lang: 'b', gender: 'female', style: 'refined, articulate' },
    'bf_isabella': { lang: 'b', gender: 'female', style: 'warm, storytelling' },
    'bm_george':   { lang: 'b', gender: 'male',   style: 'deep, commanding' },
    'bm_lewis':    { lang: 'b', gender: 'male',   style: 'crisp, professional' },
};

// ── Emotion speed presets ──────────────────────────────────────────────────
// All emotions use speed 1.0 — emotion is expressed via voice character only,
// not speed manipulation which causes unnatural pacing.
const EMOTION_PRESETS = {
    neutral:   { speed: 1.0 },
    happy:     { speed: 1.0 },
    excited:   { speed: 1.0 },
    sad:       { speed: 1.0 },
    angry:     { speed: 1.0 },
    whisper:   { speed: 1.0 },
    dramatic:  { speed: 1.0 },
    energetic: { speed: 1.0 },
    calm:      { speed: 1.0 },
    sarcastic: { speed: 1.0 },
};

let kokoroReady  = false;
let kokoroPyPath = null;

// ─────────────────────────────────────────────────────────────────────────────
// ensureKokoro
// ─────────────────────────────────────────────────────────────────────────────
async function ensureKokoro(workDir) {
    const kokoroDir = path.resolve(workDir, '..', 'kokoro');
    const flagFile  = path.join(kokoroDir, '.ready');
    const pyDest    = path.join(kokoroDir, 'generate.py');

    // Always (re)write the script so engine updates propagate on cached runs
    fs.mkdirSync(kokoroDir, { recursive: true });
    fs.writeFileSync(pyDest, buildPyScript());

    if (fs.existsSync(flagFile)) {
        kokoroPyPath = pyDest;
        kokoroReady  = true;
        console.log('[TTS] Kokoro ready (cached)');
        return;
    }

    console.log('[TTS] Installing Kokoro TTS (first run ~2–3 min)...');

    try {
        execSync('pip install -q "kokoro>=0.9.4" "misaki[en]" soundfile numpy', {
            stdio: 'inherit',
            timeout: 360000,
        });
    } catch (e) {
        console.warn('[TTS] pip warning:', e.message.slice(0, 120));
    }

    fs.writeFileSync(flagFile, Date.now().toString());
    kokoroPyPath = pyDest;
    kokoroReady  = true;
    console.log('[TTS] Kokoro installed ✓');
}

// ─────────────────────────────────────────────────────────────────────────────
// buildPyScript — Python script that runs Kokoro for one utterance
// ─────────────────────────────────────────────────────────────────────────────
function buildPyScript() {
    // Written as a regular string — no template interpolation needed inside
    return [
        '#!/usr/bin/env python3',
        '# Kokoro TTS runner — stdin: JSON params, stdout: OK:<path>',
        'import sys, json, os, warnings',
        'warnings.filterwarnings("ignore")',
        'os.environ["TOKENIZERS_PARALLELISM"] = "false"',
        'os.environ["HF_HUB_DISABLE_PROGRESS_BARS"] = "1"',
        'os.environ["TRANSFORMERS_NO_ADVISORY_WARNINGS"] = "1"',
        '# Redirect all library noise to stderr',
        'import logging',
        'logging.disable(logging.WARNING)',
        '',
        'import numpy as np',
        'import soundfile as sf',
        '',
        'params  = json.loads(sys.stdin.read())',
        'text    = params["text"]',
        'voice   = params.get("voice", "af_heart")',
        'speed   = float(params.get("speed", 1.0))',
        'outpath = params["outpath"]',
        '',
        '# lang_code MUST be "a" (American) or "b" (British)',
        '# Do NOT pass "en-us" — KPipeline does not accept that string',
        'lang_code = voice[0] if voice[0] in ("a", "b") else "a"',
        '',
        'try:',
        '    from kokoro import KPipeline',
        'except ImportError as e:',
        '    sys.stderr.write("IMPORT_ERROR:" + str(e) + "\\n")',
        '    sys.exit(2)',
        '',
        'try:',
        '    pipe   = KPipeline(lang_code=lang_code)',
        '    chunks = []',
        '    sr     = 24000',
        '',
        '    for _, _, audio in pipe(text, voice=voice, speed=speed, split_pattern=None):',
        '        if audio is None:',
        '            continue',
        '        arr = audio.numpy() if hasattr(audio, "numpy") else np.array(audio, dtype=np.float32)',
        '        arr = np.squeeze(arr).astype(np.float32)',
        '        if arr.ndim == 0 or arr.size == 0:',
        '            continue',
        '        chunks.append(arr)',
        '',
        '    if not chunks:',
        '        chunks = [np.zeros(sr // 2, dtype=np.float32)]',
        '',
        '    sf.write(outpath, np.concatenate(chunks), sr)',
        '    sys.stdout.write("OK:" + outpath + "\\n")',
        '    sys.stdout.flush()',
        '',
        'except Exception as e:',
        '    sys.stderr.write("RUNTIME_ERROR:" + str(e) + "\\n")',
        '    sys.stderr.flush()',
        '    sys.exit(1)',
    ].join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// generateTTS
// ─────────────────────────────────────────────────────────────────────────────
async function generateTTS(text, outPath, options = {}) {
    if (!kokoroReady) throw new Error('Call ensureKokoro() first');

    const emotion = options.emotion || 'neutral';
    const preset  = EMOTION_PRESETS[emotion] || EMOTION_PRESETS.neutral;
    const voice   = VOICES[options.voice] ? options.voice : 'af_heart';
    const speed   = options.speed ?? preset.speed;

    const params = JSON.stringify({ text, voice, speed, outpath: outPath });

    return new Promise((resolve, reject) => {
        const proc = spawn('python3', [kokoroPyPath], {
            stdio: ['pipe', 'pipe', 'pipe'],
        });

        let stdout = '';
        let stderr = '';
        proc.stdout.on('data', d => { stdout += d.toString(); });
        proc.stderr.on('data', d => { stderr += d.toString(); });

        const timer = setTimeout(() => {
            proc.kill('SIGKILL');
            console.warn('[TTS] Kokoro timed out — falling back to espeak-ng');
            generateEspeakFallback(text, outPath, speed).then(resolve).catch(reject);
        }, 120000);

        proc.on('close', code => {
            clearTimeout(timer);
            const fileOk = fs.existsSync(outPath) && fs.statSync(outPath).size > 1000;
            // Use includes() not startsWith() — HF Hub warnings may prefix stdout
            const outOk  = stdout.includes('OK:');

            if (code === 0 && fileOk) {  // trust the file over stdout signal
                const kb = (fs.statSync(outPath).size / 1024).toFixed(1);
                console.log(`[TTS] ✓ Kokoro ${kb} KB  voice=${voice}  emotion=${emotion}  speed=${speed.toFixed(2)}`);
                resolve(outPath);
            } else {
                const errSnip = stderr.replace(/\n/g, ' ').slice(0, 400);
                console.warn(`[TTS] Kokoro failed (exit=${code}) → espeak-ng fallback`);
                if (errSnip) console.warn('[TTS]', errSnip);
                generateEspeakFallback(text, outPath, speed).then(resolve).catch(reject);
            }
        });

        proc.stdin.on('error', () => {});
        proc.stdin.write(params, 'utf8', () => proc.stdin.end());
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// espeak-ng fallback — always available on ubuntu-latest
// ─────────────────────────────────────────────────────────────────────────────
async function generateEspeakFallback(text, outPath, speed = 1.0) {
    // Step 1: generate raw espeak WAV to a temp file
    const rawPath = outPath.replace('.wav', '_raw.wav');
    await new Promise((resolve, reject) => {
        const wpm  = Math.round(160 * speed);
        const proc = spawn('espeak-ng', [
            '-v', 'en-us',
            '-s', String(wpm),
            '-a', '180',
            '-g', '6',
            '-p', '50',      // pitch — 50 = more natural, less high-pitched
            '-w', rawPath,
            text,
        ], { stdio: ['ignore', 'pipe', 'pipe'] });

        let stderr = '';
        proc.stderr.on('data', d => { stderr += d.toString(); });
        proc.on('close', code => {
            if (code === 0 && fs.existsSync(rawPath) && fs.statSync(rawPath).size > 100) {
                resolve();
            } else {
                console.warn('[TTS] espeak-ng failed:', stderr.slice(0, 200));
                reject(new Error('espeak failed'));
            }
        });
    }).catch(() => generateSilence(outPath, 2.5));

    if (!fs.existsSync(rawPath)) return outPath;

    // Step 2: post-process with ffmpeg to warm and soften the robotic sound
    // - lowpass  removes harsh metallic highs
    // - equalizer boosts warmth around 200-800 Hz
    // - aecho    adds tiny room reverb to remove dry robot feel
    // - atempo   fine-tunes speed
    await new Promise((resolve) => {
        const filters = [
            'lowpass=f=7000',                          // cut harsh highs above 7kHz
            'equalizer=f=280:t=o:w=200:g=4',           // warm low-mids +4dB
            'equalizer=f=3500:t=o:w=800:g=-3',         // cut nasal mids -3dB
            'aecho=0.8:0.6:30:0.15',                   // small room echo
            'volume=1.4',                               // compensate for filter loss
        ].join(',');

        const proc = spawn('ffmpeg', [
            '-y', '-i', rawPath,
            '-af', filters,
            '-acodec', 'pcm_s16le',
            '-ar', '24000',
            outPath,
        ], { stdio: 'ignore' });

        proc.on('close', code => {
            try { fs.unlinkSync(rawPath); } catch {}
            if (code === 0 && fs.existsSync(outPath) && fs.statSync(outPath).size > 100) {
                console.log('[TTS] ✓ espeak-ng + warmth filter OK');
                resolve();
            } else {
                // ffmpeg filter failed — just rename raw to output
                try { fs.renameSync(rawPath, outPath); } catch {}
                resolve();
            }
        });
    });

    return outPath;
}

// ─────────────────────────────────────────────────────────────────────────────
// generateSilence — last resort
// ─────────────────────────────────────────────────────────────────────────────
async function generateSilence(outPath, secs = 2.5) {
    return new Promise((resolve, reject) => {
        spawn('ffmpeg', [
            '-y', '-f', 'lavfi', '-i', 'anullsrc=r=24000:cl=mono',
            '-t', String(secs), '-acodec', 'pcm_s16le', outPath,
        ], { stdio: 'ignore' }).on('close', code =>
            code === 0 ? resolve(outPath) : reject(new Error('silence gen failed'))
        );
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// getAudioDuration
// ─────────────────────────────────────────────────────────────────────────────
async function getAudioDuration(fp) {
    const { execFile } = require('child_process');
    return new Promise(resolve => {
        execFile('ffprobe', [
            '-v', 'quiet', '-print_format', 'json', '-show_format', fp,
        ], (err, stdout) => {
            if (err) return resolve(2.5);
            try { resolve(parseFloat(JSON.parse(stdout).format.duration) || 2.5); }
            catch { resolve(2.5); }
        });
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// extractAmplitudeEnvelope — RMS per frame for lip-sync & waveform viz
// ─────────────────────────────────────────────────────────────────────────────
async function extractAmplitudeEnvelope(wavPath, fps, totalFrames) {
    return new Promise(resolve => {
        const proc = spawn('ffmpeg', [
            '-i', wavPath,
            '-f', 'f32le', '-ac', '1', '-ar', '16000', 'pipe:1',
        ], { stdio: ['ignore', 'pipe', 'pipe'] });

        const chunks = [];
        proc.stdout.on('data', d => chunks.push(d));
        proc.on('close', () => {
            try {
                const buf     = Buffer.concat(chunks);
                const samples = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
                const sr      = 16000;
                const hop     = Math.max(1, Math.floor(sr / fps));
                const env     = new Float32Array(totalFrames);

                for (let f = 0; f < totalFrames; f++) {
                    const s = f * hop;
                    const e = Math.min(s + hop, samples.length);
                    if (e <= s) continue;
                    let rms = 0;
                    for (let i = s; i < e; i++) rms += samples[i] * samples[i];
                    env[f] = Math.sqrt(rms / (e - s));
                }

                let mx = 0.001;
                for (let i = 0; i < env.length; i++) if (env[i] > mx) mx = env[i];
                for (let i = 0; i < env.length; i++) env[i] /= mx;

                resolve(env);
            } catch {
                resolve(new Float32Array(totalFrames).fill(0.3));
            }
        });
    });
}

module.exports = {
    ensureKokoro,
    generateTTS,
    getAudioDuration,
    extractAmplitudeEnvelope,
    VOICES,
    EMOTION_PRESETS,
};