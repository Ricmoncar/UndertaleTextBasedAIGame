/**
 * UNDERTALE Text Adventure Game - UI Logic
 * This file handles UI interactions, screen transitions, and display updates
 */

// Update player stats display
function updatePlayerStats() {
    document.querySelector("#player-name span").textContent = GameState.player.name;
    document.querySelector("#player-lv span").textContent = GameState.player.lv;
    
    const hpDisplay = document.querySelectorAll("#player-hp span");
    hpDisplay[0].textContent = GameState.player.hp;
    hpDisplay[1].textContent = GameState.player.maxHp;
    
    // Also update battle stats if in battle
    if (document.getElementById("battle-screen").classList.contains("active")) {
        document.querySelector("#battle-player-name span").textContent = GameState.player.name;
        document.querySelector("#battle-player-lv span").textContent = GameState.player.lv;
        
        const battleHpDisplay = document.querySelectorAll("#battle-player-hp span");
        battleHpDisplay[0].textContent = GameState.player.hp;
        battleHpDisplay[1].textContent = GameState.player.maxHp;
    }
}

// Show game menu
function showGameMenu() {
    showScreen("menu-screen");
}

// Return to game from menu
function returnToGame() {
    showScreen("game-screen");
}

// Show settings screen
function showSettings() {
    // Placeholder for settings screen
    alert("Settings would be shown here");
}

// Confirm quitting to title
function confirmQuit() {
    if (confirm("Are you sure you want to quit? Unsaved progress will be lost.")) {
        clearInterval(GameState.playTimeInterval);
        showScreen("title-screen");
    }
}

// Show save screen
function showSaveScreen() {
    showScreen("save-screen");
    populateSaveGameSlots();
}

// Populate save game slots on save screen
function populateSaveGameSlots() {
    const saveSlots = document.querySelectorAll("#save-game-slots .save-slot");
    
    for (let i = 1; i <= saveSlots.length; i++) {
        const saveData = localStorage.getItem(`undertale_save_${i}`);
        const slot = document.querySelector(`#save-game-slots .save-slot[data-slot="${i}"]`);
        
        if (saveData) {
            const parsedData = JSON.parse(saveData);
            slot.innerHTML = `
                <p>Slot ${i}: ${parsedData.player.name} - LV ${parsedData.player.lv}</p>
                <p>Location: ${getLocationName(parsedData.currentLocation)}</p>
                <p>Play Time: ${formatPlayTime(parsedData.playTime || 0)}</p>
            `;
        } else {
            slot.innerHTML = `<p>Slot ${i}: Empty</p>`;
        }
        
        // Add event listener to save to this slot
        slot.addEventListener("click", () => {
            saveGame(i);
            alert(`Game saved to Slot ${i}`);
            showScreen("menu-screen");
        });
    }
}

// Show act options
function showActOptions() {
    // Placeholder for showing act options
    alert("ACT options would be shown here");
}

// Show mercy options
function showMercyOptions() {
    // Placeholder for showing mercy options
    alert("MERCY options would be shown here");
}

// Append text to the game text area
function appendToGameText(text) {
    const gameText = document.getElementById("game-text");
    gameText.innerHTML += text + "<br><br>";
    
    // Scroll to bottom
    gameText.scrollTop = gameText.scrollHeight;
}

// Clear the game text area
function clearGameText() {
    document.getElementById("game-text").innerHTML = "";
}

// Show dialogue
function showDialogue(text, character = null) {
    let dialogueText = "";
    
    if (character) {
        dialogueText += `<strong>${character}:</strong> `;
    }
    
    dialogueText += text;
    appendToGameText(dialogueText);
}

// Show a list of choices to the player
function showChoices(choices) {
    const choicesText = choices.map((choice, index) => 
        `${index + 1}. ${choice.text}`
    ).join("<br>");
    
    appendToGameText(choicesText);
}

// Handle player input
function handlePlayerInput() {
    const input = document.getElementById("player-input").value.trim();
    document.getElementById("player-input").value = "";
    
    if (input === "") return;
    
    // Echo player's input
    appendToGameText(`> ${input}`);
    
    // Process command
    processCommand(input);
}

// Process player command
function processCommand(input) {
    const command = input.toLowerCase();
    
    // Movement commands
    if (command === "north" || command === "n" || command === "up") {
        move("north");
    } else if (command === "south" || command === "s" || command === "down") {
        move("south");
    } else if (command === "east" || command === "e" || command === "right") {
        move("east");
    } else if (command === "west" || command === "w" || command === "left") {
        move("west");
    } else if (command === "forward" || command === "f") {
        move("forward");
    } else if (command === "back" || command === "b") {
        move("back");
    }
    // Help command
    else if (command === "help") {
        showHelp();
    }
    // Look command
    else if (command === "look" || command === "examine") {
        lookAround();
    }
    // Inventory command
    else if (command === "inventory" || command === "i") {
        showInventory();
    }
    // Unknown command
    else {
        appendToGameText("I'm not sure what you mean. Try a different command.");
    }
}

// Show help text
function showHelp() {
    appendToGameText(`Available commands:
    - north, n, up: Move north/up
    - south, s, down: Move south/down
    - east, e, right: Move east/right
    - west, w, left: Move west/left
    - forward, f: Move forward
    - back, b: Move back
    - look, examine: Look around
    - inventory, i: Show inventory
    - use [item]: Use an item
    - talk [character]: Talk to a character
    - help: Show this help text`);
}

// Look around the current location
function lookAround() {
    const [areaId, locationKey] = GameState.currentLocation.split(".");
    const area = window.UNDERTALE.AREAS[areaId.toUpperCase()];
    const location = area.locations[locationKey.toUpperCase()];
    
    appendToGameText(location.description);
    listExits(location.exits);
}

// Show save point overlay
function showSavePoint(locationText) {
    document.getElementById("save-location-text").textContent = locationText;
    document.getElementById("save-point-overlay").classList.add("active");
}

// Hide save point overlay
function hideSavePointOverlay() {
    document.getElementById("save-point-overlay").classList.remove("active");
}

// Update play time
function updatePlayTime() {
    const currentTime = Date.now();
    const elapsedSeconds = Math.floor((currentTime - GameState.startTime) / 1000);
    GameState.playTime = (GameState.playTime || 0) + 1;
}

// Show game over screen
function showGameOver(event) {
    // Placeholder for showing game over screen
    alert(`GAME OVER\n${event.message}`);
    
    // Offer to reload from last save or return to title
    if (confirm("Continue from last save?")) {
        loadGame(GameState.saveSlot);
    } else {
        showScreen("title-screen");
    }
}

// Show ending screen
function showEnding(event) {
    // Placeholder for showing ending screen
    alert(`${event.message}\n\n${event.epilogue}`);
    
    // Return to title screen
    showScreen("title-screen");
}

