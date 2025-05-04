/**
 * UNDERTALE Text Adventure Game - Items Data
 * Contains all item properties and effects
 */

const ITEMS = {
    // Healing Items
    MONSTER_CANDY: {
        id: "monster_candy",
        name: "Monster Candy",
        description: "A sweet candy with a distinct, non-licorice flavor.",
        type: "healing",
        effect: {
            hp: 10
        },
        value: 5,
        battleUse: true
    },
    SPIDER_DONUT: {
        id: "spider_donut",
        name: "Spider Donut",
        description: "A donut made with Spider Cider in the batter. It looks like it was made by spiders, for spiders, of spiders.",
        type: "healing",
        effect: {
            hp: 12
        },
        value: 7,
        battleUse: true
    },
    BUTTERSCOTCH_PIE: {
        id: "butterscotch_pie",
        name: "Butterscotch-Cinnamon Pie",
        description: "A butterscotch-cinnamon pie baked by Toriel. It smells delicious.",
        type: "healing",
        effect: {
            hp: 999
        },
        value: 100,
        battleUse: true
    },
    NICE_CREAM: {
        id: "nice_cream",
        name: "Nice Cream",
        description: "The frozen treat that warms your heart! It has a wrapper with a positive message inside.",
        type: "healing",
        effect: {
            hp: 15
        },
        value: 15,
        battleUse: true
    },
    CINNAMON_BUNNY: {
        id: "cinnamon_bunny",
        name: "Cinnamon Bunny",
        description: "A sweet bunny-shaped cinnamon roll from Snowdin's shop.",
        type: "healing",
        effect: {
            hp: 22
        },
        value: 25,
        battleUse: true
    },
    SEA_TEA: {
        id: "sea_tea",
        name: "Sea Tea",
        description: "Tea made from glowing marsh water. It improves your SPEED in battle.",
        type: "healing",
        effect: {
            hp: 10,
            speed: 1
        },
        value: 18,
        battleUse: true
    },
    ASTRONAUT_FOOD: {
        id: "astronaut_food",
        name: "Astronaut Food",
        description: "Dry food in a plastic package. It replenishes HP because it's specially formulated for space travel.",
        type: "healing",
        effect: {
            hp: 21
        },
        value: 30,
        battleUse: true
    },
    HOT_DOG: {
        id: "hot_dog",
        name: "Hot Dog...?",
        description: "A hot dog made of... water sausage? Sans says it's great with ketchup.",
        type: "healing",
        effect: {
            hp: 20
        },
        value: 30,
        battleUse: true
    },
    GLAMBURGER: {
        id: "glamburger",
        name: "Glamburger",
        description: "A hamburger made with sequins and glitter. Not exactly healthy, but very fashionable!",
        type: "healing",
        effect: {
            hp: 27
        },
        value: 120,
        battleUse: true
    },
    LEGENDARY_HERO: {
        id: "legendary_hero",
        name: "Legendary Hero",
        description: "A legendary sandwich made with heroic ingredients. Eating it raises your ATTACK.",
        type: "healing",
        effect: {
            hp: 40,
            atk: 4
        },
        value: 300,
        battleUse: true
    },
    
    // Weapons
    STICK: {
        id: "stick",
        name: "Stick",
        description: "A simple stick. Can be used as a weak weapon or to throw and distract enemies.",
        type: "weapon",
        effect: {
            atk: 0
        },
        value: 0,
        equipable: true
    },
    TOY_KNIFE: {
        id: "toy_knife",
        name: "Toy Knife",
        description: "A plastic knife. It's not very effective as a weapon.",
        type: "weapon",
        effect: {
            atk: 3
        },
        value: 100,
        equipable: true
    },
    TOUGH_GLOVE: {
        id: "tough_glove",
        name: "Tough Glove",
        description: "A worn pink leather glove that strengthens your attacks.",
        type: "weapon",
        effect: {
            atk: 5
        },
        value: 150,
        equipable: true
    },
    BALLET_SHOES: {
        id: "ballet_shoes",
        name: "Ballet Shoes",
        description: "These used shoes make you feel incredibly dangerous.",
        type: "weapon",
        effect: {
            atk: 7
        },
        value: 200,
        equipable: true
    },
    TORN_NOTEBOOK: {
        id: "torn_notebook",
        name: "Torn Notebook",
        description: "A notebook with some pages torn out. It provides INV up rather than ATK up.",
        type: "weapon",
        effect: {
            atk: 2,
            inv: 6
        },
        value: 250,
        equipable: true
    },
    BURNT_PAN: {
        id: "burnt_pan",
        name: "Burnt Pan",
        description: "A well-used frying pan. Food items heal 4 more HP when this is equipped.",
        type: "weapon",
        effect: {
            atk: 10,
            healing: 4
        },
        value: 300,
        equipable: true
    },
    EMPTY_GUN: {
        id: "empty_gun",
        name: "Empty Gun",
        description: "An antique revolver with no bullets. It has good ATK despite being empty.",
        type: "weapon",
        effect: {
            atk: 12
        },
        value: 350,
        equipable: true
    },
    WORN_DAGGER: {
        id: "worn_dagger",
        name: "Worn Dagger",
        description: "A dull old dagger that has seen better days. Perfect for cutting plants and vines.",
        type: "weapon",
        effect: {
            atk: 15
        },
        value: 400,
        equipable: true
    },
    REAL_KNIFE: {
        id: "real_knife",
        name: "Real Knife",
        description: "A wickedly sharp knife that feels right in your hand. Only appears in the Genocide route.",
        type: "weapon",
        effect: {
            atk: 99
        },
        value: 999,
        equipable: true,
        genocideOnly: true
    },
    
    // Armor
    BANDAGE: {
        id: "bandage",
        name: "Bandage",
        description: "A used bandage. It's seen better days, but it's better than nothing.",
        type: "armor",
        effect: {
            def: 0
        },
        value: 0,
        equipable: true
    },
    FADED_RIBBON: {
        id: "faded_ribbon",
        name: "Faded Ribbon",
        description: "A cute ribbon that makes enemies less likely to attack you.",
        type: "armor",
        effect: {
            def: 3
        },
        value: 100,
        equipable: true
    },
    MANLY_BANDANNA: {
        id: "manly_bandanna",
        name: "Manly Bandanna",
        description: "A bandanna with abs drawn on it. It raises your DEF.",
        type: "armor",
        effect: {
            def: 7
        },
        value: 150,
        equipable: true
    },
    OLD_TUTU: {
        id: "old_tutu",
        name: "Old Tutu",
        description: "A dusty ballet tutu that somehow provides decent defense.",
        type: "armor",
        effect: {
            def: 10
        },
        value: 200,
        equipable: true
    },
    CLOUDY_GLASSES: {
        id: "cloudy_glasses",
        name: "Cloudy Glasses",
        description: "Glasses with poor visibility that increase INV duration.",
        type: "armor",
        effect: {
            def: 5,
            inv: 9
        },
        value: 250,
        equipable: true
    },
    STAINED_APRON: {
        id: "stained_apron",
        name: "Stained Apron",
        description: "A cooking apron that heals 1 HP every other turn in battle.",
        type: "armor",
        effect: {
            def: 11,
            regen: 1
        },
        value: 300,
        equipable: true
    },
    COWBOY_HAT: {
        id: "cowboy_hat",
        name: "Cowboy Hat",
        description: "An old cowboy hat that increases ATK in addition to DEF.",
        type: "armor",
        effect: {
            def: 12,
            atk: 5
        },
        value: 350,
        equipable: true
    },
    HEART_LOCKET: {
        id: "heart_locket",
        name: "Heart Locket",
        description: "A heart-shaped locket with 'Best Friends Forever' engraved inside.",
        type: "armor",
        effect: {
            def: 15
        },
        value: 400,
        equipable: true
    },
    THE_LOCKET: {
        id: "the_locket",
        name: "The Locket",
        description: "A golden heart locket. The inscription says 'Right where it belongs'. Only appears in the Genocide route.",
        type: "armor",
        effect: {
            def: 99
        },
        value: 999,
        equipable: true,
        genocideOnly: true
    },
    
    // Key Items
    CELL_PHONE: {
        id: "cell_phone",
        name: "Cell Phone",
        description: "An old cell phone given to you by Toriel. It can receive calls.",
        type: "key",
        value: 0,
        equipable: false
    },
    SPIDER_CIDER: {
        id: "spider_cider",
        name: "Spider Cider",
        description: "A cider made with whole spiders, not just the juice. Supporting the spider bake sale helps spiders.",
        type: "healing",
        effect: {
            hp: 24
        },
        value: 18,
        battleUse: true
    },
    TEMMIE_FLAKES: {
        id: "temmie_flakes",
        name: "Temmie Flakes",
        description: "A popular Temmie treat made from... shredded construction paper?",
        type: "healing",
        effect: {
            hp: 2
        },
        value: 3,
        battleUse: true
    },
    DOG_RESIDUE: {
        id: "dog_residue",
        name: "Dog Residue",
        description: "A mysterious artifact left behind by the Annoying Dog. It can be used to create more Dog Residue.",
        type: "key",
        effect: {
            special: "duplicate"
        },
        value: 25,
        battleUse: false
    },
    ANNOYING_DOG: {
        id: "annoying_dog",
        name: "Annoying Dog",
        description: "A small, white dog that seems to appear everywhere and cause mischief.",
        type: "key",
        value: 0,
        battleUse: false,
        effect: {
            special: "absorb"
        }
    },
    UMBRELLA: {
        id: "umbrella",
        name: "Umbrella",
        description: "A simple umbrella that will keep you dry in the rain.",
        type: "key",
        value: 0,
        equipable: false
    },
    UNDYNE_LETTER: {
        id: "undyne_letter",
        name: "Undyne's Letter",
        description: "A letter from Undyne to be delivered to Alphys.",
        type: "key",
        value: 0,
        equipable: false
    },
    UNDYNE_LETTER_EX: {
        id: "undyne_letter_ex",
        name: "Undyne's Letter EX",
        description: "An unsealed letter from Undyne. The contents are very passionate.",
        type: "key",
        value: 0,
        equipable: false
    },
    MYSTERY_KEY: {
        id: "mystery_key",
        name: "Mystery Key",
        description: "A key to a mysterious locked door in Waterfall.",
        type: "key",
        value: 0,
        equipable: false
    },
    WATER_CUP: {
        id: "water_cup",
        name: "Cup of Water",
        description: "A small paper cup filled with water from a Hotland water cooler.",
        type: "key",
        effect: {
            special: "water_undyne"
        },
        value: 0,
        battleUse: false
    }
};

// Export for use in main data file
window.UNDERTALE_ITEMS = ITEMS;