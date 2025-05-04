/**
 * UNDERTALE Text Adventure Game - Inventory System
 * This file handles inventory management, item usage, and equipment
 */

// Show inventory screen
function showInventory() {
    showScreen("inventory-screen");
    populateInventory();
}

// Close inventory screen
function closeInventory() {
    showScreen("game-screen");
}

// Populate inventory screen with items
function populateInventory() {
    const inventorySlots = document.getElementById("inventory-slots");
    inventorySlots.innerHTML = "";
    
    // Add inventory items
    GameState.player.inventory.forEach((itemId, index) => {
        const item = window.UNDERTALE.ITEMS[itemId.toUpperCase()];
        
        const itemSlot = document.createElement("div");
        itemSlot.className = "inventory-item";
        itemSlot.setAttribute("data-item-id", itemId);
        itemSlot.textContent = item.name;
        
        // Mark equipped items
        if ((GameState.player.weapon === itemId) || (GameState.player.armor === itemId)) {
            itemSlot.textContent += " (E)";
        }
        
        // Add click event to select item
        itemSlot.addEventListener("click", () => selectInventoryItem(itemId));
        
        inventorySlots.appendChild(itemSlot);
    });
    
    // Add empty slots if inventory is not full
    const maxInventorySize = 8;
    const emptySlots = Math.max(0, maxInventorySize - GameState.player.inventory.length);
    
    for (let i = 0; i < emptySlots; i++) {
        const emptySlot = document.createElement("div");
        emptySlot.className = "inventory-item empty";
        emptySlot.textContent = "Empty";
        inventorySlots.appendChild(emptySlot);
    }
    
    // Clear item details
    document.getElementById("selected-item-name").textContent = "";
    document.getElementById("selected-item-description").textContent = "";
    document.querySelectorAll("#item-actions button").forEach(button => {
        button.style.display = "none";
    });
}

// Select an item in the inventory
function selectInventoryItem(itemId) {
    // Remove selection from all items
    document.querySelectorAll(".inventory-item").forEach(item => {
        item.classList.remove("selected");
    });
    
    // Add selection to clicked item
    document.querySelector(`.inventory-item[data-item-id="${itemId}"]`).classList.add("selected");
    
    // Show item details
    const item = window.UNDERTALE.ITEMS[itemId.toUpperCase()];
    
    document.getElementById("selected-item-name").textContent = item.name;
    document.getElementById("selected-item-description").textContent = item.description;
    
    // Show appropriate action buttons
    document.getElementById("use-item").style.display = item.type === "healing" ? "block" : "none";
    document.getElementById("equip-item").style.display = item.equipable ? "block" : "none";
    document.getElementById("drop-item").style.display = "block";
    
    // Store selected item ID
    document.getElementById("inventory-screen").setAttribute("data-selected-item", itemId);
}

// Use the selected item
function useSelectedItem() {
    const itemId = document.getElementById("inventory-screen").getAttribute("data-selected-item");
    if (!itemId) return;
    
    const item = window.UNDERTALE.ITEMS[itemId.toUpperCase()];
    
    // Apply item effects
    if (item.type === "healing" && item.effect.hp) {
        GameState.player.hp += item.effect.hp;
        if (GameState.player.hp > GameState.player.maxHp) {
            GameState.player.hp = GameState.player.maxHp;
        }
        
        updatePlayerStats();
        appendToGameText(`You used ${item.name}. You recovered ${item.effect.hp} HP!`);
    }
    
    // Remove item from inventory
    removeFromInventory(itemId);
    
    // Update inventory display
    populateInventory();
    
    // Close inventory if empty
    if (GameState.player.inventory.length === 0) {
        closeInventory();
    }
}

// Equip the selected item
function equipSelectedItem() {
    const itemId = document.getElementById("inventory-screen").getAttribute("data-selected-item");
    if (!itemId) return;
    
    equipItem(itemId);
    
    // Update inventory display
    populateInventory();
}

// Equip an item
function equipItem(itemId) {
    const item = window.UNDERTALE.ITEMS[itemId.toUpperCase()];
    
    if (item.equipable) {
        if (item.type === "weapon") {
            // Unequip current weapon if any
            if (GameState.player.weapon) {
                const currentWeapon = window.UNDERTALE.ITEMS[GameState.player.weapon.toUpperCase()];
                if (currentWeapon.effect.atk) {
                    GameState.player.atk -= currentWeapon.effect.atk;
                }
            }
            
            // Equip new weapon
            GameState.player.weapon = itemId;
            if (item.effect.atk) {
                GameState.player.atk += item.effect.atk;
            }
            
            appendToGameText(`You equipped ${item.name}.`);
        } else if (item.type === "armor") {
            // Unequip current armor if any
            if (GameState.player.armor) {
                const currentArmor = window.UNDERTALE.ITEMS[GameState.player.armor.toUpperCase()];
                if (currentArmor.effect.def) {
                    GameState.player.def -= currentArmor.effect.def;
                }
            }
            
            // Equip new armor
            GameState.player.armor = itemId;
            if (item.effect.def) {
                GameState.player.def += item.effect.def;
            }
            
            appendToGameText(`You equipped ${item.name}.`);
        }
    }
}

// Drop the selected item
function dropSelectedItem() {
    const itemId = document.getElementById("inventory-screen").getAttribute("data-selected-item");
    if (!itemId) return;
    
    const item = window.UNDERTALE.ITEMS[itemId.toUpperCase()];
    
    // Check if item is equipped
    if (GameState.player.weapon === itemId) {
        if (confirm(`${item.name} is currently equipped as a weapon. Are you sure you want to drop it?`)) {
            GameState.player.weapon = null;
            if (item.effect.atk) {
                GameState.player.atk -= item.effect.atk;
            }
        } else {
            return;
        }
    } else if (GameState.player.armor === itemId) {
        if (confirm(`${item.name} is currently equipped as armor. Are you sure you want to drop it?`)) {
            GameState.player.armor = null;
            if (item.effect.def) {
                GameState.player.def -= item.effect.def;
            }
        } else {
            return;
        }
    }
    
    // Remove item from inventory
    removeFromInventory(itemId);
    
    appendToGameText(`You dropped the ${item.name}.`);
    
    // Update inventory display
    populateInventory();
    
    // Close inventory if empty
    if (GameState.player.inventory.length === 0) {
        closeInventory();
    }
}

// Add an item to the inventory
function addToInventory(itemId) {
    const item = window.UNDERTALE.ITEMS[itemId.toUpperCase()];
    
    // Check if inventory is full (max 8 items)
    if (GameState.player.inventory.length >= 8) {
        return false;
    }
    
    // Add item to inventory
    GameState.player.inventory.push(itemId);
    
    return true;
}

// Remove an item from the inventory
function removeFromInventory(itemId) {
    const index = GameState.player.inventory.indexOf(itemId);
    if (index !== -1) {
        GameState.player.inventory.splice(index, 1);
        return true;
    }
    return false;
}

// Offer an item to the player
function offerItem(itemId) {
    const item = window.UNDERTALE.ITEMS[itemId.toUpperCase()];
    
    appendToGameText(`You found a ${item.name}!`);
    
    if (GameState.player.inventory.length >= 8) {
        appendToGameText("But your inventory is full.");
        return;
    }
    
    addToInventory(itemId);
    appendToGameText(`Added ${item.name} to your inventory.`);
    
    // Mark item as picked up
    GameState.completedEvents.push(`picked_up_${itemId}`);
}

// Get item name from ID
function getItemName(itemId) {
    const item = window.UNDERTALE.ITEMS[itemId.toUpperCase()];
    return item ? item.name : "Unknown Item";
}