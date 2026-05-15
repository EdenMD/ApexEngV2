'use strict';
/**
 * APEX Engine v2.0 — config.js
 *
 * "The System Is Working Against You"
 *
 * FIXES FROM LAST VERSION:
 *  - bm_lewis removed → af_sky added
 *  - Simple everyday words — no formal/nerd language
 *  - All text y positions verified inside their boxes
 *  - Dividers only placed in clear empty gaps (50px+ from any text)
 *  - Box heights sized to contain their text with padding
 *  - maxWidth set to box_width - 80 on all boxed text
 *  - No particles
 *  - Target: 55-57 seconds
 *
 * TIMING:
 *   S1 — Hook          3.5s  silent
 *   S2 — Intro         ~7s   bm_george  (~16 words)
 *   S3 — Trick 1       ~9s   af_sky     (~21 words)
 *   S4 — Trick 2       ~9s   am_adam    (~20 words)
 *   S5 — Trick 3       ~9s   bm_george  (~20 words)
 *   S6 — The truth     ~7s   af_sky     (~17 words)
 *   S7 — CTA           ~7s   bm_george  (~14 words)
 *   ─────────────────────────────────────────────
 *   Total              ~51-54s + transitions ~3s = 54-57s
 *
 * VOICE ROTATION:
 *   bm_george → af_sky → am_adam → bm_george → af_sky → bm_george
 *
 * LAYOUT RULE USED THROUGHOUT:
 *   Shape x/y = CENTER of the box
 *   Text y    = CENTER of the text line (textBaseline: middle)
 *   For text to sit inside a box:
 *     text_y must be between (shape_y - shape_h/2 + 30) and (shape_y + shape_h/2 - 30)
 *   Dividers placed at y values with 60px+ gap from nearest text
 *
 * PALETTE:
 *   Black     #08090b
 *   Red       #dc2626
 *   Cyan      #06b6d4
 *   Gold      #f59e0b
 *   Green     #22c55e
 *   White     #f1f5f9
 */

module.exports = {

  output: {
    title:   'System-Against-You-v2',
    format:  'portrait',
    fps:     30,
    crf:     23,
    preset:  'medium',
    cleanup: true,
    postProcess: {
      grain:              true,
      grainStrength:      0.028,
      vignette:           true,
      vignetteStrength:   0.56,
      colorGrade:         '#05070e',
      colorGradeStrength: 0.09,
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
    // Simple. Direct. Everyone understands it immediately.
    // ══════════════════════════════════════════════════════════
    {
      duration: 3.5,
      transition: 'glitch',
      transitionDuration: 0.55,
      postProcess: { scanlines: true, grain: true, grainStrength: 0.06 },
      layers: [
        {
          type:             'background',
          color:            '#08090b',
          vignette:         true,
          vignetteStrength: 0.7,
        },
        // LAYOUT: all text only, no boxes. Simple and clean.
        {
          type:       'text',
          text:       '3 TRICKS',
          x: 540, y: 520,
          fontSize:   260,
          fontFamily: 'Impact, Arial Black, sans-serif',
          color:      '#f1f5f9',
          shadow:     true,
          shadowBlur: 45,
          shadowColor: 'rgba(0,0,0,0.9)',
          animation:  'pop',
          animDur:    0.35,
          startT:     0.0,
          align:      'center',
        },
        // Divider at y=720. Text bottom = 520 + (260*0.5*0.7) = 520+91=611. Gap = 109px ✓
        {
          type: 'divider',
          y: 720, x1: 80, x2: 1000,
          color: '#dc2626',
          thickness: 5,
          animDur: 0.4,
        },
        // Text center at y=840. Divider at 720. Gap = 120px ✓
        {
          type:       'text',
          text:       'being used on you right now.',
          x: 540, y: 840,
          fontSize:   68,
          fontFamily: 'Arial Black, sans-serif',
          color:      '#dc2626',
          glow:       true,
          glowColor:  '#dc2626',
          glowBlur:   35,
          animation:  'slide-up',
          animDur:    0.4,
          startT:     0.2,
          align:      'center',
          maxWidth:   920,
        },
        // Text center at y=980. Previous text bottom = 840+34=874. Gap = 106px ✓
        {
          type:       'text',
          text:       'Most people fall for all three\nevery single day.',
          x: 540, y: 1060,
          fontSize:   54,
          fontFamily: 'Arial, sans-serif',
          color:      'rgba(241,245,249,0.58)',
          lineHeight: 1.35,
          animation:  'fade',
          animDur:    0.45,
          startT:     0.65,
          align:      'center',
          maxWidth:   860,
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
    // SCENE 2 — INTRO  (~7s)
    // Voice: bm_george
    // Plain setup. Short sentences.
    // ══════════════════════════════════════════════════════════
    {
      tts: {
        text: "Three tricks are being run on you right now. All of them proven. And most people never catch any of them.",
        voice:      'bm_george',
        pauseAfter: 0.3,
      },
      transition: 'wipe-right',
      transitionDuration: 0.42,
      layers: [
        {
          type:         'gradient',
          gradientType: 'linear',
          colors:       ['#08090b', '#0d1120', '#080a12'],
          angle:        165,
          vignette:     true,
          vignetteStrength: 0.55,
        },
        // Title — no box, just text
        // Text center y=430, fontSize=120 → bottom ≈ 430+60=490
        {
          type:       'text',
          text:       'THE GAME',
          x: 540, y: 430,
          fontSize:   140,
          fontFamily: 'Impact, Arial Black, sans-serif',
          color:      '#f1f5f9',
          glow:       true,
          glowColor:  '#06b6d4',
          glowBlur:   45,
          shadow:     true,
          shadowBlur: 28,
          animation:  'slide-down',
          animDur:    0.5,
          startT:     0.0,
          align:      'center',
        },
        // Divider: text bottom ≈ 490. Place divider at y=580. Gap = 90px ✓
        {
          type: 'divider',
          y: 580, x1: 140, x2: 940,
          color: '#06b6d4',
          thickness: 3,
          animDur: 0.5,
        },
        // Subtitle: y=720. Divider at 580. Gap = 140px ✓
        {
          type:       'text',
          text:       'You are playing it\nwithout knowing the rules.',
          x: 540, y: 720,
          fontSize:   72,
          fontFamily: 'Arial Black, sans-serif',
          color:      'rgba(241,245,249,0.82)',
          lineHeight: 1.28,
          animation:  'fade',
          animDur:    0.5,
          startT:     0.3,
          align:      'center',
          maxWidth:   860,
        },
        // Sub-sub text: y=930. Previous block: 2 lines at 72px, lineHeight 1.28
        // Total height ≈ 72*1.28*2=184px. Center 720. Bottom ≈ 720+92=812. Gap to 930 = 118px ✓
        {
          type:       'text',
          text:       'Here are the three.',
          x: 540, y: 960,
          fontSize:   58,
          fontFamily: 'Arial, sans-serif',
          color:      '#06b6d4',
          animation:  'fade',
          animDur:    0.4,
          startT:     0.8,
          align:      'center',
        },
        // Three preview labels — stacked, no boxes
        // Starting at y=1120, spaced 110px apart
        {
          type:       'text',
          text:       '1  —  Your Brain',
          x: 540, y: 1140,
          fontSize:   52,
          fontFamily: 'Arial Black, sans-serif',
          color:      '#dc2626',
          animation:  'slide-right',
          animDur:    0.35,
          startT:     0.5,
          align:      'center',
        },
        {
          type:       'text',
          text:       '2  —  Your Money',
          x: 540, y: 1250,
          fontSize:   52,
          fontFamily: 'Arial Black, sans-serif',
          color:      '#f59e0b',
          animation:  'slide-right',
          animDur:    0.35,
          startT:     0.65,
          align:      'center',
        },
        {
          type:       'text',
          text:       '3  —  Your Job',
          x: 540, y: 1360,
          fontSize:   52,
          fontFamily: 'Arial Black, sans-serif',
          color:      '#06b6d4',
          animation:  'slide-right',
          animDur:    0.35,
          startT:     0.8,
          align:      'center',
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
          color2:     '#0284c7',
          trackColor: 'rgba(255,255,255,0.08)',
        },
      ],
    },

    // ══════════════════════════════════════════════════════════
    // SCENE 3 — TRICK 1: YOUR BRAIN  (~9s)
    // Voice: af_sky  (female, energetic — contrast from bm_george)
    // Loss aversion in plain words
    //
    // LAYOUT PLAN:
    //   Badge:     shape y=210, h=76   → box: 172–248
    //   Badge txt: y=212, fs=40        → fits inside ✓
    //
    //   Left box:  shape x=270, y=700, w=440, h=500  → box: 450–950
    //     "-$100": y=568, fs=110       → 568±55 = 513–623, inside 450–950 ✓
    //     "LOSING":y=700, fs=72        → 700±36 = 664–736, inside ✓
    //     line2:   y=780, fs=42        → 780±21 = 759–801, inside ✓
    //     line3:   y=840, fs=42        → 840±21 = 819–861, inside ✓
    //     line4:   y=900, fs=40        → 900±20 = 880–920, inside 450–950 ✓
    //
    //   Right box: shape x=810, y=760, w=440, h=380  → box: 570–950
    //     "+$100": y=640, fs=110       → 640±55 = 585–695, inside 570–950 ✓
    //     "GAINING":y=760, fs=72       → 760±36 = 724–796, inside ✓
    //     line2:   y=840, fs=42        → 840±21 = 819–861, inside ✓
    //     line3:   y=900, fs=40        → 880–920, inside ✓
    //
    //   Divider: y=1020. Box bottoms at 950. Gap=70px ✓
    //   Source:  y=1100, fs=36
    //   Key txt: y=1260, fs=58 (2 lines) bottom≈1260+74=1334 < 1620 ✓
    // ══════════════════════════════════════════════════════════
    {
      tts: {
        text: "Trick one. Losing money hurts your brain twice as much as gaining money feels good. Every sale countdown, every limited offer — that fear is being triggered on purpose.",
        voice:      'af_sky',
        pauseAfter: 0.35,
      },
      transition: 'zoom-in',
      transitionDuration: 0.45,
      layers: [
        {
          type:         'gradient',
          gradientType: 'linear',
          colors:       ['#0f0508', '#180a0a', '#0b0405'],
          angle:        160,
          vignette:     true,
          vignetteStrength: 0.6,
        },
        // Badge: center y=210, h=76 → top=172, bottom=248
        {
          type:         'shape',
          shape:        'rect',
          x: 540, y: 210,
          width: 580, height: 76,
          color:        '#dc2626',
          borderRadius: 38,
          shadow:       true,
          shadowColor:  'rgba(220,38,38,0.45)',
          shadowBlur:   28,
          animation:    'pop',
          animDur:      0.3,
        },
        // Badge text: y=212, fs=40 → fits within 172–248 ✓
        {
          type:       'text',
          text:       'TRICK 1  —  YOUR BRAIN',
          x: 540, y: 212,
          fontSize:   38,
          fontFamily: 'Impact, sans-serif',
          color:      '#ffffff',
          align:      'center',
          animation:  'pop',
          animDur:    0.3,
        },

        // LEFT BOX: center x=270, y=700, w=440, h=500 → top=450, bottom=950
        {
          type:         'shape',
          shape:        'rect',
          x: 270, y: 700,
          width: 440, height: 500,
          color:        'rgba(220,38,38,0.12)',
          borderRadius: 22,
          stroke:       true,
          strokeColor:  '#dc2626',
          strokeWidth:  3,
          enterAt:  0.2, enterDur: 0.4,
        },
        // "-$100": y=568, fs=110 → spans 513–623, inside 450–950 ✓
        {
          type:       'text',
          text:       '-$100',
          x: 270, y: 568,
          fontSize:   110,
          fontFamily: 'Impact, sans-serif',
          color:      '#dc2626',
          glow:       true,
          glowColor:  '#dc2626',
          glowBlur:   40,
          align:      'center',
          animation:  'pop', animDur: 0.4, startT: 0.25,
        },
        // "LOSING": y=700, fs=72 → spans 664–736, inside ✓
        {
          type:       'text',
          text:       'LOSING',
          x: 270, y: 700,
          fontSize:   72,
          fontFamily: 'Impact, sans-serif',
          color:      '#f1f5f9',
          align:      'center',
          animation:  'fade', animDur: 0.35, startT: 0.35,
        },
        // Description: y=800, fs=40, maxWidth=360 → spans 780–820, inside ✓
        {
          type:       'text',
          text:       'hurts twice\nas much',
          x: 270, y: 820,
          fontSize:   40,
          fontFamily: 'Arial Black, sans-serif',
          color:      'rgba(241,245,249,0.8)',
          lineHeight: 1.28,
          align:      'center',
          maxWidth:   360,
          animation:  'fade', animDur: 0.35, startT: 0.45,
        },

        // RIGHT BOX: center x=810, y=760, w=440, h=380 → top=570, bottom=950
        {
          type:         'shape',
          shape:        'rect',
          x: 810, y: 760,
          width: 440, height: 380,
          color:        'rgba(34,197,94,0.09)',
          borderRadius: 22,
          stroke:       true,
          strokeColor:  'rgba(34,197,94,0.45)',
          strokeWidth:  2,
          enterAt:  0.5, enterDur: 0.4,
        },
        // "+$100": y=640, fs=110 → spans 585–695, inside 570–950 ✓
        {
          type:       'text',
          text:       '+$100',
          x: 810, y: 640,
          fontSize:   110,
          fontFamily: 'Impact, sans-serif',
          color:      '#22c55e',
          align:      'center',
          animation:  'pop', animDur: 0.4, startT: 0.55,
        },
        // "GAINING": y=760, fs=72 → spans 724–796, inside ✓
        {
          type:       'text',
          text:       'GAINING',
          x: 810, y: 760,
          fontSize:   72,
          fontFamily: 'Impact, sans-serif',
          color:      '#f1f5f9',
          align:      'center',
          animation:  'fade', animDur: 0.35, startT: 0.65,
        },
        // Description: y=870, maxWidth=360 → inside 570–950 ✓
        {
          type:       'text',
          text:       'feels half\nas good',
          x: 810, y: 876,
          fontSize:   40,
          fontFamily: 'Arial Black, sans-serif',
          color:      'rgba(241,245,249,0.8)',
          lineHeight: 1.28,
          align:      'center',
          maxWidth:   360,
          animation:  'fade', animDur: 0.35, startT: 0.75,
        },

        // Divider: y=1020. Both box bottoms at 950. Gap=70px ✓
        {
          type: 'divider',
          y: 1020, x1: 120, x2: 960,
          color: 'rgba(220,38,38,0.3)',
          thickness: 2, animDur: 0.4,
        },
        // Source: y=1100. Divider at 1020. Gap=80px ✓
        {
          type:       'text',
          text:       'Nobel Prize research — Kahneman & Tversky',
          x: 540, y: 1100,
          fontSize:   36,
          fontFamily: 'Arial, sans-serif',
          color:      'rgba(241,245,249,0.32)',
          align:      'center',
          maxWidth:   860,
          animation:  'fade', animDur: 0.4, startT: 1.0,
        },
        // Key line: y=1260. Source bottom=1100+18=1118. Gap=142px ✓
        // 2 lines at fs=56, lineHeight=1.25 → total≈140px, bottom≈1260+70=1330 ✓
        {
          type:       'text',
          text:       'Every sale you see is\ntriggering this on purpose.',
          x: 540, y: 1320,
          fontSize:   56,
          fontFamily: 'Arial Black, sans-serif',
          color:      '#f1f5f9',
          lineHeight: 1.25,
          align:      'center',
          maxWidth:   880,
          shadow:     true, shadowBlur: 18,
          animation:  'slide-up', animDur: 0.45, startT: 1.4,
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
    // SCENE 4 — TRICK 2: YOUR MONEY  (~9s)
    // Voice: am_adam  (American male — third distinct voice)
    // Inflation in plain words + the proven donut chart
    //
    // LAYOUT PLAN:
    //   Badge:  y=210, h=76
    //   Donut:  x=540, y=760, cx=540, cy=760, w=620, h=620
    //           → top=450, bottom=1070
    //   Source: y=1145. Bottom of donut=1070. Gap=75px ✓
    //   Divider:y=1228. Source bottom=1145+18=1163. Gap=65px ✓
    //   Key txt:y=1380 (2 lines fs=58) → bottom≈1380+74=1454 < 1700 ✓
    // ══════════════════════════════════════════════════════════
    {
      tts: {
        text: "Trick two. While your food and rent got more expensive, the top one percent added twenty six trillion dollars in the same three years. That is not a coincidence.",
        voice:      'am_adam',
        pauseAfter: 0.35,
      },
      transition: 'iris',
      transitionDuration: 0.5,
      layers: [
        {
          type:         'gradient',
          gradientType: 'radial',
          colors:       ['#0a090c', '#070810', '#040508'],
          vignette:     true,
          vignetteStrength: 0.62,
        },
        // Badge: y=210, h=76 → top=172, bottom=248
        {
          type:         'shape',
          shape:        'rect',
          x: 540, y: 210,
          width: 580, height: 76,
          color:        '#f59e0b',
          borderRadius: 38,
          shadow:       true,
          shadowColor:  'rgba(245,158,11,0.45)',
          shadowBlur:   28,
          animation:    'pop', animDur: 0.3,
        },
        // Badge text: y=212, fs=38 → within 172–248 ✓
        {
          type:       'text',
          text:       'TRICK 2  —  YOUR MONEY',
          x: 540, y: 212,
          fontSize:   38,
          fontFamily: 'Impact, sans-serif',
          color:      '#000000',
          align:      'center',
          animation:  'pop', animDur: 0.3,
        },
        // Donut: cx=540, cy=760, w=620, h=620 → top=450, bottom=1070
        // cx/cy MUST equal x/y per v2.0 docs
        {
          type:      'chart',
          chartType: 'donut',
          x: 540,  y: 760,
          cx: 540, cy: 760,
          width: 620, height: 620,
          animDur:   1.8,
          explode:   true,
          enterAt:   0.3,
          data: [
            { label: 'Top 1%',     value: 53, color: '#f59e0b' },
            { label: 'Next 9%',    value: 30, color: '#d97706' },
            { label: 'Bottom 90%', value: 17, color: '#1e2535' },
          ],
        },
        // Source: y=1145. Donut bottom=1070. Gap=75px ✓
        {
          type:       'text',
          text:       'Share of new wealth created — 2020 to 2023',
          x: 540, y: 1148,
          fontSize:   36,
          fontFamily: 'Arial, sans-serif',
          color:      'rgba(241,245,249,0.36)',
          align:      'center',
          maxWidth:   860,
          animation:  'fade', animDur: 0.4, startT: 0.5,
        },
        // Divider: y=1228. Source bottom≈1148+18=1166. Gap=62px ✓
        {
          type: 'divider',
          y: 1232, x1: 120, x2: 960,
          color: 'rgba(245,158,11,0.28)',
          thickness: 2, animDur: 0.4,
        },
        // Key text: y=1390, 2 lines fs=56 → bottom≈1390+70=1460 < 1700 ✓
        {
          type:       'text',
          text:       'When prices go up,\nmoney moves to the top.',
          x: 540, y: 1390,
          fontSize:   60,
          fontFamily: 'Arial Black, sans-serif',
          color:      '#f1f5f9',
          lineHeight: 1.22,
          align:      'center',
          maxWidth:   880,
          shadow:     true, shadowBlur: 18,
          animation:  'slide-up', animDur: 0.45, startT: 1.5,
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
    // SCENE 5 — TRICK 3: YOUR JOB  (~9s)
    // Voice: bm_george  (authority returns for the big number)
    //
    // LAYOUT PLAN:
    //   Badge:      y=210, h=76
    //   "300M":     y=600, fs=380 → approx top=467, bottom=733
    //               BUT badge bottom=248. Content zone starts 310.
    //               Top of "300M" text center at 600, fs=380
    //               approx text top = 600 - (380*0.35) = 600-133 = 467 > 310 ✓
    //   "jobs gone":y=870, fs=60 → bottom≈870+30=900
    //   Divider:    y=970. Gap from text=70px ✓
    //   2 stat boxes side by side:
    //     Left box:  x=270, y=1180, w=420, h=320 → top=1020, bottom=1340
    //       "85%":   y=1080, fs=130 → spans 1025–1155, inside 1020–1340 ✓
    //       text:    y=1232, fs=38  → spans 1213–1251, inside ✓
    //       text:    y=1285, fs=38  → spans 1266–1304, inside ✓
    //     Right box: x=810, y=1180, w=420, h=320 → same
    //       "10":    y=1080, fs=130 → inside ✓
    //       text:    y=1232, fs=38  → inside ✓
    //       text:    y=1285, fs=38  → inside ✓
    //   Bottom box bottoms at 1340. Waveform at 1700. Gap = 360px ✓
    // ══════════════════════════════════════════════════════════
    {
      tts: {
        text: "Trick three. Three hundred million jobs gone by 2030. Goldman Sachs put that in writing. And eighty five percent of companies using AI have already let people go.",
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
        // Badge: y=210, h=76 → top=172, bottom=248
        {
          type:         'shape',
          shape:        'rect',
          x: 540, y: 210,
          width: 560, height: 76,
          color:        '#06b6d4',
          borderRadius: 38,
          shadow:       true,
          shadowColor:  'rgba(6,182,212,0.45)',
          shadowBlur:   28,
          animation:    'pop', animDur: 0.3,
        },
        // Badge text: y=212, fs=38 → within 172–248 ✓
        {
          type:       'text',
          text:       'TRICK 3  —  YOUR JOB',
          x: 540, y: 212,
          fontSize:   38,
          fontFamily: 'Impact, sans-serif',
          color:      '#000000',
          align:      'center',
          animation:  'pop', animDur: 0.3,
        },
        // "300M": y=600, fs=380 → top≈467 > badge bottom 248, content zone 310 ✓
        {
          type:       'text',
          text:       '300M',
          x: 540, y: 600,
          fontSize:   380,
          fontFamily: 'Impact, Arial Black, sans-serif',
          gradient:   ['#06b6d4', '#0284c7'],
          glow:       true,
          glowColor:  '#06b6d4',
          glowBlur:   90,
          shadow:     true,
          shadowBlur: 70,
          shadowColor: 'rgba(6,182,212,0.55)',
          animation:  'pop', animDur: 0.4, startT: 0.0,
          align:      'center',
        },
        // "jobs gone by 2030": y=870, fs=60 → bottom≈900
        // "300M" bottom ≈ 600+133=733. Gap = 870-733=137px ✓
        {
          type:       'text',
          text:       'jobs gone by 2030.',
          x: 540, y: 870,
          fontSize:   60,
          fontFamily: 'Arial Black, sans-serif',
          color:      '#f1f5f9',
          align:      'center',
          animation:  'slide-up', animDur: 0.4, startT: 0.25,
          maxWidth:   880,
        },
        // Divider: y=970. Text bottom≈870+30=900. Gap=70px ✓
        {
          type: 'divider',
          y: 970, x1: 140, x2: 940,
          color: 'rgba(6,182,212,0.4)',
          thickness: 2, animDur: 0.45,
        },

        // LEFT BOX: x=270, y=1180, w=420, h=320 → top=1020, bottom=1340
        {
          type:         'shape',
          shape:        'rect',
          x: 270, y: 1180,
          width: 420, height: 320,
          color:        'rgba(220,38,38,0.1)',
          borderRadius: 18,
          stroke:       true,
          strokeColor:  'rgba(220,38,38,0.45)',
          strokeWidth:  2,
          enterAt:  0.8, enterDur: 0.4,
        },
        // "85%": y=1080, fs=130 → spans 1025–1155, inside 1020–1340 ✓
        {
          type:       'text',
          text:       '85%',
          x: 270, y: 1090,
          fontSize:   130,
          fontFamily: 'Impact, sans-serif',
          color:      '#dc2626',
          glow:       true,
          glowColor:  '#dc2626',
          glowBlur:   45,
          align:      'center',
          animation:  'pop', animDur: 0.4, startT: 0.85,
        },
        // Text: y=1240, fs=38 → spans 1221–1259, inside 1020–1340 ✓
        {
          type:       'text',
          text:       'of AI companies',
          x: 270, y: 1236,
          fontSize:   38,
          fontFamily: 'Arial Black, sans-serif',
          color:      'rgba(241,245,249,0.85)',
          align:      'center',
          maxWidth:   380,
          animation:  'fade', animDur: 0.35, startT: 0.95,
        },
        // Text: y=1293, fs=38 → spans 1274–1312, inside 1020–1340 ✓
        {
          type:       'text',
          text:       'cut jobs already',
          x: 270, y: 1293,
          fontSize:   38,
          fontFamily: 'Arial Black, sans-serif',
          color:      'rgba(241,245,249,0.85)',
          align:      'center',
          maxWidth:   380,
          animation:  'fade', animDur: 0.35, startT: 1.05,
        },

        // RIGHT BOX: x=810, y=1180, w=420, h=320 → top=1020, bottom=1340
        {
          type:         'shape',
          shape:        'rect',
          x: 810, y: 1180,
          width: 420, height: 320,
          color:        'rgba(245,158,11,0.1)',
          borderRadius: 18,
          stroke:       true,
          strokeColor:  'rgba(245,158,11,0.45)',
          strokeWidth:  2,
          enterAt:  0.8, enterDur: 0.4,
        },
        // "10": y=1090, fs=130 → inside 1020–1340 ✓
        {
          type:       'text',
          text:       '10',
          x: 810, y: 1090,
          fontSize:   130,
          fontFamily: 'Impact, sans-serif',
          color:      '#f59e0b',
          glow:       true,
          glowColor:  '#f59e0b',
          glowBlur:   45,
          align:      'center',
          animation:  'pop', animDur: 0.4, startT: 0.85,
        },
        // Text: y=1236, fs=38 → inside ✓
        {
          type:       'text',
          text:       'years to finish',
          x: 810, y: 1236,
          fontSize:   38,
          fontFamily: 'Arial Black, sans-serif',
          color:      'rgba(241,245,249,0.85)',
          align:      'center',
          maxWidth:   380,
          animation:  'fade', animDur: 0.35, startT: 0.95,
        },
        // Text: y=1293, fs=38 → inside ✓
        {
          type:       'text',
          text:       'the shift',
          x: 810, y: 1293,
          fontSize:   38,
          fontFamily: 'Arial Black, sans-serif',
          color:      'rgba(241,245,249,0.85)',
          align:      'center',
          maxWidth:   380,
          animation:  'fade', animDur: 0.35, startT: 1.05,
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
    // SCENE 6 — THE TRUTH  (~7s)
    // Voice: af_sky  (female close — emotional contrast)
    // Simple hopeful message. Short sentences.
    //
    // LAYOUT PLAN:
    //   Badge:    y=210, h=76
    //   Quote:    y=700 (2 lines, fs=88, lh=1.15)
    //             line spacing=88*1.15=101px
    //             line1 center: 700-50=650, top=650-44=606 > 310 ✓
    //             line2 center: 700+50=750, bottom=750+44=794
    //   Divider:  y=880. Quote bottom=794. Gap=86px ✓
    //   Text:     y=1000, fs=60. Bottom=1000+30=1030
    //   Text:     y=1120, fs=60. Bottom=1120+30=1150 < 1700 ✓
    // ══════════════════════════════════════════════════════════
    {
      tts: {
        text: "Now you know. The people winning are not luckier than you. They just saw the rules before everyone else did. Now you have seen them too.",
        voice:      'af_sky',
        pauseAfter: 0.3,
      },
      transition: 'slide-left',
      transitionDuration: 0.4,
      layers: [
        {
          type:         'gradient',
          gradientType: 'linear',
          colors:       ['#030c06', '#040e08', '#030906'],
          angle:        158,
          vignette:     true,
          vignetteStrength: 0.55,
        },
        // Badge: y=210, h=76
        {
          type:         'shape',
          shape:        'rect',
          x: 540, y: 210,
          width: 480, height: 76,
          color:        '#22c55e',
          borderRadius: 38,
          shadow:       true,
          shadowColor:  'rgba(34,197,94,0.45)',
          shadowBlur:   28,
          animation:    'pop', animDur: 0.3,
        },
        {
          type:       'text',
          text:       'THE TRUTH',
          x: 540, y: 212,
          fontSize:   42,
          fontFamily: 'Impact, sans-serif',
          color:      '#000000',
          align:      'center',
          animation:  'pop', animDur: 0.3,
        },
        // Quote: y=700, fs=88, 2 lines
        // line1 top≈606 > badge bottom 248 & content zone 310 ✓
        {
          type:       'text',
          text:       'The people winning\nare not luckier.',
          x: 540, y: 700,
          fontSize:   88,
          fontFamily: 'Impact, Arial Black, sans-serif',
          color:      '#f1f5f9',
          lineHeight: 1.15,
          shadow:     true, shadowBlur: 28,
          glow:       true,
          glowColor:  '#22c55e',
          glowBlur:   30,
          animation:  'slide-down',
          animDur:    0.5, startT: 0.0,
          align:      'center',
          maxWidth:   900,
        },
        // Divider: y=880. Quote bottom≈794. Gap=86px ✓
        {
          type: 'divider',
          y: 880, x1: 140, x2: 940,
          color: 'rgba(34,197,94,0.35)',
          thickness: 2, animDur: 0.45,
        },
        // Text: y=1000, fs=62. Divider at 880. Gap=120px ✓
        {
          type:       'text',
          text:       'They just saw the rules first.',
          x: 540, y: 1010,
          fontSize:   62,
          fontFamily: 'Arial Black, sans-serif',
          color:      '#22c55e',
          glow:       true,
          glowColor:  '#22c55e',
          glowBlur:   22,
          align:      'center',
          animation:  'fade', animDur: 0.4, startT: 0.7,
          maxWidth:   880,
        },
        // Text: y=1130. Previous bottom≈1010+31=1041. Gap=89px ✓
        {
          type:       'text',
          text:       'Now you have too.',
          x: 540, y: 1140,
          fontSize:   62,
          fontFamily: 'Arial Black, sans-serif',
          color:      'rgba(241,245,249,0.8)',
          align:      'center',
          animation:  'fade', animDur: 0.4, startT: 1.1,
          maxWidth:   880,
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
    // SCENE 7 — CTA  (~7s)
    // Voice: bm_george  (authority closes it)
    //
    // LAYOUT PLAN:
    //   "NOW YOU\nKNOW.": y=500, fs=152, lh=1.0
    //     line1 center: 500-76=424, top≈424-76=348 > 310 ✓
    //     line2 center: 500+76=576, bottom≈576+76=652
    //   Divider:  y=740. Text bottom≈652. Gap=88px ✓
    //   Text:     y=868, fs=68. Bottom≈868+34=902
    //   Divider:  y=980. Gap=78px ✓
    //   CTA box:  shape y=1130, h=210 → top=1025, bottom=1235
    //     line1:  y=1088, fs=50 → spans 1063–1113, inside ✓
    //     line2:  y=1168, fs=50 → spans 1143–1193, inside ✓
    //   Pill:     shape y=1450, h=90 → top=1405, bottom=1495
    //     text:   y=1452, fs=44 → spans 1430–1474, inside ✓
    //   Waveform: y=1700. Pill bottom 1495. Gap=205px ✓
    // ══════════════════════════════════════════════════════════
    {
      tts: {
        text: "Follow for weekly breakdowns on how the game really works. New video every single week.",
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
        // "NOW YOU\nKNOW.": y=500, fs=152
        // line1 top≈348 > 310 ✓ (barely — keep it)
        {
          type:       'text',
          text:       'NOW YOU\nKNOW.',
          x: 540, y: 500,
          fontSize:   152,
          fontFamily: 'Impact, Arial Black, sans-serif',
          color:      '#f1f5f9',
          lineHeight: 1.0,
          glow:       true, glowColor: '#06b6d4', glowBlur: 55,
          shadow:     true, shadowBlur: 40,
          animation:  'slide-down', animDur: 0.5, startT: 0.0,
          align:      'center',
        },
        // Divider: y=740. Text bottom≈652. Gap=88px ✓
        {
          type: 'divider',
          y: 740, x1: 80, x2: 1000,
          color: '#06b6d4',
          thickness: 3, animDur: 0.5,
        },
        // "Most people never will.": y=868, fs=68
        {
          type:       'text',
          text:       'Most people never will.',
          x: 540, y: 868,
          fontSize:   68,
          fontFamily: 'Arial Black, sans-serif',
          color:      'rgba(241,245,249,0.78)',
          animation:  'fade', animDur: 0.45, startT: 0.4,
          align:      'center',
          maxWidth:   900,
        },
        // Divider: y=980. Text bottom≈902. Gap=78px ✓
        {
          type: 'divider',
          y: 980, x1: 200, x2: 880,
          color: 'rgba(241,245,249,0.12)',
          thickness: 1, animDur: 0.4,
        },
        // CTA box: y=1130, h=210 → top=1025, bottom=1235
        {
          type:         'shape',
          shape:        'rect',
          x: 540, y: 1130,
          width: 900, height: 210,
          color:        'rgba(6,182,212,0.09)',
          borderRadius: 22,
          stroke:       true,
          strokeColor:  '#06b6d4',
          strokeWidth:  2,
          enterAt: 0.9, enterDur: 0.5,
        },
        // Line 1: y=1088, fs=50 → spans 1063–1113, inside 1025–1235 ✓
        {
          type:       'text',
          text:       'Follow for weekly breakdowns',
          x: 540, y: 1088,
          fontSize:   48,
          fontFamily: 'Arial, sans-serif',
          color:      '#f1f5f9',
          align:      'center',
          maxWidth:   840,
          animation:  'fade', animDur: 0.5, startT: 1.0,
        },
        // Line 2: y=1168, fs=50 → spans 1143–1193, inside 1025–1235 ✓
        {
          type:       'text',
          text:       'on how the game really works.',
          x: 540, y: 1172,
          fontSize:   48,
          fontFamily: 'Arial, sans-serif',
          color:      '#f1f5f9',
          align:      'center',
          maxWidth:   840,
          animation:  'fade', animDur: 0.5, startT: 1.1,
        },
        // Pill: y=1450, h=90 → top=1405, bottom=1495
        {
          type:         'shape',
          shape:        'rect',
          x: 540, y: 1450,
          width: 780, height: 90,
          color:        '#dc2626',
          borderRadius: 45,
          shadow:       true,
          shadowColor:  'rgba(220,38,38,0.45)',
          shadowBlur:   28,
          enterAt: 1.6, enterDur: 0.4,
        },
        // Pill text: y=1452, fs=44 → spans 1430–1474, inside 1405–1495 ✓
        {
          type:       'text',
          text:       'NEW VIDEO EVERY WEEK',
          x: 540, y: 1452,
          fontSize:   44,
          fontFamily: 'Impact, sans-serif',
          color:      '#ffffff',
          align:      'center',
          animation:  'fade', animDur: 0.4, startT: 1.7,
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