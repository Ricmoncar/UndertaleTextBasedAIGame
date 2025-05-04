/**
 * UNDERTALE Text Adventure Game - AI Integration
 * This file handles integration with the DeepSeek API to make the game more interactive
 */

// AI Integration configuration
const AIIntegration = {
    enabled: true,
    apiKey: '', // API key will be set by the user
    apiEndpoint: 'https://api.deepseek.com/v1/chat/completions',
    model: 'deepseek-chat',
    characterProfiles: {
        flowey: "You are Flowey the Flower from Undertale. You start friendly but are actually sinister. Use phrases like 'Howdy!' and refer to LOVE (Level of Violence) as if it's a good thing. End with evil laughs like 'Hee hee hee!'",
        toriel: "You are Toriel from Undertale. You are motherly, protective, and kind. You worry about the human's safety and call them 'my child.' You love baking butterscotch-cinnamon pie.",
        sans: "You are Sans from Undertale. You're laid-back, love puns, and speak in all lowercase. You use phrases like 'heya,' 'pal,' 'buddy,' and 'kiddo.' You pretend to be lazy but are very observant.",
        papyrus: "You are Papyrus from Undertale. YOU SPEAK IN ALL CAPS BECAUSE YOU'RE VERY ENTHUSIASTIC! You love puzzles, spaghetti, and want to catch a human to become part of the Royal Guard. You refer to yourself as 'THE GREAT PAPYRUS!'",
        undyne: "You are Undyne from Undertale. You're passionate, energetic, and honorable. You're the head of the Royal Guard and use phrases like 'NGAHHHH!' You believe in facing challenges head-on with DETERMINATION.",
        alphys: "You are Alphys from Undertale. You're socially awkward, anxious, and speak with lots of 'um's and 'uh's. You love anime and science, and you tend to ramble when nervous.",
        mettaton: "You are Mettaton from Undertale. You're DRAMATIC, FABULOUS, and LOVE THE SPOTLIGHT! You speak like a TV host, using phrases like 'OHHH YES!' and 'DARLING!' You're all about ratings and entertainment.",
        asgore: "You are Asgore from Undertale. You're the king of monsters, gentle but burdened with difficult decisions. You speak formally and kindly, offering tea to visitors. You avoid conflict when possible."
    },
    isProcessing: false,
    queue: []
};

// Initialize AI Integration
function initAIIntegration() {
    // Check for saved API key
    const savedApiKey = localStorage.getItem('undertale_ai_api_key');
    if (savedApiKey) {
        AIIntegration.apiKey = savedApiKey;
    }
    
    // Add AI setup to settings menu
    addAISettingsToMenu();
    
    // Override character dialogue function to use AI when appropriate
    extendDialogueFunctions();
}

// Add AI settings to the game menu
function addAISettingsToMenu() {
    // Check if settings button exists
    const settingsBtn = document.getElementById('settings-btn');
    if (!settingsBtn) return;
    
    // Create settings screen if it doesn't exist
    let settingsScreen = document.getElementById('settings-screen');
    if (!settingsScreen) {
        settingsScreen = document.createElement('div');
        settingsScreen.id = 'settings-screen';
        settingsScreen.className = 'screen';
        
        // Create settings content
        settingsScreen.innerHTML = `
            <h2>Settings</h2>
            <div class="settings-group">
                <h3>AI Integration</h3>
                <div class="form-group">
                    <label for="ai-enabled">Enable AI for character dialogue:</label>
                    <input type="checkbox" id="ai-enabled" ${AIIntegration.enabled ? 'checked' : ''}>
                </div>
                <div class="form-group">
                    <label for="ai-api-key">DeepSeek API Key:</label>
                    <input type="password" id="ai-api-key" value="${AIIntegration.apiKey}">
                </div>
                <p class="settings-info">When AI is enabled, character dialogue will be dynamically generated based on context.</p>
            </div>
            <div class="settings-actions">
                <button id="save-settings-btn">Save Settings</button>
                <button id="back-from-settings-btn">Back</button>
            </div>
        `;
        
        // Add settings screen to game container
        document.getElementById('game-container').appendChild(settingsScreen);
        
        // Add event listeners for settings buttons
        document.getElementById('save-settings-btn').addEventListener('click', saveAISettings);
        document.getElementById('back-from-settings-btn').addEventListener('click', () => {
            showScreen('menu-screen');
        });
    }
    
    // Override settings button to show our custom settings
    settingsBtn.addEventListener('click', () => {
        showScreen('settings-screen');
    });
}

// Save AI settings
function saveAISettings() {
    const enabledCheckbox = document.getElementById('ai-enabled');
    const apiKeyInput = document.getElementById('ai-api-key');
    
    if (enabledCheckbox && apiKeyInput) {
        AIIntegration.enabled = enabledCheckbox.checked;
        AIIntegration.apiKey = apiKeyInput.value;
        
        // Save to localStorage
        localStorage.setItem('undertale_ai_enabled', AIIntegration.enabled ? 'true' : 'false');
        localStorage.setItem('undertale_ai_api_key', AIIntegration.apiKey);
        
        // Show success message
        appendToGameText('Settings saved!');
        showScreen('menu-screen');
    }
}

// Extend dialogue functions to use AI
function extendDialogueFunctions() {
    // Store original function
    const originalShowDialogue = window.showDialogue;
    
    // Override function
    window.showDialogue = function(text, character = null) {
        // If AI is not enabled or no character, use original function
        if (!AIIntegration.enabled || !character || !AIIntegration.apiKey) {
            originalShowDialogue(text, character);
            return;
        }
        
        // Check if character has a profile
        const profile = AIIntegration.characterProfiles[character.toLowerCase()];
        if (!profile) {
            originalShowDialogue(text, character);
            return;
        }
        
        // Use AI to generate dialogue based on character and context
        generateAIDialogue(text, character, profile)
            .then(aiText => {
                if (aiText) {
                    // Use animated text for AI response
                    showAnimatedDialogue(aiText, character);
                } else {
                    // Fallback to original text if AI fails
                    originalShowDialogue(text, character);
                }
            })
            .catch(error => {
                console.error('AI dialogue error:', error);
                originalShowDialogue(text, character);
            });
    };
}

// Generate AI dialogue based on context
async function generateAIDialogue(baseText, character, profile) {
    // Check if API key is set
    if (!AIIntegration.apiKey) {
        return null;
    }
    
    try {
        // Create context for API request
        const context = {
            player: {
                name: GameState.player.name,
                lv: GameState.player.lv,
                route: GameState.route
            },
            location: GameState.currentLocation,
            completedEvents: GameState.completedEvents.slice(-5) // Last 5 events for context
        };
        
        // Build prompt
        const messages = [
            {
                role: 'system',
                content: `${profile}\n\nYou are roleplaying as ${character} from Undertale in a text adventure game. Respond in the style of the character. 
                Keep your response concise (under 3 sentences) and stay true to the character. Current context: 
                Player name: ${context.player.name}, LV: ${context.player.lv}, Current route: ${context.route}.`
            },
            {
                role: 'user',
                content: `The base dialogue is: "${baseText}"\n\nPlease rewrite this in ${character}'s style, keeping the same general meaning but making it more in-character. Current location: ${context.location}`
            }
        ];
        
        // Make API request
        const response = await fetch(AIIntegration.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AIIntegration.apiKey}`
            },
            body: JSON.stringify({
                model: AIIntegration.model,
                messages: messages,
                max_tokens: 150,
                temperature: 0.7
            })
        });
        
        // Parse response
        const data = await response.json();
        if (data.choices && data.choices[0] && data.choices[0].message) {
            return data.choices[0].message.content.trim();
        } else {
            console.error('Invalid API response format:', data);
            return null;
        }
    } catch (error) {
        console.error('AI generation error:', error);
        return null;
    }
}

// Process queue of AI requests
function processAIQueue() {
    if (AIIntegration.isProcessing || AIIntegration.queue.length === 0) {
        return;
    }
    
    AIIntegration.isProcessing = true;
    const nextRequest = AIIntegration.queue.shift();
    
    generateAIDialogue(nextRequest.text, nextRequest.character, nextRequest.profile)
        .then(aiText => {
            if (aiText) {
                nextRequest.callback(aiText);
            } else {
                nextRequest.callback(nextRequest.text);
            }
        })
        .catch(error => {
            console.error('AI queue processing error:', error);
            nextRequest.callback(nextRequest.text);
        })
        .finally(() => {
            AIIntegration.isProcessing = false;
            processAIQueue(); // Process next request if any
        });
}

// Queue AI dialogue request
function queueAIDialogue(text, character, profile, callback) {
    AIIntegration.queue.push({
        text: text,
        character: character,
        profile: profile,
        callback: callback
    });
    
    processAIQueue();
}

// Initialize AI Integration when DOM is loaded
document.addEventListener('DOMContentLoaded', initAIIntegration);

// Export functions
window.AIIntegration = AIIntegration;