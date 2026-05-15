'use strict';
/**
 * APEX Engine v2.0 — config.js
 *
 * "The System Is Not Broken. It Is Working Against You."
 *
 * Formula: AI data (430 views) + psychology tricks (323 views) + wealth (108 views)
 * = all three winning formats in one video
 *
 * Scene breakdown:
 *   Scene 1 — Hook              3.5s  (silent)
 *   Scene 2 — Reframe           ~8s   (TTS)
 *   Scene 3 — Trick #1 Loss Aversion   ~9s (TTS + chart)
 *   Scene 4 — Trick #2 Inflation theft ~9s (TTS + chart)
 *   Scene 5 — Trick #3 AI displacement ~9s (TTS + donut)
 *   Scene 6 — The counter move  ~8s   (TTS)
 *   Scene 7 — CTA               ~8s   (TTS)
 *   ──────────────────────────────────
 *   Total                       ~54-57s
 *
 * Voices rotate per scene — proven to hold attention longer:
 *   bm_george   — deep authoritative British male
 *   am_adam     — authoritative American male
 *   bm_lewis    — crisp professional British male
 *
 * No particles. v2.0 compliant.
 *
 * Palette:
 *   Black       — #08090b
 *   Dark navy   — #0a0f1e
 *   Red danger  — #dc2626
 *   Cyan data   — #06b6d4
 *   Gold        — #f59e0b
 *   Green safe  — #22c55e
 *   White       — #f1f5f9
 */

module.exports = {

  output: {
    title:   'System-Working-Against-You',
    format:  'portrait',
    fps:     30,
    crf:     23,
    preset:  'medium',
    cleanup: true,
    postProcess: {
      grain:              true,
      grainStrength:      0.030,
      vignette:           true,
      vignetteStrength:   0.58,
      colorGrade:         '#06080f',
      colorGradeStrength: 0.10,
    },
  },

  defaults: {
    voice:              'bm_george',
    transition:         'fade',
    transitionDuration: 0.45,
  },

  scenes: [

    // ══════════════════════════════════════════════════════════
    // SCENE 1 — HOOK  (3.5s silent)
    // Hardest pattern-interrupt possible. Statement that feels
    // personal and accusatory — forces viewer to read.
    // ══════════════════════════════════════════════════════════
    {
      duration: 3.5,
      transition: 'glitch',
      transitionDuration: 0.55,
      postProcess: { scanlines: true, grain: true, grainStrength: 0.065 },
      layers: [
        {
          type:             'background',
          color:            '#08090b',
          vignette:         true,
          vignetteStrength: 0.7,
        },
        // Main hook — two-line gut punch
        {
          type:       'text',
          text:       'THE SYSTEM\nIS NOT BROKEN.',
          x: 540, y: 560,
          fontSize:   148,
          fontFamily: 'Impact, Arial Black, sans-serif',
          color:      '#f1f5f9',
          lineHeight: 1.05,
          shadow:     true,
          shadowBlur: 40,
          shadowColor: 'rgba(0,0,0,0.9)',
          animation:  'pop',
          animDur:    0.35,
          startT:     0.0,
          align:      'center',
          maxWidth:   960,
        },
        {
          type: 'divider',
          y: 790, x1: 80, x2: 1000,
          color: '#dc2626',
          thickness: 4,
          animDur: 0.4,
        },
        {
          type:       'text',
          text:       'It is working against you.',
          x: 540, y: 900,
          fontSize:   72,
          fontFamily: 'Arial Black, sans-serif',
          color:      '#dc2626',
          glow:       true,
          glowColor:  '#dc2626',
          glowBlur:   40,
          shadow:     true,
          shadowBlur: 25,
          animation:  'slide-up',
          animDur:    0.4,
          startT:     0.25,
          align:      'center',
          maxWidth:   920,
        },
        {
          type:       'text',
          text:       '3 psychological mechanisms\ndesigned to keep you exactly where you are.',
          x: 540, y: 1120,
          fontSize:   48,
          fontFamily: 'Arial, sans-serif',
          color:      'rgba(241,245,249,0.55)',
          lineHeight: 1.35,
          animation:  'fade',
          animDur:    0.45,
          startT:     0.7,
          align:      'center',
          maxWidth:   880,
        },
        {
          type:       'progress-bar',
          x: 54, y: 1855,
          width: 972, height: 8,
          color:      '#dc2626',
          color2:     '#991b1b',
          trackColor: 'rgba(255,255,255,0.08)',
        },
      ],
    },

    // ══════════════════════════════════════════════════════════
    // SCENE 2 — REFRAME  (~8s)
    // Voice: bm_george — sets the documentary authority tone
    // ══════════════════════════════════════════════════════════
    {
      tts: {
        text: "Three separate mechanisms — behavioural, economic, and technological — are working in coordination to limit your financial mobility. None of them are accidents. All of them are documented.",
        voice:      'bm_george',
        pauseAfter: 0.3,
      },
      transition: 'wipe-right',
      transitionDuration: 0.42,
      layers: [
        {
          type:         'gradient',
          gradientType: 'linear',
          colors:       ['#08090b', '#0e1220', '#080a12'],
          angle:        165,
          vignette:     true,
          vignetteStrength: 0.55,
        },
        // Three numbered labels — teaser of what is coming
        // Badge y: 210
        {
          type:         'shape',
          shape:        'rect',
          x: 540, y: 210,
          width: 640, height: 76,
          color:        '#dc2626',
          borderRadius: 38,
          shadow:       true,
          shadowColor:  'rgba(220,38,38,0.45)',
          shadowBlur:   28,
          animation:    'pop',
          animDur:      0.3,
        },
        {
          type:       'text',
          text:       'THREE MECHANISMS',
          x: 540, y: 212,
          fontSize:   40,
          fontFamily: 'Impact, sans-serif',
          color:      '#ffffff',
          align:      'center',
          animation:  'pop',
          animDur:    0.3,
        },
        // Content y: 310
        // Item 1
        {
          type:         'shape',
          shape:        'rect',
          x: 540, y: 480,
          width: 900, height: 120,
          color:        'rgba(220,38,38,0.09)',
          borderRadius: 18,
          stroke:       true,
          strokeColor:  'rgba(220,38,38,0.4)',
          strokeWidth:  2,
          enterAt:  0.2, enterDur: 0.35,
        },
        {
          type:       'text',
          text:       '01  Loss Aversion Bias',
          x: 540, y: 460,
          fontSize:   56,
          fontFamily: 'Arial Black, sans-serif',
          color:      '#dc2626',
          align:      'center',
          animation:  'slide-right',
          animDur:    0.35, startT: 0.25,
        },
        {
          type:       'text',
          text:       'Behavioural psychology',
          x: 540, y: 516,
          fontSize:   36,
          fontFamily: 'Arial, sans-serif',
          color:      'rgba(241,245,249,0.5)',
          align:      'center',
          animation:  'fade',
          animDur:    0.3, startT: 0.35,
        },
        // Item 2
        {
          type:         'shape',
          shape:        'rect',
          x: 540, y: 740,
          width: 900, height: 120,
          color:        'rgba(245,158,11,0.09)',
          borderRadius: 18,
          stroke:       true,
          strokeColor:  'rgba(245,158,11,0.4)',
          strokeWidth:  2,
          enterAt:  0.55, enterDur: 0.35,
        },
        {
          type:       'text',
          text:       '02  The Inflation Transfer',
          x: 540, y: 720,
          fontSize:   56,
          fontFamily: 'Arial Black, sans-serif',
          color:      '#f59e0b',
          align:      'center',
          animation:  'slide-right',
          animDur:    0.35, startT: 0.6,
        },
        {
          type:       'text',
          text:       'Economic design',
          x: 540, y: 776,
          fontSize:   36,
          fontFamily: 'Arial, sans-serif',
          color:      'rgba(241,245,249,0.5)',
          align:      'center',
          animation:  'fade',
          animDur:    0.3, startT: 0.7,
        },
        // Item 3
        {
          type:         'shape',
          shape:        'rect',
          x: 540, y: 1000,
          width: 900, height: 120,
          color:        'rgba(6,182,212,0.09)',
          borderRadius: 18,
          stroke:       true,
          strokeColor:  'rgba(6,182,212,0.4)',
          strokeWidth:  2,
          enterAt:  0.9, enterDur: 0.35,
        },
        {
          type:       'text',
          text:       '03  AI Displacement',
          x: 540, y: 980,
          fontSize:   56,
          fontFamily: 'Arial Black, sans-serif',
          color:      '#06b6d4',
          align:      'center',
          animation:  'slide-right',
          animDur:    0.35, startT: 0.95,
        },
        {
          type:       'text',
          text:       'Technological restructuring',
          x: 540, y: 1036,
          fontSize:   36,
          fontFamily: 'Arial, sans-serif',
          color:      'rgba(241,245,249,0.5)',
          align:      'center',
          animation:  'fade',
          animDur:    0.3, startT: 1.05,
        },
        {
          type:     'waveform',
          vizStyle: 'bars',
          x: 54, y: 1700,
          width: 972, height: 70,
          bars:    52,
          color:   '#dc2626',
          opacity: 0.38,
        },
        {
          type:       'progress-bar',
          x: 54, y: 1855,
          width: 972, height: 8,
          color:      '#dc2626',
          color2:     '#991b1b',
          trackColor: 'rgba(255,255,255,0.08)',
        },
      ],
    },

    // ══════════════════════════════════════════════════════════
    // SCENE 3 — TRICK #1: LOSS AVERSION  (~9s)
    // Voice: am_adam — American authority, different timbre
    // The psychology mechanism — most relatable, hits first
    // ══════════════════════════════════════════════════════════
    {
      tts: {
        text: "Mechanism one. Loss aversion. Psychologists have proven that the pain of losing one hundred dollars is twice as powerful as the pleasure of gaining one hundred. Corporations weaponise this. Every limited-time offer, every countdown timer, every fear of missing out — is this mechanism being triggered deliberately.",
        voice:      'am_adam',
        pauseAfter: 0.35,
      },
      transition: 'zoom-in',
      transitionDuration: 0.45,
      layers: [
        {
          type:         'gradient',
          gradientType: 'linear',
          colors:       ['#0f0608', '#180a0a', '#0b0506'],
          angle:        160,
          vignette:     true,
          vignetteStrength: 0.6,
        },
        // Badge — y: 210
        {
          type:         'shape',
          shape:        'rect',
          x: 540, y: 210,
          width: 560, height: 76,
          color:        '#dc2626',
          borderRadius: 38,
          shadow:       true,
          shadowColor:  'rgba(220,38,38,0.45)',
          shadowBlur:   28,
          animation:    'pop', animDur: 0.3,
        },
        {
          type:       'text',
          text:       '01  LOSS AVERSION',
          x: 540, y: 212,
          fontSize:   40,
          fontFamily: 'Impact, sans-serif',
          color:      '#ffffff',
          align:      'center',
          animation:  'pop', animDur: 0.3,
        },
        // Giant pain vs gain visual — content y: 310
        // Left: PAIN
        {
          type:         'shape',
          shape:        'rect',
          x: 270, y: 680,
          width: 420, height: 520,
          color:        'rgba(220,38,38,0.12)',
          borderRadius: 22,
          stroke:       true,
          strokeColor:  '#dc2626',
          strokeWidth:  3,
          enterAt:  0.2, enterDur: 0.4,
        },
        {
          type:       'text',
          text:       '-$100',
          x: 270, y: 540,
          fontSize:   108,
          fontFamily: 'Impact, sans-serif',
          color:      '#dc2626',
          glow:       true,
          glowColor:  '#dc2626',
          glowBlur:   45,
          align:      'center',
          animation:  'pop', animDur: 0.4, startT: 0.25,
        },
        {
          type:       'text',
          text:       'PAIN',
          x: 270, y: 720,
          fontSize:   80,
          fontFamily: 'Impact, sans-serif',
          color:      '#dc2626',
          align:      'center',
          animation:  'fade', animDur: 0.35, startT: 0.35,
        },
        {
          type:       'text',
          text:       'FEELS THIS\nBIG',
          x: 270, y: 840,
          fontSize:   58,
          fontFamily: 'Arial Black, sans-serif',
          color:      'rgba(241,245,249,0.8)',
          lineHeight: 1.2,
          align:      'center',
          animation:  'fade', animDur: 0.35, startT: 0.45,
        },
        // Right: GAIN
        {
          type:         'shape',
          shape:        'rect',
          x: 810, y: 840,
          width: 420, height: 360,
          color:        'rgba(34,197,94,0.09)',
          borderRadius: 22,
          stroke:       true,
          strokeColor:  'rgba(34,197,94,0.45)',
          strokeWidth:  2,
          enterAt:  0.5, enterDur: 0.4,
        },
        {
          type:       'text',
          text:       '+$100',
          x: 810, y: 700,
          fontSize:   108,
          fontFamily: 'Impact, sans-serif',
          color:      '#22c55e',
          align:      'center',
          animation:  'pop', animDur: 0.4, startT: 0.55,
        },
        {
          type:       'text',
          text:       'JOY',
          x: 810, y: 870,
          fontSize:   80,
          fontFamily: 'Impact, sans-serif',
          color:      '#22c55e',
          align:      'center',
          animation:  'fade', animDur: 0.35, startT: 0.65,
        },
        {
          type:       'text',
          text:       'Feels half\nas good',
          x: 810, y: 980,
          fontSize:   58,
          fontFamily: 'Arial Black, sans-serif',
          color:      'rgba(241,245,249,0.8)',
          lineHeight: 1.2,
          align:      'center',
          animation:  'fade', animDur: 0.35, startT: 0.75,
        },
        // Source + key line
        {
          type: 'divider',
          y: 1200, x1: 120, x2: 960,
          color: 'rgba(220,38,38,0.3)',
          thickness: 1, animDur: 0.4,
        },
        {
          type:       'text',
          text:       'Kahneman & Tversky, 1979\nNobel Prize-winning research',
          x: 540, y: 1270,
          fontSize:   38,
          fontFamily: 'Arial, sans-serif',
          color:      'rgba(241,245,249,0.35)',
          lineHeight: 1.4,
          align:      'center',
          animation:  'fade', animDur: 0.4, startT: 1.0,
        },
        {
          type:          'kinetic-text',
          text:          'EVERY SALE EXPLOITS THIS',
          x: 540, y: 1480,
          fontSize:      66,
          fontFamily:    'Impact, Arial Black, sans-serif',
          color:         'rgba(241,245,249,0.14)',
          highlightColor:'#dc2626',
          kineticStyle:  'stamp',
          wordsPerRow:   2,
          enterAt:       1.6,
        },
        {
          type:     'waveform',
          vizStyle: 'bars',
          x: 54, y: 1700,
          width: 972, height: 70,
          bars:    48,
          color:   '#dc2626',
          opacity: 0.38,
        },
        {
          type:       'progress-bar',
          x: 54, y: 1855,
          width: 972, height: 8,
          color:      '#dc2626',
          color2:     '#991b1b',
          trackColor: 'rgba(255,255,255,0.08)',
        },
      ],
    },

    // ══════════════════════════════════════════════════════════
    // SCENE 4 — TRICK #2: INFLATION TRANSFER  (~9s)
    // Voice: bm_lewis — crisp, different from am_adam
    // Your proven donut format — 430 views on Facebook
    // ══════════════════════════════════════════════════════════
    {
      tts: {
        text: "Mechanism two. Inflation is not random economic weather. Between 2020 and 2023, the bottom ninety percent of earners saw their real purchasing power fall. The top one percent added twenty six trillion dollars in net worth during the same period.",
        voice:      'bm_lewis',
        pauseAfter: 0.35,
      },
      transition: 'iris',
      transitionDuration: 0.5,
      layers: [
        {
          type:         'gradient',
          gradientType: 'radial',
          colors:       ['#08090e', '#060810', '#040609'],
          vignette:     true,
          vignetteStrength: 0.62,
        },
        // Badge — y: 210
        {
          type:         'shape',
          shape:        'rect',
          x: 540, y: 210,
          width: 640, height: 76,
          color:        '#f59e0b',
          borderRadius: 38,
          shadow:       true,
          shadowColor:  'rgba(245,158,11,0.45)',
          shadowBlur:   28,
          animation:    'pop', animDur: 0.3,
        },
        {
          type:       'text',
          text:       '02  INFLATION TRANSFER',
          x: 540, y: 212,
          fontSize:   38,
          fontFamily: 'Impact, sans-serif',
          color:      '#000000',
          align:      'center',
          animation:  'pop', animDur: 0.3,
        },
        // Donut — the proven 430-view format — cx/cy === x/y
        {
          type:      'chart',
          chartType: 'donut',
          x: 540,  y: 800,
          cx: 540, cy: 800,
          width: 660, height: 660,
          animDur:   1.8,
          explode:   true,
          enterAt:   0.3,
          data: [
            { label: 'Top 1%',     value: 53, color: '#f59e0b' },
            { label: 'Next 9%',    value: 30, color: '#d97706' },
            { label: 'Bottom 90%', value: 17, color: '#1e2535' },
          ],
        },
        {
          type:       'text',
          text:       'Share of new wealth created (2020-2023)',
          x: 540, y: 1195,
          fontSize:   34,
          fontFamily: 'Arial, sans-serif',
          color:      'rgba(241,245,249,0.38)',
          align:      'center',
        },
        {
          type: 'divider',
          y: 1262, x1: 120, x2: 960,
          color: 'rgba(245,158,11,0.28)',
          thickness: 1, animDur: 0.4,
        },
        {
          type:       'text',
          text:       'Inflation does not destroy wealth.\nIt moves it upward.',
          x: 540, y: 1398,
          fontSize:   60,
          fontFamily: 'Arial Black, sans-serif',
          color:      '#f1f5f9',
          lineHeight: 1.25,
          align:      'center',
          maxWidth:   880,
          animation:  'slide-up',
          animDur:    0.45, startT: 1.5,
        },
        {
          type:     'waveform',
          vizStyle: 'wave',
          x: 54, y: 1700,
          width: 972, height: 65,
          bars: 1, lineWidth: 3,
          color:   '#f59e0b',
          opacity: 0.38,
        },
        {
          type:       'progress-bar',
          x: 54, y: 1855,
          width: 972, height: 8,
          color:      '#f59e0b',
          color2:     '#d97706',
          trackColor: 'rgba(255,255,255,0.08)',
        },
      ],
    },

    // ══════════════════════════════════════════════════════════
    // SCENE 5 — TRICK #3: AI DISPLACEMENT  (~9s)
    // Voice: bm_george — closing authority voice returns
    // Your #1 performing content format
    // ══════════════════════════════════════════════════════════
    {
      tts: {
        text: "Mechanism three. Three hundred million jobs. That is Goldman Sachs's documented projection for AI-driven displacement by 2030. And eighty five percent of companies that deployed AI already cut headcount within eighteen months.",
        voice:      'bm_george',
        pauseAfter: 0.35,
      },
      transition: 'glitch',
      transitionDuration: 0.6,
      postProcess: { scanlines: true, grain: true, grainStrength: 0.06 },
      layers: [
        {
          type:             'background',
          color:            '#000000',
          vignette:         true,
          vignetteStrength: 0.75,
        },
        // Badge — y: 210
        {
          type:         'shape',
          shape:        'rect',
          x: 540, y: 210,
          width: 580, height: 76,
          color:        '#06b6d4',
          borderRadius: 38,
          shadow:       true,
          shadowColor:  'rgba(6,182,212,0.45)',
          shadowBlur:   28,
          animation:    'pop', animDur: 0.3,
        },
        {
          type:       'text',
          text:       '03  AI DISPLACEMENT',
          x: 540, y: 212,
          fontSize:   40,
          fontFamily: 'Impact, sans-serif',
          color:      '#000000',
          align:      'center',
          animation:  'pop', animDur: 0.3,
        },
        // Giant number — your proven hook
        {
          type:       'text',
          text:       '300M',
          x: 540, y: 660,
          fontSize:   400,
          fontFamily: 'Impact, Arial Black, sans-serif',
          gradient:   ['#06b6d4', '#0284c7'],
          glow:       true,
          glowColor:  '#06b6d4',
          glowBlur:   90,
          shadow:     true,
          shadowBlur: 70,
          shadowColor: 'rgba(6,182,212,0.55)',
          animation:  'pop',
          animDur:    0.4, startT: 0.0,
          align:      'center',
        },
        {
          type:       'text',
          text:       'jobs eliminated by 2030.',
          x: 540, y: 900,
          fontSize:   60,
          fontFamily: 'Arial Black, sans-serif',
          color:      '#f1f5f9',
          align:      'center',
          animation:  'slide-up',
          animDur:    0.4, startT: 0.25,
          maxWidth:   880,
        },
        {
          type: 'divider',
          y: 1000, x1: 140, x2: 940,
          color: 'rgba(6,182,212,0.4)',
          thickness: 2, animDur: 0.45,
        },
        // Side-by-side fast stats
        {
          type:       'text',
          text:       '85%',
          x: 270, y: 1130,
          fontSize:   160,
          fontFamily: 'Impact, sans-serif',
          gradient:   ['#dc2626', '#991b1b'],
          glow:       true,
          glowColor:  '#dc2626',
          glowBlur:   50,
          align:      'center',
          animation:  'pop', animDur: 0.4, startT: 0.8,
        },
        {
          type:       'text',
          text:       'of AI companies\nalready cut jobs',
          x: 270, y: 1268,
          fontSize:   38,
          fontFamily: 'Arial, sans-serif',
          color:      'rgba(241,245,249,0.65)',
          lineHeight: 1.3,
          align:      'center',
          animation:  'fade', animDur: 0.35, startT: 0.9,
          maxWidth:   440,
        },
        {
          type:         'shape',
          shape:        'line',
          x: 540, y: 1100,
          width: 2, height: 240,
          color:        'rgba(241,245,249,0.15)',
        },
        {
          type:       'text',
          text:       '10',
          x: 810, y: 1130,
          fontSize:   160,
          fontFamily: 'Impact, sans-serif',
          gradient:   ['#f59e0b', '#d97706'],
          glow:       true,
          glowColor:  '#f59e0b',
          glowBlur:   50,
          align:      'center',
          animation:  'pop', animDur: 0.4, startT: 1.0,
        },
        {
          type:       'text',
          text:       'years to complete\nthe shift',
          x: 810, y: 1268,
          fontSize:   38,
          fontFamily: 'Arial, sans-serif',
          color:      'rgba(241,245,249,0.65)',
          lineHeight: 1.3,
          align:      'center',
          animation:  'fade', animDur: 0.35, startT: 1.1,
          maxWidth:   440,
        },
        {
          type:       'progress-bar',
          x: 54, y: 1855,
          width: 972, height: 8,
          color:      '#06b6d4',
          color2:     '#0284c7',
          trackColor: 'rgba(255,255,255,0.08)',
        },
      ],
    },

    // ══════════════════════════════════════════════════════════
    // SCENE 6 — THE COUNTER MOVE  (~8s)
    // Voice: am_adam — different voice = feels like new speaker
    // Gives hope — keeps people following
    // ══════════════════════════════════════════════════════════
    {
      tts: {
        text: "Knowing these mechanisms does not change the system. But it changes how you move inside it. The people who come out ahead are not luckier. They simply saw the rules clearly before everyone else did.",
        voice:      'am_adam',
        pauseAfter: 0.3,
      },
      transition: 'slide-left',
      transitionDuration: 0.4,
      layers: [
        {
          type:         'gradient',
          gradientType: 'linear',
          colors:       ['#040c08', '#060e0a', '#030807'],
          angle:        158,
          vignette:     true,
          vignetteStrength: 0.55,
        },
        // Badge — y: 210
        {
          type:         'shape',
          shape:        'rect',
          x: 540, y: 210,
          width: 500, height: 76,
          color:        '#22c55e',
          borderRadius: 38,
          shadow:       true,
          shadowColor:  'rgba(34,197,94,0.45)',
          shadowBlur:   28,
          animation:    'pop', animDur: 0.3,
        },
        {
          type:       'text',
          text:       'THE COUNTER MOVE',
          x: 540, y: 212,
          fontSize:   38,
          fontFamily: 'Impact, sans-serif',
          color:      '#000000',
          align:      'center',
          animation:  'pop', animDur: 0.3,
        },
        // Big quote-style statement — content y: 310
        {
          type:       'text',
          text:       '"The people who\ncome out ahead\nare not luckier."',
          x: 540, y: 760,
          fontSize:   98,
          fontFamily: 'Georgia, serif',
          color:      '#f1f5f9',
          lineHeight: 1.18,
          shadow:     true,
          shadowBlur: 25,
          glow:       true,
          glowColor:  '#22c55e',
          glowBlur:   30,
          animation:  'slide-down',
          animDur:    0.5, startT: 0.0,
          align:      'center',
          maxWidth:   880,
        },
        {
          type: 'divider',
          y: 1070, x1: 140, x2: 940,
          color: 'rgba(34,197,94,0.35)',
          thickness: 2, animDur: 0.45,
        },
        {
          type:       'text',
          text:       'They simply saw the rules clearly\nbefore everyone else did.',
          x: 540, y: 1210,
          fontSize:   58,
          fontFamily: 'Arial Black, sans-serif',
          color:      '#22c55e',
          lineHeight: 1.28,
          glow:       true,
          glowColor:  '#22c55e',
          glowBlur:   22,
          align:      'center',
          maxWidth:   880,
          animation:  'slide-up',
          animDur:    0.45, startT: 0.8,
        },
        {
          type:     'waveform',
          vizStyle: 'bars',
          x: 54, y: 1700,
          width: 972, height: 70,
          bars:    48,
          color:   '#22c55e',
          opacity: 0.38,
        },
        {
          type:       'progress-bar',
          x: 54, y: 1855,
          width: 972, height: 8,
          color:      '#22c55e',
          color2:     '#16a34a',
          trackColor: 'rgba(255,255,255,0.08)',
        },
      ],
    },

    // ══════════════════════════════════════════════════════════
    // SCENE 7 — CTA  (~8s)
    // Voice: bm_george — authority voice closes it
    // ══════════════════════════════════════════════════════════
    {
      tts: {
        text: "This channel breaks down the data and the psychology most people never see. Follow now. New breakdown every week.",
        voice:      'bm_george',
        pauseAfter: 0.55,
      },
      transition: 'fade',
      transitionDuration: 0.5,
      layers: [
        {
          type:         'gradient',
          gradientType: 'linear',
          colors:       ['#08090b', '#0c1018', '#060708'],
          angle:        170,
          animated:     true,
          vignette:     true,
          vignetteStrength: 0.52,
        },
        {
          type:       'text',
          text:       'NOW YOU\nKNOW.',
          x: 540, y: 490,
          fontSize:   168,
          fontFamily: 'Impact, Arial Black, sans-serif',
          color:      '#f1f5f9',
          lineHeight: 1.05,
          glow:       true,
          glowColor:  '#06b6d4',
          glowBlur:   55,
          shadow:     true,
          shadowBlur: 40,
          animation:  'slide-down',
          animDur:    0.5, startT: 0.0,
          align:      'center',
        },
        {
          type: 'divider',
          y: 720, x1: 80, x2: 1000,
          color: '#06b6d4',
          thickness: 3, animDur: 0.5,
        },
        {
          type:       'text',
          text:       'Most people never will.',
          x: 540, y: 840,
          fontSize:   72,
          fontFamily: 'Arial Black, sans-serif',
          color:      'rgba(241,245,249,0.75)',
          animation:  'fade',
          animDur:    0.45, startT: 0.4,
          align:      'center',
          maxWidth:   900,
        },
        {
          type: 'divider',
          y: 960, x1: 200, x2: 880,
          color: 'rgba(241,245,249,0.12)',
          thickness: 1, animDur: 0.4,
        },
        // CTA box
        {
          type:         'shape',
          shape:        'rect',
          x: 540, y: 1130,
          width: 900, height: 200,
          color:        'rgba(6,182,212,0.09)',
          borderRadius: 22,
          stroke:       true,
          strokeColor:  '#06b6d4',
          strokeWidth:  2,
          enterAt:  0.9, enterDur: 0.5,
        },
        {
          type:       'text',
          text:       'Follow for weekly breakdowns\non data they do not want you to see.',
          x: 540, y: 1132,
          fontSize:   48,
          fontFamily: 'Arial, sans-serif',
          color:      '#f1f5f9',
          lineHeight: 1.32,
          align:      'center',
          maxWidth:   840,
          animation:  'fade',
          animDur:    0.5, startT: 1.0,
        },
        // Bottom pill — red urgency
        {
          type:         'shape',
          shape:        'rect',
          x: 540, y: 1480,
          width: 780, height: 90,
          color:        '#dc2626',
          borderRadius: 45,
          shadow:       true,
          shadowColor:  'rgba(220,38,38,0.45)',
          shadowBlur:   30,
          enterAt:  1.6, enterDur: 0.4,
        },
        {
          type:       'text',
          text:       'NEW VIDEO EVERY WEEK',
          x: 540, y: 1482,
          fontSize:   44,
          fontFamily: 'Impact, sans-serif',
          color:      '#ffffff',
          align:      'center',
          animation:  'fade',
          animDur:    0.4, startT: 1.7,
        },
        {
          type:     'waveform',
          vizStyle: 'bars',
          x: 54, y: 1700,
          width: 972, height: 70,
          bars:    52,
          color:   '#06b6d4',
          opacity: 0.38,
        },
        {
          type:       'progress-bar',
          x: 54, y: 1855,
          width: 972, height: 8,
          color:      '#06b6d4',
          color2:     '#dc2626',
          trackColor: 'rgba(255,255,255,0.08)',
        },
      ],
    },

  ],
};
