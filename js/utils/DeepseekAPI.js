// js/utils/DeepseekAPI.js (Create this new file and folder)

const DeepseekAPI = {
    apiKey: null,
    endpoint: "https://api.deepseek.com/v1/chat/completions", // Replace with correct endpoint if different

    initialize: function() {
        try {
            this.apiKey = sessionStorage.getItem('deepseekApiKey');
            if (this.apiKey) {
                console.log("DeepseekAPI initialized with stored key.");
            } else {
                 console.log("DeepseekAPI initialized without API key.");
             }
        } catch (e) {
             console.error("Error accessing sessionStorage for API key:", e);
             this.apiKey = null;
        }
    },

    isAvailable: function() {
        return !!this.apiKey;
    },

    // --- THIS IS A PLACEHOLDER - Needs actual implementation ---
    generateText: async function(prompt, maxTokens = 150) {
        if (!this.isAvailable()) {
            console.warn("Deepseek API key not available.");
            return null; // Indicate API not used
        }

        console.log("Sending prompt to Deepseek:", prompt); // Log the prompt for debugging

        try {
            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    // --- Adjust payload according to Deepseek API docs ---
                    model: "deepseek-chat", // Or specific model
                    messages: [
                        // You might want a system message here too
                        // { "role": "system", "content": "You are a helpful assistant describing scenes for a text adventure game based on Undertale."}
                        { "role": "user", "content": prompt }
                    ],
                    max_tokens: maxTokens,
                    temperature: 0.7, // Adjust creativity
                    // Add other parameters as needed (top_p, frequency_penalty, etc.)
                })
            });

            if (!response.ok) {
                 const errorData = await response.json().catch(() => ({ message: response.statusText }));
                 console.error(`Deepseek API Error (${response.status}):`, errorData);
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();

            // --- Extract the generated text based on Deepseek's response structure ---
            const generatedContent = data.choices?.[0]?.message?.content;

            if (generatedContent) {
                console.log("Deepseek Response:", generatedContent.trim());
                return generatedContent.trim(); // Return the generated text
            } else {
                 console.error("Could not extract content from Deepseek response:", data);
                 throw new Error("Invalid response structure from API.");
            }

        } catch (error) {
            console.error("Error calling Deepseek API:", error);
            return null; // Indicate failure
        }
    }
};

// Initialize when the script loads
DeepseekAPI.initialize();