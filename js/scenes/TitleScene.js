// js/scenes/TitleScene.js
class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
        this.titleMusic = null;
        this.startButton = null;
        this.continueButton = null;
        this.introTypingEvent = null;
        this.introTextObjects = [];
        this.currentIntroMusic = null; // To store reference to intro music

        // Skip logic variables
        this.zKeyPressCount = 0;
        this.lastZKeyPressTime = 0;
        this.skipDebounceTime = 500; // Time in ms to allow second Z press
        this.isSkipping = false; // Flag to prevent race conditions
    }

    // --- ADDED MISSING METHOD ---
    hasSaveData() {
        // Checks if a save item exists in localStorage
        return localStorage.getItem('undertaleAdventureSave') !== null;
    }
    // ---------------------------

    create() {
        console.log('Title scene started');
        const centerX = this.cameras.main.width / 2;
        const fontStyle = { fontFamily: 'DTM-Mono', fill: '#FFF' }; // Use loaded font

        this.sound.stopAll(); // Ensure clean slate for music

        if (!this.sound.get('music-menu') || !this.sound.get('music-menu').isPlaying) {
            this.titleMusic = this.sound.add('music-menu', { loop: true, volume: 0.5 });
            this.titleMusic.play();
            console.log("Playing title music.");
        } else {
             this.titleMusic = this.sound.get('music-menu'); // Get reference if already playing
             console.log("Title music already playing or exists.");
        }


        this.titleText = this.add.text(
            centerX, 100, 'UNDERTALE', { ...fontStyle, fontSize: '64px' }
        ).setOrigin(0.5);

        this.subtitleText = this.add.text(
            centerX, 170, 'Text Adventure', { ...fontStyle, fontSize: '32px' }
        ).setOrigin(0.5);

        const buttonStyle = { ...fontStyle, fontSize: '24px', fill: '#FF0' };
        const buttonHoverStyle = { fill: '#FFF' };
        const buttonActiveStyle = { fill: '#F00' };

        this.startButton = this.add.text(centerX, 300, 'Start Game', buttonStyle)
            .setOrigin(0.5).setPadding(10).setStyle({ backgroundColor: '#111' }) // Keep background for visibility
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.startButton.setStyle(buttonActiveStyle); // Show active state
                if(this.sound.get('sfx-select')) this.sound.play('sfx-select');
                // Use a small delay to allow sound to play before scene transition/heavy work
                this.time.delayedCall(100, this.startGame, [], this);
            })
            .on('pointerover', () => this.startButton.setStyle(buttonHoverStyle) )
            .on('pointerout', () => this.startButton.setStyle(buttonStyle) );

        // --- This check now works ---
        if (this.hasSaveData()) {
             console.log("Save data found, creating Continue button.");
             this.continueButton = this.add.text(centerX, 360, 'Continue Game', buttonStyle)
                .setOrigin(0.5).setPadding(10).setStyle({ backgroundColor: '#111' }) // Keep background
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', () => {
                    this.continueButton.setStyle(buttonActiveStyle);
                     if(this.sound.get('sfx-select')) this.sound.play('sfx-select');
                    this.time.delayedCall(100, this.loadGame, [], this);
                })
                .on('pointerover', () => this.continueButton.setStyle(buttonHoverStyle))
                .on('pointerout', () => this.continueButton.setStyle(buttonStyle));
        } else {
             console.log("No save data found.");
             this.continueButton = null; // Ensure it's null if no save data
        }
        // ---------------------------

        this.creditsText = this.add.text(
            centerX, this.cameras.main.height - 40, 'Based on UNDERTALE by Toby Fox',
            { ...fontStyle, fontSize: '16px', fill: '#888' } // Apply font
        ).setOrigin(0.5);

        // --- Add Skip Listener ---
        this.input.keyboard.on('keydown-Z', this.handleZPress, this);
        // Reset skip count on scene start
        this.zKeyPressCount = 0;
        this.isSkipping = false;
    }


    handleZPress(event) {
        // Only allow skipping during the intro typing sequence
        if (!this.introTypingEvent || this.isSkipping) {
             this.zKeyPressCount = 0; // Reset count if intro isn't running
            return;
        }

        const currentTime = this.time.now;

        if (currentTime - this.lastZKeyPressTime < this.skipDebounceTime) {
            this.zKeyPressCount++;
        } else {
            this.zKeyPressCount = 1;
        }

        this.lastZKeyPressTime = currentTime;

        if (this.zKeyPressCount >= 2) {
            console.log("Double Z press detected. Skipping intro...");
            this.zKeyPressCount = 0; // Reset count
            this.skipIntro();
        }
    }

    skipIntro() {
        if (this.isSkipping || !this.introTypingEvent) return; // Already skipping or intro finished

        this.isSkipping = true; // Set flag

        if (this.introTypingEvent) {
            this.introTypingEvent.remove();
            this.introTypingEvent = null;
            console.log("Intro typing event stopped.");
        }

        if (this.currentIntroMusic && this.currentIntroMusic.isPlaying) {
            console.log("Stopping intro music immediately.");
            this.currentIntroMusic.stop();
            this.currentIntroMusic = null;
        }

        this.introTextObjects.forEach(text => {
            if (text && text.scene) text.destroy();
        });
        this.introTextObjects = [];
        console.log("Intro text objects destroyed.");

        this.tweens.killTweensOf(this.titleMusic);
        if(this.titleMusic && this.titleMusic.isPlaying) this.titleMusic.stop();

        console.log("Starting GameScene after skip.");
        this.time.delayedCall(50, () => {
            this.scene.start('GameScene', { loadSave: false });
        });
    }


    startGame() {
        if (this.introTypingEvent || this.isSkipping) return;

        this.titleText.setVisible(false);
        this.subtitleText.setVisible(false);
        this.startButton.setVisible(false).disableInteractive();
        if (this.continueButton) {
            this.continueButton.setVisible(false).disableInteractive();
        }
        this.creditsText.setVisible(false);

        if (this.titleMusic && this.titleMusic.isPlaying) {
             this.tweens.add({
                targets: this.titleMusic, volume: 0, duration: 500,
                onComplete: () => { if (this.titleMusic) this.titleMusic.stop(); } // Add check
            });
        }

        this.time.delayedCall(500, () => {
             if (this.isSkipping) return; // Check if skipped during the delay

            this.currentIntroMusic = this.sound.add('music-once_upon_a_time', { volume: 0.5 });
            this.currentIntroMusic.play();
            console.log("Playing intro music (startGame)");

            this.showIntro(() => {
                  if (this.isSkipping) return; // Check if skipped during intro show

                  console.log("Intro finished naturally, fading out intro music");
                  if (this.currentIntroMusic && this.currentIntroMusic.isPlaying){
                     this.tweens.add({
                        targets: this.currentIntroMusic, volume: 0, duration: 500,
                        onComplete: () => {
                            if (this.currentIntroMusic) this.currentIntroMusic.stop();
                            console.log("Intro music stopped. Starting GameScene.");
                            if(!this.isSkipping) this.scene.start('GameScene', { loadSave: false });
                        }
                    });
                  } else {
                       console.log("Intro music already stopped. Starting GameScene.");
                       if(!this.isSkipping) this.scene.start('GameScene', { loadSave: false });
                  }

            });
        }, [], this);
    }

    // --- ADDED MISSING METHOD ---
    loadGame() {
         if (this.introTypingEvent || this.isSkipping) return; // Prevent double action

        console.log("loadGame called");
        // Stop title music
        if (this.titleMusic && this.titleMusic.isPlaying) {
            this.titleMusic.stop();
            console.log("Title music stopped for load.");
        }

        // Load saved game state check
        if (this.hasSaveData()) {
             console.log("Loading game data and starting GameScene...");
             // Pass flag to GameScene's init method
             this.scene.start('GameScene', { loadSave: true });
        } else {
            console.warn("Attempted to load game, but no save data found.");
            // Optionally re-enable buttons or show a message
        }
    }
    // ---------------------------


    showIntro(callback) {
        if (this.isSkipping) return; // Don't start if already skipping

        console.log("showIntro called");
        this.introTextObjects = []; // Clear previous intro text objects
        const introLines = [
            "Long ago, two races ruled over Earth: HUMANS and MONSTERS.",
            "One day, war broke out between the two races.",
            "After a long battle, the humans were victorious.",
            "They sealed the monsters underground with a magic spell.",
            "...",
            "Many years later...",
            "...",
            "MT. EBOTT - 201X",
            "...",
            "Legends say that those who climb the mountain never return."
        ]; // Make sure you have your lines here

        const charDelay = 50;
        const lineDelay = 1000;
        const finalDelay = 2000;
        const pauseDelay = 500;
        let lineIndex = 0;
        let charIndex = 0;
        let currentLineText = null;
        let yPos = 100;
        const lineSpacing = 40;
        const introTextStyle = { fontFamily: 'DTM-Mono', fontSize: '24px', fill: '#FFF' };
        const centerX = this.cameras.main.width / 2;

        const typeCharacter = () => {
             if (this.isSkipping || !this.scene.isActive()) {
                  console.log("Stopping type event due to skip or inactive scene.");
                  if(this.introTypingEvent) this.introTypingEvent.remove();
                  this.introTypingEvent = null;
                  return;
             }
             if (!this.introTypingEvent || this.introTypingEvent.paused) {
                 return;
             }

            if (lineIndex >= introLines.length) {
                 console.log("Typing complete. Removing timer.");
                if(this.introTypingEvent) this.introTypingEvent.remove(); // Ensure removal
                this.introTypingEvent = null;
                this.time.delayedCall(finalDelay, () => {
                    if (!this.isSkipping) callback();
                });
                return;
            }

            const currentLine = introLines[lineIndex];

            if (currentLine === "...") {
                lineIndex++;
                charIndex = 0;
                 if(this.introTypingEvent) this.introTypingEvent.delay = pauseDelay; // Adjust delay if timer exists
                return;
            }

            if (charIndex === 0) {
                currentLineText = this.add.text(centerX, yPos, '', introTextStyle).setOrigin(0.5);
                this.introTextObjects.push(currentLineText); // Track it
                yPos += lineSpacing;
            }

            if (charIndex < currentLine.length) {
                const charToAdd = currentLine[charIndex];
                currentLineText.text += charToAdd;
                if (charToAdd !== ' ' && charToAdd !== '\n') {
                    try {
                         if(this.sound.get('sfx-text')) this.sound.play('sfx-text', { volume: 0.6 });
                    } catch (e) {
                         console.error("Error playing sfx-text:", e);
                    }
                }
                charIndex++;
                 if(this.introTypingEvent) this.introTypingEvent.delay = charDelay; // Set delay for next char

            } else {
                lineIndex++;
                charIndex = 0;
                 if(this.introTypingEvent) this.introTypingEvent.delay = lineDelay; // Set delay for next line
            }
        };

        console.log("Creating timed event for typing.");
        // Ensure previous timer is removed before creating a new one
        if (this.introTypingEvent) this.introTypingEvent.remove();
        this.introTypingEvent = this.time.addEvent({
            delay: charDelay,
            callback: typeCharacter,
            loop: true
        });
    }


    shutdown() {
        console.log("Title Scene Shutting Down");
        this.input.keyboard.off('keydown-Z', this.handleZPress, this);

        if (this.introTypingEvent) {
            this.introTypingEvent.remove();
            this.introTypingEvent = null;
        }
        this.introTextObjects.forEach(text => {
            if (text && text.scene) text.destroy();
        });
        this.introTextObjects = [];
        this.isSkipping = false;
        this.zKeyPressCount = 0;
    }

    destroy() {
         console.log("Title Scene Destroyed");
         if (this.titleMusic && this.titleMusic.stop) { // Check if method exists before calling
            this.titleMusic.stop();
        }
         if (this.currentIntroMusic && this.currentIntroMusic.stop) {
             this.currentIntroMusic.stop();
         }
    }
}