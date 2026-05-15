// config.js
// Test version: 20s, 5 scenes, 5 voices - 4 male + 1 female (Isabella)
// Voices: am_adam, bm_george, am_michael, am_james, bf_isabella

module.exports = {
  output: {
    title: 'Consistency_20s_5Voice',
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

    // SCENE 1 — HOOK [0-3.5s] Voice 1: am_adam - Male
    {
      duration: 3.5,
      tts: {
        text: 'The people winning are not the most talented.',
        voice: 'am_adam'
      },
      layers: [
        { type: 'background', color: '#000' },
        {
          type: 'text',
          text: 'WINNERS\nARE NOT\nALWAYS THE BEST.',
          y: 640,
          fontSize: 116,
          lineHeight: 1.0,
          color: '#ffffff',
          fontWeight: '900',
          align: 'center',
          animation: 'pop'
        },
        { type: 'divider', y: 1180, width: 380, thickness: 8, color: '#ef4444' }
      ]
    },

    // SCENE 2 — PROBLEM [3.5-7.5s] Voice 2: am_adam
{
  duration: 4.0,
  tts: {
    text: 'They are the ones that never give up.',
    voice: 'am_adam'
  },
  layers: [
    { type: 'gradient', colors: ['#111827', '#020617'] },
    {
      type: 'text',
      text: 'THEY NEVER\nGIVE UP.',
      y: 560,
      fontSize: 120,
      lineHeight: 1.0,
      color: '#ffffff',
      fontWeight: '900',
      align: 'center',
      animation: 'slide-up'
    },
    {
      type: 'divider',
      y: 1150,
      width: 400,
      thickness: 8,
      color: '#22c55e'
    }
  ]
},
    // SCENE 3 — SHIFT [7.5-11s] Voice 3: bm_george - Male
    {
      duration: 3.5,
      tts: {
        text: 'Average people win by refusing to stop.',
        voice: 'bm_george'
      },
      layers: [
        { type: 'background', color: '#050505' },
        {
          type: 'text',
          text: 'CONSISTENCY\nBEATS TALENT.',
          y: 560,
          fontSize: 110,
          lineHeight: 1.0,
          color: '#ffffff',
          fontWeight: '900',
          animation: 'slide-left'
        },
        {
          type: 'text',
          text: 'SMALL STEPS DAILY.',
          y: 1050,
          fontSize: 56,
          color: '#22c55e',
          fontWeight: 'bold'
        }
      ]
    },

    // SCENE 4 — PROOF [11-15.5s] Voice 4: am_michael - Male
    {
      duration: 4.5,
      tts: {
        text: 'Consistency looks boring until it becomes unstoppable.',
        voice: 'am_michael'
      },
      layers: [
        { type: 'gradient', colors: ['#000', '#172554'] },
        {
          type: 'chart',
          chartType: 'line',
          x: 100,
          y: 500,
          width: 880,
          height: 340,
          lineColor: '#22c55e',
          lineWidth: 10,
          animDur: 1.4,
          data: [
            { label: 'DAY1', value: 5 },
            { label: 'MONTH', value: 15 },
            { label: 'YEAR', value: 60 },
            { label: 'WIN', value: 100 }
          ]
        },
        {
          type: 'text',
          text: 'IT COMPOUNDS.',
          y: 980,
          fontSize: 96,
          color: '#ffffff',
          fontWeight: '900',
          animation: 'pop'
        }
      ]
    },

    // SCENE 5 — CTA [15.5-20s] Voice 5: am_james - Male
    {
      duration: 4.5,
      tts: {
        text: 'Keep showing up. That is the secret.',
        voice: 'am_james'
      },
      layers: [
        { type: 'background', color: '#000' },
        {
          type: 'text',
          text: 'KEEP\nSHOWING UP.',
          y: 700,
          fontSize: 130,
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
        { type: 'divider', y: 1350, width: 320, thickness: 8, color: '#22c55e' },
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