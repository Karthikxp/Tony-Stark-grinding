# Tony Stark's Workshop - Pixelated Menubar Animation 🔨⚡

Bring Tony Stark's genius to your macOS menu bar! Watch a pixelated Tony work tirelessly on his first Iron Man prototype, right from your desktop. This Electron.js app brings the iconic cave workshop scene to life with charming 8-bit style animation.

## Features

- 🤖 **Pixelated Tony Stark**: Watch Tony hammer away at his first prototype
- 🎨 **Retro 8-bit Style**: Charming pixel art brings nostalgia to your workflow
- 🌓 **Smart Adaptive Theming**: Automatically switches between light/dark frames for optimal visibility
- 🔧 **Manual Theme Override**: Force light or dark frames when auto-detection needs adjustment
- ⚡ **Dynamic Animation Speed**: Animation speed is driven by your Mac's CPU load
- 🛠️ **Interactive Workshop**: Right-click to control Tony's workspace
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
- **Theme Override** - Manual control over frame selection:
  - *Auto (System Detection)* - Let the app automatically detect your menubar theme
  - *Force Light Menubar* - Use black frames for light menubars/wallpapers
  - *Force Dark Menubar* - Use original frames for dark menubars/wallpapers  
- **Refresh Frames (Theme)** - Manually reload frames if theme detection needs updating
- **Debug Theme Info** - View current theme detection status and settings
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

Tony's workshop intelligently adapts to your Mac's menubar appearance for optimal visibility:

### Automatic Detection
- **Light Menubar/Wallpaper**: Uses `frame1-blackpng.png` and `frame2-black.png` for maximum contrast
- **Dark Menubar/Wallpaper**: Uses `frame1.png` and `frame2.png` (original frames)
- **Real-time switching**: Automatically detects theme changes and updates frames
- **Smart fallbacks**: Creates simple backup frames if image files are missing

### Manual Override Controls
Sometimes automatic detection needs help! Use the **Theme Override** menu:

- **Auto (System Detection)** - Default automatic detection
- **Force Light Menubar** - Use black frames (perfect for light backgrounds)
- **Force Dark Menubar** - Use original frames (perfect for dark backgrounds)

### Troubleshooting Theme Issues
1. **App shows wrong frames?** → Right-click → "Theme Override" → Choose the correct option
2. **Need to test detection?** → Right-click → "Debug Theme Info" to see current settings
3. **Frames not updating?** → Right-click → "Refresh Frames (Theme)" to reload

### Frame Requirements:
```
assets/
├── frame1.png          ← For dark backgrounds (original Tony frames)
├── frame2.png          ← For dark backgrounds (original Tony frames)  
├── frame1-blackpng.png ← For light backgrounds (high contrast black Tony)
└── frame2-black.png    ← For light backgrounds (high contrast black Tony)
```

> **Pro Tip**: If Tony is hard to see on your menubar, use "Force Light Menubar" to switch to high-contrast black frames!

## Recent Updates 🆕

### v1.2 - CPU-Driven Animation Speed
- ✅ **Dynamic Animation Speed**: Animation speed is now driven by your Mac's CPU load.
- ✅ **Smart Theme Detection**: Automatically detects light/dark menubar appearance
- ✅ **Manual Override**: Force light or dark frames when needed
- ✅ **Real-time Updates**: Frames change instantly when you switch themes
- ✅ **Debug Tools**: New "Debug Theme Info" and "Theme Override" menu options
- ✅ **Improved Fallbacks**: Better backup frames when images are missing
- ✅ **Enhanced Controls**: More granular control over frame selection

### Troubleshooting
- **Tony not visible on light menubar?** → Right-click → Theme Override → "Force Light Menubar"
- **App crashes on startup?** → Make sure all frame files exist in the `assets/` folder
- **Frames not switching automatically?** → Try "Refresh Frames (Theme)" or use manual override

## Customize the Workshop

Make it your own Iron Man experience:
- **Modify `main.js`** - Change how Tony works and moves  
- **Add more frames** - Create a longer animation sequence (Tony welding, sparks flying, etc.)
- **Create theme variants** - Design frames for different visibility needs (light/dark)
- **Workshop themes** - Customize the right-click menu with more Marvel references
- **Advanced theming** - Modify the `forceTheme` logic for custom detection rules

### Your Pixel Art Mission:
Create epic 22x22 pixel frames for both themes:

- **Dark backgrounds**: `frame1.png` & `frame2.png` (original bright/colored Tony)
- **Light backgrounds**: `frame1-blackpng.png` & `frame2-black.png` (high-contrast black Tony)

**"I am Iron Man"** - Now with perfect visibility on any background! 🦾✨
