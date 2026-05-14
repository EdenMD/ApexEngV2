'use strict';
/**
 * layers.js
 * 
 * Renders all layer types onto a canvas context.
 * Each layer is drawn in order (painter's algorithm).
 * 
 * Layer types:
 *   background | gradient | image | text | kinetic-text | shape |
 *   waveform | chart | mockup | countdown | progress-bar |
 *   avatar (handled separately in engine) | particles (handled separately)
 */

const { ease, clamp, lerp, tween, progress, inOutProgress } = require('./easing');
const path = require('path');
const fs   = require('fs');

// ── Image cache ────────────────────────────────────────────────────────────
const imgCache = new Map();
function getCachedImage(createCanvas, loadImage, src) {
    if (imgCache.has(src)) return imgCache.get(src);
    const promise = loadImage(src).then(img => { imgCache.set(src, img); return img; });
    imgCache.set(src, promise);
    return promise;
}
// ══════════════════════════════════════════════════════════════════════════════
// LAYOUT ENGINE — collision detection + auto-reflow
// Runs ONCE per scene (not per frame). Mutates layer.y in-place so that
// no two TEXT blocks ever visually overlap.
// Other elements (shapes, charts, images, etc.) are NOT subject to reflow.
//
// Rules:
//   1. Measure every TEXT layer's bounding box (top, bottom, left, right)
//   2. Walk TEXT layers top-to-bottom by their y position
//   3. If a TEXT layer overlaps the one above it, push it down until there is
//      a minimum gap (GAP_MIN px) between them
//   4. Hard clamp: nothing may go below SAFE_BOTTOM (leaves room for
//      waveform at 1700 and progress-bar at 1855)
//   5. Non-content layers (background, gradient, particles, overlay,
//      scanlines, waveform, progress-bar, divider) are skipped — they
//      never collide with text
// ══════════════════════════════════════════════════════════════════════════════

const REFLOW_TYPES   = new Set(['text','kinetic-text']); // Only text types for reflow
const FIXED_TYPES    = new Set(['background','gradient','particles','overlay','scanlines','waveform','progress-bar','divider','grid', 'shape', 'chart', 'mockup', 'countdown', 'image']);
const GAP_MIN        = 24;   // minimum vertical gap between elements (px)
const SAFE_BOTTOM    = 1640; // nothing may have its bottom edge below this
const _reflowCache   = new WeakMap(); // scene layers array → already reflowed flag

function reflowLayers(layers, W, H) {
    // Use a temp offscreen canvas just for measureText
    const { createCanvas } = require('canvas');
    const _mctx = createCanvas(W, H).getContext('2d');

    // Only reflow content layers; skip fixed ones
    const content = layers
        .filter(l => REFLOW_TYPES.has(l.type))
        .sort((a, b) => (a.y ?? H/2) - (b.y ?? H/2));

    // Build bounding boxes
    function bbox(l) {
        const x   = l.x ?? W/2;
        const y   = l.y ?? H/2;
        let top, bottom, left, right;

        if (l.type === 'text' || l.type === 'kinetic-text') {
            const fs     = l.fontSize ?? 60;
            const ff     = l.fontFamily ?? 'Arial Black, sans-serif';
            const lh     = (l.lineHeight ?? 1.2) * fs;
            const maxW   = l.maxWidth ?? W * 0.88;
            _mctx.font   = `bold ${fs}px ${ff}`;
            // Count lines
            // Split on explicit newlines first, then word-wrap each segment
            const segs2 = String(l.text || '').split('\n');
            const lines  = [];
            for (const seg of segs2) {
                const words = seg.split(/\s+/).filter(Boolean);
                if (!words.length) { lines.push(''); continue; }
                let line = '';
                for (const w of words) {
                    const test = line ? line + ' ' + w : w;
                    if (_mctx.measureText(test).width > maxW && line) { lines.push(line); line = w; }
                    else line = test;
                }
                if (line) lines.push(line);
            }
            const totalH = lines.length * lh;
            const totalW = Math.min(maxW, Math.max(...lines.map(ln => _mctx.measureText(ln).width)));
            top    = y - totalH / 2;
            bottom = y + totalH / 2;
            left   = (l.align === 'center') ? x - totalW/2 : x;
            right  = (l.align === 'center') ? x + totalW/2 : x + totalW;
        } else {
            // Non-text layers are not reflowed, so their bbox is not needed for this logic
            // This case should ideally not be reached due to filtering by REFLOW_TYPES
            return { top: y, bottom: y, left: x, right: x, h: 0 };
        }
        return { top, bottom, left, right, h: bottom - top };
    }

    // Walk sorted layers, push down on overlap
    const boxes = [];
    for (const l of content) {
        const box = bbox(l);
        let { top, bottom } = box;

        // Check against every already-placed box
        for (const prev of boxes) {
            // Only push if they share horizontal space
            const hOverlap = box.left < prev.right && box.right > prev.left;
            if (!hOverlap) continue;
            if (top < prev.bottom + GAP_MIN) {
                const shift = (prev.bottom + GAP_MIN) - top;
                top    += shift;
                bottom += shift;
                // Adjust layer y — text uses middle baseline
                l.y = (l.y ?? H/2) + shift;
            }
        }

        // Clamp to safe bottom — scale down font if text would still overflow
        if (bottom > SAFE_BOTTOM) {
            if (l.type === 'text' || l.type === 'kinetic-text') {
                // Try shrinking font
                const overflow = bottom - SAFE_BOTTOM;
                const newFs = Math.max(20, (l.fontSize ?? 60) - Math.ceil(overflow / 2));
                l.fontSize = newFs;
                // Recompute bottom based on new font size
                const newLines = String(l.text || '').split('\n').flatMap(seg => {
                    const words = seg.split(/\s+/).filter(Boolean);
                    if (!words.length) return [''];
                    let line = '';
                    const tempLines = [];
                    _mctx.font = `bold ${newFs}px ${l.fontFamily ?? 'Arial Black, sans-serif'}`;
                    for (const w of words) {
                        const test = line ? line + ' ' + w : w;
                        if (_mctx.measureText(test).width > (l.maxWidth ?? W * 0.88) && line) { tempLines.push(line); line = w; }
                        else line = test;
                    }
                    if (line) tempLines.push(line);
                    return tempLines;
                });
                bottom = top + (l.lineHeight ?? 1.2) * newFs * newLines.length;
            }
            // Hard clamp y
            if (bottom > SAFE_BOTTOM) {
                const shift = bottom - SAFE_BOTTOM;
                l.y = (l.y ?? H/2) - shift;
                bottom = SAFE_BOTTOM;
                top    = bottom - box.h; // Recalculate top based on original height
            }
        }

        boxes.push({ ...box, top, bottom });
    }
}

// Call this once per scene before rendering begins
function prepareScene(scene, W, H) {
    if (!scene || !scene.layers) return;
    if (_reflowCache.has(scene.layers)) return; // already done
    reflowLayers(scene.layers, W, H);
    _reflowCache.set(scene.layers, true);
}



// ── Master layer dispatcher ────────────────────────────────────────────────
async function drawLayer(ctx, layer, state, deps) {
    const { W, H, t, sceneT, sceneDur, amp, fps, frameNum } = state;
    const { createCanvas, loadImage } = deps;

    const alpha = layer.opacity ?? 1;
    if (alpha <= 0) return;

    ctx.save();
    ctx.globalAlpha = alpha;

    // Per-layer enter/exit animation
    if (layer.enterAt !== undefined || layer.exitAt !== undefined) {
        const enterAt  = layer.enterAt ?? 0;
        const exitAt   = layer.exitAt  ?? sceneDur;
        const enterDur = layer.enterDur ?? 0.3;
        const exitDur  = layer.exitDur  ?? 0.25;
        const inP  = enterDur > 0 ? clamp((sceneT - enterAt) / enterDur) : (sceneT >= enterAt ? 1 : 0);
        const outP = exitDur  > 0 ? clamp((sceneT - (exitAt - exitDur)) / exitDur) : 0;
        ctx.globalAlpha = alpha * inP * (1 - outP);
        if (ctx.globalAlpha <= 0.01) { ctx.restore(); return; }
    }

    switch (layer.type) {
        case 'background':    drawBackground(ctx, layer, W, H, sceneT); break;
        case 'gradient':      drawGradient(ctx, layer, W, H, sceneT); break;
        case 'image':         await drawImage(ctx, layer, W, H, sceneT, sceneDur, loadImage); break;
        case 'text':          drawText(ctx, layer, W, H, sceneT, sceneDur, amp); break;
        case 'kinetic-text':  drawKineticText(ctx, layer, W, H, sceneT, sceneDur, amp); break;
        case 'shape':         drawShape(ctx, layer, W, H, sceneT); break;
        case 'waveform':      drawWaveform(ctx, layer, W, H, amp, sceneT, frameNum, state.ampEnv); break;
        case 'chart':         drawChart(ctx, layer, W, H, sceneT, sceneDur); break;
        case 'mockup':        await drawMockup(ctx, layer, W, H, sceneT, loadImage); break;
        case 'progress-bar':  drawProgressBar(ctx, layer, W, H, sceneT, sceneDur); break;
        case 'countdown':     drawCountdown(ctx, layer, W, H, sceneT, sceneDur); break;
        case 'divider':       drawDivider(ctx, layer, W, H, sceneT); break;
        case 'overlay':       drawOverlay(ctx, layer, W, H, sceneT); break;
        case 'grid':          drawGrid(ctx, layer, W, H); break;
        case 'scanlines':     drawScanlines(ctx, layer, W, H); break;
    }

    ctx.restore();
}

// ── Background ─────────────────────────────────────────────────────────────
function drawBackground(ctx, l, W, H, t) {
    const color = l.color || '#000';
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, W, H);

    // Animated noise overlay
    if (l.noise) {
        ctx.globalAlpha = l.noiseOpacity ?? 0.04;
        // Draw static pattern using pseudo-random pixel approach with fillRect
        const sz = 3;
        for (let y = 0; y < H; y += sz*2) {
            for (let x = 0; x < W; x += sz*2) {
                if (((x*y + Math.floor(t*30)) % 7) < 3) {
                    ctx.fillStyle = 'rgba(255,255,255,0.5)';
                    ctx.fillRect(x, y, sz, sz);
                }
            }
        }
        ctx.globalAlpha = 1;
    }

    // Vignette
    if (l.vignette !== false) {
        const vig = ctx.createRadialGradient(W/2,H/2, H*0.3, W/2,H/2, H*0.85);
        vig.addColorStop(0, 'rgba(0,0,0,0)');
        vig.addColorStop(1, `rgba(0,0,0,${l.vignetteStrength ?? 0.45})`);
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, W, H);
    }
}

// ── Gradient backgrounds ───────────────────────────────────────────────────
function drawGradient(ctx, l, W, H, t) {
    let grad;
    const type   = l.gradientType || 'linear';
    const colors = l.colors || ['#000', '#111'];
    const angle  = ((l.angle ?? 180) + (l.animated ? t * 20 : 0)) * Math.PI / 180;

    if (type === 'radial') {
        grad = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W,H)*0.72);
    } else if (type === 'conic') {
        // Simulate conic with multiple radial sections
        grad = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W,H));
    } else {
        const x1 = W/2 - Math.cos(angle)*W, y1 = H/2 - Math.sin(angle)*H;
        const x2 = W/2 + Math.cos(angle)*W, y2 = H/2 + Math.sin(angle)*H;
        grad = ctx.createLinearGradient(x1, y1, x2, y2);
    }

    colors.forEach((c, i) => grad.addColorStop(i / (colors.length - 1), c));
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    if (l.vignette !== false) {
        const vig = ctx.createRadialGradient(W/2,H/2, H*0.25, W/2,H/2, H*0.8);
        vig.addColorStop(0,'rgba(0,0,0,0)');
        vig.addColorStop(1,`rgba(0,0,0,${l.vignetteStrength ?? 0.4})`);
        ctx.fillStyle = vig;
        ctx.fillRect(0,0,W,H);
    }
}

// ── Image layer ────────────────────────────────────────────────────────────
async function drawImage(ctx, l, W, H, t, dur, loadImage) {
    if (!l.src) return;
    let img;
    try { img = await loadImage(l.src); } catch { return; }

    const x = l.x ?? 0, y = l.y ?? 0;
    const w = l.width ?? W, h = l.height ?? H;
    const fit = l.fit || 'cover';

    ctx.save();
    if (l.borderRadius) {
        roundRect(ctx, x, y, w, h, l.borderRadius);
        ctx.clip();
    }

    if (fit === 'cover') {
        const scale = Math.max(w / img.width, h / img.height);
        const iw = img.width * scale, ih = img.height * scale;
        ctx.drawImage(img, x + (w-iw)/2, y + (h-ih)/2, iw, ih);
    } else if (fit === 'contain') {
        const scale = Math.min(w / img.width, h / img.height);
        const iw = img.width * scale, ih = img.height * scale;
        ctx.drawImage(img, x + (w-iw)/2, y + (h-ih)/2, iw, ih);
    } else {
        ctx.drawImage(img, x, y, w, h);
    }

    // Parallax effect
    if (l.parallax) {
        // Already handled by adjusting position; parallax multiplier used in engine
    }

    ctx.restore();
}

// ── Text layer ─────────────────────────────────────────────────────────────
function drawText(ctx, l, W, H, t, dur, amp) {
    const text    = String(l.text || '');
    const x       = l.x ?? W/2;
    const y       = l.y ?? H/2;
    const fs      = l.fontSize ?? 60;
    const ff      = l.fontFamily ?? 'Arial Black, Impact, sans-serif';
    const color   = l.color || '#fff';
    const align   = l.align || 'center';
    const maxW    = l.maxWidth ?? W * 0.88;

    // Animation
    const anim   = l.animation || 'none';
    let dx = 0, dy = 0, scale = 1, rotation = 0, charAlpha = 1;

    const p = progress(t, l.startT ?? 0, (l.startT ?? 0) + (l.animDur ?? 0.5));

    switch (anim) {
        case 'slide-up':    dy = tween(60, 0, p, 'easeOut');    charAlpha = p; break;
        case 'slide-down':  dy = tween(-60, 0, p, 'easeOut');   charAlpha = p; break;
        case 'slide-left':  dx = tween(80, 0, p, 'easeOut');    charAlpha = p; break;
        case 'slide-right': dx = tween(-80, 0, p, 'easeOut');   charAlpha = p; break;
        case 'pop':         scale = tween(0.3, 1, p, 'elastic'); charAlpha = clamp(p*3); break;
        case 'bounce-in':   dy = tween(-H*0.12, 0, p, 'bounce'); charAlpha = clamp(p*2); break;
        case 'fade':        charAlpha = p; break;
        case 'typewriter': break; // handled below
        case 'pulse':       scale = 1 + 0.04 * Math.sin(t * Math.PI * 3.5); break;
        case 'shake':
            if (amp > 0.3) { dx = (Math.random()-0.5) * amp * 12; dy = (Math.random()-0.5) * amp * 6; }
            break;
    }

    ctx.save();
    ctx.font = `${l.fontWeight || 'bold'} ${fs}px ${ff}`;
    ctx.textAlign = align;
    ctx.textBaseline = l.baseline || 'middle';
    ctx.translate(x + dx, y + dy);
    if (scale !== 1) ctx.scale(scale, scale);
    if (rotation) ctx.rotate(rotation);

    // Shadow / glow
    if (l.shadow) {
        ctx.shadowColor   = l.shadowColor || 'rgba(0,0,0,0.7)';
        ctx.shadowBlur    = l.shadowBlur ?? 18;
        ctx.shadowOffsetX = l.shadowOffsetX ?? 0;
        ctx.shadowOffsetY = l.shadowOffsetY ?? 4;
    }
    if (l.glow) {
        ctx.shadowColor = l.glowColor || color;
        ctx.shadowBlur  = l.glowBlur ?? 30;
    }

    ctx.globalAlpha *= charAlpha;

    // Stroke
    if (l.stroke) {
        ctx.strokeStyle = l.strokeColor || '#000';
        ctx.lineWidth   = l.strokeWidth ?? 4;
        ctx.lineJoin    = 'round';
        wrapText(ctx, text, 0, 0, maxW, (l.lineHeight ?? 1.2) * fs, 'stroke', anim, t, l);
    }

    // Fill or gradient fill
    if (l.gradient) {
        const gr = ctx.createLinearGradient(-maxW/2, -fs/2, maxW/2, fs/2);
        l.gradient.forEach((c,i) => gr.addColorStop(i / (l.gradient.length-1), c));
        ctx.fillStyle = gr;
    } else {
        ctx.fillStyle = color;
    }

    wrapText(ctx, text, 0, 0, maxW, (l.lineHeight ?? 1.2) * fs, 'fill', anim, t, l);

    ctx.restore();
}

function wrapText(ctx, text, x, y, maxW, lineH, mode, anim, t, l) {
    // First split on explicit newlines, then word-wrap each segment
    const segments = String(text).split('\n');
    const lines = [];
    for (const seg of segments) {
        const words = seg.split(' ').filter(Boolean);
        if (!words.length) { lines.push(''); continue; }
        let line = '';
        for (const w of words) {
            const test = line ? line + ' ' + w : w;
            if (ctx.measureText(test).width > maxW && line) {
                lines.push(line); line = w;
            } else { line = test; }
        }
        if (line) lines.push(line);
    }

    const totalH = (lines.length - 1) * lineH;
    lines.forEach((ln, i) => {
        const ly = y + i * lineH - totalH/2;
        if (anim === 'typewriter') {
            const chars = Math.floor(t / (l.animDur ?? 2) * ln.length);
            const visible = ln.slice(0, chars);
            if (mode === 'fill') ctx.fillText(visible, x, ly);
            else ctx.strokeText(visible, x, ly);
        } else {
            if (mode === 'fill') ctx.fillText(ln, x, ly);
            else ctx.strokeText(ln, x, ly);
        }
    });
}

// ── Kinetic Text (word-by-word reveal, NEVER overlapping) ─────────────────
function drawKineticText(ctx, l, W, H, t, dur, amp) {
    const words    = String(l.text || '').split(' ').filter(Boolean);
    const x        = l.x ?? W/2;
    const y        = l.y ?? H/2;
    const fs       = l.fontSize ?? 72;
    const ff       = l.fontFamily ?? 'Impact, Arial Black, sans-serif';
    const color    = l.color || '#fff';
    const hiColor  = l.highlightColor || '#ffdd00';
    const kStyle   = l.kineticStyle || 'pop';

    // ── Build guaranteed non-overlapping timing ──────────────────────────
    // Each word gets [startSec, endSec] where endSec === next word's startSec.
    // If caller supplied wordTiming we still enforce no overlap.
    const minWordDur = l.minWordDur ?? 0.28;   // never shorter than this
    const supplied   = Array.isArray(l.wordTiming) && l.wordTiming.length === words.length;

    let timing;
    if (supplied) {
        // Enforce sequential: start of word N >= end of word N-1
        timing = [];
        let cursor = 0;
        for (let i = 0; i < words.length; i++) {
            const [ws, we] = l.wordTiming[i];
            const safeStart = Math.max(ws, cursor);
            const safeEnd   = Math.max(safeStart + minWordDur, we);
            timing.push([safeStart, safeEnd]);
            cursor = safeEnd;
        }
    } else {
        // Auto-distribute evenly across dur, strict sequence
        const usableDur  = dur * 0.92;          // leave 8% breathing room at end
        const perWord    = Math.max(minWordDur, usableDur / words.length);
        timing = words.map((_, i) => [i * perWord, (i + 1) * perWord]);
    }

    ctx.save();
    ctx.font = `bold ${fs}px ${ff}`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';

    const rowH        = fs * 1.42;
    const wordsPerRow = l.wordsPerRow ?? 3;
    // Total rows needed
    const totalRows   = Math.ceil(words.length / wordsPerRow);
    const blockH      = (totalRows - 1) * rowH;

    words.forEach((word, i) => {
        const [ws, we] = timing[i];

        // Don't render words that haven't started yet
        if (t < ws) return;

        const col      = i % wordsPerRow;
        const row      = Math.floor(i / wordsPerRow);
        const wx       = x + (col - (wordsPerRow - 1) / 2) * (W / wordsPerRow * 0.88);
        const wy       = y + row * rowH - blockH / 2;

        // isActive: word is currently being "spoken"
        const isActive = t >= ws && t < we;

        ctx.save();
        ctx.translate(wx, wy);

        switch (kStyle) {
            case 'pop': {
                const enterP = clamp((t - ws) / 0.14);
                ctx.scale(ease.elastic(enterP), ease.elastic(enterP));
                ctx.globalAlpha *= isActive ? 1.0 : 0.5;
                ctx.fillStyle = isActive ? hiColor : color;
                if (l.shadow || isActive) {
                    ctx.shadowColor = isActive ? hiColor : 'rgba(0,0,0,0.6)';
                    ctx.shadowBlur  = isActive ? 20 : 10;
                }
                ctx.strokeStyle = '#000';
                ctx.lineWidth   = fs * 0.07;
                ctx.lineJoin    = 'round';
                ctx.strokeText(word, 0, 0);
                ctx.fillText(word, 0, 0);
                break;
            }
            case 'fly': {
                const enterP = clamp((t - ws) / 0.18);
                ctx.translate(0, tween(-50, 0, enterP, 'easeOut'));
                ctx.globalAlpha *= clamp(enterP * 3) * (isActive ? 1.0 : 0.45);
                ctx.fillStyle = isActive ? hiColor : color;
                if (isActive) { ctx.shadowColor = hiColor; ctx.shadowBlur = 18; }
                ctx.fillText(word, 0, 0);
                break;
            }
            case 'glow': {
                const enterP = clamp((t - ws) / 0.12);
                ctx.globalAlpha *= clamp(enterP * 4) * (isActive ? 1.0 : 0.4);
                ctx.fillStyle   = isActive ? hiColor : color;
                ctx.shadowColor = isActive ? hiColor : 'transparent';
                ctx.shadowBlur  = isActive ? 45 : 0;
                ctx.fillText(word, 0, 0);
                // Second pass for stronger glow
                if (isActive) ctx.fillText(word, 0, 0);
                break;
            }
            case 'stamp': {
                const enterP = clamp((t - ws) / 0.09);
                const sc     = tween(2.8, 1.0, enterP, 'easeOut4');
                ctx.scale(sc, sc);
                ctx.globalAlpha *= isActive ? 1.0 : 0.38;
                ctx.strokeStyle = '#000';
                ctx.lineWidth   = 7 / sc;
                ctx.lineJoin    = 'round';
                ctx.strokeText(word, 0, 0);
                ctx.fillStyle = isActive ? hiColor : color;
                ctx.fillText(word, 0, 0);
                break;
            }
        }

        ctx.restore();
    });

    ctx.restore();
}

// ── Shape layer ────────────────────────────────────────────────────────────
function drawShape(ctx, l, W, H, t) {
    const x = l.x ?? W/2, y = l.y ?? H/2;
    const w = l.width ?? 200, h = l.height ?? 200;
    const color = l.color || '#fff';
    const anim  = l.animation;

    let scale = 1, rot = l.rotation ?? 0;
    if (anim === 'spin')    rot += t * (l.speed ?? 1) * Math.PI * 2;
    if (anim === 'pulse')   scale = 1 + 0.08 * Math.sin(t * Math.PI * (l.speed ?? 2));
    if (anim === 'breathe') scale = 1 + 0.15 * Math.sin(t * Math.PI * (l.speed ?? 0.8));

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.scale(scale, scale);

    if (l.shadow) { ctx.shadowColor = l.shadowColor||'rgba(0,0,0,0.5)'; ctx.shadowBlur = l.shadowBlur||20; }
    if (l.glow)   { ctx.shadowColor = l.glowColor||color; ctx.shadowBlur = l.glowBlur||40; }

    ctx.fillStyle   = color;
    ctx.strokeStyle = l.strokeColor || color;
    ctx.lineWidth   = l.strokeWidth ?? 3;

    switch (l.shape) {
        case 'rect': case 'rectangle':
            if (l.borderRadius) { roundRect(ctx, -w/2,-h/2,w,h, l.borderRadius); ctx.fill(); if(l.stroke) ctx.stroke(); }
            else { ctx.fillRect(-w/2,-h/2,w,h); if(l.stroke) ctx.strokeRect(-w/2,-h/2,w,h); }
            break;
        case 'circle':
            ctx.beginPath(); ctx.arc(0,0,w/2,0,Math.PI*2); ctx.fill(); if(l.stroke) ctx.stroke();
            break;
        case 'triangle':
            ctx.beginPath(); ctx.moveTo(0,-h/2); ctx.lineTo(w/2,h/2); ctx.lineTo(-w/2,h/2); ctx.closePath();
            ctx.fill(); if(l.stroke) ctx.stroke();
            break;
        case 'star':
            drawStarShape(ctx, 0, 0, l.spikes||5, w/2, w/4); ctx.fill(); if(l.stroke) ctx.stroke();
            break;
        case 'diamond':
            ctx.beginPath(); ctx.moveTo(0,-h/2); ctx.lineTo(w/2,0); ctx.lineTo(0,h/2); ctx.lineTo(-w/2,0); ctx.closePath();
            ctx.fill(); if(l.stroke) ctx.stroke();
            break;
        case 'line':
            ctx.beginPath(); ctx.moveTo(-w/2,0); ctx.lineTo(w/2,0);
            ctx.strokeStyle = color; ctx.lineWidth = l.thickness ?? 4; ctx.lineCap='round'; ctx.stroke();
            break;
        case 'arrow':
            drawArrow(ctx, -w/2, 0, w/2, 0, l.thickness??6, color);
            break;
    }

    ctx.restore();
}

// ── Waveform / Audio Visualizer ────────────────────────────────────────────
function drawWaveform(ctx, l, W, H, amp, t, frameNum, ampEnv) {
    const x = l.x ?? 0, y = l.y ?? H*0.85;
    const w = l.width ?? W, h = l.height ?? 120;
    const color = l.color || '#fff';
    const style = l.vizStyle || 'bars'; // bars | wave | circle | mirror

    const bars  = l.bars ?? 48;
    const env   = ampEnv;

    ctx.save();
    ctx.fillStyle   = color;
    ctx.strokeStyle = color;

    switch (style) {
        case 'bars': {
            const bw = w / bars * 0.72;
            const gap = w / bars;
            for (let i = 0; i < bars; i++) {
                const phase   = i / bars * Math.PI * 4 + t * 8;
                const envVal  = env ? (env[Math.min(frameNum, env.length-1)] || amp) : amp;
                const barAmp  = envVal * (0.4 + 0.6 * Math.abs(Math.sin(phase)));
                const bh = barAmp * h;
                const bx = x + i * gap;
                const by = y - bh;
                // Gradient bar
                const grad = ctx.createLinearGradient(0, y, 0, y - h);
                grad.addColorStop(0, color + '33');
                grad.addColorStop(1, color);
                ctx.fillStyle = grad;
                roundRect(ctx, bx, by, bw, bh, bw/2);
                ctx.fill();
            }
            break;
        }
        case 'wave': {
            ctx.beginPath();
            ctx.moveTo(x, y);
            for (let i = 0; i <= bars*2; i++) {
                const px   = x + (i / (bars*2)) * w;
                const envV = env ? (env[Math.min(frameNum, env.length-1)] || amp) : amp;
                const py   = y - Math.sin(i * 0.5 + t * 10) * envV * h * 0.5;
                i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
            }
            ctx.strokeStyle = color;
            ctx.lineWidth = l.lineWidth ?? 3;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();
            break;
        }
        case 'circle': {
            const cx = l.cx ?? W/2, cy = l.cy ?? H/2;
            const r  = l.radius ?? 120;
            for (let i = 0; i < bars; i++) {
                const angle  = (i / bars) * Math.PI * 2 - Math.PI/2;
                const envV   = env ? (env[Math.min(frameNum, env.length-1)] || amp) : amp;
                const barLen = envV * (0.3 + 0.7 * Math.abs(Math.sin(i*0.4 + t*6))) * r*0.5;
                ctx.beginPath();
                ctx.moveTo(cx + Math.cos(angle)*r, cy + Math.sin(angle)*r);
                ctx.lineTo(cx + Math.cos(angle)*(r+barLen), cy + Math.sin(angle)*(r+barLen));
                ctx.strokeStyle = color;
                ctx.lineWidth = w/bars*0.5;
                ctx.lineCap = 'round';
                ctx.stroke();
            }
            break;
        }
        case 'mirror': {
            const bw  = w / bars * 0.72;
            const gap = w / bars;
            for (let i = 0; i < bars; i++) {
                const envV  = env ? (env[Math.min(frameNum, env.length-1)] || amp) : amp;
                const barAmp = envV * (0.4 + 0.6 * Math.abs(Math.sin(i*0.3 + t*7)));
                const bh = barAmp * h / 2;
                const bx = x + i * gap;
                ctx.fillStyle = color;
                roundRect(ctx, bx, y-bh, bw, bh, bw/2); ctx.fill();
                roundRect(ctx, bx, y, bw, bh, bw/2); ctx.fill();
            }
            break;
        }
    }

    ctx.restore();
}

// ── Chart layer ────────────────────────────────────────────────────────────
function drawChart(ctx, l, W, H, t, dur) {
    const x = l.x ?? W*0.07, y = l.y ?? H*0.25;
    const w = l.width ?? W*0.86, h = l.height ?? H*0.45;
    const type   = l.chartType || 'bar'; // bar | line | pie | donut
    const data   = l.data || [];
    const colors = l.colors || ['#ff3b5c','#4ecdc4','#ffe66d','#a8e6cf','#ff8b94'];
    const animP  = clamp(t / (l.animDur ?? Math.min(dur, 1.5)));

    if (!data.length) return;

    ctx.save();

    switch (type) {
        case 'bar': {
            const max  = Math.max(...data.map(d => d.value || d));
            const barW = w / data.length * 0.65;
            const gap  = w / data.length;

            // Axis
            ctx.strokeStyle = 'rgba(255,255,255,0.25)';
            ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(x, y+h); ctx.lineTo(x+w, y+h); ctx.stroke();

            data.forEach((d, i) => {
                const val   = (d.value ?? d);
                const pct   = (val / max) * animP;
                const bh    = pct * h;
                const bx    = x + i * gap + (gap - barW)/2;
                const by    = y + h - bh;
                const c     = d.color || colors[i % colors.length];

                // Bar gradient
                const grad = ctx.createLinearGradient(0, by, 0, y+h);
                grad.addColorStop(0, c);
                grad.addColorStop(1, c + '55');
                ctx.fillStyle = grad;
                roundRect(ctx, bx, by, barW, bh, barW*0.12);
                ctx.fill();

                // Glow
                ctx.shadowColor = c; ctx.shadowBlur = 15;
                ctx.fill();
                ctx.shadowBlur = 0;

                // Value on top of bar
                if (animP > 0.8 && bh > 10) {
                    ctx.fillStyle = '#fff';
                    const valFs = Math.max(18, Math.min(28, Math.round(barW * 0.38)));
                    ctx.font = `bold ${valFs}px Arial, sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    ctx.shadowColor = 'rgba(0,0,0,0.8)'; ctx.shadowBlur = 6;
                    ctx.fillText(String(val), bx + barW/2, by - 4);
                    ctx.shadowBlur = 0;
                }
                // Label below axis — clipped to bar width, small font
                if (d.label) {
                    const labelFs = Math.max(16, Math.min(22, Math.round(barW * 0.28)));
                    ctx.fillStyle = 'rgba(255,255,255,0.65)';
                    ctx.font = `${labelFs}px Arial, sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.shadowBlur = 0;
                    // Word-wrap label into max 2 lines within bar width
                    const words = String(d.label).split(/[\s\n]+/);
                    const lines = [];
                    let line = '';
                    for (const w2 of words) {
                        const test = line ? line + ' ' + w2 : w2;
                        if (ctx.measureText(test).width > barW * 1.1 && line) {
                            lines.push(line); line = w2;
                        } else { line = test; }
                    }
                    if (line) lines.push(line);
                    lines.slice(0, 2).forEach((ln, li) => {
                        ctx.fillText(ln, bx + barW/2, y + h + 10 + li * (labelFs + 3));
                    });
                }
            });
            break;
        }

        case 'line': {
            const max = Math.max(...data.map(d => d.value ?? d));
            const pts = data.map((d, i) => [
                x + (i/(data.length-1)) * w,
                y + h - ((d.value??d)/max) * h * animP
            ]);

            // Area fill
            const areaGrad = ctx.createLinearGradient(0, y, 0, y+h);
            areaGrad.addColorStop(0, (l.lineColor || colors[0]) + '55');
            areaGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = areaGrad;
            ctx.beginPath();
            ctx.moveTo(pts[0][0], y+h);
            pts.forEach(([px,py]) => ctx.lineTo(px, py));
            ctx.lineTo(pts[pts.length-1][0], y+h);
            ctx.closePath();
            ctx.fill();

            // Line
            ctx.strokeStyle = l.lineColor || colors[0];
            ctx.lineWidth   = l.lineWidth ?? 4;
            ctx.lineJoin    = 'round';
            ctx.lineCap     = 'round';
            ctx.beginPath();
            pts.forEach(([px,py],i) => i===0 ? ctx.moveTo(px,py) : ctx.lineTo(px,py));
            ctx.stroke();

            // Dots
            pts.forEach(([px,py],i) => {
                ctx.beginPath();
                ctx.arc(px, py, 6, 0, Math.PI*2);
                ctx.fillStyle = l.lineColor || colors[0];
                ctx.fill();
                ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
            });
            break;
        }

        case 'pie': case 'donut': {
            // cx/cy: if l.cx/l.cy provided use them directly (absolute coords)
            // otherwise treat x,y as CENTER of the chart (not top-left)
            const cx = l.cx ?? x;
            const cy = l.cy ?? y;
            const r  = Math.min(w,h) * 0.42;
            const ir = type==='donut' ? r*0.5 : 0;
            const total = data.reduce((s,d) => s+(d.value??d), 0);
            let startA = -Math.PI/2;

            data.forEach((d,i) => {
                const val = (d.value ?? d);
                const sweep = (val/total) * Math.PI*2 * animP;
                const c = d.color || colors[i%colors.length];
                const mid = startA + sweep/2;

                // Explode on hover effect
                const ox = l.explode ? Math.cos(mid)*8 : 0;
                const oy = l.explode ? Math.sin(mid)*8 : 0;

                ctx.save();
                ctx.translate(ox, oy);
                ctx.beginPath();
                ctx.moveTo(cx, cy); ctx.arc(cx,cy,r,startA,startA+sweep);
                if (ir > 0) { ctx.arc(cx,cy,ir,startA+sweep,startA,true); }
                ctx.closePath();
                ctx.fillStyle = c;
                ctx.shadowColor = c; ctx.shadowBlur = 12;
                ctx.fill();
                ctx.restore();

                // Label — place OUTSIDE ring with leader
                if (animP > 0.9 && d.label) {
                    const lfs  = Math.max(22, Math.round(r * 0.14));
                    const lx   = cx + Math.cos(mid) * (r * 1.28);
                    const ly   = cy + Math.sin(mid) * (r * 1.28);
                    ctx.font = `bold ${lfs}px Arial`;
                    ctx.textAlign = Math.cos(mid) > 0 ? 'left' : (Math.cos(mid) < -0.1 ? 'right' : 'center');
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = d.color || '#fff';
                    ctx.shadowColor = 'rgba(0,0,0,0.9)'; ctx.shadowBlur = 8;
                    ctx.fillText(d.label, lx, ly);
                    ctx.shadowBlur = 0;
                }

                startA += sweep;
            });
            break;
        }
    }

    ctx.restore();
}

// ── Phone / Browser Mockup ─────────────────────────────────────────────────
async function drawMockup(ctx, l, W, H, t, loadImage) {
    const type  = l.mockupType || 'phone'; // phone | browser | tablet
    const x     = l.x ?? W/2, y = l.y ?? H/2;
    const mw    = l.width ?? 340, mh = l.height ?? 620;
    const color = l.frameColor || '#1a1a2e';
    const p     = clamp(t / (l.animDur ?? 0.5));
    const scale = ease.elastic(p);

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    if (type === 'phone') {
        // Phone body
        ctx.fillStyle = color;
        ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 20;
        roundRect(ctx, -mw/2, -mh/2, mw, mh, 38);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Screen bezel
        ctx.fillStyle = '#000';
        roundRect(ctx, -mw/2+10, -mh/2+10, mw-20, mh-20, 28);
        ctx.fill();

        // Notch
        ctx.fillStyle = color;
        roundRect(ctx, -mw*0.22, -mh/2+10, mw*0.44, 28, 14);
        ctx.fill();

        // Buttons
        ctx.fillStyle = color;
        ctx.fillRect(mw/2-2, -mh*0.15, 5, 40);   // power
        ctx.fillRect(-mw/2-3, -mh*0.18, 5, 28);   // vol up
        ctx.fillRect(-mw/2-3, -mh*0.09, 5, 28);   // vol down

        // Screen content clip
        ctx.save();
        roundRect(ctx, -mw/2+12, -mh/2+42, mw-24, mh-72, 22);
        ctx.clip();

        if (l.screenContent) {
            // Render a sub-canvas for screen content
            ctx.fillStyle = l.screenBg || '#0f0f0f';
            ctx.fillRect(-mw/2+12, -mh/2+42, mw-24, mh-72);
        }
        ctx.restore();

        // Home indicator
        ctx.fillStyle = '#fff'; ctx.globalAlpha = 0.3;
        roundRect(ctx, -30, mh/2-18, 60, 5, 3); ctx.fill();

    } else if (type === 'browser') {
        // Browser window
        ctx.fillStyle = color;
        ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 30;
        roundRect(ctx, -mw/2, -mh/2, mw, mh, 16);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Title bar
        ctx.fillStyle = '#2a2a3e';
        roundRect(ctx, -mw/2, -mh/2, mw, 44, 16);
        ctx.fill();
        ctx.fillStyle = '#2a2a3e';
        ctx.fillRect(-mw/2, -mh/2+28, mw, 16);

        // Traffic lights
        [['#ff5f57',-mw/2+20],['#febc2e',-mw/2+40],['#28c840',-mw/2+60]].forEach(([c,bx]) => {
            ctx.beginPath(); ctx.arc(bx, -mh/2+22, 7, 0, Math.PI*2);
            ctx.fillStyle = c; ctx.fill();
        });

        // URL bar
        ctx.fillStyle = '#1a1a2e';
        roundRect(ctx, -mw/2+90, -mh/2+12, mw-110, 20, 10);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.font = `12px Arial`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(l.url || 'https://your-content.com', 0, -mh/2+22);

        // Screen area
        ctx.fillStyle = l.screenBg || '#fff';
        ctx.fillRect(-mw/2, -mh/2+44, mw, mh-44);
    }

    ctx.restore();
}

// ── Progress bar ───────────────────────────────────────────────────────────
function drawProgressBar(ctx, l, W, H, t, dur) {
    const x = l.x ?? W*0.1, y = l.y ?? H*0.92;
    const w = l.width ?? W*0.8, h = l.height ?? 12;
    const pct  = l.progress ?? clamp(t / dur);
    const anim = ease.easeInOut(pct);

    ctx.save();
    ctx.fillStyle = l.trackColor || 'rgba(255,255,255,0.2)';
    roundRect(ctx, x, y-h/2, w, h, h/2); ctx.fill();

    const grad = ctx.createLinearGradient(x, 0, x+w, 0);
    (l.colors || [l.color||'#ff3b5c', l.color2||'#ff8c00']).forEach((c,i,a) => grad.addColorStop(i/(a.length-1), c));
    ctx.fillStyle = grad;
    ctx.shadowColor = l.color || '#ff3b5c'; ctx.shadowBlur = 15;
    roundRect(ctx, x, y-h/2, w*anim, h, h/2); ctx.fill();
    ctx.shadowBlur = 0;

    if (l.showLabel) {
        ctx.fillStyle = '#fff'; ctx.font = `bold ${h*1.4}px Arial`;
        ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
        ctx.fillText(`${Math.round(pct*100)}%`, x+w, y-h);
    }
    ctx.restore();
}

// ── Countdown ─────────────────────────────────────────────────────────────
function drawCountdown(ctx, l, W, H, t, dur) {
    const from = l.from ?? 5;
    const curr = Math.ceil(from - t);
    if (curr <= 0) return;

    const x = l.x ?? W/2, y = l.y ?? H/2;
    const p = 1 - (t % 1); // within-second progress for animation
    const sc = 1 + (1-p)*0.4;

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(sc, sc);
    ctx.globalAlpha = p;
    ctx.font = `bold ${l.fontSize ?? 180}px Arial Black, Impact`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = l.color || '#fff';
    ctx.shadowColor = l.color || '#fff'; ctx.shadowBlur = 40;
    ctx.fillText(String(curr), 0, 0);
    ctx.restore();
}

// ── Divider ────────────────────────────────────────────────────────────────
function drawDivider(ctx, l, W, H, t) {
    const y = l.y ?? H/2, x1 = l.x1 ?? W*0.1, x2 = l.x2 ?? W*0.9;
    const animP = clamp(t / (l.animDur ?? 0.4));
    const cx = (x1+x2)/2;
    const hw  = (x2-x1)/2 * animP;

    const grad = ctx.createLinearGradient(cx-hw, 0, cx+hw, 0);
    grad.addColorStop(0, 'transparent');
    grad.addColorStop(0.1, l.color || 'rgba(255,255,255,0.6)');
    grad.addColorStop(0.9, l.color || 'rgba(255,255,255,0.6)');
    grad.addColorStop(1, 'transparent');
    ctx.strokeStyle = grad;
    ctx.lineWidth = l.thickness ?? 2;
    ctx.beginPath(); ctx.moveTo(cx-hw, y); ctx.lineTo(cx+hw, y); ctx.stroke();
}

// ── Full-screen overlay (color tint, grain, etc.) ─────────────────────────
function drawOverlay(ctx, l, W, H, t) {
    ctx.fillStyle = l.color || 'rgba(0,0,0,0.3)';
    ctx.fillRect(0,0,W,H);
    if (l.grain) {
        const sz = 2;
        ctx.globalAlpha = l.grainOpacity ?? 0.05;
        for (let yy = 0; yy < H; yy += sz*2) {
            for (let xx = 0; xx < W; xx += sz*2) {
                if (((xx*yy*3 + Math.floor(t*24)) % 5) < 2) {
                    ctx.fillStyle = 'rgba(255,255,255,0.8)';
                    ctx.fillRect(xx, yy, sz, sz);
                }
            }
        }
        ctx.globalAlpha = 1;
    }
}

// ── Debug grid ────────────────────────────────────────────────────────────
function drawGrid(ctx, l, W, H) {
    ctx.strokeStyle = 'rgba(255,0,255,0.2)';
    ctx.lineWidth = 1;
    const cols = l.cols ?? 6, rows = l.rows ?? 12;
    for (let i = 0; i <= cols; i++) { const x = i*W/cols; ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
    for (let i = 0; i <= rows; i++) { const y = i*H/rows; ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(255,0,255,0.5)';
    ctx.beginPath(); ctx.moveTo(W/2,0); ctx.lineTo(W/2,H); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0,H/2); ctx.lineTo(W,H/2); ctx.stroke();
}

// ── Scanlines effect ──────────────────────────────────────────────────────
function drawScanlines(ctx, l, W, H) {
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    const step = l.spacing ?? 4;
    for (let y = 0; y < H; y += step*2) ctx.fillRect(0, y, W, step);
}

// ── Helpers ────────────────────────────────────────────────────────────────
function roundRect(ctx, x, y, w, h, r) {
    r = Math.min(r, w/2, h/2);
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.arcTo(x+w,y, x+w,y+h, r); ctx.arcTo(x+w,y+h, x,y+h, r);
    ctx.arcTo(x,y+h, x,y, r);     ctx.arcTo(x,y, x+w,y, r);
    ctx.closePath();
}

function drawStarShape(ctx, cx, cy, spikes, outer, inner) {
    let rot = Math.PI/2*3, step = Math.PI/spikes;
    ctx.beginPath(); ctx.moveTo(cx, cy-outer);
    for (let i=0; i<spikes; i++) {
        ctx.lineTo(cx+Math.cos(rot)*outer, cy+Math.sin(rot)*outer); rot+=step;
        ctx.lineTo(cx+Math.cos(rot)*inner, cy+Math.sin(rot)*inner); rot+=step;
    }
    ctx.closePath();
}

function drawArrow(ctx, x1,y1,x2,y2, lw, color) {
    const angle = Math.atan2(y2-y1, x2-x1);
    const hl = lw*3;
    ctx.strokeStyle = color; ctx.fillStyle = color;
    ctx.lineWidth = lw; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2-Math.cos(angle)*hl, y2-Math.sin(angle)*hl); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2-Math.cos(angle-0.45)*hl*1.5, y2-Math.sin(angle-0.45)*hl*1.5);
    ctx.lineTo(x2-Math.cos(angle+0.45)*hl*1.5, y2-Math.sin(angle+0.45)*hl*1.5);
    ctx.closePath(); ctx.fill();
}

module.exports = { drawLayer, prepareScene };