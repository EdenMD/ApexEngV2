// config.js
// Test version: 15s, 3 scenes, FB/TikTok optimized
// Theme: Consistency Beats Talent

module.exports = {
  output: {
    title: 'Consistency_Test_15s',
    format: 'portrait',
    width: 1080,
    height: 1920,
    fps: 25,
    crf: 23,
    preset: 'ultrafast',
    bgMusic: './assets/music/emotional_dark_piano.mp3',
    bgMusicVol: 0.12,

    postProcess: {
      grain: false,
      vignette: true,
      vignetteStrength: 0.3
    }
  },

  defaults: {
    transition: 'fade',
    transitionDuration: 0.2
  },

  scenes: [

    // SCENE 1 — HOOK [0-4.5s]
    {
      duration: 4.5,
      tts: {
        text: 'The people winning are not the most talented.',
        voice: 'bm_george',
        pauseAfter: 0.3
      },
      layers: [
        { type: 'background', color: '#000' },
        {
          type: 'text',
          text: 'WINNERS\nARE NOT\nALWAYS THE BEST.',
          y: 650,
          fontSize: 118,
          lineHeight: 1.0,
          color: '#ffffff',
          fontWeight: '900',
          align: 'center',
          animation: 'pop'
        },
        {
          type: 'divider',
          y: 1200,
          width: 380,
          thickness: 8,
          color: '#ef4444'
        }
      ]
    },

    // SCENE 2 — SHIFT [4.5-11s]
    {
      duration: 6.5,
      tts: {
        text: 'They are the ones who kept going when everyone else stopped.',
        voice: 'af_sarah',
        pauseAfter: 0.4
      },
      layers: [
        { type: 'gradient', colors: ['#111827', '#020617'] },
        {
          type: 'text',
          text: 'CONSISTENCY\nBEATS TALENT.',
          y: 520,
          fontSize: 110,
          lineHeight: 1.0,
          color: '#ffffff',
          fontWeight: '900',
          animation: 'slide-up'
        },
        {
          type: 'chart',
          chartType: 'line',
          x: 100,
          y: 1050,
          width: 880,
          height: 320,
          lineColor: '#22c55e',
          lineWidth: 10,
          animDur: 1.2,
          data: [
            { label: 'DAY 1', value: 5 },
            { label: 'MONTH 1', value: 15 },
            { label: 'YEAR 1', value: 60 },
            { label: 'WIN', value: 100 }
          ]
        },
        {
          type: 'text',
          text: 'BORING WORK WINS.',
          y: 1480,
          fontSize: 52,
          color: '#86efac',
          fontWeight: 'bold'
        }
      ]
    },

    // SCENE 3 — ENDING [11-15s]
    {
      duration: 4,
      tts: {
        text: 'Keep showing up. That is the secret.',
        voice: 'bm_george',
        pauseAfter: 0.5
      },
      layers: [
        { type: 'background', color: '#000' },
        {
          type: 'text',
          text: 'KEEP\nSHOWING UP.',
          y: 700,
          fontSize: 132,
          lineHeight: 1.0,
          color: '#ffffff',
          fontWeight: '900',
          animation: 'pop'
        },
        {
          type: 'text',
          text: 'THAT IS IT.',
          y: 1150,
          fontSize: 64,
          color: '#22c55e',
          fontWeight: 'bold',
          animation: 'slide-up'
        },
        {
          type: 'divider',
          y: 1350,
          width: 320,
          thickness: 8,
          color: '#22c55e'
        },
        {
          type: 'text',
          text: 'FOLLOW FOR MORE',
          y: 1550,
          fontSize: 44,
          color: '#ffffff',
          animation: 'pulse'
        }
      ]
    }
  ]
};