'use strict';
/**
 * avatar.js  —  APEX Engine v2.0
 *
 * Robot avatar matching SVG reference:
 *   - Body: light gray rounded squircle
 *   - Head: dark navy (#112c3a) section covering the upper body
 *   - Eyes: glowing cyan rounded rectangles on the dark head (no screen panel)
 *   - Mouth: cyan curve on the dark head
 *   - Ear nubs: dark navy small circles on top corners of head
 *   - Arms: long tapered gray wing/fin shapes floating beside body
 */

const { clamp, ease } = require('./easing');

// ── Blink state ───────────────────────────────────────────────────────────
let _blinkTimer = 0;
let _nextBlink  = 3.0;
let _blinkPhase = 0;

function resetBlink() {
    _blinkTimer = 0;
    _nextBlink  = 2.5 + Math.random() * 3.5;
    _blinkPhase = 0;
}

function getBlinkAmount(dt) {
    _blinkTimer += dt;
    switch (_blinkPhase) {
        case 0:
            if (_blinkTimer >= _nextBlink) { _blinkPhase = 1; _blinkTimer = 0; }
            return 1;
        case 1: {
            const v = clamp(_blinkTimer / 0.07);
            if (v >= 1) { _blinkPhase = 2; _blinkTimer = 0; }
            return 1 - v;
        }
        case 2: {
            if (_blinkTimer >= 0.05) { _blinkPhase = 3; _blinkTimer = 0; }
            return 0;
        }
        case 3: {
            const v = clamp(_blinkTimer / 0.10);
            if (v >= 1) {
                _blinkPhase = 0; _blinkTimer = 0;
                _nextBlink  = 2.0 + Math.random() * 4.0;
            }
            return v;
        }
    }
    return 1;
}

// ── Main draw ─────────────────────────────────────────────────────────────
function drawAvatar(ctx, cfg, amp, t, dt) {
    const {
        x           = 540,
        y           = 1350,
        size        = 200,
        bodyColor   = '#d0d2dc',    // light gray body (SVG gradient midpoint)
        headColor   = '#112c3a',    // dark navy head — rgb(17,44,58) from SVG
        accentColor = '#6deaf8',    // cyan eyes/mouth — rgb(109,234,248) from SVG
        expression  = 'neutral',
        name        = null,
    } = cfg;

    const blink = getBlinkAmount(dt);

    // Gentle idle bob + slight rotation
    const bobY = Math.sin(t * Math.PI * 1.1) * size * 0.022;
    const bobR = Math.sin(t * Math.PI * 0.7) * 0.016;

    ctx.save();
    ctx.translate(x, y + bobY);
    ctx.rotate(bobR);

    // ── Ground shadow ─────────────────────────────────────────────────────
    ctx.save();
    ctx.globalAlpha = 0.22;
    const sg = ctx.createRadialGradient(0, size * 1.12, 0, 0, size * 1.12, size * 0.9);
    sg.addColorStop(0, 'rgba(0,0,0,0.7)');
    sg.addColorStop(1, 'transparent');
    ctx.fillStyle = sg;
    ctx.beginPath();
    ctx.ellipse(0, size * 1.15, size * 0.88, size * 0.16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // ── Arms — behind body ────────────────────────────────────────────────
    _drawArms(ctx, size, bodyColor, t);

    // ── Ear nubs — dark navy, drawn before head so head overlaps slightly ─
    _drawEarNubs(ctx, size, headColor);

    // ── Main body — light gray squircle ───────────────────────────────────
    _drawBody(ctx, size, bodyColor);

    // ── Dark navy head — upper portion of body ────────────────────────────
    _drawHead(ctx, size, headColor);

    // ── Face — cyan eyes + mouth directly on dark head ────────────────────
    _drawFace(ctx, size, accentColor, amp, blink, expression, t);

    // ── Name tag ──────────────────────────────────────────────────────────
    if (name) _drawNameTag(ctx, size, name, accentColor);

    ctx.restore();
}

// ─────────────────────────────────────────────────────────────────────────────
// BODY — light gray rounded squircle
// ─────────────────────────────────────────────────────────────────────────────
function _drawBody(ctx, size, bodyColor) {
    const hw = size * 0.82;
    const hh = size * 0.88;
    const r  = size * 0.28;

    ctx.save();
    ctx.shadowColor   = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur    = size * 0.3;
    ctx.shadowOffsetY = size * 0.06;

    // Radial gradient: bright top-left → body gray → darker edge
    const grad = ctx.createRadialGradient(
        -hw * 0.25, -hh * 0.1, size * 0.04,
         hw * 0.1,   hh * 0.3, size * 1.4
    );
    grad.addColorStop(0,    '#f2f4fa');
    grad.addColorStop(0.45, bodyColor);
    grad.addColorStop(1,    '#a0a2b4');

    _squirclePath(ctx, -hw, -hh, hw * 2, hh * 2, r);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();

    // Subtle border
    _squirclePath(ctx, -hw, -hh, hw * 2, hh * 2, r);
    ctx.strokeStyle = 'rgba(140,142,162,0.35)';
    ctx.lineWidth   = size * 0.012;
    ctx.stroke();
}

// ─────────────────────────────────────────────────────────────────────────────
// HEAD — dark navy section covering upper ~55% of the body
// Clipped to body shape so it doesn't overflow
// ─────────────────────────────────────────────────────────────────────────────
function _drawHead(ctx, size, headColor) {
    const hw  = size * 0.82;
    const hh  = size * 0.88;
    const r   = size * 0.28;

    // Head spans from top of body down to ~40% of body height
    const headTop = -hh;
    const headH   = hh * 1.18;   // slightly past centre for smooth division

    ctx.save();

    // Clip to body squircle so head stays inside body shape
    _squirclePath(ctx, -hw, -hh, hw * 2, hh * 2, r);
    ctx.clip();

    // Dark navy gradient — slightly lighter at very top, darker at division
    const hg = ctx.createLinearGradient(0, headTop, 0, headTop + headH);
    hg.addColorStop(0,    '#1e4a62');   // lighter navy at top
    hg.addColorStop(0.55, headColor);   // main dark navy
    hg.addColorStop(1,    '#091820');   // darkest at body division line

    // Fill a rounded rect covering the top of the body
    _squirclePath(ctx, -hw, headTop, hw * 2, headH + r, r);
    ctx.fillStyle = hg;
    ctx.fill();

    // Subtle inner highlight stripe at very top of head
    const shine = ctx.createLinearGradient(0, headTop, 0, headTop + hh * 0.18);
    shine.addColorStop(0, 'rgba(255,255,255,0.06)');
    shine.addColorStop(1, 'transparent');
    _squirclePath(ctx, -hw, headTop, hw * 2, headH + r, r);
    ctx.fillStyle = shine;
    ctx.fill();

    ctx.restore();
}

// ─────────────────────────────────────────────────────────────────────────────
// EAR NUBS — dark navy circles sitting on top corners of the head
// ─────────────────────────────────────────────────────────────────────────────
function _drawEarNubs(ctx, size, headColor) {
    const earR = size * 0.19;
    const earY = -size * 0.78;
    const earX = size * 0.5;

    [-1, 1].forEach(side => {
        const ex = side * earX;

        ctx.save();
        ctx.shadowColor   = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur    = size * 0.1;
        ctx.shadowOffsetY = size * 0.03;

        // Dark navy radial gradient, slightly lighter at highlight
        const eg = ctx.createRadialGradient(
            ex - side * earR * 0.35, earY - earR * 0.35, earR * 0.04,
            ex, earY, earR * 1.1
        );
        eg.addColorStop(0,   '#2a5a78');   // highlight
        eg.addColorStop(0.5, headColor);   // main dark navy
        eg.addColorStop(1,   '#060f16');   // dark edge

        ctx.beginPath();
        ctx.arc(ex, earY, earR, 0, Math.PI * 2);
        ctx.fillStyle = eg;
        ctx.fill();
        ctx.restore();

        // Thin border with slight blue tint
        ctx.beginPath();
        ctx.arc(ex, earY, earR, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(100,160,200,0.2)';
        ctx.lineWidth   = size * 0.009;
        ctx.stroke();
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// ARMS — long tapered wing/fin shapes, gray, floating beside body
// ─────────────────────────────────────────────────────────────────────────────
function _drawArms(ctx, size, bodyColor, t) {
    const flap = Math.sin(t * Math.PI * 1.1) * 0.06;

    [-1, 1].forEach(side => {
        const gap       = size * 0.12;
        const bodyEdge  = size * 0.82;
        const armStartX = side * (bodyEdge + gap);
        const armY      = size * 0.05;

        const wingLen   = size * 0.72;
        const wingThick = size * 0.28;
        const wingTip   = size * 0.06;

        ctx.save();
        ctx.translate(armStartX, armY);
        ctx.rotate(side * flap * 0.8);

        const wg = ctx.createLinearGradient(
            0, -wingThick / 2,
            side * wingLen, wingTip / 2
        );
        wg.addColorStop(0,   '#e8eaf4');
        wg.addColorStop(0.4, bodyColor);
        wg.addColorStop(1,   '#b8bace');

        ctx.shadowColor   = 'rgba(0,0,0,0.22)';
        ctx.shadowBlur    = size * 0.18;
        ctx.shadowOffsetY = size * 0.04;
        ctx.shadowOffsetX = side * size * 0.02;

        ctx.beginPath();
        if (side === 1) {
            ctx.moveTo(0, -wingThick * 0.5);
            ctx.bezierCurveTo(wingLen * 0.3, -wingThick * 0.52, wingLen * 0.75, -wingTip * 1.5, wingLen, 0);
            ctx.bezierCurveTo(wingLen * 0.75, wingTip * 1.5, wingLen * 0.3, wingThick * 0.52, 0, wingThick * 0.5);
            ctx.bezierCurveTo(-size * 0.06, wingThick * 0.3, -size * 0.06, -wingThick * 0.3, 0, -wingThick * 0.5);
        } else {
            ctx.moveTo(0, -wingThick * 0.5);
            ctx.bezierCurveTo(-wingLen * 0.3, -wingThick * 0.52, -wingLen * 0.75, -wingTip * 1.5, -wingLen, 0);
            ctx.bezierCurveTo(-wingLen * 0.75, wingTip * 1.5, -wingLen * 0.3, wingThick * 0.52, 0, wingThick * 0.5);
            ctx.bezierCurveTo(size * 0.06, wingThick * 0.3, size * 0.06, -wingThick * 0.3, 0, -wingThick * 0.5);
        }
        ctx.closePath();
        ctx.fillStyle = wg;
        ctx.fill();

        ctx.strokeStyle = 'rgba(140,142,165,0.3)';
        ctx.lineWidth   = size * 0.009;
        ctx.stroke();

        ctx.restore();
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// FACE — cyan eyes + mouth drawn directly on the dark head (no screen panel)
// ─────────────────────────────────────────────────────────────────────────────
function _drawFace(ctx, size, accentColor, amp, blink, expression, t) {
    // Eyes sit in the upper-middle of the dark head
    const eyeY   = -size * 0.42;
    const eyeX   = size * 0.25;
    const eyeW   = size * 0.22;
    const eyeH   = size * 0.17 * blink;
    const eyeR   = size * 0.055;
    const isWink = expression === 'wink';

    _drawEye(ctx, -eyeX, eyeY, eyeW, Math.max(eyeH, 2), eyeR, accentColor, size);
    if (isWink) {
        _drawWinkLine(ctx, eyeX, eyeY, eyeW, accentColor, size);
    } else {
        _drawEye(ctx, eyeX, eyeY, eyeW, Math.max(eyeH, 2), eyeR, accentColor, size);
    }

    // Mouth — below eyes, still on dark head
    _drawMouth(ctx, size, accentColor, amp, expression, -size * 0.16);
}

function _drawEye(ctx, ex, ey, ew, eh, er, color, size) {
    // Glow behind eye
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur  = size * 0.14;
    _squirclePath(ctx, ex - ew / 2, ey - eh / 2, ew, eh, er);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();

    // Specular highlight dot
    ctx.beginPath();
    ctx.arc(ex - ew * 0.22, ey - eh * 0.22, ew * 0.12, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    ctx.fill();
}

function _drawWinkLine(ctx, ex, ey, ew, color, size) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth   = size * 0.045;
    ctx.lineCap     = 'round';
    ctx.shadowColor = color;
    ctx.shadowBlur  = size * 0.08;
    ctx.beginPath();
    ctx.moveTo(ex - ew * 0.5, ey);
    ctx.quadraticCurveTo(ex, ey + ew * 0.5, ex + ew * 0.5, ey);
    ctx.stroke();
    ctx.restore();
}

function _drawMouth(ctx, size, accentColor, amp, expression, my) {
    const mw = size * 0.38;

    ctx.save();
    ctx.strokeStyle = accentColor;
    ctx.lineCap     = 'round';
    ctx.lineJoin    = 'round';
    ctx.shadowColor = accentColor;
    ctx.shadowBlur  = size * 0.08;
    ctx.lineWidth   = size * 0.044;

    if (amp > 0.08) {
        // Speaking — open mouth, height driven by amplitude
        const oh = amp * size * 0.2;
        ctx.beginPath();
        ctx.moveTo(-mw / 2, my);
        ctx.quadraticCurveTo(0, my - oh * 0.3, mw / 2, my);
        ctx.stroke();
        // Filled interior glow
        ctx.beginPath();
        ctx.moveTo(-mw / 2, my);
        ctx.quadraticCurveTo(0, my - oh * 0.3, mw / 2, my);
        ctx.quadraticCurveTo(mw * 0.55, my + oh, 0, my + oh);
        ctx.quadraticCurveTo(-mw * 0.55, my + oh, -mw / 2, my);
        ctx.fillStyle = `${accentColor}20`;
        ctx.fill();
    } else {
        const curve = expression === 'happy'     ?  0.6
                    : expression === 'excited'   ?  0.7
                    : expression === 'sad'       ? -0.55
                    : expression === 'angry'     ? -0.4
                    : expression === 'surprised' ?  0.0
                    : expression === 'wink'      ?  0.45
                    :                               0.2;

        if (expression === 'surprised') {
            ctx.beginPath();
            ctx.arc(0, my, mw * 0.2, 0, Math.PI * 2);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(-mw / 2, my);
            ctx.quadraticCurveTo(0, my + curve * size * 0.14, mw / 2, my);
            ctx.stroke();
        }
    }
    ctx.restore();
}

// ─────────────────────────────────────────────────────────────────────────────
// NAME TAG
// ─────────────────────────────────────────────────────────────────────────────
function _drawNameTag(ctx, size, name, accentColor) {
    const tagY = size * 1.08;
    const fs   = Math.round(size * 0.13);
    ctx.font         = `bold ${fs}px Arial, sans-serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    const tw = ctx.measureText(name).width + size * 0.26;
    const th = size * 0.22;
    const tr = th / 2;

    ctx.save();
    ctx.fillStyle   = 'rgba(0,0,0,0.45)';
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth   = 1.5;
    _squirclePath(ctx, -tw / 2, tagY - th / 2, tw, th, tr);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle   = '#ffffff';
    ctx.shadowColor = 'rgba(255,255,255,0.35)';
    ctx.shadowBlur  = 6;
    ctx.fillText(name, 0, tagY);
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER — standard rounded rectangle path ("squircle" with large radius)
// ─────────────────────────────────────────────────────────────────────────────
function _squirclePath(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y,     x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x,     y + h, r);
    ctx.arcTo(x,     y + h, x,     y,     r);
    ctx.arcTo(x,     y,     x + w, y,     r);
    ctx.closePath();
}

module.exports = { drawAvatar, resetBlink };
