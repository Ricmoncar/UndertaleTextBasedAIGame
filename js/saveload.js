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

// Fix for the "slot is null" error in the save slot functionality
// Add this to js/saveload.js

// Populate save slots with saved game data
function populateSaveSlots() {
    const saveSlots = document.querySelectorAll(".save-slot");
    
    if (saveSlots.length === 0) {
        console.warn("No save slots found in the DOM");
        return; // Exit the function if no slots are found
    }
    
    for (let i = 0; i < saveSlots.length; i++) {
        // Make sure we have a valid slot element
        const slot = saveSlots[i];
        if (!slot) {
            console.warn(`Save slot at index ${i} is null or undefined`);
            continue; // Skip this iteration if slot is null
        }
        
        // Get the slot number from data attribute or use the index
        const slotNumber = slot.dataset.slot || (i + 1);
        
        // Try to get saved data for this slot
        const saveData = localStorage.getItem(`undertale_save_${slotNumber}`);
        
        if (saveData) {
            try {
                // Parse the saved data
                const parsedData = JSON.parse(saveData);
                
                // Update the slot with saved data
                slot.classList.remove("empty");
                slot.innerHTML = `
                    <p>Slot ${slotNumber}: ${parsedData.player.name || 'Unknown'} - LV ${parsedData.player.lv || 1}</p>
                    <p>Location: ${getLocationName(parsedData.currentLocation) || 'Unknown'}</p>
                    <p>Play Time: ${formatPlayTime(parsedData.playTime || 0)}</p>
                `;
            } catch (error) {
                console.error(`Error parsing save data for slot ${slotNumber}:`, error);
                // Set as empty if there's an error
                slot.classList.add("empty");
                slot.innerHTML = `<p>Empty Slot ${slotNumber}</p>`;
            }
        } else {
            // No save data, set as empty
            slot.classList.add("empty");
            slot.innerHTML = `<p>Empty Slot ${slotNumber}</p>`;
        }
        
        // Make sure event listener is attached
        slot.addEventListener("click", (e) => {
            const clickedSlot = e.currentTarget.dataset.slot || slotNumber;
            if (e.currentTarget.classList.contains("empty")) {
                console.log(`Slot ${clickedSlot} is empty`);
                return; // Don't try to load empty slots
            }
            loadGame(clickedSlot);
        });
    }
}

// Helper function to get location name from location ID
function getLocationName(locationId) {
    if (!locationId) return 'Unknown';
    
    try {
        const [areaId, locationKey] = locationId.split('.');
        if (!areaId || !locationKey) return 'Unknown';
        
        const area = window.UNDERTALE?.AREAS?.[areaId.toUpperCase()];
        const location = area?.locations?.[locationKey.toUpperCase()];
        
        return location?.name || 'Unknown';
    } catch (error) {
        console.error('Error getting location name:', error);
        return 'Unknown';
    }
}

// Initialize the game when the page loads
window.addEventListener("load", initGame);