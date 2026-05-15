// config.js
// Theme:
// Nobody notices the hard work before the results
// Viral short format for Facebook/Reels
// Target: 18–21 seconds
// 5 scenes / 4 voices

module.exports = {
  output: {
    title: 'Nobody_Notices_The_Work',
    format: 'portrait',

    width: 1080,
    height: 1920,

    fps: 26,
    crf: 26,
    preset: 'ultrafast',

    bgMusic: './assets/music/emotional_piano_dark.mp3',
    bgMusicVol: 0.12,

    cleanup: true,

    postProcess: {
      grain: false,
      vignette: true,
      vignetteStrength: 0.24
    }
  },

  defaults: {
    transition: 'fade',
    transitionDuration: 0.18
  },

  scenes: [

    // =====================================
    // SCENE 1
    // =====================================
    {
      tts: {
        text: 'Nobody notices the hard work before the results.',
        voice: 'bm_george',
        pauseAfter: 0.12
      },

      layers: [
        {
          type: 'background',
          color: '#000000'
        },

        {
          type: 'text',
          text: 'NOBODY\nNOTICES\nTHE HARD WORK.',
          y: 700,
          fontSize: 108,
          lineHeight: 0.95,
          color: '#ffffff',
          fontWeight: '900',
          align: 'center',
          animation: 'pop',

          shadow: true,
          shadowBlur: 28,

          stroke: true,
          strokeColor: '#000000',
          strokeWidth: 6
        }
      ]
    },

    // =====================================
    // SCENE 2
    // =====================================
    {
      tts: {
        text: 'Nobody claps for the late nights. Or the failed attempts.',
        voice: 'am_michael',
        pauseAfter: 0.10
      },

      layers: [
        {
          type: 'gradient',
          colors: ['#120505', '#000000', '#1a0000']
        },

        {
          type: 'chart',
          chartType: 'bar',
          x: 120,
          y: 340,
          width: 840,
          height: 480,
          animDur: 0.7,

          data: [
            { label: 'WORK', value: 100, color: '#ef4444' },
            { label: 'PRAISE', value: 8, color: '#ffffff' }
          ]
        },

        {
          type: 'text',
          text: 'THEY ONLY SEE\nTHE FAILURES.',
          y: 1220,
          fontSize: 98,
          lineHeight: 1.0,
          color: '#ffffff',
          fontWeight: '900',
          animation: 'slide-up',

          shadow: true,
          shadowBlur: 20
        }
      ]
    },

    // =====================================
    // SCENE 3
    // =====================================
    {
      tts: {
        text: 'But every day you continue... the progress keeps stacking.',
        voice: 'bf_isabella',
        pauseAfter: 0.10
      },

      layers: [
        {
          type: 'gradient',
          colors: ['#001018', '#000000', '#001a12']
        },

        {
          type: 'chart',
          chartType: 'line',
          x: 110,
          y: 350,
          width: 860,
          height: 500,
          lineColor: '#22c55e',
          lineWidth: 9,
          animDur: 0.9,

          data: [
            { label: 'DAY1', value: 4 },
            { label: 'MONTH', value: 18 },
            { label: 'YEAR', value: 72 },
            { label: 'RESULT', value: 100 }
          ]
        },

        {
          type: 'text',
          text: 'PROGRESS\nSTACKS QUIETLY.',
          y: 1220,
          fontSize: 102,
          lineHeight: 1.0,
          color: '#ffffff',
          fontWeight: '900',
          animation: 'slide-left',

          shadow: true,
          shadowBlur: 24
        }
      ]
    },

    // =====================================
    // SCENE 4
    // =====================================
    {
      tts: {
        text: 'Then one day... people call you lucky.',
        voice: 'am_adam',
        pauseAfter: 0.15
      },

      layers: [
        {
          type: 'background',
          color: '#050505'
        },

        {
          type: 'chart',
          chartType: 'pie',
          cx: 540,
          cy: 620,
          x: 540,
          y: 620,
          width: 480,
          height: 480,
          explode: true,

          data: [
            { label: 'WORK', value: 92, color: '#22c55e' },
            { label: 'LUCK', value: 8, color: '#ef4444' }
          ]
        },

        {
          type: 'text',
          text: 'THEY CALL IT\nLUCK.',
          y: 1300,
          fontSize: 124,
          lineHeight: 0.95,
          color: '#ffffff',
          fontWeight: '900',
          animation: 'pop',

          glow: true,
          glowColor: '#22c55e',
          glowBlur: 24
        }
      ]
    },

    // =====================================
    // SCENE 5
    // =====================================
    {
      tts: {
        text: 'Keep working in silence. The results will speak for you.',
        voice: 'bm_george',
        pauseAfter: 0.25
      },

      layers: [
        {
          type: 'background',
          color: '#000000'
        },

        {
          type: 'text',
          text: 'KEEP\nWORKING.',
          y: 720,
          fontSize: 150,
          lineHeight: 0.9,
          color: '#ffffff',
          fontWeight: '900',
          animation: 'pop',

          shadow: true,
          shadowBlur: 30,

          stroke: true,
          strokeColor: '#111111',
          strokeWidth: 6
        },

        {
          type: 'text',
          text: 'THE RESULTS WILL SPEAK.',
          y: 1220,
          fontSize: 60,
          color: '#22c55e',
          fontWeight: 'bold',
          animation: 'slide-up'
        },

        {
          type: 'progress-bar',
          x: 54,
          y: 1855,
          width: 972,
          height: 8,
          color: '#22c55e'
        }
      ]
    }
  ]
};