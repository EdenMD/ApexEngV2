'use strict';
/**
 * transitions.js
 * 
 * Scene transition system. Each transition receives two canvas buffers
 * (outgoing + incoming) and blends them based on progress t ∈ [0,1].
 * 
 * Types: fade | wipe-left | wipe-right | wipe-up | wipe-down |
 *        zoom-in | zoom-out | glitch | slide-left | slide-right |
 *        dissolve | rotate | iris | split-h | split-v
 */

const { ease, clamp } = require('./easing');

/**
 * Draw a transition frame onto ctx.
 * @param {CanvasRenderingContext2D} ctx   - target context
 * @param {Canvas} fromCanvas              - outgoing scene canvas
 * @param {Canvas} toCanvas               - incoming scene canvas
 * @param {number} t                      - progress 0→1
 * @param {string} type                   - transition type
 * @param {number} W                      - canvas width
 * @param {number} H                      - canvas height
 */
function drawTransition(ctx, fromCanvas, toCanvas, t, type, W, H) {
    ctx.save();

    switch (type) {

        case 'fade':
        default: {
            const p = ease.easeInOut(clamp(t));
            ctx.drawImage(fromCanvas, 0, 0);
            ctx.globalAlpha = p;
            ctx.drawImage(toCanvas, 0, 0);
            break;
        }

        case 'wipe-right': {
            const p = ease.easeInOut(clamp(t));
            ctx.drawImage(fromCanvas, 0, 0);
            ctx.drawImage(toCanvas, 0, 0, W, H, 0, 0, W * p, H);
            // Hard edge with slight glow
            ctx.fillStyle = 'rgba(255,255,255,0.25)';
            ctx.fillRect(W * p - 4, 0, 8, H);
            break;
        }

        case 'wipe-left': {
            const p = ease.easeInOut(clamp(t));
            ctx.drawImage(fromCanvas, 0, 0);
            const x = W * (1 - p);
            ctx.drawImage(toCanvas, x, 0, W * p, H, x, 0, W * p, H);
            ctx.fillStyle = 'rgba(255,255,255,0.25)';
            ctx.fillRect(x - 4, 0, 8, H);
            break;
        }

        case 'wipe-down': {
            const p = ease.easeInOut(clamp(t));
            ctx.drawImage(fromCanvas, 0, 0);
            ctx.drawImage(toCanvas, 0, 0, W, H * p, 0, 0, W, H * p);
            ctx.fillStyle = 'rgba(255,255,255,0.2)';
            ctx.fillRect(0, H * p - 4, W, 8);
            break;
        }

        case 'wipe-up': {
            const p = ease.easeInOut(clamp(t));
            ctx.drawImage(fromCanvas, 0, 0);
            const y = H * (1 - p);
            ctx.drawImage(toCanvas, 0, y, W, H * p, 0, y, W, H * p);
            ctx.fillStyle = 'rgba(255,255,255,0.2)';
            ctx.fillRect(0, y - 4, W, 8);
            break;
        }

        case 'zoom-in': {
            const p = ease.easeOut4(clamp(t));
            // From canvas shrinks away
            ctx.save();
            const sc = 1 + p * 0.15;
            ctx.translate(W/2, H/2); ctx.scale(sc, sc); ctx.translate(-W/2,-H/2);
            ctx.globalAlpha = 1 - p;
            ctx.drawImage(fromCanvas, 0, 0);
            ctx.restore();
            // To canvas zooms in from large
            ctx.save();
            const sc2 = 1.15 - p * 0.15;
            ctx.translate(W/2, H/2); ctx.scale(sc2, sc2); ctx.translate(-W/2,-H/2);
            ctx.globalAlpha = p;
            ctx.drawImage(toCanvas, 0, 0);
            ctx.restore();
            break;
        }

        case 'zoom-out': {
            const p = ease.easeOut4(clamp(t));
            ctx.drawImage(fromCanvas, 0, 0);
            ctx.save();
            const sc = 0.1 + p * 0.9;
            ctx.translate(W/2, H/2); ctx.scale(sc, sc); ctx.translate(-W/2,-H/2);
            ctx.globalAlpha = p;
            ctx.drawImage(toCanvas, 0, 0);
            ctx.restore();
            break;
        }

        case 'slide-left': {
            const p = ease.easeInOut(clamp(t));
            ctx.drawImage(fromCanvas, -W * p, 0);
            ctx.drawImage(toCanvas,  W * (1 - p), 0);
            // Shadow between slides
            const grad = ctx.createLinearGradient(W*(1-p)-20, 0, W*(1-p)+20, 0);
            grad.addColorStop(0, 'rgba(0,0,0,0)');
            grad.addColorStop(0.5, 'rgba(0,0,0,0.3)');
            grad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, W, H);
            break;
        }

        case 'slide-right': {
            const p = ease.easeInOut(clamp(t));
            ctx.drawImage(fromCanvas, W * p, 0);
            ctx.drawImage(toCanvas, -W * (1 - p), 0);
            break;
        }

        case 'glitch': {
            // Glitch: slice the outgoing into horizontal strips, offset them randomly
            const p = clamp(t);
            if (p < 0.5) {
                // First half: glitch the outgoing
                ctx.drawImage(fromCanvas, 0, 0);
                const slices = 12;
                const sliceH = H / slices;
                for (let i = 0; i < slices; i++) {
                    if (Math.random() > 0.4) {
                        const offset = (Math.random() - 0.5) * 60 * (p * 2);
                        const sy = i * sliceH;
                        ctx.save();
                        ctx.globalCompositeOperation = 'source-over';
                        ctx.drawImage(fromCanvas, 0, sy, W, sliceH, offset, sy, W, sliceH);
                        ctx.restore();
                    }
                }
                // RGB split
                ctx.save();
                ctx.globalCompositeOperation = 'screen';
                ctx.globalAlpha = 0.15 * (p * 2);
                ctx.filter = 'url(data:image/svg+xml,<svg/>)'; // trick to clear filter
                ctx.globalAlpha = 0.1 * (p * 2);
                ctx.drawImage(fromCanvas, 8, 0);
                ctx.globalAlpha = 0.1 * (p * 2);
                ctx.drawImage(fromCanvas, -8, 0);
                ctx.restore();
            } else {
                // Second half: land on the incoming
                const p2 = (p - 0.5) * 2;
                ctx.drawImage(toCanvas, 0, 0);
                const slices = 10;
                const sliceH = H / slices;
                for (let i = 0; i < slices; i++) {
                    if (Math.random() > p2) {
                        const offset = (Math.random()-0.5) * 40 * (1 - p2);
                        const sy = i * sliceH;
                        ctx.drawImage(fromCanvas, 0, sy, W, sliceH, offset, sy, W, sliceH);
                    }
                }
                ctx.globalAlpha = 1 - p2;
                ctx.fillStyle = '#fff';
                ctx.fillRect(0, 0, W, H);
            }
            break;
        }

        case 'dissolve': {
            // Pixel dissolve via clipping rectangles
            const p = ease.easeInOut(clamp(t));
            ctx.drawImage(fromCanvas, 0, 0);
            const tiles = 32;
            const tw = W / tiles, th = H / tiles;
            const total = tiles * tiles;
            const show = Math.floor(total * p);
            // Pseudo-random order
            const seed = 42;
            for (let k = 0; k < show; k++) {
                const idx = (k * 2654435761 ^ seed) % total;
                const tx = (idx % tiles) * tw;
                const ty = Math.floor(idx / tiles) * th;
                ctx.drawImage(toCanvas, tx, ty, tw, th, tx, ty, tw, th);
            }
            break;
        }

        case 'iris': {
            const p = ease.easeOut(clamp(t));
            ctx.drawImage(fromCanvas, 0, 0);
            ctx.save();
            ctx.beginPath();
            ctx.arc(W/2, H/2, Math.max(W, H) * p * 0.75, 0, Math.PI*2);
            ctx.clip();
            ctx.drawImage(toCanvas, 0, 0);
            ctx.restore();
            break;
        }

        case 'split-h': {
            const p = ease.easeInOut(clamp(t));
            ctx.drawImage(fromCanvas, 0, 0);
            // Top half slides up, bottom half slides down to reveal incoming
            ctx.drawImage(toCanvas, 0, 0, W, H/2,  0, -H/2*(1-p), W, H/2);
            ctx.drawImage(toCanvas, 0, H/2, W, H/2, 0, H/2 + H/2*(1-p), W, H/2);
            break;
        }

        case 'split-v': {
            const p = ease.easeInOut(clamp(t));
            ctx.drawImage(fromCanvas, 0, 0);
            ctx.drawImage(toCanvas, 0, 0, W/2, H, -W/2*(1-p), 0, W/2, H);
            ctx.drawImage(toCanvas, W/2, 0, W/2, H, W/2+W/2*(1-p), 0, W/2, H);
            break;
        }

        case 'rotate': {
            const p = ease.easeInOut(clamp(t));
            ctx.save();
            ctx.translate(W/2, H/2);
            ctx.rotate(p * Math.PI * 2);
            ctx.globalAlpha = 1 - p;
            ctx.drawImage(fromCanvas, -W/2, -H/2);
            ctx.restore();
            ctx.save();
            ctx.translate(W/2, H/2);
            ctx.rotate(-Math.PI * 2 * (1-p));
            ctx.globalAlpha = p;
            ctx.drawImage(toCanvas, -W/2, -H/2);
            ctx.restore();
            break;
        }
    }

    ctx.globalAlpha = 1;
    ctx.restore();
}

// Transition duration in seconds (default if not specified in config)
const TRANSITION_DURATIONS = {
    fade: 0.5, 'wipe-right': 0.45, 'wipe-left': 0.45, 'wipe-down': 0.45, 'wipe-up': 0.45,
    'zoom-in': 0.5, 'zoom-out': 0.5, 'slide-left': 0.4, 'slide-right': 0.4,
    glitch: 0.6, dissolve: 0.55, iris: 0.55, 'split-h': 0.45, 'split-v': 0.45, rotate: 0.6,
};

function getTransitionDuration(type) {
    return TRANSITION_DURATIONS[type] ?? 0.5;
}

module.exports = { drawTransition, getTransitionDuration };
