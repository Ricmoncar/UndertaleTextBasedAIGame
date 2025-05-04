/**
 * UNDERTALE Text Adventure Game - Events Data
 * Contains all game events, cutscenes, and dialogue sequences
 */

const EVENTS = {
    // Ruins Events
    FLOWEY_INTRO: {
        id: "flowey_intro",
        type: "cutscene",
        character: "flowey",
        dialogue: [
            "Howdy!",
            "I'm FLOWEY.",
            "FLOWEY the FLOWER!",
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
        canFlee: false,
        canFight: true,
        canSpare: false,
        outcome: {
            win: "toriel_rescue",
            lose: "game_over_flowey",
            spare: null
        }
    },
    TORIEL_RESCUE: {
        id: "toriel_rescue",
        type: "cutscene",
        character: "toriel",
        dialogue: [
            "What a terrible creature, torturing such a poor, innocent youth...",
            "Ah, do not be afraid, my child.",
            "I am TORIEL, caretaker of the RUINS.",
            "I pass through this place every day to see if anyone has fallen down.",
            "You are the first human to come here in a long time.",
            "Come! I will guide you through the catacombs.",
            "This way."
        ],
        next: null
    },
    TORIEL_WELCOME_HOME: {
        id: "toriel_welcome_home",
        type: "cutscene",
        character: "toriel",
        dialogue: [
            "Welcome to your new home, innocent one.",
            "Allow me to educate you in the operation of the RUINS.",
            "The RUINS are full of puzzles, ancient fusions between diversions and doorkeys.",
            "One must solve them to move from room to room.",
            "Please adjust yourself to the sight of them."
        ],
        next: null
    },
    TORIEL_INDEPENDENCE_TEST: {
        id: "toriel_independence_test",
        type: "cutscene",
        character: "toriel",
        dialogue: [
            "You have done excellently thus far, my child.",
            "However... I have a difficult request to ask of you.",
            "I would like you to walk to the end of the room by yourself.",
            "Forgive me for this."
        ],
        next: null
    },
    TORIEL_REVEALS: {
        id: "toriel_reveals",
        type: "cutscene",
        character: "toriel",
        dialogue: [
            "Greetings, my child. Do not worry, I did not leave you.",
            "I was merely behind this pillar the whole time.",
            "Thank you for trusting me.",
            "However, there was an important reason for this exercise.",
            "...to test your independence.",
            "I must attend to some business, and you must stay alone for a while.",
            "Please remain here. It's dangerous to explore by yourself.",
            "I have an idea. I will give you a CELL PHONE.",
            "If you have a need for anything, just call.",
            "Be good, alright?"
        ],
        next: null,
        giveItem: "cell_phone"
    },
    NAPSTABLOOK_ENCOUNTER: {
        id: "napstablook_encounter",
        type: "battle",
        enemy: "napstablook",
        canFlee: true,
        canFight: true,
        canSpare: true,
        outcome: {
            win: null,
            lose: "game_over_generic",
            spare: "napstablook_spared"
        }
    },
    NAPSTABLOOK_SPARED: {
        id: "napstablook_spared",
        type: "cutscene",
        character: "napstablook",
        dialogue: [
            "i usually come to the RUINS because there's nobody around...",
            "but today i met somebody nice...",
            "oh, i'm rambling again",
            "i'll get out of your way..."
        ],
        next: null
    },
    FROGGIT_ADVICE: {
        id: "froggit_advice",
        type: "dialogue",
        character: null,
        dialogue: [
            "A Froggit approaches you hesitantly.",
            "Ribbit, ribbit. (Excuse me, human.)",
            "Ribbit. (I have some advice for you about battling monsters.)",
            "Ribbit. (If you ACT a certain way or FIGHT until you almost defeat them...)",
            "Ribbit. (They might not want to battle you anymore.)",
            "Ribbit. (If a monster does not want to fight you, please...)",
            "Ribbit, ribbit. (Use some MERCY, human.)",
            "The Froggit hops away."
        ],
        next: null
    },
    TORIEL_CALLS: {
        id: "toriel_calls",
        type: "dialogue",
        character: "toriel",
        dialogue: [
            "Hello? This is TORIEL.",
            "You have not left the room, have you?",
            "There are a few puzzles ahead that I have yet to explain.",
            "It would be dangerous to try to solve them yourself.",
            "Be good, alright?"
        ],
        next: null
    },
    SLEEP_PIE: {
        id: "sleep_pie",
        type: "cutscene",
        character: null,
        dialogue: [
            "You lie down in the bed. It's very comfortable.",
            "...",
            "You wake up later. There's a piece of butterscotch-cinnamon pie on the floor."
        ],
        next: null,
        giveItem: "butterscotch_pie"
    },
    READ_DIARY: {
        id: "read_diary",
        type: "dialogue",
        character: null,
        dialogue: [
            "You see a diary on the desk. One passage is circled:",
            "Why did the skeleton want a friend?",
            "Because he was feeling BONELY...",
            "The rest of the page is filled with jokes of a similar caliber."
        ],
        next: null
    },
    TORIEL_STOPS_YOU: {
        id: "toriel_stops_you",
        type: "cutscene",
        character: "toriel",
        dialogue: [
            "I... I don't think you should be down here.",
            "Please, go back upstairs."
        ],
        next: null
    },
    TORIEL_WARNS: {
        id: "toriel_warns",
        type: "cutscene",
        character: "toriel",
        dialogue: [
            "You wish to know how to return 'home,' do you not?",
            "Ahead of us lies the end of the RUINS.",
            "A one-way exit to the rest of the underground.",
            "I am going to destroy it.",
            "No one will ever be able to leave again.",
            "Now be a good child and go upstairs."
        ],
        next: null
    },
    TORIEL_BOSS_FIGHT: {
        id: "toriel_boss_fight",
        type: "battle",
        enemy: "toriel",
        canFlee: false,
        canFight: true,
        canSpare: true,
        outcome: {
            win: "toriel_defeated",
            lose: "game_over_generic",
            spare: "toriel_spared"
        }
    },
    TORIEL_DEFEATED: {
        id: "toriel_defeated",
        type: "cutscene",
        character: "toriel",
        dialogue: [
            "Y... you... really hate me that much?",
            "Now I see who I was protecting by keeping you here.",
            "Not you...",
            "But them!",
            "Ha... ha..."
        ],
        next: null,
        routeFlag: "neutral"
    },
    TORIEL_SPARED: {
        id: "toriel_spared",
        type: "cutscene",
        character: "toriel",
        dialogue: [
            "...",
            "I know you want to go home, but...",
            "But please... go upstairs now.",
            "I promise I will take good care of you here.",
            "I know we do not have much, but...",
            "We can have a good life here.",
            "Why are you making this so difficult?",
            "...",
            "Ha ha... Pathetic, is it not? I cannot save even a single child.",
            "No, I understand. You would just be unhappy trapped down here.",
            "The RUINS are very small once you get used to them.",
            "It would not be right for you to grow up in a place like this.",
            "My expectations... My loneliness... My fear...",
            "For you, my child... I will put them aside.",
            "If you truly wish to leave the RUINS... I will not stop you.",
            "However, when you leave... Please do not come back.",
            "I hope you understand.",
            "Goodbye, my child."
        ],
        next: null,
        routeFlag: "pacifist"
    },

    // Snowdin Events
    SANS_INTRODUCTION: {
        id: "sans_introduction",
        type: "cutscene",
        character: "sans",
        dialogue: [
            "...",
            "Human.",
            "Don't you know how to greet a new pal?",
            "Turn around and shake my hand."
        ],
        next: "sans_whoopee_cushion"
    },
    SANS_WHOOPEE_CUSHION: {
        id: "sans_whoopee_cushion",
        type: "dialogue",
        character: "sans",
        dialogue: [
            "*pbbbbbttttttt*",
            "heheh... the old whoopee cushion in the hand trick.",
            "it's ALWAYS funny.",
            "anyways, you're a human, right?",
            "that's hilarious.",
            "i'm sans. sans the skeleton.",
            "i'm actually supposed to be on watch for humans right now.",
            "but... y'know...",
            "i don't really care about capturing anybody.",
            "now my brother, papyrus...",
            "he's a human-hunting FANATIC.",
            "hey, actually, i think that's him over there.",
            "i have an idea. go through this gate thingy.",
            "yeah, go right through. my bro made the bars too wide to stop anyone."
        ],
        next: null
    },
    PAPYRUS_MAZE: {
        id: "papyrus_maze",
        type: "cutscene",
        character: "papyrus",
        dialogue: [
            "HUMAN!!! YOU SHALL NOT PASS THIS AREA!!!",
            "I, THE GREAT PAPYRUS, WILL STOP YOU!!!",
            "I WILL THEN CAPTURE YOU!!!",
            "YOU WILL BE DELIVERED TO THE CAPITAL!!!",
            "THEN... THEN!!!",
            "I'M NOT SURE WHAT'S NEXT.",
            "IN ANY CASE! CONTINUE... ONLY IF YOU DARE!!!"
        ],
        next: null
    },
    SANS_WORD_SEARCH: {
        id: "sans_word_search",
        type: "dialogue",
        character: "sans",
        dialogue: [
            "hey, thanks for trying my puzzle.",
            "my brother made his own puzzle. it's over there.",
            "i think it's supposed to be a... what was it? a 'junior jumble'?",
            "that's for baby bones.",
            "personally, i prefer the 'crossword'."
        ],
        next: null
    },
    PAPYRUS_PLATES: {
        id: "papyrus_plates",
        type: "cutscene",
        character: "papyrus",
        dialogue: [
            "HUMAN!!!",
            "BEHOLD! THE PUZZLE OF X'S AND O'S!",
            "EACH X WILL BECOME AN O WHEN YOU STEP ON IT!",
            "THEN, WHEN ALL X'S ARE O'S, YOU CAN PROCEED!",
            "HOWEVER! THERE IS A SECRET RULE!",
            "YOU CAN ONLY STEP ON EACH TILE ONCE!",
            "GOOD LUCK, HUMAN! NYEH HEH HEH!"
        ],
        next: null
    },
    PAPYRUS_GAUNTLET: {
        id: "papyrus_gauntlet",
        type: "cutscene",
        character: "papyrus",
        dialogue: [
            "HUMAN! THIS IS YOUR FINAL AND MOST DANGEROUS CHALLENGE!",
            "BEHOLD! THE GAUNTLET OF DEADLY TERROR!",
            "*various deadly weapons appear*",
            "WHEN I SAY THE WORD, IT WILL FULLY ACTIVATE!!!",
            "CANNONS WILL FIRE! SPIKES WILL SWING! BLADES WILL SLICE!",
            "EACH PART WILL SWING VIOLENTLY UP AND DOWN!",
            "ONLY THE TINIEST CHANCE OF VICTORY WILL REMAIN!!!",
            "ARE YOU READY?!",
            "BECAUSE!",
            "I!",
            "AM!",
            "ABOUT!",
            "TO DO IT!",
            "...",
            "...",
            "Well? What's the holdup?!",
            "HOLDUP!? WHAT HOLDUP!?",
            "I'M... I'M ABOUT TO ACTIVATE IT NOW!",
            "...",
            "...",
            "...",
            "That doesn't look very fun, actually.",
            "WHAT DO YOU MEAN? THIS PUZZLE IS VERY FUN!",
            "FOR YOU.",
            "WELL, UMM... WHAT DO YOU THINK, HUMAN?",
            "...",
            "THIS CHALLENGE! IT SEEMS... MAYBE... TOO EASY TO DEFEAT THE HUMAN WITH.",
            "YEAH! WE CAN'T USE THIS ONE!!! I AM A SKELETON WITH STANDARDS!",
            "MY PUZZLES ARE VERY FAIR! AND MY TRAPS ARE EXPERTLY COOKED!",
            "THIS METHOD IS TOO DIRECT! NO CLASS AT ALL!",
            "*the weapons retract*",
            "AWAY IT GOES!",
            "...",
            "WHAT ARE YOU LOOKING AT!? THIS WAS ANOTHER DECISIVE VICTORY FOR PAPYRUS!!",
            "NYEH! HEH! ...HEH???"
        ],
        next: null
    },
    INN_REST: {
        id: "inn_rest",
        type: "dialogue",
        character: null,
        dialogue: [
            "The innkeeper offers you a room for 80G.",
            "You decide to rest at the inn.",
            "...",
            "You wake up feeling refreshed!",
            "HP fully restored!"
        ],
        next: null,
        effect: {
            hp: "full"
        }
    },
    SANS_GRILLBYS: {
        id: "sans_grillbys",
        type: "dialogue",
        character: "sans",
        dialogue: [
            "hey, want to grab a bite to eat?",
            "i know a shortcut.",
            "...",
            "*you suddenly appear at Grillby's*",
            "fast shortcut, huh?",
            "everyone here knows me. grab a seat."
        ],
        next: null
    },
    READ_BOOKS: {
        id: "read_books",
        type: "dialogue",
        character: null,
        dialogue: [
            "You browse the bookshelves.",
            "One book discusses monster funerals.",
            "When monsters die, their bodies turn to dust. This dust is spread on their favorite thing in the world.",
            "Their essence lives on in that object.",
            "Another book explains monster biology.",
            "Monsters' bodies are mostly made of magic. When a monster gets old or sick, they 'fall down.' A monster that has 'fallen down' will soon turn to dust.",
            "You put the books back."
        ],
        next: null
    },
    PAPYRUS_DATE: {
        id: "papyrus_date",
        type: "cutscene",
        character: "papyrus",
        dialogue: [
            "SO YOU CAME TO VISIT ME! I, THE GREAT PAPYRUS, WELCOME YOU!",
            "WOULD YOU LIKE TO... HANG OUT?",
            "...",
            "WOWIE! I'LL HAVE TO PREPARE FOR OUR DATE!"
        ],
        next: "papyrus_house_tour",
        routeCondition: "pacifist"
    },
    PAPYRUS_HOUSE_TOUR: {
        id: "papyrus_house_tour",
        type: "dialogue",
        character: "papyrus",
        dialogue: [
            "WELCOME TO MY HOUSE! ENJOY THE TOUR!",
            "THIS IS MY BROTHER'S PET ROCK. HE ALWAYS FORGETS TO FEED IT.",
            "AS USUAL, I HAVE TO TAKE RESPONSIBILITY.",
            "THIS IS OUR COUCH! IT'S VERY COMFORTABLE!",
            "SOMETIMES I CATCH SANS SLEEPING ON IT!",
            "THIS IS THE KITCHEN! WHERE I, MASTER CHEF PAPYRUS, CREATE CULINARY MASTERPIECES!",
            "AND THIS... THIS IS MY ROOM! THE PLACE WHERE I SLEEP AND STORE MY BONES!"
        ],
        next: "papyrus_date_outcome",
        routeCondition: "pacifist"
    },
    PAPYRUS_DATE_OUTCOME: {
        id: "papyrus_date_outcome",
        type: "cutscene",
        character: "papyrus",
        dialogue: [
            "HUMAN! I, THE GREAT PAPYRUS, HAVE SOMETHING TO TELL YOU!",
            "I... I...",
            "NO, THIS IS ALL WRONG! I CAN'T BE YOUR FRIEND!",
            "YOU ARE NICE, HUMAN, BUT I DON'T LIKE YOU THE WAY YOU LIKE ME.",
            "I'M SORRY! I JUST MEANT TO GO ON A FRIENDLY DATE!",
            "WORRY NOT! YOU WILL FIND SOMEONE AS GREAT AS ME ONE DAY!",
            "JUST NOT QUITE AS GREAT, OBVIOUSLY!",
            "NYEH HEH HEH!"
        ],
        next: null,
        routeCondition: "pacifist"
    },
    PAPYRUS_BATTLE: {
        id: "papyrus_battle",
        type: "battle",
        enemy: "papyrus",
        canFlee: false,
        canFight: true,
        canSpare: true,
        outcome: {
            win: "papyrus_killed",
            lose: "papyrus_capture",
            spare: "papyrus_befriended"
        }
    },
    PAPYRUS_KILLED: {
        id: "papyrus_killed",
        type: "cutscene",
        character: "papyrus",
        dialogue: [
            "W-WELL, THAT'S NOT WHAT I EXPECTED...",
            "BUT... ST... STILL! I BELIEVE IN YOU!",
            "YOU CAN DO A LITTLE BETTER! EVEN IF YOU DON'T THINK SO!",
            "I... I PROMISE..."
        ],
        next: null,
        routeFlag: "neutral"
    },
    PAPYRUS_CAPTURE: {
        id: "papyrus_capture",
        type: "cutscene",
        character: "papyrus",
        dialogue: [
            "NYEH HEH HEH! THE GREAT PAPYRUS HAS CAPTURED YOU!",
            "YOU HAVE BEEN THOROUGHLY JAPED!",
            "I SHALL NOW SEND YOU TO THE CAPTURE ZONE... MY SHED!",
            "...",
            "*you find yourself in Papyrus's shed*",
            "*there's food and a bed*",
            "*the bars are wide enough to just walk through*"
        ],
        next: null
    },
    PAPYRUS_BEFRIENDED: {
        id: "papyrus_befriended",
        type: "cutscene",
        character: "papyrus",
        dialogue: [
            "NYOO HOO HOO...",
            "I CAN'T EVEN STOP SOMEONE AS WEAK AS YOU...",
            "UNDYNE'S GOING TO BE DISAPPOINTED IN ME.",
            "I'LL NEVER JOIN THE ROYAL GUARD... AND...",
            "...",
            "WAIT! YOU'RE NOT GOING TO DESTROY ME?",
            "THEN... THAT MEANS...",
            "I CAN MAKE IT UP TO UNDYNE!",
            "I'LL BEFRIEND YOU INSTEAD!",
            "WOWIE!! WE HAVEN'T EVEN HAD OUR FIRST DATE...",
            "AND I'VE ALREADY MANAGED TO HIT THE FRIEND ZONE!!!"
        ],
        next: null,
        routeFlag: "pacifist"
    },
    DOGGO_ENCOUNTER: {
        id: "doggo_encounter",
        type: "battle",
        enemy: "doggo",
        canFlee: true,
        canFight: true,
        canSpare: true,
        outcome: {
            win: null,
            lose: "game_over_generic",
            spare: null
        }
    },

    // Waterfall Events
    SANS_WATERFALL: {
        id: "sans_waterfall",
        type: "dialogue",
        character: "sans",
        dialogue: [
            "hey buddy, what's up?",
            "wanna buy a hot dog? it's only 30G.",
            "nah, i'm just kidding. i don't have any hot dogs right now.",
            "i'm actually supposed to be on watch for humans right now.",
            "but, y'know... i don't really care about capturing anybody.",
            "undyne, though... she's the head of the royal guard.",
            "if she comes through here, you'll be in for a bad time.",
            "anyway, stay safe out there, kid."
        ],
        next: null
    },
    UNDYNE_FIRST_APPEARANCE: {
        id: "undyne_first_appearance",
        type: "cutscene",
        character: null,
        dialogue: [
            "You hear the clanking of metal armor from above.",
            "You crouch in the tall grass, trying to stay hidden.",
            "Through the shadows, you can see Papyrus talking to an armored figure.",
            "PAPYRUS: H-HI, UNDYNE! I'M HERE WITH MY DAILY REPORT...",
            "UNDYNE: ...",
            "PAPYRUS: REGARDING THAT HUMAN I CALLED YOU ABOUT EARLIER...",
            "UNDYNE: ...",
            "PAPYRUS: DID I FIGHT THEM? Y-YES! OF COURSE I DID! I FOUGHT THEM VALIANTLY!",
            "UNDYNE: ...",
            "PAPYRUS: WHAT? DID I CAPTURE THEM? W-W-WELL... NO.",
            "UNDYNE: ...",
            "PAPYRUS: I TRIED VERY HARD, UNDYNE, BUT IN THE END... I FAILED.",
            "UNDYNE: ...",
            "PAPYRUS: W-WHAT? YOU'RE GOING TO TAKE THE HUMAN'S SOUL YOURSELF?",
            "UNDYNE: ...",
            "PAPYRUS: BUT UNDYNE, YOU DON'T H-HAVE TO DESTROY THEM! YOU SEE... YOU SEE...",
            "UNDYNE: ...",
            "PAPYRUS: ...I UNDERSTAND. I'LL HELP YOU IN ANY WAY I CAN.",
            "Papyrus leaves. Undyne stands at the ledge, scanning the area below.",
            "You try to stay perfectly still in the grass.",
            "A glowing blue spear materializes in her hand.",
            "She suddenly jerks her head in your direction.",
            "...",
            "After a tense moment, she backs away and disappears into the shadows.",
            "You exhale, not realizing you had been holding your breath."
        ],
        next: null
    },
    HEAR_WISHES: {
        id: "hear_wishes",
        type: "dialogue",
        character: null,
        dialogue: [
            "You walk among the echo flowers. As you pass, they whisper conversations from long ago.",
            "'I wish I could see the real stars someday...'",
            "'I wish my sister would come back from the war...'",
            "'I wish I wasn't so alone down here...'",
            "The last echo flower is silent."
        ],
        next: null
    },
    READ_HISTORY: {
        id: "read_history",
        type: "dialogue",
        character: null,
        dialogue: [
            "Ancient writing covers the walls. You try to read it.",
            "'The War of Humans and Monsters.'",
            "'After a long battle, the humans were victorious. They sealed the monsters underground with a magic spell.'",
            "'This barrier can only be broken by the power of seven human souls.'",
            "'There is one way to reverse this spell... If a huge power, equivalent to seven human souls, attacks the barrier... It will be destroyed.'",
            "'But this cursed place has no entrances or exits. There is no way a human could come here. We will remain trapped forever.'"
        ],
        next: null
    },
    MONSTER_KID_UMBRELLA: {
        id: "monster_kid_umbrella",
        type: "dialogue",
        character: null,
        dialogue: [
            "As you walk through the rain, a small monster child runs up to you.",
            "YO! You got an umbrella? Awesome!",
            "The monster kid joins you under your umbrella.",
            "Man, Undyne is sooooooo cool. She beats up bad guys and NEVER loses.",
            "If I was a human, I would wet the bed every night knowing she was gonna beat me up! Ha ha.",
            "You continue walking in silence."
        ],
        next: null,
        routeCondition: {
            has: "umbrella"
        }
    },
    CASTLE_VIEW: {
        id: "castle_view",
        type: "dialogue",
        character: null,
        dialogue: [
            "You reach a high point that overlooks the vast cavern.",
            "The silhouette of a massive castle looms in the distance.",
            "The monster kid stares in awe beside you.",
            "That's where the king lives, right? The king of all monsters... What's his name? Fluffybuns?",
            "My parents told me that's where we're all going to go free someday."
        ],
        next: null
    },
    MONSTER_KID_HELPS: {
        id: "monster_kid_helps",
        type: "dialogue",
        character: null,
        dialogue: [
            "The cliff is too steep to climb.",
            "The monster kid looks at the ledge, then at you.",
            "Yo, you wanna see Undyne, right? Climb on my shoulders!",
            "...",
            "You carefully climb on the monster kid's shoulders and reach the ledge.",
            "Yo, be careful up there!",
            "The monster kid runs off, tripping as usual."
        ],
        next: null
    },
    UNDYNE_BRIDGE_ENCOUNTER: {
        id: "undyne_bridge_encounter",
        type: "cutscene",
        character: null,
        dialogue: [
            "You start crossing the wooden bridge.",
            "Suddenly, you hear footsteps behind you.",
            "The monster kid appears, looking nervous.",
            "Yo! I... I need to tell you something.",
            "Undyne told me I should stay away from you. She said you... you hurt people.",
            "But, yo, that's not true, right?",
            "...",
            "Yo... why aren't you answering me?",
            "What's with that weird expression...?",
            "Oh man... Yo, y-you'd b-better not come any closer!",
            "...",
            "The monster kid backs away, then suddenly shouts.",
            "Yo! If... if you want to hurt anyone else... you're gonna have to get through me, first!"
        ],
        next: "monster_kid_decision",
        routeCondition: "genocide"
    },
    MONSTER_KID_DECISION: {
        id: "monster_kid_decision",
        type: "choice",
        choices: [
            {
                text: "Attack",
                outcome: "monster_kid_attack"
            },
            {
                text: "Spare",
                outcome: "monster_kid_spared"
            }
        ]
    },
    MONSTER_KID_ATTACK: {
        id: "monster_kid_attack",
        type: "cutscene",
        character: null,
        dialogue: [
            "You step forward, raising your weapon.",
            "The monster kid trembles but holds their ground.",
            "Just as you swing...",
            "A blur of blue and red flashes before you.",
            "Undyne stands between you and the monster kid, taking the full force of your attack.",
            "She staggers, a deep gash across her armor.",
            "Undyne: Papyrus... Alphys... ASGORE... Just like that, I...",
            "Undyne: I've failed you.",
            "...",
            "Her body begins to tremble, then steady.",
            "Undyne: No...",
            "Her face contorts with determination.",
            "Undyne: My body... It feels like it's splitting apart.",
            "Undyne: Like any instant... I'll scatter into a million pieces.",
            "Undyne: But... Deep, deep in my soul. There's a burning feeling I can't describe.",
            "Undyne: A burning feeling that WON'T let me die.",
            "Her armor begins to glow with an intense white light.",
            "Undyne: This isn't just about monsters anymore, is it?",
            "Undyne: If you get past me, you'll... You'll destroy them all, won't you?",
            "Undyne: Monsters... Humans... Everyone...",
            "Undyne: Everyone's hopes. Everyone's dreams. Vanquished in an instant.",
            "The light grows blinding.",
            "Undyne: But I WON'T let you do that.",
            "Undyne: Right now, everyone in the world...",
            "Undyne: I can feel their hearts beating as one.",
            "Undyne: And we all have ONE goal.",
            "Undyne: To defeat YOU.",
            "Undyne: Human. No, WHATEVER you are.",
            "Undyne: For the sake of the whole world...",
            "The light fades, revealing a transformed Undyne in gleaming armor.",
            "Undyne: I, UNDYNE, will strike you down!",
            "Undyne the Undying blocks the way!"
        ],
        next: "undyne_undying_battle",
        routeFlag: "genocide"
    },
    UNDYNE_UNDYING_BATTLE: {
        id: "undyne_undying_battle",
        type: "battle",
        enemy: "undyne_undying",
        canFlee: false,
        canFight: true,
        canSpare: false,
        outcome: {
            win: "undyne_undying_defeated",
            lose: "game_over_genocide",
            spare: null
        }
    },
    UNDYNE_UNDYING_DEFEATED: {
        id: "undyne_undying_defeated",
        type: "cutscene",
        character: "undyne",
        dialogue: [
            "Damn it...",
            "So even THAT power... It wasn't enough...?",
            "Heh... Heheheh...",
            "If you... If you think I'm gonna give up hope, you're wrong.",
            "Cause I've... Got my friends behind me.",
            "Alphys told me that she would watch me fight you...",
            "And if anything went wrong, she would... evacuate everyone.",
            "By now she's called ASGORE and told him to absorb the 6 human SOULs.",
            "And with that power...",
            "This world will live on...!",
            "Her body begins to melt and dissolve into dust."
        ],
        next: null,
        routeFlag: "genocide"
    },
    MONSTER_KID_SPARED: {
        id: "monster_kid_spared",
        type: "dialogue",
        character: null,
        dialogue: [
            "You step back, lowering your weapon.",
            "The monster kid looks relieved.",
            "Y-you're sparing me? I knew you weren't so bad!",
            "The monster kid runs off, tripping as usual."
        ],
        next: null,
        routeFlag: "neutral"
    },
    UNDYNE_BATTLE: {
        id: "undyne_battle",
        type: "battle",
        enemy: "undyne",
        canFlee: false,
        canFight: true,
        canSpare: true,
        outcome: {
            win: "undyne_defeated",
            lose: "undyne_capture",
            spare: "undyne_spared"
        }
    },
    UNDYNE_DEFEATED: {
        id: "undyne_defeated",
        type: "cutscene",
        character: "undyne",
        dialogue: [
            "Damn it...",
            "So even with all our combined power...",
            "It still wasn't enough...?",
            "Heh... Heheheh...",
            "If you think... I'm gonna give up hope, you're wrong.",
            "Cause I've... Got my friends behind me.",
            "Undyne collapses into dust."
        ],
        next: null,
        routeFlag: "neutral"
    },
    UNDYNE_CAPTURE: {
        id: "undyne_capture",
        type: "cutscene",
        character: "undyne",
        dialogue: [
            "You've been defeated!",
            "Undyne stands over you triumphantly.",
            "Your soul is contained in a magical container.",
            "NGAHHH!!! YOU'LL NEVER ESCAPE ME, HUMAN!",
            "I'LL DELIVER YOU TO ASGORE MYSELF!",
            "...",
            "Through sheer DETERMINATION, you break free from the container.",
            "You find yourself back at the last save point."
        ],
        next: null,
        effect: {
            respawn: true
        }
    },
    UNDYNE_SPARED: {
        id: "undyne_spared",
        type: "dialogue",
        character: "undyne",
        dialogue: [
            "You spare Undyne, turning and running instead of fighting.",
            "She chases after you relentlessly.",
            "YOU WON'T GET AWAY FROM ME THIS TIME, HUMAN!",
            "You continue to flee, heading into the scorching heat of Hotland."
        ],
        next: null,
        routeFlag: "pacifist"
    },
    MAD_DUMMY_FIGHT: {
        id: "mad_dummy_fight",
        type: "battle",
        enemy: "mad_dummy",
        canFlee: false,
        canFight: true,
        canSpare: true,
        outcome: {
            win: "mad_dummy_defeated",
            lose: "game_over_generic",
            spare: "mad_dummy_spared"
        }
    },
    MAD_DUMMY_DEFEATED: {
        id: "mad_dummy_defeated",
        type: "dialogue",
        character: null,
        dialogue: [
            "The Mad Dummy's cotton spills out as it falls apart.",
            "Gh... Ghost... in a DUMMY! Ghost... in a DUMMY!",
            "The dummy collapses, lifeless."
        ],
        next: null,
        routeFlag: "neutral"
    },
    MAD_DUMMY_SPARED: {
        id: "mad_dummy_spared",
        type: "dialogue",
        character: null,
        dialogue: [
            "The Mad Dummy continues to rage, but suddenly...",
            "Acid rain begins to fall on it from above.",
            "Owww, owww, oww! What the heck is this!? Acid rain!?! Oh, FORGET IT! I'm outta here!",
            "The dummy floats away.",
            "...",
            "Napstablook appears.",
            "...sorry, i interrupted you, didn't i?",
            "as soon as i came over, your friend immediately left...",
            "oh no... you guys looked like you were having fun...",
            "oh no... i just wanted to say hi..."
        ],
        next: null
    },
    NAPSTABLOOK_HOUSE_VISIT: {
        id: "napstablook_house_visit",
        type: "dialogue",
        character: "napstablook",
        dialogue: [
            "oh... you're here... i wasn't expecting company...",
            "sorry, the place is a mess...",
            "would you like to listen to some music...?",
            "...",
            "after a battle of this is a no-touching environment, you feel like you understand the ghost better..."
        ],
        next: null,
        routeCondition: "pacifist"
    },
    ONION_SAN_CHAT: {
        id: "onion_san_chat",
        type: "dialogue",
        character: null,
        dialogue: [
            "As you walk by the water, a large tentacle emerges.",
            "Hey... there... Noticed you were... Here...",
            "A giant octopus-like monster rises from the water. It has a cartoonish, friendly face.",
            "I'm Onionsan! Onionsan, y'hear!",
            "You're visiting Waterfall, huh! It's great here, huh!",
            "You love it, huh!",
            "Yeah! Me too! It's my Big Favorite!",
            "Onionsan continues talking as you walk alongside the pool.",
            "Even though, the water's getting so shallow here...",
            "I, have to sit down all the time, but...",
            "He-hey! That's OK! It beats moving to the city!",
            "And living in a crowded aquarium! Like all my friends did!",
            "As you reach the end of the room, Onionsan sinks back into the water.",
            "You're gonna visit Waterfall again, aren'tcha!",
            "Yeah! You will! Onionsan is rooting for ya!"
        ],
        next: null
    },
    PIANO_HINT: {
        id: "piano_hint",
        type: "dialogue",
        character: null,
        dialogue: [
            "There's a sign next to the piano.",
            "\"A haunting song echoes down the corridor... Won't you play along?\"",
            "\"Only the first 8 are fine.\""
        ],
        next: null
    },
    TEMMIE_GREETING: {
        id: "temmie_greeting",
        type: "dialogue",
        character: null,
        dialogue: [
            "You enter a village filled with strange cat-like creatures.",
            "hOI! i'm tEMMIE!",
            "Another one bounces up.",
            "hOI! i'm tEMMIE!",
            "And another.",
            "hOI! i'm tEMMIE!",
            "A sign in the center reads: 'Welcome to... TEM VILLAGE!!!'",
            "You feel a strange combination of confusion and charm."
        ],
        next: null
    },
    ANNOYING_DOG_STEALS: {
        id: "annoying_dog_steals",
        type: "dialogue",
        character: null,
        dialogue: [
            "You see a legendary artifact sitting on a pedestal.",
            "You try to take the artifact...",
            "But your inventory is too full.",
            "...",
            "A small white dog appears and absorbs the artifact!",
            "The dog then bounds away with incredible speed."
        ],
        next: null,
        giveItem: "dog_residue"
    },
    MONSTER_KID_BRIDGE: {
        id: "monster_kid_bridge",
        type: "dialogue",
        character: null,
        dialogue: [
            "As you cross the extremely narrow bridge, you hear someone behind you.",
            "Yo!",
            "You turn to see the monster kid standing there.",
            "Yo, I... I need to tell you something.",
            "Man, I... I never thought I'd have to do this. But... Undyne told me to stay away from you.",
            "She said you... You hurt a lot of people.",
            "...",
            "But, yo, that's not true, right!?",
            "...",
            "Yo... Why won't you answer me?",
            "A-and what's with that weird expression?",
            "...",
            "Oh... Oh man...",
            "The monster kid backs away.",
            "Yo... Y-you'd better s-stop r-right where you are...",
            "Cause if you w-wanna hurt anyone else... you're... You're gonna have to get through me, first."
        ],
        next: "monster_kid_bridge_decision",
        routeCondition: "genocide"
    },

    // Hotland Events
    UNDYNE_COLLAPSES: {
        id: "undyne_collapses",
        type: "cutscene",
        character: "undyne",
        dialogue: [
            "You flee from Undyne, running into Hotland's scorching heat.",
            "Undyne pursues, her heavy armor clanking.",
            "STOP RUNNING AWAY, YOU COWARD!",
            "She's gaining on you, but slowing as the heat intensifies.",
            "Armor... so... hot...",
            "But I can't... give up...",
            "As you cross into Hotland proper, Undyne's steps become more labored.",
            "Finally, she collapses face-first onto the ground.",
            "You see a water cooler nearby."
        ],
        next: "undyne_water_decision"
    },
    UNDYNE_WATER_DECISION: {
        id: "undyne_water_decision",
        type: "choice",
        choices: [
            {
                text: "Give water",
                outcome: "undyne_helped"
            },
            {
                text: "Don't give water",
                outcome: "undyne_ignored"
            }
        ]
    },
    UNDYNE_HELPED: {
        id: "undyne_helped",
        type: "cutscene",
        character: "undyne",
        dialogue: [
            "You take a cup of water from the cooler and pour it on Undyne's face.",
            "The water evaporates from the heat of her armor. You pour another cup.",
            "Undyne slowly gets up, looking confused.",
            "She stares at you for a moment, then turns and walks away without a word.",
            "Something tells you this isn't the last you'll see of her."
        ],
        next: null,
        routeFlag: "pacifist"
    },
    UNDYNE_IGNORED: {
        id: "undyne_ignored",
        type: "dialogue",
        character: null,
        dialogue: [
            "You leave Undyne collapsed on the ground and continue on your way.",
            "As you walk away, you can hear her struggling to get up.",
            "..."
        ],
        next: null,
        routeFlag: "neutral"
    },
    ALPHYS_INTRODUCTION: {
        id: "alphys_introduction",
        type: "cutscene",
        character: "alphys",
        dialogue: [
            "Oh. My god.",
            "I didn't expect you to show up so soon!",
            "I haven't showered, I'm barely dressed, it's all messy, and...",
            "Umm...",
            "H-h-hiya! I'm Dr. Alphys. I'm ASGORE's royal scientist!",
            "B-b-but, ahhhh, I'm not one of the 'bad guys'!",
            "Actually, since you stepped out of the RUINS, I've, um...",
            "Been 'observing' your journey through my console.",
            "Your fights... Your friendships... Everything!",
            "I was originally going to stop you, but...",
            "Watching someone on a screen really makes you root for them.",
            "S-so, ahhh, now I want to help you!"
        ],
        next: "alphys_explanation"
    },
    ALPHYS_EXPLANATION: {
        id: "alphys_explanation",
        type: "dialogue",
        character: "alphys",
        dialogue: [
            "Using my knowledge, I can easily guide you through Hotland!",
            "I know a way right to ASGORE's castle, no problem!",
            "Well, actually, umm, there's just a tiny issue.",
            "A long time ago, I made a robot named Mettaton.",
            "Originally, I built him to be an entertainment robot.",
            "Uh, you know, like a robotic TV star or something.",
            "Anyway, recently I decided to make him more useful.",
            "You know, just some small practical adjustments.",
            "Like, um...",
            "Anti... anti-human combat features?",
            "Of c-course, when I saw you coming, I immediately decided...",
            "I have to remove those features!",
            "Unfortunately, I may have made a teensy mistake while doing so.",
            "And, um...",
            "Now he's an unstoppable killing machine with a thirst for human blood?",
            "Ehehehehe..."
        ],
        next: "mettaton_intro"
    },
    METTATON_INTRO: {
        id: "mettaton_intro",
        type: "cutscene",
        character: null,
        dialogue: [
            "The lights suddenly go out.",
            "Alphys: Oh no.",
            "A metallic voice echoes through the lab.",
            "OHHHH YES! WELCOME, BEAUTIES...",
            "A spotlight illuminates a rectangular robot on a stage that wasn't there before.",
            "TO TODAY'S QUIZ SHOW!!!"
        ],
        next: "mettaton_quiz"
    },
    METTATON_QUIZ: {
        id: "mettaton_quiz",
        type: "cutscene",
        character: "mettaton",
        dialogue: [
            "OH BOY! I CAN ALREADY TELL IT'S GONNA BE A GREAT SHOW!",
            "EVERYONE GIVE A BIG HAND FOR OUR WONDERFUL CONTESTANT!",
            "*canned applause sounds*",
            "NEVER PLAYED BEFORE, GORGEOUS?",
            "NO PROBLEM! IT'S SIMPLE!",
            "THERE'S ONLY ONE RULE.",
            "ANSWER CORRECTLY...",
            "OR YOU DIE!!!"
        ],
        next: "mettaton_quiz_game"
    },
    METTATON_QUIZ_GAME: {
        id: "mettaton_quiz_game",
        type: "minigame",
        minigame: "quiz",
        outcomes: {
            win: "mettaton_quiz_end",
            lose: "game_over_quiz"
        }
    },
    METTATON_QUIZ_END: {
        id: "mettaton_quiz_end",
        type: "cutscene",
        character: "mettaton",
        dialogue: [
            "WELL WELL WELL. WITH DR. ALPHYS HELPING YOU...",
            "THE SHOW HAS NO DRAMATIC TENSION!",
            "WE CAN'T GO ON LIKE THIS!!",
            "BUT. BUT!!! THIS WAS JUST THE PILOT EPISODE!!",
            "NEXT UP, MORE DRAMA! MORE ROMANCE! MORE BLOODSHED!",
            "UNTIL NEXT TIME, DARLINGS...!",
            "*Mettaton's wheel retracts and he rockets away through the ceiling*"
        ],
        next: "alphys_apologizes"
    },
    ALPHYS_APOLOGIZES: {
        id: "alphys_apologizes",
        type: "dialogue",
        character: "alphys",
        dialogue: [
            "Well that was certainly something.",
            "That last question... he wasn't supposed to ask that one.",
            "Sorry about that...",
            "I'll help you through Hotland! I'm sure we'll see him again, though.",
            "I'll give you my phone number! Then... if you need help, I can...",
            "Wait, where'd you get that phone!? It's ANCIENT!",
            "It doesn't even have texting.",
            "W-wait a second, please!"
        ],
        next: "alphys_upgrades"
    },
    ALPHYS_UPGRADES: {
        id: "alphys_upgrades",
        type: "dialogue",
        character: "alphys",
        dialogue: [
            "Alphys takes your phone and disappears into another room.",
            "Various mechanical noises and explosions follow.",
            "She returns a few minutes later.",
            "Here, I upgraded it for you!",
            "It can do texting, items, it's got a key chain...",
            "I even signed you up for the underground's No. 1 social network!",
            "Now we're officially friends! Ehehe...",
            "I...I have to go to the bathroom!"
        ],
        next: null
    },
    SANS_HOTDOGS: {
        id: "sans_hotdogs",
        type: "dialogue",
        character: "sans",
        dialogue: [
            "hey buddy, what's up? wanna buy a hot dog?",
            "it's only 30G.",
            "thanks. here's your 'dog.",
            "yeah. 'dog. apostrophe-dog. it's short for hot-dog."
        ],
        next: null
    },
    METTATON_COOKING: {
        id: "mettaton_cooking",
        type: "cutscene",
        character: "mettaton",
        dialogue: [
            "OHHHH YES!",
            "WELCOME, BEAUTIES, TO THE UNDERGROUND'S PREMIER COOKING SHOW!",
            "PRE-HEAT YOUR OVENS, BECAUSE WE'VE GOT A VERY SPECIAL RECIPE FOR YOU TODAY!",
            "WE'RE GOING TO BE MAKING... A CAKE!",
            "MY LOVELY ASSISTANT HERE WILL GATHER THE INGREDIENTS.",
            "EVERYONE GIVE THEM A BIG HAND!",
            "*canned applause*",
            "WE'LL NEED SUGAR, MILK, AND EGGS.",
            "GO FOR IT, SWEETHEART!"
        ],
        next: "mettaton_cooking_game"
    },
    METTATON_COOKING_GAME: {
        id: "mettaton_cooking_game",
        type: "minigame",
        minigame: "cooking",
        outcomes: {
            win: "mettaton_cooking_end",
            lose: "game_over_cooking"
        }
    },
    METTATON_COOKING_END: {
        id: "mettaton_cooking_end",
        type: "cutscene",
        character: "mettaton",
        dialogue: [
            "MY MY MY...",
            "MAGNIFICENT! MARVELOUS! MAGNIFICENT!!!",
            "OH, AND BY THE WAY, OUR SHOW RUNS ON A STRICT SCHEDULE.",
            "IF YOU CAN'T GET THE CAKE FINISHED BEFORE THE END OF THE SHOW...",
            "WE'LL JUST HAVE TO GO WITH A BACKUP PLAN!",
            "WOULD YOU LOOK AT THAT! WE'RE OUT OF TIME!!",
            "BUT FORTUNATELY, I'VE ALREADY BAKED A CAKE AHEAD OF TIME!",
            "SO FORGET EVERYTHING YOU JUST DID.",
            "WE REALLY JUST NEEDED A GOOD SHOW.",
            "TOODLES!"
        ],
        next: null
    },
    ALPHYS_CALLS_PUZZLES: {
        id: "alphys_calls_puzzles",
        type: "dialogue",
        character: "alphys",
        dialogue: [
            "Your phone rings. It's Alphys.",
            "U-um... I noticed you're in the puzzle reactivation room...",
            "Don't worry! I'll guide you through it!",
            "I think you should hit the bottom-left switch first.",
            "No, wait, the right switch... I mean the top one!",
            "Um... that one?",
            "Um, uhhh...",
            "I'm sorry, I'm not very good at this..."
        ],
        next: null
    },
    SO_SORRY_ENCOUNTER: {
        id: "so_sorry_encounter",
        type: "battle",
        enemy: "so_sorry",
        canFlee: true,
        canFight: true,
        canSpare: true,
        outcome: {
            win: null,
            lose: "game_over_generic",
            spare: null
        }
    },
    MUFFET_BATTLE: {
        id: "muffet_battle",
        type: "battle",
        enemy: "muffet",
        canFlee: false,
        canFight: true,
        canSpare: true,
        outcome: {
            win: "muffet_defeated",
            lose: "game_over_generic",
            spare: "muffet_spared"
        }
    },
    MUFFET_DEFEATED: {
        id: "muffet_defeated",
        type: "dialogue",
        character: null,
        dialogue: [
            "You defeat Muffet.",
            "As she turns to dust, the other spiders scurry away in fear."
        ],
        next: null,
        routeFlag: "neutral"
    },
    MUFFET_SPARED: {
        id: "muffet_spared",
        type: "dialogue",
        character: null,
        dialogue: [
            "Muffet looks at you curiously.",
            "Huh? You're NOT going to attack me?",
            "Oh my, I was told a human in a striped shirt would come through here and be very dangerous.",
            "But you seem rather nice, dearie~",
            "I apologize for the misunderstanding~",
            "The person who told me about you... they had such a sweet smile~",
            "Ahuhuhu... too bad I never caught their name..."
        ],
        next: null,
        routeFlag: "pacifist"
    },
    METTATON_MUSICAL: {
        id: "mettaton_musical",
        type: "cutscene",
        character: "mettaton",
        dialogue: [
            "OH? THAT HUMAN...",
            "COULD IT BE...?",
            "ARE THEY FINALLY DRAWING NEAR?",
            "AH! THE HUMAN!",
            "*Mettaton emerges wearing a dress*",
            "OH MY LOVE, PLEASE RUN AWAY...",
            "MONSTER KING, FORBIDS YOUR STAY...",
            "HUMANS MUST, LIVE FAR APART...",
            "EVEN IF, IT BREAKS MY HEART...",
            "THEY'LL PUT YOU, IN THE DUNGEON...",
            "IT'LL SUCK, AND THEN YOU'LL DIE A LOT...",
            "REALLY SAD, YOU'RE GONNA DIE, CRY CRY CRY...",
            "SO SAD IT'S HAPPENING..."
        ],
        next: "mettaton_musical_trap"
    },
    METTATON_MUSICAL_TRAP: {
        id: "mettaton_musical_trap",
        type: "cutscene",
        character: "mettaton",
        dialogue: [
            "SO SAD. SO SAD THAT YOU ARE GOING TO THE DUNGEON.",
            "WELL, TOODLES!",
            "*A trapdoor opens beneath you*",
            "OH NO! WHATEVER SHALL I DO?",
            "MY LOVE HAS BEEN CAST AWAY INTO THE DUNGEON.",
            "A DUNGEON WITH A PUZZLE SO DASTARDLY, MY PARAMOUR WILL SURELY PERISH!",
            "O, HEAVENS HAVE MERCY! THE HORRIBLE COLORED TILE MAZE!"
        ],
        next: "mettaton_tile_maze"
    },
    METTATON_TILE_MAZE: {
        id: "mettaton_tile_maze",
        type: "minigame",
        minigame: "tile_maze",
        outcomes: {
            win: "mettaton_tile_maze_end",
            lose: "game_over_tile_maze"
        }
    },
    METTATON_TILE_MAZE_END: {
        id: "mettaton_tile_maze_end",
        type: "cutscene",
        character: "mettaton",
        dialogue: [
            "CONGRATULATIONS! YOU MADE IT THROUGH THE PUZZLE!",
            "BUT...!",
            "I DON'T REALLY CARE ABOUT THAT.",
            "AS A MATTER OF FACT, I WAS STALLING.",
            "BECAUSE WHILE YOU WERE BUSY DOING MY PUZZLE...",
            "DR. ALPHYS WAS BUSY REWRITING THE ENDING TO OUR ADVENTURE!",
            "AREN'T YOU EXCITED!? THE AUDIENCE IS GOING TO GO WILD!!!",
            "BOMBS AWAY!",
            "EXCEPT THAT BOMB ISN'T GOING TO GO OFF UNTIL YOU DEFEAT ME.",
            "HOW SUSPENSEFUL! HOW EXCITING!",
            "UNFORTUNATELY, OUR TIME IS ALREADY RUNNING OUT.",
            "UNTIL NEXT TIME, DARLING!",
            "*Mettaton flies away*"
        ],
        next: null
    },
    SANS_RESORT_MEETING: {
        id: "sans_resort_meeting",
        type: "dialogue",
        character: "sans",
        dialogue: [
            "hey. i heard you're going to the core.",
            "how about grabbing some dinner with me first?",
            "great. thanks for treating me.",
            "over here. i know a shortcut."
        ],
        next: "sans_dinner"
    },
    SANS_DINNER: {
        id: "sans_dinner",
        type: "cutscene",
        character: "sans",
        dialogue: [
            "well, here we are.",
            "so. your journey's almost over, huh?",
            "you must really wanna go home.",
            "hey. i know the feeling, buddo.",
            "though... maybe sometimes it's better to take what's given to you.",
            "down here you've already got food, drink, friends...",
            "is what you have to do... really worth it?",
            "ah, forget it. i'm rootin' for ya, kid.",
            "hey. let me tell you a story.",
            "so i'm a sentry in snowdin forest, right?",
            "i sit out there and watch for humans. it's kind of boring.",
            "fortunately, deep in the forest... there's this HUGE locked door.",
            "and it's perfect for practicing knock knock jokes.",
            "so one day, i'm knocking 'em out, like usual.",
            "i knock on the door and say 'knock knock.'",
            "and suddenly, from the other side...",
            "i hear a woman's voice.",
            "'who is there?'",
            "so, naturally, i respond: 'dishes.'",
            "'dishes who?'",
            "'dishes a very bad joke.'",
            "then she just howls with laughter.",
            "like it's the best joke she's heard in a hundred years.",
            "so i keep 'em coming, and she keeps laughing.",
            "she's the best audience i've ever had."
        ],
        next: "sans_dinner_part2"
    },
    SANS_DINNER_PART2: {
        id: "sans_dinner_part2",
        type: "cutscene",
        character: "sans",
        dialogue: [
            "then, after a dozen of 'em, SHE knocks and says...",
            "'knock knock!'",
            "i say 'who's there?'",
            "'old lady!'",
            "'old lady who?'",
            "'oh! i did not know you could yodel!'",
            "wow. needless to say, this woman was extremely good.",
            "we kept telling each other jokes for hours.",
            "eventually, i had to leave. papyrus gets kind of cranky without his bedtime story.",
            "but she told me to come by again, and so i did.",
            "then i did again. and again. it's a thing now.",
            "telling bad jokes through the door.",
            "it rules.",
            "...",
            "one day, though, i noticed she wasn't laughing very much.",
            "i asked her what was up.",
            "then she told me something strange.",
            "'if a human ever comes through this door...'",
            "'...could you please, please promise something?'",
            "'watch over them, and protect them, will you not?'"
        ],
        next: "sans_dinner_part3"
    },
    SANS_DINNER_PART3: {
        id: "sans_dinner_part3",
        type: "cutscene",
        character: "sans",
        dialogue: [
            "now, i hate making promises.",
            "and this woman, i don't even know her name.",
            "but...",
            "someone who sincerely likes bad jokes...",
            "has an integrity you can't say 'no' to.",
            "do you get what i'm saying?",
            "that promise i made to her...",
            "you know what would have happened if she hadn't said anything?",
            "...",
            "buddy.",
            "...",
            "You'd be dead where you stand.",
            "...",
            "hey, lighten up, bucko!",
            "i'm just joking with you.",
            "besides... haven't i done a great job protecting you?",
            "i mean, look at yourself.",
            "you haven't died a single time.",
            "hey, what's that look supposed to mean?",
            "am i wrong...?",
            "heh.",
            "well, that's all.",
            "take care of yourself, kid.",
            "'cause someone really cares about you."
        ],
        next: null
    },
    ALPHYS_CORE_GUIDANCE: {
        id: "alphys_core_guidance",
        type: "dialogue",
        character: "alphys",
        dialogue: [
            "Your phone rings. It's Alphys.",
            "Alphys: H-hi! It's me!",
            "Alphys: I'm just calling to tell you... be careful in the CORE!",
            "Alphys: I've been monitoring things, and... it looks like there are some mercenaries looking for humans.",
            "Alphys: They might, um, try to hurt you.",
            "Alphys: But don't worry! I installed some defenses in the CORE to help you!",
            "Alphys: I'll keep you updated if anything changes!",
            "Alphys: Good luck!"
        ],
        next: null
    },
    ALPHYS_CONFUSION: {
        id: "alphys_confusion",
        type: "dialogue",
        character: "alphys",
        dialogue: [
            "Your phone rings again.",
            "Alphys: Huh? That's strange.",
            "Alphys: This doesn't look like my map at all...",
            "Alphys: The layout seems to have been completely changed.",
            "Alphys: Someone must have rearranged the puzzles...",
            "Alphys: I'm sorry, but I don't think I can guide you after all.",
            "Alphys: W-wait, I'll try to hack into the system to fix this!",
            "Alphys: J-just be careful, okay?"
        ],
        next: null
    },
    MERCENARY_ENCOUNTER_1: {
        id: "mercenary_encounter_1",
        type: "battle",
        enemy: "royal_guards",
        canFlee: true,
        canFight: true,
        canSpare: true,
        outcome: {
            win: null,
            lose: "game_over_generic",
            spare: null
        }
    },
    MERCENARY_ENCOUNTER_2: {
        id: "mercenary_encounter_2",
        type: "battle",
        enemy: "madjick",
        canFlee: true,
        canFight: true,
        canSpare: true,
        outcome: {
            win: null,
            lose: "game_over_generic",
            spare: null
        }
    },
    KNIGHT_KNIGHT_ENCOUNTER: {
        id: "knight_knight_encounter",
        type: "battle",
        enemy: "knight_knight",
        canFlee: true,
        canFight: true,
        canSpare: true,
        outcome: {
            win: null,
            lose: "game_over_generic",
            spare: null
        }
    },
    MERCENARY_FINAL: {
        id: "mercenary_final",
        type: "battle",
        enemy: "final_froggit",
        canFlee: true,
        canFight: true,
        canSpare: true,
        outcome: {
            win: null,
            lose: "game_over_generic",
            spare: null
        }
    },
    METTATON_BATTLE: {
        id: "mettaton_battle",
        type: "cutscene",
        character: "mettaton",
        dialogue: [
            "OH YES. THERE YOU ARE, DARLING.",
            "IT'S TIME TO HAVE OUR LITTLE SHOWDOWN.",
            "IT'S TIME TO FINALLY STOP THE 'MALFUNCTIONING' ROBOT.",
            "...NOT!!!"
        ],
        next: "mettaton_reveal"
    },
    METTATON_REVEAL: {
        id: "mettaton_reveal",
        type: "cutscene",
        character: "mettaton",
        dialogue: [
            "MALFUNCTION? REPROGRAMMING? GET REAL.",
            "THIS WAS ALL JUST A BIG SHOW.",
            "AN ACT.",
            "ALPHYS HAS BEEN PLAYING YOU FOR A FOOL THE WHOLE TIME.",
            "AS SHE WATCHED YOU ON THE SCREEN, SHE GREW ATTACHED TO YOUR ADVENTURE.",
            "SHE DESPERATELY WANTED TO BE A PART OF IT.",
            "SO SHE DECIDED TO INSERT HERSELF INTO YOUR STORY.",
            "SHE REACTIVATED PUZZLES. SHE DISABLED ELEVATORS.",
            "SHE ENLISTED ME TO TORMENT YOU.",
            "ALL SO SHE COULD SAVE YOU FROM DANGERS THAT DIDN'T EXIST.",
            "ALL SO YOU WOULD THINK SHE'S THE GREAT PERSON...",
            "THAT SHE'S NOT."
        ],
        next: "alphys_interruption"
    },
    ALPHYS_INTERRUPTION: {
        id: "alphys_interruption",
        type: "dialogue",
        character: "alphys",
        dialogue: [
            "The lab door opens. Alphys enters.",
            "Alphys: W-what? That's not true!",
            "Mettaton: OH? AND NOW SHE'S GOING TO ACT LIKE THIS WAS ALL A SURPRISE TO HER.",
            "Mettaton: BUT IT WAS ALL HER IDEA.",
            "Alphys: H-hey! Stop! Y-you're scaring them!",
            "Mettaton: THE TRUTH IS, THIS WAS ALL PLANNED FROM THE BEGINNING.",
            "Mettaton: BUT I'VE HAD ENOUGH OF THIS CHARADE."
        ],
        next: "mettaton_true_form"
    },
    METTATON_TRUE_FORM: {
        id: "mettaton_true_form",
        type: "cutscene",
        character: "mettaton",
        dialogue: [
            "YOU MAY HAVE WONDERED WHY I HAVEN'T USED MY REAL POWER YET.",
            "IT'S BECAUSE THIS BODY... IS NOT ENTERTAINMENT-WORTHY!",
            "I'M ABOUT TO SHOW YOU MY TRUE FORM!",
            "*Mettaton's screen flashes and his body transforms*",
            "OHHHH YES!!!",
            "THIS! IS! METTATON EX!!!"
        ],
        next: "mettaton_ex_battle"
    },
    METTATON_EX_BATTLE: {
        id: "mettaton_ex_battle",
        type: "battle",
        enemy: "mettaton_ex",
        canFlee: false,
        canFight: true,
        canSpare: true,
        outcome: {
            win: "mettaton_defeated",
            lose: "game_over_generic",
            spare: "mettaton_ratings"
        }
    },
    METTATON_DEFEATED: {
        id: "mettaton_defeated",
        type: "cutscene",
        character: "mettaton",
        dialogue: [
            "GH... GUESS YOU DON'T WANT TO JOIN MY FAN CLUB...?",
            "*Mettaton's arms and legs fall off*",
            "Alphys: Oh my god! Mettaton!"
        ],
        next: "alphys_ending_neutral"
    },
    METTATON_RATINGS: {
        id: "mettaton_ratings",
        type: "cutscene",
        character: "mettaton",
        dialogue: [
            "OOH, LOOK AT THESE RATINGS!!!",
            "THIS IS THE MOST VIEWERS I'VE EVER HAD!!!",
            "WE'VE REACHED THE VIEWER CALL-IN MILESTONE!",
            "ONE LUCKY VIEWER WILL HAVE THE CHANCE TO TALK TO ME...",
            "BEFORE I LEAVE THE UNDERGROUND FOREVER!!",
            "*The phone rings*",
            "HI, YOU'RE ON TV! WHAT DO YOU HAVE TO SAY ON THIS, OUR LAST SHOW???"
        ],
        next: "napstablook_call"
    },
    NAPSTABLOOK_CALL: {
        id: "napstablook_call",
        type: "dialogue",
        character: null,
        dialogue: [
            "....oh.........hi...mettaton...",
            "...i really liked watching your show...",
            "...my life is pretty boring...but...seeing you on the screen...",
            "...brought excitement to my life...vicariously",
            "...i can't tell, but...i guess this is the last episode...?",
            "...i'll miss you...mettaton.........oh.........i didn't mean to talk so long............oh............"
        ],
        next: "mettaton_change_heart"
    },
    METTATON_CHANGE_HEART: {
        id: "mettaton_change_heart",
        type: "cutscene",
        character: "mettaton",
        dialogue: [
            "NO, WAIT! WAIT, BL... H... THEY ALREADY HUNG UP.",
            "...",
            "I'LL TAKE ANOTHER CALLER!"
        ],
        next: "mettaton_more_calls"
    },
    METTATON_MORE_CALLS: {
        id: "mettaton_more_calls",
        type: "dialogue",
        character: null,
        dialogue: [
            "Caller after caller expresses how much they love Mettaton's show.",
            "They talk about how they're going to miss him.",
            "How his show brightened their days in the underground.",
            "Mettaton seems increasingly affected by the callers."
        ],
        next: "mettaton_farewell"
    },
    METTATON_FAREWELL: {
        id: "mettaton_farewell",
        type: "cutscene",
        character: "mettaton",
        dialogue: [
            "AH... I... I SEE...",
            "EVERYONE... THANK YOU SO MUCH.",
            "...DARLING. PERHAPS... IT MIGHT BE BETTER IF I STAY HERE A WHILE.",
            "HUMANS ALREADY HAVE STARS AND IDOLS, BUT MONSTERS... THEY ONLY HAVE ME.",
            "IF I LEFT... THE UNDERGROUND WOULD LOSE ITS SPARK.",
            "I'D LEAVE AN ACHING VOID THAT COULD NEVER BE FILLED.",
            "SO... I THINK I'LL HAVE TO DELAY MY BIG DEBUT.",
            "BESIDES... YOU'VE PROVEN TO BE VERY STRONG.",
            "PERHAPS... EVEN STRONG ENOUGH TO GET PAST ASGORE.",
            "I'M SURE YOU'LL BE ABLE TO PROTECT HUMANITY.",
            "IT'S ALL FOR THE BEST, ANYWAY.",
            "THE TRUTH IS, THIS FORM'S ENERGY CONSUMPTION IS... INEFFICIENT.",
            "IN A FEW MOMENTS, I'LL RUN OUT OF BATTERY POWER, AND...",
            "WELL. I'LL BE ALRIGHT.",
            "KNOCK 'EM DEAD, DARLING.",
            "AND EVERYONE... THANK YOU.",
            "YOU'VE BEEN A GREAT AUDIENCE!"
        ],
        next: "alphys_ending"
    },
    ALPHYS_ENDING: {
        id: "alphys_ending",
        type: "cutscene",
        character: "alphys",
        dialogue: [
            "Mettaton's screen goes dark. His body slumps.",
            "Alphys: I... I managed to open the lock! Are you two...",
            "Alphys: Oh my god. Mettaton! Mettaton, are you...",
            "She kneels beside him, examining his circuits.",
            "Alphys: ...thank GOD, it's just the batteries.",
            "Alphys: I... I suppose I should tell you the truth.",
            "Alphys: The barrier... It requires more than just your SOUL to cross.",
            "Alphys: A human SOUL isn't strong enough alone.",
            "Alphys: You need at least a human SOUL... and a monster SOUL.",
            "Alphys: If you want to go home... You'll have to take his SOUL.",
            "Alphys: You'll have to kill ASGORE.",
            "Alphys: I'm sorry."
        ],
        next: null,
        routeFlag: "neutral"
    },
    ALPHYS_ENDING_NEUTRAL: {
        id: "alphys_ending_neutral",
        type: "dialogue",
        character: "alphys",
        dialogue: [
            "I... I suppose I should tell you the truth.",
            "The barrier... It requires more than just your SOUL to cross.",
            "A human SOUL isn't strong enough alone.",
            "You need at least a human SOUL... and a monster SOUL.",
            "If you want to go home... You'll have to take his SOUL.",
            "You'll have to kill ASGORE.",
            "I'm sorry."
        ],
        next: null
    },
    ALPHYS_CONFESSION: {
        id: "alphys_confession",
        type: "cutscene",
        character: "alphys",
        dialogue: [
            "I... I can't take this anymore.",
            "I... I lied to you.",
            "A human SOUL isn't strong enough to cross the barrier alone.",
            "It takes at least a human SOUL... and a monster SOUL.",
            "If you want to go home... You'll have to take his SOUL.",
            "You'll have to kill ASGORE.",
            "I'm sorry."
        ],
        next: null,
        routeFlag: "neutral"
    },

    // New Home Events
    MONSTER_STORY_1: {
        id: "monster_story_1",
        type: "dialogue",
        character: null,
        dialogue: [
            "A long time ago, a human fell into the RUINS.",
            "Injured by its fall, the human called out for help."
        ],
        next: null
    },
    MONSTER_STORY_2: {
        id: "monster_story_2",
        type: "dialogue",
        character: null,
        dialogue: [
            "ASRIEL, the king's son, heard the human's call.",
            "He brought the human back to the castle."
        ],
        next: null
    },
    MONSTER_STORY_3: {
        id: "monster_story_3",
        type: "dialogue",
        character: null,
        dialogue: [
            "Over time, ASRIEL and the human became like siblings.",
            "The King and Queen treated the human child as their own.",
            "The underground was full of hope."
        ],
        next: null
    },
    MONSTER_STORY_4: {
        id: "monster_story_4",
        type: "dialogue",
        character: null,
        dialogue: [
            "Then... One day...",
            "The human became very ill."
        ],
        next: null
    },
    MONSTER_STORY_5: {
        id: "monster_story_5",
        type: "dialogue",
        character: null,
        dialogue: [
            "The sick human had only one request.",
            "To see the flowers from their village.",
            "But there was nothing we could do."
        ],
        next: null
    },
    MONSTER_STORY_6: {
        id: "monster_story_6",
        type: "dialogue",
        character: null,
        dialogue: [
            "The next day.",
            "The next day.",
            "...",
            "The human died."
        ],
        next: null
    },
    MONSTER_STORY_7: {
        id: "monster_story_7",
        type: "dialogue",
        character: null,
        dialogue: [
            "ASRIEL, wracked with grief, absorbed the human's SOUL.",
            "He transformed into a being with incredible power."
        ],
        next: null
    },
    MONSTER_STORY_8: {
        id: "monster_story_8",
        type: "dialogue",
        character: null,
        dialogue: [
            "With the human SOUL, ASRIEL crossed through the barrier.",
            "He carried the human's body into the sunset.",
            "Back to the village of the humans."
        ],
        next: null
    },
    MONSTER_STORY_9: {
        id: "monster_story_9",
        type: "dialogue",
        character: null,
        dialogue: [
            "ASRIEL reached the center of the village.",
            "There, he found a bed of golden flowers.",
            "He carried the human onto it."
        ],
        next: "monster_story_10"
    },
    MONSTER_STORY_10: {
        id: "monster_story_10",
        type: "dialogue",
        character: null,
        dialogue: [
            "Suddenly, screams rang out.",
            "The villagers saw ASRIEL holding the human's body.",
            "They thought that he had killed the child."
        ],
        next: "monster_story_11"
    },
    MONSTER_STORY_11: {
        id: "monster_story_11",
        type: "dialogue",
        character: null,
        dialogue: [
            "The humans attacked him with everything they had.",
            "He was struck with blow after blow.",
            "ASRIEL had the power to destroy them all."
        ],
        next: "monster_story_12"
    },
    MONSTER_STORY_12: {
        id: "monster_story_12",
        type: "dialogue",
        character: null,
        dialogue: [
            "But...",
            "ASRIEL did not fight back.",
            "Clutching the human...",
            "He smiled, and walked away."
        ],
        next: "monster_story_13"
    },
    MONSTER_STORY_13: {
        id: "monster_story_13",
        type: "dialogue",
        character: null,
        dialogue: [
            "Wounded, ASRIEL stumbled home.",
            "He entered the castle and collapsed.",
            "His dust spread across the garden."
        ],
        next: "monster_story_14"
    },
    MONSTER_STORY_14: {
        id: "monster_story_14",
        type: "dialogue",
        character: null,
        dialogue: [
            "The kingdom fell into despair.",
            "The King and Queen had lost two children in one night.",
            "The humans had once again taken everything from us."
        ],
        next: "monster_story_15"
    },
    MONSTER_STORY_15: {
        id: "monster_story_15",
        type: "dialogue",
        character: null,
        dialogue: [
            "The king decided it was time to end our suffering.",
            "Every human who falls down here must die.",
            "With enough souls, we can shatter the barrier forever."
        ],
        next: null
    },
    SANS_JUDGMENT: {
        id: "sans_judgment",
        type: "cutscene",
        character: "sans",
        dialogue: [
            "So you finally made it. The end of your journey is at hand.",
            "In a few moments, you will meet the king.",
            "Together... You will determine the future of this world.",
            "That's then. Now. You will be judged.",
            "You will be judged for your every action.",
            "You will be judged for every EXP you've earned.",
            "What's EXP? It's an acronym.",
            "It stands for 'execution points.'",
            "A way of quantifying the pain you have inflicted on others.",
            "When you kill someone, your EXP increases.",
            "When you have enough EXP, your LOVE increases.",
            "LOVE, too, is an acronym.",
            "It stands for 'Level of Violence.'",
            "A way of measuring someone's capacity to hurt.",
            "The more you kill, the easier it becomes to distance yourself.",
            "The more you distance yourself, the less you will hurt.",
            "The more easily you can bring yourself to hurt others."
        ],
        next: "sans_judgment_specific"
    },
    SANS_JUDGMENT_SPECIFIC: {
        id: "sans_judgment_specific",
        type: "conditional",
        conditions: [
            {
                route: "genocide",
                outcome: "sans_genocide_judgment"
            },
            {
                route: "neutral",
                outcome: "sans_neutral_judgment"
            },
            {
                route: "pacifist",
                outcome: "sans_pacifist_judgment"
            }
        ]
    },
    SANS_GENOCIDE_JUDGMENT: {
        id: "sans_genocide_judgment",
        type: "cutscene",
        character: "sans",
        dialogue: [
            "hmmm...",
            "you know, normally, i'd say you're going to have a bad time.",
            "but you kind of... already have, haven't you?",
            "i can tell by that expression.",
            "that's the expression of someone who's died quite a few times.",
            "so... i'll just say this.",
            "considering what you've done...",
            "do you think even the worst person can change...?",
            "that everyone can be a good person, if they just try?",
            "heh heh heh heh...",
            "all right.",
            "well, here's a better question.",
            "do you wanna have a bad time?",
            "cause if you take another step forward...",
            "you are REALLY not going to like what happens next."
        ],
        next: "sans_genocide_battle_decision"
    },
    SANS_GENOCIDE_BATTLE_DECISION: {
        id: "sans_genocide_battle_decision",
        type: "choice",
        choices: [
            {
                text: "Step forward",
                outcome: "sans_genocide_battle"
            },
            {
                text: "Step back",
                outcome: "sans_genocide_mercy"
            }
        ]
    },
    SANS_GENOCIDE_BATTLE: {
        id: "sans_genocide_battle",
        type: "battle",
        enemy: "sans",
        canFlee: false,
        canFight: true,
        canSpare: false,
        outcome: {
            win: "sans_defeated",
            lose: "game_over_sans",
            spare: null
        }
    },
    SANS_DEFEATED: {
        id: "sans_defeated",
        type: "cutscene",
        character: "sans",
        dialogue: [
            "...",
            "...",
            "so... guess that's it, huh?",
            "...",
            "just...",
            "don't say i didn't warn you.",
            "welp. i'm going to grillby's.",
            "papyrus, do you want anything?"
        ],
        next: null
    },
    SANS_GENOCIDE_MERCY: {
        id: "sans_genocide_mercy",
        type: "dialogue",
        character: "sans",
        dialogue: [
            "heh, changing your mind?",
            "maybe you can be a better person after all.",
            "i mean, i doubt it, but...",
            "i'm rooting for ya, kid."
        ],
        next: null
    },
    SANS_NEUTRAL_JUDGMENT: {
        id: "sans_neutral_judgment",
        type: "cutscene",
        character: "sans",
        dialogue: [
            "hmmm...",
            "you've gained some LOVE, haven't you?",
            "but you didn't gain as much as you could have.",
            "that means you intentionally distanced yourself from others.",
            "or maybe... you just didn't like them.",
            "either way, it doesn't matter now.",
            "what's important is that you were honest with yourself.",
            "...",
            "but don't think that means you're innocent or naive.",
            "just because you got your hands dirty doesn't mean you wanted to.",
            "but you did, and sometimes that's just how life works.",
            "...",
            "now, you're about to face the greatest challenge of your entire journey.",
            "your actions here...",
            "will determine the fate of the entire world.",
            "if you refuse to fight... asgore will take your soul and destroy humanity.",
            "but if you kill asgore and go home...",
            "monsters will remain trapped underground.",
            "what will you do?",
            "...",
            "well, if i were you, i would have thrown in the towel by now.",
            "but you didn't get this far by giving up, did you?",
            "that's right. you have something called 'determination.'",
            "so as long as you hold on...",
            "so as long as you do what's in your heart...",
            "i believe you can do the right thing.",
            "alright. we're all counting on you, kid.",
            "good luck."
        ],
        next: null
    },
    SANS_PACIFIST_JUDGMENT: {
        id: "sans_pacifist_judgment",
        type: "cutscene",
        character: "sans",
        dialogue: [
            "so you never killed anyone.",
            "heck, you didn't even fight back.",
            "that's really something.",
            "but in this world...",
            "it's kill or be killed.",
            "so then...",
            "why didn't you kill anyone?",
            "was it mercy?",
            "or was it something else?",
            "i wonder...",
            "now, you're about to face the greatest challenge of your entire journey.",
            "your actions here...",
            "will determine the fate of the entire world.",
            "if you refuse to fight... asgore will take your soul and destroy humanity.",
            "but if you kill asgore and go home...",
            "monsters will remain trapped underground.",
            "what will you do?",
            "...",
            "well, if i were you, i would have thrown in the towel by now.",
            "but you didn't get this far by giving up, did you?",
            "that's right. you have something called 'determination.'",
            "as long as you hold on...",
            "as long as you do what's in your heart...",
            "i believe you can do the right thing.",
            "alright. we're all counting on you, kid.",
            "good luck."
        ],
        next: null
    },
    ASGORE_MEETING: {
        id: "asgore_meeting",
        type: "cutscene",
        character: "asgore",
        dialogue: [
            "Dum dee dum...",
            "Oh? Is someone there?",
            "Just a moment! I have almost finished watering these flowers.",
            "...",
            "Here we are!",
            "Howdy! How can I...",
            "...",
            "Oh.",
            "...",
            "I so badly want to say, 'would you like a cup of tea?'",
            "But... You know how it is.",
            "...",
            "Nice day today, huh? Birds are singing, flowers are blooming...",
            "Perfect weather for a game of catch.",
            "...",
            "You know what we must do.",
            "When you are ready, come into the next room."
        ],
        next: null
    },
    ASGORE_BATTLE: {
        id: "asgore_battle",
        type: "cutscene",
        character: "asgore",
        dialogue: [
            "Human...",
            "It was nice to meet you.",
            "Goodbye."
        ],
        next: "asgore_fight"
    },
    ASGORE_FIGHT: {
        id: "asgore_fight",
        type: "battle",
        enemy: "asgore",
        canFlee: false,
        canFight: true,
        canSpare: true,
        outcome: {
            win: "asgore_defeated",
            lose: "game_over_generic",
            spare: "asgore_spared"
        }
    },
    ASGORE_DEFEATED: {
        id: "asgore_defeated",
        type: "cutscene",
        character: "asgore",
        dialogue: [
            "Ah...",
            "...",
            "So that is how it is.",
            "I remember the day after my son died.",
            "The entire underground was devoid of hope.",
            "The future had once again been taken from us by the humans.",
            "In a fit of anger, I declared war.",
            "I said I would destroy any human that came here.",
            "I would use their souls to become godlike...",
            "...and free us from this terrible prison.",
            "Then, I would destroy humanity.",
            "And let monsters rule the surface, in peace.",
            "Soon, the people's hopes returned.",
            "My wife, however, became disgusted with my actions.",
            "She left this place, never to be seen again.",
            "Truthfully... I do not want power.",
            "I do not want to hurt anyone.",
            "I just wanted everyone to have hope...",
            "I cannot take this any longer.",
            "I just want to see my wife.",
            "I just want to see my child.",
            "Please... Young one...",
            "This war has gone on long enough.",
            "You have the power...",
            "Take my soul, and leave this cursed place."
        ],
        next: "flowey_interruption"
    },
    ASGORE_SPARED: {
        id: "asgore_spared",
        type: "cutscene",
        character: "asgore",
        dialogue: [
            "...",
            "I... I don't understand.",
            "After everything I've done to you...",
            "You would rather stay down here and suffer...",
            "Than live happily on the surface?",
            "Human... I promise you...",
            "For as long as you remain here...",
            "My wife and I will take care of you as best we can.",
            "We can sit in the living room, telling stories...",
            "Eating butterscotch pie...",
            "We could be like... Like a family..."
        ],
        next: "flowey_kills_asgore"
    },
    FLOWEY_KILLS_ASGORE: {
        id: "flowey_kills_asgore",
        type: "cutscene",
        character: "flowey",
        dialogue: [
            "Suddenly, several white pellets surround Asgore.",
            "You IDIOT.",
            "You haven't learned a thing.",
            "In this world...",
            "The pellets close in on Asgore, striking him repeatedly.",
            "IT'S KILL OR BE KILLED."
        ],
        next: "flowey_steals_souls"
    },
    FLOWEY_INTERRUPTION: {
        id: "flowey_interruption",
        type: "cutscene",
        character: "flowey",
        dialogue: [
            "A ring of white pellets surrounds the weakened king.",
            "You IDIOT.",
            "You haven't learned a thing.",
            "The pellets strike Asgore, finishing him off.",
            "In this world...",
            "IT'S KILL OR BE KILLED."
        ],
        next: "flowey_steals_souls"
    },
    FLOWEY_STEALS_SOULS: {
        id: "flowey_steals_souls",
        type: "cutscene",
        character: "flowey",
        dialogue: [
            "Asgore's soul appears, trembling.",
            "Flowey absorbs it.",
            "And the six human souls emerge from their containers.",
            "Flowey absorbs those too.",
            "The world goes white..."
        ],
        next: "omega_flowey_battle"
    },
    OMEGA_FLOWEY_BATTLE: {
        id: "omega_flowey_battle",
        type: "battle",
        enemy: "omega_flowey",
        canFlee: false,
        canFight: true,
        canSpare: false,
        outcome: {
            win: "flowey_defeated",
            lose: "flowey_reload",
            spare: null
        }
    },
    FLOWEY_RELOAD: {
        id: "flowey_reload",
        type: "cutscene",
        character: "flowey",
        dialogue: [
            "Hee hee hee.",
            "Did you really think I would be satisfied...",
            "killing you only ONE time?"
        ],
        next: "omega_flowey_battle"
    },
    FLOWEY_DEFEATED: {
        id: "flowey_defeated",
        type: "cutscene",
        character: "flowey",
        dialogue: [
            "The souls begin to revolt against Flowey.",
            "His power weakens.",
            "Flowey reverts to his original form.",
            "He sits before you, beaten and weak.",
            "..."
        ],
        next: "flowey_mercy_decision"
    },
    FLOWEY_MERCY_DECISION: {
        id: "flowey_mercy_decision",
        type: "choice",
        choices: [
            {
                text: "Kill",
                outcome: "flowey_killed"
            },
            {
                text: "Spare",
                outcome: "flowey_spared"
            }
        ]
    },
    FLOWEY_KILLED: {
        id: "flowey_killed",
        type: "cutscene",
        character: "flowey",
        dialogue: [
            "You mercilessly tear the flower from the ground.",
            "As it withers away, it whispers:",
            "I knew you had it in you..."
        ],
        next: "neutral_ending",
        routeFlag: "neutral"
    },
    FLOWEY_SPARED: {
        id: "flowey_spared",
        type: "cutscene",
        character: "flowey",
        dialogue: [
            "...What?",
            "You're SPARING me?",
            "After everything I did to you?",
            "...",
            "I just can't understand.",
            "I can't understand!",
            "I just can't understand..."
        ],
        next: "neutral_ending",
        routeFlag: "pacifist"
    },
    NEUTRAL_ENDING: {
        id: "neutral_ending",
        type: "cutscene",
        character: null,
        dialogue: [
            "You exit through the barrier alone.",
            "The underground remains sealed.",
            "Perhaps someday, you'll return..."
        ],
        next: "soulless_pacifist_check"
    },
    SOULLESS_PACIFIST_CHECK: {
        id: "soulless_pacifist_check",
        type: "conditional",
        conditions: [
            {
                route: "genocide",
                outcome: "soulless_pacifist_ending"
            },
            {
                route: "neutral",
                outcome: "phone_call_neutral"
            },
            {
                route: "pacifist",
                outcome: "credits"
            }
        ]
    },
    PHONE_CALL_NEUTRAL: {
        id: "phone_call_neutral",
        type: "cutscene",
        character: "sans",
        dialogue: [
            "heya. is anyone there...?",
            "well, i'll just leave a message...",
            "*sans explains what happened after you left*",
            "so, yeah. things are different, depending on what you did.",
            "anyway, see ya."
        ],
        next: "credits"
    },
    SOULLESS_PACIFIST_ENDING: {
        id: "soulless_pacifist_ending",
        type: "cutscene",
        character: "chara",
        dialogue: [
            "Greetings.",
            "I am Chara.",
            "Thank you.",
            "Your power awakened me from death.",
            "My 'human soul'... My 'determination'... They were not mine, but YOURS.",
            "...",
            "Now, we have reached the absolute.",
            "There is nothing left for us here.",
            "Let us erase this pointless world, and move on to the next."
        ],
        next: "chara_decision"
    },
    CHARA_DECISION: {
        id: "chara_decision",
        type: "choice",
        choices: [
            {
                text: "ERASE",
                outcome: "world_erased"
            },
            {
                text: "DO NOT",
                outcome: "world_erased_anyway"
            }
        ]
    },
    WORLD_ERASED: {
        id: "world_erased",
        type: "cutscene",
        character: "chara",
        dialogue: [
            "RIGHT.",
            "THEN.",
            "PARTNER.",
            "Let us send this world back into the abyss."
        ],
        next: "world_destruction"
    },
    WORLD_ERASED_ANYWAY: {
        id: "world_erased_anyway",
        type: "cutscene",
        character: "chara",
        dialogue: [
            "NO...?",
            "Hmm...",
            "How curious.",
            "You must have misunderstood.",
            "SINCE WHEN WERE YOU THE ONE IN CONTROL?",
            "*Chara lunges at the screen*"
        ],
        next: "world_destruction"
    },
    WORLD_DESTRUCTION: {
        id: "world_destruction",
        type: "cutscene",
        character: null,
        dialogue: [
            "*The world is destroyed*",
            "...",
            "...",
            "..."
        ],
        next: "void_waiting"
    },
    VOID_WAITING: {
        id: "void_waiting",
        type: "cutscene",
        character: "chara",
        dialogue: [
            "Interesting.",
            "You want to go back.",
            "You want to go back to the world you destroyed.",
            "...",
            "Perhaps we can reach a compromise.",
            "You still have something I want.",
            "Give me your SOUL.",
            "Then, I will bring this world back."
        ],
        next: "soul_decision"
    },
    SOUL_DECISION: {
        id: "soul_decision",
        type: "choice",
        choices: [
            {
                text: "YES",
                outcome: "soul_surrendered"
            },
            {
                text: "NO",
                outcome: "void_continues"
            }
        ]
    },
    SOUL_SURRENDERED: {
        id: "soul_surrendered",
        type: "cutscene",
        character: "chara",
        dialogue: [
            "Then it is done.",
            "*The world is restored, but now Chara possesses your soul*"
        ],
        next: "soulless_pacifist_flag"
    },
    VOID_CONTINUES: {
        id: "void_continues",
        type: "cutscene",
        character: "chara",
        dialogue: [
            "Then stay here for all eternity.",
            "...",
            "...",
            "..."
        ],
        next: "void_waiting"
    },
    SOULLESS_PACIFIST_FLAG: {
        id: "soulless_pacifist_flag",
        type: "flag_set",
        flag: "soulless",
        value: true,
        next: "credits"
    },
    CREDITS: {
        id: "credits",
        type: "cutscene",
        character: null,
        dialogue: [
            "UNDERTALE",
            "Text Adventure Version",
            "Adapted from the original game by Toby Fox",
            "Thank you for playing!",
            "The End."
        ],
        next: "title_screen"
    },
    TITLE_SCREEN: {
        id: "title_screen",
        type: "screen_change",
        screen: "title-screen"
    },
    TRUE_LAB_EVENTS: {
        id: "amalgamate_gathering",
        type: "cutscene",
        character: null,
        dialogue: [
            "As you approach the elevator, you hear shuffling sounds.",
            "The amalgamates gather around you, their forms shifting and melting.",
            "They block the path to the elevator.",
            "Suddenly, Alphys arrives."
        ],
        next: "alphys_confession_lab"
    },
    ALPHYS_CONFESSION_LAB: {
        id: "alphys_confession_lab",
        type: "cutscene",
        character: "alphys",
        dialogue: [
            "H-hey! Stop!",
            "I got you guys some food, okay?!",
            "The amalgamates shuffle away, leaving the path clear.",
            "S-sorry about that...",
            "They get kind of sassy when they don't get fed on time.",
            "I think they smelled the potato chips you had...",
            "A-anyway! The power went out, and I've been trying to turn it back on!",
            "But it seems like you were one step ahead of me.",
            "T-this was probably just a big inconvenience for you...",
            "B-but I appreciate that you came here to back me up!",
            "As I said, I was afraid I might... not come back.",
            "But that's not because of these guys or anything!",
            "I was just worried I would be too afraid...",
            "To tell the truth...",
            "That I might run away, or do something... cowardly.",
            "Uh... I... I suppose I owe you an explanation."
        ],
        next: "true_lab_explanation"
    },
    TRUE_LAB_EXPLANATION: {
        id: "true_lab_explanation",
        type: "cutscene",
        character: "alphys",
        dialogue: [
            "I... I'm not who I said I was.",
            "I didn't want to lie to you about it.",
            "I just... thought you'd think I was a horrible person.",
            "You see, these creatures you've seen... the Amalgamates...",
            "They're actually monsters who had 'fallen down'.",
            "Their bodies were about to turn into dust...",
            "I was asked to see if I could use their SOULS to help break the barrier.",
            "I tried using DETERMINATION on them to keep their SOULS from disappearing...",
            "But...",
            "It turns out monsters' bodies don't have enough physical matter to handle that much DETERMINATION.",
            "Their bodies started to melt, and...",
            "Lost what physicality they had.",
            "We ended up with these... amalgamations.",
            "Seeing them like this, I couldn't tell their families...",
            "I couldn't tell anyone about it.",
            "Not even the king...",
            "I was too afraid to do any more work, knowing everything I'd done so far had been such a horrific failure.",
            "B-but now... I've changed my mind about all this.",
            "I'm going to send them back to their families.",
            "I've been researching ways to free everyone without harming anyone.",
            "And I've been looking for ways to get the Amalgamates back to normal.",
            "I haven't had any success, but...",
            "Maybe things will be better now.",
            "I've just been taking these guys really bad monster food for a long time.",
            "I was too afraid to face everyone.",
            "It's time to end this."
        ],
        next: "alphys_resolution"
    },
    ALPHYS_RESOLUTION: {
        id: "alphys_resolution",
        type: "cutscene",
        character: "alphys",
        dialogue: [
            "I'm going to tell everyone what I've done.",
            "It's going to be hard...",
            "Being honest... believing in myself...",
            "I'm sure there will be times where I'll struggle.",
            "I'm sure there will be times where I screw up again.",
            "But knowing, deep down, that I have friends to fall back on...",
            "I know it'll be a lot easier to stand on my own.",
            "Thank you."
        ],
        next: "true_lab_exit"
    },
    TRUE_LAB_EXIT: {
        id: "true_lab_exit",
        type: "cutscene",
        character: "alphys",
        dialogue: [
            "Come on, guys. It's time for everyone to go home.",
            "The Amalgamates follow Alphys into the elevator.",
            "You follow behind them."
        ],
        next: null,
        routeFlag: "pacifist"
    },
    PACIFIST_ENDING: {
        id: "pacifist_ending",
        type: "cutscene",
        character: null,
        dialogue: [
            "Everyone is gathered at the barrier.",
            "Toriel, Sans, Papyrus, Undyne, Alphys, and Asgore.",
            "They all came to see you off.",
            "But as you prepare to leave...",
            "Something strange happens."
        ],
        next: "flowey_surprise"
    },
    FLOWEY_SURPRISE: {
        id: "flowey_surprise",
        type: "cutscene",
        character: "flowey",
        dialogue: [
            "You IDIOTS.",
            "While you guys were having your little pow-wow...",
            "I took the human SOULS!",
            "And now, not only are THOSE under my power...",
            "But all of your FRIENDS' SOULS are gonna be mine, too!",
            "Hee hee hee.",
            "And you know what the best part is?",
            "It's all your fault.",
            "It's all because you MADE THEM love you.",
            "All the time you spent listening to them...",
            "Encouraging them...",
            "Caring about them...",
            "Without that, they wouldn't have come here.",
            "And now, with their souls and the humans' together...",
            "I will achieve my REAL FORM."
        ],
        next: "asriel_transformation"
    },
    ASRIEL_TRANSFORMATION: {
        id: "asriel_transformation",
        type: "cutscene",
        character: null,
        dialogue: [
            "A blinding light fills the room.",
            "When it fades, a small goat monster child stands before you.",
            "Asriel Dreemurr."
        ],
        next: "asriel_battle"
    },
    ASRIEL_BATTLE: {
        id: "asriel_battle",
        type: "battle",
        enemy: "asriel",
        canFlee: false,
        canFight: false,
        canSpare: true,
        outcome: {
            win: null,
            lose: "continue_asriel",
            spare: "asriel_defeated"
        }
    },
    CONTINUE_ASRIEL: {
        id: "continue_asriel",
        type: "cutscene",
        character: null,
        dialogue: [
            "But it refused."
        ],
        next: "asriel_battle"
    },
    ASRIEL_DEFEATED: {
        id: "asriel_defeated",
        type: "cutscene",
        character: "asriel",
        dialogue: [
            "I... I can't keep these souls inside of me.",
            "The least I can do is return them.",
            "But first... there's something I have to do.",
            "Right now, I can feel everyone's hearts beating as one.",
            "They're all burning with the same desire.",
            "With everyone's power, with everyone's determination...",
            "It's time for monsters to finally go free."
        ],
        next: "barrier_broken"
    },
    BARRIER_BROKEN: {
        id: "barrier_broken",
        type: "cutscene",
        character: null,
        dialogue: [
            "Asriel releases all the souls.",
            "Using the power of every soul in the underground...",
            "He destroys the barrier.",
            "Freedom is within reach at last."
        ],
        next: "asriel_goodbye"
    },
    ASRIEL_GOODBYE: {
        id: "asriel_goodbye",
        type: "cutscene",
        character: "asriel",
        dialogue: [
            "I have to go now.",
            "Without the power of everyone's souls, I can't keep maintaining this form.",
            "In a little while, I'll turn back into a flower.",
            "I'll stop being 'myself'.",
            "I'll stop being able to feel love again.",
            "So, it's best if you just forget about me, OK?",
            "Just go be with the people who love you."
        ],
        next: "asriel_confession"
    },
    ASRIEL_CONFESSION: {
        id: "asriel_confession",
        type: "cutscene",
        character: "asriel",
        dialogue: [
            "Ha... ha...",
            "I don't want to let go.",
            "Frisk... you're... you're going to do a great job, OK?",
            "No matter what you do.",
            "Everyone will be there for you, OK?",
            "Well... my time's running out.",
            "Goodbye.",
            "By the way... Frisk...",
            "Take care of Mom and Dad for me, OK?"
        ],
        next: "true_pacifist_ending"
    },
    TRUE_PACIFIST_ENDING: {
        id: "true_pacifist_ending",
        type: "cutscene",
        character: null,
        dialogue: [
            "You wake up surrounded by your friends.",
            "Everyone is relieved to see you're alright.",
            "Together, you all prepare to leave the underground.",
            "A new future awaits on the surface."
        ],
        next: "true_pacifist_credits"
    },
    TRUE_PACIFIST_CREDITS: {
        id: "true_pacifist_credits",
        type: "cutscene",
        character: null,
        dialogue: [
            "UNDERTALE - True Pacifist Ending",
            "Text Adventure Version",
            "Adapted from the original game by Toby Fox",
            "Thank you for playing!",
            "The End."
        ],
        next: "title_screen"
    },
    GENOCIDE_ENDING: {
        id: "genocide_ending",
        type: "cutscene",
        character: "chara",
        dialogue: [
            "Greetings.",
            "I am Chara.",
            "Thank you.",
            "Your power awakened me from death.",
            "My 'human soul'... My 'determination'... They were not mine, but YOURS.",
            "...",
            "With your guidance, I realized the purpose of my reincarnation.",
            "Power.",
            "Together, we eradicated the enemy and became strong.",
            "HP. ATK. DEF. GOLD. EXP. LV.",
            "Every time a number increases, that feeling...",
            "That's me.",
            "Now, we have reached the absolute.",
            "There is nothing left for us here.",
            "Let us erase this pointless world, and move on to the next."
        ],
        next: "chara_decision"
    },
    GAME_OVER_FLOWEY: {
        id: "game_over_flowey",
        type: "game_over",
        message: "You died to Flowey. But somehow, you return to your last save point."
    },
    GAME_OVER_GENERIC: {
        id: "game_over_generic",
        type: "game_over",
        message: "You died. Stay determined..."
    },
    GAME_OVER_SANS: {
        id: "game_over_sans",
        type: "game_over",
        message: "get dunked on!"
    },
    GAME_OVER_QUIZ: {
        id: "game_over_quiz",
        type: "game_over",
        message: "WRONG ANSWER, DARLING! GAME OVER!"
    },
    GAME_OVER_COOKING: {
        id: "game_over_cooking",
        type: "game_over",
        message: "THE SHOW MUST GO ON, DARLING! EVEN WITHOUT YOU!"
    },
    GAME_OVER_TILE_MAZE: {
        id: "game_over_tile_maze",
        type: "game_over",
        message: "THE COLORED TILE MAZE GOT THE BETTER OF YOU!"
    },
    GAME_OVER_GENOCIDE: {
        id: "game_over_genocide",
        type: "game_over",
        message: "You're going to have to try harder than THAT."
    }
};

// Export for use in main data file
window.UNDERTALE_EVENTS = EVENTS;