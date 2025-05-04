/**
 * UI.js Fixes for UNDERTALE Text Adventure Game
 * These fixes address menu display issues, button functionality, and screen transitions
 */

// Fix 1: Ensure showInventory properly closes other screens
function showInventory() {
    // First hide all screens
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });
    
    // Then show only inventory screen
    document.getElementById("inventory-screen").classList.add("active");
    populateInventory();
}

// Fix 2: Ensure showGameMenu properly closes other screens
function showGameMenu() {
    // First hide all screens
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });
    
    // Then show only menu screen
    document.getElementById("menu-screen").classList.add("active");
}

// Fix 3: Improved showScreen function to ensure proper screen transitions
function showScreen(screenId) {
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
}

// Fix 4: Properly handle title screen button visibility and functionality
function fixTitleScreenButtons() {
    // Get references to buttons
    const newGameBtn = document.getElementById("new-game-btn");
    const loadGameBtn = document.getElementById("load-game-btn");
    
    // Check if buttons exist
    if (!newGameBtn || !loadGameBtn) {
        console.error("Title screen buttons not found");
        
        // Try to recreate them if they don't exist or are merged
        const menuOptions = document.querySelector(".menu-options");
        if (menuOptions) {
            // Clear any existing content
            menuOptions.innerHTML = "";
            
            // Create new buttons
            const newBtn = document.createElement("button");
            newBtn.id = "new-game-btn";
            newBtn.textContent = "New Game";
            newBtn.addEventListener("click", showCharacterCreation);
            
            const loadBtn = document.createElement("button");
            loadBtn.id = "load-game-btn";
            loadBtn.textContent = "Load Game";
            loadBtn.addEventListener("click", () => showLoadGame());
            
            // Add buttons to menu
            menuOptions.appendChild(newBtn);
            menuOptions.appendChild(loadBtn);
            
            console.log("Recreated title screen buttons");
        }
    } else {
        // Ensure buttons have correct text and event listeners
        newGameBtn.textContent = "New Game";
        loadGameBtn.textContent = "Load Game";
        
        // Remove any existing event listeners by cloning and replacing
        const newBtnClone = newGameBtn.cloneNode(true);
        const loadBtnClone = loadGameBtn.cloneNode(true);
        
        newBtnClone.addEventListener("click", showCharacterCreation);
        loadBtnClone.addEventListener("click", () => showLoadGame());
        
        newGameBtn.parentNode.replaceChild(newBtnClone, newGameBtn);
        loadGameBtn.parentNode.replaceChild(loadBtnClone, loadGameBtn);
        
        console.log("Fixed title screen button functionality");
    }
}

// Fix 5: Ensure all button event listeners are properly attached
function reattachEventListeners() {
    // Title screen buttons
    document.getElementById("new-game-btn")?.addEventListener("click", showCharacterCreation);
    document.getElementById("load-game-btn")?.addEventListener("click", () => showLoadGame());
    
    // Character creation screen
    document.getElementById("start-game-btn")?.addEventListener("click", startNewGame);
    
    // Load game screen
    document.getElementById("back-to-title-btn")?.addEventListener("click", () => showScreen("title-screen"));
    
    // Main game screen buttons
    document.getElementById("act-btn")?.addEventListener("click", showActOptions);
    document.getElementById("item-btn")?.addEventListener("click", showInventory);
    document.getElementById("mercy-btn")?.addEventListener("click", showMercyOptions);
    document.getElementById("menu-btn")?.addEventListener("click", showGameMenu);
    
    // Input area
    document.getElementById("submit-action")?.addEventListener("click", handlePlayerInput);
    document.getElementById("player-input")?.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            handlePlayerInput();
        }
    });
    
    // Menu screen buttons
    document.getElementById("save-game-btn")?.addEventListener("click", showSaveScreen);
    document.getElementById("load-menu-btn")?.addEventListener("click", showLoadGame);
    document.getElementById("settings-btn")?.addEventListener("click", showSettings);
    document.getElementById("return-to-game-btn")?.addEventListener("click", returnToGame);
    document.getElementById("quit-to-title-btn")?.addEventListener("click", confirmQuit);
    
    // Inventory screen
    document.getElementById("close-inventory")?.addEventListener("click", closeInventory);
    document.getElementById("use-item")?.addEventListener("click", useSelectedItem);
    document.getElementById("equip-item")?.addEventListener("click", equipSelectedItem);
    document.getElementById("drop-item")?.addEventListener("click", dropSelectedItem);
    
    console.log("Event listeners reattached");
}

// Fix 6: Function to return to game from inventory
function closeInventory() {
    showScreen("game-screen");
}

// Initialize fixes on page load
window.addEventListener("load", function() {
    // Apply all fixes
    fixTitleScreenButtons();
    reattachEventListeners();
    
    // Override existing functions to use fixed versions
    if (window.showInventory) window.showInventory = showInventory;
    if (window.showGameMenu) window.showGameMenu = showGameMenu;
    if (window.showScreen) window.showScreen = showScreen;
    if (window.closeInventory) window.closeInventory = closeInventory;
    
    console.log("UI fixes applied");
});