# APEX Video Engine v2.0

> High-quality AI-powered video generator for GitHub Actions free tier.  
> Kokoro neural TTS · Talking avatar · Particles · Transitions · Charts · Mockups

---

## Quick Start

### 1. Add to your GitHub repo

```
your-repo/
├── engine-ci.js
├── config.js          ← edit this
├── package.json
├── src/
│   ├── tts-kokoro.js
│   ├── avatar.js
│   ├── particles.js
│   ├── layers.js
│   ├── transitions.js
│   ├── encoder.js
│   └── easing.js
└── .github/
    └── workflows/
        └── generate-video.yml
```

### 2. Put the workflow file in place

Copy `generate-video.yml` → `.github/workflows/generate-video.yml`

### 3. Edit `config.js`

See `DOCS.md` for the full reference. Minimal example:

```js
module.exports = {
  output: { title: 'My Video', format: 'portrait' },
  defaults: { voice: 'af_heart', transition: 'fade' },
  scenes: [
    {
      tts: { text: 'Hello world!', emotion: 'happy' },
      layers: [
        { type: 'gradient', colors: ['#1a0035', '#000'] },
        { type: 'text', text: 'HELLO', x: 540, y: 960, fontSize: 120, color: '#fff', animation: 'pop' },
        { type: 'avatar', x: 540, y: 1500, size: 240, style: 'cartoon', expression: 'happy' },
      ],
    },
  ],
};
```

### 4. Push to main or trigger manually

Go to **Actions → Generate Video → Run workflow**

Your MP4 will appear as a downloadable artifact (~14 days retention).

---

## Voices

| ID | Style |
|----|-------|
| `af_heart` | American Female — warm, expressive |
| `af_bella` | American Female — bright, clear |
| `af_sky`   | American Female — energetic, youthful |
| `am_adam`  | American Male — authoritative, deep |
| `bm_george`| British Male — deep, commanding |

Full list in `DOCS.md`.

## Emotions

`neutral` · `happy` · `excited` · `sad` · `angry` · `dramatic` · `energetic` · `calm` · `whisper`

## Transitions

`fade` · `wipe-right` · `wipe-left` · `zoom-in` · `zoom-out` · `slide-left` · `glitch` · `dissolve` · `iris` · `rotate`

## Layer Types

`background` · `gradient` · `image` · `text` · `kinetic-text` · `shape` · `avatar` · `particles` · `waveform` · `chart` · `mockup` · `progress-bar` · `countdown` · `overlay` · `scanlines` · `divider`

---

See **`DOCS.md`** for the complete reference.
