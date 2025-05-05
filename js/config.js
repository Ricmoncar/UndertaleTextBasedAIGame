const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [
        BootScene,
        PreloaderScene,
        ApiKeyScene,
        TitleScene,
        GameScene,
        BattleScene
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    dom: {
        createContainer: true
    }
};

// Define global game state
const UNDERTALE = {
    gameData: {
        areas: {},
        characters: {},
        events: {},
        items: {},
        puzzles: {},
        shops: {},
        bulletPatterns: {}
    },
    gameState: {
        currentLocation: "ruins.flower_bed",
        inventory: ["stick", "bandage"],
        health: 20,
        maxHealth: 20,
        lv: 1,
        gold: 0,
        route: "neutral",
        completedEvents: [],
        equippedWeapon: "stick",
        equippedArmor: "bandage",
        flags: {},
        saved: null
    }
};