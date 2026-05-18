// config.js
// Theme: One day it will be the last time
// Style: Bright emotional cinematic reel
// Length: ~18–20 seconds

module.exports = {
  output: {
    title: 'Love_Them_While_You_Can',
    format: 'portrait',

    width: 1080,
    height: 1920,

    fps: 26,
    crf: 26,
    preset: 'ultrafast',

    bgMusic: './assets/music/emotional_soft.mp3',
    bgMusicVol: 0.12,

    cleanup: true,

    postProcess: {
      grain: false,
      vignette: true,
      vignetteStrength: 0.18
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
        text: 'One day.',
        voice: 'bm_george',
        pauseAfter: 0.35
      },

      layers: [
        {
          type: 'gradient',
          colors: ['#1e3a8a', '#312e81', '#0f172a'],
          animated: true
        },

        {
          type: 'text',
          text: 'ONE DAY...',
          y: 900,
          fontSize: 165,
          color: '#ffffff',
          fontWeight: '900',
          align: 'center',
          animation: 'fade',

          shadow: true,
          shadowBlur: 30
        }
      ]
    },

    // =====================================
    // SCENE 2
    // =====================================
    {
      tts: {
        text: 'It will be.',
        voice: 'am_michael',
        pauseAfter: 0.25
      },

      layers: [
        {
          type: 'gradient',
          colors: ['#0f766e', '#164e63', '#082f49']
        },

        {
          type: 'text',
          text: 'IT WILL BE...',
          y: 900,
          fontSize: 145,
          color: '#ffffff',
          fontWeight: '900',
          align: 'center',
          animation: 'slide-up',

          glow: true,
          glowColor: '#67e8f9',
          glowBlur: 22
        }
      ]
    },

    // =====================================
    // SCENE 3
    // =====================================
    {
      tts: {
        text: 'The last time.',
        voice: 'bf_isabella',
        pauseAfter: 0.45
      },

      layers: [
        {
          type: 'gradient',
          colors: ['#7c3aed', '#4338ca', '#1e1b4b']
        },

        {
          type: 'text',
          text: 'THE LAST\nTIME.',
          y: 820,
          fontSize: 155,
          lineHeight: 0.92,
          color: '#ffffff',
          fontWeight: '900',
          align: 'center',
          animation: 'pop',

          shadow: true,
          shadowBlur: 28
        }
      ]
    },

    // =====================================
    // SCENE 4
    // =====================================
    {
      tts: {
        text: 'Before it becomes a memory.',
        voice: 'am_adam',
        pauseAfter: 0.35
      },

      layers: [
        {
          type: 'gradient',
          colors: ['#0f172a', '#1e293b', '#334155']
        },

        {
          type: 'text',
          text: 'BEFORE IT\nBECOMES\nA MEMORY.',
          y: 760,
          fontSize: 118,
          lineHeight: 0.95,
          color: '#ffffff',
          fontWeight: '900',
          align: 'center',
          animation: 'slide-left',

          shadow: true,
          shadowBlur: 24
        },

        {
          type: 'divider',
          y: 1450,
          x1: 240,
          x2: 840,
          color: 'rgba(255,255,255,0.5)',
          thickness: 6
        }
      ]
    },

    // =====================================
    // SCENE 5
    // =====================================
    {
      tts: {
        text: 'Love them while you can.',
        voice: 'bf_isabella',
        pauseAfter: 0.65
      },

      layers: [
        {
          type: 'gradient',
          colors: ['#2563eb', '#7c3aed', '#1d4ed8'],
          animated: true
        },

        {
          type: 'text',
          text: 'LOVE THEM\nWHILE YOU CAN.',
          y: 760,
          fontSize: 122,
          lineHeight: 0.94,
          color: '#ffffff',
          fontWeight: '900',
          align: 'center',
          animation: 'fade',

          glow: true,
          glowColor: '#c4b5fd',
          glowBlur: 26
        },

        {
          type: 'text',
          text: 'TIME MOVES QUIETLY.',
          y: 1370,
          fontSize: 54,
          color: '#dbeafe',
          fontWeight: 'bold',
          animation: 'slide-up'
        },

        {
          type: 'progress-bar',
          x: 54,
          y: 1855,
          width: 972,
          height: 8,
          color: '#c4b5fd',
          color2: '#60a5fa'
        }
      ]
    }
  ]
};