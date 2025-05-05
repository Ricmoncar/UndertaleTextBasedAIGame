// js/scenes/ApiKeyScene.js
class ApiKeyScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ApiKeyScene' });
        this.apiKeyInput = null; // Reference to the DOM input element
    }

    create() {
        console.log("ApiKeyScene started");
        this.cameras.main.setBackgroundColor('#000000');
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        const uiFont = 'DTM-Mono, monospace';

        // --- Instructions (Phaser Text) ---
        this.add.text(centerX, centerY - 100, 'Enter Deepseek API Key (Optional)', {
            fontFamily: uiFont, fontSize: '24px', color: '#ffffff'
        }).setOrigin(0.5);
        this.add.text(centerX, centerY - 60, 'Leave blank and press Enter to use default text.', {
            fontFamily: uiFont, fontSize: '16px', color: '#aaaaaa'
        }).setOrigin(0.5);

        // --- Create and Position DOM Input Element ---
        const inputWidth = 400; // Desired base width
        const inputHeight = 30; // Desired base height
        const gameContainer = document.getElementById('game-container');

        if (gameContainer) {
            // Get Phaser canvas position and size
            const canvasBounds = this.sys.game.canvas.getBoundingClientRect();
            const scaleManager = this.sys.scale;

            // Calculate scale factor (assuming FIT or similar scaling)
            const scale = Math.min(canvasBounds.width / this.sys.game.config.width, canvasBounds.height / this.sys.game.config.height);

            // Calculate absolute position for the *center* of where the input should be
            const inputCenterXPage = canvasBounds.left + (centerX * scale);
            const inputCenterYPage = canvasBounds.top + (centerY * scale); // Centered vertically too

            // Calculate top-left based on scaled width/height to center it
            const inputElementTop = inputCenterYPage - (inputHeight * scale / 2);
            const inputElementLeft = inputCenterXPage - (inputWidth * scale / 2);
            const inputElementWidth = inputWidth * scale;
            const inputElementHeight = inputHeight * scale;

            // Create the input element
            const inputElement = document.createElement('input');
            inputElement.type = 'password'; // Keep it hidden
            inputElement.id = 'api-key-input'; // Use ID from CSS if desired
            inputElement.style.position = 'absolute';
            inputElement.style.width = `${inputElementWidth}px`;
            inputElement.style.height = `${inputElementHeight}px`;
            inputElement.style.left = `${inputElementLeft}px`;
            inputElement.style.top = `${inputElementTop}px`;
            // Apply styles (scaling relevant ones)
            inputElement.style.border = `${Math.max(1, 2 * scale)}px solid #fff`; // Scale border, min 1px
            inputElement.style.borderRadius = `${5 * scale}px`; // Scale border radius
            inputElement.style.backgroundColor = '#000';
            inputElement.style.color = '#fff';
            inputElement.style.fontSize = `${16 * scale}px`; // Scale font size
            inputElement.style.fontFamily = `"${uiFont}"`; // Ensure quotes for font name
            inputElement.style.padding = `${5 * scale}px`; // Scale padding
            inputElement.placeholder = 'sk-...';
            inputElement.style.outline = 'none'; // Remove default focus outline
            inputElement.style.boxSizing = 'border-box'; // Include padding/border in size

            gameContainer.appendChild(inputElement);
            this.apiKeyInput = inputElement; // Store reference

            // Auto-focus the input after a short delay
            this.time.delayedCall(150, () => {
                if (this.apiKeyInput) { // Check if it still exists
                     this.apiKeyInput.focus();
                }
             });

            // Add Enter key listener directly to the input element
            inputElement.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault(); // Prevent potential form submission if wrapped
                    this.submitApiKey();
                }
            });

        } else {
            console.error("Game container #game-container not found for API key input.");
            // Optionally display a Phaser-based error message if the container is missing
             this.add.text(centerX, centerY, 'Error: Missing game container.', { color: '#ff0000', fontSize: '18px' }).setOrigin(0.5);
        }

        // --- Submit Instructions (Phaser Text) ---
        this.add.text(centerX, centerY + 60, 'Press Enter to Continue', { // Positioned below input area
            fontFamily: uiFont, fontSize: '18px', color: '#ffffff'
        }).setOrigin(0.5);

        // Add listener for Enter key on the scene (as a fallback, might not be needed now)
        // this.input.keyboard.once('keydown-ENTER', this.submitApiKey, this);
    }

    submitApiKey() {
        // Prevent double submission if Enter is pressed quickly on both listeners
        if (!this.scene.isActive(this.key)) return;

        let apiKey = '';
        if (this.apiKeyInput) {
            apiKey = this.apiKeyInput.value.trim();
        } else {
            console.warn("API key input element not found on submit.");
            // Decide how to handle this - proceed without key or show error?
             // For now, proceed without key:
             sessionStorage.removeItem('deepseekApiKey');
             console.log("Proceeding without API Key (input element missing).");
             this.startNextScene();
            return;
        }

        if (apiKey && apiKey.startsWith('sk-')) { // Basic validation
            try {
                sessionStorage.setItem('deepseekApiKey', apiKey);
                console.log("Deepseek API Key stored in sessionStorage.");
            } catch (e) {
                console.error("Failed to store API key in sessionStorage:", e);
                // Alert user? Use Phaser text?
                alert("Could not store API Key. AI features may be disabled.");
            }
        } else {
            sessionStorage.removeItem('deepseekApiKey'); // Ensure it's removed if blank or invalid format
            if (apiKey) { // Log only if something non-empty was entered but invalid
                 console.log("Invalid or blank API Key entered. Using default text.");
            } else {
                 console.log("No API Key entered. Using default text.");
            }
        }

        this.startNextScene();
    }

    startNextScene() {
        // Clean up DOM element before changing scene
        this.cleanupInputElement();
        // Stop listening for Enter key if listener was added to scene input
        this.input.keyboard.off('keydown-ENTER', this.submitApiKey, this);

        // Proceed to Title Scene
        console.log("Starting TitleScene...");
        this.scene.start('TitleScene');
    }

    // Helper for cleanup
    cleanupInputElement() {
         if (this.apiKeyInput && this.apiKeyInput.parentNode) {
             // Remove specific listeners if needed (though removing element handles most cases)
             // this.apiKeyInput.removeEventListener('keydown', ...);
             this.apiKeyInput.parentNode.removeChild(this.apiKeyInput);
         }
         this.apiKeyInput = null;
    }

    // Cleanup on shutdown
    shutdown() {
         console.log("ApiKeyScene shutdown");
         this.cleanupInputElement();
         // Remove scene-level listener just in case
         this.input.keyboard.off('keydown-ENTER', this.submitApiKey, this);
    }
}