// config.js
// ~23 seconds
// Theme:
// Pressure creates strength

module.exports = {
  output: {
    title: 'Pressure_Creates_Strength',
    format: 'portrait',

    width: 1080,
    height: 1920,

    fps: 30,

    bgMusic: './assets/music/dark_pressure.mp3',
    bgMusicVol: 0.17,

    postProcess: {
      vignette: true,
      vignetteStrength: 0.25
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
        text: 'Pressure does not break everyone.',
        voice: 'bm_george',
        pauseAfter: 0.15
      },

      layers: [
        { type: 'background', color: '#000000' },

        {
          type: 'text',
          text: 'PRESSURE\nDOES NOT\nBREAK ALL.',
          y: 500,
          fontSize: 130,
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
        text: 'Some people collapse. Others adapt. Others become stronger.',
        voice: 'am_michael',
        pauseAfter: 0.15
      },

      layers: [
        { type: 'gradient', colors: ['#000000', '#111827'] },

        {
          type: 'text',
          text: 'COLLAPSE.\nADAPT.\nEVOLVE.',
          y: 450,
          fontSize: 132,
          lineHeight: 0.92,
          color: '#ffffff',
          fontWeight: '900',
          align: 'center',
          animation: 'slide-left'
        },

        {
          type: 'text',
          text: 'PAIN CREATES DIFFERENCE.',
          y: 1320,
          fontSize: 78,
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
        text: 'Pressure forces you to remove weakness.',
        voice: 'bm_george',
        pauseAfter: 0.15
      },

      layers: [
        { type: 'background', color: '#050505' },

        {
          type: 'text',
          text: 'WEAKNESS\nGETS REMOVED.',
          y: 520,
          fontSize: 138,
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
    // ENDING (FEMALE — ISABELLA ONLY HERE)
    // =========================
    {
      tts: {
        text: 'Let pressure shape you, not break you.',
        voice: 'bf_isabella',
        pauseAfter: 0.25
      },

      layers: [
        { type: 'background', color: '#000000' },

        {
          type: 'text',
          text: 'LET IT\nSHAPE YOU.',
          y: 500,
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
          y: 1400,
          fontSize: 84,
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