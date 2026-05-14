// ============================================================
//  CrEATVate — Professional Online Robotics & Coding Course
//  APEX Video Engine v2.0 — Commercial Ad Config
//  Portrait 1080×1920 · TikTok / Reels / Shorts
//  No avatars · No particles · No images
// ============================================================

module.exports = {

  output: {
    title:      'CrEATVate-Robotics-Course-Ad',
    format:     'portrait',
    fps:        30,
    crf:        23,
    preset:     'ultrafast', // <-- added comma here
    bgMusic:    './assets/music/background.mp3',
    bgMusicVol: 0.18,
    cleanup:    true,
    postProcess: {
      grain:            true,
      grainStrength:    0.025,
      vignette:         true,
      vignetteStrength: 0.52,
    },
  },

  defaults: {
    voice:              'af_sky',
    transition:         'fade',
    transitionDuration: 0.5,
  },

  scenes: [

    // ── SCENE 1 — HOOK (silent 4 s) ──────────────────────────────────────
    {
      duration:           4.0,
      transition:         'zoom-in',
      transitionDuration: 0.55,
      layers: [
        { type: 'background', color: '#0a0f1e' },
        { type: 'overlay', color: 'rgba(5,10,30,0.62)' },
        // Brand pill
        {
          type: 'shape', shape: 'rect',
          x: 540, y: 210, width: 340, height: 64,
          color: '#7c3aed', borderRadius: 32,
          shadow: true, shadowColor: 'rgba(124,58,237,0.55)', shadowBlur: 28,
        },
        {
          type: 'text', text: 'CrEATVate',
          x: 540, y: 212, fontSize: 34,
          fontFamily: 'Arial Black, sans-serif',
          color: '#ffffff', align: 'center',
        },
        // Hook headline
        {
          type: 'text', text: 'WANT TO\nBUILD\nROBOTS?',
          x: 540, y: 780, fontSize: 148,
          fontFamily: 'Impact, Arial Black, sans-serif',
          gradient: ['#00cfff', '#7c3aed'],
          align: 'center', maxWidth: 980, lineHeight: 1.1,
          shadow: true, shadowBlur: 36, shadowColor: 'rgba(0,80,255,0.7)',
          animation: 'pop', animDur: 0.55, startT: 0.0,
        },
        {
          type: 'text', text: 'Code  ·  Create  ·  Innovate',
          x: 540, y: 1160, fontSize: 52,
          fontFamily: 'Arial, sans-serif',
          color: 'rgba(255,255,255,0.88)',
          align: 'center', maxWidth: 900,
          animation: 'slide-up', animDur: 0.4, startT: 0.5,
        },
        {
          type: 'waveform', vizStyle: 'bars',
          x: 54, y: 1700, width: 972, height: 60,
          bars: 48, color: '#00cfff', opacity: 0.35,
        },
        {
          type: 'progress-bar',
          x: 54, y: 1855, width: 972, height: 8,
          color: '#00cfff', color2: '#7c3aed',
          trackColor: 'rgba(255,255,255,0.12)',
        },
      ],
    },

    // ── SCENE 2 — COURSE INTRO ────────────────────────────────────────────
    {
      tts: {
        text: 'Introducing the Professional Online Robotics and Coding Course by CrEATVate — your gateway to the future of technology.',
        pauseAfter: 0.4,
      },
      transition: 'wipe-right',
      transitionDuration: 0.45,
      layers: [
        { type: 'background', color: '#030819' },
        { type: 'overlay', color: 'rgba(3,8,25,0.70)' },
        // Badge
        {
          type: 'shape', shape: 'rect',
          x: 540, y: 210, width: 640, height: 72,
          color: '#7c3aed', borderRadius: 36,
          shadow: true, shadowColor: 'rgba(124,58,237,0.5)', shadowBlur: 24,
        },
        {
          type: 'text', text: 'UNLOCK THE FUTURE OF TECH',
          x: 540, y: 212, fontSize: 32,
          fontFamily: 'Arial Black, sans-serif',
          color: '#ffffff', align: 'center',
        },
        // Course name
        {
          type: 'text', text: 'Professional Online\nRobotics & Coding',
          x: 540, y: 600, fontSize: 86,
          fontFamily: 'Impact, Arial Black, sans-serif',
          gradient: ['#ffffff', '#a5c8ff'],
          align: 'center', maxWidth: 960, lineHeight: 1.15,
          shadow: true, shadowBlur: 24,
          animation: 'slide-up', animDur: 0.5, startT: 0.0,
        },
        {
          type: 'divider', y: 860, x1: 120, x2: 960,
          color: 'rgba(0,207,255,0.45)', thickness: 2, animDur: 0.5,
        },
        // Feature list
        {
          type: 'text', text: '🤖  Robotics Fundamentals',
          x: 160, y: 940, fontSize: 50,
          fontFamily: 'Arial, sans-serif', color: '#ffffff',
          align: 'left', maxWidth: 860,
          animation: 'slide-up', startT: 0.3, animDur: 0.35,
        },
        {
          type: 'text', text: '💻  Coding from Scratch',
          x: 160, y: 1030, fontSize: 50,
          fontFamily: 'Arial, sans-serif', color: '#ffffff',
          align: 'left', maxWidth: 860,
          animation: 'slide-up', startT: 0.45, animDur: 0.35,
        },
        {
          type: 'text', text: '🏆  Certificate Included',
          x: 160, y: 1120, fontSize: 50,
          fontFamily: 'Arial, sans-serif', color: '#57cc99',
          align: 'left', maxWidth: 860,
          animation: 'slide-up', startT: 0.6, animDur: 0.35,
        },
        {
          type: 'waveform', vizStyle: 'wave',
          x: 54, y: 1700, width: 972, height: 60,
          color: '#7c3aed', opacity: 0.4, lineWidth: 3,
        },
        {
          type: 'progress-bar',
          x: 54, y: 1855, width: 972, height: 8,
          color: '#7c3aed', color2: '#00cfff',
          trackColor: 'rgba(255,255,255,0.12)',
        },
      ],
    },

    // ── SCENE 3 — ENROLLMENT DATES ────────────────────────────────────────
    {
      tts: {
        text: "Enrollment is NOW open! The registration deadline is Monday, May 11th at 11 PM. Secure your spot before it's gone.",
        pauseAfter: 0.5,
      },
      transition: 'glitch',
      transitionDuration: 0.55,
      layers: [
        { type: 'background', color: '#0a001e' },
        { type: 'overlay', color: 'rgba(10,0,30,0.74)' },
        // Badge
        {
          type: 'shape', shape: 'rect',
          x: 540, y: 210, width: 540, height: 72,
          color: '#e63946', borderRadius: 36,
          shadow: true, shadowColor: 'rgba(230,57,70,0.55)', shadowBlur: 26,
        },
        {
          type: 'text', text: 'ENROLLMENT PERIOD',
          x: 540, y: 212, fontSize: 34,
          fontFamily: 'Arial Black, sans-serif',
          color: '#ffffff', align: 'center',
        },
        // Opens today
        {
          type: 'shape', shape: 'rect',
          x: 540, y: 520, width: 940, height: 108,
          color: 'rgba(0,207,255,0.12)', borderRadius: 22,
          stroke: true, strokeColor: '#00cfff', strokeWidth: 2,
        },
        {
          type: 'text', text: '📅  Registration Opens: TODAY',
          x: 540, y: 522, fontSize: 48,
          fontFamily: 'Arial Black, sans-serif',
          color: '#00cfff', align: 'center', maxWidth: 880,
          animation: 'slide-up', startT: 0.0, animDur: 0.4,
        },
        // Deadline
        {
          type: 'shape', shape: 'rect',
          x: 540, y: 710, width: 940, height: 140,
          color: 'rgba(230,57,70,0.14)', borderRadius: 22,
          stroke: true, strokeColor: '#e63946', strokeWidth: 2,
        },
        {
          type: 'text', text: '⏰  Deadline:\nMonday, May 11 · 11:00 PM',
          x: 540, y: 712, fontSize: 54,
          fontFamily: 'Impact, sans-serif',
          color: '#ff6b6b', align: 'center', maxWidth: 880, lineHeight: 1.25,
          animation: 'pop', startT: 0.25, animDur: 0.45,
        },
        // Urgency
        {
          type: 'text', text: '🔥  LIMITED SPOTS AVAILABLE',
          x: 540, y: 960, fontSize: 50,
          fontFamily: 'Arial Black, sans-serif',
          gradient: ['#ffe600', '#ff8c00'],
          align: 'center', maxWidth: 940,
          glow: true, glowColor: '#ff8c00', glowBlur: 28,
          animation: 'fade', startT: 0.5, animDur: 0.4,
        },
        {
          type: 'text', text: "Don't miss your chance to\nchange your future.",
          x: 540, y: 1360, fontSize: 46,
          fontFamily: 'Arial, sans-serif',
          color: 'rgba(255,255,255,0.82)',
          align: 'center', maxWidth: 900, lineHeight: 1.3,
          animation: 'fade', startT: 0.65, animDur: 0.4,
        },
        {
          type: 'waveform', vizStyle: 'bars',
          x: 54, y: 1700, width: 972, height: 55,
          bars: 40, color: '#e63946', opacity: 0.35,
        },
        {
          type: 'progress-bar',
          x: 54, y: 1855, width: 972, height: 8,
          color: '#e63946', color2: '#ff8c00',
          trackColor: 'rgba(255,255,255,0.12)',
        },
      ],
    },

    // ── SCENE 4 — COURSE SCHEDULE & PRICE ────────────────────────────────
    {
      tts: {
        text: 'The course runs for two intensive weeks — May 11th to May 22nd — hosted live on WhatsApp and Zoom, for only 15 US dollars.',
        pauseAfter: 0.5,
      },
      transition: 'slide-left',
      transitionDuration: 0.42,
      layers: [
        { type: 'background', color: '#020f08' },
        { type: 'overlay', color: 'rgba(2,15,8,0.78)' },
        // Badge
        {
          type: 'shape', shape: 'rect',
          x: 540, y: 210, width: 500, height: 72,
          color: '#0a8a5c', borderRadius: 36,
        },
        {
          type: 'text', text: 'COURSE SCHEDULE',
          x: 540, y: 212, fontSize: 36,
          fontFamily: 'Arial Black, sans-serif',
          color: '#ffffff', align: 'center',
        },
        // Card BG
        {
          type: 'shape', shape: 'rect',
          x: 540, y: 870, width: 960, height: 760,
          color: 'rgba(255,255,255,0.05)', borderRadius: 32,
          stroke: true, strokeColor: 'rgba(87,204,153,0.4)', strokeWidth: 2,
        },
        // Duration
        {
          type: 'text', text: '📆  Duration',
          x: 160, y: 520, fontSize: 42,
          fontFamily: 'Arial, sans-serif', color: 'rgba(255,255,255,0.5)',
          align: 'left', animation: 'slide-up', startT: 0.0, animDur: 0.3,
        },
        {
          type: 'text', text: '2 Weeks Intensive',
          x: 160, y: 580, fontSize: 62,
          fontFamily: 'Arial Black, sans-serif', color: '#57cc99',
          align: 'left', animation: 'slide-up', startT: 0.1, animDur: 0.3,
        },
        { type: 'divider', y: 660, x1: 110, x2: 970, color: 'rgba(87,204,153,0.3)', thickness: 1, animDur: 0.4 },
        // Dates
        {
          type: 'text', text: '🗓️  Dates',
          x: 160, y: 710, fontSize: 42,
          fontFamily: 'Arial, sans-serif', color: 'rgba(255,255,255,0.5)',
          align: 'left', animation: 'slide-up', startT: 0.2, animDur: 0.3,
        },
        {
          type: 'text', text: 'May 11 – May 22, 2025',
          x: 160, y: 775, fontSize: 58,
          fontFamily: 'Arial Black, sans-serif', color: '#ffffff',
          align: 'left', animation: 'slide-up', startT: 0.3, animDur: 0.3,
        },
        { type: 'divider', y: 850, x1: 110, x2: 970, color: 'rgba(87,204,153,0.3)', thickness: 1, animDur: 0.4 },
        // Platforms
        {
          type: 'text', text: '💬  Platforms',
          x: 160, y: 905, fontSize: 42,
          fontFamily: 'Arial, sans-serif', color: 'rgba(255,255,255,0.5)',
          align: 'left', animation: 'fade', startT: 0.35, animDur: 0.3,
        },
        {
          type: 'text', text: 'WhatsApp  &  Zoom',
          x: 160, y: 965, fontSize: 58,
          fontFamily: 'Arial Black, sans-serif', color: '#ffffff',
          align: 'left', animation: 'fade', startT: 0.45, animDur: 0.3,
        },
        { type: 'divider', y: 1040, x1: 110, x2: 970, color: 'rgba(87,204,153,0.3)', thickness: 1, animDur: 0.4 },
        // Price
        {
          type: 'text', text: '💰  Investment',
          x: 160, y: 1090, fontSize: 42,
          fontFamily: 'Arial, sans-serif', color: 'rgba(255,255,255,0.5)',
          align: 'left', animation: 'fade', startT: 0.5, animDur: 0.3,
        },
        {
          type: 'text', text: 'Only $15 USD',
          x: 160, y: 1175, fontSize: 96,
          fontFamily: 'Impact, Arial Black, sans-serif',
          gradient: ['#ffe600', '#ff8c00'],
          align: 'left',
          glow: true, glowColor: '#ffe600', glowBlur: 34,
          animation: 'pop', startT: 0.6, animDur: 0.5,
        },
        {
          type: 'waveform', vizStyle: 'mirror',
          x: 54, y: 1700, width: 972, height: 60,
          bars: 36, color: '#57cc99', opacity: 0.35,
        },
        {
          type: 'progress-bar',
          x: 54, y: 1855, width: 972, height: 8,
          color: '#57cc99', color2: '#00cfff',
          trackColor: 'rgba(255,255,255,0.12)',
        },
      ],
    },

    // ── SCENE 5 — WHAT YOU'LL LEARN ───────────────────────────────────────
    {
      tts: {
        text: "In just two weeks you'll master robotics fundamentals, hands-on coding, build real projects, and earn your official CrEATVate Certificate of Completion.",
        pauseAfter: 0.45,
      },
      transition: 'dissolve',
      transitionDuration: 0.5,
      layers: [
        { type: 'background', color: '#08031c' },
        { type: 'overlay', color: 'rgba(8,3,28,0.80)' },
        // Badge
        {
          type: 'shape', shape: 'rect',
          x: 540, y: 210, width: 520, height: 72,
          color: '#7c3aed', borderRadius: 36,
        },
        {
          type: 'text', text: "WHAT YOU'LL LEARN",
          x: 540, y: 212, fontSize: 36,
          fontFamily: 'Arial Black, sans-serif',
          color: '#ffffff', align: 'center',
        },
        // Bar chart
        {
          type: 'chart', chartType: 'bar',
          x: 60, y: 340, width: 960, height: 460,
          animDur: 1.4, enterAt: 0.15,
          data: [
            { label: 'Robotics', value: 95,  color: '#7c3aed' },
            { label: 'Coding',   value: 90,  color: '#00cfff' },
            { label: 'Projects', value: 85,  color: '#57cc99' },
            { label: 'Cert',     value: 100, color: '#ffe600' },
          ],
        },
        // Bullet points
        {
          type: 'text', text: '✅  Robotics Fundamentals',
          x: 160, y: 910, fontSize: 50,
          fontFamily: 'Arial, sans-serif', color: '#ffffff',
          align: 'left', maxWidth: 860,
          animation: 'slide-up', startT: 0.4, animDur: 0.35,
        },
        {
          type: 'text', text: '✅  Hands-On Coding Skills',
          x: 160, y: 992, fontSize: 50,
          fontFamily: 'Arial, sans-serif', color: '#ffffff',
          align: 'left', maxWidth: 860,
          animation: 'slide-up', startT: 0.55, animDur: 0.35,
        },
        {
          type: 'text', text: '✅  Real-World Projects',
          x: 160, y: 1074, fontSize: 50,
          fontFamily: 'Arial, sans-serif', color: '#ffffff',
          align: 'left', maxWidth: 860,
          animation: 'slide-up', startT: 0.7, animDur: 0.35,
        },
        {
          type: 'text', text: '🏆  CrEATVate Certificate',
          x: 160, y: 1160, fontSize: 56,
          fontFamily: 'Arial Black, sans-serif',
          gradient: ['#ffe600', '#ff8c00'],
          align: 'left', maxWidth: 860,
          glow: true, glowColor: '#ffe600', glowBlur: 22,
          animation: 'pop', startT: 0.85, animDur: 0.45,
        },
        {
          type: 'waveform', vizStyle: 'bars',
          x: 54, y: 1700, width: 972, height: 55,
          bars: 44, color: '#7c3aed', opacity: 0.38,
        },
        {
          type: 'progress-bar',
          x: 54, y: 1855, width: 972, height: 8,
          color: '#7c3aed', color2: '#a855f7',
          trackColor: 'rgba(255,255,255,0.12)',
        },
      ],
    },

    // ── SCENE 6 — CTA / CONTACT ───────────────────────────────────────────
    {
      tts: {
        text: 'Ready to unlock your future? Visit creatvate dot org or call plus 263 789 546 398 to secure your spot today!',
        pauseAfter: 0.7,
      },
      transition: 'iris',
      transitionDuration: 0.6,
      postProcess: {
        vignette: true, vignetteStrength: 0.55,
        grain: true, grainStrength: 0.03,
      },
      layers: [
        { type: 'background', color: '#04081c' },
        { type: 'overlay', color: 'rgba(4,8,28,0.72)' },
        // ENROLL TODAY
        {
          type: 'text', text: 'ENROLL\nTODAY!',
          x: 540, y: 420, fontSize: 176,
          fontFamily: 'Impact, Arial Black, sans-serif',
          gradient: ['#00cfff', '#7c3aed'],
          align: 'center', lineHeight: 1.08,
          glow: true, glowColor: '#00cfff', glowBlur: 44,
          shadow: true, shadowBlur: 32,
          animation: 'pop', animDur: 0.6, startT: 0.0,
        },
        // Price pill
        {
          type: 'shape', shape: 'rect',
          x: 540, y: 720, width: 480, height: 88,
          color: '#ffe600', borderRadius: 44,
          shadow: true, shadowColor: 'rgba(255,230,0,0.5)', shadowBlur: 30,
          animation: 'pop', animDur: 0.4, startT: 0.3,
        },
        {
          type: 'text', text: 'Only $15 USD  🎉',
          x: 540, y: 722, fontSize: 46,
          fontFamily: 'Arial Black, sans-serif',
          color: '#1a0040', align: 'center',
          animation: 'pop', startT: 0.3, animDur: 0.4,
        },
        // Contact card
        {
          type: 'shape', shape: 'rect',
          x: 540, y: 1570, width: 960, height: 210,
          color: 'rgba(0,207,255,0.10)', borderRadius: 26,
          stroke: true, strokeColor: '#00cfff', strokeWidth: 2,
        },
        {
          type: 'text', text: '📞  +263 789 546 398',
          x: 540, y: 1530, fontSize: 48,
          fontFamily: 'Arial, sans-serif', color: '#00cfff',
          align: 'center',
          animation: 'slide-up', startT: 0.5, animDur: 0.35,
        },
        {
          type: 'text', text: '🌐  www.creatvate.org',
          x: 540, y: 1610, fontSize: 48,
          fontFamily: 'Arial, sans-serif', color: '#ffffff',
          align: 'center',
          animation: 'slide-up', startT: 0.65, animDur: 0.35,
        },
        {
          type: 'text', text: 'May 11 – May 22  ·  WhatsApp & Zoom',
          x: 540, y: 1700, fontSize: 38,
          fontFamily: 'Arial, sans-serif',
          color: 'rgba(255,255,255,0.60)',
          align: 'center', maxWidth: 940,
          animation: 'fade', startT: 0.75, animDur: 0.4,
        },
        {
          type: 'waveform', vizStyle: 'bars',
          x: 54, y: 1760, width: 972, height: 45,
          bars: 48, color: '#ffe600', opacity: 0.30,
        },
        {
          type: 'progress-bar',
          x: 54, y: 1855, width: 972, height: 8,
          color: '#ffe600', color2: '#00cfff',
          trackColor: 'rgba(255,255,255,0.12)',
        },
      ],
    },

  ], // end scenes

}; // end module.exports