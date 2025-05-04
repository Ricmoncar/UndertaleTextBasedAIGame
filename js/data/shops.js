/**
 * UNDERTALE Text Adventure Game - Shops Data
 * Contains all shop information and available items
 */

const SHOPS = {
    SPIDER_BAKE_SALE: {
        id: "spider_bake_sale",
        name: "Spider Bake Sale",
        description: "A small bake sale run by spiders. Proceeds go to real spiders.",
        shopkeeper: null,
        dialogue: {
            welcome: "Welcome to our bake sale, dearie~ All proceeds go to real spiders!",
            goodbye: "Come again, dearie~",
            purchase: "Thank you, dearie~ Your purchase will help spiders in need!",
            lowFunds: "You don't have enough gold, dearie~"
        },
        items: [
            {
                id: "spider_donut",
                price: 7
            },
            {
                id: "spider_cider",
                price: 18
            }
        ]
    },
    SNOWDIN_SHOP: {
        id: "snowdin_shop",
        name: "Snowdin Shop",
        description: "A cozy shop run by a rabbit monster in Snowdin.",
        shopkeeper: "Shopkeeper",
        dialogue: {
            welcome: "Hello, traveler. How can I help you today?",
            goodbye: "Come again sometime!",
            purchase: "Thanks for your purchase!",
            lowFunds: "Sorry, you don't have enough gold for that."
        },
        items: [
            {
                id: "cinnamon_bunny",
                price: 25
            },
            {
                id: "manly_bandanna",
                price: 50
            },
            {
                id: "tough_glove",
                price: 50
            }
        ]
    },
    GERSON_SHOP: {
        id: "gerson_shop",
        name: "Gerson's Shop",
        description: "A shop run by an elderly turtle monster who knows the history of the Underground.",
        shopkeeper: "Gerson",
        dialogue: {
            welcome: "Woah there! I've got some neat junk for sale.",
            goodbye: "Be careful out there, whippersnapper!",
            purchase: "Thanks! Wa ha ha!",
            lowFunds: "You're a bit short on funds there."
        },
        items: [
            {
                id: "sea_tea",
                price: 18
            },
            {
                id: "cloudy_glasses",
                price: 30
            },
            {
                id: "torn_notebook",
                price: 55
            }
        ]
    },
    TEM_SHOP: {
        id: "tem_shop",
        name: "Tem Shop",
        description: "A shop run by a Temmie in Temmie Village.",
        shopkeeper: "Temmie",
        dialogue: {
            welcome: "hOI! welcom to... da TEM SHOP!!!",
            goodbye: "bOI!",
            purchase: "WOA!! u pay!! thas ALOT o muns... but tem pay for colleg!!",
            lowFunds: "oh... u don have enuff muns..."
        },
        items: [
            {
                id: "temmie_flakes",
                price: 3
            },
            {
                id: "tough_glove",
                price: 50
            },
            {
                id: "cloudy_glasses",
                price: 35
            }
        ]
    },
    HOT_DOG_STAND: {
        id: "hot_dog_stand",
        name: "Hot Dog Stand",
        description: "A hot dog stand run by Sans.",
        shopkeeper: "Sans",
        dialogue: {
            welcome: "hey buddy, what's up? wanna buy a hot dog? it's only 30g.",
            goodbye: "see ya around, buddy.",
            purchase: "thanks, buddy. here's your 'dog. yeah, 'dog. apostrophe-dog. it's short for hot-dog.",
            lowFunds: "sorry, can't give credit. come back when you're a little... mmm... richer."
        },
        items: [
            {
                id: "hot_dog",
                price: 30
            }
        ]
    },
    SPIDER_BAKE_SALE_HOTLAND: {
        id: "spider_bake_sale_hotland",
        name: "Spider Bake Sale (Hotland)",
        description: "A more elaborate spider bake sale in Hotland.",
        shopkeeper: "Muffet",
        dialogue: {
            welcome: "Welcome to our parlor, dearie~ Interested in some spider pastries?",
            goodbye: "Come back any time, dearie~ Ahuhuhu~",
            purchase: "Thank you, dearie~ All proceeds go to real spiders!",
            lowFunds: "You don't have enough money, dearie~ Come back when you're a little richer~ Ahuhuhu~"
        },
        items: [
            {
                id: "spider_donut",
                price: 9999
            },
            {
                id: "spider_cider",
                price: 9999
            }
        ]
    },
    BRATTY_CATTY_SHOP: {
        id: "bratty_catty_shop",
        name: "Bratty and Catty's Shop",
        description: "A shop run by two monsters selling items they found in the garbage dump.",
        shopkeeper: "Bratty and Catty",
        dialogue: {
            welcome: "Like, welcome to our shop!",
            goodbye: "Like, see you later!",
            purchase: "Like, thanks for your purchase!",
            lowFunds: "That's, like, not enough money."
        },
        items: [
            {
                id: "empty_gun",
                price: 350
            },
            {
                id: "cowboy_hat",
                price: 350
            },
            {
                id: "glamburger",
                price: 120
            },
            {
                id: "legendary_hero",
                price: 300
            }
        ]
    }
};

// Export for use in main data file
window.UNDERTALE_SHOPS = SHOPS;