/**
 * UNDERTALE Text Adventure Game - Puzzles Data
 * Contains all puzzle mechanics and solutions
 */

const PUZZLES = {
    PRESSURE_PLATES: {
        id: "pressure_plates",
        name: "Pressure Plates Puzzle",
        description: "Step on the correct pressure plates to open the door.",
        solution: ["middle", "left", "right", "middle"],
        hint: "Only press the plates marked with the sign."
    },
    LEVERS: {
        id: "levers",
        name: "Lever Puzzle",
        description: "Pull the correct levers to lower the spikes blocking your path.",
        solution: ["left", "right"],
        hint: "Look for the levers marked with yellow arrows."
    },
    SPIKE_BRIDGE: {
        id: "spike_bridge",
        name: "Spike Bridge Puzzle",
        description: "Cross a bridge of spikes that will retract when you step on them in the correct pattern.",
        solution: ["forward", "right", "right", "down", "left", "left", "up", "right", "forward"],
        hint: "Follow the same path that Toriel took."
    },
    CRACKED_FLOOR: {
        id: "cracked_floor",
        name: "Cracked Floor Puzzle",
        description: "The floor is cracked and will collapse if you step on it. Find the right path.",
        solution: ["right", "down", "down", "left", "left", "up", "up", "right", "down"],
        hint: "The cracks in the floor look a bit different where it's safe to walk."
    },
    COLORED_SWITCHES: {
        id: "colored_switches",
        name: "Colored Switch Puzzle",
        description: "Press the colored switches in the correct order to open the door.",
        solution: ["red", "blue", "green", "yellow"],
        hint: "The sign on the wall contains a cryptic hint about the order."
    },
    PERSPECTIVE: {
        id: "perspective",
        name: "Perspective Puzzle",
        description: "View the room from different angles to figure out the true path.",
        solution: ["stand", "left", "right", "forward"],
        hint: "The path changes depending on where you're standing."
    },
    SIX_HOLES: {
        id: "six_holes",
        name: "Six Holes Puzzle",
        description: "Fall through the correct hole to reach a lower level.",
        solution: "middle-right",
        hint: "Each hole leads to a different place below. Only one is the way forward."
    },
    ELECTRIC_MAZE: {
        id: "electric_maze",
        name: "Electric Maze",
        description: "Navigate through an invisible electric maze.",
        solution: ["right", "right", "up", "up", "right", "down", "right", "up", "right"],
        hint: "The orb Papyrus is holding will shock him if you go the wrong way."
    },
    WORD_SEARCH: {
        id: "word_search",
        name: "Word Search Puzzle",
        description: "Complete Sans's word search puzzle.",
        solution: "ignore",
        hint: "Maybe there's another way around this puzzle..."
    },
    PLATE_PUZZLE: {
        id: "plate_puzzle",
        name: "X-O Plate Puzzle",
        description: "Step on plates to turn all X marks into O marks.",
        solution: ["top-left", "bottom-left", "bottom-right", "top-right"],
        hint: "You can only step on each plate once."
    },
    BRIDGE_SEEDS_1: {
        id: "bridge_seeds_1",
        name: "Bridge Seed Puzzle 1",
        description: "Arrange bridge seeds to create a path across the water.",
        solution: ["seed1-right", "seed2-right", "seed3-right", "seed4-right"],
        hint: "The seeds bloom when arranged in a line in the water."
    },
    CRYSTAL_MAZE: {
        id: "crystal_maze",
        name: "Crystal Maze",
        description: "Navigate through a dark maze lit only by glowing crystals.",
        solution: ["follow-path", "touch-mushroom", "follow-light", "touch-crystal", "north", "east", "south"],
        hint: "The mushrooms and crystals will light the way when touched."
    },
    PIANO: {
        id: "piano",
        name: "Piano Puzzle",
        description: "Play the correct tune on the piano to open a secret door.",
        solution: ["D", "A", "F", "A", "D", "F"],
        hint: "Listen to the music box statue from earlier."
    },
    RAIN_STATUE: {
        id: "rain_statue",
        name: "Rain Statue Puzzle",
        description: "Place something on the statue to protect it from the rain.",
        solution: "use-umbrella",
        hint: "The statue seems to be getting wet from the rain."
    },
    CONVEYOR_PATTERN: {
        id: "conveyor_pattern",
        name: "Conveyor Belt Puzzle",
        description: "Navigate a series of conveyor belts to reach the other side.",
        solution: ["wait", "jump", "right", "back", "forward", "left"],
        hint: "Time your movements to counter the conveyor belt's direction."
    },
    STEAM_VENTS: {
        id: "steam_vents",
        name: "Steam Vent Puzzle",
        description: "Use steam vents to launch yourself to different platforms.",
        solution: ["south", "east", "north", "west", "east", "south"],
        hint: "The vents shoot in the direction they're pointing."
    },
    ARROWS: {
        id: "arrows",
        name: "Arrow Puzzle",
        description: "Shoot arrows to change their direction and create a path.",
        solution: ["shoot-left", "shoot-right", "shoot-down", "walk-path"],
        hint: "The arrows change direction when shot."
    },
    LASERS_1: {
        id: "lasers_1",
        name: "Laser Puzzle 1",
        description: "Navigate through moving lasers without getting hit.",
        solution: ["wait", "move", "wait", "move", "dash", "wait", "move"],
        hint: "Blue lasers won't hurt you if you stay still. Orange lasers won't hurt you if you're moving."
    },
    REACTIVATION: {
        id: "reactivation",
        name: "Puzzle Reactivation",
        description: "Reactivate the puzzles that Alphys 'deactivated' for you.",
        solution: ["left-panel", "right-panel", "center-button"],
        hint: "The control panels on both sides need to be activated first."
    },
    BOMB_DEFUSE: {
        id: "bomb_defuse",
        name: "Bomb Defuse Puzzle",
        description: "Defuse bombs by shooting them before they explode.",
        solution: ["shoot-glass", "shoot-present", "shoot-dog", "shoot-basketball", "shoot-script"],
        hint: "Each bomb needs to be shot with your phone's defuse function."
    },
    CORE_LASERS: {
        id: "core_lasers",
        name: "CORE Laser Room",
        description: "Navigate through the CORE's complex laser patterns.",
        solution: ["wait", "move", "wait", "shoot-switch", "wait", "move", "dash"],
        hint: "Remember: blue lasers require you to stay still, orange lasers require you to move."
    },
    CORE_PITS: {
        id: "core_pits",
        name: "CORE Pit Room",
        description: "Find a way around the pits in the CORE.",
        solution: ["north", "east", "east", "south", "west", "south", "east"],
        hint: "Some of the pits might be illusions."
    },
    POWER_NODES: {
        id: "power_nodes",
        name: "Power Node Puzzle",
        description: "Redirect power to the correct nodes to open the path.",
        solution: ["node1-on", "node3-on", "node2-off", "node4-on"],
        hint: "The lights on the ceiling show which nodes need power."
    },
    FAN_SWITCH: {
        id: "fan_switch",
        name: "Fan Switch Puzzle",
        description: "Activate the correct switches to turn on the fan and clear the fog.",
        solution: ["red", "green", "blue"],
        hint: "The colored wires show which switches connect to the fan."
    },
    POWER_GENERATOR: {
        id: "power_generator",
        name: "Power Generator Puzzle",
        description: "Restart the power generator by activating the correct sequence of switches.",
        solution: ["left", "right", "center", "left", "right"],
        hint: "The symbols next to each switch tell you the correct sequence."
    },
    TILE_MAZE: {
        id: "tile_maze",
        name: "Colored Tile Maze",
        description: "Navigate through a maze of colored tiles, each with different properties.",
        solution: ["pink", "red", "yellow", "green", "orange", "purple", "blue", "pink"],
        hint: "Pink tiles are safe. Red tiles are impassable. Yellow tiles are electric. Green tiles trigger a monster encounter. Orange tiles make you smell like oranges. Purple tiles make you slide and smell like lemons. Blue tiles are water tiles if you smell like oranges; otherwise, they act like water tiles with piranhas."
    }
};

// Export for use in main data file
window.UNDERTALE_PUZZLES = PUZZLES;