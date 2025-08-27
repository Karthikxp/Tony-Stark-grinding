const { app, Tray, Menu, nativeImage, nativeTheme, systemPreferences } = require('electron');
const path = require('path');
const si = require('systeminformation');
//i want this empty slot gone

//peeakaboo motherfuckaaaa

//toodaloo motherfuckaaaa
class MenuBarAnimator {
  constructor() {
    this.tray = null;
    this.currentFrame = 0;
    this.animationInterval = null;
    this.frames = [];
    this.isAnimating = false;
    this.forceTheme = null; // null = auto, 'light' = force light, 'dark' = force dark
    this.cpuCheckInterval = null;
  }

  createTray() {
    // Load the two animation frames
    this.loadFrames();

    // Create tray with first frame
    this.tray = new Tray(this.frames[0]);

    // Listen for theme changes and reload frames accordingly
    nativeTheme.on('updated', () => {
      console.log('🔄 Theme change detected, reloading frames...');
      this.loadFrames();
      // Update current frame display
      if (this.tray && this.frames.length > 0) {
        this.tray.setImage(this.frames[this.currentFrame]);
        console.log('✅ Frames updated and applied to tray');
      } else {
        console.log('❌ Failed to update frames');
      }
    });

    // Set up context menu
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Toggle Animation',
        click: () => this.toggleAnimation()
      },
      { type: 'separator' },
      {
        label: 'Refresh Frames (Theme)',
        click: () => {
          console.log('🔄 Manually refreshing frames...');
          this.loadFrames();
          if (this.tray && this.frames.length > 0) {
            this.tray.setImage(this.frames[this.currentFrame]);
          }
        }
      },
      {
        label: 'Theme Override',
        submenu: [
          {
            label: 'Auto (System Detection)',
            click: () => {
              this.forceTheme = null;
              console.log('🔄 Theme override: Auto detection enabled');
              this.loadFrames();
              if (this.tray && this.frames.length > 0) {
                this.tray.setImage(this.frames[this.currentFrame]);
              }
            }
          },
          {
            label: 'Force Light Menubar (Use Black Frames)',
            click: () => {
              this.forceTheme = 'light';
              console.log('🔄 Theme override: Forcing light menubar (black frames)');
              this.loadFrames();
              if (this.tray && this.frames.length > 0) {
                this.tray.setImage(this.frames[this.currentFrame]);
              }
            }
          },
          {
            label: 'Force Dark Menubar (Use Original Frames)',
            click: () => {
              this.forceTheme = 'dark';
              console.log('🔄 Theme override: Forcing dark menubar (original frames)');
              this.loadFrames();
              if (this.tray && this.frames.length > 0) {
                this.tray.setImage(this.frames[this.currentFrame]);
              }
            }
          }
        ]
      },
      {
        label: 'Debug Theme Info',
        click: () => {
          const shouldUseDark = nativeTheme.shouldUseDarkColors;
          const themeSource = nativeTheme.themeSource;
          console.log(`🐛 Debug Theme Info:
            - shouldUseDarkColors: ${shouldUseDark}
            - themeSource: ${themeSource}
            - forceTheme: ${this.forceTheme || 'auto'}
            - Current frame set: ${shouldUseDark ? 'Dark (original)' : 'Light (black)'}
          `);
        }
      },
      {
        label: 'Quit',
        click: () => app.quit()
      }
    ]);

    this.tray.setContextMenu(contextMenu);
    this.tray.setToolTip('Tony Stark\'s Workshop - Pixelated Iron Man Animation');

    // Start animation and CPU monitoring
    this.startAnimation(1000); // Start with a default slow speed
    this.startCpuMonitoring();
  }

  loadFrames() {
    try {
      // Check multiple indicators for menubar appearance
      const shouldUseDarkColors = nativeTheme.shouldUseDarkColors;
      const themeSource = nativeTheme.themeSource;

      // Check for manual override first
      let isMenuBarDark;
      if (this.forceTheme === 'light') {
        isMenuBarDark = false;
        console.log('🔧 Manual override: Forcing light menubar detection');
      } else if (this.forceTheme === 'dark') {
        isMenuBarDark = true;
        console.log('🔧 Manual override: Forcing dark menubar detection');
      } else {
        // Auto detection
        isMenuBarDark = shouldUseDarkColors;
      }

      // On macOS, try to get more accurate menubar appearance detection
      if (process.platform === 'darwin') {
        try {
          // Check if we can get the accent color - this helps determine actual appearance
          const accentColor = systemPreferences.getAccentColor();

          // Additional check: if system is in auto mode and we have a light wallpaper,
          // the menubar might still be light even with dark mode enabled
          if (themeSource === 'system') {
            // For now, we'll assume if the user explicitly changes appearance,
            // they want the opposite of what's detected
            // This is a workaround until we can detect actual menubar brightness
          }
        } catch (error) {
          console.log('Could not get system preferences, using nativeTheme');
        }
      }

      console.log(`🔍 Theme debug info:
        - shouldUseDarkColors: ${shouldUseDarkColors}
        - themeSource: ${themeSource}
        - Platform: ${process.platform}
        - Detected menubar: ${isMenuBarDark ? 'Dark' : 'Light'}`);

      // Use light frames (black) when menubar appears light
      const isLightMenuBar = !isMenuBarDark;

      // Choose frame files based on menubar appearance
      let frame1Name, frame2Name;
      if (isLightMenuBar) {
        // Light menubar - use black frames for visibility
        frame1Name = 'frame1-blackpng.png';
        frame2Name = 'frame2-black.png';
        console.log('🌞 Light menubar detected - using black frames for visibility');
      } else {
        // Dark menubar - use original frames
        frame1Name = 'frame1.png';
        frame2Name = 'frame2.png';
        console.log('🌙 Dark menubar detected - using original frames');
      }

      // Load the appropriate frames
      const frame1Path = path.join(__dirname, 'assets', frame1Name);
      const frame2Path = path.join(__dirname, 'assets', frame2Name);

      const frame1 = nativeImage.createFromPath(frame1Path);
      const frame2 = nativeImage.createFromPath(frame2Path);

      // Use native menu bar size for best quality (no resizing needed if source is 22x22)
      // Check if images are already the right size to avoid unnecessary resizing
      const targetSize = 22;

      this.frames = [
        frame1.getSize().width === targetSize ? frame1 : frame1.resize({ width: targetSize, height: targetSize }),
        frame2.getSize().width === targetSize ? frame2 : frame2.resize({ width: targetSize, height: targetSize })
      ];

      console.log(`Frames loaded successfully (${isLightMenuBar ? 'light' : 'dark'} menubar)`);
    } catch (error) {
      console.error('Error loading frames:', error);

      // Fallback: create simple colored squares for testing
      this.createFallbackFrames();
    }
  }

  createFallbackFrames() {
    // Create simple fallback frames for testing when images aren't available
    // Use Electron's nativeImage to create simple colored squares

    // Check for manual override or auto-detect
    let isLightMenuBar;
    if (this.forceTheme === 'light') {
      isLightMenuBar = true;
    } else if (this.forceTheme === 'dark') {
      isLightMenuBar = false;
    } else {
      isLightMenuBar = !nativeTheme.shouldUseDarkColors;
    }

    // Create simple 22x22 images using nativeImage.createEmpty()
    const frame1 = nativeImage.createEmpty();
    const frame2 = nativeImage.createEmpty();

    // Since we can't easily create colored squares without canvas,
    // we'll use a very simple approach: create template images
    frame1.addRepresentation({
      scaleFactor: 1.0,
      width: 22,
      height: 22,
      buffer: Buffer.alloc(22 * 22 * 4, isLightMenuBar ? 0 : 255) // Black or white pixels
    });

    frame2.addRepresentation({
      scaleFactor: 1.0,
      width: 22,
      height: 22,
      buffer: Buffer.alloc(22 * 22 * 4, isLightMenuBar ? 64 : 128) // Gray pixels
    });

    this.frames = [frame1, frame2];

    console.log(`Using fallback frames (${isLightMenuBar ? 'light' : 'dark'} menubar simple squares)`);
  }

  startAnimation(interval = 500) {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }

    this.isAnimating = true;
    this.animationInterval = setInterval(() => {
      this.nextFrame();
    }, interval);

    // console.log(`Animation started with ${interval}ms interval`);
  }

  stopAnimation() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
    this.isAnimating = false;
    console.log('Animation stopped');
  }

  toggleAnimation() {
    if (this.isAnimating) {
      this.stopAnimation();
      this.stopCpuMonitoring();
    } else {
      this.startCpuMonitoring();
    }
  }

  setAnimationSpeed(interval) {
    if (this.isAnimating) {
      this.startAnimation(interval);
    }
  }

  nextFrame() {
    if (this.frames.length === 0) return;

    this.currentFrame = (this.currentFrame + 1) % this.frames.length;
    this.tray.setImage(this.frames[this.currentFrame]);
  }

  startCpuMonitoring() {
    if (this.cpuCheckInterval) {
      clearInterval(this.cpuCheckInterval);
    }

    this.cpuCheckInterval = setInterval(() => {
      si.currentLoad().then(data => {
        const load = data.currentLoad;
        let interval;

        if (load > 60) {
          interval = 100; // Very Fast
        } else if (load > 30) {
          interval = 200; // Fast
        } else if (load > 10) {
          interval = 500; // Medium
        } else {
          interval = 1000; // Slow
        }
        
        console.log(`CPU Load: ${load.toFixed(2)}%, Animation Interval: ${interval}ms`);
        this.setAnimationSpeed(interval);
      }).catch(error => {
        console.error('Error getting CPU load:', error);
      });
    }, 2000); // Check CPU usage every 2 seconds
  }

  stopCpuMonitoring() {
    if (this.cpuCheckInterval) {
      clearInterval(this.cpuCheckInterval);
      this.cpuCheckInterval = null;
    }
  }
}

// App event handlers
app.whenReady().then(() => {
  const animator = new MenuBarAnimator();
  animator.createTray();
});

app.on('window-all-closed', (e) => {
  // Prevent app from quitting when all windows are closed
  // This keeps the menu bar app running
  e.preventDefault();
});

app.on('before-quit', () => {
  // Clean up when quitting
  if (global.animator) {
    global.animator.stopAnimation();
    global.animator.stopCpuMonitoring();
  }
});

// Platform specific: Hide dock icon on macOS, set system tray on Windows
if (process.platform === 'darwin') {
  app.dock.hide();
} else if (process.platform === 'win32') {
  // Windows-specific settings can go here if needed
  // The tray will work automatically in the system tray
}