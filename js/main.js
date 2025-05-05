// main.js

// When the document is ready
window.onload = function() {
    // Hide loading text (optional - could also be done in BootScene create)
    const loadingText = document.getElementById('loading-text');
    if (loadingText) {
        loadingText.style.display = 'none';
    }

    // Create the Phaser game using the config.
    // This automatically adds the scenes listed in config.scene
    // and starts the *first* scene in that array (BootScene).
    const game = new Phaser.Game(config);

    // No need to manually add or start scenes here if they are in the config.

    console.log('Phaser Game instance created. BootScene should start automatically.');
    // You could add a check later if needed:
    // game.events.on('ready', () => console.log('Phaser is ready!'));
};
