class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Preload only essential assets for the loading screen
        this.load.image('logo', 'assets/images/undertale-logo.png');
        this.load.image('loading-bar', 'assets/images/loading-bar.png');
        this.load.image('loading-bar-bg', 'assets/images/loading-bar-bg.png');
    }

    create() {
        console.log('Boot scene started');
        // Load fallback data
        this.loadFallbackData();
        // Proceed to preloader scene
        this.scene.start('PreloaderScene');
    }
    
    loadFallbackData() {
        // Define minimal fallback data for the game to function if API loading fails
        // Ruins area with a starting location
        UNDERTALE.gameData.areas = {
            RUINS: {
                name: "The Ruins",
                description: "The entrance to the Underground.",
                backgroundColor: "#500057",
                accentColor: "#800080",
                locations: {
                    FLOWER_BED: {
                        name: "Flower Bed",
                        description: "A bed of golden flowers. They must have broken your fall.",
                        exits: {
                            forward: "ruins.next_room"
                        },
                        items: [],
                        events: ["intro_flowey"],
                        isSavePoint: true,
                        saveText: "the beginning of your journey"
                    },
                    NEXT_ROOM: {
                        name: "Dark Room",
                        description: "A dark room with a spotlight shining on a patch of grass.",
                        exits: {
                            back: "ruins.flower_bed",
                            forward: "ruins.entrance"
                        },
                        items: [],
                        events: []
                    },
                    ENTRANCE: {
                        name: "Ruins Entrance",
                        description: "The entrance to the Ruins. Ancient purple stone surrounds you.",
                        exits: {
                            back: "ruins.next_room"
                        },
                        items: [],
                        events: ["meet_toriel"]
                    }
                }
            }
        };
        
        // Basic characters
        UNDERTALE.gameData.characters = {
            FLOWEY: {
                name: "Flowey",
                description: "A small golden flower with a face.",
                stats: {
                    hp: 50,
                    atk: 5,
                    def: 0
                },
                dialogue: {
                    check: "* Flowey - ATK 5 DEF 0\n* Just a friendly flower... right?",
                    talk: "* You try to talk to Flowey, but it doesn't seem much for conversation right now.",
                    flirt: "* You flirt with Flowey. But nothing happened."
                },
                acts: ["Check", "Talk", "Flirt"]
            },
            TORIEL: {
                name: "Toriel",
                description: "A kind goat-like monster who guides you through the Ruins.",
                stats: {
                    hp: 440,
                    atk: 8,
                    def: 1
                },
                dialogue: {
                    check: "* Toriel - ATK 8 DEF 1\n* Knows best for you.",
                    talk: "* You try to talk to Toriel. She seems to want you to go back upstairs.",
                    flirt: "* You flirt with Toriel. She's surprised, but flattered."
                },
                acts: ["Check", "Talk", "Flirt"]
            }
        };
        
        // Basic events
        UNDERTALE.gameData.events = {
            INTRO_FLOWEY: {
                id: "intro_flowey",
                type: "cutscene",
                character: "flowey",
                dialogue: [
                    "Howdy! I'm FLOWEY. FLOWEY the FLOWER!",
                    "Hmm... You're new to the UNDERGROUND, aren'tcha?",
                    "Golly, you must be so confused.",
                    "Someone ought to teach you how things work around here!",
                    "I guess little old me will have to do.",
                    "Ready? Here we go!"
                ],
                next: "flowey_battle"
            },
            FLOWEY_BATTLE: {
                id: "flowey_battle",
                type: "battle",
                enemy: "flowey",
                canSpare: false,
                canFlee: false,
                outcome: {
                    win: "flowey_defeated",
                    lose: "game_over_flowey",
                    spare: null
                }
            },
            FLOWEY_DEFEATED: {
                id: "flowey_defeated",
                type: "cutscene",
                character: "flowey",
                dialogue: [
                    "You... You...",
                    "I'll remember this!"
                ],
                next: "meet_toriel"
            },
            MEET_TORIEL: {
                id: "meet_toriel",
                type: "cutscene",
                character: "toriel",
                dialogue: [
                    "What a terrible creature, torturing such a poor, innocent youth...",
                    "Ah, do not be afraid, my child. I am TORIEL, caretaker of the RUINS.",
                    "I pass through this place every day to see if anyone has fallen down.",
                    "You are the first human to come here in a long time.",
                    "Come! I will guide you through the catacombs."
                ],
                next: null
            },
            GAME_OVER_FLOWEY: {
                id: "game_over_flowey",
                type: "game_over",
                message: "You were defeated by Flowey."
            }
        };
        
        // Basic items
        UNDERTALE.gameData.items = {
            STICK: {
                id: "STICK",
                name: "Stick",
                description: "A simple stick. Not very useful, but can be used as a weapon.",
                type: "weapon",
                battleUse: true,
                effect: {
                    atk: 1
                }
            },
            BANDAGE: {
                id: "BANDAGE",
                name: "Bandage",
                description: "A used bandage. Provides minimal protection.",
                type: "armor",
                battleUse: true,
                effect: {
                    def: 1
                }
            },
            MONSTER_CANDY: {
                id: "MONSTER_CANDY",
                name: "Monster Candy",
                description: "A candy that monsters enjoy. Restores 10 HP.",
                type: "healing",
                battleUse: true,
                effect: {
                    hp: 10
                }
            }
        };
    }
}