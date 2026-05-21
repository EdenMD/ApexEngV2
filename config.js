/**
 * WHATSAPP ACCOUNT HIJACK DOCUMENTARY CONFIG v2026
 *
 * A deep, data-driven look into social engineering traps, automated 
 * carrier verification loops, and the black market for stolen accounts.
 */
module.exports = {
    output: {
        title:      'WhatsApp-Hijack-Epidemic-Exposed',
        format:     'portrait',
        fps:        30,
        crf:        26,          
        preset:     'ultrafast',    
        bgMusic:    'low_freq_tension_drone', 
        bgMusicVol: 0.15,
        cleanup:    true,
        postProcess: {
            grain: true,
            grainStrength: 0.04,
            vignette: true,
            vignetteStrength: 0.7
        }
    },

    defaults: {
        voice:      'bm_george',   // Deep, authoritative male warning voice
        transition: 'glitch',      
        transitionDuration: 0.5,
    },

    scenes: [
        //----start of SCENE_HOOK----
        // SCENE 1: THE DISRUPTIVE HOOK (0 - 6 seconds)
        {
            tts: {
                text: 'One trick text message. That is all it takes to lock you out of your own WhatsApp forever. Your private chats, your business, your identity... stolen in sixty seconds.',
                voice: 'bm_george',
                pauseAfter: 0.1,
            },
            transition: 'zoom-in',
            transitionDuration: 0.6,
            layers: [
                {
                    type: 'gradient',
                    gradientType: 'radial',
                    colors: ['#000000', '#002B11', '#000000'],
                    animated: true,
                    vignette: true,
                    vignetteStrength: 0.85,
                },
                {
                    type: 'scanlines',
                    spacing: 3,
                    opacity: 0.2
                },
                {
                    type:      'text',
                    text:      'WHATSAPP\nHIJACK.',
                    x: 540, y: 700,
                    fontSize:  115,
                    fontFamily: 'Impact, Arial Black, sans-serif',
                    fontWeight: 'bold',
                    color:     '#00FF66',
                    gradient:  ['#00FF66', '#00E676'],
                    stroke:    true,
                    strokeColor: '#000000',
                    strokeWidth: 9,
                    shadow:    true,
                    shadowColor: 'rgba(0,0,0,0.9)',
                    shadowBlur: 35,
                    animation: 'pop',
                    animDur:   0.3,
                    startT:    0.1,
                    exitAt:    2.6,
                    exitDur:   0.3
                },
                {
                    type:      'text',
                    text:      'YOU ARE ONE SMS AWAY FROM LOSING IT ALL',
                    x: 540, y: 880,
                    fontSize:  50,
                    color:     '#E0E0E0',
                    align:     'center',
                    maxWidth:  900,
                    animation: 'slide-up',
                    animDur:   0.4,
                    startT:    2.8,
                },
                {
                    type:        'progress-bar',
                    x:           54,
                    y:           1855,
                    width:       972,
                    height:      8,
                    color:       '#00FF66',
                    trackColor:  'rgba(255,255,255,0.1)',
                    showLabel:   false,
                },
            ],
        },
        //----end of SCENE_HOOK----

        //----start of SCENE_DATA_BREAKDOWN----
        // SCENE 2: THE DATA BREAKDOWN (6 - 13 seconds)
        {
            tts: {
                text: 'Global security logs reveal a massive shift. Hackers no longer bypass complex encryption. Instead, sixty-five percent of successful takeovers use simple psychological manipulation.',
                voice: 'bm_george',
                pauseAfter: 0.2,
            },
            transition: 'split-h',
            transitionDuration: 0.5,
            layers: [
                {
                    type: 'gradient',
                    gradientType: 'linear',
                    colors: ['#0A001F', '#110022', '#0A001F'],
                    angle: 90,
                    vignette: true,
                    vignetteStrength: 0.7,
                },
                {
                    type:      'text',
                    text:      'ATTACK VECTORS',
                    x: 540, y: 300,
                    fontSize:  85,
                    fontFamily: 'Impact, Arial Black, sans-serif',
                    fontWeight: 'bold',
                    color:     '#00FFCC',
                    stroke:    true,
                    strokeColor: '#000000',
                    strokeWidth: 6,
                    shadow:    true,
                    shadowColor: 'rgba(0,0,0,0.8)',
                    shadowBlur: 25,
                    animation: 'slide-up',
                    animDur:   0.4,
                    startT:    0.1,
                },
                {
                    type: 'chart',
                    chartType: 'bar',
                    x: 100, y: 520,
                    width: 880, height: 400,
                    animDur: 1.2,
                    data: [
                        { label: 'Social Engineering', value: 65, color: '#00FF66' },
                        { label: 'Voicemail Exploits', value: 23, color: '#00FFCC' },
                        { label: 'SIM Swap Routing', value: 12, color: '#116633' }
                    ],
                    labelFontColor: '#00FFCC',
                    valueFontColor: '#FFFFFF',
                    gridColor: 'rgba(255,255,255,0.1)'
                },
                {
                    type:      'text',
                    text:      'They don’t hack the app. They hack the person.',
                    x: 540, y: 1000,
                    fontSize:  42,
                    color:     '#FFFFFF',
                    align:     'center',
                    maxWidth:  850,
                    animation: 'fade',
                    animDur:   0.5,
                    startT:    1.4,
                },
                {
                    type:        'progress-bar',
                    x:           54,
                    y:           1855,
                    width:       972,
                    height:      8,
                    color:       '#00FFCC',
                    trackColor:  'rgba(255,255,255,0.1)',
                    showLabel:   false,
                },
            ],
        },
        //----end of SCENE_DATA_BREAKDOWN----

        //----start of SCENE_ROUTING_EXPLOIT----
        // SCENE 3: THE ROUTING EXPLOIT (13 - 21 seconds)
        {
            tts: {
                text: 'The primary trap occurs at night. Scammers trigger verification codes to your number and route the authentication to your telecom voicemail while you sleep.',
                voice: 'bm_george',
                pauseAfter: 0.2,
            },
            transition: 'wipe-right',
            transitionDuration: 0.5,
            layers: [
                {
                    type: 'gradient',
                    gradientType: 'linear',
                    colors: ['#000000', '#0D1B10', '#000000'],
                    angle: 45,
                },
                {
                    type:      'text',
                    text:      'THE MIDNIGHT LOOP',
                    x: 540, y: 280,
                    fontSize:  85,
                    fontFamily: 'Impact, sans-serif',
                    color:     '#FFFFFF',
                    animation: 'pop',
                    animDur:   0.3,
                    startT:    0.1,
                },
                {
                    type: 'chart',
                    chartType: 'line',
                    x: 100, y: 480,
                    width: 880, height: 420,
                    animDur: 1.5,
                    data: [
                        { label: '8 PM', value: 10, color: '#333333' },
                        { label: '11 PM', value: 45, color: '#00FF66' },
                        { label: '2 AM', value: 92, color: '#00FFCC' },
                        { label: '5 AM', value: 87, color: '#00EE99' }
                    ],
                    labelFontColor: '#FFFFFF',
                    valueFontColor: '#00FF66',
                    gridColor: 'rgba(255,255,255,0.05)'
                },
                {
                    type:      'text',
                    text:      '92% of automated routing strikes during sleep hours.',
                    x: 540, y: 980,
                    fontSize:  38,
                    color:     '#00FFCC',
                    fontWeight: 'bold',
                    align:     'center',
                    animation: 'fade',
                    animDur:   0.4,
                    startT:    1.6,
                },
                {
                    type:        'progress-bar',
                    x:           54,
                    y:           1855,
                    width:       972,
                    height:      8,
                    color:       '#00FFCC',
                    trackColor:  'rgba(255,255,255,0.1)',
                    showLabel:   false,
                },
            ],
        },
        //----end of SCENE_ROUTING_EXPLOIT----

        //----start of SCENE_DEFENSE_CTA----
        // SCENE 4: DEFENSE & COMMENT TRIGGER (21 - 28 seconds)
        {
            tts: {
                text: 'To block them instantly, open your settings, enable Two-Step Verification, and add a custom PIN code. Do it now before you lose your account.',
                voice: 'bm_george',
                pauseAfter: 0.5,
            },
            transition: 'zoom-out',
            transitionDuration: 0.6,
            layers: [
                {
                    type: 'gradient',
                    gradientType: 'radial',
                    colors: ['#001C0E', '#000000', '#000000'],
                    animated: false,
                },
                {
                    type:      'text',
                    text:      'SECURE\nYOUR CHATS.',
                    x: 540, y: 650,
                    fontSize:  110,
                    fontFamily: 'Impact, sans-serif',
                    color:     '#00FF66',
                    stroke:    true, strokeColor: '#000000', strokeWidth: 10,
                    animation: 'pop',
                    animDur:   0.2,
                    startT:    0.1,
                    exitAt:    3.6
                },
                {
                    type:      'text',
                    text:      'Has anyone tried to send you a random code?\nComment "PIN" below and I will send the safety guide.',
                    x: 540, y: 900,
                    fontSize:  44,
                    color:     '#FFFFFF',
                    align:     'center',
                    maxWidth:  850,
                    lineHeight: 1.4,
                    animation: 'slide-up',
                    animDur:   0.5,
                    startT:    3.9,
                },
                {
                    type:     'waveform',
                    vizStyle: 'wave',
                    x: 54, y: 1700,
                    width:    972,
                    height:   80,
                    color:    '#00FF66',
                    opacity:  0.4,
                },
                {
                    type:        'progress-bar',
                    x:           54,
                    y:           1855,
                    width:       972,
                    height:      8,
                    color:       '#00FF66',
                    trackColor:  'rgba(255,255,255,0.1)',
                    showLabel:   false,
                },
            ]
        }
        //----end of SCENE_DEFENSE_CTA----
    ]
};