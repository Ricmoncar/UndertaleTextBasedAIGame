/**
 * UNDERTALE Text Adventure Game - Core Logic
 * This file contains the main game logic and state management
 */

// Game state - stores all player and game data
const GameState = {
    player: {
        name: "",
        hp: 20,
        maxHp: 20,
        atk: 0,
        def: 0,
        gold: 0,
        exp: 0,
        lv: 1,
        weapon: null,
        armor: null,
        inventory: [],
        killedMonsters: [],
        sparedMonsters: []
    },
    currentArea: null,
    currentLocation: null,
    visitedLocations: [],
    completedEvents: [],
    completedPuzzles: [],
    route: "neutral", // neutral, pacifist, or genocide
    savePoints: [], // Locations of save points
    saveSlot: 1
};

// Initialize game
function initGame() {
    // Attach event listeners to all buttons
    attachEventListeners();
    
    // Show title screen
    showScreen("title-screen");
}

// Attach event listeners to all interactive elements
function attachEventListeners() {
    // Title screen buttons
    document.getElementById("new-game-btn").addEventListener("click", showCharacterCreation);
    document.getElementById("load-game-btn").addEventListener("click", showLoadGame);
    
    // Character creation screen
    document.getElementById("start-game-btn").addEventListener("click", startNewGame);
    
    // Load game screen
    document.getElementById("back-to-title-btn").addEventListener("click", () => showScreen("title-screen"));
    
    // Populate save slots and attach listeners
    populateSaveSlots();
    document.querySelectorAll(".save-slot").forEach(slot => {
        slot.addEventListener("click", (e) => loadGame(e.currentTarget.dataset.slot));
    });
    
    // Main game screen buttons
    document.getElementById("act-btn").addEventListener("click", showActOptions);
    document.getElementById("item-btn").addEventListener("click", showInventory);
    document.getElementById("mercy-btn").addEventListener("click", showMercyOptions);
    document.getElementById("menu-btn").addEventListener("click", showGameMenu);
    
    // Input area
    document.getElementById("submit-action").addEventListener("click", handlePlayerInput);
    document.getElementById("player-input").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            handlePlayerInput();
        }
    });
    
    // Battle screen buttons
    document.getElementById("fight-btn").addEventListener("click", handleFight);
    document.getElementById("battle-act-btn").addEventListener("click", showBattleActOptions);
    document.getElementById("battle-item-btn").addEventListener("click", showBattleInventory);
    document.getElementById("spare-btn").addEventListener("click", handleSpare);
    
    // Menu screen buttons
    document.getElementById("save-game-btn").addEventListener("click", showSaveScreen);
    document.getElementById("load-menu-btn").addEventListener("click", showLoadGame);
    document.getElementById("settings-btn").addEventListener("click", showSettings);
    document.getElementById("return-to-game-btn").addEventListener("click", returnToGame);
    document.getElementById("quit-to-title-btn").addEventListener("click", confirmQuit);
    
    // Save screen
    document.getElementById("back-to-menu-btn").addEventListener("click", () => showScreen("menu-screen"));
    
    // Save point overlay
    document.getElementById("save-game-point").addEventListener("click", handleSavePoint);
    document.getElementById("return-game-point").addEventListener("click", hideSavePointOverlay);
    
    // Inventory screen
    document.getElementById("close-inventory").addEventListener("click", closeInventory);
    document.getElementById("use-item").addEventListener("click", useSelectedItem);
    document.getElementById("equip-item").addEventListener("click", equipSelectedItem);
    document.getElementById("drop-item").addEventListener("click", dropSelectedItem);
}

// Show a specific screen and hide all others
function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });
    document.getElementById(screenId).classList.add("active");
}

// Show character creation screen
function showCharacterCreation() {
    showScreen("character-creation");
    document.getElementById("character-name").focus();
}

// Show load game screen and populate save slots
function showLoadGame() {
    showScreen("load-game");
    populateSaveSlots();
}

// Populate save slots with saved game data
function populateSaveSlots() {
    const saveSlots = document.querySelectorAll(".save-slot");
    
    for (let i = 1; i <= saveSlots.length; i++) {
        const saveData = localStorage.getItem(`undertale_save_${i}`);
        const slot = document.querySelector(`.save-slot[data-slot="${i}"]`);
        
        if (saveData) {
            const parsedData = JSON.parse(saveData);
            slot.classList.remove("empty");
            slot.innerHTML = `
                <p>Slot ${i}: ${parsedData.player.name} - LV ${parsedData.player.lv}</p>
                <p>Location: ${getLocationName(parsedData.currentLocation)}</p>
                <p>Play Time: ${formatPlayTime(parsedData.playTime || 0)}</p>
            `;
        } else {
            slot.classList.add("empty");
            slot.innerHTML = `<p>Empty Slot ${i}</p>`;
        }
    }
}

// Format play time in hours, minutes, seconds
function formatPlayTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours}h ${minutes}m ${secs}s`;
}

// Start a new game with the created character
function startNewGame() {
    const name = document.getElementById("character-name").value.trim();
    
    if (name === "") {
        // Default name is "Chara" if left blank
        GameState.player.name = "Chara";
    } else {
        GameState.player.name = name.substring(0, 6); // Max 6 characters like in original game
    }
    
    // Reset game state
    resetGameState();
    
    // Set initial location
    GameState.currentArea = "ruins";
    GameState.currentLocation = "ruins.flower_bed";
    
    // Give player starting equipment
    addToInventory("stick");
    addToInventory("bandage");
    
    // Equip starting items
    equipItem("stick");
    equipItem("bandage");
    
    // Start game
    startGame();
}

// Reset game state to default values
function resetGameState() {
    GameState.player = {
        name: GameState.player.name,
        hp: 20,
        maxHp: 20,
        atk: 0,
        def: 0,
        gold: 0,
        exp: 0,
        lv: 1,
        weapon: null,
        armor: null,
        inventory: [],
        killedMonsters: [],
        sparedMonsters: []
    };
    
    GameState.currentArea = null;
    GameState.currentLocation = null;
    GameState.visitedLocations = [];
    GameState.completedEvents = [];
    GameState.completedPuzzles = [];
    GameState.route = "neutral";
    GameState.savePoints = [];
    GameState.playTime = 0;
    GameState.startTime = Date.now();
}

// Start the game
function startGame() {
    showScreen("game-screen");
    
    // Update player stats display
    updatePlayerStats();
    
    // Load current location
    loadLocation(GameState.currentLocation);
    
    // Start play time tracking
    GameState.startTime = Date.now();
    GameState.playTimeInterval = setInterval(updatePlayTime, 1000);
}

// Load rest of the implementation in the respective files