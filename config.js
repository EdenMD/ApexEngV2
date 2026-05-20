// config.js
// ~22 seconds

module.exports = {
  output: {
    title: 'Silent_Competition',
    format: 'portrait',

    width: 1080,
    height: 1920,

    fps: 30,

    bgMusic: './assets/music/cold_dark.mp3',
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

    {
      tts: {
        text: 'Someone your age is already living the life you keep dreaming about.',
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
          text: 'SOMEONE\nYOUR AGE\nIS ALREADY\nWINNING.',
          y: 400,
          fontSize: 118,
          lineHeight: 0.93,
          color: '#ffffff',
          fontWeight: '900',
          align: 'center',
          animation: 'pop'
        },

        {
          type: 'divider',
          y: 1390,
          width: 420,
          thickness: 8,
          color: '#ef4444'
        }
      ]
    },

    {
      tts: {
        text: 'Not because they are special. Not because they are lucky.',
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
          text: 'NOT\nLUCK.\nNOT MAGIC.',
          y: 430,
          fontSize: 132,
          lineHeight: 0.92,
          color: '#ffffff',
          fontWeight: '900',
          align: 'center',
          animation: 'slide-left'
        },

        {
          type: 'text',
          text: 'THEY JUST STARTED EARLIER.',
          y: 1280,
          fontSize: 76,
          color: '#ef4444',
          fontWeight: '900',
          align: 'center',
          animation: 'pulse'
        }
      ]
    },

    {
      tts: {
        text: 'Every extra day you wait makes the gap bigger.',
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
          text: 'THE GAP\nGETS\nBIGGER.',
          y: 470,
          fontSize: 145,
          lineHeight: 0.9,
          color: '#22c55e',
          fontWeight: '900',
          align: 'center',
          animation: 'slide-up'
        },

        {
          type: 'waveform',
          vizStyle: 'bars',
          x: 70,
          y: 1680,
          width: 940,
          height: 60,
          color: '#22c55e'
        }
      ]
    },

    {
      tts: {
        text: 'One year from now you will either thank yourself or regret staying comfortable.',
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
          text: 'START NOW.\nYOUR FUTURE\nIS WATCHING.',
          y: 430,
          fontSize: 114,
          lineHeight: 0.95,
          color: '#ffffff',
          fontWeight: '900',
          align: 'center',
          animation: 'pop'
        },

        {
          type: 'text',
          text: 'DO NOT STAY STUCK.',
          y: 1420,
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