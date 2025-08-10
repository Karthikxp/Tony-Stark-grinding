const { app, Tray, Menu, nativeImage } = require('electron');
const path = require('path');

class MenuBarAnimator {
  constructor() {
    this.tray = null;
    this.currentFrame = 0;
    this.animationInterval = null;
    this.frames = [];
    this.isAnimating = false;
  }

  createTray() {
    // Load the two animation frames
    this.loadFrames();
    
    // Create tray with first frame
    this.tray = new Tray(this.frames[0]);
    
    // Set up context menu
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Toggle Animation',
        click: () => this.toggleAnimation()
      },
      {
        label: 'Set Speed',
        submenu: [
          {
            label: 'Slow (1000ms)',
            click: () => this.setAnimationSpeed(1000)
          },
          {
            label: 'Medium (500ms)',
            click: () => this.setAnimationSpeed(500)
          },
          {
            label: 'Fast (200ms)',
            click: () => this.setAnimationSpeed(200)
          },
          {
            label: 'Very Fast (100ms)',
            click: () => this.setAnimationSpeed(100)
          }
        ]
      },
      { type: 'separator' },
      {
        label: 'Quit',
        click: () => app.quit()
      }
    ]);
    
    this.tray.setContextMenu(contextMenu);
    this.tray.setToolTip('Iron Man Anvil Animation');
    
    // Start animation by default
    this.startAnimation(500); // Default 500ms interval
  }

  loadFrames() {
    try {
      // Load frame 1 (e.g., hammer up position)
      const frame1Path = path.join(__dirname, 'assets', 'frame1.png');
      const frame1 = nativeImage.createFromPath(frame1Path);
      
      // Load frame 2 (e.g., hammer down position)
      const frame2Path = path.join(__dirname, 'assets', 'frame2.png');
      const frame2 = nativeImage.createFromPath(frame2Path);
      
      // Use native menu bar size for best quality (no resizing needed if source is 22x22)
      // Check if images are already the right size to avoid unnecessary resizing
      const targetSize = 22;
      
      this.frames = [
        frame1.getSize().width === targetSize ? frame1 : frame1.resize({ width: targetSize, height: targetSize }),
        frame2.getSize().width === targetSize ? frame2 : frame2.resize({ width: targetSize, height: targetSize })
      ];
      
      console.log('Frames loaded successfully');
    } catch (error) {
      console.error('Error loading frames:', error);
      
      // Fallback: create simple colored squares for testing
      this.createFallbackFrames();
    }
  }

  createFallbackFrames() {
    // Create simple fallback frames for testing when images aren't available
    const canvas = require('canvas');
    
    // Frame 1 - Red square (using optimal 22x22 size)
    const canvas1 = canvas.createCanvas(22, 22);
    const ctx1 = canvas1.getContext('2d');
    ctx1.fillStyle = '#FF0000';
    ctx1.fillRect(0, 0, 22, 22);
    
    // Frame 2 - Blue square (using optimal 22x22 size)
    const canvas2 = canvas.createCanvas(22, 22);
    const ctx2 = canvas2.getContext('2d');
    ctx2.fillStyle = '#0000FF';
    ctx2.fillRect(0, 0, 22, 22);
    
    this.frames = [
      nativeImage.createFromBuffer(canvas1.toBuffer()),
      nativeImage.createFromBuffer(canvas2.toBuffer())
    ];
    
    console.log('Using fallback frames (colored squares)');
  }

  startAnimation(interval = 500) {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
    
    this.isAnimating = true;
    this.animationInterval = setInterval(() => {
      this.nextFrame();
    }, interval);
    
    console.log(`Animation started with ${interval}ms interval`);
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
    } else {
      this.startAnimation(500);
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
  }
});

// macOS specific: Hide dock icon for menu bar only app
if (process.platform === 'darwin') {
  app.dock.hide();
}
