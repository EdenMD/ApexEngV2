/**
 * TIKTOK DATA PRIVACY DOCUMENTARY CONFIG v2026
 *
 * A gripping data-driven look into TikTok's data collection,
 * focusing on digital footprints and cybersecurity concerns.
 *
 * Usage: VIDEO_CONFIG=config.js node engine-ci.js
 */

module.exports = {
    output: {
        title:      'TikTok-Data-Privacy-Exposed',
        format:     'portrait',
        fps:        30,
        crf:        23,          // Good quality
        preset:     'medium',    // Moderate speed and quality
        bgMusic:    null,        // Placeholder for tense, low-key background music
        bgMusicVol: 0.12,
        cleanup:    true,
        postProcess: {
            grain: true,
            grainStrength: 0.04,
            vignette: true,
            vignetteStrength: 0.6
        }
    },

    defaults: {
        voice:      'bm_george',   // Authoritative, deep male voice
        transition: 'glitch',      // Dramatic, unsettling transition
        transitionDuration: 0.6,
    },

    scenes: [
        //----start of SCENE_HOOK_DIGITAL_FOOTPRINT----
// SCENE 1: HOOK - DIGITAL FOOTPRINT (5 sec)
        // Poses the unsettling question about TikTok's data collection.
        {
            tts: {
                text: 'Every tap, every secret. TikTok is logging your digital life. What if you knew exactly what they took?',
                voice: 'bm_george',
                pauseAfter: 0.2,
            },
            transition: 'zoom-in',
            transitionDuration: 0.7,
            layers: [
                {
                    type: 'gradient',
                    gradientType: 'radial',
                    colors: ['#000000', '#1A002A', '#000000'],
                    animated: true,
                    vignette: true,
                    vignetteStrength: 0.8,
                },
                {
                    type: 'scanlines',
                    spacing: 3,
                    opacity: 0.2
                },
                // First scary hook point
                {
                    type:      'text',
                    text:      'THEY\'RE WATCHING.',
                    x: 540, y: 700,
                    fontSize:  100,
                    fontFamily: 'Impact, Arial Black, sans-serif',
                    fontWeight: 'bold',
                    color:     '#FF004C',
                    gradient:  ['#FF004C', '#FF0088'],
                    stroke:    true,
                    strokeColor: '#000000',
                    strokeWidth: 8,
                    shadow:    true,
                    shadowColor: 'rgba(0,0,0,0.9)',
                    shadowBlur: 40,
                    animation: 'pop',
                    animDur:   0.4,
                    startT:    0.1,
                    exitAt:    2.0, // Exit quickly for the next point
                    exitDur:   0.3
                },
                // Second scary hook point, rotating in
                {
                    type:      'text',
                    text:      'YOUR PRIVATE DATA?',
                    x: 540, y: 850,
                    fontSize:  60,
                    color:     '#E0E0E0',
                    align:     'center',
                    maxWidth:  900,
                    animation: 'slide-up', // Slide up after first text exits
                    animDur:   0.4,
                    startT:    2.2,
                },
                {
                    type:        'progress-bar',
                    x:           54,
                    y:           1855,
                    width:       972,
                    height:      8,
                    color:       '#FF004C',
                    trackColor:  'rgba(255,255,255,0.1)',
                    showLabel:   false,
                },
            ],
        },
//----end of SCENE_HOOK_DIGITAL_FOOTPRINT----

        //----start of SCENE_CLIPBOARD_DATA_REVEAL----
// SCENE 2: CLIPBOARD DATA REVEAL (6 sec)
        // Highlighting the alarming access to clipboard data with a visual.
        {
            tts: {
                text: 'Cybersecurity reports confirm TikTok accesses your clipboard. Passwords, private messages, bank details. Anything you copy.',
                voice: 'bm_george',
                pauseAfter: 0.4,
            },
            transition: 'split-h',
            transitionDuration: 0.5,
            layers: [
                {
                    type: 'gradient',
                    gradientType: 'linear',
                    colors: ['#0A001F', '#2A004A', '#0A001F'],
                    angle: 90,
                    vignette: true,
                    vignetteStrength: 0.7,
                },
                {
                    type:      'text',
                    text:      'CLIPBOARD\nINVASION',
                    x: 540, y: 300,
                    fontSize:  85,
                    fontFamily: 'Impact, Arial Black, sans-serif',
                    fontWeight: 'bold',
                    color:     '#A020F0',
                    gradient:  ['#A020F0', '#E0BBE4'],
                    stroke:    true,
                    strokeColor: '#000000',
                    strokeWidth: 6,
                    shadow:    true,
                    shadowColor: 'rgba(0,0,0,0.7)',
                    shadowBlur: 30,
                    animation: 'slide-up',
                    animDur:   0.5,
                    startT:    0.2,
                },
                {
                    type: 'chart',
                    chartType: 'bar',
                    x: 100, y: 500,
                    width: 880, height: 400,
                    animDur: 1.2,
                    data: [
                        { label: 'Passwords', value: 95, color: '#A020F0' },
                        { label: 'Bank Details', value: 80, color: '#E0BBE4' },
                        { label: 'Private Chats', value: 70, color: '#6A057A' }
                    ],
                    labelFontColor: '#E0BBE4',
                    valueFontColor: '#FFFFFF',
                    gridColor: 'rgba(255,255,255,0.1)'
                },
                {
                    type:      'text',
                    text:      'Every copy. Every paste. EXPOSED.',
                    x: 540, y: 980,
                    fontSize:  42,
                    color:     '#E0BBE4',
                    align:     'center',
                    maxWidth:  800,
                    lineHeight: 1.2,
                    animation: 'fade',
                    animDur:   0.4,
                    startT:    1.5, // Appears after chart animation
                },
                {
                    type:     'waveform',
                    vizStyle: 'wave',
                    x: 54, y: 1700,
                    width:    972,
                    height:   70,
                    bars:     48,
                    color:    '#A020F0',
                    opacity:  0.3,
                },
                {
                    type:        'progress-bar',
                    x:           54,
                    y:           1855,
                    width:       972,
                    height:      8,
                    color:       '#A020F0',
                    trackColor:  'rgba(255,255,255,0.1)',
                    showLabel:   false,
                },
            ],
        },
//----end of SCENE_CLIPBOARD_DATA_REVEAL----

        //----start of SCENE_KEYSTROKE_AND_MORE----
// SCENE 3: KEYSTROKE PATTERNS & MORE (7 sec)
        // Expanding on other types of data collection, emphasizing surveillance.
        {
            tts: {
                text: 'It goes deeper. Keystroke patterns, every app you open, your precise location. Your phone is a hidden surveillance device.',
                voice: 'bm_george',
                pauseAfter: 0.4,
            },
            transition: 'wipe-right',
            transitionDuration: 0.5,
            layers: [
                {
                    type: 'gradient',
                    gradientType: 'linear',
                    colors: ['#000000', '#2A0A00', '#000000'],
                    angle: 45,
                    animated: false,
                    vignette: true,
                    vignetteStrength: 0.7,
                },
                {
                    type: 'shape',
                    shape: 'triangle', // Warning symbol
                    x: 540, y: 600,
                    width: 700, height: 600,
                    color: 'rgba(80, 0, 0, 0.3)',
                    rotation: Math.PI / 2, // Rotate to point up
                    stroke: true,
                    strokeColor: '#FF4500',
                    strokeWidth: 5,
                    animation: 'spin',
                    speed: 0.3,
                    enterAt: 0.0,
                },
                {
                    type:      'text',
                    text:      'KEYSTROKE\nSURVEILLANCE',
                    x: 540, y: 500,
                    fontSize:  75,
                    fontFamily: 'Impact, Arial Black, sans-serif',
                    fontWeight: 'bold',
                    color:     '#FF4500',
                    gradient:  ['#FF4500', '#FFA07A'],
                    stroke:    true,
                    strokeColor: '#000000',
                    strokeWidth: 6,
                    shadow:    true,
                    shadowColor: 'rgba(0,0,0,0.7)',
                    shadowBlur: 30,
                    animation: 'bounce-in',
                    animDur:   0.6,
                    startT:    0.1,
                },
                {
                    type:      'text',
                    text:      'EVERY KEY PRESS | APP USAGE LOGS\nPRECISE LOCATION | DEVICE FINGERPRINT',
                    x: 540, y: 800,
                    fontSize:  38,
                    color:     '#FFA07A',
                    align:     'center',
                    maxWidth:  850,
                    lineHeight: 1.3,
                    animation: 'fade',
                    animDur:   0.5,
                    startT:    0.6,
                },
                {
                    type:        'progress-bar',
                    x:           54,
                    y:           1855,
                    width:       972,
                    height:      8,
                    color:       '#FF4500',
                    trackColor:  'rgba(255,255,255,0.1)',
                    showLabel:   false,
                },
            ],
        },
//----end of SCENE_KEYSTROKE_AND_MORE----

        //----start of SCENE_CONCLUSION_CALL_TO_AWARENESS----
        // SCENE 4: CONCLUSION & CALL TO AWARENESS (6 sec)
        // Summarizing the impact and urging users to be aware.
        {
            tts: {
                text: 'Your digital footprint is more expansive than you think. Understanding what you share is the first step to protecting your online privacy.',
                voice: 'bm_george',
                pauseAfter: 0.5,
            },
            transition: 'fade',
            transitionDuration: 0.8,
            layers: [
                {
                    type: 'gradient',
                    gradientType: 'linear',
                    colors: ['#000000', '#001A0A', '#000000'],
                    angle: 135,
                    animated: true,
                    vignette: true,
                    vignetteStrength: 0.8,
                },
                {
                    type: 'scanlines',
                    spacing: 4,
                    opacity: 0.3
                },
                {
                    type:      'text',
                    text:      'PROTECT YOUR\nPRIVACY',
                    x: 540, y: 650,
                    fontSize:  95,
                    fontFamily: 'Impact, Arial Black, sans-serif',
                    fontWeight: 'bold',
                    color:     '#32CD32',
                    gradient:  ['#32CD32', '#00FF7F'],
                    stroke:    true,
                    strokeColor: '#000000',
                    strokeWidth: 7,
                    shadow:    true,
                    shadowColor: 'rgba(0,0,0,0.9)',
                    shadowBlur: 45,
                    animation: 'pop',
                    animDur:   0.6,
                    startT:    0.1,
                },
                {
                    type:      'text',
                    text:      '#DataPrivacy #TikTokExposed #DigitalRights',
                    x: 540, y: 900,
                    fontSize:  40,
                    color:     '#00FF7F',
                    align:     'center',
                    lineHeight: 1.2,
                    animation: 'fade',
                    animDur:   0.5,
                    startT:    0.7,
                },
                {
                    type:        'progress-bar',
                    x:           54,
                    y:           1855,
                    width:       972,
                    height:      8,
                    color:       '#32CD32',
                    trackColor:  'rgba(255,255,255,0.1)',
                    showLabel:   false,
                },
            ],
        },
        //----end of SCENE_CONCLUSION_CALL_TO_AWARENESS----
    ],
};