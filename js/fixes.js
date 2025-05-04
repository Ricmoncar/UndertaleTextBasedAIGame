/**
 * UNDERTALE Text Adventure Game - Complete Fixes
 * This file contains all fixes for UI, button functionality, and font issues
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Applying comprehensive fixes to Undertale Text Adventure...");
    
    // Apply all fixes
    fixMenuStructure();
    fixButtonFunctionality();
    fixFontLoading();
    fixScreenTransitions();
    fixOverlappingElements();
    fixAISettings();
    
    console.log("All fixes applied successfully!");
});

/**
 * Fix 1: Menu Structure - Ensures proper layering and display of menus
 */
function fixMenuStructure() {
    console.log("Fixing menu structure...");
    
    // Fix title screen buttons - they're overlapping
    const titleScreen = document.getElementById('title-screen');
    if (titleScreen) {
        const menuOptions = titleScreen.querySelector('.menu-options');
        if (menuOptions) {
            // Clear current buttons and recreate them properly
            menuOptions.innerHTML = '';
            
            // Create New Game button
            const newGameBtn = document.createElement('button');
            newGameBtn.id = 'new-game-btn';
            newGameBtn.textContent = 'New Game';
            newGameBtn.addEventListener('click', function() {
                showScreen('character-creation');
            });
            menuOptions.appendChild(newGameBtn);
            
            // Create Load Game button
            const loadGameBtn = document.createElement('button');
            loadGameBtn.id = 'load-game-btn';
            loadGameBtn.textContent = 'Load Game';
            loadGameBtn.addEventListener('click', function() {
                showScreen('load-game');
                populateSaveSlots();
            });
            menuOptions.appendChild(loadGameBtn);
        }
    }
    
    // Ensure all screens have the correct z-index and positioning
    const screens = document.querySelectorAll('.screen');
    screens.forEach((screen, index) => {
        screen.style.zIndex = 10 + index;
        screen.classList.remove('active'); // Hide all screens initially
    });
    
    // Show only the title screen
    if (titleScreen) {
        titleScreen.classList.add('active');
    }
    
    // Add proper CSS for submenus to prevent overlapping
    const style = document.createElement('style');
    style.textContent = `
        .submenu {
            position: absolute;
            bottom: 70px;
            left: 0;
            width: 100%;
            background-color: #000;
            border-top: 2px solid #fff;
            z-index: 100;
        }
        
        .screen {
            display: none;
            width: 100%;
            height: 100%;
            padding: 20px;
            position: absolute;
            top: 0;
            left: 0;
            overflow-y: auto;
        }
        
        #inventory-screen, #menu-screen, #save-screen, #load-game {
            background-color: #000;
            z-index: 20;
        }
        
        .screen.active {
            display: block;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Fix 2: Button Functionality - Ensures all buttons work correctly
 */
function fixButtonFunctionality() {
    console.log("Fixing button functionality...");
    
    // Redefine core screen navigation function
    window.showScreen = function(screenId) {
        console.log("Showing screen:", screenId);
        // First hide all screens
        document.querySelectorAll(".screen").forEach(screen => {
            screen.classList.remove("active");
        });
        
        // Then show the requested screen
        const screenToShow = document.getElementById(screenId);
        if (screenToShow) {
            screenToShow.classList.add("active");
        } else {
            console.error(`Screen ${screenId} not found`);
        }
    };
    
    // Fix character creation screen
    const startGameBtn = document.getElementById('start-game-btn');
    if (startGameBtn) {
        startGameBtn.addEventListener('click', function() {
            const nameInput = document.getElementById('character-name');
            const playerName = nameInput.value.trim() || "Chara";
            
            // Create player
            if (window.GameState) {
                window.GameState.player.name = playerName.substring(0, 6);
                startGame();
            } else {
                console.error("GameState not found");
                alert("Error: Game state not initialized properly.");
            }
        });
    }
    
    // Fix inventory button
    const itemBtn = document.getElementById('item-btn');
    if (itemBtn) {
        itemBtn.addEventListener('click', function() {
            showScreen('inventory-screen');
            if (typeof window.populateInventory === 'function') {
                window.populateInventory();
            }
        });
    }
    
    // Fix menu button
    const menuBtn = document.getElementById('menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            showScreen('menu-screen');
        });
    }
    
    // Fix close inventory button
    const closeInventoryBtn = document.getElementById('close-inventory');
    if (closeInventoryBtn) {
        closeInventoryBtn.addEventListener('click', function() {
            showScreen('game-screen');
        });
    }
    
    // Fix AI settings link
    const aiSettingsLink = document.getElementById('ai-settings-link');
    if (aiSettingsLink) {
        aiSettingsLink.addEventListener('click', function(e) {
            e.preventDefault();
            showAISettings();
        });
    }
}

/**
 * Fix 3: Font Loading - Resolves font loading issues
 */
function fixFontLoading() {
    console.log("Fixing font loading...");
    
    // Add additional fallback fonts
    const fontStyle = document.createElement('style');
    fontStyle.textContent = `
        /* Font fallbacks */
        @font-face {
            font-family: 'Determination Mono';
            /* Use local fonts first if available */
            src: local('Courier New'), local('Courier'), local('monospace');
            font-weight: normal;
            font-style: normal;
        }
        
        body {
            font-family: 'Determination Mono', 'Courier New', monospace;
        }
        
        /* Fix webfont loading issues */
        .font-fallback {
            font-family: 'Courier New', monospace !important;
        }
    `;
    document.head.appendChild(fontStyle);
    
    // Add class to body to use fallback fonts immediately
    document.body.classList.add('font-fallback');
    
    // Remove the preload links that are causing errors
    const preloadLinks = document.querySelectorAll('link[rel="preload"]');
    preloadLinks.forEach(link => {
        link.remove();
    });
}

/**
 * Fix 4: Screen Transitions - Ensures proper screen navigation
 */
function fixScreenTransitions() {
    console.log("Fixing screen transitions...");
    
    // Fix showInventory function
    window.showInventory = function() {
        window.showScreen('inventory-screen');
        if (typeof window.populateInventory === 'function') {
            window.populateInventory();
        }
    };
    
    // Fix closeInventory function
    window.closeInventory = function() {
        window.showScreen('game-screen');
    };
    
    // Fix showGameMenu function
    window.showGameMenu = function() {
        window.showScreen('menu-screen');
    };
    
    // Fix returnToGame function
    window.returnToGame = function() {
        window.showScreen('game-screen');
    };
    
    // Fix showLoadGame function
    window.showLoadGame = function() {
        window.showScreen('load-game');
        if (typeof window.populateSaveSlots === 'function') {
            window.populateSaveSlots();
        }
    };
}

/**
 * Fix 5: Overlapping Elements - Prevents UI element overlapping
 */
function fixOverlappingElements() {
    console.log("Fixing overlapping elements...");
    
    // Add z-index and proper positioning for action menu
    const actionMenuFix = document.createElement('style');
    actionMenuFix.textContent = `
        #action-menu {
            position: relative;
            z-index: 5;
            background-color: #000;
        }
        
        #standard-actions {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin-bottom: 10px;
        }
        
        #input-area {
            display: flex;
            gap: 10px;
            align-items: center;
        }
        
        #player-input {
            flex: 1;
            min-width: 0;
        }
        
        #game-area {
            overflow-y: auto;
            max-height: calc(100% - 120px);
        }
    `;
    document.head.appendChild(actionMenuFix);
    
    // Fix battle menu layout
    const battleMenuFix = document.createElement('style');
    battleMenuFix.textContent = `
        #battle-menu {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            padding: 10px;
            position: relative;
            z-index: 5;
        }
    `;
    document.head.appendChild(battleMenuFix);
}

/**
 * Fix 6: AI Settings - Creates a functional AI settings menu
 */
function fixAISettings() {
    console.log("Fixing AI settings...");
    
    // Create AI settings function
    window.showAISettings = function() {
        // Create settings overlay if it doesn't exist
        let settingsOverlay = document.getElementById('ai-settings-overlay');
        
        if (!settingsOverlay) {
            settingsOverlay = document.createElement('div');
            settingsOverlay.id = 'ai-settings-overlay';
            settingsOverlay.className = 'overlay';
            
            settingsOverlay.innerHTML = `
                <div class="settings-container">
                    <h2>AI Integration Settings</h2>
                    <div class="settings-form">
                        <div class="form-group">
                            <label for="ai-enabled">Enable AI for character dialogue:</label>
                            <input type="checkbox" id="ai-enabled" checked>
                        </div>
                        <div class="form-group">
                            <label for="ai-api-key">DeepSeek API Key:</label>
                            <input type="password" id="ai-api-key" placeholder="Enter your API key">
                        </div>
                        <p class="settings-info">When AI is enabled, character dialogue will be dynamically generated based on context.</p>
                        <div class="settings-actions">
                            <button id="save-ai-settings">Save Settings</button>
                            <button id="close-ai-settings">Cancel</button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(settingsOverlay);
            
            // Add styles for the overlay
            const overlayStyles = document.createElement('style');
            overlayStyles.textContent = `
                .overlay {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.8);
                    z-index: 1000;
                    justify-content: center;
                    align-items: center;
                }
                
                .overlay.active {
                    display: flex;
                }
                
                .settings-container {
                    background-color: #000;
                    border: 2px solid #fff;
                    padding: 20px;
                    width: 80%;
                    max-width: 500px;
                }
                
                .settings-form {
                    margin-top: 20px;
                }
                
                .settings-actions {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    margin-top: 30px;
                }
                
                .settings-info {
                    margin-top: 15px;
                    color: #aaa;
                    font-size: 14px;
                }
            `;
            document.head.appendChild(overlayStyles);
            
            // Add event listeners for buttons
            document.getElementById('save-ai-settings').addEventListener('click', function() {
                const enabled = document.getElementById('ai-enabled').checked;
                const apiKey = document.getElementById('ai-api-key').value;
                
                // Save settings
                if (window.AIIntegration) {
                    window.AIIntegration.enabled = enabled;
                    window.AIIntegration.apiKey = apiKey;
                    
                    // Save to localStorage
                    localStorage.setItem('undertale_ai_enabled', enabled ? 'true' : 'false');
                    localStorage.setItem('undertale_ai_api_key', apiKey);
                }
                
                // Close overlay
                settingsOverlay.classList.remove('active');
                alert('AI settings saved successfully!');
            });
            
            document.getElementById('close-ai-settings').addEventListener('click', function() {
                settingsOverlay.classList.remove('active');
            });
        }
        
        // Load current settings
        if (window.AIIntegration) {
            document.getElementById('ai-enabled').checked = window.AIIntegration.enabled;
            document.getElementById('ai-api-key').value = window.AIIntegration.apiKey || '';
        }
        
        // Show overlay
        settingsOverlay.classList.add('active');
    };
    
    // Ensure AI settings link works
    const aiSettingsLink = document.getElementById('ai-settings-link');
    if (aiSettingsLink) {
        aiSettingsLink.onclick = function(e) {
            e.preventDefault();
            window.showAISettings();
        };
    }
}

/**
 * Helper function to initialize game - This ensures proper start game functionality
 */
function startGame() {
    // Ensure GameState is initialized
    if (!window.GameState) {
        console.error("GameState not initialized");
        return;
    }
    
    // Show game screen
    window.showScreen("game-screen");
    
    // Update player stats display
    if (typeof window.updatePlayerStats === 'function') {
        window.updatePlayerStats();
    }
    
    // Load current location
    if (typeof window.loadLocation === 'function') {
        window.loadLocation(window.GameState.currentLocation);
    } else {
        // Fallback if loadLocation doesn't exist
        document.getElementById('game-text').innerHTML = 
            "* You woke up on a bed of golden flowers.\n* Your journey through the Underground begins...";
    }
    
    console.log("Game started successfully!");
}

/**
 * Fallback function for populateSaveSlots in case it's missing
 */
function populateSaveSlots() {
    const saveSlots = document.querySelectorAll(".save-slot");
    
    if (saveSlots.length === 0) {
        console.warn("No save slots found in the DOM");
        return;
    }
    
    for (let i = 0; i < saveSlots.length; i++) {
        const slot = saveSlots[i];
        const slotNumber = slot.dataset.slot || (i + 1);
        
        // Try to get saved data for this slot
        const saveData = localStorage.getItem(`undertale_save_${slotNumber}`);
        
        if (saveData) {
            try {
                const parsedData = JSON.parse(saveData);
                slot.classList.remove("empty");
                slot.innerHTML = `
                    <p>Slot ${slotNumber}: ${parsedData.player.name || 'Unknown'} - LV ${parsedData.player.lv || 1}</p>
                    <p>Location: ${parsedData.currentLocation || 'Unknown'}</p>
                    <p>Play Time: ${parsedData.playTime || 0}s</p>
                `;
            } catch (error) {
                console.error(`Error parsing save data for slot ${slotNumber}:`, error);
                slot.classList.add("empty");
                slot.innerHTML = `<p>Empty Slot ${slotNumber}</p>`;
            }
        } else {
            slot.classList.add("empty");
            slot.innerHTML = `<p>Empty Slot ${slotNumber}</p>`;
        }
        
        // Add click event to load game from this slot
        slot.addEventListener("click", function() {
            if (this.classList.contains("empty")) {
                console.log(`Slot ${slotNumber} is empty`);
                return;
            }
            
            if (typeof window.loadGame === 'function') {
                window.loadGame(slotNumber);
            } else {
                alert(`Would load game from slot ${slotNumber} if the function was implemented.`);
            }
        });
    }
}