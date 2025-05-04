/**
 * UNDERTALE Text Adventure Game - Characters Data
 * Contains all character information, stats, and dialogue
 */

const CHARACTERS = {
    FLOWEY: {
        id: "flowey",
        name: "Flowey",
        description: "A small, talking golden flower with a friendly smile.",
        image: "img/characters/flowey.png",
        battleImage: "img/battles/flowey.png",
        stats: {
            hp: 200,
            atk: 10,
            def: 0
        },
        genocide: true,
        neutral: true,
        pacifist: true,
        acts: ["Check", "Talk"],
        dialogue: {
            intro: "Howdy! I'm FLOWEY. FLOWEY the FLOWER! Hmm... You're new to the UNDERGROUND, aren'tcha? Golly, you must be so confused. Someone ought to teach you how things work around here! I guess little old me will have to do. Ready? Here we go!",
            check: "FLOWEY - ATK 10 DEF 0\n* Just a regular flower... or is he?",
            talk: "You try to talk to Flowey, but he just grins wickedly.",
            pellets: "See these little white... 'friendliness pellets?' Are you ready? Move around! Get as many as you can!",
            betrayal: "You IDIOT. In this world, it's KILL or BE killed. Why would ANYONE pass up an opportunity like this!?",
            rescue: "What a terrible creature, torturing such a poor, innocent youth..."
        }
    },
    TORIEL: {
        id: "toriel",
        name: "Toriel",
        description: "A motherly goat monster who saved you from Flowey.",
        image: "img/characters/toriel.png",
        battleImage: "img/battles/toriel.png",
        stats: {
            hp: 440,
            atk: 8,
            def: 1
        },
        genocide: true,
        neutral: true,
        pacifist: true,
        acts: ["Check", "Talk", "Plead", "Compliment"],
        dialogue: {
            intro: "Do not be afraid, my child. I am TORIEL, caretaker of the RUINS. I pass through this place every day to see if anyone has fallen down. You are the first human to come here in a long time.",
            check: "TORIEL - ATK 8 DEF 1\n* Knows what's best for you.",
            talk: "You try to think of something to say, but can't.",
            plead: "You plead with Toriel to let you pass. She looks away sadly.",
            compliment: "You tell Toriel she's doing a great job. She doesn't respond.",
            goodbye: "You are stronger than I thought... Listen to me, small one... If you go beyond this door, keep walking as far as you can. Eventually, you will reach an exit. ...ASGORE... Do not let ASGORE take your soul. His plan cannot be allowed to succeed. ......Be good, won't you? My child."
        }
    },
    NAPSTABLOOK: {
        id: "napstablook",
        name: "Napstablook",
        description: "A shy ghost monster who likes to cry.",
        image: "img/characters/napstablook.png",
        battleImage: "img/battles/napstablook.png",
        stats: {
            hp: 88,
            atk: 5,
            def: 4
        },
        genocide: false,
        neutral: true,
        pacifist: true,
        acts: ["Check", "Cheer", "Flirt", "Threaten"],
        dialogue: {
            intro: "oh... i'm REALLY not feeling up to it right now, sorry...",
            check: "NAPSTABLOOK - ATK 5 DEF 4\n* This monster doesn't seem to have a sense of humor...",
            cheer: "heh... thanks... i guess",
            flirt: "i'd just weigh you down...",
            threaten: "sorry... i don't really care...",
            spared: "let me try... ... ... i call it 'dapper blook'. do you like it..."
        }
    },
    SANS: {
        id: "sans",
        name: "Sans",
        description: "A lazy skeleton who loves bad puns.",
        image: "img/characters/sans.png",
        battleImage: "img/battles/sans.png",
        stats: {
            hp: 1,
            atk: 1,
            def: 1
        },
        genocide: true,
        neutral: true,
        pacifist: true,
        acts: ["Check", "Talk", "Joke"],
        dialogue: {
            intro: "heya. i'm sans. sans the skeleton.",
            check: "SANS - ATK 1 DEF 1\n* The easiest enemy. Can only deal 1 damage.",
            talk: "what? haven't you seen a guy with two jobs before?",
            joke: "i've heard better.",
            genocide: "if you keep going the way you are now... you're gonna have a bad time."
        }
    },
    PAPYRUS: {
        id: "papyrus",
        name: "Papyrus",
        description: "An enthusiastic skeleton who wants to capture a human.",
        image: "img/characters/papyrus.png",
        battleImage: "img/battles/papyrus.png",
        stats: {
            hp: 680,
            atk: 8,
            def: 2
        },
        genocide: true,
        neutral: true,
        pacifist: true,
        acts: ["Check", "Flirt", "Insult"],
        dialogue: {
            intro: "HALT, HUMAN! I, THE GREAT PAPYRUS, HAVE SOME THINGS TO SAY! FIRST: YOU'RE A FREAKING WEIRDO! NOT ONLY DO YOU NOT LIKE PUZZLES, BUT THE WAY YOU SHAMBLE ABOUT FROM PLACE TO PLACE... THE WAY YOUR HANDS ARE ALWAYS COVERED IN DUSTY POWDER. IT FEELS... LIKE YOUR LIFE IS GOING DOWN A DANGEROUS PATH. HOWEVER! I, PAPYRUS, SEE GREAT POTENTIAL WITHIN YOU!",
            check: "PAPYRUS - ATK 8 DEF 2\n* He likes to say 'Nyeh heh heh!'",
            flirt: "WHAT?! FL-FLIRTING?! SO YOU FINALLY REVEAL YOUR ULTIMATE FEELINGS! W-WELL! I'M A SKELETON WITH VERY HIGH STANDARDS!!!",
            insult: "GASP! SUCH HOSTILITY! ARE YOU TRYING TO INSULT ME TO HIDE YOUR TRUE FEELINGS? OH NO! MY DATING HANDBOOK WARNS ME OF THIS!",
            spare: "NYOO HOO HOO... I CAN'T EVEN STOP SOMEONE AS WEAK AS YOU... UNDYNE'S GOING TO BE DISAPPOINTED IN ME."
        }
    },
    UNDYNE: {
        id: "undyne",
        name: "Undyne",
        description: "The passionate head of the Royal Guard.",
        image: "img/characters/undyne.png",
        battleImage: "img/battles/undyne.png",
        stats: {
            hp: 1500,
            atk: 7,
            def: 0
        },
        genocide: true,
        neutral: true,
        pacifist: true,
        acts: ["Check", "Challenge", "Plead"],
        dialogue: {
            intro: "Seven. Seven human souls, and King ASGORE will become a god. Six. That's how many we have collected thus far. Understand? Through your seventh and final soul, this world will be transformed. First, however, as is customary for those who make it this far... I shall tell you the tragic tale of our people.",
            check: "UNDYNE - ATK 7 DEF 0\n* The heroine that NEVER gives up.",
            challenge: "You tell Undyne her attacks are too easy. The next turn will be harder.",
            plead: "You plead for mercy. Undyne doesn't care.",
            undying: "You're gonna have to try a little harder than THAT!"
        }
    },
    ALPHYS: {
        id: "alphys",
        name: "Alphys",
        description: "The Royal Scientist with a passion for human anime.",
        image: "img/characters/alphys.png",
        stats: {
            hp: 500,
            atk: 0,
            def: 20
        },
        genocide: false,
        neutral: true,
        pacifist: true,
        dialogue: {
            intro: "Oh. My god. I didn't expect you to show up so soon! I haven't showered, I'm barely dressed, it's all messy, and... Umm... H-h-hiya! I'm Dr. Alphys. I'm ASGORE's royal scientist! B-b-but, ahhhh, I'm not one of the 'bad guys'!",
            quiz: "Oh no! This wasn't supposed to happen! I'm supposed to help guide you through Hotland, but now Mettaton has other plans!",
            confession: "I've been lying to you about everything. Those monsters... I've been experimenting with determination, trying to find a way to break the barrier. But something went wrong.",
        }
    },
    METTATON: {
        id: "mettaton",
        name: "Mettaton",
        description: "A robot TV star created by Alphys.",
        image: "img/characters/mettaton.png",
        battleImage: "img/battles/mettaton.png",
        stats: {
            hp: 30000,
            atk: 10,
            def: 999
        },
        genocide: false,
        neutral: true,
        pacifist: true,
        acts: ["Check", "Pose", "Scream", "Turn"],
        dialogue: {
            intro: "OHHHH YES! WELCOME, BEAUTIES, TO TODAY'S QUIZ SHOW!!!",
            check: "METTATON - ATK 10 DEF 999\n* His metal body still renders him invulnerable to attack.",
            pose: "OOH, DRAMATIC! THE AUDIENCE IS LOVING IT!",
            scream: "THAT'S THE SPIRIT, DARLING! THE AUDIENCE IS ROOTING FOR YOUR DESTRUCTION!",
            turn: "OH MY! WHAT A STUNNING TRANSFORMATION!",
            ex: "Darling, I've been wanting to show this form off for a long time. So, as thanks, I'll make your last moments... ABSOLUTELY beautiful!"
        }
    },
    ASGORE: {
        id: "asgore",
        name: "Asgore Dreemurr",
        description: "The king of monsters who wields a red trident.",
        image: "img/characters/asgore.png",
        battleImage: "img/battles/asgore.png",
        stats: {
            hp: 3500,
            atk: 10,
            def: 10
        },
        genocide: false,
        neutral: true,
        pacifist: true,
        acts: ["Check", "Talk"],
        dialogue: {
            intro: "Human... It was nice to meet you. Goodbye.",
            check: "ASGORE - ATK 10 DEF 10\n* His dropped weapon indicates surrender.",
            talk: "You tell ASGORE you don't want to fight him. He nods sadly.",
            mercy: "... I remember the day after my son died. The entire underground was devoid of hope. In a fit of anger, I declared war. I said I would destroy any human that came here. But now... I've changed my mind. I don't want power. I don't want to hurt anyone."
        }
    },
    ASRIEL: {
        id: "asriel",
        name: "Asriel Dreemurr",
        description: "The son of Asgore and Toriel, once thought lost.",
        image: "img/characters/asriel.png",
        battleImage: "img/battles/asriel.png",
        stats: {
            hp: 9999,
            atk: 999,
            def: 999
        },
        genocide: false,
        neutral: false,
        pacifist: true,
        acts: ["Check", "Hope", "Dream", "Struggle"],
        dialogue: {
            intro: "Finally. I was so tired of being a flower. Howdy! It's me, ASRIEL DREEMURR.",
            check: "ASRIEL - ATK ∞ DEF ∞\n* The absolute GOD of Hyperdeath!",
            hope: "You feel your friends' souls resonating within ASRIEL!",
            dream: "You can feel everyone's hearts beating as one!",
            struggle: "You struggle... Nothing happened.",
            final: "I'm sorry. I always was a crybaby, wasn't I? ... I know. You're not actually [name]. Are you? [name]'s been gone for a long time. ... What... What IS your name? ... [player]? That's... That's a nice name."
        }
    }
};

// Export for use in main data file
window.UNDERTALE_CHARACTERS = CHARACTERS;