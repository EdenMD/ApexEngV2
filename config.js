// config.js
// ~21 seconds

module.exports = {
  output: {
    title: 'Silence_Is_Power',
    format: 'portrait',

    width: 1080,
    height: 1920,

    fps: 30,

    bgMusic: './assets/music/dark_minimal.mp3',
    bgMusicVol: 0.16,

    postProcess: {
      vignette: true,
      vignetteStrength: 0.23
    }
  },

  defaults: {
    transition: 'fade',
    transitionDuration: 0.18
  },

  scenes: [

    {
      tts: {
        text: 'Powerful people move differently.',
        voice: 'bm_george',
        pauseAfter: 0.15
      },

      layers: [
        {
          type: 'background',
          color: '#000000'
        },

        {
          type: 'text',
          text: 'POWERFUL\nPEOPLE\nMOVE\nDIFFERENTLY.',
          y: 400,
          fontSize: 116,
          lineHeight: 0.93,
          color: '#ffffff',
          fontWeight: '900',
          align: 'center',
          animation: 'pop'
        },

        {
          type: 'divider',
          y: 1400,
          width: 420,
          thickness: 8,
          color: '#3b82f6'
        }
      ]
    },

    {
      tts: {
        text: 'They do not talk about every goal. They do not announce every move.',
        voice: 'af_sarah',
        pauseAfter: 0.15
      },

      layers: [
        {
          type: 'gradient',
          colors: ['#000000', '#0f172a']
        },

        {
          type: 'text',
          text: 'SILENT.\nFOCUSED.\nDANGEROUS.',
          y: 410,
          fontSize: 126,
          lineHeight: 0.92,
          color: '#ffffff',
          fontWeight: '900',
          align: 'center',
          animation: 'slide-left'
        },

        {
          type: 'text',
          text: 'THEY LET RESULTS SPEAK.',
          y: 1290,
          fontSize: 74,
          color: '#3b82f6',
          fontWeight: '900',
          align: 'center',
          animation: 'pulse'
        }
      ]
    },

    {
      tts: {
        text: 'Weak people seek attention. Focused people seek progress.',
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
          text: 'ATTENTION\nDOES NOT\nBUILD SUCCESS.',
          y: 430,
          fontSize: 112,
          lineHeight: 0.95,
          color: '#ef4444',
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
          color: '#ef4444'
        }
      ]
    },

    {
      tts: {
        text: 'Move in silence until your results become impossible to ignore.',
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
          text: 'MOVE IN\nSILENCE.',
          y: 470,
          fontSize: 146,
          lineHeight: 0.92,
          color: '#ffffff',
          fontWeight: '900',
          align: 'center',
          animation: 'pop'
        },

        {
          type: 'text',
          text: 'LET THEM NOTICE LATER.',
          y: 1400,
          fontSize: 70,
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