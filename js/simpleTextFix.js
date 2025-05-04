/**
 * Simple Text Display Fix for Undertale Text Adventure
 * This minimal fix addresses only the text overlap issues
 */
(function() {
    // Wait for window to load
    window.addEventListener('load', function() {
        console.log("Applying simple text display fix...");
        applyTextDisplayFix();
    });

    function applyTextDisplayFix() {
        // Fix game text styling
        const gameText = document.getElementById('game-text');
        if (gameText) {
            // Apply styles directly to element
            gameText.style.whiteSpace = 'pre-wrap';
            gameText.style.lineHeight = '1.5';
            gameText.style.overflowY = 'auto';
            gameText.style.maxHeight = '200px';
            gameText.style.padding = '10px';
            gameText.style.backgroundColor = '#000';
        }

        // Override appendToGameText function
        if (typeof window.appendToGameText === 'function') {
            const originalAppendToGameText = window.appendToGameText;
            window.appendToGameText = function(text) {
                const gameText = document.getElementById('game-text');
                if (!gameText) return;
                
                // Create a new paragraph for each text
                const para = document.createElement('p');
                para.textContent = text;
                para.style.marginBottom = '10px';
                para.style.position = 'static';
                
                // Append to game text
                gameText.appendChild(para);
                
                // Scroll to bottom
                gameText.scrollTop = gameText.scrollHeight;
            };
            console.log("Overrode appendToGameText function");
        }

        // Override showHelp to prevent overlapping text
        if (typeof window.showHelp === 'function') {
            const originalShowHelp = window.showHelp;
            window.showHelp = function() {
                const gameText = document.getElementById('game-text');
                if (!gameText) return;
                
                // Clear existing content
                gameText.innerHTML = '';
                
                // Add help text
                const helpText = document.createElement('div');
                helpText.innerHTML = `<strong>Available commands:</strong><br>
                - north, n, up: Move north/up<br>
                - south, s, down: Move south/down<br>
                - east, e, right: Move east/right<br>
                - west, w, left: Move west/left<br>
                - forward, f: Move forward<br>
                - back, b: Move back<br>
                - look, examine: Look around<br>
                - inventory, i: Show inventory<br>
                - use [item]: Use an item<br>
                - talk [character]: Talk to a character<br>
                - help: Show this help text`;
                helpText.style.lineHeight = '1.5';
                
                gameText.appendChild(helpText);
            };
            console.log("Overrode showHelp function");
        }

        // Override processCommand to handle movement commands
        if (typeof window.processCommand === 'function') {
            const originalProcessCommand = window.processCommand;
            window.processCommand = function(input) {
                const command = input.toLowerCase();
                
                // Handle specific commands to prevent overlap
                if (command === "help") {
                    window.showHelp();
                    return;
                }
                
                // For movement commands, clear previous content
                const movementCommands = ["north", "n", "up", "south", "s", "down", 
                                        "east", "e", "right", "west", "w", "left",
                                        "forward", "f", "back", "b"];
                
                if (movementCommands.includes(command)) {
                    // Clear any existing movement text
                    const gameText = document.getElementById('game-text');
                    const previousCommands = gameText.querySelectorAll('.movement-command');
                    previousCommands.forEach(el => el.remove());
                    
                    // Create new movement text
                    const moveText = document.createElement('p');
                    moveText.className = 'movement-command';
                    
                    if (command === "north" || command === "n" || command === "up") {
                        moveText.textContent = "Move north/up";
                        window.appendToGameText("You move north.");
                    } else if (command === "south" || command === "s" || command === "down") {
                        moveText.textContent = "Move south/down";
                        window.appendToGameText("You move south.");
                    } else if (command === "east" || command === "e" || command === "right") {
                        moveText.textContent = "Move east/right";
                        window.appendToGameText("You move east.");
                    } else if (command === "west" || command === "w" || command === "left") {
                        moveText.textContent = "Move west/left";
                        window.appendToGameText("You move west.");
                    } else if (command === "forward" || command === "f") {
                        moveText.textContent = "Move forward";
                        window.appendToGameText("You move forward.");
                    } else if (command === "back" || command === "b") {
                        moveText.textContent = "Move back";
                        window.appendToGameText("You move back.");
                    }
                    
                    return; // Skip the original processCommand
                }
                
                // Use original function for other commands
                originalProcessCommand(input);
            };
            console.log("Overrode processCommand function");
        }

        console.log("Simple text display fix applied successfully");
    }
})();