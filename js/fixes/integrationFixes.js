/**
 * Integration Fixes for UNDERTALE Text Adventure Game
 * This script connects all the fixes and ensures they're applied properly
 */

// UndertaleGameFixes handles applying fixes to the game
const UndertaleGameFixes = {
    // Initialize all fixes
    init: function() {
        console.log("Applying UNDERTALE Text Adventure fixes...");
        this.applyUIFixes();
        this.applyFontFixes();
        this.fixButtonFunctionality();
        this.watchForDynamicElements();
        
        // Log completion
        console.log("All fixes applied!");
    },
    
    // Apply UI fixes to ensure proper screen transitions
    applyUIFixes: function() {
        console.log("Applying UI fixes...");
        
        // Enhanced showScreen function
        window.showScreen = function(screenId) {
            // First hide all screens
            document.querySelectorAll(".screen").forEach(screen => {
                screen.classList.remove("active");
            });
            
            // Then show only the requested screen
            const screenToShow = document.getElementById(screenId);
            if (screenToShow) {
                screenToShow.classList.add("active");
                console.log(`Showing screen: ${screenId}`);
            } else {
                console.error(`Screen ${screenId} not found`);
            }
        };
        
        // Fix showInventory
        window.showInventory = function() {
            // Hide all screens
            document.querySelectorAll(".screen").forEach(screen => {
                screen.classList.remove("active");
            });
            
            // Show inventory screen
            document.getElementById("inventory-screen").classList.add("active");
            
            // Update inventory display
            if (typeof window.populateInventory === 'function') {
                window.populateInventory();
            }
        };
        
        // Fix closeInventory
        window.closeInventory = function() {
            window.showScreen("game-screen");
        };
        
        // Fix showGameMenu
        window.showGameMenu = function() {
            window.showScreen("menu-screen");
        };
        
        // Fix returnToGame
        window.returnToGame = function() {
            window.showScreen("game-screen");
        };
    },
    
    // Apply font loading fixes
    applyFontFixes: function() {
        console.log("Applying font fixes...");
        
        // Create font loading stylesheet if not already present
        if (!document.querySelector('style#font-fix-style')) {
            const style = document.createElement('style');
            style.id = 'font-fix-style';
            style.textContent = `
                /* Improved font-face declarations */
                @font-face {
                    font-family: 'Determination Mono';
                    src: url('fonts/DTM-Mono.otf') format('opentype'),
                         url('fonts/DTM-Mono.ttf') format('truetype'),
                         url('fonts/DeterminationMonoWeb.woff') format('woff'),
                         url('fonts/DeterminationMonoWeb.woff2') format('woff2');
                    font-weight: normal;
                    font-style: normal;
                    font-display: swap;
                }
                
                /* Fallback font classes */
                .webfont-failed {
                    font-family: 'Courier New', monospace !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Initialize font loader if available
        if (window.FontLoader && typeof window.FontLoader.init === 'function') {
            window.FontLoader.init();
        }
    },
    
    // Fix button functionality
    fixButtonFunctionality: function() {
        console.log("Fixing button functionality...");
        
        // Fix title screen buttons
        const fixTitleButtons = () => {
            const titleScreen = document.getElementById('title-screen');
            if (!titleScreen) return;
            
            const menuOptions = titleScreen.querySelector('.menu-options');
            if (!menuOptions) return;
            
            // Check if buttons are merged or missing
            const newGameBtn = document.getElementById('new-game-btn');
            const loadGameBtn = document.getElementById('load-game-btn');
            
            // If buttons don't exist or have incorrect text, recreate them
            if (!newGameBtn || !loadGameBtn || 
                newGameBtn.textContent.trim().toLowerCase() === 'begin') {
                
                console.log("Recreating title screen buttons...");
                
                // Clear menu options
                menuOptions.innerHTML = '';
                
                // Create New Game button
                const newBtn = document.createElement('button');
                newBtn.id = 'new-game-btn';
                newBtn.textContent = 'New Game';
                newBtn.addEventListener('click', () => {
                    if (typeof window.showCharacterCreation === 'function') {
                        window.showCharacterCreation();
                    } else {
                        window.showScreen('character-creation');
                    }
                });
                menuOptions.appendChild(newBtn);
                
                // Create Load Game button
                const loadBtn = document.createElement('button');
                loadBtn.id = 'load-game-btn';
                loadBtn.textContent = 'Load Game';
                loadBtn.addEventListener('click', () => {
                    if (typeof window.showLoadGame === 'function') {
                        window.showLoadGame();
                    } else {
                        window.showScreen('load-game');
                    }
                });
                menuOptions.appendChild(loadBtn);
            }
        };
        
        // Run immediately and on any screen change
        fixTitleButtons();
        
        // Reattach all important event listeners
        this.reattachEventListeners();
    },
    
    // Reattach all important event listeners
    reattachEventListeners: function() {
        console.log("Reattaching event listeners...");
        
        // Title screen buttons
        const newGameBtn = document.getElementById("new-game-btn");
        if (newGameBtn) {
            newGameBtn.addEventListener("click", function() {
                if (typeof window.showCharacterCreation === 'function') {
                    window.showCharacterCreation();
                } else {
                    window.showScreen('character-creation');
                }
            });
        }
        
        const loadGameBtn = document.getElementById("load-game-btn");
        if (loadGameBtn) {
            loadGameBtn.addEventListener("click", function() {
                if (typeof window.showLoadGame === 'function') {
                    window.showLoadGame();
                } else {
                    window.showScreen('load-game');
                }
            });
        }
        
        // Character creation screen
        const startGameBtn = document.getElementById("start-game-btn");
        if (startGameBtn) {
            startGameBtn.addEventListener("click", function() {
                if (typeof window.startNewGame === 'function') {
                    window.startNewGame();
                }
            });
        }
        
        // Main game screen buttons
        const itemBtn = document.getElementById("item-btn");
        if (itemBtn) {
            itemBtn.addEventListener("click", function() {
                if (typeof window.showInventory === 'function') {
                    window.showInventory();
                } else {
                    window.showScreen('inventory-screen');
                }
            });
        }
        
        const menuBtn = document.getElementById("menu-btn");
        if (menuBtn) {
            menuBtn.addEventListener("click", function() {
                if (typeof window.showGameMenu === 'function') {
                    window.showGameMenu();
                } else {
                    window.showScreen('menu-screen');
                }
            });
        }
        
        // Inventory screen
        const closeInventoryBtn = document.getElementById("close-inventory");
        if (closeInventoryBtn) {
            closeInventoryBtn.addEventListener("click", function() {
                if (typeof window.closeInventory === 'function') {
                    window.closeInventory();
                } else {
                    window.showScreen('game-screen');
                }
            });
        }
        
        // Menu screen buttons
        const returnToGameBtn = document.getElementById("return-to-game-btn");
        if (returnToGameBtn) {
            returnToGameBtn.addEventListener("click", function() {
                if (typeof window.returnToGame === 'function') {
                    window.returnToGame();
                } else {
                    window.showScreen('game-screen');
                }
            });
        }
    },
    
    // Watch for dynamic elements and fix them when they appear
    watchForDynamicElements: function() {
        // Use MutationObserver to watch for new elements
        const observer = new MutationObserver((mutations) => {
            let shouldReattach = false;
            
            mutations.forEach(mutation => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Check if we need to reattach event listeners
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) { // Element node
                            if (node.id === 'title-screen' || 
                                node.querySelector('#new-game-btn, #load-game-btn, #item-btn, #menu-btn')) {
                                shouldReattach = true;
                            }
                        }
                    });
                }
            });
            
            if (shouldReattach) {
                this.fixButtonFunctionality();
            }
        });
        
        // Start observing
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
};

// Initialize the fixes
document.addEventListener('DOMContentLoaded', function() {
    // Delay to ensure all scripts have loaded
    setTimeout(() => {
        UndertaleGameFixes.init();
    }, 500);
});

// Apply fixes again when window loads (for safety)
window.addEventListener('load', function() {
    UndertaleGameFixes.init();
});

// Make available globally
window.UndertaleGameFixes = UndertaleGameFixes;