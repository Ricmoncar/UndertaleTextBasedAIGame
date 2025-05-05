// js/scenes/PreloaderScene.js
class PreloaderScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloaderScene' });
        this.fontsLoaded = false; // Flag to track font loading
        this.assetsLoaded = false; // Flag for regular assets
    }

    preload() {
        console.log('Preloader scene started');

        // --- Loading Bar Setup ---
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(centerX - 160, centerY, 320, 50);

        const progressBar = this.add.graphics();

        const loadingText = this.add.text(centerX, centerY - 25, 'Loading...', {
            fontSize: '20px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        const percentText = this.add.text(centerX, centerY + 25, '0%', {
            fontSize: '18px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        const assetText = this.add.text(centerX, centerY + 60, '', {
            fontSize: '18px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Update progress bar
        this.load.on('progress', (value) => {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(centerX - 150, centerY + 10, 300 * value, 30);
        });

        // Update file progress text
        this.load.on('fileprogress', (file) => {
            // Avoid showing 'webfont' as loading asset, it's just a script
            if (file.key !== 'webfont') {
                assetText.setText('Loading asset: ' + file.key);
            }
        });

        // --- Load Web Font Loader Script ---
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

        // --- Load other assets ---
        this.loadAudio();
        this.loadImages();
        // Note: Don't load the font file itself here, WebFontLoader handles it

        // --- Completion Logic ---
        this.load.on('complete', () => {
            console.log('Phaser asset loading complete.');
            this.assetsLoaded = true;
            // Don't destroy things yet, wait for fonts
             assetText.setText('Assets loaded. Waiting for font...'); // Update status
            this.checkReady(); // Check if both assets and fonts are ready
        });

    }

    create() {
        console.log('Preloader create: Loading fonts...');
         // --- Use Web Font Loader ---
         // Make sure WebFont is available
         if (typeof WebFont !== 'undefined') {
            WebFont.load({
                custom: {
                    families: ['DTM-Mono'], // Name defined in your @font-face
                    // Optional: Add URLs if needed, but @font-face should handle it
                    // urls: ['css/fonts.css'] // Example if you have a separate CSS for fonts
                },
                active: () => {
                    console.log('WebFontLoader: DTM-Mono font active.');
                    this.fontsLoaded = true;
                    this.checkReady(); // Check if both assets and fonts are ready
                },
                inactive: () => {
                     console.error('WebFontLoader: Font could not be loaded.');
                     // Handle font loading failure - maybe proceed with fallback?
                     this.fontsLoaded = true; // Treat as ready even if failed, to not block forever
                     this.checkReady();
                },
                timeout: 5000 // Set a timeout (e.g., 5 seconds)
            });
         } else {
             console.error("WebFont script not loaded!");
             // Handle script load failure - maybe proceed with fallback?
             this.fontsLoaded = true; // Allow proceeding without custom font
             this.checkReady();
         }
    }

    checkReady() {
        // Proceed only when both Phaser assets AND fonts are loaded (or failed)
        if (this.assetsLoaded && this.fontsLoaded) {
            // *** CHANGE IS HERE ***
            console.log('Assets and Fonts ready. Proceeding to ApiKeyScene.');

             // Clean up loading UI elements (ProgressBar, Texts)
             // Access them via properties if stored (e.g., this.progressBar)
             // or find them like this (less robust):
             this.children.list.forEach(child => {
                 // Check type to avoid destroying things added by WebFontLoader maybe?
                 if (child instanceof Phaser.GameObjects.Graphics || child instanceof Phaser.GameObjects.Text) {
                     // Add extra checks if needed, e.g., based on position or a specific property
                     child.destroy();
                 }
             });

            // Optional: Brief "Ready" message (or skip this)
            // this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Ready!', { fontSize: '32px', fill: '#FFF', fontFamily: 'DTM-Mono' }).setOrigin(0.5);
            // this.time.delayedCall(100, () => { // Very short delay if showing "Ready!"
            //    this.scene.start('ApiKeyScene'); // Start the API Key input scene
            // });

            // If skipping the "Ready!" message, start immediately:
             this.scene.start('ApiKeyScene'); // Start the API Key input scene

        } else {
            console.log(`Waiting: Assets loaded: ${this.assetsLoaded}, Fonts loaded: ${this.fontsLoaded}`);
        }
    }

    // --- Audio Loading ---
    loadAudio() {
        console.log("Preloader: Loading audio...");
        const musicTracks = [
            'menu', 'ruins', 'snowdin', 'hotland',
            'core', 'shop', 'credits', 'dogsong',
            'once_upon_a_time' // Battle music often loaded later/dynamically
        ];
        musicTracks.forEach(track => {
            // Check path relative to index.html
             this.load.audio(`music-${track}`, `assets/music/${track}.mp3`);
        });

        const soundEffects = [
            'select', 'text', 'item', 'save', 'battle-start', // Keep battle start
            'attack', 'damage', 'heal', 'spare', 'flee', // Load common battle sounds
            'move', 'equip', 'buy', 'menu_select', 'bullet'
        ];
         soundEffects.forEach(effect => {
             // Check path relative to index.html
             this.load.audio(`sfx-${effect}`, `assets/sound/${effect}.mp3`);
         });
         console.log("Preloader: Audio loading initiated.");
    }

    // --- Image Loading ---
    loadImages() {
         console.log("Preloader: Loading images...");
         // Load essential UI and maybe first area/title images
         // Check paths relative to index.html
        this.load.image('background-title', 'assets/images/backgrounds/title.png'); // For Title screen
        // this.load.image('background-ruins', 'assets/images/backgrounds/ruins.png'); // Maybe load later?
        this.load.image('character-flowey', 'assets/images/characters/flowey.png'); // Often seen early
        // this.load.image('character-toriel', 'assets/images/characters/toriel.png'); // Maybe load later?
        this.load.image('ui-textbox', 'assets/images/ui/textbox.png');
        // this.load.image('ui-button', 'assets/images/ui/button.png'); // If using image buttons
        this.load.image('ui-soul', 'assets/images/ui/soul.png'); // For battle
        this.load.image('ui-hp-bar', 'assets/images/ui/hp-bar.png'); // For GameScene
         console.log("Preloader: Image loading initiated.");
         // Consider loading area-specific backgrounds/characters within GameScene when moving to that area
         // or have a secondary loading phase if many assets are needed upfront.
    }
}