// js/scenes/GameScene.js
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        // --- Properties ---
        this.textIndex = 0;
        this.textSpeed = 30; // ms per character
        this.textComplete = false;
        this.commandHistory = [];
        this.historyIndex = -1;
        this.isTyping = false; // Track typing state
        this.textQueue = [];   // Queue for text messages
        this.textTimer = null; // Reference to the text typing timer
        this.textSound = null; // Reference to text sound
        this.currentMusic = null; // Reference to current music
        this.inventoryPanel = false; // Flag for inventory open state
        this.inventoryDisplayGroup = null; // Group for inventory UI elements
        this.shopPanel = false; // Flag for shop open state
        this.shopDisplayGroup = null; // Group for shop UI elements
        this.choicesContainer = null; // Container for choice buttons
        this.commandInput = null; // Reference to the DOM input element
        this.backgroundSprite = null; // Reference to background image sprite
        this.isAiGenerating = false; // Flag to prevent overlapping API calls/actions

        // --- UI element references for easy access ---
        this.textDisplay = null;
        this.healthLabel = null;
        this.healthBarBg = null;
        this.healthBar = null;
        this.healthValue = null;
        this.playerStats = null;
        this.inventoryButton = null;
        this.saveButtonText = null; // Reference for the SAVE button text
        this.inputBox = null; // The visual input box rectangle
        this.submitButton = null;
    }

    init(data) {
        console.log("GameScene init with data:", data);
        this.shouldLoadSave = data ? data.loadSave : false;
        // Initialize API Client (assuming DeepseekAPI.js is loaded)
        if (typeof DeepseekAPI === 'undefined') {
            console.error("DeepseekAPI utility not found! AI features will be disabled.");
        } else {
            DeepseekAPI.initialize(); // Ensure API key is read from sessionStorage
        }
    }

    create() {
        console.log('Game scene started');

        // Attempt to unlock audio context on scene start
        if (this.sound.locked) {
            console.log("Audio context locked, attempting to unlock...");
            this.sound.once('unlocked', () => {
                console.log("Audio context unlocked by interaction!");
                if(!this.currentMusic || !this.currentMusic.isPlaying){
                     const [areaIdMusic] = UNDERTALE.gameState.currentLocation.split('.');
                    this.playAreaMusic(areaIdMusic.toUpperCase());
                }
            });
        } else {
            console.log("Audio context already unlocked.");
        }

        if (this.shouldLoadSave) this.loadSavedGame(false);

        const [areaIdInit] = UNDERTALE.gameState.currentLocation.split('.');
        this.setupAreaBackground(areaIdInit.toUpperCase());

        this.setupUI();
        this.updateStats();
        this.updateSaveButtonState(); // Initial check
        this.setupInput();

        const [areaIdMusic] = UNDERTALE.gameState.currentLocation.split('.');
        this.playAreaMusic(areaIdMusic.toUpperCase());

        if (this.shouldLoadSave) {
            this.typeText("* Game loaded.\n\n", true);
            this.time.delayedCall(500, () => this.displayLocation(UNDERTALE.gameState.currentLocation));
        } else {
            this.displayLocation(UNDERTALE.gameState.currentLocation);
        }

        this.scale.on('resize', this.repositionInputElement, this);
        this.time.delayedCall(200, () => { if (this.commandInput) this.commandInput.focus(); });
    }

    setupAreaBackground(areaId) {
        console.log("Setting up background for area:", areaId);
        const area = UNDERTALE.gameData.areas[areaId];
        this.cameras.main.setBackgroundColor(area?.backgroundColor || '#000000');

        const bgKey = `background-${areaId.toLowerCase()}`;
        if (this.textures.exists(bgKey)) {
            if(this.backgroundSprite) this.backgroundSprite.destroy();
            this.backgroundSprite = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, bgKey)
                .setAlpha(0.3).setDepth(-1);
            console.log(`Added background image: ${bgKey}`);
        } else {
            if(this.backgroundSprite) { this.backgroundSprite.destroy(); this.backgroundSprite = null; }
            console.log(`Background image texture not found: ${bgKey}`);
        }
    }

    setupUI() {
        const centerX = this.cameras.main.width / 2;
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const padding = 20;
        const uiFont = 'DTM-Mono, monospace';
        const textColor = '#ffffff';
        const borderColor = '#ffffff';
        const inputBgColor = 0x000000;
        const uiBgAlpha = 0.85;

        // Text Area
        const textAreaHeight = height * 0.6 - padding * 1.5;
        const textAreaY = padding + textAreaHeight / 2;
        this.add.rectangle(centerX, textAreaY, width - padding * 2, textAreaHeight, inputBgColor, uiBgAlpha)
            .setStrokeStyle(2, borderColor).setOrigin(0.5);
        this.textDisplay = this.add.text(padding + 15, padding + 15, '', {
            fontFamily: uiFont, fontSize: '18px', color: textColor,
            wordWrap: { width: width - padding * 2 - 40 }, lineSpacing: 5, align: 'left'
        }).setOrigin(0, 0);

        // Stats Area
        const statsTop = padding;
        const statsLeft = padding + 10;
        const statsRight = width - padding - 10;
        const statsY = statsTop + 25;

        this.healthLabel = this.add.text(statsLeft, statsY, 'HP:', { fontFamily: uiFont, fontSize: '18px', color: textColor }).setOrigin(0, 0.5);
        const healthBarX = this.healthLabel.x + this.healthLabel.width + 10;
        const healthBarWidth = 150;
        this.healthBarBg = this.add.rectangle(healthBarX, statsY, healthBarWidth, 20, 0x550000, 1).setStrokeStyle(1, borderColor).setOrigin(0, 0.5);
        this.healthBar = this.add.rectangle(healthBarX, statsY, healthBarWidth, 20, 0xff0000).setOrigin(0, 0.5);
        this.healthValue = this.add.text(healthBarX + healthBarWidth + 10, statsY, '', { fontFamily: uiFont, fontSize: '18px', color: textColor }).setOrigin(0, 0.5);
        this.playerStats = this.add.text(this.healthValue.x + this.healthValue.width + 30, statsY, '', { fontFamily: uiFont, fontSize: '16px', color: textColor }).setOrigin(0, 0.5);

        // Inventory Button
        this.inventoryButton = this.add.text(statsRight, statsY, 'INVENTORY', {
            fontFamily: uiFont, fontSize: '18px', backgroundColor: '#000000', color: textColor,
            padding: { x: 15, y: 8 }, align: 'center'
        })
        .setOrigin(1, 0.5)
        .setStroke(borderColor, 2)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', this.showInventory, this);

        // SAVE Button
        let saveButtonX = statsRight - 200; // Default X
        if (this.inventoryButton && typeof this.inventoryButton.getLeftCenter === 'function') {
             saveButtonX = this.inventoryButton.getLeftCenter().x - 30;
        } else { console.warn("Inventory button not ready for Save button positioning."); }
        this.saveButtonText = this.add.text(saveButtonX, statsY, 'SAVE', {
            fontFamily: uiFont, fontSize: '18px', backgroundColor: '#111', color: '#555555',
            padding: { x: 15, y: 8 }, align: 'center'
        })
        .setOrigin(1, 0.5).setStroke('#555555', 2); // Start dimmed

        // Input Area
        const inputAreaHeight = 50;
        const inputAreaY = height - padding - inputAreaHeight / 2;
        this.inputBox = this.add.rectangle(centerX, inputAreaY, width - padding * 2, inputAreaHeight, inputBgColor, uiBgAlpha)
            .setStrokeStyle(2, borderColor).setOrigin(0.5);

        // DOM Command Input
        this.createAndPositionInputElement();

        // Submit Button
        const submitButtonWidth = 60;
        const submitButtonX = this.inputBox.getRightCenter().x - (submitButtonWidth / 2) - 15;
        const submitButtonY = this.inputBox.y;
        this.submitButton = this.add.text(submitButtonX, submitButtonY, 'GO', {
            fontFamily: uiFont, fontSize: '16px', backgroundColor: '#ffffff', color: '#000000',
            padding: { x: 10, y: 8 }, align: 'center', fixedWidth: submitButtonWidth
        })
        .setOrigin(0.5).setInteractive({ useHandCursor: true })
        .on('pointerdown', this.handleCommand, this)
        .on('pointerover', () => this.submitButton.setBackgroundColor('#cccccc'))
        .on('pointerout', () => this.submitButton.setBackgroundColor('#ffffff'));

        // Choices Container
        this.choicesContainer = this.add.container(centerX, inputAreaY - 30);
        this.choicesContainer.setDepth(10);
    }

    createAndPositionInputElement() {
        const gameContainer = document.getElementById('game-container');
        if (!gameContainer || !this.inputBox) {
            console.error("Cannot create DOM input: Missing container or input box reference.");
            return;
        }
        if (this.commandInput && this.commandInput.parentNode) {
             this.commandInput.parentNode.removeChild(this.commandInput);
        }

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const canvasBounds = this.sys.game.canvas.getBoundingClientRect();
        const scale = Math.min(canvasBounds.width / width, canvasBounds.height / height);
        const boxRect = this.inputBox.getBounds();
        const scaledPaddingX = 10 * scale;
        const scaledPaddingY = 10 * scale;
        const inputElementTop = canvasBounds.top + (boxRect.y * scale) + scaledPaddingY / 2;
        const inputElementLeft = canvasBounds.left + (boxRect.x * scale) + scaledPaddingX;
        const inputElementWidth = (boxRect.width * scale) - (scaledPaddingX * 2) - (80 * scale);
        const inputElementHeight = (boxRect.height * scale) - scaledPaddingY;
        const uiFont = 'DTM-Mono, monospace';

        this.commandInput = document.createElement('input');
        this.commandInput.type = 'text';
        this.commandInput.id = 'command-input-field';
        this.commandInput.style.position = 'absolute';
        this.commandInput.style.top = `${inputElementTop}px`;
        this.commandInput.style.left = `${inputElementLeft}px`;
        this.commandInput.style.width = `${inputElementWidth}px`;
        this.commandInput.style.height = `${inputElementHeight}px`;
        this.commandInput.style.padding = `0px 5px`;
        this.commandInput.style.border = `none`;
        this.commandInput.style.borderRadius = `5px`;
        this.commandInput.style.backgroundColor = 'black';
        this.commandInput.style.color = 'white';
        this.commandInput.style.fontFamily = `"${uiFont}"`;
        this.commandInput.style.fontSize = `${16 * scale}px`;
        this.commandInput.placeholder = 'Type command...';
        this.commandInput.style.outline = 'none';
        this.commandInput.style.boxSizing = 'border-box';

        gameContainer.appendChild(this.commandInput);
        this.setupInputListeners(); // Re-attach listeners after creation/recreation
    }

    repositionInputElement() {
        this.createAndPositionInputElement(); // Recreate/reposition on resize
    }

    setupInput() {
        this.setupInputListeners(); // Call helper

        // Spacebar listener
        this.input.keyboard.off('keydown-SPACE');
        this.input.keyboard.on('keydown-SPACE', (event) => {
            if (document.activeElement !== this.commandInput) {
                if (this.isTyping && !this.textComplete) {
                    this.textComplete = true;
                    if(this.textTimer) this.textTimer.remove();
                    this.textDisplay.setText(this.fullText);
                    this.processTextQueue();
                }
            }
        });
    }

    setupInputListeners() {
        if (this.commandInput) {
            const inputRef = this.commandInput; // Keep ref before replacing
            inputRef.replaceWith(inputRef.cloneNode(true)); // Clone to remove old listeners
            this.commandInput = document.getElementById('command-input-field'); // Get new ref by ID

            if (this.commandInput) {
                this.commandInput.addEventListener('keyup', (e) => {
                    if (e.key === 'Enter') this.handleCommand();
                    else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        if (this.historyIndex < this.commandHistory.length - 1) {
                            this.historyIndex++;
                            this.commandInput.value = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
                        }
                    } else if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        if (this.historyIndex > 0) {
                            this.historyIndex--;
                            this.commandInput.value = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
                        } else if (this.historyIndex <= 0) {
                            this.historyIndex = -1;
                            this.commandInput.value = '';
                        }
                    }
                });
                this.commandInput.addEventListener('focus', () => this.commandInput.style.boxShadow = '0 0 5px #fff');
                this.commandInput.addEventListener('blur', () => this.commandInput.style.boxShadow = 'none');
            } else { console.error("Failed to get reference to cloned input field."); }
        } else { console.error("Command input field not initialized for listeners."); }
    }

    shutdown() {
        console.log("GameScene shutdown");
        this.scale.off('resize', this.repositionInputElement, this);
        if (this.commandInput && this.commandInput.parentNode) {
            this.commandInput.parentNode.removeChild(this.commandInput);
            this.commandInput = null;
        }
        if(this.textTimer) this.textTimer.remove();
        if(this.currentMusic && this.currentMusic.stop) this.currentMusic.stop();
        this.input.keyboard.off('keydown-SPACE');
        if(this.inventoryDisplayGroup) this.inventoryDisplayGroup.destroy(true, true);
        if(this.shopDisplayGroup) this.shopDisplayGroup.destroy(true, true);
        this.inventoryPanel = false;
        this.shopPanel = false;
        // Clear UI refs
        this.textDisplay = null; this.healthLabel = null; this.healthBarBg = null; this.healthBar = null;
        this.healthValue = null; this.playerStats = null; this.inventoryButton = null;
        this.saveButtonText = null; this.inputBox = null; this.submitButton = null;
        this.choicesContainer = null; this.backgroundSprite = null;
    }

    playAreaMusic(areaId) {
        const musicKey = `music-${areaId.toLowerCase()}`;
        console.log(`Attempting to play music: ${musicKey}`);
        if (this.currentMusic && this.currentMusic.isPlaying && this.currentMusic.key === musicKey) {
            console.log(`Music ${musicKey} is already playing.`);
            return;
        }
        if (this.currentMusic && this.currentMusic.isPlaying) {
            console.log("Stopping previous music:", this.currentMusic.key);
             this.tweens.add({
                targets: this.currentMusic, volume: 0, duration: 300,
                onComplete: () => { if(this.currentMusic) this.currentMusic.stop(); this.playNewMusic(musicKey, areaId); }
            });
        } else {
            this.playNewMusic(musicKey, areaId);
        }
    }

    playNewMusic(musicKey, areaId) {
        const fallbackKey = 'music-ruins';
        let keyToPlay = null;
        if (this.cache.audio.exists(musicKey)) { keyToPlay = musicKey; }
        else {
            console.warn(`Music key "${musicKey}" not found. Checking fallback: ${fallbackKey}`);
            if (this.cache.audio.exists(fallbackKey)) { keyToPlay = fallbackKey; }
            else { console.error(`Fallback music key "${fallbackKey}" also not found!`); this.currentMusic = null; return; }
        }

        console.log(`Playing: ${keyToPlay}`);
        // Ensure previous sound instance is fully stopped before creating new one if key differs
        if (this.currentMusic && this.currentMusic.key !== keyToPlay) {
             if (this.currentMusic.isPlaying) this.currentMusic.stop();
             // It's safer to also destroy the old sound object if reusing the variable
             this.currentMusic.destroy();
        }

        this.currentMusic = this.sound.add(keyToPlay, { loop: true, volume: 0 });
        const playSuccess = this.currentMusic.play();

        if (playSuccess) {
            this.tweens.add({ targets: this.currentMusic, volume: 0.5, duration: 500 });
            this.time.delayedCall(100, () => {
                 if(this.currentMusic && this.currentMusic.key === keyToPlay){ console.log(`Sound ${keyToPlay} isPlaying: ${this.currentMusic.isPlaying}`); }
                 else { /* Handle cases where music changed quickly */ }
            });
        } else {
            console.error(`Sound ${keyToPlay} play() failed. Audio context might still be locked.`);
            this.currentMusic = null;
        }
    }

    async displayLocation(locationId) {
        if (this.isAiGenerating) return;
        let thinkingMsgDisplayed = false;

        const [areaId, locationName] = locationId.split('.');
        const area = UNDERTALE.gameData.areas[areaId.toUpperCase()];
        const location = area?.locations[locationName.toUpperCase()];
        if (!location) { this.typeText(`* Error: Location ${locationId} not found.`, true); return; }

        this.choicesContainer.removeAll(true);
        let descriptionText = location.description;
        let aiFailed = false;

        if (DeepseekAPI && DeepseekAPI.isAvailable()) {
            this.isAiGenerating = true;
            const thinkingMsg = "* Thinking...";
            this.typeText(thinkingMsg, true);
            thinkingMsgDisplayed = true;
            await new Promise(resolve => this.time.delayedCall(thinkingMsg.length * this.textSpeed + 100, resolve));

            let prompt = `You are a text adventure game engine narrating in the style of Undertale. The player is in the "${area?.name || areaId}" area, at the location "${location.name}".\nStatic info: "${location.description}".\nCurrent state: LV ${UNDERTALE.gameState.lv}, HP ${UNDERTALE.gameState.health}/${UNDERTALE.gameState.maxHealth}, Route ${UNDERTALE.gameState.route}.\nGenerate a short (1-3 sentences) atmospheric description for "${location.name}", consistent with the static info and game state. Do NOT list items or exits again in your generated description. Focus on feeling and atmosphere. Do not include explanations in parenthesis.`;
            const aiDescription = await DeepseekAPI.generateText(prompt);

            if (!this.scene.isActive(this.key)) { this.isAiGenerating = false; return; }
            this.isAiGenerating = false;
            if (thinkingMsgDisplayed && this.textDisplay) this.textDisplay.setText('');

            if (aiDescription) {
                descriptionText = aiDescription.replace(/\([\s\S]*?\)/g, '').trim();
                 if (!descriptionText) { descriptionText = location.description; aiFailed = true; }
                 else { console.log("Using AI description for location."); }
            } else { aiFailed = true; console.log("AI generation failed, using default description."); }
        } else { console.log("API not available, using default description."); }

        // Build and display text
        let fullLocationText = "";
        if (aiFailed) fullLocationText += "* (AI generation failed)\n\n";
        fullLocationText += `* ${location.name}\n\n${descriptionText}`;
        if (location.items && location.items.length > 0) {
            const itemNames = location.items.map(itemId => UNDERTALE.gameData.items[itemId.toUpperCase()]?.name).filter(Boolean);
            if(itemNames.length > 0) fullLocationText += `\n\n* You see: ${itemNames.join(', ')}.`;
        }
        if (location.exits) {
            const exits = Object.keys(location.exits).filter(dir => location.exits[dir]);
            if(exits.length > 0) fullLocationText += `\n\n* Exits: ${exits.join(', ')}.`;
        }

        this.typeText(fullLocationText, true);

        // Handle Post-Text Actions
        const handlePostTextActions = () => {
            if (this.isAiGenerating || !this.scene.isActive(this.key)) return;
            let actionTaken = false;
            if (!actionTaken && location.events && location.events.length > 0) {
                const eventId = location.events.find(id => !UNDERTALE.gameState.completedEvents.includes(id));
                if (eventId) { actionTaken = true; this.triggerEvent(eventId); }
            }
            if (!actionTaken && location.isSavePoint) {
                 actionTaken = true;
                 this.setFlag('canSave', true);
                 this.typeText(`\n\n* (The convenience of ${location.saveText || "a save point"} fills you with determination. SAVE option available.)\n`);
                 UNDERTALE.gameState.health = UNDERTALE.gameState.maxHealth;
                 this.updateStats();
            } else { // Disable save button if not explicitly a save point, unless AI enables it
                 if (UNDERTALE.gameState.flags.canSave && !location.isSavePoint) { this.setFlag('canSave', false); }
             }
            if (!actionTaken && location.shop) {
                const shop = UNDERTALE.gameData.shops[location.shop.toUpperCase()];
                if (shop) { actionTaken = true; this.typeText(`\n\n* You've entered ${shop.name}. Type 'shop' to browse.\n`); }
            }
            this.updateSaveButtonState(); // Update based on flags
            if (!actionTaken && this.commandInput && document.activeElement !== this.commandInput) this.commandInput.focus();
        };
        const estimatedTypingTime = fullLocationText.length * this.textSpeed + 500;
        this.time.delayedCall(estimatedTypingTime, handlePostTextActions);
    }

    typeText(text, clearQueue = false) {
        const filteredText = typeof text === 'string' ? text.replace(/\([\s\S]*?\)/g, '').trim() : '';
        if (!filteredText || !this.textDisplay) return; // Exit if no text or display removed

        if (this.isTyping) {
            if (clearQueue) {
                this.textQueue = [filteredText]; this.textComplete = true;
            } else if (!this.textQueue.length || this.textQueue[this.textQueue.length - 1] !== filteredText) {
                this.textQueue.push(filteredText);
            }
            return;
        }

        this.isTyping = true; this.textComplete = false;
        this.fullText = filteredText; this.textIndex = 0;

        if (clearQueue) this.textDisplay.setText('');
        else if (this.textDisplay.text !== '') this.textDisplay.text += '\n';

        if (!this.textSound || this.textSound.key !== 'sfx-text') {
            if (this.cache.audio.exists('sfx-text')) this.textSound = this.sound.add('sfx-text', { volume: 0.4 });
            else this.textSound = null;
        }
        if (this.textTimer) this.textTimer.remove();

        this.textTimer = this.time.addEvent({
            delay: this.textSpeed,
            callback: () => {
                if (!this.textDisplay) { // Safety check if scene/UI destroyed mid-typing
                    if (this.textTimer) this.textTimer.remove();
                    this.isTyping = false;
                    return;
                }
                if (this.textComplete) {
                     if (this.textTimer) this.textTimer.remove();
                     this.textDisplay.setText(this.fullText);
                     this.processTextQueue(); return;
                 }
                if (this.textIndex < this.fullText.length) {
                    const char = this.fullText[this.textIndex];
                    this.textDisplay.text += char;
                    if (char !== ' ' && char !== '\n' && this.textSound && !this.textSound.isPlaying) this.textSound.play();
                    this.textIndex++;
                } else {
                    this.textComplete = true; this.isTyping = false;
                    if (this.textTimer) this.textTimer.remove();
                    this.processTextQueue();
                }
            },
            loop: true
        });
    }

    processTextQueue() {
        if (this.textQueue.length > 0) {
            const nextText = this.textQueue.shift();
            this.time.delayedCall(150, () => { this.typeText(nextText, false); });
        } else {
            this.isTyping = false;
            if (this.commandInput && document.activeElement !== this.commandInput && !this.inventoryPanel && !this.shopPanel) {
                this.commandInput.focus();
            }
        }
    }

    async handleCommand() {
        if (this.isAiGenerating || !this.commandInput) return;
        const commandInputText = this.commandInput.value.trim();
        if (!commandInputText) return;

        const command = commandInputText.toLowerCase();
        // History, Clear Input, Stop Typing, Echo...
        if (!this.commandHistory.length || this.commandHistory[this.commandHistory.length - 1] !== command) this.commandHistory.push(command);
        if (this.commandHistory.length > 20) this.commandHistory.shift();
        this.historyIndex = -1; this.commandInput.value = '';
        if (this.isTyping && this.textTimer) { this.textComplete = true; this.textTimer.remove(); this.textQueue = []; this.isTyping = false; }
        this.choicesContainer.removeAll(true);
        this.typeText(`\n> ${commandInputText}`, false);
        if(this.cache.audio.exists('sfx-select')) this.sound.play('sfx-select');

        // Process Command
        const commandParts = command.split(' ').filter(Boolean);
        const action = commandParts[0];
        const target = commandParts.slice(1).join(' ');
        console.log(`Processing command: action='${action}', target='${target}'`);

        const builtInCommands = {
            'inventory': this.showInventory, 'inv': this.showInventory, 'i': this.showInventory,
            'stats': this.showStats,
            'save': () => { // Only allow if button is active
                 if (UNDERTALE.gameState.flags.canSave === true) {
                    this.saveGame(UNDERTALE.gameState.currentLocation);
                    this.typeText("* Game Saved.", false);
                    if(this.cache.audio.exists('sfx-save')) this.sound.play('sfx-save');
                 } else {
                    this.typeText("* (You can't save right now.)", false);
                 }
            },
            'load': () => this.loadSavedGame(true),
            'help': this.showHelp,
            'clear': () => { if(this.textDisplay) this.textDisplay.setText(''); if(this.commandInput) this.commandInput.focus(); },
            'quit': () => this.scene.start('TitleScene'),
            'go': this.movePlayer, 'move': this.movePlayer, 'walk': this.movePlayer,
            'north': () => this.movePlayer('north'), 'south': () => this.movePlayer('south'),
            'east': () => this.movePlayer('east'), 'west': () => this.movePlayer('west'),
            'forward': () => this.movePlayer('forward'), 'back': () => this.movePlayer('back'),
            'up': () => this.movePlayer('up'), 'down': () => this.movePlayer('down'),
            'look': () => this.displayLocation(UNDERTALE.gameState.currentLocation),
            'examine': () => this.displayLocation(UNDERTALE.gameState.currentLocation),
            'take': this.takeItem, 'get': this.takeItem, 'pickup': this.takeItem,
            'use': this.useInventoryItem,
            'shop': this.openShop, 'buy': this.buyItemFromCommand,
        };

        if (builtInCommands[action]) {
             console.log("Executing built-in command:", action);
             if (['go', 'move', 'walk', 'take', 'pickup', 'get', 'use', 'buy'].includes(action)) builtInCommands[action].call(this, target || commandParts[1]);
             else builtInCommands[action].call(this);
        } else if (DeepseekAPI && DeepseekAPI.isAvailable()) {
            // Handle via AI
            console.log("Command not built-in, sending to AI:", commandInputText);
            this.isAiGenerating = true;
            const thinkingMsg = "* Thinking...";
            this.typeText(thinkingMsg, false);
            await new Promise(resolve => this.time.delayedCall(thinkingMsg.length * this.textSpeed + 100, resolve));

            // Construct Prompt (using prompt from previous response)
            const [areaId, locId] = UNDERTALE.gameState.currentLocation.split('.');
            const areaName = UNDERTALE.gameData.areas[areaId.toUpperCase()]?.name || areaId;
            const locName = UNDERTALE.gameData.areas[areaId.toUpperCase()]?.locations[locId.toUpperCase()]?.name || locId;
            let prompt = `You are playing a text adventure game based on Undertale... IMPORTANT: If the action results in obtaining an item, end with "ACTION_RESULT: OBTAINED [ITEM_ID]". ... If an event should trigger, end with "ACTION_RESULT: TRIGGER_EVENT [EVENT_ID]". If saving should be enabled, end with "ACTION_RESULT: SET_FLAG canSave true". ...`; // Keep full prompt
            const aiResponse = await DeepseekAPI.generateText(prompt, 120);

            if (!this.scene.isActive(this.key)) { this.isAiGenerating = false; return; }
            this.isAiGenerating = false;
            const lastThinkingIndex = this.textDisplay.text.lastIndexOf(thinkingMsg);
            if (lastThinkingIndex > -1) this.textDisplay.setText(this.textDisplay.text.substring(0, lastThinkingIndex).trimEnd());

            let aiResponseText = `* (Nothing interesting happens in response to '${command}'.)`;
            if (aiResponse) {
                let filteredResponse = aiResponse.replace(/\([\s\S]*?\)/g, '').trim();
                const obtainMatch = filteredResponse.match(/ACTION_RESULT:\s*OBTAINED\s*([A-Z_0-9]+)$/);
                const eventMatch = filteredResponse.match(/ACTION_RESULT:\s*TRIGGER_EVENT\s*([a-z_0-9]+)$/i);
                const flagMatch = filteredResponse.match(/ACTION_RESULT:\s*SET_FLAG\s*([a-zA-Z_0-9]+)\s*(true|false)$/i);

                if (obtainMatch && obtainMatch[1]) {
                    const itemId = obtainMatch[1]; aiResponseText = filteredResponse.substring(0, obtainMatch.index).trim();
                    this.addToInventory(itemId); aiResponseText += `\n* (You obtained the ${UNDERTALE.gameData.items[itemId]?.name || itemId}!)`;
                    if(this.cache.audio.exists('sfx-item')) this.sound.play('sfx-item');
                } else if (eventMatch && eventMatch[1]) {
                     const eventId = eventMatch[1]; aiResponseText = filteredResponse.substring(0, eventMatch.index).trim();
                     if(aiResponseText) this.typeText(`\n* ${aiResponseText}\n`, false);
                     this.triggerEvent(eventId); return; // Event handles flow
                 } else if (flagMatch && flagMatch[1]) {
                     const flagName = flagMatch[1]; const flagValue = flagMatch[2].toLowerCase() === 'true';
                     aiResponseText = filteredResponse.substring(0, flagMatch.index).trim(); this.setFlag(flagName, flagValue);
                 } else { aiResponseText = filteredResponse; } // Use whole filtered response if no tag
                 if (!aiResponseText || aiResponseText === '*') aiResponseText = `* ...`;
            } else { aiResponseText += "\n* (AI generation failed)"; }
            this.typeText(`\n${aiResponseText}\n`, false);

        } else {
            this.typeText(`* (You don't know how to '${command}'.)\n`);
        }
    }

    showInventory() {
        if (this.inventoryPanel || this.shopPanel || !this.cameras.main) return;
        this.inventoryPanel = true;
        const centerX = this.cameras.main.width / 2; const centerY = this.cameras.main.height / 2;
        const width = this.cameras.main.width; const height = this.cameras.main.height;
        const uiFont = 'DTM-Mono, monospace';

        this.inventoryDisplayGroup = this.add.group();
        const dimmer = this.add.rectangle(centerX, centerY, width, height, 0x000000, 0.8).setDepth(19).setInteractive();
        this.inventoryDisplayGroup.add(dimmer);
        const panelWidth = 600; const panelHeight = 400;
        const panel = this.add.rectangle(centerX, centerY, panelWidth, panelHeight, 0x000000).setStrokeStyle(2, '#ffffff').setDepth(20);
        this.inventoryDisplayGroup.add(panel);
        const title = this.add.text(centerX, centerY - panelHeight / 2 + 30, 'INVENTORY', { fontFamily: uiFont, fontSize: '24px', color: '#ffff00' }).setOrigin(0.5).setDepth(21);
        this.inventoryDisplayGroup.add(title);

        const sectionStyle = { fontFamily: uiFont, fontSize: '18px', color: '#aaaaaa' };
        const itemStyle = { fontFamily: uiFont, fontSize: '16px', color:'#ffffff', padding: { y: 3 } };
        const itemHoverStyle = { color: '#ffff00' };
        let currentY = title.y + title.height + 10;
        const itemX = centerX - panelWidth / 2 + 30;

        // Equipped Weapon
        this.inventoryDisplayGroup.add(this.add.text(itemX, currentY, 'WEAPON:', sectionStyle).setOrigin(0, 0).setDepth(21)); currentY += 25;
        const weaponId = UNDERTALE.gameState.equippedWeapon; const weapon = weaponId ? UNDERTALE.gameData.items[weaponId] : null;
        const weaponText = weapon ? `* ${weapon.name}` : '* None';
        this.inventoryDisplayGroup.add(this.add.text(itemX + 10, currentY, weaponText, itemStyle).setOrigin(0, 0).setDepth(21)); currentY += 30;
        // Equipped Armor
        this.inventoryDisplayGroup.add(this.add.text(itemX, currentY, 'ARMOR:', sectionStyle).setOrigin(0, 0).setDepth(21)); currentY += 25;
        const armorId = UNDERTALE.gameState.equippedArmor; const armor = armorId ? UNDERTALE.gameData.items[armorId] : null;
        const armorText = armor ? `* ${armor.name}` : '* None';
        this.inventoryDisplayGroup.add(this.add.text(itemX + 10, currentY, armorText, itemStyle).setOrigin(0, 0).setDepth(21)); currentY += 40;
        // Items List
        this.inventoryDisplayGroup.add(this.add.text(itemX, currentY, 'ITEMS:', sectionStyle).setOrigin(0, 0).setDepth(21)); currentY += 25;
        const usableItems = UNDERTALE.gameState.inventory.filter(id => { const itemData = UNDERTALE.gameData.items[id]; return itemData && (itemData.type === 'healing' || itemData.type === 'key' || itemData.battleUse); });
        if (usableItems.length === 0) { this.inventoryDisplayGroup.add(this.add.text(itemX + 10, currentY, '* Empty', itemStyle).setOrigin(0, 0).setDepth(21)); }
        else { usableItems.forEach((itemId) => { if (itemId === weaponId || itemId === armorId) return; const item = UNDERTALE.gameData.items[itemId]; if (item) { const itemButton = this.add.text(itemX + 10, currentY, `* ${item.name}`, itemStyle).setOrigin(0, 0).setInteractive({ useHandCursor: true }).setDepth(21).on('pointerdown', () => { this.useInventoryItem(item.name); this.closeInventory(); }).on('pointerover', () => itemButton.setStyle(itemHoverStyle)).on('pointerout', () => itemButton.setStyle({ color: itemStyle.color })); this.inventoryDisplayGroup.add(itemButton); currentY += itemButton.height + 5; } }); }
        // Close Button
        const closeButton = this.add.text(centerX, centerY + panelHeight / 2 - 30, '[ CLOSE ]', { fontFamily: uiFont, fontSize: '18px', color: '#000000', backgroundColor: '#ffffff', padding: { x: 15, y: 8 } }).setOrigin(0.5).setDepth(21).setInteractive({ useHandCursor: true }).on('pointerdown', this.closeInventory, this).on('pointerover', () => closeButton.setColor('#555555')).on('pointerout', () => closeButton.setColor('#000000'));
        this.inventoryDisplayGroup.add(closeButton);
    }

    closeInventory() {
        if (!this.inventoryPanel) return;
        this.inventoryPanel = false;
        if (this.inventoryDisplayGroup) this.inventoryDisplayGroup.destroy(true, true);
        this.inventoryDisplayGroup = null;
        if(this.commandInput) this.commandInput.focus();
    }

    useInventoryItem(itemName) { /* ... (keep revised version) ... */ }
    openShop() { /* TODO: Add Styling */ console.log("TODO: Style openShop"); this.typeText("* Shop UI needs styling."); }
    buyItem(itemRef, itemData, shop) { /* ... */ }
    buyItemFromCommand(itemName) { /* ... */ }
    closeShop() { /* TODO: Add Styling */ console.log("TODO: Style closeShop"); if (this.shopDisplayGroup) this.shopDisplayGroup.destroy(true, true); this.shopDisplayGroup = null; this.shopPanel = false; const [areaId] = UNDERTALE.gameState.currentLocation.split('.'); this.playAreaMusic(areaId.toUpperCase()); if(this.commandInput) this.commandInput.focus(); }
    showStats() { /* ... (keep version from previous response) ... */ }
    showHelp() { /* ... (keep version from previous response) ... */ }
    updateStats() { /* ... (keep corrected version) ... */ }
    saveGame(locationId) { /* ... (keep version from previous response) ... */ }
    loadSavedGame(showMessage = true) { /* ... (keep version from previous response) ... */ }
    triggerEvent(eventId) { /* ... (keep version from previous response) ... */ }
    completeEvent(eventId, eventData) { /* ... (keep version from previous response, calls updateSaveButtonState) ... */ }
    async displayCutscene(event) { /* ... (keep async API version, filters notes) ... */ }
    async displayDialogue(event) { /* ... (keep async API version, filters notes) ... */ }
    startBattle(event) { /* ... (keep version from previous response) ... */ }
    displayChoices(event) { /* TODO: Add Styling */ console.log("TODO: Style displayChoices"); this.choicesContainer.removeAll(true); if (event.prompt) this.typeText(`* ${event.prompt}\n`); let y = 0; event.choices.forEach(choice => { const button = this.add.text(0, y, `> ${choice.text}`, {fontFamily:'DTM-Mono', fontSize:'18px', color:'#ffff00', backgroundColor:'#111', padding:{x:15,y:8}}).setStroke('#ffffff',1).setInteractive({useHandCursor:true}).setOrigin(0.5,0).on('pointerdown', () => { if(this.cache.audio.exists('sfx-select')) this.sound.play('sfx-select'); this.choicesContainer.removeAll(true); if(!UNDERTALE.gameState.completedEvents.includes(event.id)) UNDERTALE.gameState.completedEvents.push(event.id); this.triggerEvent(choice.outcome); }).on('pointerover',()=>button.setStyle({color:'#ffffff'})).on('pointerout',()=>button.setStyle({color:'#ffff00'})); this.choicesContainer.add(button); y+=button.height+10; }); this.choicesContainer.setPosition(this.cameras.main.width/2, this.cameras.main.height - this.inputBox.height - this.choicesContainer.getBounds().height-30); }
    handleFlagSetEvent(event) { /* ... (keep version from previous response) ... */ }
    handleConditionalEvent(event) { /* ... (keep version from previous response) ... */ }
    handleGiveItemEvent(event) { /* ... (keep version from previous response) ... */ }
    handleSequenceEvent(event) { /* ... (keep version from previous response) ... */ }
    setFlag(flag, value) { /* ... (keep version from previous response, calls updateSaveButtonState) ... */ }
    updateSaveButtonState() { /* ... (keep corrected version) ... */ }
    gameOver(message) { /* ... (keep corrected version) ... */ }
    resetGame() { /* ... (keep corrected version) ... */ }

} // End of GameScene Class