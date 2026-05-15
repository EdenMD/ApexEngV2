// config.js
// FACEBOOK/TIKTOK VIRAL STYLE
// Theme: Being underestimated is power
// Conversational + cinematic + relatable
// ~48–54 seconds

module.exports = {
  output: {
    title: 'Being_Underestimated_Is_Power',
    format: 'portrait',

    width: 1080,
    height: 1920,

    fps: 26,
    crf: 25,
    preset: 'ultrafast',

    bgMusic: './assets/music/dark_emotional.mp3',
    bgMusicVol: 0.15,

    postProcess: {
      grain: false,
      vignette: true,
      vignetteStrength: 0.24
    }
  },

  defaults: {
    transition: 'fade',
    transitionDuration: 0.25
  },

  scenes: [

    // =========================================
    // SCENE 1 — HOOK
    // =========================================
    {
      tts: {
        text: 'Being underestimated is actually a superpower.',
        voice: 'bm_george',
        pauseAfter: 0.5
      },

      layers: [
        {
          type: 'background',
          color: '#000000'
        },

        {
          type: 'text',
          text: 'BEING\nUNDERESTIMATED\nIS POWER.',
          y: 650,
          fontSize: 112,
          lineHeight: 1.0,
          color: '#ffffff',
          fontWeight: '900',
          align: 'center',
          animation: 'pop'
        },

        {
          type: 'divider',
          y: 1210,
          width: 420,
          thickness: 8,
          color: '#3b82f6'
        }
      ]
    },

    // =========================================
    // SCENE 2
    // =========================================
    {
      tts: {
        text: 'When people think you are weak, average, or behind... they stop watching you.',
        voice: 'af_sarah',
        pauseAfter: 0.4
      },

      layers: [
        {
          type: 'gradient',
          colors: ['#020617', '#111827', '#000000']
        },

        {
          type: 'text',
          text: 'PEOPLE STOP\nWATCHING YOU.',
          y: 560,
          fontSize: 118,
          lineHeight: 1.0,
          color: '#ffffff',
          fontWeight: '900',
          animation: 'slide-up'
        },

        {
          type: 'chart',
          chartType: 'pie',
          cx: 540,
          cy: 1220,
          x: 540,
          y: 1220,
          width: 420,
          height: 420,
          explode: true,
          data: [
            { label: 'LOUD', value: 80, color: '#ef4444' },
            { label: 'QUIET', value: 20, color: '#3b82f6' }
          ]
        },

        {
          type: 'text',
          text: 'QUIET PEOPLE MOVE DIFFERENT.',
          y: 1540,
          fontSize: 48,
          color: '#93c5fd'
        }
      ]
    },

    // =========================================
    // SCENE 3
    // =========================================
    {
      tts: {
        text: 'No pressure. No expectations. No attention. That is dangerous.',
        voice: 'am_michael',
        pauseAfter: 0.4
      },

      layers: [
        {
          type: 'background',
          color: '#050505'
        },

        {
          type: 'text',
          text: 'NO EXPECTATIONS\nMEANS NO LIMITS.',
          y: 520,
          fontSize: 108,
          lineHeight: 1.0,
          color: '#ffffff',
          fontWeight: '900',
          animation: 'slide-left'
        },

        {
          type: 'chart',
          chartType: 'bar',
          x: 120,
          y: 980,
          width: 840,
          height: 400,
          animDur: 1.0,
          data: [
            { label: 'NOISE', value: 90, color: '#ef4444' },
            { label: 'FOCUS', value: 100, color: '#22c55e' },
            { label: 'RESULTS', value: 95, color: '#3b82f6' }
          ]
        },

        {
          type: 'text',
          text: 'FOCUS BUILDS EVERYTHING.',
          y: 1490,
          fontSize: 54,
          color: '#22c55e',
          fontWeight: 'bold'
        }
      ]
    },

    // =========================================
    // SCENE 4
    // =========================================
    {
      tts: {
        text: 'The loudest people online are not always winning. Sometimes the quiet ones are building empires.',
        voice: 'bf_isabella',
        pauseAfter: 0.5
      },

      layers: [
        {
          type: 'gradient',
          colors: ['#000000', '#172554', '#020617']
        },

        {
          type: 'text',
          text: 'QUIET PEOPLE\nARE BUILDING.',
          y: 520,
          fontSize: 116,
          lineHeight: 1.0,
          color: '#ffffff',
          fontWeight: '900',
          animation: 'pop'
        },

        {
          type: 'chart',
          chartType: 'line',
          x: 100,
          y: 980,
          width: 860,
          height: 360,
          lineColor: '#3b82f6',
          lineWidth: 8,
          animDur: 1.2,
          data: [
            { label: 'START', value: 10 },
            { label: 'LEARN', value: 35 },
            { label: 'BUILD', value: 70 },
            { label: 'WIN', value: 100 }
          ]
        },

        {
          type: 'text',
          text: 'SILENCE CAN BE STRATEGY.',
          y: 1480,
          fontSize: 50,
          color: '#93c5fd'
        }
      ]
    },

    // =========================================
    // SCENE 5
    // =========================================
    {
      tts: {
        text: 'Some people laugh at you because they cannot see your vision yet.',
        voice: 'af_heart',
        pauseAfter: 0.4
      },

      layers: [
        {
          type: 'background',
          color: '#020617'
        },

        {
          type: 'text',
          text: 'THEY SEE\nCONFUSION.\nYOU SEE VISION.',
          y: 520,
          fontSize: 104,
          lineHeight: 1.0,
          color: '#ffffff',
          fontWeight: '900',
          animation: 'slide-right'
        },

        {
          type: 'divider',
          y: 1180,
          width: 420,
          thickness: 8,
          color: '#facc15'
        },

        {
          type: 'text',
          text: 'NOT EVERYONE UNDERSTANDS EARLY.',
          y: 1380,
          fontSize: 48,
          color: '#facc15'
        }
      ]
    },

    // =========================================
    // SCENE 6 — ENDING
    // =========================================
    {
      tts: {
        text: 'Never be afraid of being underestimated. Some of the strongest people move in silence.',
        voice: 'bm_george',
        pauseAfter: 0.5
      },

      layers: [
        {
          type: 'background',
          color: '#000000'
        },

        {
          type: 'text',
          text: 'MOVE IN\nSILENCE.',
          y: 620,
          fontSize: 138,
          lineHeight: 1.0,
          color: '#ffffff',
          fontWeight: '900',
          animation: 'pop'
        },

        {
          type: 'text',
          text: 'LET RESULTS SPEAK.',
          y: 1080,
          fontSize: 82,
          color: '#22c55e',
          fontWeight: 'bold',
          animation: 'slide-up'
        },

        {
          type: 'divider',
          y: 1380,
          width: 420,
          thickness: 8,
          color: '#22c55e'
        },

        {
          type: 'text',
          text: 'FOLLOW FOR MORE.',
          y: 1550,
          fontSize: 48,
          color: '#ffffff',
          animation: 'pulse'
        },

        {
          type: 'progress-bar',
          x: 60,
          y: 1855,
          width: 960,
          height: 8,
          color: '#22c55e'
        }
      ]
    }
  ]
};