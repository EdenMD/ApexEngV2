/**e v2.0 — config.js
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * "Habits Of People Who Went From Broke To Rich"
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * WHY THIS GOES VIRAL:
 *   ✓ #FinTok = 4.7 billion views, 275% YoY growth
 *   ✓ "Broke to rich" is the highest-save format on finance TikTok
 *   ✓ Every scene is a standalone quote — people screenshot & share
 *   ✓ Motivational + practical = watch to end + follow
 *   ✓ No charts, no jargon — pure emotion and truth
 *   ✓ 60-90s hits the TikTok sweet spot (43% more reach)
 *   ✓ Clean premium aesthetic = feels credible, not clickbait
 *
 * FORMAT:
 *   Hook (silent 3.5s) → 5 habits → CTA
 *   Each habit: one brutal truth + one action line
 *   Voice alternates to keep attention
 *
 * DESIGN LANGUAGE:
 *   Dark premium background — near black
 *   One accent color per scene — changes every scene
 *   Giant bold numbers as anchors
 *   Clean sans-serif for body text
 *   No clutter — white space is the design
 *
 * VOICES:
 *   Hook:    silent
 *   Habit 1: af_heart  (warm, relatable — "this was me")
 *   Habit 2: bm_george (authoritative — "this is fact")
 *   Habit 3: af_sky    (energetic — "this changes things")
 *   Habit 4: am_adam   (serious — "this is the hard one")
 *   Habit 5: bf_emma   (calm, wise — "this is the last piece")
 *   CTA:     af_heart  (personal, warm close)
 *
 * TARGET: 68–75 seconds total
 *
 * PALETTE PER SCENE:
 *   Hook:    Pure white on black
 *   Habit 1: Cyan     #06b6d4
 *   Habit 2: Gold     #f59e0b
 *   Habit 3: Red      #ef4444
 *   Habit 4: Green    #22c55e
 *   Habit 5: Purple   #a855f7
 *   CTA:     White    #f1f5f9
 */

module.exports = {

  output: {
    title:   'Broke-To-Rich-Habits',
    format:  'portrait',
    fps:     30,
    crf:     23,
    preset:  'ultrafast',
    cleanup: true,
    postProcess: {
      grain:              true,
      grainStrength:      0.022,
      vignette:           true,
      vignetteStrength:   0.48,
    },
  },

  defaults: {
    voice:              'af_heart',
    transition:         'fade',
    transitionDuration: 0.4,
  },

  scenes: [

    // ════════════════════════════════════════════════════════
    // SCENE 1 — HOOK  (3.5s silent)
    //
    // The scroll-stopper. Clean. Confrontational.
    // "People who went from broke to rich
    //  all did the same 5 things."
    // That sentence makes everyone stop.
    // They have to know what the 5 things are.
    // ════════════════════════════════════════════════════════
    {
      duration: 3.5,
      transition: 'glitch',
      transitionDuration: 0.5,
      layers: [
        {
          type: 'background',
          color: '#07080a',
          vignette: true, vignetteStrength: 0.65,
        },
        // "People who went from" — small, sets up
        {
          type: 'text',
          text: 'People who went from',
          x: 540, y: 560,
          fontSize: 52, fontFamily: 'Arial, sans-serif',
          color: 'rgba(241,245,249,0.55)',
          animation: 'fade', animDur: 0.3, startT: 0.0,
          align: 'center',
        },
        // "BROKE TO RICH" — the punch
        // y=730, fs=148, 1 line → bottom≈730+74=804
        {
          type: 'text',
          text: 'BROKE\nTO RICH',
          x: 540, y: 720,
          fontSize: 148, fontFamily: 'Impact, Arial Black, sans-serif',
          color: '#f1f5f9',
          shadow: true, shadowBlur: 60, shadowColor: 'rgba(0,0,0,0.95)',
          lineHeight: 1.0,
          animation: 'pop', animDur: 0.35, startT: 0.05,
          align: 'center',
        },
        // "all did the same" — small
        // y=970. Bottom of prev≈720+148=868. Gap=102px ✓
        {
          type: 'text',
          text: 'all did the same',
          x: 540, y: 965,
          fontSize: 52, fontFamily: 'Arial, sans-serif',
          color: 'rgba(241,245,249,0.55)',
          animation: 'fade', animDur: 0.3, startT: 0.15,
          align: 'center',
        },
        // "5 THINGS." — accent
        // y=1075. Gap from 965+26=991 → 84px ✓
        {
          type: 'text',
          text: '5 THINGS.',
          x: 540, y: 1075,
          fontSize: 110, fontFamily: 'Impact, Arial Black, sans-serif',
          color: '#f1f5f9',
          glow: true, glowColor: '#ffffff', glowBlur: 35,
          animation: 'slide-up', animDur: 0.4, startT: 0.2,
          align: 'center',
        },
        // "Here they are." — tiny tease
        // y=1210. Gap from 1075+55=1130 → 80px ✓
        {
          type: 'text',
          text: 'Here they are.',
          x: 540, y: 1210,
          fontSize: 46, fontFamily: 'Arial, sans-serif',
          color: 'rgba(241,245,249,0.4)',
          animation: 'fade', animDur: 0.45, startT: 0.55,
          align: 'center',
        },
        {
          type: 'progress-bar', x: 54, y: 1855, width: 972, height: 6,
          color: '#f1f5f9', color2: 'rgba(241,245,249,0.4)',
          trackColor: 'rgba(255,255,255,0.06)',
        },
      ],
    },

    // ════════════════════════════════════════════════════════
    // SCENE 2 — HABIT 1: THEY STOPPED TRADING TIME FOR MONEY
    // Voice: af_heart — warm, personal
    // Accent: Cyan #06b6d4
    //
    // The moment someone realises this, everything changes.
    // "I worked 60 hour weeks and had nothing to show for it."
    // Every viewer has felt this. They will tag a friend.
    //
    // LAYOUT:
    //   Number:    y=380, fs=320 → bottom≈380+160=540
    //   Accent:    y=640, fs=56  → bottom=668
    //   Divider:   y=740. Gap=72px ✓
    //   Big truth: y=900, fs=76, 2 lines → bottom≈900+96=996
    //   Action:    y=1120, fs=50, 2 lines → bottom≈1120+63=1183
    //   Divider:   y=1265. Gap=82px ✓
    //   Quote:     y=1420, fs=46, 2 lines → bottom≈1420+58=1478 ✓
    // ════════════════════════════════════════════════════════
    {
      tts: {
        text: "Habit one. They stopped selling hours and started building assets. An hour of your time can only be sold once. An asset — a business, a skill, content, an investment — keeps paying you after the work is done.",
        voice: 'af_heart', pauseAfter: 0.3,
      },
      transition: 'wipe-right', transitionDuration: 0.38,
      layers: [
        {
          type: 'gradient', gradientType: 'linear',
          colors: ['#020c10', '#040f14', '#020a0d'],
          angle: 160, vignette: true, vignetteStrength: 0.5,
        },
        // Big "01" number anchor
        {
          type: 'text', text: '01',
          x: 540, y: 390,
          fontSize: 310, fontFamily: 'Impact, Arial Black, sans-serif',
          color: '#06b6d4',
          glow: true, glowColor: '#06b6d4', glowBlur: 80,
          shadow: true, shadowBlur: 0,
          animation: 'pop', animDur: 0.4, startT: 0.0,
          align: 'center',
          opacity: 0.18,
        },
        // Label over the number
        {
          type: 'text', text: 'STOP SELLING HOURS',
          x: 540, y: 390,
          fontSize: 58, fontFamily: 'Impact, sans-serif',
          color: '#06b6d4',
          glow: true, glowColor: '#06b6d4', glowBlur: 22,
          animation: 'fade', animDur: 0.4, startT: 0.0,
          align: 'center',
        },
        // Divider y=490. Label bottom≈390+29=419. Gap=71px ✓
        {
          type: 'divider', y: 490,
          x1: 160, x2: 920,
          color: '#06b6d4', thickness: 2, animDur: 0.45,
        },
        // Main truth y=690, fs=72, 2 lines → spans 621–759
        {
          type: 'text',
          text: 'Hours have a ceiling.\nAssets do not.',
          x: 540, y: 690,
          fontSize: 76, fontFamily: 'Arial Black, sans-serif',
          color: '#f1f5f9', lineHeight: 1.22,
          animation: 'slide-up', animDur: 0.45, startT: 0.3,
          align: 'center', maxWidth: 900,
          shadow: true, shadowBlur: 15,
        },
        // Explanation y=890, fs=48, 3 lines → spans 818–962
        {
          type: 'text',
          text: 'You can only sell 24 hours a day.\nA YouTube video sells forever.\nSo does a business. Or a product.',
          x: 540, y: 960,
          fontSize: 46, fontFamily: 'Arial, sans-serif',
          color: 'rgba(241,245,249,0.68)', lineHeight: 1.4,
          animation: 'fade', animDur: 0.45, startT: 0.6,
          align: 'center', maxWidth: 900,
        },
        // Divider y=1165. Exp bottom≈960+92=1052. Gap=113px ✓
        {
          type: 'divider', y: 1170,
          x1: 200, x2: 880,
          color: 'rgba(6,182,212,0.25)', thickness: 1, animDur: 0.4,
        },
        // Action quote y=1340, fs=50, 2 lines → bottom≈1340+63=1403 ✓
        {
          type: 'text',
          text: '"Build something that makes money\nwhile you sleep or stay broke."',
          x: 540, y: 1360,
          fontSize: 48, fontFamily: 'Arial, sans-serif',
          color: '#06b6d4',
          animation: 'fade', animDur: 0.4, startT: 1.2,
          align: 'center', maxWidth: 880,
        },
        {
          type: 'waveform', vizStyle: 'bars',
          x: 54, y: 1700, width: 972, height: 65,
          bars: 44, color: '#06b6d4', opacity: 0.32,
        },
        {
          type: 'progress-bar', x: 54, y: 1855, width: 972, height: 6,
          color: '#06b6d4', color2: '#0284c7',
          trackColor: 'rgba(255,255,255,0.06)',
        },
      ],
    },

    // ════════════════════════════════════════════════════════
    // SCENE 3 — HABIT 2: THEY PAID THEMSELVES FIRST
    // Voice: bm_george — authoritative, calm
    // Accent: Gold #f59e0b
    //
    // The most actionable habit. Instantly doable.
    // "Move money to savings the SECOND you get paid.
    //  Before bills. Before food. Before anything."
    // This is the #1 most saved finance tip format on TikTok.
    //
    // LAYOUT:
    //   Number label: y=390 (ghost + text)
    //   Divider:      y=490
    //   Main truth:   y=680, 2 lines fs=76 → bottom≈680+93=773
    //   Sub:          y=950, 3 lines fs=46 → bottom≈950+92=1042
    //   Divider:      y=1140. Gap=98px ✓
    //   Quote:        y=1330, 2 lines fs=48 → bottom≈1330+60=1390 ✓
    // ════════════════════════════════════════════════════════
    {
      tts: {
        text: "Habit two. They paid themselves first. The moment money arrives, a fixed amount goes to savings or investments immediately. Not after bills. Not after food. First. Most people save what is left. There is never anything left.",
        voice: 'bm_george', pauseAfter: 0.3,
      },
      transition: 'slide-left', transitionDuration: 0.38,
      layers: [
        {
          type: 'gradient', gradientType: 'linear',
          colors: ['#0d0900', '#120d00', '#090700'],
          angle: 158, vignette: true, vignetteStrength: 0.5,
        },
        // Ghost number
        {
          type: 'text', text: '02',
          x: 540, y: 390,
          fontSize: 310, fontFamily: 'Impact, Arial Black, sans-serif',
          color: '#f59e0b',
          glow: true, glowColor: '#f59e0b', glowBlur: 80,
          animation: 'pop', animDur: 0.4, startT: 0.0,
          align: 'center', opacity: 0.18,
        },
        {
          type: 'text', text: 'PAY YOURSELF FIRST',
          x: 540, y: 390,
          fontSize: 54, fontFamily: 'Impact, sans-serif',
          color: '#f59e0b',
          glow: true, glowColor: '#f59e0b', glowBlur: 20,
          animation: 'fade', animDur: 0.4, startT: 0.0,
          align: 'center',
        },
        { type: 'divider', y: 490, x1: 160, x2: 920, color: '#f59e0b', thickness: 2, animDur: 0.45 },
        // Main truth
        {
          type: 'text',
          text: 'Save before\nyou spend. Always.',
          x: 540, y: 680,
          fontSize: 80, fontFamily: 'Arial Black, sans-serif',
          color: '#f1f5f9', lineHeight: 1.2,
          animation: 'slide-up', animDur: 0.45, startT: 0.3,
          align: 'center', maxWidth: 900,
          shadow: true, shadowBlur: 15,
        },
        // The breakdown
        {
          type: 'text',
          text: 'Salary arrives → save 20% immediately.\nThen pay bills. Then live on the rest.\nThis one change builds more wealth\nthan any salary increase ever will.',
          x: 540, y: 990,
          fontSize: 44, fontFamily: 'Arial, sans-serif',
          color: 'rgba(241,245,249,0.68)', lineHeight: 1.42,
          animation: 'fade', animDur: 0.45, startT: 0.65,
          align: 'center', maxWidth: 900,
        },
        // Divider. Last line bottom ≈ 990+3*44*1.42=1177. Gap for divider at 1240 = 63px
        { type: 'divider', y: 1250, x1: 200, x2: 880, color: 'rgba(245,158,11,0.25)', thickness: 1, animDur: 0.4 },
        // Quote
        {
          type: 'text',
          text: '"Don\'t save what is left after spending.\nSpend what is left after saving."',
          x: 540, y: 1400,
          fontSize: 46, fontFamily: 'Arial, sans-serif',
          color: '#f59e0b',
          animation: 'fade', animDur: 0.4, startT: 1.3,
          align: 'center', maxWidth: 880,
        },
        {
          type: 'waveform', vizStyle: 'bars',
          x: 54, y: 1700, width: 972, height: 65,
          bars: 44, color: '#f59e0b', opacity: 0.32,
        },
        {
          type: 'progress-bar', x: 54, y: 1855, width: 972, height: 6,
          color: '#f59e0b', color2: '#d97706',
          trackColor: 'rgba(255,255,255,0.06)',
        },
      ],
    },

    // ════════════════════════════════════════════════════════
    // SCENE 4 — HABIT 3: THEY GOT COMFORTABLE BEING UNCOMFORTABLE
    // Voice: af_sky — fast, energetic, personal
    // Accent: Red #ef4444
    //
    // The one people argue about in the comments.
    // Starting a business feels embarrassing.
    // Asking for a raise feels scary.
    // Rich people did it scared anyway.
    // ════════════════════════════════════════════════════════
    {
      tts: {
        text: "Habit three. They did the scary thing anyway. Starting a business feels embarrassing. Asking for a raise feels awkward. Investing for the first time feels overwhelming. Broke people wait until they feel ready. Rich people did it scared and figured it out on the way.",
        voice: 'af_sky', pauseAfter: 0.3,
      },
      transition: 'zoom-in', transitionDuration: 0.4,
      layers: [
        {
          type: 'gradient', gradientType: 'linear',
          colors: ['#0e0404', '#160606', '#0b0303'],
          angle: 162, vignette: true, vignetteStrength: 0.52,
        },
        // Ghost number
        {
          type: 'text', text: '03',
          x: 540, y: 390,
          fontSize: 310, fontFamily: 'Impact, Arial Black, sans-serif',
          color: '#ef4444', glow: true, glowColor: '#ef4444', glowBlur: 80,
          animation: 'pop', animDur: 0.4, startT: 0.0,
          align: 'center', opacity: 0.18,
        },
        {
          type: 'text', text: 'DO IT SCARED',
          x: 540, y: 390,
          fontSize: 60, fontFamily: 'Impact, sans-serif',
          color: '#ef4444', glow: true, glowColor: '#ef4444', glowBlur: 22,
          animation: 'fade', animDur: 0.4, startT: 0.0, align: 'center',
        },
        { type: 'divider', y: 490, x1: 160, x2: 920, color: '#ef4444', thickness: 2, animDur: 0.45 },
        // Main truth
        {
          type: 'text',
          text: 'Waiting until you\'re ready\nis how you stay broke.',
          x: 540, y: 680,
          fontSize: 76, fontFamily: 'Arial Black, sans-serif',
          color: '#f1f5f9', lineHeight: 1.22,
          animation: 'slide-up', animDur: 0.45, startT: 0.3,
          align: 'center', maxWidth: 900,
          shadow: true, shadowBlur: 15,
        },
        // Comparison
        {
          type: 'text',
          text: 'Broke people wait to feel confident.\nRich people act and then feel confident.\nThe action comes first. Always.',
          x: 540, y: 980,
          fontSize: 46, fontFamily: 'Arial, sans-serif',
          color: 'rgba(241,245,249,0.68)', lineHeight: 1.4,
          animation: 'fade', animDur: 0.45, startT: 0.65,
          align: 'center', maxWidth: 900,
        },
        // Divider. 3 lines at 46 × 1.4 ≈ 193px. 980+97=1077. +63=1140
        { type: 'divider', y: 1205, x1: 200, x2: 880, color: 'rgba(239,68,68,0.25)', thickness: 1, animDur: 0.4 },
        {
          type: 'text',
          text: '"Comfort is the most expensive thing\nmost people will ever own."',
          x: 540, y: 1370,
          fontSize: 48, fontFamily: 'Arial, sans-serif',
          color: '#ef4444',
          animation: 'fade', animDur: 0.4, startT: 1.3,
          align: 'center', maxWidth: 880,
        },
        {
          type: 'waveform', vizStyle: 'bars',
          x: 54, y: 1700, width: 972, height: 65,
          bars: 44, color: '#ef4444', opacity: 0.32,
        },
        {
          type: 'progress-bar', x: 54, y: 1855, width: 972, height: 6,
          color: '#ef4444', color2: '#dc2626',
          trackColor: 'rgba(255,255,255,0.06)',
        },
      ],
    },

    // ════════════════════════════════════════════════════════
    // SCENE 5 — HABIT 4: THEY TURNED KNOWLEDGE INTO MONEY
    // Voice: am_adam — measured, serious
    // Accent: Green #22c55e
    //
    // The most underrated habit.
    // Poor people buy things. Rich people buy knowledge.
    // A $20 book that teaches you one skill
    // that earns you $5,000 more per year.
    // That is a 25,000% return.
    // ════════════════════════════════════════════════════════
    {
      tts: {
        text: "Habit four. They invested in skills before stuff. A twenty dollar book that teaches you one valuable skill can earn you thousands more per year. Poor people buy things that lose value. Rich people buy knowledge that gains value. Your biggest asset is what you know.",
        voice: 'am_adam', pauseAfter: 0.3,
      },
      transition: 'wipe-right', transitionDuration: 0.38,
      layers: [
        {
          type: 'gradient', gradientType: 'linear',
          colors: ['#020e06', '#031209', '#020b05'],
          angle: 155, vignette: true, vignetteStrength: 0.5,
        },
        // Ghost number
        {
          type: 'text', text: '04',
          x: 540, y: 390,
          fontSize: 310, fontFamily: 'Impact, Arial Black, sans-serif',
          color: '#22c55e', glow: true, glowColor: '#22c55e', glowBlur: 80,
          animation: 'pop', animDur: 0.4, startT: 0.0,
          align: 'center', opacity: 0.18,
        },
        {
          type: 'text', text: 'BUY KNOWLEDGE FIRST',
          x: 540, y: 390,
          fontSize: 50, fontFamily: 'Impact, sans-serif',
          color: '#22c55e', glow: true, glowColor: '#22c55e', glowBlur: 20,
          animation: 'fade', animDur: 0.4, startT: 0.0, align: 'center',
        },
        { type: 'divider', y: 490, x1: 160, x2: 920, color: '#22c55e', thickness: 2, animDur: 0.45 },
        // Main truth
        {
          type: 'text',
          text: 'Your brain is the highest\nreturn investment on Earth.',
          x: 540, y: 680,
          fontSize: 74, fontFamily: 'Arial Black, sans-serif',
          color: '#f1f5f9', lineHeight: 1.22,
          animation: 'slide-up', animDur: 0.45, startT: 0.3,
          align: 'center', maxWidth: 900,
          shadow: true, shadowBlur: 15,
        },
        // The math — people love specific numbers
        {
          type: 'text',
          text: 'A $20 book that teaches you one skill\nthat earns you $2,000 extra this year\nis a 10,000% return.\nNo stock can touch that.',
          x: 540, y: 1000,
          fontSize: 44, fontFamily: 'Arial, sans-serif',
          color: 'rgba(241,245,249,0.68)', lineHeight: 1.42,
          animation: 'fade', animDur: 0.45, startT: 0.65,
          align: 'center', maxWidth: 900,
        },
        // 4 lines × 44 × 1.42 ≈ 250px. 1000+125=1125. divider at 1220
        { type: 'divider', y: 1240, x1: 200, x2: 880, color: 'rgba(34,197,94,0.25)', thickness: 1, animDur: 0.4 },
        {
          type: 'text',
          text: '"Invest in yourself.\nIt pays the best interest."',
          x: 540, y: 1395,
          fontSize: 50, fontFamily: 'Arial, sans-serif',
          color: '#22c55e',
          animation: 'fade', animDur: 0.4, startT: 1.3,
          align: 'center', maxWidth: 880,
        },
        {
          type: 'waveform', vizStyle: 'bars',
          x: 54, y: 1700, width: 972, height: 65,
          bars: 44, color: '#22c55e', opacity: 0.32,
        },
        {
          type: 'progress-bar', x: 54, y: 1855, width: 972, height: 6,
          color: '#22c55e', color2: '#16a34a',
          trackColor: 'rgba(255,255,255,0.06)',
        },
      ],
    },

    // ════════════════════════════════════════════════════════
    // SCENE 6 — HABIT 5: THEY STOPPED LOOKING RICH
    // Voice: bf_emma — calm, refined, wise
    // Accent: Purple #a855f7
    //
    // The most counterintuitive. The most shareable.
    // "The people driving the nicest cars
    //  often have the least in the bank."
    // People who actually build wealth stop performing it.
    // ════════════════════════════════════════════════════════
    {
      tts: {
        text: "Habit five. They stopped trying to look rich. The people with the nicest cars and clothes are often the ones with nothing in the bank. Real wealth is invisible. It is the investment account nobody sees. It is the quiet option that nobody knows about. Looking broke while building wealth is the actual move.",
        voice: 'bf_emma', pauseAfter: 0.35,
      },
      transition: 'iris', transitionDuration: 0.45,
      layers: [
        {
          type: 'gradient', gradientType: 'linear',
          colors: ['#060310', '#0a0518', '#04020c'],
          angle: 160, vignette: true, vignetteStrength: 0.52,
        },
        // Ghost number
        {
          type: 'text', text: '05',
          x: 540, y: 390,
          fontSize: 310, fontFamily: 'Impact, Arial Black, sans-serif',
          color: '#a855f7', glow: true, glowColor: '#a855f7', glowBlur: 80,
          animation: 'pop', animDur: 0.4, startT: 0.0,
          align: 'center', opacity: 0.18,
        },
        {
          type: 'text', text: 'STOP LOOKING RICH',
          x: 540, y: 390,
          fontSize: 54, fontFamily: 'Impact, sans-serif',
          color: '#a855f7', glow: true, glowColor: '#a855f7', glowBlur: 20,
          animation: 'fade', animDur: 0.4, startT: 0.0, align: 'center',
        },
        { type: 'divider', y: 490, x1: 160, x2: 920, color: '#a855f7', thickness: 2, animDur: 0.45 },
        // Main truth
        {
          type: 'text',
          text: 'Wealth is what you\ndon\'t spend.',
          x: 540, y: 680,
          fontSize: 82, fontFamily: 'Arial Black, sans-serif',
          color: '#f1f5f9', lineHeight: 1.2,
          animation: 'slide-up', animDur: 0.45, startT: 0.3,
          align: 'center', maxWidth: 900,
          shadow: true, shadowBlur: 15,
        },
        // Body
        {
          type: 'text',
          text: 'The richest person in your city\nprobably drives a 5 year old car.\nThey are too busy building wealth\nto perform it for strangers.',
          x: 540, y: 1000,
          fontSize: 44, fontFamily: 'Arial, sans-serif',
          color: 'rgba(241,245,249,0.68)', lineHeight: 1.42,
          animation: 'fade', animDur: 0.45, startT: 0.65,
          align: 'center', maxWidth: 900,
        },
        { type: 'divider', y: 1255, x1: 200, x2: 880, color: 'rgba(168,85,247,0.25)', thickness: 1, animDur: 0.4 },
        {
          type: 'text',
          text: '"Act your wage.\nBuild in silence."',
          x: 540, y: 1410,
          fontSize: 54, fontFamily: 'Arial, sans-serif',
          color: '#a855f7',
          animation: 'fade', animDur: 0.4, startT: 1.3,
          align: 'center', maxWidth: 880,
        },
        {
          type: 'waveform', vizStyle: 'bars',
          x: 54, y: 1700, width: 972, height: 65,
          bars: 44, color: '#a855f7', opacity: 0.32,
        },
        {
          type: 'progress-bar', x: 54, y: 1855, width: 972, height: 6,
          color: '#a855f7', color2: '#9333ea',
          trackColor: 'rgba(255,255,255,0.06)',
        },
      ],
    },

    // ════════════════════════════════════════════════════════
    // SCENE 7 — CTA  (~6s)
    // Voice: af_heart — warm, personal, direct
    //
    // The close. Empowerment not guilt.
    // Three micro-CTAs proven to boost saves:
    //   1. "Save this" — highest save driver
    //   2. "Share with someone who needs it" — highest share driver
    //   3. "Follow for more" — highest follow driver
    // All three in one scene.
    // ════════════════════════════════════════════════════════
    {
      tts: {
        text: "None of these require luck. None require a perfect situation. They require a decision. Save this video. Start with habit two today — right now, this week. And follow for one wealth habit every single week.",
        voice: 'af_heart', pauseAfter: 0.5,
      },
      transition: 'fade', transitionDuration: 0.5,
      layers: [
        {
          type: 'gradient', gradientType: 'linear',
          colors: ['#07080a', '#0b0d14', '#07080c'],
          angle: 168, animated: true,
          vignette: true, vignetteStrength: 0.46,
        },
        // Hero statement — the final thought they leave with
        // y=380, 2 lines × 122 × 1.05 → bottom≈380+128=508
        {
          type: 'text',
          text: 'NONE OF THIS\nREQUIRES LUCK.',
          x: 540, y: 380,
          fontSize: 118, fontFamily: 'Impact, Arial Black, sans-serif',
          color: '#f1f5f9', lineHeight: 1.05,
          glow: true, glowColor: 'rgba(241,245,249,0.3)', glowBlur: 40,
          shadow: true, shadowBlur: 35,
          animation: 'slide-down', animDur: 0.5, startT: 0.0,
          align: 'center',
        },
        // "Just a decision." — y=605. Gap=97px ✓
        {
          type: 'text',
          text: 'Just a decision.',
          x: 540, y: 605,
          fontSize: 62, fontFamily: 'Arial Black, sans-serif',
          color: 'rgba(241,245,249,0.65)',
          animation: 'fade', animDur: 0.4, startT: 0.4,
          align: 'center',
        },
        // Divider y=700. Gap=63px ✓
        { type: 'divider', y: 700, x1: 100, x2: 980, color: 'rgba(241,245,249,0.2)', thickness: 2, animDur: 0.5 },
        // "Start with habit 2 today." y=810, fs=58 → bottom=840
        {
          type: 'text',
          text: 'Start with habit 2 today.',
          x: 540, y: 808,
          fontSize: 56, fontFamily: 'Arial Black, sans-serif',
          color: '#f1f5f9',
          animation: 'fade', animDur: 0.4, startT: 0.6,
          align: 'center', maxWidth: 900,
        },
        // "Move 20% the moment you get paid." y=900 → bottom=925
        {
          type: 'text',
          text: 'Move 20% the moment you get paid.',
          x: 540, y: 908,
          fontSize: 44, fontFamily: 'Arial, sans-serif',
          color: 'rgba(241,245,249,0.55)',
          animation: 'fade', animDur: 0.4, startT: 0.75,
          align: 'center', maxWidth: 900,
        },
        // Divider y=1000. Gap=75px ✓
        { type: 'divider', y: 1006, x1: 200, x2: 880, color: 'rgba(241,245,249,0.1)', thickness: 1, animDur: 0.4 },
        // Save CTA box — centre y=1115, h=184 → top=1023, bottom=1207
        {
          type: 'shape', shape: 'rect',
          x: 540, y: 1115, width: 860, height: 184,
          color: 'rgba(241,245,249,0.06)', borderRadius: 22,
          stroke: true, strokeColor: 'rgba(241,245,249,0.2)', strokeWidth: 2,
          enterAt: 0.9, enterDur: 0.4,
        },
        {
          type: 'text',
          text: 'Save this.\nShare it with someone who needs it.',
          x: 540, y: 1118,
          fontSize: 46, fontFamily: 'Arial Black, sans-serif',
          color: '#f1f5f9', lineHeight: 1.35,
          align: 'center', maxWidth: 800,
          animation: 'fade', animDur: 0.4, startT: 1.0,
        },
        // Follow pill — centre y=1330, h=84 → top=1288, bottom=1372
        {
          type: 'shape', shape: 'rect',
          x: 540, y: 1330, width: 680, height: 80,
          color: '#f1f5f9', borderRadius: 40,
          shadow: true, shadowColor: 'rgba(255,255,255,0.2)', shadowBlur: 25,
          enterAt: 1.5, enterDur: 0.4,
        },
        {
          type: 'text',
          text: 'FOLLOW  ·  NEW HABIT EVERY WEEK',
          x: 540, y: 1332,
          fontSize: 34, fontFamily: 'Impact, sans-serif',
          color: '#07080a',
          align: 'center',
          animation: 'fade', animDur: 0.4, startT: 1.6,
        },
        {
          type: 'waveform', vizStyle: 'wave',
          x: 54, y: 1700, width: 972, height: 65,
          color: '#f1f5f9', opacity: 0.25, lineWidth: 2,
        },
        {
          type: 'progress-bar', x: 54, y: 1855, width: 972, height: 6,
          color: '#f1f5f9', color2: 'rgba(241,245,249,0.5)',
          trackColor: 'rgba(255,255,255,0.06)',
        },
      ],
    },

  ],
};
