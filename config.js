/**
 * VIRAL TIKTOK CONFIG v2026
 * 
 * Optimized for maximum engagement:
 * ✓ Instant hook (1-2 sec)
 * ✓ "Wait for it" tension
 * ✓ Shocking stat reveal
 * ✓ Avatar interaction
 * ✓ Eye-catching effects
 * ✓ Fast-paced transitions
 * 
 * Usage: VIDEO_CONFIG=config.js node engine-ci.js
 */

module.exports = {
    output: {
        title:      'VIRAL_REVEAL_2026',
        format:     'portrait',
        fps:        30,
        crf:        26,          // Lower quality for speed (testing)
        preset:     'ultrafast',  // FAST for testing
        bgMusic:    null,         // Can add URL later
        bgMusicVol: 0.15,
        cleanup:    true,
    },

    defaults: {
        voice:      'af_bella',   // Bright, energetic female
        transition: 'glitch',     // Eye-catching transition
    },

    scenes: [
        // ═══════════════════════════════════════════════════════════
        // SCENE 1: INSTANT HOOK (2.5 sec)
        // "Wait for it..." — Grab attention IMMEDIATELY
        // ═══════════════════════════════════════════════════════════
        {
            tts: {
                text: 'Wait, you need to see this.',
                voice: 'af_bella',
                pauseAfter: 0.3,
            },
            transition: 'zoom-in',
            transitionDuration: 0.4,
            layers: [
                {
                    type: 'gradient',
                    gradientType: 'linear',
                    colors: ['#ff006e', '#8338ec', '#3a86ff'],
                    angle: 45,
                    animated: true,
                    vignette: true,
                    vignetteStrength: 0.6,
                },
                // Bold text overlay
                {
                    type:      'text',
                    text:      'WAIT.',
                    x: 540, y: 600,
                    fontSize:  140,
                    fontFamily: 'Impact, Arial Black, sans-serif',
                    fontWeight: 'bold',
                    color:     '#ffffff',
                    stroke:    true,
                    strokeColor: '#000000',
                    strokeWidth: 8,
                    shadow:    true,
                    shadowColor: 'rgba(0,0,0,0.8)',
                    shadowBlur: 30,
                    animation: 'pop',
                    animDur:   0.4,
                    startT:    0.1,
                },
                // Subtitle
                {
                    type:      'text',
                    text:      'You won\'t believe this...',
                    x: 540, y: 800,
                    fontSize:  36,
                    color:     '#ffff00',
                    align:     'center',
                    animation: 'fade',
                    animDur:   0.3,
                    startT:    0.5,
                },
                // Pulsing background shape for emphasis
                {
                    type:      'shape',
                    shape:     'circle',
                    x: 540, y: 960,
                    width:     500,
                    height:    500,
                    color:     'rgba(255, 0, 110, 0.15)',
                    animation: 'pulse',
                    speed:     1.2,
                    enterAt:   0.0,
                },
            ],
        },

        // ═══════════════════════════════════════════════════════════
        // SCENE 2: THE BUILD-UP (3 sec)
        // Show the avatar to increase social proof
        // ═══════════════════════════════════════════════════════════
        {
            tts: {
                text: 'Ninety-seven percent of people don\'t know this fact.',
                voice: 'af_bella',
                pauseAfter: 0.2,
            },
            transition: 'wipe-up',
            transitionDuration: 0.5,
            layers: [
                {
                    type: 'gradient',
                    gradientType: 'radial',
                    colors: ['#1a0d2e', '#16002b', '#0d0015'],
                    vignette: true,
                    vignetteStrength: 0.7,
                },
                // Big stat number
                {
                    type:      'text',
                    text:      '97%',
                    x: 540, y: 600,
                    fontSize:  180,
                    fontFamily: 'Impact, Arial Black, sans-serif',
                    fontWeight: 'bold',
                    gradient:  ['#ff006e', '#ffbe0b'],
                    animation: 'bounce-in',
                    animDur:   0.6,
                    startT:    0.1,
                    shadow:    true,
                    shadowColor: 'rgba(255,0,110,0.6)',
                    shadowBlur: 40,
                    glow:      true,
                    glowColor: '#ff006e',
                    glowBlur:  50,
                },
                // Question text
                {
                    type:      'text',
                    text:      'Don\'t know this...',
                    x: 540, y: 850,
                    fontSize:  52,
                    color:     '#ffffff',
                    align:     'center',
                    animation: 'slide-up',
                    animDur:   0.4,
                    startT:    0.4,
                },
                // Avatar with surprised expression
                {
                    type:       'avatar',
                    x: 540, y: 1400,
                    size:       200,
                    bodyColor:  '#f0f0f0',
                    accentColor: '#ff006e',
                    expression: 'surprised',
                    motion:     'bounce',
                    enterDur:   0.5,
                    name:       null,
                },
                // Particle burst
                {
                    type:         'particles',
                    particleType: 'sparks',
                    x:            540,
                    y:            600,
                    spread:       300,
                    rate:         25,
                    colors:       ['#ff006e', '#ffbe0b', '#8338ec'],
                },
            ],
        },

        // ═══════════════════════════════════════════════════════════
        // SCENE 3: THE REVEAL (4 sec)
        // Drop the shocking fact — this is the viral moment
        // ═══════════════════════════════════════════════════════════
        {
            tts: {
                text: 'The average person spends six hours on their phone every single day. That\'s a quarter of your life.',
                voice: 'af_bella',
                pauseAfter: 0.4,
            },
            transition: 'glitch',
            transitionDuration: 0.6,
            layers: [
                {
                    type: 'gradient',
                    gradientType: 'linear',
                    colors: ['#ff006e', '#fb5607', '#ffbe0b'],
                    angle: 90,
                    animated: false,
                    vignette: true,
                    vignetteStrength: 0.5,
                },
                // Background badge shape
                {
                    type:      'shape',
                    shape:     'rect',
                    x: 540, y: 500,
                    width:     900,
                    height:    400,
                    color:     'rgba(0, 0, 0, 0.5)',
                    borderRadius: 30,
                    animation: 'fade',
                    animDur:   0.3,
                    startT:    0.1,
                },
                // Main reveal text
                {
                    type:      'text',
                    text:      '6 HOURS',
                    x: 540, y: 450,
                    fontSize:  120,
                    fontFamily: 'Impact, Arial Black, sans-serif',
                    fontWeight: 'bold',
                    gradient:  ['#ffbe0b', '#ff006e'],
                    animation: 'pop',
                    animDur:   0.5,
                    startT:    0.2,
                    stroke:    true,
                    strokeColor: '#000000',
                    strokeWidth: 6,
                    shadow:    true,
                    shadowColor: 'rgba(0,0,0,0.9)',
                    shadowBlur: 35,
                },
                // Subtext
                {
                    type:      'text',
                    text:      'Per Day On Your Phone',
                    x: 540, y: 600,
                    fontSize:  44,
                    color:     '#ffffff',
                    align:     'center',
                    fontWeight: 'bold',
                    animation: 'slide-up',
                    animDur:   0.4,
                    startT:    0.5,
                },
                // Scary stat callout
                {
                    type:      'text',
                    text:      '= 1/4 of your life',
                    x: 540, y: 720,
                    fontSize:  36,
                    color:     '#ffff00',
                    align:     'center',
                    animation: 'fade',
                    animDur:   0.3,
                    startT:    0.8,
                },
                // Avatar reacting
                {
                    type:       'avatar',
                    x: 540, y: 1350,
                    size:       180,
                    bodyColor:  '#f0f0f0',
                    accentColor: '#ff006e',
                    expression: 'shocked',
                    motion:     'shake',
                    enterDur:   0.4,
                    name:       null,
                },
                // Foreground confetti burst
                {
                    type:         'particles',
                    particleType: 'confetti',
                    x:            540,
                    y:            -20,
                    spread:       800,
                    rate:         40,
                    colors:       ['#ff006e', '#ffbe0b', '#ffffff'],
                },
            ],
        },

        // ═══════════════════════════════════════════════════════════
        // SCENE 4: CALL TO ACTION (3 sec)
        // Strong close with trending hashtag vibes
        // ═══════════════════════════════════════════════════════════
        {
            tts: {
                text: 'Are you in that ninety-seven percent? Let me know in the comments.',
                voice: 'af_bella',
                pauseAfter: 0.3,
            },
            transition: 'zoom-out',
            transitionDuration: 0.5,
            layers: [
                {
                    type: 'gradient',
                    gradientType: 'linear',
                    colors: ['#3a86ff', '#8338ec', '#ff006e'],
                    angle: 135,
                    animated: true,
                    vignette: true,
                    vignetteStrength: 0.6,
                },
                // Main CTA
                {
                    type:      'text',
                    text:      'COMMENT BELOW',
                    x: 540, y: 700,
                    fontSize:  90,
                    fontFamily: 'Impact, Arial Black, sans-serif',
                    fontWeight: 'bold',
                    color:     '#ffffff',
                    animation: 'slide-up',
                    animDur:   0.4,
                    startT:    0.1,
                    stroke:    true,
                    strokeColor: '#000000',
                    strokeWidth: 5,
                },
                // Badge background
                {
                    type:      'shape',
                    shape:     'rect',
                    x: 540, y: 900,
                    width:     700,
                    height:    150,
                    color:     'rgba(255, 255, 255, 0.15)',
                    borderRadius: 20,
                    stroke:    true,
                    strokeColor: '#ffffff',
                    strokeWidth: 3,
                    animation: 'fade',
                    animDur:   0.3,
                    startT:    0.5,
                },
                // Hashtag-style text
                {
                    type:      'text',
                    text:      '#PhoneAddiction #MindBlown #FYP',
                    x: 540, y: 910,
                    fontSize:  32,
                    color:     '#00cfff',
                    align:     'center',
                    animation: 'fade',
                    animDur:   0.4,
                    startT:    0.6,
                },
                // Avatar giving thumbs up energy
                {
                    type:       'avatar',
                    x: 540, y: 1400,
                    size:       180,
                    bodyColor:  '#f0f0f0',
                    accentColor: '#00cfff',
                    expression: 'happy',
                    motion:     'bounce',
                    enterDur:   0.4,
                    name:       null,
                },
                // Waveform at bottom
                {
                    type:     'waveform',
                    vizStyle: 'bars',
                    x: 80, y: 1700,
                    width:    920,
                    height:   60,
                    bars:     36,
                    color:    '#00cfff',
                    opacity:  0.6,
                },
                // Progress bar
                {
                    type:        'progress-bar',
                    x:           54,
                    y:           1855,
                    width:       972,
                    height:      8,
                    color:       '#ff006e',
                    color2:      '#ffbe0b',
                    trackColor:  'rgba(255,255,255,0.1)',
                    showLabel:   false,
                },
            ],
        },
    ],
};
