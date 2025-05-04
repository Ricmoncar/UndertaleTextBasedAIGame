/**
 * UNDERTALE Text Adventure Game - Areas Data
 * Contains all location and area information for the game
 */

const AREAS = {
    RUINS: {
        id: "ruins",
        name: "The Ruins",
        backgroundColor: "#500057",
        accentColor: "#800080",
        locations: {
            FLOWER_BED: {
                id: "flower_bed",
                name: "The Flower Bed",
                description: "A bed of golden flowers where you've fallen. Faint light shines from above, illuminating the flowers that broke your fall.",
                image: "img/locations/flower_bed.png",
                exits: {
                    forward: "ruins.entrance"
                },
                firstTimeEvents: ["flowey_intro"]
            },
            ENTRANCE: {
                id: "entrance",
                name: "Ruins Entrance",
                description: "A dark chamber with a single spotlight. The ancient doorway looms before you.",
                image: "img/locations/ruins_entrance.png",
                exits: {
                    forward: "ruins.puzzle_room_1",
                    back: "ruins.flower_bed"
                }
            },
            PUZZLE_ROOM_1: {
                id: "puzzle_room_1",
                name: "First Puzzle Room",
                description: "A room with pressure plates on the floor. Ancient writing on the wall describes a puzzle.",
                image: "img/locations/puzzle_room_1.png",
                exits: {
                    forward: "ruins.corridor_1",
                    back: "ruins.entrance"
                },
                puzzle: "pressure_plates"
            },
            CORRIDOR_1: {
                id: "corridor_1",
                name: "Long Corridor",
                description: "A long purple corridor with vines growing along the walls.",
                image: "img/locations/corridor_1.png",
                exits: {
                    forward: "ruins.lever_room",
                    back: "ruins.puzzle_room_1"
                }
            },
            LEVER_ROOM: {
                id: "lever_room",
                name: "Lever Room",
                description: "A room with several levers on the wall. Some are marked with yellow arrows.",
                image: "img/locations/lever_room.png",
                exits: {
                    forward: "ruins.spike_bridge",
                    back: "ruins.corridor_1"
                },
                puzzle: "levers"
            },
            SPIKE_BRIDGE: {
                id: "spike_bridge",
                name: "Spike Bridge",
                description: "A bridge of deadly spikes blocks your path.",
                image: "img/locations/spike_bridge.png",
                exits: {
                    forward: "ruins.long_corridor",
                    back: "ruins.lever_room"
                },
                puzzle: "spike_bridge"
            },
            LONG_CORRIDOR: {
                id: "long_corridor",
                name: "Independence Test Corridor",
                description: "An unusually long corridor. Toriel has asked you to walk to the end by yourself.",
                image: "img/locations/long_corridor.png",
                exits: {
                    forward: "ruins.pillar_room",
                    back: "ruins.spike_bridge"
                },
                events: ["toriel_independence_test"]
            },
            PILLAR_ROOM: {
                id: "pillar_room",
                name: "Pillar Room",
                description: "A room with a single pillar at the end. There seems to be someone hiding behind it.",
                image: "img/locations/pillar_room.png",
                exits: {
                    forward: "ruins.crossroads",
                    back: "ruins.long_corridor"
                },
                events: ["toriel_reveals"]
            },
            CROSSROADS: {
                id: "crossroads",
                name: "Ruins Crossroads",
                description: "A crossroads in the ruins. Paths lead in multiple directions.",
                image: "img/locations/crossroads.png",
                exits: {
                    forward: "ruins.leaf_pile",
                    east: "ruins.candy_room",
                    west: "ruins.frog_room",
                    back: "ruins.pillar_room"
                },
                isSavePoint: true,
                saveText: "Crossroads in the Ruins"
            },
            LEAF_PILE: {
                id: "leaf_pile",
                name: "Leaf Pile",
                description: "A pile of bright red leaves on the ground. There's something oddly satisfying about them.",
                image: "img/locations/leaf_pile.png",
                exits: {
                    forward: "ruins.puzzle_room_2",
                    back: "ruins.crossroads"
                },
                events: ["napstablook_encounter"]
            },
            CANDY_ROOM: {
                id: "candy_room",
                name: "Candy Room",
                description: "A room with a pedestal holding a bowl of candy. A sign reads 'Take One'.",
                image: "img/locations/candy_room.png",
                exits: {
                    back: "ruins.crossroads"
                },
                items: ["monster_candy"]
            },
            FROG_ROOM: {
                id: "frog_room",
                name: "Frog Room",
                description: "A room where several Froggits are gathered. One seems to want to talk to you.",
                image: "img/locations/frog_room.png",
                exits: {
                    back: "ruins.crossroads"
                },
                events: ["froggit_advice"]
            },
            PUZZLE_ROOM_2: {
                id: "puzzle_room_2",
                name: "Cracked Floor Room",
                description: "A room where the floor looks unstable. Parts of it might collapse if you step on them.",
                image: "img/locations/puzzle_room_2.png",
                exits: {
                    forward: "ruins.switch_room",
                    back: "ruins.leaf_pile"
                },
                puzzle: "cracked_floor"
            },
            SWITCH_ROOM: {
                id: "switch_room",
                name: "Colored Switch Room",
                description: "A room with colored switches on the walls. A sign gives a cryptic hint about their order.",
                image: "img/locations/switch_room.png",
                exits: {
                    forward: "ruins.perspective_room",
                    back: "ruins.puzzle_room_2"
                },
                puzzle: "colored_switches"
            },
            PERSPECTIVE_ROOM: {
                id: "perspective_room",
                name: "Perspective Puzzle Room",
                description: "A room with a strange pattern on the floor. The design seems to change depending on where you stand.",
                image: "img/locations/perspective_room.png",
                exits: {
                    forward: "ruins.spider_bake_sale",
                    back: "ruins.switch_room"
                },
                puzzle: "perspective"
            },
            SPIDER_BAKE_SALE: {
                id: "spider_bake_sale",
                name: "Spider Bake Sale",
                description: "A room with webs in the corner. A sign invites you to purchase items from the Spider Bake Sale.",
                image: "img/locations/spider_bake_sale.png",
                exits: {
                    forward: "ruins.fork_room",
                    back: "ruins.perspective_room"
                },
                shop: "spider_bake_sale"
            },
            FORK_ROOM: {
                id: "fork_room",
                name: "Fork in the Road",
                description: "The path splits here. One way looks more traveled than the other.",
                image: "img/locations/fork_room.png",
                exits: {
                    east: "ruins.six_holes",
                    west: "ruins.antechamber",
                    back: "ruins.spider_bake_sale"
                }
            },
            SIX_HOLES: {
                id: "six_holes",
                name: "Six Holes Room",
                description: "A room with six holes in the floor. You can see a lower level through them.",
                image: "img/locations/six_holes.png",
                exits: {
                    back: "ruins.fork_room"
                },
                puzzle: "six_holes"
            },
            ANTECHAMBER: {
                id: "antechamber",
                name: "Toriel's Antechamber",
                description: "A quiet room just before Toriel's house. You can smell butterscotch and cinnamon.",
                image: "img/locations/antechamber.png",
                exits: {
                    forward: "ruins.toriel_home",
                    back: "ruins.fork_room"
                },
                isSavePoint: true,
                saveText: "Toriel's Home"
            },
            TORIEL_HOME: {
                id: "toriel_home",
                name: "Toriel's Home",
                description: "A cozy home in the ruins. It's warm and welcoming inside.",
                image: "img/locations/toriel_home.png",
                exits: {
                    east: "ruins.living_room",
                    west: "ruins.hallway",
                    back: "ruins.antechamber"
                },
                events: ["toriel_welcome_home"]
            },
            LIVING_ROOM: {
                id: "living_room",
                name: "Living Room",
                description: "Toriel's living room with a cozy fireplace, a comfortable reading chair, and bookshelves.",
                image: "img/locations/living_room.png",
                exits: {
                    west: "ruins.toriel_home"
                },
                events: ["toriel_reading"]
            },
            HALLWAY: {
                id: "hallway",
                name: "Hallway",
                description: "A hallway with doors to several rooms, including one for you.",
                image: "img/locations/hallway.png",
                exits: {
                    east: "ruins.toriel_home",
                    north: "ruins.your_room",
                    west: "ruins.toriel_room",
                    south: "ruins.basement"
                }
            },
            YOUR_ROOM: {
                id: "your_room",
                name: "Your Room",
                description: "A room Toriel has prepared for you. There's a bed and toys for a child.",
                image: "img/locations/your_room.png",
                exits: {
                    back: "ruins.hallway"
                },
                items: ["toy_knife"],
                events: ["sleep_pie"]
            },
            TORIEL_ROOM: {
                id: "toriel_room",
                name: "Toriel's Room",
                description: "Toriel's bedroom. There's a diary open on the desk.",
                image: "img/locations/toriel_room.png",
                exits: {
                    back: "ruins.hallway"
                },
                events: ["read_diary"]
            },
            BASEMENT: {
                id: "basement",
                name: "Basement",
                description: "A long purple corridor leading downward. It feels cooler than upstairs.",
                image: "img/locations/basement.png",
                exits: {
                    forward: "ruins.basement_corridor",
                    back: "ruins.hallway"
                },
                events: ["toriel_stops_you"]
            },
            BASEMENT_CORRIDOR: {
                id: "basement_corridor",
                name: "Basement Corridor",
                description: "The corridor continues. It seems to lead away from the ruins.",
                image: "img/locations/basement_corridor.png",
                exits: {
                    forward: "ruins.basement_end",
                    back: "ruins.basement"
                },
                events: ["toriel_warns"]
            },
            BASEMENT_END: {
                id: "basement_end",
                name: "Ruins Exit",
                description: "A large door with the Delta Rune symbol. Toriel stands between you and the door.",
                image: "img/locations/basement_end.png",
                exits: {
                    forward: "snowdin.forest_entrance",
                    back: "ruins.basement_corridor"
                },
                events: ["toriel_boss_fight"]
            }
        }
    },
    SNOWDIN: {
        id: "snowdin",
        name: "Snowdin",
        backgroundColor: "#000030",
        accentColor: "#0000ff",
        locations: {
            FOREST_ENTRANCE: {
                id: "forest_entrance",
                name: "Forest Entrance",
                description: "A cold forest path stretches before you. The door to the Ruins has closed behind you, and snow crunches beneath your feet.",
                image: "img/locations/forest_entrance.png",
                exits: {
                    forward: "snowdin.path_1",
                    back: null // Can't go back to ruins
                },
                events: ["sans_introduction"]
            },
            PATH_1: {
                id: "path_1",
                name: "Snowy Path",
                description: "A path through the snow-covered forest. Tall evergreens loom on both sides.",
                image: "img/locations/snowy_path.png",
                exits: {
                    forward: "snowdin.sentry_station",
                    back: "snowdin.forest_entrance"
                }
            },
            SENTRY_STATION: {
                id: "sentry_station",
                name: "Sentry Station",
                description: "A wooden sentry station stands by the path. It seems poorly constructed but functional.",
                image: "img/locations/sentry_station.png",
                exits: {
                    forward: "snowdin.puzzle_1",
                    back: "snowdin.path_1"
                },
                events: ["doggo_encounter"]
            },
            PUZZLE_1: {
                id: "puzzle_1",
                name: "Electric Maze",
                description: "A clearing in the forest with markings in the snow. Papyrus stands on the other side, holding an orb.",
                image: "img/locations/electric_maze.png",
                exits: {
                    forward: "snowdin.puzzle_2",
                    back: "snowdin.sentry_station"
                },
                puzzle: "electric_maze",
                events: ["papyrus_maze"]
            },
            PUZZLE_2: {
                id: "puzzle_2",
                name: "Word Search Puzzle",
                description: "A piece of paper lies in the snow. It appears to be a word search puzzle that Sans has left.",
                image: "img/locations/word_search.png",
                exits: {
                    forward: "snowdin.puzzle_3",
                    back: "snowdin.puzzle_1"
                },
                puzzle: "word_search",
                events: ["sans_word_search"]
            },
            PUZZLE_3: {
                id: "puzzle_3",
                name: "Plate Puzzle",
                description: "A field of snow with metal plates embedded in it. Each plate has an 'X' or 'O' symbol.",
                image: "img/locations/plate_puzzle.png",
                exits: {
                    forward: "snowdin.bridge",
                    back: "snowdin.puzzle_2"
                },
                puzzle: "plate_puzzle",
                events: ["papyrus_plates"]
            },
            BRIDGE: {
                id: "bridge",
                name: "Rope Bridge",
                description: "A long rope bridge spans a deep chasm. It sways slightly in the wind.",
                image: "img/locations/rope_bridge.png",
                exits: {
                    forward: "snowdin.town_entrance",
                    back: "snowdin.puzzle_3"
                },
                events: ["papyrus_gauntlet"]
            },
            TOWN_ENTRANCE: {
                id: "town_entrance",
                name: "Snowdin Town Entrance",
                description: "The entrance to a small, cozy town. A sign welcomes you to Snowdin.",
                image: "img/locations/town_entrance.png",
                exits: {
                    forward: "snowdin.town_square",
                    back: "snowdin.bridge"
                },
                isSavePoint: true,
                saveText: "Snowdin Town"
            },
            TOWN_SQUARE: {
                id: "town_square",
                name: "Snowdin Town Square",
                description: "The center of Snowdin Town. There's a decorated tree with presents underneath, and various buildings surround the square.",
                image: "img/locations/town_square.png",
                exits: {
                    east: "snowdin.shop",
                    west: "snowdin.grillbys",
                    north: "snowdin.inn",
                    south: "snowdin.library",
                    forward: "snowdin.brothers_house",
                    back: "snowdin.town_entrance"
                }
            },
            SHOP: {
                id: "shop",
                name: "Snowdin Shop",
                description: "A cozy shop run by a rabbit monster. Various goods are for sale.",
                image: "img/locations/snowdin_shop.png",
                exits: {
                    back: "snowdin.town_square"
                },
                shop: "snowdin_shop"
            },
            INN: {
                id: "inn",
                name: "Snowed Inn",
                description: "A comfortable inn where you can rest and recover.",
                image: "img/locations/snowdin_inn.png",
                exits: {
                    back: "snowdin.town_square"
                },
                events: ["inn_rest"]
            },
            GRILLBYS: {
                id: "grillbys",
                name: "Grillby's",
                description: "A warm and inviting restaurant run by a fire monster named Grillby.",
                image: "img/locations/grillbys.png",
                exits: {
                    back: "snowdin.town_square"
                },
                events: ["sans_grillbys"]
            },
            LIBRARY: {
                id: "library",
                name: "Snowdin Library",
                description: "The town's library (misspelled as 'LIBRARBY' on the sign). Books line the shelves.",
                image: "img/locations/snowdin_library.png",
                exits: {
                    back: "snowdin.town_square"
                },
                events: ["read_books"]
            },
            BROTHERS_HOUSE: {
                id: "brothers_house",
                name: "Skeleton Brothers' House",
                description: "The home of Sans and Papyrus. It's decorated with colorful lights and has two mailboxes out front.",
                image: "img/locations/brothers_house.png",
                exits: {
                    forward: "snowdin.foggy_path",
                    back: "snowdin.town_square"
                },
                events: ["papyrus_date"]
            },
            FOGGY_PATH: {
                id: "foggy_path",
                name: "Foggy Path",
                description: "A path at the edge of town that's covered in thick fog. It's hard to see more than a few feet ahead.",
                image: "img/locations/foggy_path.png",
                exits: {
                    forward: "waterfall.entrance",
                    back: "snowdin.brothers_house"
                },
                events: ["papyrus_battle"]
            }
        }
    },
    WATERFALL: {
        id: "waterfall",
        name: "Waterfall",
        backgroundColor: "#000057",
        accentColor: "#0000aa",
        locations: {
            ENTRANCE: {
                id: "entrance",
                name: "Waterfall Entrance",
                description: "The entrance to a dark, cavernous area. The sound of running water echoes around you.",
                image: "img/locations/waterfall_entrance.png",
                exits: {
                    forward: "waterfall.sans_station",
                    back: "snowdin.foggy_path"
                },
                isSavePoint: true,
                saveText: "Waterfall Entrance"
            },
            SANS_STATION: {
                id: "sans_station",
                name: "Sans's Sentry Station",
                description: "A sentry station nestled between two waterfalls. Sans is lounging inside.",
                image: "img/locations/sans_station_waterfall.png",
                exits: {
                    forward: "waterfall.tall_grass",
                    back: "waterfall.entrance"
                },
                events: ["sans_waterfall"]
            },
            TALL_GRASS: {
                id: "tall_grass",
                name: "Tall Grass",
                description: "A patch of tall grass that you can hide in. The path continues above.",
                image: "img/locations/tall_grass.png",
                exits: {
                    forward: "waterfall.bridge_seeds_1",
                    back: "waterfall.sans_station"
                },
                events: ["undyne_first_appearance"]
            },
            BRIDGE_SEEDS_1: {
                id: "bridge_seeds_1",
                name: "Bridge Seed Puzzle",
                description: "A room with water and some bridge seeds that bloom when aligned in the water.",
                image: "img/locations/bridge_seeds.png",
                exits: {
                    forward: "waterfall.wishing_room",
                    back: "waterfall.tall_grass"
                },
                puzzle: "bridge_seeds_1"
            },
            WISHING_ROOM: {
                id: "wishing_room",
                name: "Wishing Room",
                description: "A cavern with glowing crystals in the ceiling that resemble stars. Echo flowers whisper wishes made by monsters.",
                image: "img/locations/wishing_room.png",
                exits: {
                    forward: "waterfall.history_hall",
                    back: "waterfall.bridge_seeds_1"
                },
                events: ["hear_wishes"]
            },
            HISTORY_HALL: {
                id: "history_hall",
                name: "History Hall",
                description: "A corridor with ancient plaques that tell the history of humans and monsters.",
                image: "img/locations/history_hall.png",
                exits: {
                    forward: "waterfall.rain_statue",
                    back: "waterfall.wishing_room"
                },
                events: ["read_history"]
            },
            RAIN_STATUE: {
                id: "rain_statue",
                name: "Rain Statue",
                description: "A statue being rained on from above. It looks melancholic.",
                image: "img/locations/rain_statue.png",
                exits: {
                    forward: "waterfall.umbrella_stand",
                    back: "waterfall.history_hall"
                },
                puzzle: "rain_statue"
            },
            UMBRELLA_STAND: {
                id: "umbrella_stand",
                name: "Umbrella Stand",
                description: "A bucket of umbrellas with a sign that says 'Take One!'",
                image: "img/locations/umbrella_stand.png",
                exits: {
                    forward: "waterfall.rainy_path",
                    back: "waterfall.rain_statue"
                },
                items: ["umbrella"]
            },
            RAINY_PATH: {
                id: "rainy_path",
                name: "Rainy Path",
                description: "A long, rainy path. If you have an umbrella, you'll stay dry.",
                image: "img/locations/rainy_path.png",
                exits: {
                    forward: "waterfall.view_point",
                    back: "waterfall.umbrella_stand"
                },
                events: ["monster_kid_umbrella"]
            },
            VIEW_POINT: {
                id: "view_point",
                name: "View Point",
                description: "A high point with a view of the monster capital in the distance. The castle looms far away.",
                image: "img/locations/view_point.png",
                exits: {
                    forward: "waterfall.cliff",
                    back: "waterfall.rainy_path"
                },
                events: ["castle_view"]
            },
            CLIFF: {
                id: "cliff",
                name: "Steep Cliff",
                description: "A steep cliff that's too tall to climb. There's a ledge far above you.",
                image: "img/locations/cliff.png",
                exits: {
                    forward: "waterfall.bridge_2",
                    back: "waterfall.view_point"
                },
                events: ["monster_kid_helps"]
            },
            BRIDGE_2: {
                id: "bridge_2",
                name: "Wooden Bridge",
                description: "A long wooden bridge over a deep chasm. It doesn't look very stable.",
                image: "img/locations/wooden_bridge.png",
                exits: {
                    forward: "waterfall.dead_end",
                    back: "waterfall.cliff"
                },
                events: ["undyne_bridge_encounter"]
            },
            DEAD_END: {
                id: "dead_end",
                name: "Dead End",
                description: "The bridge has collapsed beneath you, and you've fallen to a garbage dump below.",
                image: "img/locations/dead_end.png",
                exits: {
                    forward: "waterfall.garbage_dump",
                    back: null
                }
            },
            GARBAGE_DUMP: {
                id: "garbage_dump",
                name: "Garbage Dump",
                description: "Piles of garbage from the surface have accumulated here, carried by waterfalls from above.",
                image: "img/locations/garbage_dump.png",
                exits: {
                    forward: "waterfall.training_dummy",
                    back: null
                },
                items: ["astronaut_food", "ballet_shoes"]
            },
            TRAINING_DUMMY: {
                id: "training_dummy",
                name: "Training Dummy",
                description: "A familiar-looking training dummy blocks your path.",
                image: "img/locations/training_dummy.png",
                exits: {
                    forward: "waterfall.quiet_area",
                    back: "waterfall.garbage_dump"
                },
                events: ["mad_dummy_fight"]
            },
            QUIET_AREA: {
                id: "quiet_area",
                name: "Quiet Area",
                description: "A peaceful area with a few houses. One looks like a ghost.",
                image: "img/locations/quiet_area.png",
                exits: {
                    forward: "waterfall.gerson_shop",
                    east: "waterfall.napstablook_house",
                    back: "waterfall.training_dummy"
                },
                isSavePoint: true,
                saveText: "Quiet Waterfall Area"
            },
            NAPSTABLOOK_HOUSE: {
                id: "napstablook_house",
                name: "Napstablook's House",
                description: "A simple ghost-shaped house. It looks spooky but somehow also cozy.",
                image: "img/locations/napstablook_house.png",
                exits: {
                    back: "waterfall.quiet_area"
                },
                events: ["napstablook_house_visit"]
            },
            GERSON_SHOP: {
                id: "gerson_shop",
                name: "Gerson's Shop",
                description: "An old turtle monster's shop filled with historical artifacts and items.",
                image: "img/locations/gerson_shop.png",
                exits: {
                    forward: "waterfall.maze",
                    back: "waterfall.quiet_area"
                },
                shop: "gerson_shop"
            },
            MAZE: {
                id: "maze",
                name: "Twinkling Maze",
                description: "A dark maze lit only by glowing mushrooms and crystals.",
                image: "img/locations/twinkling_maze.png",
                exits: {
                    forward: "waterfall.temmie_entrance",
                    back: "waterfall.gerson_shop"
                },
                puzzle: "crystal_maze"
            },
            TEMMIE_ENTRANCE: {
                id: "temmie_entrance",
                name: "Strange Path",
                description: "A hidden path that seems to lead to somewhere mysterious.",
                image: "img/locations/temmie_entrance.png",
                exits: {
                    forward: "waterfall.temmie_village",
                    east: "waterfall.onion_san",
                    back: "waterfall.maze"
                }
            },
            TEMMIE_VILLAGE: {
                id: "temmie_village",
                name: "Temmie Village",
                description: "A strange village inhabited by cat-like creatures called Temmies.",
                image: "img/locations/temmie_village.png",
                exits: {
                    back: "waterfall.temmie_entrance"
                },
                shop: "tem_shop",
                events: ["temmie_greeting"]
            },
            ONION_SAN: {
                id: "onion_san",
                name: "Onion-San's Pool",
                description: "A large pool of water where a giant octopus-like monster resides.",
                image: "img/locations/onion_san.png",
                exits: {
                    forward: "waterfall.piano_puzzle",
                    back: "waterfall.temmie_entrance"
                },
                events: ["onion_san_chat"]
            },
            PIANO_PUZZLE: {
                id: "piano_puzzle",
                name: "Piano Room",
                description: "A room with a piano and a sign with musical instructions.",
                image: "img/locations/piano_room.png",
                exits: {
                    forward: "waterfall.statue_room",
                    back: "waterfall.onion_san"
                },
                puzzle: "piano",
                events: ["piano_hint"]
            },
            STATUE_ROOM: {
                id: "statue_room",
                name: "Artifact Room",
                description: "A room with a legendary artifact on a pedestal.",
                image: "img/locations/artifact_room.png",
                exits: {
                    forward: "waterfall.bridge_3",
                    back: "waterfall.piano_puzzle"
                },
                items: ["legendary_artifact"],
                events: ["annoying_dog_steals"]
            },
            BRIDGE_3: {
                id: "bridge_3",
                name: "Narrow Bridge",
                description: "An extremely narrow bridge over a deep chasm.",
                image: "img/locations/narrow_bridge.png",
                exits: {
                    forward: "waterfall.undyne_arena",
                    back: "waterfall.statue_room"
                },
                events: ["monster_kid_bridge"]
            },
            UNDYNE_ARENA: {
                id: "undyne_arena",
                name: "Mountain Top",
                description: "A peak that overlooks all of Waterfall. Undyne stands at the top, ready for battle.",
                image: "img/locations/mountain_top.png",
                exits: {
                    forward: "hotland.entrance",
                    back: "waterfall.bridge_3"
                },
                events: ["undyne_battle"]
            }
        }
    },
    HOTLAND: {
        id: "hotland",
        name: "Hotland",
        backgroundColor: "#570000",
        accentColor: "#aa0000",
        locations: {
            ENTRANCE: {
                id: "entrance",
                name: "Hotland Entrance",
                description: "The entrance to a scorching hot area. Lava bubbles below the rocky platforms.",
                image: "img/locations/hotland_entrance.png",
                exits: {
                    forward: "hotland.water_cooler",
                    back: "waterfall.undyne_arena"
                },
                events: ["undyne_collapses"]
            },
            WATER_COOLER: {
                id: "water_cooler",
                name: "Water Cooler",
                description: "A water cooler stands at the edge of the path. The heat here is intense.",
                image: "img/locations/water_cooler.png",
                exits: {
                    forward: "hotland.lab_exterior",
                    back: "hotland.entrance"
                },
                items: ["water_cup"]
            },
            LAB_EXTERIOR: {
                id: "lab_exterior",
                name: "Lab Exterior",
                description: "A large white building stands in contrast to the red rocks around it. It's labeled 'LAB'.",
                image: "img/locations/lab_exterior.png",
                exits: {
                    forward: "hotland.lab_interior",
                    back: "hotland.water_cooler"
                },
                isSavePoint: true,
                saveText: "Alphys's Lab"
            },
            LAB_INTERIOR: {
                id: "lab_interior",
                name: "Lab Interior",
                description: "The inside of Alphys's lab. Scientific equipment and monitors line the walls.",
                image: "img/locations/lab_interior.png",
                exits: {
                    forward: "hotland.lab_exit",
                    back: "hotland.lab_exterior"
                },
                events: ["alphys_introduction", "mettaton_quiz"]
            },
            LAB_EXIT: {
                id: "lab_exit",
                name: "Lab Exit",
                description: "The back exit of Alphys's lab. It leads deeper into Hotland.",
                image: "img/locations/lab_exit.png",
                exits: {
                    forward: "hotland.conveyor_belt",
                    back: "hotland.lab_interior"
                }
            },
            CONVEYOR_BELT: {
                id: "conveyor_belt",
                name: "Conveyor Belt Path",
                description: "A system of conveyor belts that carry you across gaps in the platforms.",
                image: "img/locations/conveyor_belt.png",
                exits: {
                    forward: "hotland.vent_puzzle",
                    back: "hotland.lab_exit"
                },
                puzzle: "conveyor_pattern"
            },
            VENT_PUZZLE: {
                id: "vent_puzzle",
                name: "Steam Vent Puzzle",
                description: "A series of steam vents that can launch you to different platforms.",
                image: "img/locations/vent_puzzle.png",
                exits: {
                    forward: "hotland.arrow_puzzle",
                    back: "hotland.conveyor_belt"
                },
                puzzle: "steam_vents"
            },
            ARROW_PUZZLE: {
                id: "arrow_puzzle",
                name: "Arrow Puzzle",
                description: "A puzzle with arrows that change direction when you shoot them.",
                image: "img/locations/arrow_puzzle.png",
                exits: {
                    forward: "hotland.cooking_show",
                    back: "hotland.vent_puzzle"
                },
                puzzle: "arrows"
            },
            COOKING_SHOW: {
                id: "cooking_show",
                name: "Cooking Show Stage",
                description: "A stage set up like a cooking show, with 'MTT' branding everywhere.",
                image: "img/locations/cooking_show.png",
                exits: {
                    forward: "hotland.elevator_r1",
                    back: "hotland.arrow_puzzle"
                },
                events: ["mettaton_cooking"]
            },
            ELEVATOR_R1: {
                id: "elevator_r1",
                name: "Elevator R1",
                description: "An elevator that can take you to different floors of Hotland.",
                image: "img/locations/elevator.png",
                exits: {
                    forward: "hotland.hot_dog_stand",
                    back: "hotland.cooking_show",
                    elevator: ["hotland.elevator_l1", "hotland.elevator_r2", "hotland.elevator_l2", "hotland.elevator_r3", "hotland.elevator_l3"]
                }
            },
            HOT_DOG_STAND: {
                id: "hot_dog_stand",
                name: "Hot Dog Stand",
                description: "Sans is operating a hot dog stand here. He offers 'hot dogs' for sale.",
                image: "img/locations/hot_dog_stand.png",
                exits: {
                    forward: "hotland.laser_puzzle_1",
                    back: "hotland.elevator_r1"
                },
                shop: "hot_dog_stand",
                events: ["sans_hotdogs"]
            },
            LASER_PUZZLE_1: {
                id: "laser_puzzle_1",
                name: "Laser Puzzle",
                description: "A room with moving lasers that you need to time your movement through.",
                image: "img/locations/laser_puzzle.png",
                exits: {
                    forward: "hotland.news_stage",
                    back: "hotland.hot_dog_stand"
                },
                puzzle: "lasers_1"
            },
            NEWS_STAGE: {
                id: "news_stage",
                name: "News Stage",
                description: "A stage set up like a news broadcast room with Mettaton as the anchor.",
                image: "img/locations/news_stage.png",
                exits: {
                    forward: "hotland.elevator_r2",
                    back: "hotland.laser_puzzle_1"
                },
                events: ["mettaton_news"]
            },
            ELEVATOR_R2: {
                id: "elevator_r2",
                name: "Elevator R2",
                description: "Another elevator in Hotland's system.",
                image: "img/locations/elevator.png",
                exits: {
                    forward: "hotland.puzzle_reactivation",
                    back: "hotland.news_stage",
                    elevator: ["hotland.elevator_r1", "hotland.elevator_l1", "hotland.elevator_l2", "hotland.elevator_r3", "hotland.elevator_l3"]
                }
            },
            PUZZLE_REACTIVATION: {
                id: "puzzle_reactivation",
                name: "Puzzle Reactivation Room",
                description: "A room where you need to reactivate the puzzles that Alphys 'deactivated' for you.",
                image: "img/locations/puzzle_reactivation.png",
                exits: {
                    forward: "hotland.shooter_puzzle",
                    back: "hotland.elevator_r2"
                },
                puzzle: "reactivation",
                events: ["alphys_calls_puzzles"]
            },
            SHOOTER_PUZZLE: {
                id: "shooter_puzzle",
                name: "Shooter Puzzle",
                description: "A puzzle where you need to shoot bombs to defuse them before they explode.",
                image: "img/locations/shooter_puzzle.png",
                exits: {
                    forward: "hotland.art_club",
                    back: "hotland.puzzle_reactivation"
                },
                puzzle: "bomb_defuse"
            },
            ART_CLUB: {
                id: "art_club",
                name: "Art Club Room",
                description: "A room dedicated to art with various supplies and drawings.",
                image: "img/locations/art_club.png",
                exits: {
                    forward: "hotland.elevator_r3",
                    back: "hotland.shooter_puzzle"
                },
                events: ["so_sorry_encounter"]
            },
            ELEVATOR_R3: {
                id: "elevator_r3",
                name: "Elevator R3",
                description: "The highest elevator on the right side of Hotland.",
                image: "img/locations/elevator.png",
                exits: {
                    forward: "hotland.spider_bake_sale",
                    back: "hotland.art_club",
                    elevator: ["hotland.elevator_r1", "hotland.elevator_r2", "hotland.elevator_l1", "hotland.elevator_l2", "hotland.elevator_l3"]
                }
            },
            SPIDER_BAKE_SALE: {
                id: "spider_bake_sale",
                name: "Spider Bake Sale (Hotland)",
                description: "A more elaborate version of the bake sale from the Ruins. Spider webs cover the walls and ceiling.",
                image: "img/locations/spider_bake_sale_hotland.png",
                exits: {
                    forward: "hotland.spider_tunnel",
                    back: "hotland.elevator_r3"
                },
                shop: "spider_bake_sale_hotland"
            },
            SPIDER_TUNNEL: {
                id: "spider_tunnel",
                name: "Spider Tunnel",
                description: "A dark tunnel covered in spider webs. It feels like you're being watched.",
                image: "img/locations/spider_tunnel.png",
                exits: {
                    forward: "hotland.muffet_arena",
                    back: "hotland.spider_bake_sale"
                }
            },
            MUFFET_ARENA: {
                id: "muffet_arena",
                name: "Muffet's Arena",
                description: "A large web where Muffet, a spider monster, awaits.",
                image: "img/locations/muffet_arena.png",
                exits: {
                    forward: "hotland.musical_stage",
                    back: "hotland.spider_tunnel"
                },
                events: ["muffet_battle"]
            },
            MUSICAL_STAGE: {
                id: "musical_stage",
                name: "Musical Stage",
                description: "An elaborate stage set up for what appears to be a musical performance.",
                image: "img/locations/musical_stage.png",
                exits: {
                    forward: "hotland.mtt_resort_exterior",
                    back: "hotland.muffet_arena"
                },
                events: ["mettaton_musical"]
            },
            MTT_RESORT_EXTERIOR: {
                id: "mtt_resort_exterior",
                name: "MTT Resort Exterior",
                description: "The exterior of a flashy resort owned by Mettaton. It's a popular destination in the Underground.",
                image: "img/locations/mtt_resort_exterior.png",
                exits: {
                    forward: "hotland.mtt_resort_lobby",
                    back: "hotland.musical_stage"
                },
                isSavePoint: true,
                saveText: "MTT Resort"
            },
            MTT_RESORT_LOBBY: {
                id: "mtt_resort_lobby",
                name: "MTT Resort Lobby",
                description: "The glamorous lobby of Mettaton's resort. A fountain with Mettaton's statue dominates the center.",
                image: "img/locations/mtt_resort_lobby.png",
                exits: {
                    forward: "hotland.core_entrance",
                    west: "hotland.restaurant",
                    east: "hotland.resort_shop",
                    back: "hotland.mtt_resort_exterior"
                },
                events: ["sans_resort_meeting"]
            },
            RESTAURANT: {
                id: "restaurant",
                name: "MTT Resort Restaurant",
                description: "An upscale restaurant inside the resort. It's dimly lit with small tables.",
                image: "img/locations/restaurant.png",
                exits: {
                    back: "hotland.mtt_resort_lobby"
                },
                events: ["sans_dinner"]
            },
            RESORT_SHOP: {
                id: "resort_shop",
                name: "Bratty and Catty's Shop",
                description: "A shop run by two monsters selling items they found in the garbage dump.",
                image: "img/locations/bratty_catty.png",
                exits: {
                    back: "hotland.mtt_resort_lobby"
                },
                shop: "bratty_catty_shop"
            },
            CORE_ENTRANCE: {
                id: "core_entrance",
                name: "CORE Entrance",
                description: "The entrance to the CORE, a massive structure that provides power to the Underground.",
                image: "img/locations/core_entrance.png",
                exits: {
                    forward: "hotland.core_junction",
                    back: "hotland.mtt_resort_lobby"
                },
                events: ["alphys_core_guidance"]
            },
            CORE_JUNCTION: {
                id: "core_junction",
                name: "CORE Junction",
                description: "A junction within the CORE. The path splits in multiple directions.",
                image: "img/locations/core_junction.png",
                exits: {
                    east: "hotland.core_east",
                    west: "hotland.core_west",
                    back: "hotland.core_entrance"
                },
                events: ["alphys_confusion"]
            },
            CORE_EAST: {
                id: "core_east",
                name: "CORE East Path",
                description: "The eastern path through the CORE. Machinery hums all around you.",
                image: "img/locations/core_east.png",
                exits: {
                    forward: "hotland.core_laser_puzzle",
                    back: "hotland.core_junction"
                },
                events: ["mercenary_encounter_1"]
            },
            CORE_WEST: {
                id: "core_west",
                name: "CORE West Path",
                description: "The western path through the CORE. Steam vents line the walls.",
                image: "img/locations/core_west.png",
                exits: {
                    forward: "hotland.core_pit_room",
                    back: "hotland.core_junction"
                },
                events: ["mercenary_encounter_2"]
            },
            CORE_LASER_PUZZLE: {
                id: "core_laser_puzzle",
                name: "CORE Laser Room",
                description: "A room with complex laser patterns blocking your path.",
                image: "img/locations/core_laser_puzzle.png",
                exits: {
                    forward: "hotland.core_crossroads",
                    back: "hotland.core_east"
                },
                puzzle: "core_lasers"
            },
            CORE_PIT_ROOM: {
                id: "core_pit_room",
                name: "CORE Pit Room",
                description: "A room with various pits that you must navigate around.",
                image: "img/locations/core_pit_room.png",
                exits: {
                    forward: "hotland.core_crossroads",
                    back: "hotland.core_west"
                },
                puzzle: "core_pits"
            },
            CORE_CROSSROADS: {
                id: "core_crossroads",
                name: "CORE Crossroads",
                description: "Another junction within the CORE. The air feels electric here.",
                image: "img/locations/core_crossroads.png",
                exits: {
                    forward: "hotland.core_warrior_path",
                    west: "hotland.core_sage_path",
                    back: "hotland.core_junction"
                },
                isSavePoint: true,
                saveText: "CORE Crossroads"
            },
            CORE_WARRIOR_PATH: {
                id: "core_warrior_path",
                name: "Warrior's Path",
                description: "A direct but dangerous path through the CORE.",
                image: "img/locations/core_warrior.png",
                exits: {
                    forward: "hotland.core_bridge",
                    back: "hotland.core_crossroads"
                },
                events: ["knight_knight_encounter"]
            },
            CORE_SAGE_PATH: {
                id: "core_sage_path",
                name: "Sage's Path",
                description: "A path with puzzles rather than combat.",
                image: "img/locations/core_sage.png",
                exits: {
                    forward: "hotland.core_bridge",
                    back: "hotland.core_crossroads"
                },
                puzzle: "power_nodes"
            },
            CORE_BRIDGE: {
                id: "core_bridge",
                name: "CORE Bridge",
                description: "A bridge spanning a vast energy collection chamber in the CORE.",
                image: "img/locations/core_bridge.png",
                exits: {
                    forward: "hotland.core_elevator",
                    back: "hotland.core_crossroads"
                },
                events: ["mercenary_final"]
            },
            CORE_ELEVATOR: {
                id: "core_elevator",
                name: "CORE Elevator",
                description: "An elevator leading to the top floor of the CORE.",
                image: "img/locations/core_elevator.png",
                exits: {
                    forward: "hotland.mettaton_arena",
                    back: "hotland.core_bridge"
                }
            },
            METTATON_ARENA: {
                id: "mettaton_arena",
                name: "Mettaton's Arena",
                description: "A grand stage at the top of the CORE. Colored lights flash and an audience of cameras watches.",
                image: "img/locations/mettaton_arena.png",
                exits: {
                    forward: "new_home.elevator",
                    back: "hotland.core_elevator"
                },
                events: ["mettaton_battle"]
            }
        }
    },
    NEW_HOME: {
        id: "new_home",
        name: "New Home",
        backgroundColor: "#303030",
        accentColor: "#808080",
        locations: {
            ELEVATOR: {
                id: "elevator",
                name: "New Home Elevator",
                description: "An elevator that has brought you to the capital of the Underground.",
                image: "img/locations/new_home_elevator.png",
                exits: {
                    forward: "new_home.corridor_1",
                    back: null // Can't go back to Hotland from here
                }
            },
            CORRIDOR_1: {
                id: "corridor_1",
                name: "Gray Corridor",
                description: "A long, gray corridor. Everything here lacks color compared to the rest of the Underground.",
                image: "img/locations/gray_corridor.png",
                exits: {
                    forward: "new_home.overlook",
                    back: "new_home.elevator"
                }
            },
            OVERLOOK: {
                id: "overlook",
                name: "New Home Overlook",
                description: "A vantage point overlooking the expansive gray city of New Home.",
                image: "img/locations/new_home_overlook.png",
                exits: {
                    forward: "new_home.corridor_2",
                    back: "new_home.corridor_1"
                },
                isSavePoint: true,
                saveText: "New Home"
            },
            CORRIDOR_2: {
                id: "corridor_2",
                name: "Judgment Hall Approach",
                description: "A corridor leading to what appears to be an important hall. Monsters begin to tell you the story of the first human and Asriel.",
                image: "img/locations/corridor_approach.png",
                exits: {
                    forward: "new_home.asgore_house_exterior",
                    back: "new_home.overlook"
                },
                events: ["monster_story_1"]
            },
            ASGORE_HOUSE_EXTERIOR: {
                id: "asgore_house_exterior",
                name: "Asgore's House",
                description: "A house that looks eerily similar to Toriel's home in the Ruins, but in grayscale.",
                image: "img/locations/asgore_house.png",
                exits: {
                    forward: "new_home.asgore_house_entry",
                    back: "new_home.corridor_2"
                },
                events: ["monster_story_2"]
            },
            ASGORE_HOUSE_ENTRY: {
                id: "asgore_house_entry",
                name: "Asgore's House Entryway",
                description: "The entrance to Asgore's home. It's laid out exactly like Toriel's house.",
                image: "img/locations/asgore_entry.png",
                exits: {
                    east: "new_home.living_room",
                    west: "new_home.hallway",
                    back: "new_home.asgore_house_exterior"
                },
                isSavePoint: true,
                saveText: "Asgore's Home"
            },
            LIVING_ROOM: {
                id: "living_room",
                name: "Asgore's Living Room",
                description: "The living room in Asgore's house. A reading chair sits by a cold fireplace.",
                image: "img/locations/asgore_living_room.png",
                exits: {
                    east: "new_home.kitchen",
                    west: "new_home.asgore_house_entry"
                },
                events: ["monster_story_3"],
                items: ["worn_dagger"]
            },
            KITCHEN: {
                id: "kitchen",
                name: "Asgore's Kitchen",
                description: "The kitchen in Asgore's house. There's a note about butterscotch-cinnamon pie on the counter.",
                image: "img/locations/asgore_kitchen.png",
                exits: {
                    back: "new_home.living_room"
                },
                events: ["monster_story_4"]
            },
            HALLWAY: {
                id: "hallway",
                name: "Asgore's Hallway",
                description: "The hallway in Asgore's house. There are two rooms to the north and a stairway to the basement.",
                image: "img/locations/asgore_hallway.png",
                exits: {
                    east: "new_home.asgore_house_entry",
                    north: "new_home.children_room",
                    west: "new_home.asgore_room",
                    south: "new_home.basement_stairs"
                },
                events: ["monster_story_5"]
            },
            CHILDREN_ROOM: {
                id: "children_room",
                name: "Children's Room",
                description: "A bedroom with two small beds. It was once shared by Asriel and the first human.",
                image: "img/locations/children_room.png",
                exits: {
                    back: "new_home.hallway"
                },
                events: ["monster_story_6"],
                items: ["heart_locket"]
            },
            ASGORE_ROOM: {
                id: "asgore_room",
                name: "Asgore's Room",
                description: "King Asgore's bedroom. A large bed and a trophy that says 'Number 1 Nose-Nuzzle Champions' sits on a shelf.",
                image: "img/locations/asgore_room.png",
                exits: {
                    back: "new_home.hallway"
                },
                events: ["monster_story_7"]
            },
            BASEMENT_STAIRS: {
                id: "basement_stairs",
                name: "Basement Stairs",
                description: "Stairs leading down to the basement of Asgore's home.",
                image: "img/locations/basement_stairs.png",
                exits: {
                    forward: "new_home.basement_corridor",
                    back: "new_home.hallway"
                },
                events: ["monster_story_8"]
            },
            BASEMENT_CORRIDOR: {
                id: "basement_corridor",
                name: "Basement Corridor",
                description: "A long corridor beneath Asgore's home. It leads to somewhere important.",
                image: "img/locations/basement_corridor.png",
                exits: {
                    forward: "new_home.judgment_hall",
                    back: "new_home.basement_stairs"
                },
                events: ["monster_story_9"]
            },
            JUDGMENT_HALL: {
                id: "judgment_hall",
                name: "Judgment Hall",
                description: "A grand, golden hallway with pillars and stained glass windows. Light filters through, casting long shadows.",
                image: "img/locations/judgment_hall.png",
                exits: {
                    forward: "new_home.coffin_room",
                    back: "new_home.basement_corridor"
                },
                events: ["sans_judgment"]
            },
            COFFIN_ROOM: {
                id: "coffin_room",
                name: "Coffin Room",
                description: "A room with seven coffins. Six are filled, and one is empty with a name that matches what you called the first human.",
                image: "img/locations/coffin_room.png",
                exits: {
                    forward: "new_home.throne_room",
                    back: "new_home.judgment_hall"
                }
            },
            THRONE_ROOM: {
                id: "throne_room",
                name: "Throne Room",
                description: "A room filled with golden flowers. Two thrones sit in the center, one covered with a sheet.",
                image: "img/locations/throne_room.png",
                exits: {
                    forward: "new_home.barrier",
                    back: "new_home.coffin_room"
                },
                events: ["asgore_meeting"]
            },
            BARRIER: {
                id: "barrier",
                name: "The Barrier",
                description: "The magical barrier that keeps monsters trapped underground. It pulses with energy.",
                image: "img/locations/barrier.png",
                exits: {
                    back: "new_home.throne_room"
                },
                events: ["asgore_battle", "flowey_interruption"]
            }
        }
    },
    TRUE_LAB: {
        id: "true_lab",
        name: "True Lab",
        backgroundColor: "#003030",
        accentColor: "#006060",
        locations: {
            ENTRY: {
                id: "entry",
                name: "True Lab Entry",
                description: "The real laboratory hidden beneath Alphys's lab. It's dark and ominous.",
                image: "img/locations/true_lab_entry.png",
                exits: {
                    forward: "true_lab.power_room"
                },
                isSavePoint: true,
                saveText: "True Lab"
            },
            POWER_ROOM: {
                id: "power_room",
                name: "Power Room",
                description: "A room with a large machine that needs to be activated.",
                image: "img/locations/power_room.png",
                exits: {
                    forward: "true_lab.main_hall",
                    back: "true_lab.entry"
                },
                puzzle: "power_generator"
            },
            MAIN_HALL: {
                id: "main_hall",
                name: "Main Hall",
                description: "A main corridor with doors leading to different areas of the lab.",
                image: "img/locations/main_hall.png",
                exits: {
                    north: "true_lab.bedroom",
                    east: "true_lab.east_hall",
                    west: "true_lab.west_hall",
                    back: "true_lab.power_room"
                }
            },
            BEDROOM: {
                id: "bedroom",
                name: "Bedroom",
                description: "A room with beds for patients or test subjects. Red liquid drips from one of the beds.",
                image: "img/locations/bedroom.png",
                exits: {
                    back: "true_lab.main_hall"
                },
                events: ["memory_head_encounter"]
            },
            EAST_HALL: {
                id: "east_hall",
                name: "East Hall",
                description: "A hallway with entries from Alphys's research journal on the walls.",
                image: "img/locations/east_hall.png",
                exits: {
                    forward: "true_lab.determination_extractor",
                    back: "true_lab.main_hall"
                },
                events: ["entry_1"]
            },
            DETERMINATION_EXTRACTOR: {
                id: "determination_extractor",
                name: "Determination Extractor Room",
                description: "A room with a large skull-like machine that was used to extract determination.",
                image: "img/locations/determination_extractor.png",
                exits: {
                    forward: "true_lab.golden_flower_room",
                    back: "true_lab.east_hall"
                },
                events: ["entry_2"]
            },
            GOLDEN_FLOWER_ROOM: {
                id: "golden_flower_room",
                name: "Golden Flower Room",
                description: "A room where experiments on golden flowers were conducted.",
                image: "img/locations/golden_flower_room.png",
                exits: {
                    forward: "true_lab.mirror_room",
                    back: "true_lab.determination_extractor"
                },
                events: ["entry_3", "endogeny_encounter"]
            },
            MIRROR_ROOM: {
                id: "mirror_room",
                name: "Mirror Room",
                description: "A room with a large mirror on one wall. Your reflection looks... strange.",
                image: "img/locations/mirror_room.png",
                exits: {
                    forward: "true_lab.refrigerator_room",
                    back: "true_lab.golden_flower_room"
                },
                events: ["entry_4"]
            },
            REFRIGERATOR_ROOM: {
                id: "refrigerator_room",
                name: "Refrigerator Room",
                description: "A room filled with refrigerators that once contained samples.",
                image: "img/locations/refrigerator_room.png",
                exits: {
                    forward: "true_lab.fan_room",
                    back: "true_lab.mirror_room"
                },
                events: ["entry_5", "snowdrake_mother_encounter"]
            },
            FAN_ROOM: {
                id: "fan_room",
                name: "Fan Room",
                description: "A room with a large fan that circulates air through the lab.",
                image: "img/locations/fan_room.png",
                exits: {
                    forward: "true_lab.west_hall",
                    back: "true_lab.refrigerator_room"
                },
                puzzle: "fan_switch"
            },
            WEST_HALL: {
                id: "west_hall",
                name: "West Hall",
                description: "Another hallway with more research entries.",
                image: "img/locations/west_hall.png",
                exits: {
                    forward: "true_lab.tv_room",
                    back: "true_lab.main_hall"
                },
                events: ["entry_6"]
            },
            TV_ROOM: {
                id: "tv_room",
                name: "TV Room",
                description: "A room with an old TV and VHS tapes of cartoons.",
                image: "img/locations/tv_room.png",
                exits: {
                    forward: "true_lab.power_generator",
                    back: "true_lab.west_hall"
                },
                events: ["entry_7", "reaper_bird_encounter"]
            },
            POWER_GENERATOR: {
                id: "power_generator",
                name: "Power Generator",
                description: "The main power generator for the lab. It's connected to an elevator.",
                image: "img/locations/power_generator.png",
                exits: {
                    forward: "true_lab.elevator",
                    back: "true_lab.tv_room"
                },
                events: ["entry_8", "lemon_bread_encounter"]
            },
            ELEVATOR: {
                id: "elevator",
                name: "True Lab Elevator",
                description: "An elevator that can take you back to the surface of the lab.",
                image: "img/locations/true_lab_elevator.png",
                exits: {
                    up: "hotland.lab_interior",
                    back: "true_lab.power_generator"
                },
                events: ["amalgamate_gathering", "alphys_confession"]
            }
        }
    }
};

// Export for use in main data file
window.UNDERTALE_AREAS = AREAS;