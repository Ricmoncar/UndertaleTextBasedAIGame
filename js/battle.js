/**
 * UNDERTALE Text Adventure Game - Battle System
 * This file handles battle mechanics, enemy encounters, and combat resolution
 */

// Current battle state
const BattleState = {
    enemy: null,
    enemyHp: 0,
    maxEnemyHp: 0,
    turn: 0,
    canSpare: false,
    canFlee: false,
    currentEvent: null
};

// Start a battle
function startBattle(event) {
    // Set up battle state
    const enemyId = event.enemy;
    const enemy = window.UNDERTALE.CHARACTERS[enemyId.toUpperCase()];
    
    if (!enemy) {
        console.error(`Enemy ${enemyId} not found!`);
        return;
    }
    
    BattleState.enemy = enemy;
    BattleState.enemyHp = enemy.stats.hp;
    BattleState.maxEnemyHp = enemy.stats.hp;
    BattleState.turn = 0;
    BattleState.canSpare = event.canSpare;
    BattleState.canFlee = event.canFlee;
    BattleState.currentEvent = event;
    
    // Show battle screen
    showScreen("battle-screen");
    
    // Update battle display
    updateBattleDisplay();
    
    // Show battle intro
    showBattleIntro();
}

// Update battle display
function updateBattleDisplay() {
    // Update enemy display
    document.getElementById("enemy-name").textContent = BattleState.enemy.name;
    document.getElementById("enemy-image").style.backgroundImage = `url('${BattleState.enemy.battleImage}')`;
    
    // Update player stats in battle
    updatePlayerStats();
}

// Show battle intro
function showBattleIntro() {
    const enemy = BattleState.enemy;
    
    // Clear battle text
    document.getElementById("battle-text").innerHTML = "";
    
    // Show intro text
    if (enemy.dialogue && enemy.dialogue.intro) {
        document.getElementById("battle-text").innerHTML = enemy.dialogue.intro;
    } else {
        document.getElementById("battle-text").innerHTML = `${enemy.name} blocks the way!`;
    }
}

// Handle fight button press
function handleFight() {
    // Calculate damage
    const baseDamage = 2 + GameState.player.lv * 2;
    const weaponBonus = GameState.player.weapon ? window.UNDERTALE.ITEMS[GameState.player.weapon.toUpperCase()].effect.atk || 0 : 0;
    const totalDamage = baseDamage + weaponBonus;
    
    // Apply damage to enemy
    BattleState.enemyHp -= totalDamage;
    if (BattleState.enemyHp < 0) BattleState.enemyHp = 0;
    
    // Show damage text
    document.getElementById("battle-text").innerHTML = `You hit ${BattleState.enemy.name} for ${totalDamage} damage!`;
    
    // Check if enemy is defeated
    if (BattleState.enemyHp <= 0) {
        endBattle("win");
    } else {
        // Enemy's turn
        setTimeout(enemyTurn, 1500);
    }
}

// Handle battle act button press
function showBattleActOptions() {
    // Clear submenu
    const actMenu = document.getElementById("act-menu");
    actMenu.innerHTML = "";
    
    // Add act options based on current enemy
    BattleState.enemy.acts.forEach(act => {
        const actButton = document.createElement("button");
        actButton.textContent = act;
        actButton.addEventListener("click", () => handleAct(act.toLowerCase()));
        actMenu.appendChild(actButton);
    });
    
    // Show act menu
    document.querySelectorAll(".submenu").forEach(menu => menu.classList.remove("active"));
    actMenu.classList.add("active");
}

// Handle specific act option
function handleAct(action) {
    let actResponse = "";
    const enemy = BattleState.enemy;
    
    switch (action) {
        case "check":
            actResponse = enemy.dialogue.check || `${enemy.name} - ATK ${enemy.stats.atk} DEF ${enemy.stats.def}`;
            break;
        case "talk":
            actResponse = enemy.dialogue.talk || `You try to talk to ${enemy.name}, but it doesn't seem much for conversation.`;
            break;
        case "flirt":
            actResponse = enemy.dialogue.flirt || `You flirt with ${enemy.name}. But it's not very effective.`;
            break;
        case "threaten":
            actResponse = enemy.dialogue.threaten || `You threaten ${enemy.name}. It doesn't seem impressed.`;
            break;
        case "joke":
            actResponse = enemy.dialogue.joke || `You tell a joke. ${enemy.name} doesn't laugh.`;
            break;
        case "compliment":
            actResponse = enemy.dialogue.compliment || `You compliment ${enemy.name}. It seems confused.`;
            break;
        case "pet":
            actResponse = enemy.dialogue.pet || `You pet ${enemy.name}. It seems to appreciate that.`;
            break;
        default:
            actResponse = `You try to ${action}, but nothing happens.`;
    }
    
    // Show act response
    document.getElementById("battle-text").innerHTML = actResponse;
    
    // Check if this act enables sparing
    if (action === "spare" && BattleState.canSpare) {
        BattleState.canSpare = true;
    }
    
    // Hide submenu
    document.querySelectorAll(".submenu").forEach(menu => menu.classList.remove("active"));
    
    // Enemy's turn
    setTimeout(enemyTurn, 1500);
}

// Show battle inventory
function showBattleInventory() {
    // Clear submenu
    const itemMenu = document.getElementById("item-menu");
    itemMenu.innerHTML = "";
    
    // Add items from inventory
    GameState.player.inventory.forEach(itemId => {
        const item = window.UNDERTALE.ITEMS[itemId.toUpperCase()];
        if (item.battleUse) {
            const itemButton = document.createElement("button");
            itemButton.textContent = item.name;
            itemButton.addEventListener("click", () => handleBattleItem(itemId));
            itemMenu.appendChild(itemButton);
        }
    });
    
    // Show item menu
    document.querySelectorAll(".submenu").forEach(menu => menu.classList.remove("active"));
    itemMenu.classList.add("active");
}

// Handle using an item in battle
function handleBattleItem(itemId) {
    const item = window.UNDERTALE.ITEMS[itemId.toUpperCase()];
    
    // Apply item effect
    if (item.effect.hp) {
        GameState.player.hp += item.effect.hp;
        if (GameState.player.hp > GameState.player.maxHp) {
            GameState.player.hp = GameState.player.maxHp;
        }
        updatePlayerStats();
        document.getElementById("battle-text").innerHTML = `You used ${item.name}. You recovered ${item.effect.hp} HP!`;
    }
    
    // Remove item from inventory
    const itemIndex = GameState.player.inventory.indexOf(itemId);
    if (itemIndex !== -1) {
        GameState.player.inventory.splice(itemIndex, 1);
    }
    
    // Hide submenu
    document.querySelectorAll(".submenu").forEach(menu => menu.classList.remove("active"));
    
    // Enemy's turn
    setTimeout(enemyTurn, 1500);
}

// Handle spare button press
function handleSpare() {
    if (BattleState.canSpare) {
        endBattle("spare");
    } else {
        document.getElementById("battle-text").innerHTML = `You tried to spare ${BattleState.enemy.name}, but it doesn't seem ready to be spared yet.`;
        
        // Enemy's turn
        setTimeout(enemyTurn, 1500);
    }
}

// Enemy turn in battle
function enemyTurn() {
    BattleState.turn++;
    
    // Choose a random bullet pattern
    const bulletPatterns = Object.values(window.UNDERTALE.BULLET_PATTERNS);
    const pattern = bulletPatterns[Math.floor(Math.random() * bulletPatterns.length)];
    
    // Calculate damage
    const baseDamage = BattleState.enemy.stats.atk;
    const defenseFactor = 1 - (GameState.player.def / 100);
    const finalDamage = Math.max(1, Math.floor(baseDamage * defenseFactor));
    
    // Apply damage to player
    GameState.player.hp -= finalDamage;
    if (GameState.player.hp < 0) GameState.player.hp = 0;
    
    // Update player stats
    updatePlayerStats();
    
    // Show attack text
    document.getElementById("battle-text").innerHTML = `${BattleState.enemy.name} attacks! You take ${finalDamage} damage.`;
    
    // Check if player is defeated
    if (GameState.player.hp <= 0) {
        endBattle("lose");
    }
}

// End battle and determine outcome
function endBattle(outcome) {
    const event = BattleState.currentEvent;
    
    switch (outcome) {
        case "win":
            // Add enemy to killed list
            if (!GameState.player.killedMonsters.includes(BattleState.enemy.id)) {
                GameState.player.killedMonsters.push(BattleState.enemy.id);
            }
            
            // Award EXP and GOLD
            const expGain = BattleState.enemy.stats.hp / 2;
            const goldGain = BattleState.enemy.stats.hp / 3;
            
            GameState.player.exp += expGain;
            GameState.player.gold += goldGain;
            
            // Check for level up
            checkLevelUp();
            
            // Show victory text
            document.getElementById("battle-text").innerHTML = `You defeated ${BattleState.enemy.name}! Gained ${expGain} EXP and ${goldGain} GOLD.`;
            
            // Return to game screen after delay
            setTimeout(() => {
                showScreen("game-screen");
                if (event.outcome.win) {
                    triggerEvent(event.outcome.win);
                }
            }, 2000);
            break;
            
        case "lose":
            // Show defeat text
            document.getElementById("battle-text").innerHTML = `You were defeated by ${BattleState.enemy.name}!`;
            
            // Trigger game over after delay
            setTimeout(() => {
                if (event.outcome.lose) {
                    triggerEvent(event.outcome.lose);
                } else {
                    showGameOver({ message: "You lost the battle." });
                }
            }, 2000);
            break;
            
        case "spare":
            // Add enemy to spared list
            if (!GameState.player.sparedMonsters.includes(BattleState.enemy.id)) {
                GameState.player.sparedMonsters.push(BattleState.enemy.id);
            }
            
            // Show mercy text
            document.getElementById("battle-text").innerHTML = `You spared ${BattleState.enemy.name}.`;
            
            // Return to game screen after delay
            setTimeout(() => {
                showScreen("game-screen");
                if (event.outcome.spare) {
                    triggerEvent(event.outcome.spare);
                }
            }, 2000);
            break;
    }
}

// Check if player has enough EXP to level up
function checkLevelUp() {
    const expNeeded = GameState.player.lv * 10;
    
    if (GameState.player.exp >= expNeeded) {
        GameState.player.lv++;
        GameState.player.exp -= expNeeded;
        GameState.player.maxHp += 4;
        GameState.player.hp = GameState.player.maxHp;
        
        updatePlayerStats();
        appendToGameText(`You are now LV ${GameState.player.lv}! HP increased to ${GameState.player.maxHp}!`);
        
        // Check for route change based on LV
        if (GameState.player.lv >= 10) {
            GameState.route = "genocide";
        }
    }
}