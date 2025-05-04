/**
 * UNDERTALE Text Adventure Game - Combined Data
 * This file combines all data modules into one main access point
 */

// Initialize data container
window.UNDERTALE = {
    AREAS: window.UNDERTALE_AREAS || {},
    CHARACTERS: window.UNDERTALE_CHARACTERS || {},
    ITEMS: window.UNDERTALE_ITEMS || {},
    BULLET_PATTERNS: window.UNDERTALE_BULLET_PATTERNS || {},
    EVENTS: window.UNDERTALE_EVENTS || {},
    SHOPS: window.UNDERTALE_SHOPS || {},
    PUZZLES: window.UNDERTALE_PUZZLES || {}
};

// Log data initialization
console.log("UNDERTALE game data loaded successfully!");