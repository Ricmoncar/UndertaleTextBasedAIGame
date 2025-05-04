/**
 * UNDERTALE Text Adventure Game - Battle Data
 * Contains all bullet patterns and combat mechanics
 */

const BULLET_PATTERNS = {
    FLOWEY_PELLETS: {
        id: "flowey_pellets",
        name: "Friendliness Pellets",
        description: "A circle of white pellets that closes in on you.",
        damage: 19,
        pattern: "circle",
        speed: 1
    },
    TORIEL_FIRE: {
        id: "toriel_fire",
        name: "Fire Magic",
        description: "Waves of fire magic that avoid the center of the battle box.",
        damage: 6,
        pattern: "wave",
        speed: 2
    },
    NAPSTABLOOK_TEARS: {
        id: "napstablook_tears",
        name: "Acid Tears",
        description: "Tears that fall from above and bounce in unpredictable patterns.",
        damage: 5,
        pattern: "rain",
        speed: 2
    },
    PAPYRUS_BONES: {
        id: "papyrus_bones",
        name: "Bone Attacks",
        description: "Bones of varying heights that you must jump over.",
        damage: 8,
        pattern: "horizontal",
        speed: 2
    },
    UNDYNE_SPEARS: {
        id: "undyne_spears",
        name: "Spear Attacks",
        description: "Spears that approach from different directions, indicated by warning arrows.",
        damage: 7,
        pattern: "directional",
        speed: 3
    },
    METTATON_BOMBS: {
        id: "mettaton_bombs",
        name: "Bomb Attacks",
        description: "Bombs that fall from above and explode after a short delay.",
        damage: 10,
        pattern: "timed",
        speed: 2
    },
    ASGORE_FIRE: {
        id: "asgore_fire",
        name: "Flame Waves",
        description: "Waves of fire that cover most of the battle box in patterns.",
        damage: 10,
        pattern: "complex",
        speed: 3
    },
    ASRIEL_CHAOS: {
        id: "asriel_chaos",
        name: "Star Blazing",
        description: "Stars that explode into smaller projectiles.",
        damage: 15,
        pattern: "explosion",
        speed: 4
    }
};

// Export for use in main data file
window.UNDERTALE_BULLET_PATTERNS = BULLET_PATTERNS;