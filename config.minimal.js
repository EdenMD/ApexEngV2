/**
 * config.minimal.js — Minimal starter config (fast test render)
 * 
 * Usage: VIDEO_CONFIG=config.minimal.js node engine-ci.js
 * Or in workflow inputs: config = config.minimal.js
 */

module.exports = {
    output: {
        title:   'Test Video',
        format:  'portrait',
        fps:     30,
        crf:     23,
        preset:  'fast',        // fast for testing, change to medium for final
    },
    defaults: {
        voice:      'af_heart',
        emotion:    'neutral',
        transition: 'fade',
    },
    scenes: [
        {
            tts: {
                text:    'This is a test video. The engine is working correctly.',
                voice:   'af_heart',
                emotion: 'happy',
            },
            layers: [
                {
                    type:   'gradient',
                    gradientType: 'radial',
                    colors: ['#1a0035', '#0d0020', '#000'],
                    vignette: true,
                },
                {
                    type:      'text',
                    text:      'ENGINE v2',
                    x: 540, y: 800,
                    fontSize:  100,
                    fontFamily:'Impact, Arial Black',
                    gradient:  ['#ff3b5c', '#ff8c00'],
                    animation: 'pop',
                    startT:    0.1, animDur: 0.5,
                    stroke:    true, strokeColor: '#000', strokeWidth: 5,
                },
                {
                    type:      'text',
                    text:      'Kokoro TTS + Avatar',
                    x: 540, y: 930,
                    fontSize:  44,
                    color:     'rgba(255,255,255,0.8)',
                    animation: 'fade',
                    startT:    0.4, animDur: 0.4,
                },
                {
                    type:        'avatar',
                    x: 540, y: 1450,
                    size:        250,
                    style:       'cartoon',
                    skinTone:    '#FDBCB4',
                    hairColor:   '#2c1810',
                    hairStyle:   'short',
                    eyeColor:    '#4a90d9',
                    accentColor: '#ff3b5c',
                    clothesColor:'#1a1a2e',
                    expression:  'happy',
                    name:        'Test',
                },
                {
                    type:     'waveform',
                    vizStyle: 'bars',
                    x: 80, y: 1730,
                    width:    920,
                    height:   80,
                    bars:     40,
                    color:    '#ff3b5c',
                },
            ],
        },
    ],
};
