/**
 * QUIZ VIDEO CONFIG v2026
 * 
 * Engaging multiple-choice quiz video format:
 * ✓ Clear questions and options
 * ✓ Countdown timer for tension
 * ✓ Immediate answer reveal
 * ✓ Avatar reactions
 * ✓ Dynamic transitions and effects
 * 
 * Usage: VIDEO_CONFIG=config.js node engine-ci.js
 */

module.exports = {
    output: {
        title:      'QUIZ_CHALLENGE_2026',
        format:     'portrait',
        fps:        30,
        crf:        23,          // Good quality for final output
        preset:     'medium',    // Moderate speed and quality
        bgMusic:    null,        // Add a URL or local path for background music
        bgMusicVol: 0.18,
        cleanup:    true,
    },

    defaults: {
        voice:      'af_sky',    // Youthful, upbeat female
        transition: 'slide-left', // Smooth transition
        transitionDuration: 0.4,
    },

    scenes: [
        //----start of SCENE_INTRO_HOOK----
        // SCENE 1: INTRO HOOK (3 sec)
        // "Test Your Knowledge!"
        {
            tts: {
                text: 'Think you\'re smart? Let\'s test your knowledge with this quick quiz!',
                voice: 'af_sky',
                pauseAfter: 0.2,
            },
            transition: 'zoom-in',
            transitionDuration: 0.5,
            layers: [
                {
                    type: 'gradient',
                    gradientType: 'linear',
                    colors: ['#0A2A5B', '#1E427E', '#3D6FB0'],
                    angle: 270,
                    animated: true,
                    vignette: true,
                    vignetteStrength: 0.5,
                },
                {
                    type:      'text',
                    text:      'QUIZ TIME!',
                    x: 540, y: 700,
                    fontSize:  120,
                    fontFamily: 'Impact, Arial Black, sans-serif',
                    fontWeight: 'bold',
                    color:     '#FFFFFF',
                    gradient:  ['#00FFFF', '#007BFF'],
                    stroke:    true,
                    strokeColor: '#000000',
                    strokeWidth: 8,
                    shadow:    true,
                    shadowColor: 'rgba(0,0,0,0.7)',
                    shadowBlur: 30,
                    animation: 'pop',
                    animDur:   0.5,
                    startT:    0.1,
                },
                {
                    type:      'countdown',
                    from:      3,
                    x: 540, y: 1100,
                    fontSize:  180,
                    color:     '#FFFFFF',
                    glow:      true,
                    glowColor: '#00BFFF',
                    glowBlur:  40,
                },
                {
                    type:       'avatar',
                    x: 540, y: 1500,
                    size:       200,
                    accentColor: '#00BFFF',
                    expression: 'excited',
                    motion:     'bounce',
                    enterDur:   0.5,
                    name:       null,
                },
            ],
        },
        //----end of SCENE_INTRO_HOOK----

        //----start of SCENE_QUESTION_1----
        // SCENE 2: QUESTION 1 (6 sec)
        // Question, options, and a timer
        {
            tts: {
                text: 'Question one: What is the capital city of France?',
                voice: 'af_sky',
                pauseAfter: 0.1,
            },
            transition: 'glitch',
            transitionDuration: 0.6,
            layers: [
                {
                    type: 'gradient',
                    gradientType: 'linear',
                    colors: ['#2E0854', '#4B0082', '#6A1A9C'],
                    angle: 225,
                    animated: false,
                    vignette: true,
                    vignetteStrength: 0.6,
                },
                // Question text
                {
                    type:      'text',
                    text:      'What is the capital of France?',
                    x: 540, y: 300,
                    fontSize:  60,
                    fontFamily: 'Arial, sans-serif',
                    color:     '#FFFFFF',
                    align:     'center',
                    maxWidth:  900,
                    animation: 'slide-up',
                    animDur:   0.4,
                    startT:    0.1,
                },
                // Options
                {
                    type:      'text',
                    text:      'A) Berlin\nB) Madrid\nC) Paris\nD) Rome',
                    x: 540, y: 700,
                    fontSize:  48,
                    color:     '#E0E0E0',
                    align:     'center',
                    lineHeight: 1.6,
                    animation: 'fade',
                    animDur:   0.5,
                    startT:    0.5,
                },
                // Progress bar as a timer
                {
                    type:       'progress-bar',
                    x: 100, y: 1050,
                    width:      880,
                    height:     15,
                    color:      '#FFD700',
                    color2:     '#FF4500',
                    trackColor: 'rgba(255,255,255,0.2)',
                    progress:   'countdown', // This is a custom property for timer effect
                    duration:   5.0, // This scene is 6 seconds, giving 5 seconds for the quiz
                    animation: 'fade',
                    animDur:   0.3,
                    startT:    0.8,
                },
                {
                    type:       'avatar',
                    x: 540, y: 1500,
                    size:       180,
                    accentColor: '#A020F0',
                    expression: 'thinking',
                    motion:     'float',
                    floatRange: 30,
                    enterDur:   0.6,
                    name:       null,
                },
            ],
        },
        //----end of SCENE_QUESTION_1----

        //----start of SCENE_REVEAL_1----
        // SCENE 3: REVEAL 1 (3.5 sec)
        // Correct answer and explanation
        {
            tts: {
                text: 'The correct answer is C, Paris! Known for its iconic Eiffel Tower and rich history.',
                voice: 'af_sky',
                pauseAfter: 0.2,
            },
            transition: 'split-v',
            transitionDuration: 0.4,
            layers: [
                {
                    type: 'gradient',
                    gradientType: 'radial',
                    colors: ['#008000', '#006400', '#004C00'],
                    vignette: true,
                    vignetteStrength: 0.5,
                },
                {
                    type:      'text',
                    text:      'Correct Answer:',
                    x: 540, y: 300,
                    fontSize:  50,
                    color:     '#E0E0E0',
                    align:     'center',
                    animation: 'fade',
                    animDur:   0.3,
                    startT:    0.1,
                },
                {
                    type:      'text',
                    text:      'C) PARIS!',
                    x: 540, y: 450,
                    fontSize:  100,
                    fontFamily: 'Impact, Arial Black, sans-serif',
                    color:     '#FFFFFF',
                    gradient:  ['#32CD32', '#00FF00'],
                    stroke:    true,
                    strokeColor: '#000000',
                    strokeWidth: 6,
                    shadow:    true,
                    shadowColor: 'rgba(0,0,0,0.7)',
                    shadowBlur: 30,
                    animation: 'bounce-in',
                    animDur:   0.6,
                    startT:    0.3,
                },
                {
                    type:      'text',
                    text:      'Home to the Eiffel Tower and renowned art.',
                    x: 540, y: 650,
                    fontSize:  38,
                    color:     '#FFFFFF',
                    align:     'center',
                    maxWidth:  900,
                    animation: 'slide-up',
                    animDur:   0.4,
                    startT:    0.7,
                },
                {
                    type:         'particles',
                    particleType: 'confetti',
                    x:            540,
                    y:            -20,
                    spread:       800,
                    rate:         30,
                    colors:       ['#32CD32', '#FFD700', '#FFFFFF'],
                },
                {
                    type:       'avatar',
                    x: 540, y: 1500,
                    size:       200,
                    accentColor: '#00FF00',
                    expression: 'happy',
                    motion:     'float',
                    floatRange: 30,
                    enterDur:   0.5,
                    name:       null,
                },
            ],
        },
        //----end of SCENE_REVEAL_1----

        //----start of SCENE_QUESTION_2----
        // SCENE 4: QUESTION 2 (6 sec)
        // Another question
        {
            tts: {
                text: 'Next question: Which planet is known as the Red Planet?',
                voice: 'af_sky',
                pauseAfter: 0.1,
            },
            transition: 'slide-right',
            transitionDuration: 0.4,
            layers: [
                {
                    type: 'gradient',
                    gradientType: 'radial',
                    colors: ['#4B0082', '#2E0854', '#1F0033'],
                    vignette: true,
                    vignetteStrength: 0.6,
                },
                // Question text
                {
                    type:      'text',
                    text:      'Which planet is known as the Red Planet?',
                    x: 540, y: 300,
                    fontSize:  60,
                    fontFamily: 'Arial, sans-serif',
                    color:     '#FFFFFF',
                    align:     'center',
                    maxWidth:  900,
                    animation: 'slide-up',
                    animDur:   0.4,
                    startT:    0.1,
                },
                // Options
                {
                    type:      'text',
                    text:      'A) Jupiter\nB) Mars\nC) Venus\nD) Saturn',
                    x: 540, y: 700,
                    fontSize:  48,
                    color:     '#E0E0E0',
                    align:     'center',
                    lineHeight: 1.6,
                    animation: 'fade',
                    animDur:   0.5,
                    startT:    0.5,
                },
                // Progress bar as a timer
                {
                    type:       'progress-bar',
                    x: 100, y: 1050,
                    width:      880,
                    height:     15,
                    color:      '#FFD700',
                    color2:     '#FF4500',
                    trackColor: 'rgba(255,255,255,0.2)',
                    progress:   'countdown',
                    duration:   5.0,
                    animation: 'fade',
                    animDur:   0.3,
                    startT:    0.8,
                },
                {
                    type:       'avatar',
                    x: 540, y: 1500,
                    size:       180,
                    accentColor: '#A020F0',
                    expression: 'thinking',
                    motion:     'float',
                    floatRange: 30,
                    enterDur:   0.6,
                    name:       null,
                },
            ],
        },
        //----end of SCENE_QUESTION_2----

        //----start of SCENE_REVEAL_2----
        // SCENE 5: REVEAL 2 (3.5 sec)
        {
            tts: {
                text: 'It\'s Mars! Its distinctive reddish hue comes from iron oxide on its surface.',
                voice: 'af_sky',
                pauseAfter: 0.2,
            },
            transition: 'split-h',
            transitionDuration: 0.4,
            layers: [
                {
                    type: 'gradient',
                    gradientType: 'linear',
                    colors: ['#CC0000', '#8B0000', '#550000'],
                    angle: 90,
                    vignette: true,
                    vignetteStrength: 0.5,
                },
                {
                    type:      'text',
                    text:      'Correct Answer:',
                    x: 540, y: 300,
                    fontSize:  50,
                    color:     '#E0E0E0',
                    align:     'center',
                    animation: 'fade',
                    animDur:   0.3,
                    startT:    0.1,
                },
                {
                    type:      'text',
                    text:      'B) MARS!',
                    x: 540, y: 450,
                    fontSize:  100,
                    fontFamily: 'Impact, Arial Black, sans-serif',
                    color:     '#FFFFFF',
                    gradient:  ['#FF4500', '#FF0000'],
                    stroke:    true,
                    strokeColor: '#000000',
                    strokeWidth: 6,
                    shadow:    true,
                    shadowColor: 'rgba(0,0,0,0.7)',
                    shadowBlur: 30,
                    animation: 'bounce-in',
                    animDur:   0.6,
                    startT:    0.3,
                },
                {
                    type:      'text',
                    text:      'The "Red Planet" due to iron oxide on its surface.',
                    x: 540, y: 650,
                    fontSize:  38,
                    color:     '#FFFFFF',
                    align:     'center',
                    maxWidth:  900,
                    animation: 'slide-up',
                    animDur:   0.4,
                    startT:    0.7,
                },
                {
                    type:         'particles',
                    particleType: 'sparks',
                    x:            540,
                    y:            400,
                    spread:       300,
                    rate:         25,
                    colors:       ['#FF4500', '#FFD700', '#FFFFFF'],
                },
                {
                    type:       'avatar',
                    x: 540, y: 1500,
                    size:       200,
                    accentColor: '#FF4500',
                    expression: 'happy',
                    motion:     'float',
                    floatRange: 30,
                    enterDur:   0.5,
                    name:       null,
                },
            ],
        },
        //----end of SCENE_REVEAL_2----

        //----start of SCENE_OUTRO_CTA----
        // SCENE 6: OUTRO / CALL TO ACTION (3 sec)
        {
            tts: {
                text: 'How many did you get right? Let me know in the comments below!',
                voice: 'af_sky',
                pauseAfter: 0.3,
            },
            transition: 'zoom-out',
            transitionDuration: 0.5,
            layers: [
                {
                    type: 'gradient',
                    gradientType: 'linear',
                    colors: ['#0A2A5B', '#8338EC', '#FF006E'],
                    angle: 135,
                    animated: true,
                    vignette: true,
                    vignetteStrength: 0.6,
                },
                {
                    type:      'text',
                    text:      'How many did you get?',
                    x: 540, y: 700,
                    fontSize:  70,
                    fontFamily: 'Impact, Arial Black, sans-serif',
                    fontWeight: 'bold',
                    color:     '#FFFFFF',
                    gradient:  ['#00FFFF', '#FF006E'],
                    animation: 'slide-up',
                    animDur:   0.4,
                    startT:    0.1,
                    stroke:    true,
                    strokeColor: '#000000',
                    strokeWidth: 5,
                },
                {
                    type:      'text',
                    text:      'Comment Below!',
                    x: 540, y: 900,
                    fontSize:  50,
                    color:     '#FFD700',
                    align:     'center',
                    animation: 'fade',
                    animDur:   0.3,
                    startT:    0.5,
                },
                {
                    type:       'avatar',
                    x: 540, y: 1400,
                    size:       180,
                    bodyColor:  '#f0f0f0',
                    accentColor: '#00BFFF',
                    expression: 'happy',
                    motion:     'bounce',
                    enterDur:   0.4,
                    name:       null,
                },
                {
                    type:     'waveform',
                    vizStyle: 'bars',
                    x: 80, y: 1700,
                    width:    920,
                    height:   60,
                    bars:     36,
                    color:    '#00BFFF',
                    opacity:  0.6,
                },
                {
                    type:        'progress-bar',
                    x:           54,
                    y:           1855,
                    width:       972,
                    height:      8,
                    color:       '#FF006E',
                    color2:      '#FFD700',
                    trackColor:  'rgba(255,255,255,0.1)',
                    showLabel:   false,
                },
            ],
        },
        //----end of SCENE_OUTRO_CTA----
    ],
};
