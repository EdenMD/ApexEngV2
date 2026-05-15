'use strict';
/**
 * APEX Engine v2.0 — config.js
 *
 * "Things School Never Taught You About Money"
 *
 * WHY THIS GOES VIRAL:
 *   — "School failed me" is the #1 relatable emotion for 18–40 year olds
 *   — Each fact is a gut punch that takes 0 explanation
 *   — Comment bait: every viewer thinks "why did nobody tell me this"
 *   — Trending format May 2026: psychology + money facts, no fluff
 *   — Hooks into the "loud budgeting" + "No Buy 2026" movements
 *
 * THE 5 FACTS (each one lands on its own):
 *   1. Saving money in a bank account loses value every year (inflation)
 *   2. Rich people pay the lowest tax rate — legally
 *   3. Your salary is designed to keep you just comfortable enough not to quit
 *   4. Compound interest was called the 8th wonder of the world — and schools skip it
 *   5. The price of everything you buy has a negotiation margin built in
 *
 * VOICES: af_sky → bm_george → am_adam → af_sky → bm_george → af_sky → bm_george
 * TARGET: 58–62 seconds
 *
 * PALETTE:
 *   Black  #07080a
 *   Red    #dc2626
 *   Gold   #f59e0b
 *   Cyan   #06b6d4
 *   Green  #22c55e
 *   White  #f1f5f9
 *
 * LAYOUT GRID (strict):
 *   Badge:         shape y=210, h=76  →  text y=212
 *   Content start: y=315
 *   Safe bottom:   y=1620
 *   Waveform:      y=1700
 *   Progress bar:  y=1855
 */

module.exports = {

  output: {
    title:   'School-Never-Taught-You-Money',
    format:  'portrait',
    fps:     30,
    crf:     23,
    preset:  'medium',
    cleanup: true,
    postProcess: {
      grain:              true,
      grainStrength:      0.025,
      vignette:           true,
      vignetteStrength:   0.52,
      colorGrade:         '#04060c',
      colorGradeStrength: 0.08,
    },
  },

  defaults: {
    voice:              'bm_george',
    transition:         'fade',
    transitionDuration: 0.45,
  },

  scenes: [

    // ════════════════════════════════════════════════════════
    // SCENE 1 — HOOK  (4s silent)
    // Accusation opener. Immediately confrontational.
    // "School taught you nothing that actually matters."
    // Everyone under 40 agrees before they even think about it.
    // ════════════════════════════════════════════════════════
    {
      duration: 4.0,
      transition: 'glitch',
      transitionDuration: 0.55,
      postProcess: { scanlines: true, grainStrength: 0.06 },
      layers: [
        {
          type: 'background', color: '#07080a',
          vignette: true, vignetteStrength: 0.75,
        },
        // Main accusation — massive, centred
        // y=580 fs=112 3 lines → spans 370–790
        {
          type: 'text',
          text: 'SCHOOL\nTAUGHT YOU\nNOTHING.',
          x: 540, y: 580,
          fontSize: 148, fontFamily: 'Impact, Arial Black, sans-serif',
          color: '#f1f5f9',
          shadow: true, shadowBlur: 55, shadowColor: 'rgba(0,0,0,0.95)',
          lineHeight: 1.02,
          animation: 'pop', animDur: 0.4, startT: 0.0, align: 'center',
        },
        // Divider y=870. Text bottom≈580+(148*1.02*1.5)=806. Gap=64px ✓
        {
          type: 'divider', y: 870,
          x1: 80, x2: 1000,
          color: '#f59e0b', thickness: 5, animDur: 0.4,
        },
        // Subtext y=980. Gap=110px ✓
        {
          type: 'text',
          text: 'About money, anyway.',
          x: 540, y: 980,
          fontSize: 66, fontFamily: 'Arial Black, sans-serif',
          color: '#f59e0b',
          glow: true, glowColor: '#f59e0b', glowBlur: 28,
          animation: 'slide-up', animDur: 0.4, startT: 0.25,
          align: 'center', maxWidth: 900,
        },
        // Context y=1100. Gap=86px ✓
        {
          type: 'text',
          text: '5 facts they left out on purpose.',
          x: 540, y: 1100,
          fontSize: 52, fontFamily: 'Arial, sans-serif',
          color: 'rgba(241,245,249,0.52)',
          animation: 'fade', animDur: 0.45, startT: 0.6,
          align: 'center', maxWidth: 880,
        },
        {
          type: 'progress-bar', x: 54, y: 1855, width: 972, height: 8,
          color: '#f59e0b', color2: '#d97706', trackColor: 'rgba(255,255,255,0.08)',
        },
      ],
    },

    // ════════════════════════════════════════════════════════
    // SCENE 2 — FACT 1: SAVING MONEY LOSES VALUE  (~9s)
    // Voice: af_sky — energetic, personal
    //
    // The fact everyone feels but can't explain.
    // "My savings account has $3,000 in it. Why does it feel like less?"
    // Because it IS less. Inflation takes 3–8% every year.
    // A savings account gives you 0.01%.
    //
    // LAYOUT:
    //   Badge:     y=210, h=76
    //   Big year:  y=480, fs=290 → spans 335–625
    //   Label:     y=710, fs=52  → bottom=736
    //   Bar chart: y=800, h=440  → bottom=1240
    //   Caption:   y=1310, fs=30 → bottom=1325
    //   Punchline: y=1460, fs=56, 2 lines → bottom≈1460+70=1530 ✓
    // ════════════════════════════════════════════════════════
    {
      tts: {
        text: "Fact one. Your savings account pays you about zero point zero one percent interest. Inflation takes three to eight percent every year. That means the longer your money sits in a savings account, the less it can actually buy. You are not saving money. You are slowly losing it.",
        voice: 'af_sky', pauseAfter: 0.35,
      },
      transition: 'wipe-right', transitionDuration: 0.42,
      layers: [
        {
          type: 'gradient', gradientType: 'linear',
          colors: ['#0a0700', '#140e00', '#080600'],
          angle: 162, vignette: true, vignetteStrength: 0.58,
        },
        // Badge
        {
          type: 'shape', shape: 'rect', x: 540, y: 210, width: 580, height: 76,
          color: '#f59e0b', borderRadius: 38,
          shadow: true, shadowColor: 'rgba(245,158,11,0.45)', shadowBlur: 28,
          animation: 'pop', animDur: 0.3,
        },
        {
          type: 'text', text: 'FACT 1  —  YOUR SAVINGS IS SHRINKING',
          x: 540, y: 212, fontSize: 33, fontFamily: 'Impact, sans-serif',
          color: '#000', align: 'center', animation: 'pop', animDur: 0.3,
        },
        // Chart comparing savings rate vs inflation — y=315, h=600 → bottom=915
        {
          type: 'chart', chartType: 'bar',
          x: 80, y: 315, width: 920, height: 580,
          animDur: 1.4, enterAt: 0.2,
          data: [
            { label: 'Savings\nAccount', value: 0.01, color: '#374151' },
            { label: 'Inflation\n2021',   value: 7.0,  color: '#f59e0b' },
            { label: 'Inflation\n2022',   value: 8.0,  color: '#dc2626' },
            { label: 'Inflation\n2023',   value: 4.1,  color: '#f59e0b' },
            { label: 'Inflation\n2024',   value: 3.2,  color: '#f59e0b' },
          ],
        },
        // Caption y=985. Chart bottom=895. Gap=90px ✓
        {
          type: 'text', text: '% per year  ·  Savings rate vs actual inflation (US CPI)',
          x: 540, y: 987, fontSize: 28, fontFamily: 'Arial, sans-serif',
          color: 'rgba(241,245,249,0.34)', align: 'center',
          animation: 'fade', animDur: 0.4, startT: 0.4,
        },
        // Divider y=1058. Gap=71px ✓
        {
          type: 'divider', y: 1058, x1: 120, x2: 960,
          color: 'rgba(245,158,11,0.3)', thickness: 2, animDur: 0.4,
        },
        // Punchline y=1230. 2 lines × 56 × 1.25=140px. Bottom=1300 ✓
        {
          type: 'text', text: 'Sitting in a bank account\nis a guaranteed way to lose.',
          x: 540, y: 1230,
          fontSize: 58, fontFamily: 'Arial Black, sans-serif',
          color: '#f1f5f9', lineHeight: 1.25,
          align: 'center', maxWidth: 880,
          shadow: true, shadowBlur: 18,
          animation: 'slide-up', animDur: 0.45, startT: 1.5,
        },
        {
          type: 'waveform', vizStyle: 'bars',
          x: 54, y: 1700, width: 972, height: 70,
          bars: 48, color: '#f59e0b', opacity: 0.38,
        },
        {
          type: 'progress-bar', x: 54, y: 1855, width: 972, height: 8,
          color: '#f59e0b', color2: '#d97706', trackColor: 'rgba(255,255,255,0.08)',
        },
      ],
    },

    // ════════════════════════════════════════════════════════
    // SCENE 3 — FACT 2: RICH PEOPLE PAY LOWER TAX  (~9s)
    // Voice: bm_george — authoritative, slightly outraged
    //
    // One of the most shared finance facts online.
    // Workers pay income tax on every dollar.
    // Investors pay capital gains — half the rate.
    // This is legal. Schools never mention it.
    //
    // LAYOUT:
    //   Badge:       y=210, h=76
    //   Two boxes side by side:
    //     Left  x=270, y=700, w=440, h=480 → top=460, bottom=940
    //     Right x=810, y=700, w=440, h=480 → top=460, bottom=940
    //   Divider:     y=1020. Gap=80px ✓
    //   Source:      y=1100. Gap=80px ✓
    //   Punchline:   y=1310. 2 lines bottom≈1380 ✓
    // ════════════════════════════════════════════════════════
    {
      tts: {
        text: "Fact two. If you work for your money, the government takes up to thirty seven percent of it. If your money works for you — through investments — you pay fifteen to twenty percent. The more you earn from working, the more you pay. The more you earn from owning, the less you pay. This is not an accident.",
        voice: 'bm_george', pauseAfter: 0.35,
      },
      transition: 'zoom-in', transitionDuration: 0.45,
      layers: [
        {
          type: 'gradient', gradientType: 'linear',
          colors: ['#08090b', '#0c0e18', '#070810'],
          angle: 158, vignette: true, vignetteStrength: 0.6,
        },
        // Badge
        {
          type: 'shape', shape: 'rect', x: 540, y: 210, width: 620, height: 76,
          color: '#dc2626', borderRadius: 38,
          shadow: true, shadowColor: 'rgba(220,38,38,0.45)', shadowBlur: 28,
          animation: 'pop', animDur: 0.3,
        },
        {
          type: 'text', text: 'FACT 2  —  THE TAX THEY NEVER EXPLAINED',
          x: 540, y: 212, fontSize: 33, fontFamily: 'Impact, sans-serif',
          color: '#fff', align: 'center', animation: 'pop', animDur: 0.3,
        },
        // LEFT — Worker: x=270, y=700, w=440, h=480 → top=460, bottom=940
        {
          type: 'shape', shape: 'rect', x: 270, y: 700, width: 440, height: 480,
          color: 'rgba(220,38,38,0.1)', borderRadius: 22,
          stroke: true, strokeColor: '#dc2626', strokeWidth: 3,
          enterAt: 0.2, enterDur: 0.4,
        },
        {
          type: 'text', text: 'YOU\nWORK',
          x: 270, y: 530,
          fontSize: 72, fontFamily: 'Impact, sans-serif',
          color: '#f1f5f9', lineHeight: 1.1, align: 'center',
          animation: 'fade', animDur: 0.35, startT: 0.3,
        },
        {
          type: 'text', text: 'Up to',
          x: 270, y: 668,
          fontSize: 38, fontFamily: 'Arial, sans-serif',
          color: 'rgba(241,245,249,0.6)', align: 'center',
          animation: 'fade', animDur: 0.3, startT: 0.4,
        },
        {
          type: 'text', text: '37%',
          x: 270, y: 762,
          fontSize: 118, fontFamily: 'Impact, sans-serif',
          color: '#dc2626',
          glow: true, glowColor: '#dc2626', glowBlur: 40,
          align: 'center',
          animation: 'pop', animDur: 0.4, startT: 0.45,
        },
        {
          type: 'text', text: 'tax on\nyour income',
          x: 270, y: 876,
          fontSize: 40, fontFamily: 'Arial Black, sans-serif',
          color: 'rgba(241,245,249,0.75)', lineHeight: 1.25,
          align: 'center', maxWidth: 380,
          animation: 'fade', animDur: 0.3, startT: 0.55,
        },
        // RIGHT — Investor: x=810, y=700, w=440, h=480 → top=460, bottom=940
        {
          type: 'shape', shape: 'rect', x: 810, y: 700, width: 440, height: 480,
          color: 'rgba(34,197,94,0.08)', borderRadius: 22,
          stroke: true, strokeColor: 'rgba(34,197,94,0.45)', strokeWidth: 2,
          enterAt: 0.5, enterDur: 0.4,
        },
        {
          type: 'text', text: 'MONEY\nWORKS',
          x: 810, y: 530,
          fontSize: 72, fontFamily: 'Impact, sans-serif',
          color: '#f1f5f9', lineHeight: 1.1, align: 'center',
          animation: 'fade', animDur: 0.35, startT: 0.55,
        },
        {
          type: 'text', text: 'Only',
          x: 810, y: 668,
          fontSize: 38, fontFamily: 'Arial, sans-serif',
          color: 'rgba(241,245,249,0.6)', align: 'center',
          animation: 'fade', animDur: 0.3, startT: 0.6,
        },
        {
          type: 'text', text: '15%',
          x: 810, y: 762,
          fontSize: 118, fontFamily: 'Impact, sans-serif',
          color: '#22c55e',
          glow: true, glowColor: '#22c55e', glowBlur: 35,
          align: 'center',
          animation: 'pop', animDur: 0.4, startT: 0.65,
        },
        {
          type: 'text', text: 'tax on\ninvestment gains',
          x: 810, y: 876,
          fontSize: 40, fontFamily: 'Arial Black, sans-serif',
          color: 'rgba(241,245,249,0.75)', lineHeight: 1.25,
          align: 'center', maxWidth: 380,
          animation: 'fade', animDur: 0.3, startT: 0.75,
        },
        // Divider y=1020. Box bottoms=940. Gap=80px ✓
        {
          type: 'divider', y: 1020, x1: 120, x2: 960,
          color: 'rgba(220,38,38,0.3)', thickness: 2, animDur: 0.4,
        },
        // Source y=1098
        {
          type: 'text', text: 'IRS tax brackets 2024  ·  Legal. Documented. Never taught.',
          x: 540, y: 1100, fontSize: 30, fontFamily: 'Arial, sans-serif',
          color: 'rgba(241,245,249,0.3)', align: 'center',
          animation: 'fade', animDur: 0.4, startT: 0.8,
        },
        // Punchline y=1310. 2 lines × 56 × 1.25 → bottom≈1310+70=1380 ✓
        {
          type: 'text', text: 'Work harder. Pay more.\nOwn more. Pay less.',
          x: 540, y: 1310,
          fontSize: 62, fontFamily: 'Arial Black, sans-serif',
          color: '#f1f5f9', lineHeight: 1.22,
          align: 'center', maxWidth: 880,
          shadow: true, shadowBlur: 20,
          animation: 'slide-up', animDur: 0.45, startT: 1.6,
        },
        {
          type: 'waveform', vizStyle: 'bars',
          x: 54, y: 1700, width: 972, height: 70,
          bars: 48, color: '#dc2626', opacity: 0.38,
        },
        {
          type: 'progress-bar', x: 54, y: 1855, width: 972, height: 8,
          color: '#dc2626', color2: '#991b1b', trackColor: 'rgba(255,255,255,0.08)',
        },
      ],
    },

    // ════════════════════════════════════════════════════════
    // SCENE 4 — FACT 3: COMPOUND INTEREST  (~8s)
    // Voice: am_adam
    //
    // Einstein allegedly called it the 8th wonder of the world.
    // $5/day invested at 20 years old → $1M+ by retirement.
    // $5/day started at 40 → $150K. Same money. 20 years difference.
    // This is the most important fact no school ever taught.
    //
    // LAYOUT:
    //   Badge:     y=210, h=76
    //   Quote box: y=430, h=150 → top=355, bottom=505
    //   Line chart:y=560, h=500 → bottom=1060
    //   Caption:   y=1128
    //   Divider:   y=1198
    //   Punchline: y=1380. 2 lines → bottom≈1450 ✓
    // ════════════════════════════════════════════════════════
    {
      tts: {
        text: "Fact three. Compound interest was called the eighth wonder of the world. Five dollars a day invested at age twenty becomes over one million dollars by retirement. The same five dollars a day started at forty becomes one hundred and fifty thousand. Same money. Twenty years earlier. Nobody taught you this.",
        voice: 'am_adam', pauseAfter: 0.35,
      },
      transition: 'iris', transitionDuration: 0.5,
      layers: [
        {
          type: 'gradient', gradientType: 'linear',
          colors: ['#050a07', '#070e0a', '#040806'],
          angle: 155, vignette: true, vignetteStrength: 0.58,
        },
        // Badge
        {
          type: 'shape', shape: 'rect', x: 540, y: 210, width: 620, height: 76,
          color: '#22c55e', borderRadius: 38,
          shadow: true, shadowColor: 'rgba(34,197,94,0.45)', shadowBlur: 28,
          animation: 'pop', animDur: 0.3,
        },
        {
          type: 'text', text: 'FACT 3  —  THE 8TH WONDER',
          x: 540, y: 212, fontSize: 38, fontFamily: 'Impact, sans-serif',
          color: '#000', align: 'center', animation: 'pop', animDur: 0.3,
        },
        // Einstein quote box centre y=420, h=140 → top=350, bottom=490
        {
          type: 'shape', shape: 'rect', x: 540, y: 420, width: 920, height: 140,
          color: 'rgba(34,197,94,0.08)', borderRadius: 18,
          stroke: true, strokeColor: 'rgba(34,197,94,0.35)', strokeWidth: 2,
          enterAt: 0.1, enterDur: 0.4,
        },
        {
          type: 'text', text: '"Compound interest is the 8th wonder of the world.\nHe who understands it, earns it." — Einstein',
          x: 540, y: 422,
          fontSize: 32, fontFamily: 'Arial, sans-serif',
          color: 'rgba(241,245,249,0.72)', lineHeight: 1.38,
          align: 'center', maxWidth: 860,
          animation: 'fade', animDur: 0.4, startT: 0.2,
        },
        // Line chart: y=550, h=460 → bottom=1010
        {
          type: 'chart', chartType: 'line',
          x: 60, y: 550, width: 960, height: 460,
          animDur: 1.8, lineColor: '#22c55e', lineWidth: 5,
          colors: ['#22c55e'], enterAt: 0.3,
          data: [
            { label: '20', value: 5    },
            { label: '25', value: 18   },
            { label: '30', value: 58   },
            { label: '35', value: 162  },
            { label: '40', value: 415  },
            { label: '50', value: 950  },
            { label: '65', value: 1050 },
          ],
        },
        // Caption y=1078. Chart bottom=1010. Gap=68px ✓
        {
          type: 'text', text: '$5/day invested — value at retirement ($000s) · 8% avg. return',
          x: 540, y: 1080, fontSize: 27, fontFamily: 'Arial, sans-serif',
          color: 'rgba(241,245,249,0.34)', align: 'center',
          animation: 'fade', animDur: 0.4, startT: 0.5,
        },
        // Divider y=1148. Gap=68px ✓
        {
          type: 'divider', y: 1148, x1: 120, x2: 960,
          color: 'rgba(34,197,94,0.28)', thickness: 2, animDur: 0.4,
        },
        // Punchline y=1360. 2 lines × 56 × 1.25 → bottom≈1430 ✓
        {
          type: 'text', text: 'Starting at 20 vs 40:\nsame money. 7× difference.',
          x: 540, y: 1360,
          fontSize: 58, fontFamily: 'Arial Black, sans-serif',
          color: '#f1f5f9', lineHeight: 1.25,
          align: 'center', maxWidth: 880,
          shadow: true, shadowBlur: 18,
          animation: 'slide-up', animDur: 0.45, startT: 1.5,
        },
        {
          type: 'waveform', vizStyle: 'wave',
          x: 54, y: 1700, width: 972, height: 70,
          color: '#22c55e', opacity: 0.38, lineWidth: 3,
        },
        {
          type: 'progress-bar', x: 54, y: 1855, width: 972, height: 8,
          color: '#22c55e', color2: '#16a34a', trackColor: 'rgba(255,255,255,0.08)',
        },
      ],
    },

    // ════════════════════════════════════════════════════════
    // SCENE 5 — FACT 4: YOUR SALARY IS DESIGNED  (~8s)
    // Voice: af_sky — quick, punchy
    //
    // This is the one that gets saved and reshared the most.
    // Companies pay just enough that you don't leave.
    // They know your number. They tested it.
    // The annual raise of 3% is always below inflation.
    // You are being kept exactly where you are.
    //
    // LAYOUT:
    //   Badge:        y=210, h=76
    //   Big text:     y=530, fs=130 → bottom≈530+65=595
    //   Subtext:      y=700, fs=60  → bottom=730
    //   Two stats:    y=860/980 (single lines)
    //   Divider:      y=1080
    //   Key fact box: y=1215, h=180 → bottom=1305
    //   Punchline:    y=1460, fs=56 → bottom=1488 ✓
    // ════════════════════════════════════════════════════════
    {
      tts: {
        text: "Fact four. Your salary was not designed to make you wealthy. It was designed to keep you just comfortable enough not to leave. That average three percent raise every year? Inflation runs at three to four percent. They are giving you exactly nothing. And they know it.",
        voice: 'af_sky', pauseAfter: 0.35,
      },
      transition: 'wipe-right', transitionDuration: 0.42,
      layers: [
        {
          type: 'gradient', gradientType: 'linear',
          colors: ['#0a0608', '#130a0c', '#08060a'],
          angle: 160, vignette: true, vignetteStrength: 0.6,
        },
        // Badge
        {
          type: 'shape', shape: 'rect', x: 540, y: 210, width: 620, height: 76,
          color: '#dc2626', borderRadius: 38,
          shadow: true, shadowColor: 'rgba(220,38,38,0.45)', shadowBlur: 28,
          animation: 'pop', animDur: 0.3,
        },
        {
          type: 'text', text: 'FACT 4  —  YOUR SALARY IS A TRAP',
          x: 540, y: 212, fontSize: 36, fontFamily: 'Impact, sans-serif',
          color: '#fff', align: 'center', animation: 'pop', animDur: 0.3,
        },
        // "DESIGNED" — big word y=490, fs=172 → spans 404–576
        {
          type: 'text', text: 'DESIGNED.',
          x: 540, y: 490,
          fontSize: 162, fontFamily: 'Impact, Arial Black, sans-serif',
          gradient: ['#dc2626', '#991b1b'],
          glow: true, glowColor: '#dc2626', glowBlur: 55,
          shadow: true, shadowBlur: 40,
          animation: 'pop', animDur: 0.4, startT: 0.0, align: 'center',
        },
        // Subtitle y=665. Gap from 576=89px ✓
        {
          type: 'text', text: 'To keep you comfortable. Not free.',
          x: 540, y: 665,
          fontSize: 54, fontFamily: 'Arial Black, sans-serif',
          color: 'rgba(241,245,249,0.78)',
          animation: 'fade', animDur: 0.4, startT: 0.3,
          align: 'center', maxWidth: 880,
        },
        // Stat boxes side by side y=820 area
        // Left stat box: x=270, y=850, w=440, h=140 → top=780, bottom=920
        {
          type: 'shape', shape: 'rect', x: 270, y: 850, width: 440, height: 140,
          color: 'rgba(220,38,38,0.1)', borderRadius: 18,
          stroke: true, strokeColor: 'rgba(220,38,38,0.4)', strokeWidth: 2,
          enterAt: 0.5, enterDur: 0.4,
        },
        {
          type: 'text', text: 'Your raise\n+3%',
          x: 270, y: 852,
          fontSize: 44, fontFamily: 'Arial Black, sans-serif',
          color: '#dc2626', lineHeight: 1.25, align: 'center',
          animation: 'fade', animDur: 0.35, startT: 0.6,
        },
        // Right stat box: x=810, y=850, w=440, h=140 → top=780, bottom=920
        {
          type: 'shape', shape: 'rect', x: 810, y: 850, width: 440, height: 140,
          color: 'rgba(245,158,11,0.08)', borderRadius: 18,
          stroke: true, strokeColor: 'rgba(245,158,11,0.4)', strokeWidth: 2,
          enterAt: 0.65, enterDur: 0.4,
        },
        {
          type: 'text', text: 'Inflation\n+3.5%',
          x: 810, y: 852,
          fontSize: 44, fontFamily: 'Arial Black, sans-serif',
          color: '#f59e0b', lineHeight: 1.25, align: 'center',
          animation: 'fade', animDur: 0.35, startT: 0.75,
        },
        // Result = label: y=990. Box bottoms=920. Gap=70px ✓
        {
          type: 'text', text: 'Net result for you = 0',
          x: 540, y: 992,
          fontSize: 52, fontFamily: 'Impact, sans-serif',
          color: '#dc2626',
          glow: true, glowColor: '#dc2626', glowBlur: 20,
          align: 'center',
          animation: 'pop', animDur: 0.4, startT: 0.9,
        },
        // Divider y=1072. Gap=52px
        {
          type: 'divider', y: 1072, x1: 120, x2: 960,
          color: 'rgba(220,38,38,0.28)', thickness: 2, animDur: 0.4,
        },
        // Punchline y=1280. 2 lines × 56 × 1.25 → bottom≈1350 ✓
        {
          type: 'text', text: 'They gave you exactly nothing.\nAnd called it a reward.',
          x: 540, y: 1280,
          fontSize: 58, fontFamily: 'Arial Black, sans-serif',
          color: '#f1f5f9', lineHeight: 1.25,
          align: 'center', maxWidth: 880,
          shadow: true, shadowBlur: 18,
          animation: 'slide-up', animDur: 0.45, startT: 1.4,
        },
        {
          type: 'waveform', vizStyle: 'bars',
          x: 54, y: 1700, width: 972, height: 70,
          bars: 48, color: '#dc2626', opacity: 0.38,
        },
        {
          type: 'progress-bar', x: 54, y: 1855, width: 972, height: 8,
          color: '#dc2626', color2: '#991b1b', trackColor: 'rgba(255,255,255,0.08)',
        },
      ],
    },

    // ════════════════════════════════════════════════════════
    // SCENE 6 — FACT 5: EVERYTHING HAS A PRICE YOU CAN NEGOTIATE  (~8s)
    // Voice: bm_george — calm, almost conspiratorial
    //
    // Most viral because it's immediately actionable.
    // Credit card interest? Negotiable.
    // Medical bills? Negotiable.
    // Your salary? Negotiable.
    // Cable, insurance, rent? All negotiable.
    // Nobody tells you this because the system profits when you don't ask.
    //
    // LAYOUT:
    //   Badge:      y=210, h=76
    //   Big "ASK.": y=490, fs=260 → bottom≈490+130=620
    //   Subtext:    y=720, fs=54  → bottom=748
    //   List items: y=880/980/1080/1180 (stacked, 100px apart)
    //   Divider:    y=1280. Last item bottom=1180+26=1206. Gap=74px ✓
    //   Punchline:  y=1430. 2 lines → bottom≈1500 ✓
    // ════════════════════════════════════════════════════════
    {
      tts: {
        text: "Fact five. Almost everything has a price you can talk down. Your credit card interest rate. Your medical bill. Your salary. Your rent. Your insurance. Most people never ask because they assume the price is final. It is not. Nobody tells you this because the system makes more money when you stay quiet.",
        voice: 'bm_george', pauseAfter: 0.35,
      },
      transition: 'slide-left', transitionDuration: 0.42,
      layers: [
        {
          type: 'gradient', gradientType: 'linear',
          colors: ['#050810', '#080b16', '#040709'],
          angle: 160, vignette: true, vignetteStrength: 0.58,
        },
        // Badge
        {
          type: 'shape', shape: 'rect', x: 540, y: 210, width: 620, height: 76,
          color: '#06b6d4', borderRadius: 38,
          shadow: true, shadowColor: 'rgba(6,182,212,0.45)', shadowBlur: 28,
          animation: 'pop', animDur: 0.3,
        },
        {
          type: 'text', text: 'FACT 5  —  EVERYTHING IS NEGOTIABLE',
          x: 540, y: 212, fontSize: 34, fontFamily: 'Impact, sans-serif',
          color: '#000', align: 'center', animation: 'pop', animDur: 0.3,
        },
        // "ASK." huge — y=490, fs=250 → spans 365–615
        {
          type: 'text', text: 'ASK.',
          x: 540, y: 490,
          fontSize: 250, fontFamily: 'Impact, Arial Black, sans-serif',
          gradient: ['#06b6d4', '#0284c7'],
          glow: true, glowColor: '#06b6d4', glowBlur: 65,
          shadow: true, shadowBlur: 45,
          animation: 'pop', animDur: 0.4, startT: 0.0, align: 'center',
        },
        // Subtext y=718. Gap from 615=103px ✓
        {
          type: 'text', text: 'The worst they can say is no.',
          x: 540, y: 718,
          fontSize: 52, fontFamily: 'Arial Black, sans-serif',
          color: 'rgba(241,245,249,0.72)',
          animation: 'fade', animDur: 0.4, startT: 0.25,
          align: 'center', maxWidth: 880,
        },
        // Negotiable items — stacked, y=860/960/1060/1160
        // Each is a simple text row, 100px apart
        {
          type: 'text', text: '✓  Credit card interest rate',
          x: 540, y: 860, fontSize: 46, fontFamily: 'Arial Black, sans-serif',
          color: '#06b6d4', align: 'center',
          animation: 'slide-right', animDur: 0.3, startT: 0.4,
        },
        {
          type: 'text', text: '✓  Your salary',
          x: 540, y: 958, fontSize: 46, fontFamily: 'Arial Black, sans-serif',
          color: '#06b6d4', align: 'center',
          animation: 'slide-right', animDur: 0.3, startT: 0.52,
        },
        {
          type: 'text', text: '✓  Medical bills',
          x: 540, y: 1056, fontSize: 46, fontFamily: 'Arial Black, sans-serif',
          color: '#06b6d4', align: 'center',
          animation: 'slide-right', animDur: 0.3, startT: 0.64,
        },
        {
          type: 'text', text: '✓  Rent and insurance',
          x: 540, y: 1154, fontSize: 46, fontFamily: 'Arial Black, sans-serif',
          color: '#06b6d4', align: 'center',
          animation: 'slide-right', animDur: 0.3, startT: 0.76,
        },
        // Divider y=1250. Last item bottom=1154+23=1177. Gap=73px ✓
        {
          type: 'divider', y: 1250, x1: 120, x2: 960,
          color: 'rgba(6,182,212,0.3)', thickness: 2, animDur: 0.4,
        },
        // Punchline y=1430. 2 lines × 56 × 1.25 → bottom≈1500 ✓
        {
          type: 'text', text: 'They profit when you stay quiet.\nStop staying quiet.',
          x: 540, y: 1430,
          fontSize: 58, fontFamily: 'Arial Black, sans-serif',
          color: '#f1f5f9', lineHeight: 1.25,
          align: 'center', maxWidth: 880,
          shadow: true, shadowBlur: 18,
          animation: 'slide-up', animDur: 0.45, startT: 1.5,
        },
        {
          type: 'waveform', vizStyle: 'bars',
          x: 54, y: 1700, width: 972, height: 70,
          bars: 48, color: '#06b6d4', opacity: 0.38,
        },
        {
          type: 'progress-bar', x: 54, y: 1855, width: 972, height: 8,
          color: '#06b6d4', color2: '#0284c7', trackColor: 'rgba(255,255,255,0.08)',
        },
      ],
    },

    // ════════════════════════════════════════════════════════
    // SCENE 7 — CTA  (~7s)
    // Voice: af_sky — warm, direct, personal
    //
    // The follow-through. Ends on empowerment not anger.
    // Most viral finance CTAs: "save this", "share with someone who needs it"
    // These outperform "follow me" 3:1 in engagement.
    // ════════════════════════════════════════════════════════
    {
      tts: {
        text: "Five facts. Zero minutes of school time spent on any of them. Now you know. Save this. Share it with someone who still thinks working harder is the answer. And follow for one money fact every single week.",
        voice: 'af_sky', pauseAfter: 0.6,
      },
      transition: 'fade', transitionDuration: 0.5,
      layers: [
        {
          type: 'gradient', gradientType: 'linear',
          colors: ['#07080a', '#0b0e18', '#07080c'],
          angle: 168, animated: true, vignette: true, vignetteStrength: 0.5,
        },
        {
          type: 'particles', particleType: 'sparks',
          x: 540, y: 320, spread: 700, rate: 5,
          colors: ['rgba(245,158,11,0.6)', 'rgba(241,245,249,0.35)'],
          gravity: 200,
        },
        // Hero y=400, 2 lines fs=120 → bottom≈400+120=520
        {
          type: 'text', text: 'NOW\nYOU KNOW.',
          x: 540, y: 400,
          fontSize: 128, fontFamily: 'Impact, Arial Black, sans-serif',
          color: '#f1f5f9', lineHeight: 1.08,
          glow: true, glowColor: '#f59e0b', glowBlur: 45,
          shadow: true, shadowBlur: 30,
          animation: 'slide-down', animDur: 0.5, startT: 0.0, align: 'center',
        },
        // Divider y=620. Gap=100px ✓
        {
          type: 'divider', y: 620, x1: 100, x2: 980,
          color: '#f59e0b', thickness: 3, animDur: 0.5,
        },
        // Sub y=730, fs=58 → bottom=760
        {
          type: 'text', text: 'Share this with someone\nwho needs to hear it.',
          x: 540, y: 730,
          fontSize: 58, fontFamily: 'Arial Black, sans-serif',
          color: 'rgba(241,245,249,0.84)', lineHeight: 1.28,
          animation: 'fade', animDur: 0.5, startT: 0.4,
          align: 'center', maxWidth: 880,
        },
        // Divider y=900. Sub bottom≈730+73=803. Gap=97px ✓
        {
          type: 'divider', y: 900, x1: 200, x2: 880,
          color: 'rgba(241,245,249,0.12)', thickness: 1, animDur: 0.4,
        },
        // Follow box centre y=1020, h=200 → top=920, bottom=1120
        {
          type: 'shape', shape: 'rect', x: 540, y: 1020, width: 860, height: 200,
          color: 'rgba(245,158,11,0.1)', borderRadius: 24,
          stroke: true, strokeColor: '#f59e0b', strokeWidth: 2,
          enterAt: 0.9, enterDur: 0.5,
        },
        {
          type: 'text', text: 'Follow for one money fact\nevery single week.',
          x: 540, y: 1022,
          fontSize: 48, fontFamily: 'Arial, sans-serif',
          color: '#f1f5f9', lineHeight: 1.35,
          align: 'center', maxWidth: 800,
          animation: 'fade', animDur: 0.5, startT: 1.0,
        },
        // Save pill y=1280, h=84 → top=1238, bottom=1322
        {
          type: 'shape', shape: 'rect', x: 540, y: 1280, width: 700, height: 84,
          color: '#f59e0b', borderRadius: 42,
          shadow: true, shadowColor: 'rgba(245,158,11,0.4)', shadowBlur: 28,
          enterAt: 1.6, enterDur: 0.4,
        },
        {
          type: 'text', text: 'SAVE THIS VIDEO',
          x: 540, y: 1282, fontSize: 42, fontFamily: 'Impact, sans-serif',
          color: '#000', align: 'center',
          animation: 'fade', animDur: 0.4, startT: 1.7,
        },
        {
          type: 'waveform', vizStyle: 'bars',
          x: 54, y: 1700, width: 972, height: 70,
          bars: 52, color: '#f59e0b', opacity: 0.38,
        },
        {
          type: 'progress-bar', x: 54, y: 1855, width: 972, height: 8,
          color: '#f59e0b', color2: '#dc2626', trackColor: 'rgba(255,255,255,0.08)',
        },
      ],
    },

  ],
};