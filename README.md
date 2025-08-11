# Tony Stark's Workshop - Pixelated Menubar Animation 🔨⚡

Bring Tony Stark's genius to your macOS menu bar! Watch a pixelated Tony work tirelessly on his first Iron Man prototype, right from your desktop. This Electron.js app brings the iconic cave workshop scene to life with charming 8-bit style animation.

## Features

- 🤖 **Pixelated Tony Stark**: Watch Tony hammer away at his first prototype
- 🎨 **Retro 8-bit Style**: Charming pixel art brings nostalgia to your workflow
- 🌓 **Adaptive Theming**: Automatically switches between light/dark frames based on your wallpaper
- ⚡ **Adjustable Workshop Pace**: Control how fast Tony works (100ms to 1000ms)
- 🔧 **Interactive Workshop**: Right-click to control Tony's workspace
- 🚀 **Lightweight & Fun**: Minimal resource usage, maximum entertainment
- 💻 **Menu Bar Genius**: Lives quietly in your menu bar, no dock clutter
- 🦾 **Mark I Vibes**: Relive the cave workshop from the first Iron Man movie

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add Tony's workshop frames:**
   - Create your pixelated Tony Stark animation frames in the `assets/` folder
   - For **dark wallpapers**: `frame1.png` (hammer raised) and `frame2.png` (striking anvil)
   - For **light wallpapers**: `frame1-blackpng.png` and `frame2-black.png` (high contrast versions)
   - **Optimal size: 22x22 pixels** (PNG format with transparency for that crisp pixel art look)
   - The app automatically detects your wallpaper theme and uses the appropriate frames!

3. **Fire up Tony's workshop:**
   ```bash
   npm start
   ```
   
   Watch as pixelated Tony starts working on his first Iron Man suit!

## Workshop Controls

Right-click Tony's workshop to access:
- **Toggle Workshop** - Give Tony a break or get him back to work
- **Set Work Pace** - Control Tony's productivity:
  - *Slow* (1000ms) - Tony takes his time, methodical genius
  - *Medium* (500ms) - Steady progress on the Mark I
  - *Fast* (200ms) - Focused and determined 
  - *Very Fast* (100ms) - Urgent cave escape mode!
- **Refresh Frames (Theme)** - Manually reload frames if theme detection needs updating
- **Close Workshop** - End Tony's work session

## Share Tony's Workshop

Create a distributable version to share the genius:
```bash
npm run build-mac
```

This creates a shiny `.dmg` file in the `dist/` folder - perfect for sharing Tony's workshop with fellow Marvel fans!

## Workshop Development

For developing new features with auto-reload:
```bash
npm run dev
```

## Adaptive Theming 🌓

Tony's workshop automatically adapts to your Mac's appearance:

### How it works:
- **Light Mode/Wallpaper**: Uses `frame1-blackpng.png` and `frame2-black.png` for maximum visibility
- **Dark Mode/Wallpaper**: Uses `frame1.png` and `frame2.png` (original frames)
- **Real-time switching**: Changes frames instantly when you switch themes
- **Manual refresh**: Right-click → "Refresh Frames (Theme)" to force reload

### Frame Requirements:
```
assets/
├── frame1.png          ← For dark backgrounds (original)
├── frame2.png          ← For dark backgrounds (original)
├── frame1-blackpng.png ← For light backgrounds (high contrast)
└── frame2-black.png    ← For light backgrounds (high contrast)
```

## Customize the Workshop

Make it your own Iron Man experience:
- **Modify `main.js`** - Change how Tony works and moves
- **Adjust timing** - Fine-tune Tony's hammer strikes
- **Add more frames** - Create a longer animation sequence (Tony welding, sparks flying, etc.)
- **Create theme variants** - Design frames for different visibility needs
- **Workshop themes** - Customize the right-click menu with more Marvel references


### Your Pixel Art Mission:
Create two epic 22x22 pixel frames:


**"I am Iron Man"**
