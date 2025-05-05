/**
 * UNDERTALE Text Adventure Game - Initialization
 * This file is the entry point for the game, initializing all components and starting the game
 */

// Global game data and state
let gameData = {};
let gameState = {
    currentLocation: "ruins.flower_bed",
    inventory: ["stick", "bandage"],
    health: 20,
    maxHealth: 20,
    lv: 1,
    gold: 0,
    route: "neutral", // neutral, pacifist, genocide
    completedEvents: [],
    equippedWeapon: "stick",
    equippedArmor: "bandage",
    apiKey: null,
    flags: {},
    saved: null
};

// API handler
let apiHandler = null;

// Audio elements
let textSound = null;
let backgroundMusic = null;

// Game initialization
document.addEventListener('DOMContentLoaded', initGame);

/**
 * Initialize the game
 */
function initGame() {
    console.log("Initializing UNDERTALE Text Adventure...");
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize audio
    initAudio();
    
    // Check for saved game
    loadGame();
    
    // If API key saved in local storage, use it
    const savedApiKey = localStorage.getItem('undertaleApiKey');
    if (savedApiKey) {
        document.getElementById('api-key-input').value = savedApiKey;
    }
    
    // Show title screen
    showTitleScreen();
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
    // API key form
    document.getElementById('api-key-submit').addEventListener('click', startGameWithAPI);
    
    // Command input
    document.getElementById('submit-button').addEventListener('click', handleCommand);
    document.getElementById('command-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleCommand();
        }
    });
    
    // Inventory
    document.getElementById('inventory-button').addEventListener('click', showInventory);
    document.getElementById('inventory-close-button').addEventListener('click', () => {
        document.getElementById('inventory-container').style.display = 'none';
    });
    
    // Battle actions
    document.querySelectorAll('.battle-action').forEach(action => {
        action.addEventListener('click', (e) => {
            if (window.handleBattleAction) {
                window.handleBattleAction(e);
            }
        });
    });
}

/**
 * Initialize audio elements
 */
function initAudio() {
    // Text sound
    textSound = new Audio('sound/text.mp3');
    textSound.volume = 0.5;
    
    // Preload common sounds
    const commonSounds = [
        'sound/text.mp3',
        'sound/select.mp3',
        'sound/item.mp3',
        'sound/save.mp3',
        'sound/battle-start.mp3',
        'sound/attack.mp3',
        'sound/damage.mp3',
        'sound/spare.mp3',
        'sound/flee.mp3',
        'sound/menu_select.mp3'
    ];
    
    commonSounds.forEach(sound => {
        const audio = new Audio(sound);
        audio.preload = 'auto';
    });
}

/**
 * Start the game with the provided API key
 */
async function startGameWithAPI() {
    const apiKeyInput = document.getElementById('api-key-input');
    const apiKey = apiKeyInput.value.trim();
    
    if (!apiKey) {
        alert("Please enter a valid DeepSeek API key.");
        return;
    }
    
    // Save API key to local storage
    localStorage.setItem('undertaleApiKey', apiKey);
    
    // Hide API key form and show loading indicator
    document.getElementById('api-key-container').style.display = 'none';
    document.getElementById('loading-indicator').style.display = 'block';
    
    // Set up API handler
    gameState.apiKey = apiKey;
    apiHandler = new DeepSeekAPI(apiKey);
    
    try {
        // Load game data using API
        gameData = await apiHandler.loadAllGameData();
        console.log("Game data loaded successfully:", gameData);
        
        // Start the game
        startGame();
    } catch (error) {
        console.error("Error loading game data:", error);
        alert(`Failed to load game data: ${error.message}. Please check your API key and try again.`);
        
        // Reset API container
        document.getElementById('api-key-container').style.display = 'flex';
    }
    
    // Hide loading indicator
    document.getElementById('loading-indicator').style.display = 'none';
}

/**
 * Show the title screen
 */
function showTitleScreen() {
    const textContainer = document.getElementById('text-container');
    textContainer.innerHTML = '';
    
    // Play title music
    playMusic('music/menu.mp3');
    
    // ASCII art title
    const titleArt = `
 _    _ _   _ ______ ______ _____ _______ _______ _______ _____ 
| |  | | \\ | |  __  |  ____|  __ |__   __|/\\  |  |  ____|  __ |
| |  | |  \\| | |  | | |__  | |__    | |  /  \\ | || |__  | |__) |
| |  | | . \` | |  | |  __| |  __|   | | / /\\ \\| ||  __| |  _  /
| |__| | |\\  | |__| | |____| |____  | |/ ____ \\ || |____| | \\ \\
 \\____/|_| \\_|______|______|______|_|/_/    \\_\\_|______|_|  \\_\\
                                                                `;
    
    typeText(titleArt + "\n\n");
    
    typeText("* Welcome to the UNDERTALE Text Adventure!\n\n");
    typeText("* This fan-made text adventure is based on the original game by Toby Fox.\n");
    typeText("* Enter your DeepSeek API key to begin your journey.\n\n");
    
    // Show API key form
    document.getElementById('api-key-container').style.display = 'flex';
}

/**
 * Start the game
 */
function startGame() {
    // If saved game exists, offer to continue
    if (gameState.saved) {
        offerContinueSavedGame();
    } else {
        // Start new game
        startNewGame();
    }
}

/**
 * Offer to continue saved game
 */
function offerContinueSavedGame() {
    const textContainer = document.getElementById('text-container');
    textContainer.innerHTML = '';
    
    typeText("* A saved game was found.\n\n");
    
    // Create continue and new game buttons
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';
    
    const continueButton = document.createElement('button');
    continueButton.className = 'choice-button';
    continueButton.textContent = "Continue Saved Game";
    continueButton.addEventListener('click', () => {
        choicesContainer.innerHTML = '';
        loadSavedGame();
    });
    choicesContainer.appendChild(continueButton);
    
    const newGameButton = document.createElement('button');
    newGameButton.className = 'choice-button';
    newGameButton.textContent = "Start New Game";
    newGameButton.addEventListener('click', () => {
        choicesContainer.innerHTML = '';
        startNewGame();
    });
    choicesContainer.appendChild(newGameButton);
}

/**
 * Start a new game
 */
function startNewGame() {
    // Reset game state
    gameState = {
        currentLocation: "ruins.flower_bed",
        inventory: ["stick", "bandage"],
        health: 20,
        maxHealth: 20,
        lv: 1,
        gold: 0,
        route: "neutral",
        completedEvents: [],
        equippedWeapon: "stick",
        equippedArmor: "bandage",
        apiKey: gameState.apiKey,
        flags: {},
        saved: gameState.saved
    };
    
    // Update stats display
    updateStats();
    
    // Show intro
    showIntro();
}

/**
 * Show game intro
 */
function showIntro() {
    const textContainer = document.getElementById('text-container');
    textContainer.innerHTML = '';
    
    // Play intro music
    playMusic('music/once_upon_a_time.mp3');
    
    // Intro text
    const introText = [
        "Long ago, two races ruled over Earth: HUMANS and MONSTERS.",
        "One day, war broke out between the two races.",
        "After a long battle, the humans were victorious.",
        "They sealed the monsters underground with a magic spell.",
        "Many years later...",
        "MT. EBOTT - 201X",
        "Legends say that those who climb the mountain never return.",
        "A human child, curious about these legends, climbs the mountain...",
        "The child trips and falls into a large hole in the mountain...",
        "And the adventure begins."
    ];
    
    let lineIndex = 0;
    
    function displayNextLine() {
        if (lineIndex < introText.length) {
            typeText(introText[lineIndex] + "\n", () => {
                lineIndex++;
                setTimeout(displayNextLine, 2000);
            });
        } else {
            // After intro, start the game
            setTimeout(() => {
                playMusic('music/ruins.mp3');
                displayLocation(gameState.currentLocation);
            }, 2000);
        }
    }
    
    displayNextLine();
}

/**
 * Load game from local storage
 */
function loadGame() {
    const savedGame = localStorage.getItem('undertaleAdventureSave');
    if (savedGame) {
        try {
            gameState.saved = JSON.parse(savedGame);
            console.log("Saved game found:", gameState.saved);
        } catch (error) {
            console.error("Error parsing saved game:", error);
        }
    }
}

/**
 * Load saved game and restore player state
 */
function loadSavedGame() {
    if (!gameState.saved) {
        typeText("* No saved game found.\n");
        return;
    }
    
    // Restore player state
    gameState.currentLocation = gameState.saved.location;
    gameState.health = gameState.saved.health;
    gameState.inventory = [...gameState.saved.inventory];
    gameState.gold = gameState.saved.gold;
    gameState.lv = gameState.saved.lv;
    gameState.equippedWeapon = gameState.saved.equippedWeapon;
    gameState.equippedArmor = gameState.saved.equippedArmor;
    gameState.route = gameState.saved.route;
    gameState.completedEvents = [...gameState.saved.completedEvents];
    
    // Play save sound
    playSoundEffect('sound/save.mp3');
    
    // Update stats and display location
    updateStats();
    
    // Play appropriate music for area
    const [areaId, _] = gameState.currentLocation.split('.');
    playMusic(`music/${areaId}.mp3`);
    
    displayLocation(gameState.currentLocation);
}

/**
 * Save game to local storage
 */
function saveGame(locationId) {
    gameState.saved = {
        location: locationId,
        health: gameState.health,
        inventory: [...gameState.inventory],
        gold: gameState.gold,
        lv: gameState.lv,
        equippedWeapon: gameState.equippedWeapon,
        equippedArmor: gameState.equippedArmor,
        route: gameState.route,
        completedEvents: [...gameState.completedEvents]
    };
    
    localStorage.setItem('undertaleAdventureSave', JSON.stringify(gameState.saved));
    console.log("Game saved:", gameState.saved);
}

/**
 * Type text with animation and sound
 */
function typeText(text, callback) {
    const textContainer = document.getElementById('text-container');
    let i = 0;
    
    const interval = setInterval(() => {
        if (i < text.length) {
            textContainer.innerHTML += text.charAt(i);
            textContainer.scrollTop = textContainer.scrollHeight;
            
            // Play sound effect for characters (not spaces or line breaks)
            if (text.charAt(i) !== ' ' && text.charAt(i) !== '\n') {
                textSound.currentTime = 0;
                textSound.play().catch(e => console.error("Audio play error:", e));
            }
            
            i++;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, 30);
}

/**
 * Play background music
 */
function playMusic(src) {
    // Stop any currently playing music
    if (backgroundMusic) {
        backgroundMusic.pause();
    }
    
    // Create new audio element
    backgroundMusic = new Audio(src);
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;
    backgroundMusic.play().catch(e => console.error("Audio play error:", e));
}

/**
 * Play sound effect
 */
function playSoundEffect(src) {
    const sound = new Audio(src);
    sound.volume = 0.7;
    sound.play().catch(e => console.error("Audio play error:", e));
}

/**
 * Update health and stats display
 */
function updateStats() {
    const healthFill = document.getElementById('health-fill');
    const healthValue = document.getElementById('health-value');
    const playerLv = document.getElementById('player-lv');
    const playerHp = document.getElementById('player-hp');
    const playerMaxHp = document.getElementById('player-max-hp');
    const playerGold = document.getElementById('player-gold');
    
    // Update health bar
    const percentage = Math.max(0, Math.min(100, (gameState.health / gameState.maxHealth) * 100));
    healthFill.style.width = `${percentage}%`;
    healthValue.textContent = `${gameState.health}/${gameState.maxHealth}`;
    
    // Update player stats
    playerLv.textContent = gameState.lv;
    playerHp.textContent = gameState.health;
    playerMaxHp.textContent = gameState.maxHealth;
    playerGold.textContent = gameState.gold;
}

// Expose functions to window scope
window.gameData = gameData;
window.gameState = gameState;
window.typeText = typeText;
window.playMusic = playMusic;
window.playSoundEffect = playSoundEffect;
window.updateStats = updateStats;
window.saveGame = saveGame;