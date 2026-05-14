'use strict';

// ── Easing functions ───────────────────────────────────────────────────────
const ease = {
    linear:    t => t,
    easeOut:   t => 1 - Math.pow(1 - t, 3),
    easeOut2:  t => 1 - Math.pow(1 - t, 2),
    easeOut4:  t => 1 - Math.pow(1 - t, 4),
    easeIn:    t => t * t * t,
    easeIn2:   t => t * t,
    easeInOut: t => t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2,
    elastic: t => {
        if (t <= 0) return 0; if (t >= 1) return 1;
        return Math.pow(2,-10*t)*Math.sin((t*10-0.75)*(2*Math.PI)/3)+1;
    },
    elasticIn: t => {
        if (t <= 0) return 0; if (t >= 1) return 1;
        return -Math.pow(2,10*t-10)*Math.sin((t*10-10.75)*(2*Math.PI)/3);
    },
    back: t => { const c=2.70158; return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2); },
    backIn: t => { const c=1.70158; return (c+1)*t*t*t - c*t*t; },
    bounce: t => {
        const n=7.5625, d=2.75;
        if (t<1/d) return n*t*t;
        if (t<2/d) return n*(t-=1.5/d)*t+.75;
        if (t<2.5/d) return n*(t-=2.25/d)*t+.9375;
        return n*(t-=2.625/d)*t+.984375;
    },
    spring: t => {
        const freq=10, decay=8;
        return 1 - Math.pow(Math.E,-decay*t)*Math.cos(freq*t);
    },
    overshoot: t => {
        const s=1.5;
        return (s+1)*t*t*t - s*t*t;
    }
};

const clamp = (v, lo=0, hi=1) => Math.max(lo, Math.min(hi, v));
const lerp  = (a, b, t) => a + (b-a)*t;
const map   = (v, a, b, c, d) => lerp(c, d, clamp((v-a)/(b-a)));

// Interpolate with easing between two values
function tween(from, to, t, easeFn='easeInOut') {
    const fn = typeof easeFn === 'function' ? easeFn : (ease[easeFn] || ease.easeInOut);
    return lerp(from, to, fn(clamp(t)));
}

// Get normalised [0,1] progress within a window [start, end]
function progress(t, start, end) {
    if (end <= start) return t >= start ? 1 : 0;
    return clamp((t - start) / (end - start));
}

// Animate in during [0, enterFrac], hold, animate out during [1-exitFrac, 1]
function inOutProgress(t, enterFrac=0.3, exitFrac=0.2) {
    const inP  = clamp(t / enterFrac);
    const outP = clamp((t - (1 - exitFrac)) / exitFrac);
    return { inP, outP, alpha: inP * (1 - outP) };
}

module.exports = { ease, clamp, lerp, map, tween, progress, inOutProgress };
