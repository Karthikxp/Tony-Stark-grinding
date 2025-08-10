# Menubar Animated - Iron Man Anvil Scene

A macOS menu bar application that displays animated pixel art, specifically recreating the iconic Iron Man anvil-hitting scene.

## Features

- 🎨 Two-frame pixel art animation in the menu bar
- ⚡ Adjustable animation speeds (100ms to 1000ms)
- 🎛️ Right-click context menu for controls
- 🚀 Lightweight Electron.js app
- 💻 macOS menu bar integration (no dock icon)

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add your pixel art:**
   - Place your two animation frames in the `assets/` folder
   - Name them `frame1.png` and `frame2.png`
   - **Optimal size: 22x22 pixels** (PNG format with transparency)

3. **Run the app:**
   ```bash
   npm start
   ```

## Controls

Right-click the menu bar icon to access:
- **Toggle Animation** - Start/stop the animation
- **Set Speed** - Choose from Slow, Medium, Fast, or Very Fast
- **Quit** - Close the application

## Building

To create a distributable app:
```bash
npm run build-mac
```

This will create a `.dmg` file in the `dist/` folder.

## Development

For development with auto-reload:
```bash
npm run dev
```

## Customization

- Modify `main.js` to change animation behavior
- Adjust frame timing in the speed options
- Add more frames by extending the `frames` array
- Customize the context menu options

## Iron Man Anvil Scene

Perfect for recreating that iconic scene where Tony Stark is forging! Create two frames:
1. **Frame 1**: Hammer raised up
2. **Frame 2**: Hammer striking the anvil

The animation will continuously cycle between these frames, creating the hammering effect right in your menu bar.

Enjoy your animated menu bar! 🔨⚡
