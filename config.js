// creatvate_ultrafast_noimage_config.js
// No external images required
// Fast render + clean social media quality

module.exports = {
  output: {
    title: 'CreatVate_NoImage_Commercial',
    format: 'portrait',

    width: 1080,
    height: 1920,

    fps: 26,

    crf: 25,
    preset: 'ultrafast',

    bgMusic: './assets/music/inspire_future.mp3',
    bgMusicVol: 0.13,

    postProcess: {
      grain: false,
      vignette: true,
      vignetteStrength: 0.18,
      sharpen: false,
      contrast: 1.02
    }
  },

  defaults: {
    voice: 'isabella',
    transition: 'fade',
    transitionDuration: 0.35,
  },

  scenes: [

    // =========================
    // SCENE 1
    // =========================
    {
      duration: 6,

      tts: {
        text: 'The future belongs to creators, coders, and innovators.',
        pauseAfter: 0.2
      },

      layers: [
        {
          type: 'gradient',
          colors: ['#020617', '#0f172a', '#1d4ed8']
        },

        {
          type: 'text',
          text: 'UNLOCK THE\nFUTURE OF TECH',
          x: 70,
          y: 340,
          maxWidth: 900,
          fontSize: 102,
          lineHeight: 1.0,
          color: '#ffffff',
          fontWeight: '900',
          animation: 'slide-up',
          shadow: true
        },

        {
          type: 'text',
          text: 'Professional Robotics & Coding Course',
          x: 72,
          y: 760,
          fontSize: 50,
          color: '#dbeafe',
          animation: 'fade'
        },

        {
          type: 'divider',
          y: 920,
          width: 320,
          thickness: 8,
          color: '#60a5fa'
        },

        {
          type: 'waveform',
          vizStyle: 'bars',
          x: 60,
          y: 1700,
          width: 960,
          height: 70,
          color: '#60a5fa'
        }
      ]
    },

    // =========================
    // SCENE 2
    // =========================
    {
      duration: 8,

      tts: {
        text: 'Learn robotics, coding, artificial intelligence, and automation online.',
        pauseAfter: 0.3
      },

      layers: [
        {
          type: 'background',
          color: '#071226'
        },

        {
          type: 'text',
          text: 'TOP SKILLS',
          y: 220,
          fontSize: 74,
          color: '#ffffff',
          fontWeight: 'bold',
          animation: 'slide-right'
        },

        {
          type: 'chart',
          chartType: 'bar',
          x: 100,
          y: 470,
          width: 860,
          height: 520,
          animDur: 1.0,
          data: [
            { label: 'CODING', value: 92, color: '#60a5fa' },
            { label: 'ROBOTICS', value: 85, color: '#3b82f6' },
            { label: 'AI', value: 78, color: '#2563eb' },
            { label: 'AUTOMATION', value: 72, color: '#1d4ed8' }
          ]
        },

        {
          type: 'text',
          text: 'Build Real Future Skills',
          y: 1130,
          fontSize: 48,
          color: '#ffffff'
        },

        {
          type: 'progress-bar',
          x: 80,
          y: 1810,
          width: 920,
          height: 8,
          color: '#60a5fa'
        }
      ]
    },

    // =========================
    // SCENE 3
    // =========================
    {
      duration: 7,

      tts: {
        text: 'Study directly from your phone with WhatsApp and Zoom classes.',
        pauseAfter: 0.3
      },

      layers: [
        {
          type: 'gradient',
          colors: ['#000814', '#001d3d', '#003566']
        },

        {
          type: 'text',
          text: 'ONLINE LEARNING',
          y: 240,
          fontSize: 76,
          color: '#ffffff',
          fontWeight: 'bold',
          animation: 'slide-up'
        },

        {
          type: 'chart',
          chartType: 'pie',
          cx: 540,
          cy: 820,
          width: 560,
          height: 560,
          explode: true,
          data: [
            { label: 'PRACTICAL', value: 70, color: '#60a5fa' },
            { label: 'THEORY', value: 30, color: '#1d4ed8' }
          ]
        },

        {
          type: 'text',
          text: 'Hands-On Learning',
          y: 1260,
          fontSize: 48,
          color: '#dbeafe'
        },

        {
          type: 'waveform',
          vizStyle: 'wave',
          x: 60,
          y: 1710,
          width: 960,
          height: 75,
          color: '#60a5fa'
        }
      ]
    },

    // =========================
    // SCENE 4
    // =========================
    {
      duration: 8,

      tts: {
        text: 'Join the intensive two week program for only fifteen dollars.',
        pauseAfter: 0.3
      },

      layers: [
        {
          type: 'background',
          color: '#020617'
        },

        {
          type: 'text',
          text: 'ONLY',
          y: 330,
          fontSize: 68,
          color: '#fbbf24',
          animation: 'fade'
        },

        {
          type: 'text',
          text: '$15',
          y: 500,
          fontSize: 220,
          color: '#ffffff',
          fontWeight: '900',
          animation: 'pop'
        },

        {
          type: 'divider',
          y: 860,
          width: 400,
          thickness: 10,
          color: '#60a5fa'
        },

        {
          type: 'text',
          text: '2 WEEKS INTENSIVE',
          y: 980,
          fontSize: 60,
          color: '#93c5fd',
          animation: 'slide-up'
        },

        {
          type: 'text',
          text: 'Certificate Included',
          y: 1140,
          fontSize: 50,
          color: '#ffffff'
        },

        {
          type: 'text',
          text: 'WHATSAPP + ZOOM',
          y: 1320,
          fontSize: 50,
          color: '#dbeafe'
        }
      ]
    },

    // =========================
    // SCENE 5
    // =========================
    {
      duration: 8,

      tts: {
        text: 'Register now and start your future in technology with CreatVate.',
      },

      layers: [
        {
          type: 'gradient',
          colors: ['#020617', '#0f172a']
        },

        {
          type: 'text',
          text: 'REGISTER NOW',
          y: 250,
          fontSize: 92,
          color: '#ffffff',
          fontWeight: '900',
          animation: 'slide-up'
        },

        {
          type: 'divider',
          y: 430,
          width: 360,
          thickness: 8,
          color: '#60a5fa'
        },

        {
          type: 'text',
          text: '+263 789 546 398',
          y: 760,
          fontSize: 62,
          color: '#ffffff',
          animation: 'fade'
        },

        {
          type: 'text',
          text: 'www.creatvate.org',
          y: 940,
          fontSize: 56,
          color: '#93c5fd'
        },

        {
          type: 'text',
          text: 'LIMITED ENROLLMENT',
          y: 1260,
          fontSize: 48,
          color: '#fbbf24'
        },

        {
          type: 'progress-bar',
          x: 80,
          y: 1810,
          width: 920,
          height: 8,
          color: '#60a5fa'
        }
      ]
    }
  ]
};