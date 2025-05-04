/**
 * UNDERTALE Text Adventure Game - More Robust Text Animation
 * This file handles the typewriter-style text animations with better error handling
 */

// Text animation settings
const TextAnimation = {
    speed: 40, // ms per character
    soundEnabled: true,
    soundEffect: null, // Will be initialized later
    currentAnimation: null,
    skipRequested: false
};

// Initialize text animation system
function initTextAnimation() {
    // Create sound effect with error handling
    try {
        TextAnimation.soundEffect = new Audio('sound/text.mp3');
        TextAnimation.soundEffect.volume = 0.3;
        
        // Test if audio can be played
        TextAnimation.soundEffect.addEventListener('error', function() {
            console.warn("Sound file 'sound/text.mp3' couldn't be loaded. Text animations will be silent.");
            TextAnimation.soundEnabled = false;
        });
    } catch (error) {
        console.warn("Error initializing sound effect:", error);
        TextAnimation.soundEnabled = false;
    }
    
    // Setup skip on click/tap
    document.addEventListener('click', () => {
        if (TextAnimation.currentAnimation) {
            TextAnimation.skipRequested = true;
        }
    });
    
    // Setup skip on keypress
    document.addEventListener('keydown', (e) => {
        if (e.key === 'z' || e.key === 'x' || e.key === ' ' || e.key === 'Enter') {
            if (TextAnimation.currentAnimation) {
                TextAnimation.skipRequested = true;
            }
        }
    });
    
    console.log("Text animation system initialized" + (TextAnimation.soundEnabled ? " with sound" : " without sound"));
}

// Animate text with typewriter effect
function animateText(text, element, callback = null) {
    // Fallback to instant text display if element is not valid
    if (!element) {
        console.error("Can't animate text: target element is null or undefined");
        if (callback) callback();
        return;
    }

    // Clear any existing animation
    if (TextAnimation.currentAnimation) {
        clearTimeout(TextAnimation.currentAnimation);
        TextAnimation.currentAnimation = null;
    }
    
    TextAnimation.skipRequested = false;
    
    // Start with empty text
    let currentIndex = 0;
    let currentText = '';
    
    // Create animation frame function
    const animateFrame = () => {
        // Check if animation should be skipped
        if (TextAnimation.skipRequested) {
            // Show all text immediately
            element.innerHTML = text;
            TextAnimation.currentAnimation = null;
            
            // Call callback if exists
            if (callback) callback();
            return;
        }
        
        // Get next character
        if (currentIndex < text.length) {
            const char = text[currentIndex];
            currentText += char;
            element.innerHTML = currentText;
            currentIndex++;
            
            // Play sound effect for most characters, but not for spaces or line breaks
            if (TextAnimation.soundEnabled && TextAnimation.soundEffect && char !== ' ' && char !== '\n') {
                try {
                    // Clone and play sound for each character to allow overlapping
                    const sound = TextAnimation.soundEffect.cloneNode();
                    sound.volume = 0.1;
                    
                    // Play with promise to catch errors
                    const playPromise = sound.play();
                    if (playPromise) {
                        playPromise.catch(err => {
                            // Silent catch for browsers that block autoplay
                            console.warn("Sound playback blocked by browser. Enable sounds by interacting with the page first.");
                            TextAnimation.soundEnabled = false;
                        });
                    }
                } catch (error) {
                    // Disable sound if there's an error
                    console.warn("Error playing sound:", error);
                    TextAnimation.soundEnabled = false;
                }
            }
            
            // Special character speeds
            let nextCharDelay = TextAnimation.speed;
            
            if (char === '.' || char === '!' || char === '?') {
                nextCharDelay = TextAnimation.speed * 6; // Longer pause for end of sentences
            } else if (char === ',' || char === ';') {
                nextCharDelay = TextAnimation.speed * 3; // Medium pause for commas
            }
            
            // Continue animation
            TextAnimation.currentAnimation = setTimeout(animateFrame, nextCharDelay);
        } else {
            // Animation complete
            TextAnimation.currentAnimation = null;
            
            // Call callback if exists
            if (callback) callback();
        }
    };
    
    // Start animation
    animateFrame();
}

// Safely play text sound effect
function playTextSound() {
    if (!TextAnimation.soundEnabled || !TextAnimation.soundEffect) return;
    
    try {
        const sound = TextAnimation.soundEffect.cloneNode();
        sound.volume = 0.1;
        sound.play().catch(() => {
            // Silent catch
        });
    } catch (error) {
        // Disable sound if there's an error
        TextAnimation.soundEnabled = false;
    }
}

// Show dialogue with animation
function showAnimatedDialogue(text, character = null, onComplete = null) {
    const gameText = document.getElementById("game-text");
    if (!gameText) {
        console.error("Can't show dialogue: game-text element not found");
        if (onComplete) onComplete();
        return;
    }
    
    let dialogueText = "";
    
    if (character) {
        dialogueText += `<strong>${character}:</strong> `;
    }
    
    // Clear animation flag
    TextAnimation.skipRequested = false;
    
    // Create a new element to animate
    const dialogueElement = document.createElement('div');
    dialogueElement.className = 'dialogue-text';
    gameText.appendChild(dialogueElement);
    
    // Start animation on the element
    animateText(text, dialogueElement, onComplete);
    
    // Scroll to bottom
    gameText.scrollTop = gameText.scrollHeight;
}

// Show a cutscene with animated dialogue
function showAnimatedCutscene(dialogues, character = null, onComplete = null) {
    if (!Array.isArray(dialogues) || dialogues.length === 0) {
        console.error("Can't show cutscene: invalid dialogues array");
        if (onComplete) onComplete();
        return;
    }

    const gameText = document.getElementById("game-text");
    if (!gameText) {
        console.error("Can't show cutscene: game-text element not found");
        if (onComplete) onComplete();
        return;
    }
    
    // Function to show dialogues one by one
    const showNextDialogue = (index) => {
        if (index >= dialogues.length) {
            // All dialogues shown, call completion callback
            if (onComplete) onComplete();
            return;
        }
        
        // Show current dialogue with animation
        showAnimatedDialogue(dialogues[index], character, () => {
            // After animation completes, show next dialogue
            setTimeout(() => {
                showNextDialogue(index + 1);
            }, 400); // Delay between dialogues
        });
    };
    
    // Start showing dialogues
    showNextDialogue(0);
}

// Override regular dialogue functions to use animations
function overrideDialogueFunctions() {
    // Make sure the window object exists (for browser environments)
    if (typeof window === 'undefined') return;
    
    // Store original functions
    const originalShowDialogue = window.showDialogue;
    const originalAppendToGameText = window.appendToGameText;
    
    if (typeof originalShowDialogue === 'function') {
        // Override showDialogue function
        window.showDialogue = function(text, character = null) {
            showAnimatedDialogue(text, character);
        };
    } else {
        console.warn("showDialogue function not found, can't override");
    }
    
    if (typeof originalAppendToGameText === 'function') {
        // Override appendToGameText function
        window.appendToGameText = function(text) {
            const gameText = document.getElementById("game-text");
            if (!gameText) {
                console.error("game-text element not found");
                return;
            }
            
            const textElement = document.createElement('div');
            gameText.appendChild(textElement);
            
            animateText(text, textElement);
            
            // Scroll to bottom
            gameText.scrollTop = gameText.scrollHeight;
        };
    } else {
        console.warn("appendToGameText function not found, can't override");
    }
    
    // Override trigger event function to handle cutscenes with animations
    const originalTriggerEvent = window.triggerEvent;
    if (typeof originalTriggerEvent === 'function') {
        window.triggerEvent = function(eventId) {
            if (!eventId) {
                console.error("Can't trigger event: event ID is null or undefined");
                return;
            }
            
            const event = window.UNDERTALE?.EVENTS?.[eventId.toUpperCase()];
            
            if (event) {
                // Handle cutscene events with animations
                if (event.type === "cutscene" && Array.isArray(event.dialogue)) {
                    showAnimatedCutscene(event.dialogue, event.character, () => {
                        if (event.next) {
                            triggerEvent(event.next);
                        }
                        
                        // Handle item gives
                        if (event.giveItem) {
                            if (typeof window.offerItem === 'function') {
                                window.offerItem(event.giveItem);
                            }
                        }
                        
                        // Handle route flags
                        if (event.routeFlag) {
                            if (window.GameState) {
                                window.GameState.route = event.routeFlag;
                            }
                        }
                    });
                    
                    // Mark event as completed
                    if (window.GameState) {
                        window.GameState.completedEvents.push(eventId);
                    }
                    return;
                }
                
                // For non-cutscene events, use original function
                originalTriggerEvent(eventId);
            } else {
                console.error(`Event "${eventId}" not found`);
            }
        };
    } else {
        console.warn("triggerEvent function not found, can't override");
    }
}

// Initialize text animation when the page is ready
function initializeWhenReady() {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initTextAnimation();
        overrideDialogueFunctions();
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            initTextAnimation();
            overrideDialogueFunctions();
        });
    }
}

// Start initialization
initializeWhenReady();

// Export functions
window.TextAnimation = TextAnimation;
window.animateText = animateText;
window.showAnimatedDialogue = showAnimatedDialogue;
window.showAnimatedCutscene = showAnimatedCutscene;
window.playTextSound = playTextSound;