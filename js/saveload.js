/**
 * UNDERTALE Text Adventure Game - Save/Load System
 * This file handles saving and loading game data
 */

// Save the game to a specific slot
function saveGame(slotNumber) {
    // Calculate total play time
    updatePlayTime();
    
    // Prepare save data
    const saveData = JSON.stringify({
        player: GameState.player,
        currentArea: GameState.currentArea,
        currentLocation: GameState.currentLocation,
        visitedLocations: GameState.visitedLocations,
        completedEvents: GameState.completedEvents,
        completedPuzzles: GameState.completedPuzzles,
        route: GameState.route,
        savePoints: GameState.savePoints,
        playTime: GameState.playTime
    });
    
    // Save to local storage
    localStorage.setItem(`undertale_save_${slotNumber}`, saveData);
    
    // Set current save slot
    GameState.saveSlot = slotNumber;
    
    return true;
}

// Load the game from a specific slot
function loadGame(slotNumber) {
    // Get save data from local storage
    const saveData = localStorage.getItem(`undertale_save_${slotNumber}`);
    
    if (!saveData) {
        alert(`No save data found in slot ${slotNumber}`);
        return false;
    }
    
    // Parse save data
    const parsedData = JSON.parse(saveData);
    
    // Restore game state
    GameState.player = parsedData.player;
    GameState.currentArea = parsedData.currentArea;
    GameState.currentLocation = parsedData.currentLocation;
    GameState.visitedLocations = parsedData.visitedLocations;
    GameState.completedEvents = parsedData.completedEvents;
    GameState.completedPuzzles = parsedData.completedPuzzles;
    GameState.route = parsedData.route;
    GameState.savePoints = parsedData.savePoints;
    GameState.playTime = parsedData.playTime || 0;
    
    // Set current save slot
    GameState.saveSlot = slotNumber;
    
    // Start game
    startGame();
    
    return true;
}

// Reset all save data (for debugging)
function resetAllSaves() {
    for (let i = 1; i <= 3; i++) {
        localStorage.removeItem(`undertale_save_${i}`);
    }
    
    alert("All save data has been reset.");
}

// Initialize the game when the page loads
window.addEventListener("load", initGame);