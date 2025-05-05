/**
 * UNDERTALE Text Adventure Game - API Handler
 * This file handles API requests to the DeepSeek API for game data
 */

// API handler for DeepSeek
class DeepSeekAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.deepseek.com/v1/chat/completions';
        this.model = 'deepseek-chat';
        this.cache = new Map(); // Simple cache to avoid redundant API calls
    }

    /**
     * Fetch game data from the API
     * @param {string} dataType - The type of data to fetch (areas, characters, etc.)
     * @returns {Promise<Object>} - The parsed game data
     */
    async fetchGameData(dataType) {
        // Check cache first
        if (this.cache.has(dataType)) {
            console.log(`Using cached data for ${dataType}`);
            return this.cache.get(dataType);
        }

        try {
            console.log(`Fetching ${dataType} data from API...`);
            
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [
                        {
                            role: "system",
                            content: "You are a helpful assistant that returns valid JSON data for an Undertale text adventure game."
                        },
                        {
                            role: "user",
                            content: `Please return the UNDERTALE_${dataType.toUpperCase()} object as a valid JSON string without any additional text or explanation.`
                        }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const content = data.choices[0].message.content;

            // Extract JSON data from the response
            try {
                const jsonMatch = content.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const parsedData = JSON.parse(jsonMatch[0]);
                    
                    // Store in cache
                    this.cache.set(dataType, parsedData);
                    
                    return parsedData;
                } else {
                    throw new Error(`No valid JSON found in response for ${dataType}`);
                }
            } catch (error) {
                console.error(`Error parsing JSON for ${dataType}:`, error);
                console.log("Response content:", content);
                throw error;
            }
        } catch (error) {
            console.error(`Error fetching ${dataType} data:`, error);
            throw error;
        }
    }

    /**
     * Load all game data at once
     * @returns {Promise<Object>} - Object containing all game data
     */
    async loadAllGameData() {
        const dataTypes = ['areas', 'characters', 'events', 'items', 'puzzles', 'shops', 'bullet_patterns'];
        const gameData = {};

        try {
            // Show loading indicator
            if (document.getElementById('loading-indicator')) {
                document.getElementById('loading-indicator').style.display = 'block';
            }

            // Load data sequentially to avoid rate limits
            for (const dataType of dataTypes) {
                try {
                    gameData[dataType] = await this.fetchGameData(dataType);
                    console.log(`Successfully loaded ${dataType} data`);
                } catch (error) {
                    console.error(`Failed to load ${dataType} data:`, error);
                    
                    // Use fallback data if available
                    if (window[`UNDERTALE_${dataType.toUpperCase()}`]) {
                        console.log(`Using fallback data for ${dataType}`);
                        gameData[dataType] = window[`UNDERTALE_${dataType.toUpperCase()}`];
                    } else {
                        console.error(`No fallback data available for ${dataType}`);
                        gameData[dataType] = {}; // Empty object as fallback
                    }
                }
            }

            // Hide loading indicator
            if (document.getElementById('loading-indicator')) {
                document.getElementById('loading-indicator').style.display = 'none';
            }

            return gameData;
        } catch (error) {
            console.error('Error loading game data:', error);
            
            // Hide loading indicator
            if (document.getElementById('loading-indicator')) {
                document.getElementById('loading-indicator').style.display = 'none';
            }
            
            throw error;
        }
    }

    /**
     * Get a chat completion from the API
     * @param {string} prompt - The user prompt
     * @returns {Promise<string>} - The API response
     */
    async getChatCompletion(prompt) {
        try {
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [
                        {
                            role: "system",
                            content: "You are a helpful assistant responding in the style of Undertale characters. Keep responses brief and in-character."
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('Error getting chat completion:', error);
            throw error;
        }
    }

    /**
     * Generate dynamic dialogue for a character
     * @param {string} character - The character name
     * @param {string} context - The context for the dialogue
     * @returns {Promise<string>} - The generated dialogue
     */
    async generateDialogue(character, context) {
        try {
            const prompt = `Generate a short dialogue line (1-2 sentences) for ${character} from Undertale. Context: ${context}. Make it match the character's personality and speech patterns.`;
            return await this.getChatCompletion(prompt);
        } catch (error) {
            console.error(`Error generating dialogue for ${character}:`, error);
            return `* ${character} seems to have nothing to say.`;
        }
    }

    /**
     * Generate a dynamic event description
     * @param {string} location - The current location
     * @param {string} eventType - The type of event
     * @returns {Promise<string>} - The generated event description
     */
    async generateEventDescription(location, eventType) {
        try {
            const prompt = `Generate a short description (2-3 sentences) for a ${eventType} event in ${location} from Undertale. Make it match the game's tone and style.`;
            return await this.getChatCompletion(prompt);
        } catch (error) {
            console.error(`Error generating event description:`, error);
            return `* Something happens, but it's hard to describe.`;
        }
    }
}

// Export API functions to global scope
window.DeepSeekAPI = DeepSeekAPI;
window.loadGameData = async function() {
  if (!window.apiHandler) {
    window.apiHandler = new DeepSeekAPI(gameState.apiKey);
  }
  return await window.apiHandler.loadAllGameData();
};