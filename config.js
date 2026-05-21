/**
 * WHATSAPP ACCOUNT HIJACK DOCUMENTARY CONFIG v2026
 *
 * Documentary-style short built like viral cyber expose reels.
 * Strong intro -> data reveal -> scam method -> protection CTA
 */

module.exports = {
  output: {
    title: 'WhatsApp_Hijack_Exposed_2026',
    format: 'portrait',
    fps: 30,

    // Balance quality + filesize
    crf: 24,
    preset: 'ultrafast',

    bgMusic: './assets/music/cyber_tension.mp3',
    bgMusicVol: 0.12,

    cleanup: true,

    postProcess: {
      grain: true,
      grainStrength: 0.03,
      vignette: true,
      vignetteStrength: 0.55
    }
  },

  defaults: {
    voice: 'bm_george',
    transition: 'glitch',
    transitionDuration: 0.45,
  },

  scenes: [

    // =====================================================
    // SCENE 1 — DOCUMENTARY INTRO
    // =====================================================
    {
      tts: {
        text: 'This is not a movie scam. It is happening right now. Thousands of WhatsApp accounts are stolen every single week.',
        voice: 'bm_george',
        pauseAfter: 0.25
      },

      transition: 'fade',
      transitionDuration: 0.7,

      layers: [
        {
          type: 'gradient',
          gradientType: 'radial',
          colors: ['#000000', '#071B11', '#000000'],
          animated: true,
          vignette: true,
          vignetteStrength: 0.75
        },

        {
          type: 'scanlines',
          spacing: 3,
          opacity: 0.18
        },

        // moving shapes
        {
          type: 'shape',
          shape: 'circle',
          x: 220,
          y: 350,
          width: 180,
          height: 180,
          color: 'rgba(0,255,120,0.08)',
          blur: 10,
          animation: 'float',
          speed: 0.4
        },

        {
          type: 'shape',
          shape: 'triangle',
          x: 860,
          y: 1200,
          width: 260,
          height: 260,
          color: 'rgba(0,255,120,0.05)',
          stroke: true,
          strokeColor: '#00FF88',
          strokeWidth: 3,
          animation: 'spin',
          speed: 0.2
        },

        {
          type: 'text',
          text: 'WHATSAPP\nEXPOSED',
          x: 540,
          y: 690,
          fontSize: 112,
          fontFamily: 'Impact, Arial Black, sans-serif',
          fontWeight: 'bold',
          color: '#00FF88',
          gradient: ['#00FF88', '#00CC66'],
          stroke: true,
          strokeColor: '#000000',
          strokeWidth: 8,
          shadow: true,
          shadowColor: 'rgba(0,0,0,0.9)',
          shadowBlur: 40,
          animation: 'pop',
          animDur: 0.4
        },

        {
          type: 'text',
          text: 'THE ACCOUNT HIJACK EPIDEMIC',
          x: 540,
          y: 980,
          fontSize: 48,
          color: '#E0E0E0',
          align: 'center',
          animation: 'slide-up',
          animDur: 0.5,
          startT: 1.4
        },

        {
          type: 'progress-bar',
          x: 54,
          y: 1855,
          width: 972,
          height: 8,
          color: '#00FF88',
          trackColor: 'rgba(255,255,255,0.1)'
        }
      ]
    },

    // =====================================================
    // SCENE 2 — HOW THEY GET THE CODE
    // =====================================================
    {
      tts: {
        text: 'The attack starts with a fake message. Scammers pretend to be your friend, your bank, or even WhatsApp support. Then they ask for the six digit verification code sent to your phone.',
        voice: 'bm_george',
        pauseAfter: 0.2
      },

      transition: 'split-h',

      layers: [
        {
          type: 'gradient',
          gradientType: 'linear',
          colors: ['#0A001F', '#071B11', '#000000'],
          angle: 90,
          vignette: true,
          vignetteStrength: 0.7
        },

        {
          type: 'shape',
          shape: 'square',
          x: 540,
          y: 650,
          width: 700,
          height: 700,
          color: 'rgba(0,255,120,0.04)',
          stroke: true,
          strokeColor: '#00FF88',
          strokeWidth: 3,
          animation: 'spin',
          speed: 0.08
        },

        {
          type: 'text',
          text: 'THE CODE\nTRAP',
          x: 540,
          y: 250,
          fontSize: 88,
          fontFamily: 'Impact, Arial Black, sans-serif',
          fontWeight: 'bold',
          color: '#00FFAA',
          stroke: true,
          strokeColor: '#000000',
          strokeWidth: 7,
          animation: 'slide-up',
          animDur: 0.4
        },

        // graph higher with more bottom spacing
        {
          type: 'chart',
          chartType: 'bar',
          x: 110,
          y: 470,
          width: 860,
          height: 360,
          animDur: 1.2,

          data: [
            { label: 'Fake Support', value: 73, color: '#00FF88' },
            { label: 'Friend Scam', value: 52, color: '#00D97A' },
            { label: 'Prize Links', value: 39, color: '#008F55' }
          ],

          labelFontColor: '#D0FFD9',
          valueFontColor: '#FFFFFF',
          gridColor: 'rgba(255,255,255,0.08)'
        },

        {
          type: 'text',
          text: 'One code is enough to lose the account.',
          x: 540,
          y: 980,
          fontSize: 42,
          color: '#E0E0E0',
          align: 'center',
          animation: 'fade',
          startT: 1.4
        },

        {
          type: 'waveform',
          vizStyle: 'bars',
          x: 54,
          y: 1680,
          width: 972,
          height: 70,
          color: '#00FF88',
          opacity: 0.25
        },

        {
          type: 'progress-bar',
          x: 54,
          y: 1855,
          width: 972,
          height: 8,
          color: '#00FF88',
          trackColor: 'rgba(255,255,255,0.1)'
        }
      ]
    },

    // =====================================================
    // SCENE 3 — ACCOUNT TAKEOVER
    // =====================================================
    {
      tts: {
        text: 'Once the code is entered, the victim is instantly logged out. The scammers activate two step verification and lock the real owner out completely.',
        voice: 'bm_george',
        pauseAfter: 0.2
      },

      transition: 'wipe-right',

      layers: [
        {
          type: 'gradient',
          gradientType: 'linear',
          colors: ['#000000', '#10261A', '#000000'],
          angle: 45
        },

        {
          type: 'shape',
          shape: 'triangle',
          x: 540,
          y: 760,
          width: 850,
          height: 700,
          color: 'rgba(0,255,120,0.04)',
          stroke: true,
          strokeColor: '#00FF88',
          strokeWidth: 4,
          animation: 'spin',
          speed: 0.15
        },

        {
          type: 'text',
          text: 'ACCOUNT\nLOCKOUT',
          x: 540,
          y: 280,
          fontSize: 90,
          fontFamily: 'Impact, sans-serif',
          color: '#FFFFFF',
          stroke: true,
          strokeColor: '#000000',
          strokeWidth: 7,
          animation: 'bounce-in'
        },

        {
          type: 'chart',
          chartType: 'line',
          x: 100,
          y: 500,
          width: 880,
          height: 350,
          animDur: 1.4,

          data: [
            { label: 'Code Sent', value: 15 },
            { label: 'Code Shared', value: 55 },
            { label: 'Account Taken', value: 96 },
            { label: 'Recovery Failed', value: 81 }
          ],

          lineColor: '#00FF88',
          lineWidth: 7,
          labelFontColor: '#FFFFFF',
          valueFontColor: '#00FF88',
          gridColor: 'rgba(255,255,255,0.06)'
        },

        {
          type: 'text',
          text: 'Most victims realize too late.',
          x: 540,
          y: 980,
          fontSize: 42,
          color: '#BFFFD3',
          align: 'center',
          animation: 'fade',
          startT: 1.5
        },

        {
          type: 'progress-bar',
          x: 54,
          y: 1855,
          width: 972,
          height: 8,
          color: '#00FF88',
          trackColor: 'rgba(255,255,255,0.1)'
        }
      ]
    },

    // =====================================================
    // SCENE 4 — DEFENSE + CTA
    // =====================================================
    {
      tts: {
        text: 'Enable two step verification immediately and never share your login code with anyone. Follow for more cybersecurity documentaries and online safety breakdowns.',
        voice: 'bm_george',
        pauseAfter: 0.4
      },

      transition: 'zoom-out',

      layers: [
        {
          type: 'gradient',
          gradientType: 'radial',
          colors: ['#00160B', '#000000', '#000000'],
          animated: true,
          vignette: true,
          vignetteStrength: 0.75
        },

        {
          type: 'scanlines',
          spacing: 4,
          opacity: 0.2
        },

        {
          type: 'text',
          text: 'PROTECT\nYOUR ACCOUNT',
          x: 540,
          y: 620,
          fontSize: 100,
          fontFamily: 'Impact, Arial Black, sans-serif',
          fontWeight: 'bold',
          color: '#00FF88',
          gradient: ['#00FF88', '#7CFFB2'],
          stroke: true,
          strokeColor: '#000000',
          strokeWidth: 8,
          shadow: true,
          shadowBlur: 35,
          shadowColor: 'rgba(0,0,0,0.8)',
          animation: 'pop'
        },

        {
          type: 'text',
          text: 'ENABLE 2-STEP VERIFICATION NOW',
          x: 540,
          y: 960,
          fontSize: 42,
          color: '#FFFFFF',
          align: 'center',
          animation: 'slide-up',
          startT: 0.8
        },

        {
          type: 'text',
          text: 'FOLLOW FOR MORE DIGITAL CRIME DOCUMENTARIES',
          x: 540,
          y: 1100,
          fontSize: 36,
          color: '#00FF88',
          align: 'center',
          animation: 'fade',
          startT: 1.8
        },

        {
          type: 'waveform',
          vizStyle: 'wave',
          x: 54,
          y: 1700,
          width: 972,
          height: 70,
          color: '#00FF88',
          opacity: 0.3
        },

        {
          type: 'progress-bar',
          x: 54,
          y: 1855,
          width: 972,
          height: 8,
          color: '#00FF88',
          trackColor: 'rgba(255,255,255,0.1)'
        }
      ]
    }
  ]
};