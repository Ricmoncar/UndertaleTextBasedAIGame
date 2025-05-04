/**
 * Enhanced Text Display Fix for Undertale Text Adventure
 * Fixes the overlapping text issues specifically for the Undertale game interface
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Applying enhanced text display fixes...");
    
    // Apply all fixes
    initializeTextDisplayFixes();
    overrideTextFunctions();
    setupHelpOverlay();
    
    console.log("Text display fixes applied successfully!");
});

/**
 * Initialize text display fixes
 */
function initializeTextDisplayFixes() {
    // Make sure command result area exists
    if (!document.getElementById('command-result-area')) {
        const commandResultArea = document.createElement('div');
        commandResultArea.id = 'command-result-area';
        commandResultArea.className = 'command-display';
        
        // Insert before the action menu
        const gameArea = document.getElementById('game-area');
        const actionMenu = document.getElementById('action-menu');
        
        if (gameArea && actionMenu) {
            gameArea.insertBefore(commandResultArea, actionMenu);
        }
    }
    
    // Make sure game text container exists
    if (!document.getElementById('game-text-container')) {
        const gameText = document.getElementById('game-text');
        if (gameText && gameText.parentNode) {
            // Create container
            const container = document.createElement('div');
            container.id = 'game-text-container';
            
            // Replace game text with container
            gameText.parentNode.insertBefore(container, gameText);
            
            // Move game text into container
            gameText.parentNode.removeChild(gameText);
            container.appendChild(gameText);
            
            // Add scrollable class
            gameText.className = 'scrollable-content';
        }
    }
    
    // Add styles for new elements
    const style = document.createElement('style');
    style.textContent = `
        #game-text-container {
            flex: 1;
            overflow: hidden;
            border: 1px solid #333;
            margin-bottom: 10px;
        }
        
        .scrollable-content {
            height: 250px;
            overflow-y: auto;
            padding: 10px;
            font-family: 'Courier New', monospace;
            white-space: pre-wrap;
            line-height: 1.5;
        }
        
        .command-display {
            padding: 10px;
            border: 1px solid #333;
            margin-bottom: 10px;
            background-color: #111;
            max-height: 80px;
            overflow-y: auto;
        }
        
        .text-entry {
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 1px solid #333;
        }
        
        .text-entry:last-child {
            border-bottom: none;
        }
        
        .player-input {
            color: #ffff00;
            font-weight: bold;
        }
        
        .help-container {
            background-color: #000;
            border: 2px solid #fff;
            padding: 20px;
            width: 80%;
            max-width: 600px;
        }
        
        #help-text {
            margin: 20px 0;
            height: 200px;
        }
        
        #help-text p {
            margin-bottom: 5px;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Override text handling functions
 */
function overrideTextFunctions() {
    // Override appendToGameText function
    window.appendToGameText = function(text) {
        const gameText = document.getElementById('game-text');
        if (!gameText) return;
        
        // Create a new text entry
        const entry = document.createElement('div');
        entry.className = 'text-entry';
        entry.textContent = text;
        
        // Append the new entry
        gameText.appendChild(entry);
        
        // Scroll to bottom
        gameText.scrollTop = gameText.scrollHeight;
    };
    
    // Override showDialogue function
    window.showDialogue = function(text, character = null) {
        const gameText = document.getElementById('game-text');
        if (!gameText) return;
        
        // Create a new text entry
        const entry = document.createElement('div');
        entry.className = 'text-entry dialogue';
        
        if (character) {
            // Create character name element
            const nameSpan = document.createElement('span');
            nameSpan.className = 'character-name';
            nameSpan.textContent = character + ': ';
            nameSpan.style.fontWeight = 'bold';
            
            // Add name and text
            entry.appendChild(nameSpan);
            entry.appendChild(document.createTextNode(text));
        } else {
            entry.textContent = text;
        }
        
        // Append the new entry
        gameText.appendChild(entry);
        
        // Scroll to bottom
        gameText.scrollTop = gameText.scrollHeight;
    };
    
    // Override clearGameText function
    window.clearGameText = function() {
        const gameText = document.getElementById('game-text');
        if (gameText) {
            gameText.innerHTML = '';
        }
    };
    
    // Override handlePlayerInput function
    const originalHandlePlayerInput = window.handlePlayerInput;
    window.handlePlayerInput = function() {
        const input = document.getElementById('player-input').value.trim();
        document.getElementById('player-input').value = '';
        
        if (input === '') return;
        
        // Create a new text entry for player input
        const gameText = document.getElementById('game-text');
        if (gameText) {
            const entry = document.createElement('div');
            entry.className = 'text-entry player-input';
            entry.textContent = '> ' + input;
            
            // Append the new entry
            gameText.appendChild(entry);
            
            // Scroll to bottom
            gameText.scrollTop = gameText.scrollHeight;
        }
        
        // Process the command
        processCommand(input);
    };
    
    // Override processCommand function
    const originalProcessCommand = window.processCommand;
    window.processCommand = function(input) {
        const command = input.toLowerCase();
        
        // Clear the command result area
        const commandResultArea = document.getElementById('command-result-area');
        if (commandResultArea) {
            commandResultArea.innerHTML = '';
        }
        
        // Handle help command specially
        if (command === 'help') {
            showHelpOverlay();
            return;
        }
        
        // Handle movement commands
        let commandResult = '';
        if (command === 'north' || command === 'n' || command === 'up') {
            commandResult = 'Move north/up';
            if (window.move) window.move('north');
        } else if (command === 'south' || command === 's' || command === 'down') {
            commandResult = 'Move south/down';
            if (window.move) window.move('south');
        } else if (command === 'east' || command === 'e' || command === 'right') {
            commandResult = 'Move east/right';
            if (window.move) window.move('east');
        } else if (command === 'west' || command === 'w' || command === 'left') {
            commandResult = 'Move west/left';
            if (window.move) window.move('west');
        } else if (command === 'forward' || command === 'f') {
            commandResult = 'Move forward';
            if (window.move) window.move('forward');
        } else if (command === 'back' || command === 'b') {
            commandResult = 'Move back';
            if (window.move) window.move('back');
        } else if (command === 'look' || command === 'examine') {
            commandResult = 'Looking around...';
            if (window.lookAround) window.lookAround();
        } else if (command === 'inventory' || command === 'i') {
            commandResult = 'Opening inventory...';
            if (window.showInventory) window.showInventory();
        } else {
            // Use original processCommand if it exists
            if (originalProcessCommand) {
                originalProcessCommand(input);
            } else {
                commandResult = "I'm not sure what you mean. Try a different command.";
                if (commandResultArea) {
                    const resultElement = document.createElement('div');
                    resultElement.textContent = commandResult;
                    commandResultArea.appendChild(resultElement);
                }
            }
        }
        
        // Display command result if not empty
        if (commandResult && commandResultArea) {
            const resultElement = document.createElement('div');
            resultElement.textContent = commandResult;
            commandResultArea.appendChild(resultElement);
        }
    };
    
    // Override the showHelp function
    window.showHelp = function() {
        showHelpOverlay();
    };
}

/**
 * Set up help overlay
 */
function setupHelpOverlay() {
    // Check if help overlay exists
    let helpOverlay = document.getElementById('help-overlay');
    
    if (!helpOverlay) {
        // Create help overlay
        helpOverlay = document.createElement('div');
        helpOverlay.id = 'help-overlay';
        helpOverlay.className = 'overlay';
        
        // Create help container
        const helpContainer = document.createElement('div');
        helpContainer.className = 'help-container';
        
        // Create heading
        const heading = document.createElement('h3');
        heading.textContent = 'Available Commands';
        
        // Create help text
        const helpText = document.createElement('div');
        helpText.id = 'help-text';
        helpText.className = 'scrollable-content';
        helpText.innerHTML = `
            <p>- north, n, up: Move north/up</p>
            <p>- south, s, down: Move south/down</p>
            <p>- east, e, right: Move east/right</p>
            <p>- west, w, left: Move west/left</p>
            <p>- forward, f: Move forward</p>
            <p>- back, b: Move back</p>
            <p>- look, examine: Look around</p>
            <p>- inventory, i: Show inventory</p>
            <p>- use [item]: Use an item</p>
            <p>- talk [character]: Talk to a character</p>
            <p>- help: Show this help text</p>
        `;
        
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.id = 'close-help';
        closeButton.textContent = 'Close';
        closeButton.addEventListener('click', function() {
            helpOverlay.classList.remove('active');
        });
        
        // Assemble help overlay
        helpContainer.appendChild(heading);
        helpContainer.appendChild(helpText);
        helpContainer.appendChild(closeButton);
        helpOverlay.appendChild(helpContainer);
        
        // Add to document
        document.body.appendChild(helpOverlay);
    }
    
    // Add event listener for close button
    const closeButton = document.getElementById('close-help');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            helpOverlay.classList.remove('active');
        });
    }
}

/**
 * Show the help overlay
 */
function showHelpOverlay() {
    const helpOverlay = document.getElementById('help-overlay');
    if (helpOverlay) {
        helpOverlay.classList.add('active');
    }
}