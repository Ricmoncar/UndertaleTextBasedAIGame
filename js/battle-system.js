/**
 * UNDERTALE Text Adventure Game - Battle System
 * This file handles battle mechanics for the Undertale text adventure
 */

// Battle state object
let battleState = {
    active: false,
    enemy: null,
    enemyHP: 0,
    playerTurn: true,
    canSpare: false,
    event: null,
    actOptions: [],
    mercyOptions: ['Spare', 'Flee'],
    turns: 0
};

// Initialize a battle
function startBattle(event) {
    const enemy = gameData.characters[event.enemy.toUpperCase()];
    if (!enemy) {
        console.error(`Enemy ${event.enemy} not found.`);
        return;
    }
    
    // Prepare battle state
    battleState = {
        active: true,
        enemy: enemy,
        enemyHP: enemy.stats.hp,
        playerTurn: true,
        canSpare: event.canSpare,
        event: event,
        actOptions: enemy.acts || ['Check'],
        mercyOptions: ['Spare', 'Flee'],
        turns: 0
    };
    
    // Switch UI to battle mode
    const textContainer = document.getElementById('text-container');
    const battleContainer = document.getElementById('battle-container');
    const inputContainer = document.getElementById('input-container');
    
    textContainer.innerHTML = '';
    inputContainer.style.display = 'none';
    battleContainer.style.display = 'flex';
    
    // Play battle music
    playMusic('sound/battle.mp3');
    
    // Display enemy
    const battleEnemy = document.getElementById('battle-enemy');
    battleEnemy.innerHTML = `
        <div class="enemy-image">
            <div>${enemy.name}</div>
            <div id="enemy-hp-bar" style="width: 200px; height: 10px; background-color: #444; margin-top: 10px;">
                <div id="enemy-hp-fill" style="width: 100%; height: 100%; background-color: #0f0;"></div>
            </div>
        </div>
    `;
    
    // Initialize battle UI
    initBattleActions();
    
    // Show battle intro text
    typeText(`* A wild ${enemy.name} appears!\n`);
    typeText(`* ${enemy.description}\n`);
    
    // Play battle start sound
    playSoundEffect('sound/battle-start.mp3');
    
    // Initialize player soul
    const battleSoul = document.getElementById('battle-soul');
    battleSoul.style.animation = 'soul-pulse 1s infinite';
}

// Initialize battle action buttons
function initBattleActions() {
    const battleActions = document.querySelectorAll('.battle-action');
    
    battleActions.forEach(action => {
        action.addEventListener('click', handleBattleAction);
    });
}

// Handle player battle actions (FIGHT, ACT, ITEM, MERCY)
function handleBattleAction(e) {
    if (!battleState.active || !battleState.playerTurn) return;
    
    const action = e.target.getAttribute('data-action');
    
    switch (action) {
        case 'fight':
            // Attack enemy
            battleAttack();
            break;
        case 'act':
            // Show ACT options
            showActOptions();
            break;
        case 'item':
            // Show ITEM options
            showBattleInventory();
            break;
        case 'mercy':
            // Show MERCY options
            showMercyOptions();
            break;
    }
}

// Player attacks the enemy
function battleAttack() {
    battleState.playerTurn = false;
    
    // Calculate damage based on weapon and LV
    let baseDamage = 4; // Base damage
    
    if (gameState.equippedWeapon) {
        const weapon = gameData.items[gameState.equippedWeapon.toUpperCase()];
        if (weapon && weapon.effect && weapon.effect.atk) {
            baseDamage += weapon.effect.atk;
        }
    }
    
    // LV bonus
    baseDamage += (gameState.lv - 1) * 2;
    
    // Random variation (+/- 2)
    const damage = Math.max(1, baseDamage + Math.floor(Math.random() * 5) - 2);
    
    // Play attack sound
    playSoundEffect('sound/attack.mp3');
    
    // Animate attack
    const battleBox = document.getElementById('battle-box');
    battleBox.classList.add('screen-transition');
    
    setTimeout(() => {
        battleBox.classList.remove('screen-transition');
        
        // Apply damage
        battleState.enemyHP = Math.max(0, battleState.enemyHP - damage);
        
        // Update enemy HP bar
        const hpPercentage = (battleState.enemyHP / battleState.enemy.stats.hp) * 100;
        document.getElementById('enemy-hp-fill').style.width = `${hpPercentage}%`;
        
        // Show damage text
        typeText(`* You attack! Dealt ${damage} damage to ${battleState.enemy.name}.\n`);
        
        // Check if enemy defeated
        if (battleState.enemyHP <= 0) {
            endBattle('win');
        } else {
            // Enemy turn
            setTimeout(enemyTurn, 1500);
        }
    }, 500);
}

// Show ACT options for the current enemy
function showActOptions() {
    const textContainer = document.getElementById('text-container');
    textContainer.innerHTML = '';
    
    typeText(`* ACT - ${battleState.enemy.name}\n`);
    
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';
    
    battleState.actOptions.forEach(act => {
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.textContent = act;
        button.addEventListener('click', () => {
            choicesContainer.innerHTML = '';
            performAct(act);
        });
        choicesContainer.appendChild(button);
    });
    
    // Add back button
    const backButton = document.createElement('button');
    backButton.className = 'choice-button';
    backButton.textContent = 'Back';
    backButton.addEventListener('click', () => {
        choicesContainer.innerHTML = '';
        typeText(`* What will you do?\n`);
    });
    choicesContainer.appendChild(backButton);
}

// Perform an ACT action
function performAct(action) {
    battleState.playerTurn = false;
    
    // Play act sound
    playSoundEffect('sound/select.mp3');
    
    let response = '';
    
    switch (action.toLowerCase()) {
        case 'check':
            response = battleState.enemy.dialogue.check || `* ${battleState.enemy.name} - ATK ${battleState.enemy.stats.atk} DEF ${battleState.enemy.stats.def}\n* No additional information available.`;
            break;
        case 'talk':
            response = battleState.enemy.dialogue.talk || `* You try to talk to ${battleState.enemy.name}, but it doesn't seem interested in conversation.`;
            break;
        case 'flirt':
            response = battleState.enemy.dialogue.flirt || `* You flirt with ${battleState.enemy.name}. But nothing happened.`;
            break;
        case 'pet':
            response = battleState.enemy.dialogue.pet || `* You pet ${battleState.enemy.name}. It seems to appreciate it.`;
            break;
        case 'plead':
            response = battleState.enemy.dialogue.plead || `* You plead with ${battleState.enemy.name} to stop fighting. But nothing happened.`;
            break;
        case 'joke':
            response = battleState.enemy.dialogue.joke || `* You tell a bad joke. ${battleState.enemy.name} doesn't seem amused.`;
            break;
        default:
            response = `* You tried to ${action}, but nothing happened.`;
    }
    
    typeText(response + '\n');
    
    // Some acts might make the enemy spareable
    if (['talk', 'flirt', 'pet', 'plead', 'joke'].includes(action.toLowerCase())) {
        battleState.turns++;
        
        // Make enemy spareable after enough acts
        if (battleState.turns >= 3 && battleState.event.canSpare) {
            battleState.canSpare = true;
            typeText(`* ${battleState.enemy.name} seems tired of fighting.\n`);
        }
    }
    
    // Enemy turn
    setTimeout(enemyTurn, 2000);
}

// Show inventory during battle
function showBattleInventory() {
    const textContainer = document.getElementById('text-container');
    textContainer.innerHTML = '';
    
    typeText(`* ITEM\n`);
    
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';
    
    if (gameState.inventory.length === 0) {
        typeText(`* Your inventory is empty.\n`);
        
        // Add back button
        const backButton = document.createElement('button');
        backButton.className = 'choice-button';
        backButton.textContent = 'Back';
        backButton.addEventListener('click', () => {
            choicesContainer.innerHTML = '';
            typeText(`* What will you do?\n`);
        });
        choicesContainer.appendChild(backButton);
        
        return;
    }
    
    // Filter inventory to show only usable items in battle
    const usableItems = gameState.inventory.filter(itemId => {
        const item = gameData.items[itemId.toUpperCase()];
        return item && item.battleUse;
    });
    
    if (usableItems.length === 0) {
        typeText(`* You don't have any items you can use in battle.\n`);
        
        // Add back button
        const backButton = document.createElement('button');
        backButton.className = 'choice-button';
        backButton.textContent = 'Back';
        backButton.addEventListener('click', () => {
            choicesContainer.innerHTML = '';
            typeText(`* What will you do?\n`);
        });
        choicesContainer.appendChild(backButton);
        
        return;
    }
    
    usableItems.forEach(itemId => {
        const item = gameData.items[itemId.toUpperCase()];
        
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.textContent = item.name;
        button.addEventListener('click', () => {
            choicesContainer.innerHTML = '';
            useBattleItem(itemId);
        });
        choicesContainer.appendChild(button);
    });
    
    // Add back button
    const backButton = document.createElement('button');
    backButton.className = 'choice-button';
    backButton.textContent = 'Back';
    backButton.addEventListener('click', () => {
        choicesContainer.innerHTML = '';
        typeText(`* What will you do?\n`);
    });
    choicesContainer.appendChild(backButton);
}

// Use an item during battle
function useBattleItem(itemId) {
    battleState.playerTurn = false;
    const item = gameData.items[itemId.toUpperCase()];
    
    if (!item) {
        console.error(`Item ${itemId} not found.`);
        return;
    }
    
    // Play item use sound
    playSoundEffect('sound/item.mp3');
    
    // Handle different item types
    switch (item.type) {
        case 'healing':
            // Healing items restore HP
            const healAmount = item.effect.hp || 0;
            const oldHealth = gameState.health;
            gameState.health = Math.min(gameState.maxHealth, gameState.health + healAmount);
            const actualHeal = gameState.health - oldHealth;
            
            updateStats();
            
            typeText(`* You ate the ${item.name}. You recovered ${actualHeal} HP!\n`);
            
            // Remove consumable item from inventory
            const itemIndex = gameState.inventory.indexOf(itemId);
            gameState.inventory.splice(itemIndex, 1);
            break;
            
        default:
            typeText(`* You used the ${item.name}, but nothing happened.\n`);
    }
    
    // Enemy turn
    setTimeout(enemyTurn, 1500);
}

// Show mercy options
function showMercyOptions() {
    const textContainer = document.getElementById('text-container');
    textContainer.innerHTML = '';
    
    typeText(`* MERCY\n`);
    
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';
    
    battleState.mercyOptions.forEach(mercy => {
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.textContent = mercy;
        button.addEventListener('click', () => {
            choicesContainer.innerHTML = '';
            performMercy(mercy);
        });
        choicesContainer.appendChild(button);
    });
    
    // Add back button
    const backButton = document.createElement('button');
    backButton.className = 'choice-button';
    backButton.textContent = 'Back';
    backButton.addEventListener('click', () => {
        choicesContainer.innerHTML = '';
        typeText(`* What will you do?\n`);
    });
    choicesContainer.appendChild(backButton);
}

// Perform a mercy action
function performMercy(action) {
    battleState.playerTurn = false;
    
    switch (action.toLowerCase()) {
        case 'spare':
            if (battleState.canSpare) {
                // End battle with spare
                playSoundEffect('sound/spare.mp3');
                typeText(`* You spared ${battleState.enemy.name}.\n`);
                
                setTimeout(() => {
                    endBattle('spare');
                }, 1500);
            } else {
                playSoundEffect('sound/menu_select.mp3');
                typeText(`* You tried to spare ${battleState.enemy.name}, but they didn't want to be spared.\n`);
                
                // Enemy turn
                setTimeout(enemyTurn, 1500);
            }
            break;
        case 'flee':
            if (battleState.event.canFlee) {
                // Random chance to flee
                const fleeChance = 0.5 + (0.1 * gameState.lv); // Higher LV = better chance to flee
                
                if (Math.random() < fleeChance) {
                    playSoundEffect('sound/flee.mp3');
                    typeText(`* You ran away!\n`);
                    
                    setTimeout(() => {
                        endBattle('flee');
                    }, 1500);
                } else {
                    playSoundEffect('sound/menu_select.mp3');
                    typeText(`* Couldn't escape!\n`);
                    
                    // Enemy turn
                    setTimeout(enemyTurn, 1500);
                }
            } else {
                playSoundEffect('sound/menu_select.mp3');
                typeText(`* You can't run from this battle!\n`);
                
                // Enemy turn
                setTimeout(enemyTurn, 1500);
            }
            break;
    }
}

// Enemy turn in battle
function enemyTurn() {
    // Check if battle already ended
    if (!battleState.active) return;
    
    typeText(`* ${battleState.enemy.name} attacks!\n`);
    
    // Get enemy bullet pattern
    const bulletPattern = getBulletPattern();
    
    // Simulate bullet pattern visually
    simulateBulletPattern(bulletPattern);
}

// Get the enemy's bullet pattern
function getBulletPattern() {
    const enemy = battleState.enemy;
    let pattern = null;
    
    // Check if enemy has assigned bullet pattern
    if (enemy.id && gameData.BULLET_PATTERNS && gameData.BULLET_PATTERNS[enemy.id.toUpperCase()]) {
        pattern = gameData.BULLET_PATTERNS[enemy.id.toUpperCase()];
    } else {
        // Default simple pattern
        pattern = {
            name: "Basic Attack",
            description: "A simple attack pattern.",
            damage: enemy.stats.atk || 5,
            pattern: "circle",
            speed: 2
        };
    }
    
    return pattern;
}

// Simulate a bullet pattern visually
function simulateBulletPattern(bulletPattern) {
    const battleBox = document.getElementById('battle-box');
    const battleSoul = document.getElementById('battle-soul');
    
    // Reset battle box
    battleBox.innerHTML = '';
    battleBox.appendChild(battleSoul);
    
    // Add bullets based on pattern
    const bullets = [];
    const bulletCount = Math.min(5 + battleState.turns, 12); // More bullets as battle progresses
    
    for (let i = 0; i < bulletCount; i++) {
        const bullet = document.createElement('div');
        bullet.className = 'battle-bullet';
        
        // Position based on pattern
        let x, y;
        
        switch (bulletPattern.pattern) {
            case 'circle':
                // Circle pattern around the center
                const angle = (i / bulletCount) * 2 * Math.PI;
                const radius = 50 + Math.random() * 30;
                x = 200 + Math.cos(angle) * radius;
                y = 75 + Math.sin(angle) * radius;
                break;
            case 'wave':
                // Wave pattern from top
                x = (i / bulletCount) * 400;
                y = 20 + Math.sin((i / bulletCount) * 2 * Math.PI) * 30;
                break;
            case 'rain':
                // Rain from top
                x = Math.random() * 380 + 10;
                y = Math.random() * 30 + 10;
                break;
            default:
                // Random positions
                x = Math.random() * 380 + 10;
                y = Math.random() * 130 + 10;
        }
        
        bullet.style.left = `${x}px`;
        bullet.style.top = `${y}px`;
        
        battleBox.appendChild(bullet);
        bullets.push({
            element: bullet,
            x: x,
            y: y,
            direction: Math.random() * 2 * Math.PI,
            speed: bulletPattern.speed * (0.5 + Math.random() * 0.5)
        });
    }
    
    // Animate bullets
    let animationFrameId;
    let startTime = Date.now();
    const duration = 3000; // 3 seconds
    let damaged = false;
    
    function animateBullets() {
        const elapsed = Date.now() - startTime;
        
        if (elapsed >= duration) {
            // End enemy turn
            cancelAnimationFrame(animationFrameId);
            
            // If no damage taken, apply damage anyway (simplified for text adventure)
            if (!damaged) {
                takeBattleDamage(bulletPattern.damage);
            }
            
            return;
        }
        
        // Check for collision with soul (simplified)
        if (!damaged && Math.random() < 0.5) {
            // 50% chance to take damage during animation
            damaged = true;
            takeBattleDamage(bulletPattern.damage);
        }
        
        // Move bullets
        bullets.forEach(bullet => {
            bullet.x += Math.cos(bullet.direction) * bullet.speed;
            bullet.y += Math.sin(bullet.direction) * bullet.speed;
            
            // Bounce off walls
            if (bullet.x < 0 || bullet.x > 390) {
                bullet.direction = Math.PI - bullet.direction;
                bullet.x = Math.max(0, Math.min(390, bullet.x));
            }
            
            if (bullet.y < 0 || bullet.y > 140) {
                bullet.direction = -bullet.direction;
                bullet.y = Math.max(0, Math.min(140, bullet.y));
            }
            
            bullet.element.style.left = `${bullet.x}px`;
            bullet.element.style.top = `${bullet.y}px`;
        });
        
        animationFrameId = requestAnimationFrame(animateBullets);
    }
    
    // Start animation
    animationFrameId = requestAnimationFrame(animateBullets);
    
    // Play bullet sound
    playSoundEffect('sound/bullet.mp3');
}

// Player takes damage in battle
function takeBattleDamage(baseDamage) {
    // Calculate actual damage based on defense
    let defense = 0;
    
    if (gameState.equippedArmor) {
        const armor = gameData.items[gameState.equippedArmor.toUpperCase()];
        if (armor && armor.effect && armor.effect.def) {
            defense = armor.effect.def;
        }
    }
    
    // Random variation (+/- 2)
    const damage = Math.max(1, baseDamage - defense + Math.floor(Math.random() * 5) - 2);
    
    // Apply damage
    gameState.health = Math.max(0, gameState.health - damage);
    
    // Update health display
    updateStats();
    
    // Play damage sound
    playSoundEffect('sound/damage.mp3');
    
    // Flash screen red
    document.body.style.backgroundColor = "#500000";
    setTimeout(() => {
        document.body.style.backgroundColor = "#000";
    }, 100);
    
    // Show damage text
    typeText(`* ${battleState.enemy.name} hits you for ${damage} damage!\n`);
    
    // Check if player defeated
    if (gameState.health <= 0) {
        endBattle('lose');
        return;
    }
    
    // Return to player turn after animation
    setTimeout(() => {
        battleState.playerTurn = true;
        typeText(`* What will you do?\n`);
    }, 1500);
}

// End battle with an outcome
function endBattle(outcome) {
    battleState.active = false;
    
    // Hide battle UI
    const battleContainer = document.getElementById('battle-container');
    const inputContainer = document.getElementById('input-container');
    
    battleContainer.style.display = 'none';
    inputContainer.style.display = 'flex';
    
    // Trigger appropriate outcome event
    const event = battleState.event;
    
    switch (outcome) {
        case 'win':
            // Award EXP and Gold
            const expGain = battleState.enemy.stats.hp / 4;
            const goldGain = Math.floor(Math.random() * 30) + 10;
            
            gameState.gold += goldGain;
            
            typeText(`* You defeated ${battleState.enemy.name}!\n`);
            typeText(`* You gained ${goldGain} gold.\n`);
            
            // Check for route change
            if (event.outcome.win) {
                // Route might change based on kill
                if (gameState.route === "pacifist") {
                    gameState.route = "neutral";
                }
                
                setTimeout(() => {
                    triggerEvent(event.outcome.win);
                }, 1500);
            }
            break;
        case 'lose':
            // Game over
            typeText(`* You were defeated by ${battleState.enemy.name}.\n`);
            
            setTimeout(() => {
                if (event.outcome.lose) {
                    triggerEvent(event.outcome.lose);
                } else {
                    triggerEvent("game_over_generic");
                }
            }, 1500);
            break;
        case 'spare':
            // Spared enemy
            typeText(`* You spared ${battleState.enemy.name}.\n`);
            
            // Award Gold but no EXP
            const mercyGold = Math.floor(Math.random() * 20) + 5;
            gameState.gold += mercyGold;
            
            typeText(`* You gained ${mercyGold} gold.\n`);
            
            if (event.outcome.spare) {
                setTimeout(() => {
                    triggerEvent(event.outcome.spare);
                }, 1500);
            }
            break;
        case 'flee':
            // Ran away
            typeText(`* You got away safely!\n`);
            break;
    }
    
    // Resume normal music
    const [areaId, _] = gameState.currentLocation.split('.');
    playMusic(`music/${areaId}.mp3`);
    
    // Mark battle event as completed
    gameState.completedEvents.push(event.id);
    
    // Update stats display
    updateStats();
}

// Export functions for use in the main game
window.startBattle = startBattle;
window.endBattle = endBattle;