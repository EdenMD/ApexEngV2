// config.js
// ~22–24 seconds

module.exports = {
  output: {
    title: 'Pressure_Creates_People',
    format: 'portrait',

    width: 1080,
    height: 1920,

    fps: 30,

    bgMusic: './assets/music/heavy_tension.mp3',
    bgMusicVol: 0.17,

    postProcess: {
      vignette: true,
      vignetteStrength: 0.24
    }
  },

  defaults: {
    transition: 'fade',
    transitionDuration: 0.18
  },

  scenes: [

    // =========================
    // HOOK (MALE)
    // =========================
    {
      tts: {
        text: 'Pressure changes people.',
        voice: 'bm_george',
        pauseAfter: 0.15
      },

      layers: [
        { type: 'background', color: '#000000' },

        {
          type: 'text',
          text: 'PRESSURE\nCHANGES\nPEOPLE.',
          y: 500,
          fontSize: 138,
          lineHeight: 0.92,
          color: '#ffffff',
          fontWeight: '900',
          align: 'center',
          animation: 'pop'
        },

        {
          type: 'divider',
          y: 1360,
          width: 420,
          thickness: 8,
          color: '#ef4444'
        }
      ]
    },

    // =========================
    // REALITY (MALE)
    // =========================
    {
      tts: {
        text: 'Some people break. Others discover who they really are.',
        voice: 'am_michael',
        pauseAfter: 0.15
      },

      layers: [
        { type: 'gradient', colors: ['#000000', '#111827'] },

        {
          type: 'text',
          text: 'SOME BREAK.\nSOME TRANSFORM.',
          y: 360,
          fontSize: 122,
          lineHeight: 0.9,
          color: '#ffffff',
          fontWeight: '900',
          align: 'center',
          animation: 'slide-left'
        },

        {
          type: 'text',
          text: 'PAIN REVEALS CHARACTER.',
          y: 1380,
          fontSize: 70,
          color: '#ef4444',
          fontWeight: '900',
          align: 'center',
          animation: 'pulse'
        }
      ]
    },

    // =========================
    // TRANSFORMATION (MALE)
    // =========================
    {
      tts: {
        text: 'Every strong person was once forced to survive something difficult.',
        voice: 'bm_george',
        pauseAfter: 0.15
      },

      layers: [
        { type: 'background', color: '#050505' },

        {
          type: 'text',
          text: 'STRENGTH\nIS BUILT\nUNDER\nPRESSURE.',
          y: 390,
          fontSize: 122,
          lineHeight: 0.92,
          color: '#22c55e',
          fontWeight: '900',
          align: 'center',
          animation: 'slide-up'
        },

        {
          type: 'waveform',
          vizStyle: 'bars',
          x: 70,
          y: 1690,
          width: 940,
          height: 60,
          color: '#22c55e'
        }
      ]
    },

    // =========================
    // ENDING (FEMALE — ISABELLA + CTA TTS)
    // =========================
    {
      tts: {
        text: 'Let pressure shape you, not break you. Follow for more.',
        voice: 'bf_isabella',
        pauseAfter: 0.25
      },

      layers: [
        { type: 'background', color: '#000000' },

        {
          type: 'text',
          text: 'LET IT\nSHAPE YOU.',
          y: 520,
          fontSize: 150,
          lineHeight: 0.92,
          color: '#ffffff',
          fontWeight: '900',
          align: 'center',
          animation: 'pop'
        },

        {
          type: 'text',
          text: 'NOT BREAK YOU.',
          y: 1350,
          fontSize: 86,
          color: '#22c55e',
          fontWeight: '900',
          align: 'center',
          animation: 'slide-up'
        },

        {
          type: 'progress-bar',
          x: 70,
          y: 1850,
          width: 940,
          height: 8,
          color: '#22c55e'
        }
      ]
    }
  ]
};