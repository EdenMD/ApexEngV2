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
        preset:     'ultrafast',    // Moderate speed and quality
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
                text: 'Think your data is safe? TikTok harvests more than you imagine. Uncover your hidden digital footprint.',
                voice: 'bm_george',
                pauseAfter: 0.5,
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
                {
                    type:      'text',
                    text:      'YOUR DIGITAL\nSHADOW',
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
                    animDur:   0.6,
                    startT:    0.1,
                },
                {
                    type:      'text',
                    text:      'TikTok\'s Secret Harvest Exposed',
                    x: 540, y: 950,
                    fontSize:  48,
                    color:     '#E0E0E0',
                    align:     'center',
                    maxWidth:  900,
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
                text: 'Public cybersecurity reports confirm TikTok accesses your clipboard. Every copy, every paste, potentially seen.',
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
                    text:      'CLIPBOARD\nACCESS',
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
                        { label: 'Text', value: 95, color: '#A020F0' },
                        { label: 'Links', value: 80, color: '#E0BBE4' },
                        { label: 'Passwords', value: 60, color: '#6A057A' } // Conceptual, higher represents higher risk
                    ],
                    // A conceptual "percentage" of privacy risk or commonality
                    // This is for visual representation, not actual data figures
                    labelFontColor: '#E0BBE4',
                    valueFontColor: '#FFFFFF',
                    gridColor: 'rgba(255,255,255,0.1)'
                },
                {
                    type:      'text',
                    text:      'Passcodes. Sensitive info. Links.',
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
        // Expanding on other types of data collection.
        {
            tts: {
                text: 'Beyond the clipboard, TikTok may analyze keystroke patterns, app usage, network activity, and device identifiers.',
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
                    shape: 'triangle',
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
                    text:      'KEYSTROKE\nPATTERNS',
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
                    text:      'App Usage | Network Activity\nDevice Identifiers | Location Data',
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