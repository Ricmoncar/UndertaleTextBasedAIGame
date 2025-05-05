class BattleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BattleScene' });
    }
    
    init(data) {
        // Store battle data
        this.eventId = data.eventId;
        this.enemyId = data.enemy;
        this.canSpare = data.canSpare || false;
        this.canFlee = data.canFlee !== false; // Default to true
        
        // Battle state
        this.battleState = {
            active: true,
            playerTurn: true,
            currentHP: 0,
            maxHP: 0,
            turns: 0,
            canSpare: this.canSpare
        };
    }
    
    create() {
        console.log('Battle scene started');
        
        // Get enemy data
        this.enemy = UNDERTALE.gameData.characters[this.enemyId.toUpperCase()];
        if (!this.enemy) {
            console.error(`Enemy ${this.enemyId} not found.`);
            this.endBattle('flee');
            return;
        }
        
        // Set up battle state
        this.battleState.currentHP = this.enemy.stats.hp;
        this.battleState.maxHP = this.enemy.stats.hp;
        
        // Play battle music
        this.battleMusic = this.sound.add('music-battle', { loop: true, volume: 0.5 });
        this.battleMusic.play();
        
        // Set up UI
        this.setupBattleUI();
        
        // Show intro text
        this.typeText(`* A wild ${this.enemy.name} appears!\n\n* ${this.enemy.description}\n`);
        
        // Setup battle actions after intro
        this.time.delayedCall(2000, () => {
            this.typeText(`* What will you do?\n`);
        });
    }
    
    setupBattleUI() {
        // Background
        this.cameras.main.setBackgroundColor('#000000');
        
        // Enemy display area (top third)
        this.enemyContainer = this.add.container(400, 120);
        
        // Enemy sprite/name
        if (this.textures.exists(`character-${this.enemyId.toLowerCase()}`)) {
            this.enemySprite = this.add.image(0, 0, `character-${this.enemyId.toLowerCase()}`);
            this.enemyContainer.add(this.enemySprite);
        } else {
            // Use text as fallback
            this.enemyText = this.add.text(0, 0, this.enemy.name, {
                fontFamily: 'monospace',
                fontSize: '32px',
                color: '#ffffff'
            }).setOrigin(0.5);
            this.enemyContainer.add(this.enemyText);
        }
        
        // Enemy HP bar
        this.enemyHPLabel = this.add.text(-100, 50, "HP:", {
            fontFamily: 'monospace',
            fontSize: '16px',
            color: '#ffffff'
        });
        
        this.enemyHPBarBg = this.add.rectangle(-40, 50, 200, 10, 0x333333).setOrigin(0, 0.5);
        this.enemyHPBar = this.add.rectangle(-40, 50, 200, 10, 0x00ff00).setOrigin(0, 0.5);
        
        this.enemyContainer.add([this.enemyHPLabel, this.enemyHPBarBg, this.enemyHPBar]);
        
        // Battle box (middle third)
        this.battleBox = this.add.rectangle(400, 300, 400, 150, 0x000000)
            .setStrokeStyle(4, 0xffffff);
        
        // Soul (player character in battle)
        this.playerSoul = this.add.image(400, 300, 'ui-soul').setScale(2);
        
        // Text area
        this.textDisplay = this.add.text(220, 230, '', {
            fontFamily: 'monospace',
            fontSize: '18px',
            color: '#ffffff',
            wordWrap: { width: 360 }
        });
        
        // Battle actions (bottom third)
        this.actionButtons = [];
        const actions = ['FIGHT', 'ACT', 'ITEM', 'MERCY'];
        const startX = 220;
        
        actions.forEach((action, index) => {
            const button = this.add.text(startX + (index * 100), 450, action, {
                fontFamily: 'monospace',
                fontSize: '20px',
                color: '#ffffff',
                backgroundColor: '#000000',
                padding: { x: 10, y: 5 }
            })
            .setStrokeStyle(2, 0xffffff)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                if (this.battleState.playerTurn) {
                    this.sound.play('sfx-select');
                    this.handleBattleAction(action.toLowerCase());
                }
            })
            .on('pointerover', () => {
                button.setStyle({ color: '#ffff00' });
            })
            .on('pointerout', () => {
                button.setStyle({ color: '#ffffff' });
            });
            
            this.actionButtons.push(button);
        });
        
        // Choices container (for ACT/ITEM/MERCY options)
        this.choicesContainer = this.add.container(400, 370);
    }
    
    typeText(text) {
        // Clear current text
        this.textDisplay.setText('');
        
        // Type text character by character
        let index = 0;
        const textSound = this.sound.add('sfx-text', { volume: 0.5 });
        
        this.textTimer = this.time.addEvent({
            delay: 30,
            callback: () => {
                if (index < text.length) {
                    // Add next character
                    if (text[index] === '\n') {
                        this.textDisplay.text += '\n';
                    } else {
                        this.textDisplay.text += text[index];
                        
                        // Play text sound for characters (not spaces)
                        if (text[index] !== ' ') {
                            textSound.play();
                        }
                    }
                    
                    index++;
                } else {
                    // Text complete
                    this.textTimer.remove();
                }
            },
            repeat: text.length
        });
    }
    
    handleBattleAction(action) {
        // Clear choices container
        this.choicesContainer.removeAll(true);
        
        switch (action) {
            case 'fight':
                this.performAttack();
                break;
            case 'act':
                this.showActOptions();
                break;
            case 'item':
                this.showItemOptions();
                break;
            case 'mercy':
                this.showMercyOptions();
                break;
        }
    }
    
    performAttack() {
        this.battleState.playerTurn = false;
        
        // Calculate damage based on weapon and LV
        let baseDamage = 4; // Base damage
        
        if (UNDERTALE.gameState.equippedWeapon) {
            const weapon = UNDERTALE.gameData.items[UNDERTALE.gameState.equippedWeapon.toUpperCase()];
            if (weapon && weapon.effect && weapon.effect.atk) {
                baseDamage += weapon.effect.atk;
            }
        }
        
        // LV bonus
        baseDamage += (UNDERTALE.gameState.lv - 1) * 2;
        
        // Random variation (+/- 2)
        const damage = Math.max(1, baseDamage + Math.floor(Math.random() * 5) - 2);
        
        // Play attack sound
        this.sound.play('sfx-attack');
        
        // Animate attack
        this.cameras.main.shake(200, 0.005);
        
        // Apply damage after a delay
        this.time.delayedCall(500, () => {
            // Apply damage
            this.battleState.currentHP = Math.max(0, this.battleState.currentHP - damage);
            
            // Update enemy HP bar
            const hpPercentage = (this.battleState.currentHP / this.battleState.maxHP) * 100;
            this.enemyHPBar.width = (200 * hpPercentage) / 100;
            
            // Show damage text
            this.typeText(`* You attack! Dealt ${damage} damage to ${this.enemy.name}.\n`);
            
            // Check if enemy defeated
            if (this.battleState.currentHP <= 0) {
                this.time.delayedCall(1500, () => {
                    this.endBattle('win');
                });
            } else {
                // Enemy turn after delay
                this.time.delayedCall(1500, () => {
                    this.enemyTurn();
                });
            }
        });
    }
    
    showActOptions() {
        // Get enemy's act options
        const actOptions = this.enemy.acts || ['Check'];
        
        // Display act prompt
        this.typeText(`* ACT - ${this.enemy.name}\n`);
        
        // Create act buttons
        let y = 0;
        actOptions.forEach(act => {
            const button = this.add.text(0, y, `* ${act}`, {
                fontFamily: 'monospace',
                fontSize: '18px',
                color: '#ffff00',
                backgroundColor: '#000000',
                padding: { x: 10, y: 5 }
            })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.sound.play('sfx-select');
                this.choicesContainer.removeAll(true);
                this.performAct(act);
            })
            .on('pointerover', () => {
                button.setStyle({ color: '#ffffff' });
            })
            .on('pointerout', () => {
                button.setStyle({ color: '#ffff00' });
            });
            
            this.choicesContainer.add(button);
            y += 40;
        });
        
        // Add back button
        const backButton = this.add.text(0, y, `* Back`, {
            fontFamily: 'monospace',
            fontSize: '18px',
            color: '#ffff00',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            this.sound.play('sfx-select');
            this.choicesContainer.removeAll(true);
            this.typeText(`* What will you do?\n`);
        })
        .on('pointerover', () => {
            backButton.setStyle({ color: '#ffffff' });
        })
        .on('pointerout', () => {
            backButton.setStyle({ color: '#ffff00' });
        });
        
        this.choicesContainer.add(backButton);
        
        // Position the container
        this.choicesContainer.setPosition(
            this.cameras.main.width / 2 - 100,
            250
        );
    }
    
    performAct(action) {
        this.battleState.playerTurn = false;
        
        // Play act sound
        this.sound.play('sfx-select');
        
        let response = '';
        
        switch (action.toLowerCase()) {
            case 'check':
                response = this.enemy.dialogue.check || `* ${this.enemy.name} - ATK ${this.enemy.stats.atk} DEF ${this.enemy.stats.def}\n* No additional information available.`;
                break;
            case 'talk':
                response = this.enemy.dialogue.talk || `* You try to talk to ${this.enemy.name}, but it doesn't seem interested in conversation.`;
                break;
            case 'flirt':
                response = this.enemy.dialogue.flirt || `* You flirt with ${this.enemy.name}. But nothing happened.`;
                break;
            default:
                response = `* You tried to ${action}, but nothing happened.`;
        }
        
        this.typeText(response + '\n');
        
        // Some acts might make the enemy spareable
        if (['talk', 'flirt', 'pet', 'plead', 'joke'].includes(action.toLowerCase())) {
            this.battleState.turns++;
            
            // Make enemy spareable after enough acts
            if (this.battleState.turns >= 3 && this.canSpare) {
                this.battleState.canSpare = true;
                
                // Add delay before showing sparing message
                this.time.delayedCall(2000, () => {
                    this.typeText(`* ${this.enemy.name} seems tired of fighting.\n`);
                    
                    // Enemy turn after another delay
                    this.time.delayedCall(1500, () => {
                        this.enemyTurn();
                    });
                });
                
                return;
            }
        }
        
        // Enemy turn after delay
        this.time.delayedCall(2000, () => {
            this.enemyTurn();
        });
    }
    
    showItemOptions() {
        // Display item prompt
        this.typeText(`* ITEM\n`);
        
        if (UNDERTALE.gameState.inventory.length === 0) {
            this.time.delayedCall(1000, () => {
                this.typeText(`* Your inventory is empty.\n`);
                this.time.delayedCall(1000, () => {
                    this.typeText(`* What will you do?\n`);
                });
            });
            return;
        }
        
        // Filter inventory to show only usable items in battle
        const usableItems = UNDERTALE.gameState.inventory.filter(itemId => {
            const item = UNDERTALE.gameData.items[itemId.toUpperCase()];
            return item && item.battleUse;
        });
        
        if (usableItems.length === 0) {
            this.time.delayedCall(1000, () => {
                this.typeText(`* You don't have any items you can use in battle.\n`);
                this.time.delayedCall(1000, () => {
                    this.typeText(`* What will you do?\n`);
                });
            });
            return;
        }
        
        // Create item buttons
        let y = 0;
        usableItems.forEach(itemId => {
            const item = UNDERTALE.gameData.items[itemId.toUpperCase()];
            
            const button = this.add.text(0, y, `* ${item.name}`, {
                fontFamily: 'monospace',
                fontSize: '18px',
                color: '#ffff00',
                backgroundColor: '#000000',
                padding: { x: 10, y: 5 }
            })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.sound.play('sfx-select');
                this.choicesContainer.removeAll(true);
                this.useItem(itemId);
            })
            .on('pointerover', () => {
                button.setStyle({ color: '#ffffff' });
            })
            .on('pointerout', () => {
                button.setStyle({ color: '#ffff00' });
            });
            
            this.choicesContainer.add(button);
            y += 40;
        });
        
        // Add back button
        const backButton = this.add.text(0, y, `* Back`, {
            fontFamily: 'monospace',
            fontSize: '18px',
            color: '#ffff00',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            this.sound.play('sfx-select');
            this.choicesContainer.removeAll(true);
            this.typeText(`* What will you do?\n`);
        })
        .on('pointerover', () => {
            backButton.setStyle({ color: '#ffffff' });
        })
        .on('pointerout', () => {
            backButton.setStyle({ color: '#ffff00' });
        });
        
        this.choicesContainer.add(backButton);
        
        // Position the container
        this.choicesContainer.setPosition(
            this.cameras.main.width / 2 - 100,
            250
        );
    }
    
    useItem(itemId) {
        this.battleState.playerTurn = false;
        const item = UNDERTALE.gameData.items[itemId.toUpperCase()];
        
        if (!item) {
            console.error(`Item ${itemId} not found.`);
            return;
        }
        
        // Play item use sound
        this.sound.play('sfx-item');
        
        // Handle different item types
        switch (item.type) {
            case 'healing':
                // Healing items restore HP
                const healAmount = item.effect.hp || 0;
                const oldHealth = UNDERTALE.gameState.health;
                UNDERTALE.gameState.health = Math.min(
                    UNDERTALE.gameState.maxHealth, 
                    UNDERTALE.gameState.health + healAmount
                );
                const actualHeal = UNDERTALE.gameState.health - oldHealth;
                
                this.typeText(`* You ate the ${item.name}. You recovered ${actualHeal} HP!\n`);
                
                // Remove consumable item from inventory
                const itemIndex = UNDERTALE.gameState.inventory.indexOf(itemId);
                UNDERTALE.gameState.inventory.splice(itemIndex, 1);
                break;
                
            default:
                this.typeText(`* You used the ${item.name}, but nothing happened.\n`);
        }
        
        // Enemy turn after delay
        this.time.delayedCall(1500, () => {
            this.enemyTurn();
        });
    }
    
    showMercyOptions() {
        // Display mercy prompt
        this.typeText(`* MERCY\n`);
        
        // Create mercy buttons
        const mercyOptions = ['Spare', 'Flee'];
        let y = 0;
        
        mercyOptions.forEach(option => {
            const button = this.add.text(0, y, `* ${option}`, {
                fontFamily: 'monospace',
                fontSize: '18px',
                color: '#ffff00',
                backgroundColor: '#000000',
                padding: { x: 10, y: 5 }
            })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.sound.play('sfx-select');
                this.choicesContainer.removeAll(true);
                this.performMercy(option.toLowerCase());
            })
            .on('pointerover', () => {
                button.setStyle({ color: '#ffffff' });
            })
            .on('pointerout', () => {
                button.setStyle({ color: '#ffff00' });
            });
            
            this.choicesContainer.add(button);
            y += 40;
        });
        
        // Add back button
        const backButton = this.add.text(0, y, `* Back`, {
            fontFamily: 'monospace',
            fontSize: '18px',
            color: '#ffff00',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            this.sound.play('sfx-select');
            this.choicesContainer.removeAll(true);
            this.typeText(`* What will you do?\n`);
        })
        .on('pointerover', () => {
            backButton.setStyle({ color: '#ffffff' });
        })
        .on('pointerout', () => {
            backButton.setStyle({ color: '#ffff00' });
        });
        
        this.choicesContainer.add(backButton);
        
        // Position the container
        this.choicesContainer.setPosition(
            this.cameras.main.width / 2 - 100,
            250
        );
    }
    
    performMercy(action) {
        this.battleState.playerTurn = false;
        
        switch (action) {
            case 'spare':
                if (this.battleState.canSpare) {
                    // End battle with spare
                    this.sound.play('sfx-spare');
                    this.typeText(`* You spared ${this.enemy.name}.\n`);
                    
                    this.time.delayedCall(1500, () => {
                        this.endBattle('spare');
                    });
                } else {
                    this.sound.play('sfx-select');
                    this.typeText(`* You tried to spare ${this.enemy.name}, but they didn't want to be spared.\n`);
                    
                    // Enemy turn after delay
                    this.time.delayedCall(1500, () => {
                        this.enemyTurn();
                    });
                }
                break;
                
            case 'flee':
                if (this.canFlee) {
                    // Random chance to flee
                    const fleeChance = 0.5 + (0.1 * UNDERTALE.gameState.lv); // Higher LV = better chance to flee
                    
                    if (Math.random() < fleeChance) {
                        this.sound.play('sfx-flee');
                        this.typeText(`* You ran away!\n`);
                        
                        this.time.delayedCall(1500, () => {
                            this.endBattle('flee');
                        });
                    } else {
                        this.sound.play('sfx-select');
                        this.typeText(`* Couldn't escape!\n`);
                        
                        // Enemy turn after delay
                        this.time.delayedCall(1500, () => {
                            this.enemyTurn();
                        });
                    }
                } else {
                    this.sound.play('sfx-select');
                    this.typeText(`* You can't run from this battle!\n`);
                    
                    // Enemy turn after delay
                    this.time.delayedCall(1500, () => {
                        this.enemyTurn();
                    });
                }
                break;
        }
    }
    
    enemyTurn() {
        // Check if battle already ended
        if (!this.battleState.active) return;
        
        this.typeText(`* ${this.enemy.name} attacks!\n`);
        
        // Simulate bullet pattern visually
        this.simulateBulletPattern();
    }

    simulateBulletPattern() {
        // Create bullets
        const bullets = [];
        const bulletCount = Math.min(5 + this.battleState.turns, 12); // More bullets as battle progresses
        
        for (let i = 0; i < bulletCount; i++) {
            // Create bullet
            const bullet = this.add.circle(0, 0, 5, 0xffffff);
            
            // Position based on pattern
            let x, y;
            
            // Default is circle pattern
            const angle = (i / bulletCount) * 2 * Math.PI;
            const radius = 50 + Math.random() * 30;
            x = 400 + Math.cos(angle) * radius;
            y = 300 + Math.sin(angle) * radius;
            
            bullet.setPosition(x, y);
            bullets.push({
                sprite: bullet,
                x: x,
                y: y,
                direction: Math.random() * 2 * Math.PI,
                speed: 2 * (0.5 + Math.random() * 0.5)
            });
        }
        
        // Play bullet sound
        this.sound.play('sfx-bullet');
        
        // Set up animation
        let duration = 0;
        const maxDuration = 3000; // 3 seconds
        let damaged = false;
        
        // Create an update event
        this.bulletEvent = this.time.addEvent({
            delay: 16, // ~60fps
            callback: () => {
                duration += 16;
                
                // Move bullets
                bullets.forEach(bullet => {
                    bullet.x += Math.cos(bullet.direction) * bullet.speed;
                    bullet.y += Math.sin(bullet.direction) * bullet.speed;
                    
                    // Bounce off walls of battle box
                    const bounds = this.battleBox.getBounds();
                    const bulletRadius = 5;
                    
                    if (bullet.x - bulletRadius < bounds.x || bullet.x + bulletRadius > bounds.x + bounds.width) {
                        bullet.direction = Math.PI - bullet.direction;
                        bullet.x = Phaser.Math.Clamp(
                            bullet.x, 
                            bounds.x + bulletRadius, 
                            bounds.x + bounds.width - bulletRadius
                        );
                    }
                    
                    if (bullet.y - bulletRadius < bounds.y || bullet.y + bulletRadius > bounds.y + bounds.height) {
                        bullet.direction = -bullet.direction;
                        bullet.y = Phaser.Math.Clamp(
                            bullet.y, 
                            bounds.y + bulletRadius, 
                            bounds.y + bounds.height - bulletRadius
                        );
                    }
                    
                    // Update bullet position
                    bullet.sprite.setPosition(bullet.x, bullet.y);
                    
                    // Check for collision with soul (very basic)
                    const dx = bullet.x - this.playerSoul.x;
                    const dy = bullet.y - this.playerSoul.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < bulletRadius + 10 && !damaged) { // 10 is ~soul radius
                        damaged = true;
                        this.takeDamage();
                    }
                });
                
                // End pattern after max duration
                if (duration >= maxDuration) {
                    this.bulletEvent.remove();
                    
                    // Clean up bullets
                    bullets.forEach(bullet => bullet.sprite.destroy());
                    
                    // If no damage taken, apply damage anyway (simplified)
                    if (!damaged) {
                        this.takeDamage();
                    }
                }
            },
            loop: true
        });
    }
    
    takeDamage() {
        // Calculate damage
        let baseDamage = this.enemy.stats.atk || 5;
        let defense = 0;
        
        if (UNDERTALE.gameState.equippedArmor) {
            const armor = UNDERTALE.gameData.items[UNDERTALE.gameState.equippedArmor.toUpperCase()];
            if (armor && armor.effect && armor.effect.def) {
                defense = armor.effect.def;
            }
        }
        
        // Random variation (+/- 2)
        const damage = Math.max(
            1, 
            baseDamage - defense + Math.floor(Math.random() * 5) - 2
        );
        
        // Apply damage
        UNDERTALE.gameState.health = Math.max(0, UNDERTALE.gameState.health - damage);
        
        // Play damage sound
        this.sound.play('sfx-damage');
        
        // Flash player soul
        this.tweens.add({
            targets: this.playerSoul,
            alpha: 0,
            duration: 100,
            yoyo: true,
            repeat: 3
        });
        
        // Flash screen red
        this.cameras.main.flash(100, 255, 0, 0);
        
        // Show damage text
        this.typeText(`* ${this.enemy.name} hits you for ${damage} damage!\n`);
        
        // Check if player defeated
        if (UNDERTALE.gameState.health <= 0) {
            this.time.delayedCall(1500, () => {
                this.endBattle('lose');
            });
            return;
        }
        
        // Return to player turn after a delay
        this.time.delayedCall(1500, () => {
            this.battleState.playerTurn = true;
            this.typeText(`* What will you do?\n`);
        });
    }
    
    endBattle(outcome) {
        console.log(`Battle ending with outcome: ${outcome}`);
        this.battleState.active = false;
        
        // Stop battle music
        if (this.battleMusic) {
            this.battleMusic.stop();
        }
        
        // Get the event
        const event = UNDERTALE.gameData.events[this.eventId.toUpperCase()];
        
        // Handle outcome
        switch (outcome) {
            case 'win':
                // Award gold
                const goldGain = Math.floor(Math.random() * 30) + 10;
                UNDERTALE.gameState.gold += goldGain;
                
                this.typeText(`* You defeated ${this.enemy.name}!\n* You gained ${goldGain} gold.\n`);
                
                // Check for route change
                if (UNDERTALE.gameState.route === "pacifist") {
                    UNDERTALE.gameState.route = "neutral";
                }
                
                this.time.delayedCall(2000, () => {
                    // Mark event as completed
                    UNDERTALE.gameState.completedEvents.push(this.eventId);
                    
                    // Return to game scene
                    this.returnToGameScene(event.outcome.win);
                });
                break;
                
            case 'lose':
                this.typeText(`* You were defeated by ${this.enemy.name}.\n`);
                
                this.time.delayedCall(2000, () => {
                    // Handle game over
                    if (event.outcome.lose) {
                        this.returnToGameScene(event.outcome.lose);
                    } else {
                        this.returnToGameScene("game_over_generic");
                    }
                });
                break;
                
            case 'spare':
                // Award gold but no EXP
                const mercyGold = Math.floor(Math.random() * 20) + 5;
                UNDERTALE.gameState.gold += mercyGold;
                
                this.typeText(`* You spared ${this.enemy.name}.\n* You gained ${mercyGold} gold.\n`);
                
                this.time.delayedCall(2000, () => {
                    // Mark event as completed
                    UNDERTALE.gameState.completedEvents.push(this.eventId);
                    
                    // Return to game scene
                    if (event.outcome.spare) {
                        this.returnToGameScene(event.outcome.spare);
                    } else {
                        this.returnToLastLocation();
                    }
                });
                break;
                
            case 'flee':
                this.typeText(`* You got away safely!\n`);
                
                this.time.delayedCall(2000, () => {
                    // Mark event as completed
                    UNDERTALE.gameState.completedEvents.push(this.eventId);
                    
                    // Return to last location
                    this.returnToLastLocation();
                });
                break;
        }
    }
    
    returnToGameScene(nextEventId) {
        // Transition back to game scene
        this.cameras.main.fade(1000, 0, 0, 0, false, (camera, progress) => {
            if (progress === 1) {
                // Return to game scene with next event to trigger
                this.scene.start('GameScene', { 
                    nextEvent: nextEventId
                });
            }
        });
    }
    
    returnToLastLocation() {
        // Transition back to game scene with no next event
        this.cameras.main.fade(1000, 0, 0, 0, false, (camera, progress) => {
            if (progress === 1) {
                this.scene.start('GameScene');
            }
        });
    }
}