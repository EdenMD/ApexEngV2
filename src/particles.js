'use strict';
/**
 * particles.js
 * 
 * High-performance particle system for canvas.
 * All emitters are self-contained and update per frame.
 * 
 * Emitter types: confetti | fire | snow | sparks | bubbles | matrix | dust | stars
 * 
 * Usage in config scene:
 *   particles: { type: 'confetti', x: 540, y: 0, count: 120, colors: ['#ff0','#f0f','#0ff'] }
 */

const { clamp, lerp } = require('./easing');

class Particle {
    constructor(x, y, vx, vy, life, color, size, type) {
        this.x = x; this.y = y;
        this.vx = vx; this.vy = vy;
        this.life = life; this.maxLife = life;
        this.color = color; this.size = size;
        this.type = type;
        this.rot = Math.random() * Math.PI * 2;
        this.rotV = (Math.random() - 0.5) * 0.3;
        this.alpha = 1;
        this.scaleX = 1; this.scaleY = 1;
    }
    get t() { return 1 - this.life / this.maxLife; }
    get alive() { return this.life > 0; }
}

class ParticleEmitter {
    constructor(cfg) {
        this.cfg = cfg;
        this.particles = [];
        this.elapsed = 0;
        this.emitAccum = 0;
        this.active = true;
    }

    update(dt, canvasW, canvasH) {
        this.elapsed += dt;
        const { type } = this.cfg;

        // Spawn new particles
        if (this.active) {
            const rate = this.cfg.rate ?? this._defaultRate();
            this.emitAccum += rate * dt;
            while (this.emitAccum >= 1) {
                this.emitAccum--;
                this.particles.push(this._spawn(canvasW, canvasH));
            }
        }

        // Update existing particles
        const gravity   = this.cfg.gravity ?? this._defaultGravity();
        const wind      = this.cfg.wind ?? 0;

        this.particles = this.particles.filter(p => {
            p.life -= dt;
            if (p.life <= 0) return false;

            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.vy += gravity * dt;
            p.vx += wind * dt;
            p.rot += p.rotV;

            // Type-specific update
            switch (type) {
                case 'fire':
                    p.size  *= (1 - dt * 1.5);
                    p.alpha  = clamp(p.life / p.maxLife * 1.6);
                    p.vx    += (Math.random() - 0.5) * 30 * dt;
                    break;
                case 'sparks':
                    p.vy += 200 * dt;
                    p.vx *= (1 - dt * 1.5);
                    p.alpha = clamp(p.life / p.maxLife);
                    break;
                case 'confetti':
                    p.scaleX = Math.abs(Math.sin(p.rot * 3));
                    p.alpha  = clamp(p.life / p.maxLife * 3);
                    break;
                case 'snow':
                    p.x += Math.sin(this.elapsed * 1.5 + p.maxLife) * 18 * dt;
                    p.alpha = 0.7 + 0.3 * Math.sin(this.elapsed * 2 + p.size);
                    break;
                case 'bubbles':
                    p.x += Math.sin(this.elapsed * 2 + p.maxLife) * 25 * dt;
                    p.alpha = 0.5 + 0.3 * Math.sin(this.elapsed * 3);
                    p.size += dt * 4;
                    break;
                case 'stars':
                    p.alpha = 0.4 + 0.6 * Math.sin(this.elapsed * 4 + p.maxLife);
                    break;
                case 'dust':
                    p.alpha  = clamp(p.life / p.maxLife) * 0.5;
                    p.size  *= (1 - dt * 0.3);
                    break;
                case 'matrix':
                    p.alpha = clamp(p.life / p.maxLife * 1.5);
                    break;
            }
            return true;
        });
    }

    draw(ctx) {
        const { type } = this.cfg;
        ctx.save();

        for (const p of this.particles) {
            if (!p.alive) continue;
            ctx.globalAlpha = clamp(p.alpha);

            switch (type) {
                case 'fire': {
                    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
                    grad.addColorStop(0, 'rgba(255,255,200,0.95)');
                    grad.addColorStop(0.3, 'rgba(255,140,0,0.8)');
                    grad.addColorStop(0.7, 'rgba(220,40,0,0.5)');
                    grad.addColorStop(1,   'rgba(100,0,0,0)');
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, Math.max(p.size, 0.5), 0, Math.PI*2);
                    ctx.fill();
                    break;
                }
                case 'sparks': {
                    ctx.strokeStyle = p.color;
                    ctx.lineWidth = p.size * 0.5;
                    ctx.lineCap = 'round';
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.x - p.vx * 0.04, p.y - p.vy * 0.04);
                    ctx.stroke();
                    break;
                }
                case 'confetti': {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rot);
                    ctx.scale(p.scaleX, 1);
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.size/2, -p.size*0.4, p.size, p.size*0.8);
                    ctx.restore();
                    break;
                }
                case 'snow': {
                    ctx.fillStyle = '#fff';
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
                    ctx.fill();
                    break;
                }
                case 'bubbles': {
                    ctx.strokeStyle = p.color;
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
                    ctx.stroke();
                    // Highlight
                    ctx.fillStyle = 'rgba(255,255,255,0.15)';
                    ctx.beginPath();
                    ctx.arc(p.x - p.size*0.3, p.y - p.size*0.3, p.size*0.25, 0, Math.PI*2);
                    ctx.fill();
                    break;
                }
                case 'stars': {
                    ctx.fillStyle = p.color;
                    drawStar(ctx, p.x, p.y, 5, p.size, p.size*0.42);
                    break;
                }
                case 'matrix': {
                    ctx.fillStyle = '#00ff41';
                    ctx.font = `bold ${Math.round(p.size)}px monospace`;
                    ctx.textAlign = 'center';
                    ctx.fillText(p.char, p.x, p.y);
                    break;
                }
                case 'dust': {
                    const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.size);
                    g.addColorStop(0, p.color); g.addColorStop(1,'transparent');
                    ctx.fillStyle = g;
                    ctx.beginPath();
                    ctx.arc(p.x,p.y,Math.max(p.size,0.5),0,Math.PI*2);
                    ctx.fill();
                    break;
                }
                default: {
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, Math.max(p.size, 0.5), 0, Math.PI*2);
                    ctx.fill();
                }
            }
        }

        ctx.globalAlpha = 1;
        ctx.restore();
    }

    _spawn(W, H) {
        const c = this.cfg;
        const colors = c.colors || ['#ff0', '#f0f', '#0ff', '#0f0', '#ff6600'];
        const color  = colors[Math.floor(Math.random() * colors.length)];
        const type   = c.type;

        const sx = c.x ?? W/2;
        const sy = c.y ?? 0;
        const spread = c.spread ?? 80;

        switch (type) {
            case 'fire': {
                const angle = -Math.PI/2 + (Math.random()-0.5)*1.2;
                const speed = 80 + Math.random() * 120;
                return new Particle(
                    sx + (Math.random()-0.5)*spread*0.6,
                    (c.y ?? H*0.8),
                    Math.cos(angle)*speed, Math.sin(angle)*speed,
                    0.6 + Math.random()*0.8,
                    color, 12 + Math.random()*28, type
                );
            }
            case 'sparks': {
                const angle = Math.random() * Math.PI * 2;
                const speed = 150 + Math.random() * 300;
                return new Particle(
                    sx + (Math.random()-0.5)*spread*0.3,
                    c.y ?? H*0.5,
                    Math.cos(angle)*speed, Math.sin(angle)*speed,
                    0.5 + Math.random()*0.8,
                    color, 2 + Math.random()*3, type
                );
            }
            case 'confetti': {
                return new Particle(
                    sx + (Math.random()-0.5)*spread,
                    (c.y ?? -20),
                    (Math.random()-0.5)*180,
                    80 + Math.random()*160,
                    3 + Math.random()*4,
                    color, 6 + Math.random()*10, type
                );
            }
            case 'snow': {
                return new Particle(
                    Math.random() * W, -10,
                    (Math.random()-0.5)*20, 30 + Math.random()*60,
                    4 + Math.random()*6,
                    '#fff', 2 + Math.random()*5, type
                );
            }
            case 'bubbles': {
                return new Particle(
                    sx + (Math.random()-0.5)*spread,
                    c.y ?? H,
                    (Math.random()-0.5)*15, -(30 + Math.random()*60),
                    3 + Math.random()*5,
                    color + 'aa', 4 + Math.random()*8, type
                );
            }
            case 'stars': {
                return new Particle(
                    Math.random()*W, Math.random()*H,
                    0, 0,
                    4 + Math.random()*8,
                    color, 3 + Math.random()*7, type
                );
            }
            case 'matrix': {
                const chars = '01アイウエオカキクケコ'.split('');
                const p = new Particle(
                    sx + (Math.random()-0.5)*spread,
                    (c.y ?? 0),
                    0, 60 + Math.random()*120,
                    2 + Math.random()*4,
                    '#00ff41', 14 + Math.random()*8, type
                );
                p.char = chars[Math.floor(Math.random()*chars.length)];
                return p;
            }
            case 'dust': {
                return new Particle(
                    sx + (Math.random()-0.5)*spread,
                    (c.y ?? H/2) + (Math.random()-0.5)*spread,
                    (Math.random()-0.5)*30, -(10 + Math.random()*30),
                    2 + Math.random()*4,
                    color, 20 + Math.random()*60, type
                );
            }
            default: {
                return new Particle(
                    sx + (Math.random()-0.5)*spread,
                    (c.y ?? H/2),
                    (Math.random()-0.5)*100, -(50+Math.random()*100),
                    1 + Math.random()*3,
                    color, 4 + Math.random()*8, type
                );
            }
        }
    }

    _defaultRate() {
        const rates = { fire:40, sparks:60, confetti:30, snow:20, bubbles:8, stars:0, dust:15, matrix:12 };
        return rates[this.cfg.type] ?? 20;
    }

    _defaultGravity() {
        const g = { fire:-20, sparks:0, confetti:18, snow:0, bubbles:-10, stars:0, dust:-5, matrix:0 };
        return g[this.cfg.type] ?? 30;
    }

    stop() { this.active = false; }
    get count() { return this.particles.length; }
}

// ── Star shape helper ──────────────────────────────────────────────────────
function drawStar(ctx, cx, cy, spikes, outer, inner) {
    let rot = (Math.PI / 2) * 3;
    const step = Math.PI / spikes;
    ctx.beginPath();
    ctx.moveTo(cx, cy - outer);
    for (let i = 0; i < spikes; i++) {
        ctx.lineTo(cx + Math.cos(rot)*outer, cy + Math.sin(rot)*outer); rot += step;
        ctx.lineTo(cx + Math.cos(rot)*inner, cy + Math.sin(rot)*inner); rot += step;
    }
    ctx.lineTo(cx, cy - outer);
    ctx.closePath();
    ctx.fill();
}

module.exports = { ParticleEmitter };
