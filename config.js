// config.js
// Theme:
// Comfort is destroying your future.
// Built for retention + emotional escalation
// ~22 seconds

module.exports = {
  output: {
    title: 'Comfort_Is_Destroying_You',
    format: 'portrait',

    width: 1080,
    height: 1920,

    fps: 30,

    bgMusic: './assets/music/dark_cinematic.mp3',
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

    // =====================================
    // SCENE 1 — HOOK
    // =====================================

    {
      tts: {
        text: 'Comfort is slowly destroying your future.',
        voice: 'bm_george',
        pauseAfter: 0.2
      },

      layers: [
        {
          type: 'background',
          color: '#000000'
        },

        {
          type: 'text',
          text: 'COMFORT\nIS DESTROYING\nYOUR FUTURE.',
          y: 470,
          fontSize: 122,
          lineHeight: 0.95,
          color: '#ffffff',
          fontWeight: '900',
          align: 'center',
          animation: 'pop'
        },

        {
          type: 'divider',
          y: 1340,
          width: 420,
          thickness: 8,
          color: '#ef4444'
        },

        {
          type: 'text',
          text: 'SLOWLY.',
          y: 1480,
          fontSize: 64,
          color: '#ef4444',
          fontWeight: '900',
          animation: 'pulse'
        }
      ]
    },

    // =====================================
    // SCENE 2 — REALIZATION
    // =====================================

    {
      tts: {
        text: 'The bed feels safe. The excuses feel safe. Staying average feels safe.',
        voice: 'af_sarah',
        pauseAfter: 0.15
      },

      layers: [
        {
          type: 'gradient',
          colors: ['#000000', '#111827']
        },

        {
          type: 'text',
          text: 'SAFE.\nSAFE.\nSAFE.',
          y: 400,
          fontSize: 148,
          lineHeight: 0.9,
          color: '#ffffff',
          fontWeight: '900',
          align: 'center',
          animation: 'slide-up'
        },

        {
          type: 'text',
          text: 'BUT NOTHING CHANGES.',
          y: 1180,
          fontSize: 86,
          color: '#ef4444',
          fontWeight: '900',
          align: 'center',
          animation: 'slide-left'
        },

        {
          type: 'waveform',
          vizStyle: 'bars',
          x: 70,
          y: 1710,
          width: 940,
          height: 60,
          color: '#ef4444'
        }
      ]
    },

    // =====================================
    // SCENE 3 — SHIFT
    // =====================================

    {
      tts: {
        text: 'Growth starts the moment your comfort ends.',
        voice: 'am_michael',
        pauseAfter: 0.15
      },

      layers: [
        {
          type: 'background',
          color: '#050505'
        },

        {
          type: 'text',
          text: 'GROWTH\nSTARTS\nWHEN COMFORT\nENDS.',
          y: 420,
          fontSize: 118,
          lineHeight: 0.95,
          color: '#22c55e',
          fontWeight: '900',
          align: 'center',
          animation: 'slide-up'
        },

        {
          type: 'divider',
          y: 1410,
          width: 420,
          thickness: 8,
          color: '#22c55e'
        }
      ]
    },

    // =====================================
    // SCENE 4 — ENDING
    // =====================================

    {
      tts: {
        text: 'The life you want is hidden behind the things you keep avoiding.',
        voice: 'bf_isabella',
        pauseAfter: 0.25
      },

      layers: [
        {
          type: 'background',
          color: '#000000'
        },

        {
          type: 'text',
          text: 'YOUR FUTURE\nIS HIDING\nBEHIND\nDISCOMFORT.',
          y: 420,
          fontSize: 112,
          lineHeight: 0.95,
          color: '#ffffff',
          fontWeight: '900',
          align: 'center',
          animation: 'pop'
        },

        {
          type: 'text',
          text: 'STOP AVOIDING IT.',
          y: 1370,
          fontSize: 82,
          color: '#22c55e',
          fontWeight: '900',
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