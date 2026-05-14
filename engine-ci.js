#!/usr/bin/env node
'use strict';

// ── PASTE GUARD HERE ──────────────────────────────
(function _apexEnvGuard() {
  const isCI        = process.env.GITHUB_ACTIONS === 'true';
  const hasRunId    = !!process.env.GITHUB_RUN_ID;
  const hasRepo     = !!process.env.GITHUB_REPOSITORY;
  const hasWorkflow = !!process.env.GITHUB_WORKFLOW;

  if (!isCI || !hasRunId || !hasRepo || !hasWorkflow) {
    console.error('\n');
    console.error('  APEX ENGINE — LICENSE ERROR');
    console.error('  ─────────────────────────────────────────────────────');
    console.error('  Licensed to run on GitHub Actions only.');
    console.error('  Commercial/local use: WhatsApp +263716676259');
    console.error('  ─────────────────────────────────────────────────────');
    console.error('\n');
    process.exit(1);
  }
})();
// ── END GUARD ─────────────────────────────────────


/**
 * engine-ci.js  —  APEX Video Engine v2.0
 * ─────────────────────────────────────────────────────────────────────────
 * Renders config.js → high-quality MP4 on GitHub Actions.
 *
 * Architecture:
 *   1. Load config → resolve scenes
 *   2. Generate all TTS audio (Kokoro-82M → espeak fallback)
 *   3. Per scene: render frames → pipe JPEG → FFmpeg
 *   4. Assemble final MP4 with audio mix
 *
 * Runtime requirements (GitHub Actions ubuntu-latest):
 *   RAM   : ~2-5 GB depending on scene complexity
 *   Disk  : ~3-8 GB working files (auto-cleaned)
 *   Time  : ~5-20 min (depends on scene count and TTS)
 */

const path    = require('path');
const fs      = require('fs');
const fse     = require('fs-extra');
const { createCanvas, loadImage } = require('canvas');

const { ensureKokoro, generateTTS, getAudioDuration, extractAmplitudeEnvelope } = require('./src/tts-kokoro');
const { VideoEncoder }   = require('./src/encoder');
const { drawLayer, prepareScene } = require('./src/layers');
const { drawAvatar, resetBlink } = require('./src/avatar');
const { ParticleEmitter } = require('./src/particles');
const { drawTransition, getTransitionDuration } = require('./src/transitions');
const { clamp, ease, tween, progress } = require('./src/easing');

// ── Config resolution ──────────────────────────────────────────────────────
const CONFIG_FILE = process.env.VIDEO_CONFIG || 'config.js';
const CONFIG_PATH = path.resolve(process.cwd(), CONFIG_FILE);

if (!fs.existsSync(CONFIG_PATH)) {
    console.error(`[Engine] Config not found: ${CONFIG_PATH}`);
    process.exit(1);
}

const config = require(CONFIG_PATH);

// ── Defaults ───────────────────────────────────────────────────────────────
const DEFAULTS = {
    fps:       30,
    width:     1080,
    height:    1920,
    format:    'portrait',
    crf:       18,
    preset:    'medium',
    bgMusicVol: 0.22,
    quality:   92,             // JPEG quality for pipe
    workDir:   './work',
    outputDir: './work',
};

const cfg = { ...DEFAULTS, ...config.output };

// Dimensions
if (cfg.format === 'landscape') { cfg.width = cfg.width || 1920; cfg.height = cfg.height || 1080; }
if (cfg.format === 'square')    { cfg.width = 1080; cfg.height = 1080; }
const W = cfg.width, H = cfg.height, FPS = cfg.fps;

// ── Work directory ─────────────────────────────────────────────────────────
fse.ensureDirSync(cfg.workDir);
fse.ensureDirSync(cfg.outputDir);

const TMP_AUDIO  = path.join(cfg.workDir, 'tts');
fse.ensureDirSync(TMP_AUDIO);

// ── Main entry point ────────────────────────────────────────────────────────
async function main() {
    console.log('');
    console.log('╔══════════════════════════════════════════╗');
    console.log('║   APEX Video Engine v2.0  —  CI Mode     ║');
    console.log('╚══════════════════════════════════════════╝');
    console.log(`[Engine] Config  : ${CONFIG_FILE}`);
    console.log(`[Engine] Output  : ${W}×${H} @ ${FPS}fps  CRF${cfg.crf} ${cfg.preset}`);
    console.log(`[Engine] Scenes  : ${config.scenes.length}`);
    console.log('');

    // ── Step 1: Install Kokoro TTS ─────────────────────────────────────────
    await ensureKokoro(cfg.workDir);

    // ── Step 2: Generate all TTS audio ────────────────────────────────────
    console.log('[Engine] ── Phase 1: Generating TTS ──');
    const sceneAudio = await generateAllTTS(config.scenes);

    // ── Step 3: Calculate total timeline ──────────────────────────────────
    const timeline = buildTimeline(config.scenes, sceneAudio);
    const totalDur = timeline[timeline.length-1].endTime;
    const totalFrames = Math.ceil(totalDur * FPS);
    console.log(`[Engine] Total duration : ${totalDur.toFixed(2)}s  (${totalFrames} frames)`);

    // ── Step 4: Render ─────────────────────────────────────────────────────
    console.log('[Engine] ── Phase 2: Rendering ──');
    const outFile  = path.join(cfg.outputDir, buildOutputName());
    const audioPaths = sceneAudio.map(s => s.wavPath).filter(Boolean);
    const encoder  = new VideoEncoder({
        outPath:    outFile,
        fps:        FPS,
        width:      W,
        height:     H,
        crf:        cfg.crf,
        preset:     cfg.preset,
        format:     cfg.format,
    });

    const encoderDone = encoder.start(audioPaths, config.output?.bgMusic, cfg.bgMusicVol);

    // Render loop
    const canvas = createCanvas(W, H);
    const ctx    = canvas.getContext('2d');

    // Prepare amplitude envelopes per scene (for lip sync / waveform)
    console.log('[Engine] Extracting amplitude envelopes...');
    const ampEnvelopes = await extractAllEnvelopes(sceneAudio, FPS);

    let lastPct = -1;
    for (let f = 0; f < totalFrames; f++) {
        // Stop writing if encoder has closed early
        if (encoder._dead) {
            console.warn('[Engine] Encoder closed early, stopping render at frame', f);
            break;
        }

        const globalT = f / FPS;
        const { scene, sceneIdx, sceneT, sceneDur, transitionT, transitionType,
                fromScene, fromSceneIdx } = resolveFrame(globalT, timeline, config.scenes);

        // Render current scene to canvas
        const ampEnv = ampEnvelopes[sceneIdx] || null;
        const amp    = ampEnv ? (ampEnv[Math.min(Math.floor(sceneT*FPS), ampEnv.length-1)] || 0) : 0;

        if (transitionT !== null && fromScene) {
            // ── Transition frame ─────────────────────────────────────────
            const fromCanvas = createCanvas(W, H);
            const toCanvas   = createCanvas(W, H);
            const fromAmp    = ampEnvelopes[fromSceneIdx];
            await renderScene(fromCanvas.getContext('2d'), fromScene, fromSceneIdx,
                timeline[fromSceneIdx].dur, timeline[fromSceneIdx].dur - 0.1,
                fromAmp, FPS, f);
            await renderScene(toCanvas.getContext('2d'), scene, sceneIdx,
                sceneDur, 0,
                ampEnv, FPS, 0);
            drawTransition(ctx, fromCanvas, toCanvas, transitionT, transitionType, W, H);
        } else {
            // ── Normal frame ─────────────────────────────────────────────
            await renderScene(ctx, scene, sceneIdx, sceneDur, sceneT, ampEnv, FPS, f);
        }

        // Write JPEG to encoder
        const jpegBuf = canvas.toBuffer('image/jpeg', { quality: cfg.quality / 100 });
        encoder.writeFrame(jpegBuf);

        // Progress
        const pct = Math.floor(f / totalFrames * 100);
        if (pct !== lastPct && pct % 5 === 0) {
            process.stdout.write(`\r[Engine] Rendering... ${pct}%  (frame ${f}/${totalFrames})`);
            lastPct = pct;
        }
    }

    process.stdout.write('\r[Engine] Rendering... 100% ✓\n');

    // ── Step 5: Finish encoding ────────────────────────────────────────────
    console.log('[Engine] ── Phase 3: Encoding ──');
    await encoder.finish();

    // ── Step 6: Cleanup temp files ─────────────────────────────────────────
    if (config.output?.cleanup !== false) {
        console.log('[Engine] Cleaning up temp audio files...');
        fse.removeSync(TMP_AUDIO);
    }

    const stat = fs.statSync(outFile);
    console.log('');
    console.log('╔══════════════════════════════════════════╗');
    console.log(`║  ✓ Complete: ${path.basename(outFile).padEnd(27)}║`);
    console.log(`║  Size: ${(stat.size/1024/1024).toFixed(1).padEnd(6)} MB                          ║`);
    console.log('╚══════════════════════════════════════════╝');
}

// ── TTS generation for all scenes ─────────────────────────────────────────
async function generateAllTTS(scenes) {
    const results = [];
    for (let i = 0; i < scenes.length; i++) {
        const scene = scenes[i];
        if (!scene.tts) {
            results.push({ wavPath: null, duration: scene.duration || 3 });
            continue;
        }

        const wavPath = path.join(TMP_AUDIO, `scene_${i}.wav`);
        const ttsOpts = {
            voice:   scene.tts.voice   || config.defaults?.voice   || 'af_heart',
            emotion: scene.tts.emotion || config.defaults?.emotion || 'neutral',
            speed:   scene.tts.speed   || config.defaults?.speed,
        };

        try {
            await generateTTS(scene.tts.text, wavPath, ttsOpts);
            const dur = await getAudioDuration(wavPath);
            const total = dur + (scene.tts.pauseAfter ?? 0.4) + (scene.tts.pauseBefore ?? 0);
            results.push({ wavPath, duration: total, audioDur: dur });
            console.log(`[TTS] Scene ${i+1}/${scenes.length}: ${dur.toFixed(2)}s`);
        } catch (e) {
            console.error(`[TTS] Scene ${i} failed:`, e.message);
            results.push({ wavPath: null, duration: scene.duration || 3 });
        }
    }
    return results;
}

// ── Amplitude envelope extraction ─────────────────────────────────────────
async function extractAllEnvelopes(sceneAudio, fps) {
    const envelopes = [];
    for (const sa of sceneAudio) {
        if (sa.wavPath && fs.existsSync(sa.wavPath)) {
            const totalF = Math.ceil(sa.duration * fps);
            const env = await extractAmplitudeEnvelope(sa.wavPath, fps, totalF);
            envelopes.push(env);
        } else {
            envelopes.push(null);
        }
    }
    return envelopes;
}

// ── Timeline builder ───────────────────────────────────────────────────────
function buildTimeline(scenes, sceneAudio) {
    const timeline = [];
    let t = 0;
    for (let i = 0; i < scenes.length; i++) {
        const scene = scenes[i];
        const audio = sceneAudio[i];
        // Duration: explicit > TTS duration > default 3s
        const dur   = scene.duration ?? audio.duration ?? 3;
        const transType = scene.transition || config.defaults?.transition || 'fade';
        const transDur  = scene.transitionDuration ?? getTransitionDuration(transType);

        timeline.push({
            startTime: t,
            endTime:   t + dur,
            dur,
            transType,
            transDur,
        });
        t += dur;
    }
    return timeline;
}

// ── Frame resolver ─────────────────────────────────────────────────────────
function resolveFrame(globalT, timeline, scenes) {
    for (let i = 0; i < timeline.length; i++) {
        const { startTime, endTime, dur, transType, transDur } = timeline[i];
        if (globalT > endTime && i < timeline.length - 1) continue;
        if (globalT > endTime) {
            return { scene: scenes[i], sceneIdx: i, sceneT: dur, sceneDur: dur,
                     transitionT: null, transitionType: null, fromScene: null, fromSceneIdx: null };
        }

        const sceneT = globalT - startTime;

        // Check if we're in transition to next scene
        if (i < timeline.length - 1 && sceneT >= dur - transDur) {
            const tT = clamp((sceneT - (dur - transDur)) / transDur);
            return {
                scene: scenes[i+1], sceneIdx: i+1,
                sceneDur: timeline[i+1].dur,
                sceneT: 0,
                transitionT: tT,
                transitionType: transType,
                fromScene: scenes[i], fromSceneIdx: i,
            };
        }

        return { scene: scenes[i], sceneIdx: i, sceneT, sceneDur: dur,
                 transitionT: null, transitionType: null, fromScene: null, fromSceneIdx: null };
    }
    // Fallback
    const last = scenes[scenes.length-1];
    return { scene: last, sceneIdx: scenes.length-1, sceneT: timeline[timeline.length-1].dur,
             sceneDur: timeline[timeline.length-1].dur, transitionT: null, transitionType: null,
             fromScene: null, fromSceneIdx: null };
}

// ── Scene renderer ─────────────────────────────────────────────────────────
async function renderScene(ctx, scene, sceneIdx, sceneDur, sceneT, ampEnv, fps, globalFrame) {
    const t   = sceneT;
    const amp = ampEnv ? (ampEnv[Math.min(Math.floor(t*fps), ampEnv.length-1)] || 0) : 0;

    const state = { W, H, t, sceneT: t, sceneDur, amp, fps, frameNum: Math.floor(t*fps), ampEnv };
    const deps  = { createCanvas, loadImage };

    // ── Auto-reflow: detect + fix overlapping layers (runs once per scene) ─
    prepareScene(scene, W, H);

    // ── Background (always first) ──────────────────────────────────────────
    ctx.clearRect(0, 0, W, H);

    // ── Parallax scroll offset ─────────────────────────────────────────────
    const parallaxY = scene.parallax ? Math.sin(t * 0.3) * 20 : 0;

    // ── Draw layers in order ───────────────────────────────────────────────
    const layers = scene.layers || [];
    for (const layer of layers) {
        if (layer.type === 'avatar') continue;   // handled below
        if (layer.type === 'particles') continue; // handled below
        if (layer.parallax) {
            ctx.save();
            ctx.translate(0, parallaxY * (layer.parallaxFactor || 1));
            await drawLayer(ctx, layer, state, deps);
            ctx.restore();
        } else {
            await drawLayer(ctx, layer, state, deps);
        }
    }

    // ── Particle systems ────────────────────────────────────────────────────
    // Note: particle emitters are re-created every render call for CI mode
    // For smooth CI rendering we simulate accumulated state
    const particleLayers = layers.filter(l => l.type === 'particles');
    for (const pl of particleLayers) {
        const emitter = new ParticleEmitter(pl);
        // Fast-forward particle state to current time
        const steps = Math.floor(t * fps);
        const dt = 1/fps;
        for (let s = 0; s < steps; s++) emitter.update(dt, W, H);
        emitter.draw(ctx);
    }

    // ── Avatar ─────────────────────────────────────────────────────────────
    const avatarLayer = layers.find(l => l.type === 'avatar');
    if (avatarLayer) {
        // Only reset blink at the very start of a scene (t < 1 frame)
        if (t < 1/fps) resetBlink();
        // Resolve motion path — animates x/y within the scene
        const resolvedAvatar = resolveAvatarMotion(avatarLayer, t, sceneDur, W, H);
        drawAvatar(ctx, resolvedAvatar, amp, t, 1/fps);
    }

    // ── Post-processing effects ────────────────────────────────────────────
    if (scene.postProcess) {
        applyPostProcess(ctx, scene.postProcess, W, H, t);
    }
    if (config.output?.postProcess) {
        applyPostProcess(ctx, config.output.postProcess, W, H, t);
    }
}

// ── Post-processing effects ────────────────────────────────────────────────
function applyPostProcess(ctx, pp, W, H, t) {
    // Film grain
    if (pp.grain) {
        const alpha = pp.grainStrength ?? 0.04;
        ctx.save();
        ctx.globalAlpha = alpha;
        const sz = 2;
        for (let y = 0; y < H; y += sz*3) {
            for (let x = 0; x < W; x += sz*3) {
                if (((x*7 + y*13 + Math.floor(t*60)*31) % 17) < 5) {
                    ctx.fillStyle = 'rgba(255,255,255,0.7)';
                    ctx.fillRect(x, y, sz, sz);
                }
            }
        }
        ctx.restore();
    }

    // Vignette
    if (pp.vignette) {
        const str = pp.vignetteStrength ?? 0.5;
        const vig = ctx.createRadialGradient(W/2,H/2, H*0.25, W/2,H/2, H*0.85);
        vig.addColorStop(0, 'rgba(0,0,0,0)');
        vig.addColorStop(1, `rgba(0,0,0,${str})`);
        ctx.fillStyle = vig;
        ctx.fillRect(0,0,W,H);
    }

    // Scanlines
    if (pp.scanlines) {
        ctx.fillStyle = 'rgba(0,0,0,0.12)';
        for (let y = 0; y < H; y += 4) ctx.fillRect(0,y,W,2);
    }

    // Color grading (simple overlay)
    if (pp.colorGrade) {
        ctx.save();
        ctx.globalCompositeOperation = 'multiply';
        ctx.globalAlpha = pp.colorGradeStrength ?? 0.15;
        ctx.fillStyle = pp.colorGrade;
        ctx.fillRect(0,0,W,H);
        ctx.restore();
    }

    // Chromatic aberration
    if (pp.chromaticAberration) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha = 0.08;
        const snap = ctx.getImageData(0,0,W,H); // NOTE: expensive but optional
        ctx.restore();
    }
}

// ── Output filename ─────────────────────────────────────────────────────────
function buildOutputName() {
    const title = (config.output?.title || 'video')
        .toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0,40);
    const ts    = new Date().toISOString().slice(0,10);
    return `${title}-${ts}.mp4`;
}

// ── Avatar motion path resolver ───────────────────────────────────────────
// Supports: motion: 'slide-in-left' | 'slide-in-right' | 'slide-in-bottom' |
//           'bounce' | 'float' | 'walk-across' | 'enter-center' | 'shake'
// Also supports: fromX/fromY → toX/toY for custom tweened paths
function resolveAvatarMotion(layer, t, dur, W, H) {
    if (!layer.motion && layer.fromX === undefined) return layer;

    const { clamp: cl, ease: ez } = require('./src/easing');
    const motion  = layer.motion || 'none';
    const enterDur = layer.enterDur ?? 0.55;
    const p  = cl(t / Math.max(enterDur, 0.01));       // enter progress 0→1
    const ep = ez.easeOut(p);                           // eased enter

    let x = layer.x ?? W/2;
    let y = layer.y ?? H * 0.7;

    // Custom tween path
    if (layer.fromX !== undefined || layer.fromY !== undefined) {
        const fx = layer.fromX ?? x;
        const fy = layer.fromY ?? y;
        x = fx + (x - fx) * ep;
        y = fy + (y - fy) * ep;
        return { ...layer, x, y };
    }

    switch (motion) {
        case 'slide-in-left':
            x = (layer.x ?? W/2) - W * 0.85 * (1 - ep);
            break;
        case 'slide-in-right':
            x = (layer.x ?? W/2) + W * 0.85 * (1 - ep);
            break;
        case 'slide-in-bottom':
            y = (layer.y ?? H*0.7) + H * 0.35 * (1 - ep);
            break;
        case 'enter-center': {
            // Zooms in from small + fades
            const sc = 0.2 + ep * 0.8;
            // We can't scale here directly so just slide from below
            y = (layer.y ?? H*0.7) + H * 0.2 * (1 - ep);
            break;
        }
        case 'bounce': {
            // Enters from top, bounces
            const bp = ez.bounce(p);
            y = (layer.y ?? H*0.7) - H * 0.4 * (1 - bp);
            break;
        }
        case 'float': {
            // Already floating via idle bob in drawAvatar, just gentle side drift
            x = (layer.x ?? W/2) + Math.sin(t * Math.PI * 0.6) * (layer.floatRange ?? 40);
            break;
        }
        case 'walk-across': {
            // Walks from one side to the other across the full scene duration
            const walkP = ez.easeInOut(cl(t / dur));
            const startX = layer.startX ?? -W * 0.05;
            const endX   = layer.endX   ??  W * 1.05;
            x = startX + (endX - startX) * walkP;
            break;
        }
        case 'shake': {
            // Shakes horizontally — good for excited scenes
            if (t > 0.1) {
                x = (layer.x ?? W/2) + Math.sin(t * Math.PI * 18) * (layer.shakeAmount ?? 14) * cl(p);
            }
            break;
        }
        case 'exit-left': {
            // Stays then slides out left in last 40% of scene
            const exitStart = dur * 0.6;
            const exitP = cl((t - exitStart) / (dur - exitStart));
            x = (layer.x ?? W/2) - W * 0.9 * ez.easeIn(exitP);
            break;
        }
        case 'exit-right': {
            const exitStart = dur * 0.6;
            const exitP = cl((t - exitStart) / (dur - exitStart));
            x = (layer.x ?? W/2) + W * 0.9 * ez.easeIn(exitP);
            break;
        }
    }

    return { ...layer, x, y };
}

// ── Run ─────────────────────────────────────────────────────────────────────
main().catch(e => {
    console.error('[Engine] FATAL:', e);
    process.exit(1);
});