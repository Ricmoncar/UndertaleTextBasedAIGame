/**
 * UNDERTALE Text Adventure Game - Main Game Logic
 * This file contains the core implementation of the game mechanisms
 */

// Game state setup
let gameState = {
    currentLocation: "ruins.flower_bed",
    inventory: ["stick", "bandage"],  // Start with basic items
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
    saved: {
        location: "ruins.flower_bed",
        health: 20
    }
};

// Main game initialization
function initGame() {
    // Register UI event listeners
    document.getElementById('api-key-submit').addEventListener('click', startGameWithAPI);
    document.getElementById('submit-button').addEventListener('click', handleCommand);
    document.getElementById('command-input').addEventListener('keypress', handleEnterKey);
    document.getElementById('inventory-button').addEventListener('click', showInventory);
    document.getElementById('inventory-close-button').addEventListener('click', closeInventory);
    
    // Battle UI event listeners
    const battleActions = document.querySelectorAll('.battle-action');
    battleActions.forEach(action => {
        action.addEventListener('click', handleBattleAction);
    });
    
    // Load saved game if exists
    loadGame();
}

// Start game with API key
async function startGameWithAPI() {
    const apiKey = document.getElementById('api-key-input').value.trim();
    if (!apiKey) {
        alert("Please enter a valid DeepSeek API key.");
        return;
    }
    
    gameState.apiKey = apiKey;
    document.getElementById('api-key-container').style.display = 'none';
    document.getElementById('loading-indicator').style.display = 'block';
    
    try {
        // Load game data from API
        await loadGameData();
        startGame();
    } catch (error) {
        console.error("Error loading game data:", error);
        alert(`Failed to load game data: ${error.message}`);
        document.getElementById('api-key-container').style.display = 'flex';
    }
    
    document.getElementById('loading-indicator').style.display = 'none';
}

// Start the game experience
function startGame() {
    updateStats();
    displayLocation(gameState.currentLocation);
    playMusic('music/ruins.mp3'); // Play background music
}

// Display the current location
function displayLocation(locationId) {
    const [areaId, locationName] = locationId.split('.');
    const area = gameData.areas[areaId.toUpperCase()];
    const location = area.locations[locationName.toUpperCase()];
    
    // Clear previous content
    const textContainer = document.getElementById('text-container');
    const choicesContainer = document.getElementById('choices-container');
    textContainer.innerHTML = '';
    choicesContainer.innerHTML = '';
    
    // Change background color based on area
    if (area.backgroundColor) {
        document.body.style.backgroundColor = area.backgroundColor;
        document.getElementById('game-container').style.borderColor = area.accentColor || 'white';
    }
    
    // Display location name and description
    typeText(`* ${location.name}\n\n${location.description}\n`);
    
    // Check for items in location
    if (location.items && location.items.length > 0) {
        const itemNames = location.items.map(itemId => {
            const item = gameData.items[itemId.toUpperCase()];
            return item ? item.name : itemId;
        });
        
        typeText(`\n* You see: ${itemNames.join(', ')}\n`);
    }
    
    // Display available exits
    if (location.exits) {
        const exits = Object.entries(location.exits)
            .filter(([_, targetId]) => targetId !== null)
            .map(([direction, _]) => direction);
        
        if (exits.length > 0) {
            typeText(`\n* You can go: ${exits.join(', ')}\n`);
        }
    }
    
    // Check for events
    if (location.events && location.events.length > 0) {
        // Find the first unfinished event
        const event = location.events.find(eventId => !gameState.completedEvents.includes(eventId));
        if (event) {
            setTimeout(() => {
                triggerEvent(event);
            }, 1500);
        }
    }
    
    // Check if this is a save point
    if (location.isSavePoint) {
        typeText(`\n* (The convenience of finding a save point in ${location.saveText} fills you with determination.)\n`);
        saveGame(locationId);
        gameState.health = gameState.maxHealth;
        updateStats();
        
        // Play save sound
        playSoundEffect('sound/save.mp3');
    }
    
    // Check if this is a shop
    if (location.shop) {
        const shop = gameData.shops[location.shop.toUpperCase()];
        setTimeout(() => {
            typeText(`\n* You've entered ${shop.name}. Type 'shop' to browse the items for sale.\n`);
        }, 1000);
    }
}

// Type text with animation effect
function typeText(text, callback) {
    const textContainer = document.getElementById('text-container');
    const textSound = new Audio('sound/text.mp3');
    
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

// Trigger an event from the event data
function triggerEvent(eventId) {
    const event = gameData.events[eventId.toUpperCase()];
    
    if (!event) {
        console.error(`Event ${eventId} not found in game data.`);
        return;
    }
    
    switch (event.type) {
        case 'cutscene':
            displayCutscene(event);
            break;
        case 'dialogue':
            displayDialogue(event);
            break;
        case 'battle':
            startBattle(event);
            break;
        case 'choice':
            displayChoices(event);
            break;
        case 'screen_change':
            changeScreen(event.screen);
            break;
        case 'flag_set':
            setFlag(event.flag, event.value);
            if (event.next) triggerEvent(event.next);
            break;
        case 'conditional':
            handleConditionalEvent(event);
            break;
        case 'game_over':
            gameOver(event.message);
            break;
        case 'minigame':
            startMinigame(event);
            break;
        default:
            console.log(`Event type ${event.type} not implemented yet.`);
            // Mark event as completed anyway
            gameState.completedEvents.push(eventId);
    }
}

// Display a cutscene with character dialogue
function displayCutscene(event) {
    const textContainer = document.getElementById('text-container');
    textContainer.innerHTML = '';
    
    if (event.character) {
        const character = gameData.characters[event.character.toUpperCase()];
        if (character) {
            // Show character image if available
            typeText(`* ${character.name} appears.\n\n`);
            
            // TODO: Add character image display
        }
    }
    
    let dialogueIndex = 0;
    
    function displayNextLine() {
        if (dialogueIndex < event.dialogue.length) {
            const line = event.dialogue[dialogueIndex];
            const text = event.character ? `${event.character}: ${line}\n` : `* ${line}\n`;
            
            typeText(text, () => {
                dialogueIndex++;
                setTimeout(displayNextLine, 500);
            });
        } else {
            // End of cutscene
            if (event.next) {
                setTimeout(() => {
                    triggerEvent(event.next);
                }, 1000);
            } else {
                // Give item if applicable
                if (event.giveItem) {
                    addToInventory(event.giveItem);
                    typeText(`\n* (You got the ${gameData.items[event.giveItem.toUpperCase()].name}!)\n`);
                    playSoundEffect('sound/item.mp3');
                }
                
                // Set route flag if applicable
                if (event.routeFlag) {
                    gameState.route = event.routeFlag;
                    console.log(`Route set to: ${event.routeFlag}`);
                }
                
                // Mark event as completed
                gameState.completedEvents.push(event.id);
            }
        }
    }
    
    displayNextLine();
}

// Display dialogue
function displayDialogue(event) {
    const textContainer = document.getElementById('text-container');
    textContainer.innerHTML = '';
    
    let dialogueIndex = 0;
    
    function displayNextLine() {
        if (dialogueIndex < event.dialogue.length) {
            const line = event.dialogue[dialogueIndex];
            const text = event.character ? `${event.character}: ${line}\n` : `* ${line}\n`;
            
            typeText(text, () => {
                dialogueIndex++;
                setTimeout(displayNextLine, 500);
            });
        } else {
            // End of dialogue
            if (event.next) {
                setTimeout(() => {
                    triggerEvent(event.next);
                }, 1000);
            }
            
            // Mark event as completed
            gameState.completedEvents.push(event.id);
        }
    }
    
    displayNextLine();
}

// Start a battle encounter
function startBattle(event) {
    const enemy = gameData.characters[event.enemy.toUpperCase()];
    if (!enemy) {
        console.error(`Enemy ${event.enemy} not found.`);
        return;
    }
    
    // Switch to battle display
    const textContainer = document.getElementById('text-container');
    const battleContainer = document.getElementById('battle-container');
    const inputContainer = document.getElementById('input-container');
    const choicesContainer = document.getElementById('choices-container');
    
    textContainer.innerHTML = '';
    choicesContainer.innerHTML = '';
    inputContainer.style.display = 'none';
    battleContainer.style.display = 'flex';
    
    // Play battle music
    playMusic('sound/battle.mp3');
    
    // Display enemy
    const battleEnemy = document.getElementById('battle-enemy');
    battleEnemy.innerHTML = `<div class="enemy-image">${enemy.name}</div>`; // Replace with actual image
    
    // In a real implementation, show battle box animations
    // For this demo, we'll just show the battle menu
    
    battleContainer.setAttribute('data-enemy', event.enemy);
    battleContainer.setAttribute('data-event', event.id);
    
    // Show battle intro text
    typeText(`* A battle has started with ${enemy.name}!\n`);
    typeText(`* ${enemy.description}\n`);
}

// Handle player battle actions (FIGHT, ACT, ITEM, MERCY)
function handleBattleAction(e) {
    const action = e.target.getAttribute('data-action');
    const battleContainer = document.getElementById('battle-container');
    const enemy = battleContainer.getAttribute('data-enemy');
    const eventId = battleContainer.getAttribute('data-event');
    const event = gameData.events[eventId.toUpperCase()];
    
    switch (action) {
        case 'fight':
            // Attack enemy
            if (event.outcome.win) {
                endBattle();
                triggerEvent(event.outcome.win);
            }
            break;
        case 'act':
            // Show ACT options
            displayActOptions(enemy);
            break;
        case 'item':
            // Show ITEM options
            showBattleInventory();
            break;
        case 'mercy':
            // Try to spare enemy
            if (event.canSpare && event.outcome.spare) {
                endBattle();
                triggerEvent(event.outcome.spare);
            } else {
                typeText(`* ${gameData.characters[enemy.toUpperCase()].name} cannot be spared yet.\n`);
            }
            break;
    }
}

// End battle mode and return to exploration
function endBattle() {
    const battleContainer = document.getElementById('battle-container');
    const inputContainer = document.getElementById('input-container');
    
    battleContainer.style.display = 'none';
    inputContainer.style.display = 'flex';
    
    // Resume normal music
    const [areaId, _] = gameState.currentLocation.split('.');
    playMusic(`music/${areaId}.mp3`);
}

// Display choices in a cutscene or event
function displayChoices(event) {
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';
    
    event.choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.textContent = choice.text;
        button.addEventListener('click', () => {
            choicesContainer.innerHTML = '';
            playSoundEffect('sound/select.mp3');
            triggerEvent(choice.outcome);
        });
        choicesContainer.appendChild(button);
    });
}

// Handle conditional events based on route or other conditions
function handleConditionalEvent(event) {
    // Find the matching condition
    const matchingCondition = event.conditions.find(condition => {
        if (condition.route && gameState.route === condition.route) {
            return true;
        }
        
        if (condition.flag && gameState.flags[condition.flag] === condition.value) {
            return true;
        }
        
        if (condition.has && gameState.inventory.includes(condition.has)) {
            return true;
        }
        
        return false;
    });
    
    if (matchingCondition) {
        triggerEvent(matchingCondition.outcome);
    } else if (event.default) {
        triggerEvent(event.default);
    }
}

// Game over handler
function gameOver(message) {
    // Display game over message
    const textContainer = document.getElementById('text-container');
    textContainer.innerHTML = '';
    
    typeText(`* ${message}\n\n* GAME OVER\n`, () => {
        // Play game over sound
        playSoundEffect('sound/gameover.mp3');
        
        // Show restart options
        setTimeout(() => {
            const choicesContainer = document.getElementById('choices-container');
            choicesContainer.innerHTML = '';
            
            const continueButton = document.createElement('button');
            continueButton.className = 'choice-button';
            continueButton.textContent = 'Continue from last save';
            continueButton.addEventListener('click', () => {
                choicesContainer.innerHTML = '';
                loadSavedGame();
            });
            choicesContainer.appendChild(continueButton);
            
            const restartButton = document.createElement('button');
            restartButton.className = 'choice-button';
            restartButton.textContent = 'Restart from beginning';
            restartButton.addEventListener('click', () => {
                choicesContainer.innerHTML = '';
                resetGame();
            });
            choicesContainer.appendChild(restartButton);
        }, 2000);
    });
}

// Handle keyboard commands
function handleCommand() {
    const commandInput = document.getElementById('command-input');
    const command = commandInput.value.trim().toLowerCase();
    commandInput.value = '';
    
    if (!command) return;
    
    // Add command to text container
    const textContainer = document.getElementById('text-container');
    textContainer.innerHTML += `\n> ${command}\n`;
    
    // Play command sound
    playSoundEffect('sound/select.mp3');
    
    // Process command
    const commandParts = command.split(' ');
    const action = commandParts[0];
    
    switch (action) {
        case 'go':
        case 'move':
        case 'walk':
            const direction = commandParts[1];
            movePlayer(direction);
            break;
        case 'north':
        case 'south':
        case 'east':
        case 'west':
        case 'forward':
        case 'back':
        case 'up':
        case 'down':
            movePlayer(action);
            break;
        case 'look':
        case 'examine':
            displayLocation(gameState.currentLocation);
            break;
        case 'take':
        case 'pickup':
        case 'get':
            const itemName = commandParts.slice(1).join(' ');
            takeItem(itemName);
            break;
        case 'inventory':
        case 'i':
            showInventory();
            break;
        case 'use':
            const useItem = commandParts.slice(1).join(' ');
            useInventoryItem(useItem);
            break;
        case 'shop':
            const [areaId, locationName] = gameState.currentLocation.split('.');
            const area = gameData.areas[areaId.toUpperCase()];
            const location = area.locations[locationName.toUpperCase()];
            if (location.shop) {
                openShop(location.shop);
            } else {
                typeText("* There's no shop here.\n");
            }
            break;
        case 'stats':
            showStats();
            break;
        case 'save':
            saveGame(gameState.currentLocation);
            typeText("* Game saved.\n");
            playSoundEffect('sound/save.mp3');
            break;
        case 'load':
            loadSavedGame();
            break;
        case 'help':
            showHelp();
            break;
        default:
            typeText(`* (You don't know how to '${command}'.)\n`);
    }
}

// Handle enter key press for command input
function handleEnterKey(e) {
    if (e.key === 'Enter') {
        handleCommand();
    }
}

// Move player to a new location
function movePlayer(direction) {
    const [areaId, locationName] = gameState.currentLocation.split('.');
    const area = gameData.areas[areaId.toUpperCase()];
    const location = area.locations[locationName.toUpperCase()];
    
    if (!location.exits) {
        typeText("* There are no exits from here.\n");
        return;
    }
    
    if (location.exits[direction]) {
        const targetLocationId = location.exits[direction];
        if (targetLocationId === null) {
            typeText("* You can't go that way.\n");
            return;
        }
        
        // Play movement sound
        playSoundEffect('sound/move.mp3');
        
        // Update location and display new area
        gameState.currentLocation = targetLocationId;
        displayLocation(targetLocationId);
    } else {
        typeText(`* You can't go ${direction} from here.\n`);
    }
}

// Take an item from the current location
function takeItem(itemName) {
    const [areaId, locationName] = gameState.currentLocation.split('.');
    const area = gameData.areas[areaId.toUpperCase()];
    const location = area.locations[locationName.toUpperCase()];
    
    if (!location.items || location.items.length === 0) {
        typeText(`* There's nothing to take here.\n`);
        return;
    }
    
    const item = location.items.find(id => {
        const itemData = gameData.items[id.toUpperCase()];
        return itemData && itemData.name.toLowerCase().includes(itemName.toLowerCase());
    });
    
    if (item) {
        addToInventory(item);
        
        // Remove item from location
        const itemIndex = location.items.indexOf(item);
        location.items.splice(itemIndex, 1);
        
        // Play item pickup sound
        playSoundEffect('sound/item.mp3');
        
        typeText(`* You picked up the ${gameData.items[item.toUpperCase()].name}.\n`);
    } else {
        typeText(`* You don't see any ${itemName} here.\n`);
    }
}

// Add an item to the player's inventory
function addToInventory(itemId) {
    const item = gameData.items[itemId.toUpperCase()];
    if (item) {
        gameState.inventory.push(itemId);
        console.log(`Added ${item.name} to inventory.`);
    }
}

// Show the player's inventory
function showInventory() {
    const inventoryContainer = document.getElementById('inventory-container');
    const inventoryList = document.getElementById('inventory-list');
    
    inventoryList.innerHTML = '';
    
    if (gameState.inventory.length === 0) {
        const emptyItem = document.createElement('div');
        emptyItem.className = 'inventory-item';
        emptyItem.textContent = '* Your inventory is empty.';
        inventoryList.appendChild(emptyItem);
    } else {
        gameState.inventory.forEach(itemId => {
            const item = gameData.items[itemId.toUpperCase()];
            if (item) {
                const itemElement = document.createElement('div');
                itemElement.className = 'inventory-item';
                
                // Add equipped indicator
                let itemText = `* ${item.name}`;
                if (gameState.equippedWeapon === itemId) {
                    itemText += ' (Equipped Weapon)';
                } else if (gameState.equippedArmor === itemId) {
                    itemText += ' (Equipped Armor)';
                }
                
                itemElement.textContent = itemText;
                
                // Item use on click
                itemElement.addEventListener('click', () => {
                    useInventoryItem(item.name);
                    inventoryContainer.style.display = 'none';
                });
                
                inventoryList.appendChild(itemElement);
            }
        });
    }
    
    // Show inventory modal
    inventoryContainer.style.display = 'flex';
}

// Close inventory display
function closeInventory() {
    const inventoryContainer = document.getElementById('inventory-container');
    inventoryContainer.style.display = 'none';
}

// Use an item from the inventory
function useInventoryItem(itemName) {
    const itemId = gameState.inventory.find(id => {
        const item = gameData.items[id.toUpperCase()];
        return item && item.name.toLowerCase().includes(itemName.toLowerCase());
    });
    
    if (!itemId) {
        typeText(`* You don't have any ${itemName} in your inventory.\n`);
        return;
    }
    
    const item = gameData.items[itemId.toUpperCase()];
    
    // Use the item based on its type
    switch (item.type) {
        case 'healing':
            // Check if already at max health
            if (gameState.health >= gameState.maxHealth) {
                typeText(`* Your HP is already full.\n`);
                return;
            }
            
            // Healing items restore HP
            const healAmount = item.effect.hp || 0;
            const oldHealth = gameState.health;
            gameState.health = Math.min(gameState.maxHealth, gameState.health + healAmount);
            const actualHeal = gameState.health - oldHealth;
            
            updateStats();
            playSoundEffect('sound/heal.mp3');
            
            typeText(`* You ate the ${item.name}. You recovered ${actualHeal} HP!\n`);
            
            // Remove consumable item from inventory after use
            const itemIndex = gameState.inventory.indexOf(itemId);
            gameState.inventory.splice(itemIndex, 1);
            break;
            
        case 'weapon':
            // Equip weapon
            gameState.equippedWeapon = itemId;
            playSoundEffect('sound/equip.mp3');
            typeText(`* You equipped the ${item.name}.\n`);
            break;
            
        case 'armor':
            // Equip armor
            gameState.equippedArmor = itemId;
            playSoundEffect('sound/equip.mp3');
            typeText(`* You equipped the ${item.name}.\n`);
            break;
            
        case 'key':
            // Key items might have special effects
            if (item.effect && item.effect.special) {
                handleSpecialItemEffect(item);
            } else {
                typeText(`* You use the ${item.name}, but nothing happens.\n`);
            }
            break;
            
        default:
            typeText(`* You use the ${item.name}, but nothing happens.\n`);
    }
}

// Handle special item effects
function handleSpecialItemEffect(item) {
    switch (item.effect.special) {
        case 'water_undyne':
            // Special event: giving water to Undyne
            if (gameState.currentLocation === "hotland.entrance") {
                triggerEvent("undyne_helped");
                
                // Remove water cup from inventory
                const itemIndex = gameState.inventory.indexOf(item.id.toLowerCase());
                if (itemIndex !== -1) {
                    gameState.inventory.splice(itemIndex, 1);
                }
            } else {
                typeText(`* You use the ${item.name}, but it doesn't seem useful here.\n`);
            }
            break;
            
        case 'duplicate':
            // Dog residue duplicates itself
            typeText(`* You use the ${item.name}. It multiplied in your inventory!\n`);
            // Add more dog residue
            addToInventory("dog_residue");
            break;
            
        case 'absorb':
            // Annoying dog absorbs items
            typeText(`* The annoying dog jumps out and absorbs the artifact!\n`);
            playSoundEffect('sound/dogsong.mp3');
            break;
            
        default:
            typeText(`* You use the ${item.name}, but nothing happens.\n`);
    }
}

// Open a shop
function openShop(shopId) {
    const shop = gameData.shops[shopId.toUpperCase()];
    
    if (!shop) {
        console.error(`Shop ${shopId} not found.`);
        return;
    }
    
    const textContainer = document.getElementById('text-container');
    textContainer.innerHTML = '';
    
    // Play shop music
    playMusic('music/shop.mp3');
    
    typeText(`* Welcome to ${shop.name}!\n`);
    typeText(`* ${shop.description}\n\n`);
    
    if (shop.shopkeeper) {
        typeText(`${shop.shopkeeper}: ${shop.dialogue.welcome}\n\n`);
    }
    
    typeText(`* Available items:\n`);
    
    shop.items.forEach((item, index) => {
        const itemData = gameData.items[item.id.toUpperCase()];
        typeText(`* ${index + 1}. ${itemData.name} - ${item.price}G\n`);
    });
    
    typeText(`\n* Type 'buy [item number]' to purchase an item, or 'exit' to leave the shop.\n`);
    
    // Temporarily override command handler for shop interaction
    const originalHandler = handleCommand;
    window.handleCommand = () => {
        const commandInput = document.getElementById('command-input');
        const command = commandInput.value.trim().toLowerCase();
        commandInput.value = '';
        
        textContainer.innerHTML += `\n> ${command}\n`;
        
        if (command === 'exit') {
            // Restore original command handler
            window.handleCommand = originalHandler;
            typeText(`* You exit the shop.\n`);
            
            // Restore area music
            const [areaId, _] = gameState.currentLocation.split('.');
            playMusic(`music/${areaId}.mp3`);
            return;
        }
        
        const commandParts = command.split(' ');
        if (commandParts[0] === 'buy') {
            const itemNumber = parseInt(commandParts[1]);
            if (isNaN(itemNumber) || itemNumber < 1 || itemNumber > shop.items.length) {
                typeText(`* Invalid item number.\n`);
                return;
            }
            
            const item = shop.items[itemNumber - 1];
            const itemData = gameData.items[item.id.toUpperCase()];
            
            if (gameState.gold >= item.price) {
                gameState.gold -= item.price;
                addToInventory(item.id);
                updateStats();
                
                playSoundEffect('sound/buy.mp3');
                
                if (shop.shopkeeper) {
                    typeText(`${shop.shopkeeper}: ${shop.dialogue.purchase}\n`);
                }
                
                typeText(`* You bought the ${itemData.name} for ${item.price}G.\n`);
            } else {
                if (shop.shopkeeper) {
                    typeText(`${shop.shopkeeper}: ${shop.dialogue.lowFunds}\n`);
                }
                
                typeText(`* You don't have enough gold to buy that.\n`);
            }
        } else {
            typeText(`* Invalid shop command. Type 'buy [item number]' or 'exit'.\n`);
        }
    };
}

// Show player stats
function showStats() {
    const textContainer = document.getElementById('text-container');
    
    textContainer.innerHTML += `\n* STATS:\n`;
    textContainer.innerHTML += `* LV: ${gameState.lv}\n`;
    textContainer.innerHTML += `* HP: ${gameState.health}/${gameState.maxHealth}\n`;
    textContainer.innerHTML += `* Gold: ${gameState.gold}G\n`;
    
    // Calculate attack value
    let attackValue = 0;
    if (gameState.equippedWeapon) {
        const weapon = gameData.items[gameState.equippedWeapon.toUpperCase()];
        attackValue = weapon.effect.atk || 0;
    }
    
    // Calculate defense value
    let defenseValue = 0;
    if (gameState.equippedArmor) {
        const armor = gameData.items[gameState.equippedArmor.toUpperCase()];
        defenseValue = armor.effect.def || 0;
    }
    
    textContainer.innerHTML += `* ATK: ${attackValue} (Base) + ${Math.floor((gameState.lv - 1) * 2)} (LV) = ${attackValue + Math.floor((gameState.lv - 1) * 2)}\n`;
    textContainer.innerHTML += `* DEF: ${defenseValue} (Base) + ${Math.floor((gameState.lv - 1) * 1)} (LV) = ${defenseValue + Math.floor((gameState.lv - 1) * 1)}\n`;
    
    if (gameState.equippedWeapon) {
        const weapon = gameData.items[gameState.equippedWeapon.toUpperCase()];
        textContainer.innerHTML += `* Weapon: ${weapon.name}\n`;
    } else {
        textContainer.innerHTML += `* Weapon: None\n`;
    }
    
    if (gameState.equippedArmor) {
        const armor = gameData.items[gameState.equippedArmor.toUpperCase()];
        textContainer.innerHTML += `* Armor: ${armor.name}\n`;
    } else {
        textContainer.innerHTML += `* Armor: None\n`;
    }
    
    textContainer.innerHTML += `* Current route: ${gameState.route}\n`;
}

// Show help menu
function showHelp() {
    const textContainer = document.getElementById('text-container');
    
    textContainer.innerHTML += `\n* COMMANDS:\n`;
    textContainer.innerHTML += `* go/move/walk [direction] - Move in a direction (forward, back, north, south, east, west)\n`;
    textContainer.innerHTML += `* look/examine - Examine your current location\n`;
    textContainer.innerHTML += `* take/pickup/get [item] - Pick up an item\n`;
    textContainer.innerHTML += `* inventory/i - View your inventory\n`;
    textContainer.innerHTML += `* use [item] - Use an item from your inventory\n`;
    textContainer.innerHTML += `* shop - Browse the shop at your current location\n`;
    textContainer.innerHTML += `* stats - View your character stats\n`;
    textContainer.innerHTML += `* save - Save your game progress\n`;
    textContainer.innerHTML += `* load - Load your saved game\n`;
    textContainer.innerHTML += `* help - Show this help message\n`;
}

// Update health and stats display
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

// Save game to local storage
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

// Load game from local storage
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

// Load saved game and restore player state
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
    displayLocation(gameState.currentLocation);
}

// Reset the game to starting state
function resetGame() {
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
    
    updateStats();
    displayLocation(gameState.currentLocation);
    playMusic('music/ruins.mp3');
}

// Play background music
function playMusic(src) {
    // Stop any currently playing music
    if (window.currentMusic) {
        window.currentMusic.pause();
    }
    
    // Create new audio element
    const music = new Audio(src);
    music.loop = true;
    music.volume = 0.5;
    music.play().catch(e => console.error("Audio play error:", e));
    
    window.currentMusic = music;
}

// Play sound effect
function playSoundEffect(src) {
    const sound = new Audio(src);
    sound.volume = 0.7;
    sound.play().catch(e => console.error("Audio play error:", e));
}

// Set a game flag
function setFlag(flag, value) {
    gameState.flags[flag] = value;
    console.log(`Flag set: ${flag} = ${value}`);
}

// Start a minigame
function startMinigame(event) {
    const textContainer = document.getElementById('text-container');
    textContainer.innerHTML = '';
    
    // For simplicity, we'll just simulate the minigames
    typeText(`* Starting minigame: ${event.minigame}\n\n`);
    
    setTimeout(() => {
        // Simplification: Automatically succeed at the minigame
        typeText(`* You successfully completed the ${event.minigame}!\n`);
        
        // Mark event as completed
        gameState.completedEvents.push(event.id);
        
        // Trigger outcome
        setTimeout(() => {
            triggerEvent(event.outcomes.win);
        }, 1000);
    }, 2000);
}

// Change screen (title screen, game over, etc.)
function changeScreen(screen) {
    switch (screen) {
        case 'title-screen':
            resetGame();
            break;
            
        case 'credits':
            showCredits();
            break;
            
        default:
            console.log(`Screen change to ${screen} not implemented.`);
    }
}

// Show game credits
function showCredits() {
    const textContainer = document.getElementById('text-container');
    textContainer.innerHTML = '';
    
    // Play credits music
    playMusic('music/credits.mp3');
    
    const credits = [
        "UNDERTALE Text Adventure",
        "Adapted from the original game by Toby Fox",
        "",
        "Original Game Created by Toby Fox",
        "Music by Toby Fox",
        "",
        "This text adventure adaptation is a fan project",
        "and is not affiliated with or endorsed by Toby Fox",
        "",
        "Thank you for playing!",
        "",
        "The End"
    ];
    
    let lineIndex = 0;
    
    function displayNextLine() {
        if (lineIndex < credits.length) {
            typeText(`${credits[lineIndex]}\n`, () => {
                lineIndex++;
                setTimeout(displayNextLine, 1000);
            });
        } else {
            // After credits, return to title screen
            setTimeout(() => {
                resetGame();
            }, 5000);
        }
    }
    
    displayNextLine();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);