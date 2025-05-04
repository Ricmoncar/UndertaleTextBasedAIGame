// index.js
// This file ensures all JS files are loaded in the correct order
document.addEventListener('DOMContentLoaded', function() {
    // Load data files first
    loadScript('js/data/areas.js');
    loadScript('js/data/characters.js');
    loadScript('js/data/items.js');
    loadScript('js/data/battles.js');
    loadScript('js/data/events.js');
    loadScript('js/data/shops.js');
    loadScript('js/data/puzzles.js');
    
    // Then load the data combiner
    loadScript('js/data.js', function() {
        // After data is loaded, load the functional files
        loadScript('js/textAnimation.js');
        loadScript('js/inventory.js');
        loadScript('js/saveload.js');
        loadScript('js/battle.js');
        loadScript('js/ui.js');
        loadScript('js/resourceFallbacks.js');
        
        // Load the main game file last
        loadScript('js/game.js');
    });
});

// Helper function for loading scripts sequentially
function loadScript(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    
    if (callback) {
        script.onload = callback;
    }
    
    document.head.appendChild(script);
}