// config.js
module.exports = {
  output: {
    title: 'Test_Real_Businesses_2026',
    format: 'portrait',
    fps: 30,
    crf: 22,
    preset: 'fast', // <-- added comma here
    bgMusic: './assets/music/street_hustle_beat.mp3', // <-- added comma here
    bgMusicVol: 0.20,
    postProcess: {
      grain: false,  // Disabled for faster testing
      vignette: true,
      vignetteStrength: 0.5
    }
  },
  defaults: {
    voice: 'af_heart', // Kokoro Female Voice
    transition: 'slide', 
    transitionDuration: 0.3,
  },
  scenes: [
    // SCENE 1: THE HOOK (Now with TTS)
    { 
      tts: { 
        text: 'Stop chasing phantoms. These are the five real world businesses making millionaires',
        pauseAfter: 0.3
      },
      layers: [
        { type: 'background', color: '#111' },
        { type: 'text', text: 'STOP CHASING\nPHANTOMS', fontSize: 100, color: '#ffca28', 
          animation: 'pop', y: 700, fontWeight: 'bold', align: 'center' },
        { type: 'text', text: '5 REAL WEALTH ENGINES', fontSize: 55, color: '#ffffff', 
          animation: 'slide-up', startT: 0.5, y: 1000, fontWeight: 'bold', align: 'center' },
      ]
    },

    // SCENE 2: BUSINESS #1 - SOLAR & POWER
    { 
      tts: { 
        text: 'First: Power. The grid is failing everywhere. If you can install solar or fix batteries, you have a license to print money.',
        pauseAfter: 0.4
      },
      layers: [
        { type: 'gradient', colors: ['#1a2a6c', '#b21f1f', '#fdbb2d'] },
        { type: 'text', text: '1. POWER SOLUTIONS', y: 220, fontSize: 60, color: '#ffffff', fontWeight: 'bold' },
        { type: 'chart', chartType: 'bar', x: 80, y: 380, width: 920, height: 500, animDur: 1.0,
          data: [
            { label: 'DEMAND', value: 95, color: '#fdbb2d' },
            { label: 'SUPPLY', value: 30, color: '#ffffff' }
          ]
        },
        { type: 'text', text: 'Demand is Skyrocketing', y: 1100, fontSize: 50, color: '#ffffff' },
        { type: 'waveform', vizStyle: 'bars', x: 54, y: 1700, width: 972, height: 60, color: '#fdbb2d' }
      ]
    },

    // SCENE 3: BUSINESS #2 - FOOD PROCESSING
    { 
      tts: { 
        text: 'Two: Value-Add Farming. Don’t just sell the crop. Process it into oil, flour, or juice. That is where eighty percent of the profit lives.',
        pauseAfter: 0.5
      },
      layers: [
        { type: 'background', color: '#002b36' },
        { type: 'text', text: '2. FOOD PROCESSING', y: 220, fontSize: 60, color: '#859900', fontWeight: 'bold' },
        { type: 'chart', chartType: 'pie', cx: 540, cy: 750, x: 540, y: 750, width: 600, height: 600, animDur: 1.2, explode: true,
          data: [
            { label: 'PROCESSED', value: 80, color: '#859900' },
            { label: 'RAW', value: 20, color: '#586e75' }
          ]
        },
        { type: 'text', text: 'Wealth is in the Processing', y: 1250, fontSize: 45, color: '#ffffff' },
        { type: 'waveform', vizStyle: 'wave', x: 54, y: 1700, width: 972, height: 70, color: '#859900' }
      ]
    },

    // SCENE 4: BUSINESS #3 - LOGISTICS
    { 
      tts: { 
        text: 'Three: Smart Logistics. Moving goods is the oldest game on earth. Small delivery fleets are exploding right now.',
        pauseAfter: 0.4
      },
      layers: [
        { type: 'gradient', colors: ['#0f2027', '#203a43', '#2c5364'] },
        { type: 'text', text: '3. SMART DELIVERY', y: 220, fontSize: 60, color: '#ffffff', fontWeight: 'bold' },
        { type: 'chart', chartType: 'line', x: 80, y: 400, width: 920, height: 500, animDur: 1.5, lineColor: '#00d2ff', lineWidth: 8,
          data: [
            { label: '2024', value: 30 },
            { label: '2025', value: 55 },
            { label: '2026', value: 88 }
          ]
        },
        { type: 'text', text: 'Local Delivery Boom', y: 1100, fontSize: 40, color: '#00d2ff' },
        { type: 'progress-bar', x: 54, y: 1855, width: 972, height: 8, color: '#00d2ff' }
      ]
    },

    // SCENE 5: BUSINESS #4 & #5 - WASTE & SKILLS
    { 
      tts: { 
        text: 'Finally: Waste recycling and trade skills. Turning trash to building materials is a gold mine. And teaching trades? That is the most stable business ever.',
        pauseAfter: 0.5
      },
      layers: [
        { type: 'background', color: '#000' },
        { type: 'text', text: '4. WASTE RECYCLE\n5. TRADE SCHOOLS', y: 550, fontSize: 80, color: '#ffffff', fontWeight: 'bold', align: 'center', lineHeight: 1.2 },
        { type: 'divider', y: 750, color: '#ffca28', thickness: 8, width: 400 },
        { type: 'text', text: 'HIGH MARGIN SERVICES', y: 950, fontSize: 50, color: '#ffca28', animation: 'slide-up' },
        { type: 'waveform', vizStyle: 'bars', x: 54, y: 1700, width: 972, height: 80, color: '#ffca28' }
      ]
    },

    // SCENE 6: WRAP UP
    { 
      tts: { text: 'Which one are you starting? The money is in the streets, not the screens. Comment your plan.' },
      layers: [
        { type: 'background', color: '#111' },
        { type: 'text', text: 'GET TO\nWORK.', y: 700, fontSize: 150, color: '#ffffff', animation: 'pop', fontWeight: 'bold' },
        { type: 'text', text: 'FOLLOW FOR THE REAL DATA', y: 1100, fontSize: 50, color: '#ffca28', animation: 'pulse' },
        { type: 'progress-bar', x: 54, y: 1855, width: 972, height: 8, color: '#ffca28' }
      ]
    }
  ]
};