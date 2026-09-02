/**
 * TEACHER TRIBUTE - DATA CONFIGURATION
 * ----------------------------------------------------
 * Edit this single file to customize the tribute for any teacher.
 * Fully supports Bengali & English typography, multiple themes,
 * media gallery, and dynamic audio.
 */

const TRIBUTE_CONFIG = {
    // Basic Profile
    teacher: {
        name: "ডঃ অনিন্দিতা সেন",
        nameEn: "Dr. Anindita Sen",
        title: "বাংলা ও সাহিত্য বিভাগ",
        salutation: "শ্রদ্ধেয়া ম্যাম,",
        greeting: "Happy Teachers' Day",
        heroTagline: "একটি সুন্দর জীবনের ভিত্তি গড়ে দিয়েছেন আপনি।",
        heroDate: "৫ই সেপ্টেম্বর • শিক্ষক দিবস",
        portrait: "assets/images/teacher.jpg"
    },

    // Opening Screen Animation (2-3 seconds)
    opening: {
        badge: "স্মৃতির শ্রদ্ধার্ঘ্য",
        line1: "একটি ছোট্ট ধন্যবাদ…",
        line2: "একজন বিশেষ শিক্ষকের জন্য।"
    },

    // Handwritten Personal Message Card
    personalMessage: {
        heading: "কিছু কথা, শুধু আপনার জন্য…",
        salutation: "প্রিয় ম্যাম,",
        body: "ক্লাসরুমের সাধারণ চার দেওয়ালের মধ্যে আপনি শুধু বইয়ের পাতাই পড়াননি, শিখিয়েছেন কীভাবে স্বপ্ন দেখতে হয় এবং সেই স্বপ্নের ওপর বিশ্বাস রাখতে হয়।\n\nকোনো জটিল সাহিত্যের পাঠ সহজে বুঝিয়ে দেওয়া থেকে শুরু করে আমাদের আত্মবিশ্বাস গড়ে তোলা—আপনার ধৈর্য ও স্নেহের কোনো বিকল্প নেই। আপনি শুধু আমাদের শিক্ষিকা নন, জীবনের এক পরম অভিভাবক।\n\nএই শুভ শিক্ষক দিবসে আমাদের অন্তরের অন্তস্তল থেকে রইল বিনম্র শ্রদ্ধা ও অশেষ ভালোবাসা।",
        note: "আপনার দেওয়া প্রতিটি শিক্ষা আমাদের জীবনের পাথেয় হয়ে থাকবে।"
    },

    // Cinematic Portrait Section
    cinematic: {
        badge: "The teacher who made a difference.",
        tagline: "জ্ঞানের আলোয় জীবন গড়ার কারিগর",
        image: "assets/images/cinematic-teacher.jpg"
    },

    // Gallery / Memory Collages (3 to 5 images)
    gallery: {
        heading: "মধুর স্মৃতিমালা",
        subtitle: "যে মুহূর্তগুলো আমাদের হৃদয়ে চিরকাল অমলিন থাকবে",
        items: [
            {
                src: "assets/images/teacher.jpg",
                title: "স্নেহময়ী পথপ্রদর্শক",
                caption: "জ্ঞানের আলো আর হাসিমাখা মুখের এক অপরূপ প্রতিচ্ছবি।"
            },
            {
                src: "assets/images/memory-01.jpg",
                title: "কবিতা ও সাহিত্যের পাঠ",
                caption: "কালো বোর্ডে শব্দের জাদু ও ক্লাসরুমের তন্ময় মুহূর্ত।"
            },
            {
                src: "assets/images/memory-02.jpg",
                title: "ধৈর্য ও পরম যত্ন",
                caption: "প্রতিটি দ্বিধায় স্নেহের হাত বাড়িয়ে পাশে দাঁড়ানোর স্মৃতি।"
            },
            {
                src: "assets/images/memory-03.jpg",
                title: "শিক্ষক দিবসের পুষ্পার্ঘ্য",
                caption: "হাতে আঁকা উপহার কার্ড ও শ্রদ্ধার বিনম্র অনুভূতি।"
            },
            {
                src: "assets/images/cinematic-teacher.jpg",
                title: "চিরন্তন অনুপ্রেরণা",
                caption: "বিদ্যালয়ের প্রাঙ্গণে আপনার শান্ত ও আলোকিত উপস্থিতি।"
            }
        ]
    },

    // Thank You Section (Progressive Stagger Reveal)
    thankYou: {
        badge: "কৃতজ্ঞতা",
        heading: "Thank You, Teacher.",
        lines: [
            "আপনার অসীম ধৈর্য্যের জন্য।",
            "আপনার নিরন্তর উৎসাহের জন্য।",
            "আমাদের উপর আপনার অবিচল বিশ্বাসের জন্য।",
            "জীবনের প্রতিটি পদক্ষেপে পাশে থাকার জন্য।"
        ],
        finalStatement: "Thank you for believing in us."
    },

    // Emotional Quote Section
    quoteSection: {
        quote: "একজন শিক্ষক একটি জীবন বদলে দিতে পারেন, আর আপনি আমাদের গোটা পৃথিবীকে সুন্দর করে তুলেছেন।",
        author: "— আপনার স্নেহের ছাত্রছাত্রীবৃন্দ",
        subtext: "Forever grateful for your light and wisdom."
    },

    // Student Signature
    signature: {
        prefix: "With gratitude,",
        studentName: "অনির্বাণ ও দ্বাদশ শ্রেণীর শিক্ষার্থীবৃন্দ",
        studentNameEn: "Anirban & Batch of 2026",
        role: "Your Students • আপনার চিরকৃতজ্ঞ ছাত্রছাত্রী",
        handwrittenSVG: "assets/decorations/signature.svg"
    },

    // Final Blessing / Greeting Section
    finalGreeting: {
        icon: "🌸",
        badge: "শুভ শিক্ষক দিবস",
        title: "Happy Teachers' Day",
        teacherName: "ডঃ অনিন্দিতা সেন",
        emotionalLine: "আপনি সবসময় আমাদের অনুপ্রেরণা হয়ে থাকবেন।",
        replayText: "স্মৃতিগুলি পুনরায় দেখুন (Replay Memory)",
        sharePrompt: "এই শ্রদ্ধার্ঘ্যটি ম্যামের সাথে ও বন্ধুদের সাথে শেয়ার করুন"
    },

    // Floating Music Settings
    music: {
        enabled: true,
        src: "assets/audio/Spiring - City Life (freetouse.com).mp3",
        title: "Spiring - City Life",
        autoPlayPromptText: "Tap anywhere for background melody"
    },

    // Share Metadata
    share: {
        title: "Teacher's Day Tribute for Dr. Anindita Sen",
        text: "আমাদের প্রিয় ম্যামের জন্য একটি বিশেষ শিক্ষক দিবস উপহার ও ডিজিটাল শ্রদ্ধার্ঘ্য দেখুন 🌸",
        url: window.location.href
    },

    // Theme Engine: 'botanical' | 'midnight' | 'royal-velvet' | 'sunset-bloom'
    theme: "sunset-bloom",

    // Themes metadata for the luxury floating picker
    themeList: [
        { id: "botanical", name: "Botanical Ivory", icon: "🌿", primary: "#2D5A34", bg: "#F5FAF2" },
        { id: "midnight", name: "Midnight Celestial", icon: "✨", primary: "#E5C07B", bg: "#0D1322" },
        { id: "royal-velvet", name: "Royal Velvet", icon: "👑", primary: "#D4A95A", bg: "#220810" },
        { id: "sunset-bloom", name: "Sunset Bloom", icon: "🌅", primary: "#E11D48", bg: "#FAF2EC" }
    ],

    // Theme definitions with exact CSS custom properties
    themePalettes: {
        "botanical": {
            "--color-bg": "#F5FAF2",
            "--color-surface": "#FFFFFF",
            "--color-surface-translucent": "rgba(255, 255, 255, 0.92)",
            "--color-sage": "#4A7C49",
            "--color-sage-light": "#E2EFE0",
            "--color-sage-dark": "#1E421E",
            "--color-maroon": "#2D5A34",
            "--color-maroon-dark": "#18381C",
            "--color-gold": "#C59B3C",
            "--color-gold-light": "#F2E5C5",
            "--color-gold-glow": "rgba(197, 155, 60, 0.30)",
            "--color-pink": "#CCE3CA",
            "--color-pink-soft": "#EEF7ED",
            "--color-charcoal": "#1A281C",
            "--color-muted": "#506553",
            "--color-card-border": "rgba(74, 124, 73, 0.32)",
            "--color-border-hairline": "rgba(74, 124, 73, 0.22)",
            "--card-shadow": "0 18px 45px -12px rgba(30, 66, 30, 0.12), 0 4px 16px rgba(26, 40, 28, 0.04)"
        },
        "midnight": {
            "--color-bg": "#0D1322",
            "--color-surface": "#151F33",
            "--color-surface-translucent": "rgba(21, 31, 51, 0.88)",
            "--color-sage": "#4A6D88",
            "--color-sage-light": "#1E2C44",
            "--color-sage-dark": "#7EB3DB",
            "--color-maroon": "#E5C07B",
            "--color-maroon-dark": "#F3D89F",
            "--color-gold": "#F0C674",
            "--color-gold-light": "#FFE8B8",
            "--color-gold-glow": "rgba(240, 198, 116, 0.35)",
            "--color-pink": "#2C3E5A",
            "--color-pink-soft": "#1A253A",
            "--color-charcoal": "#F1F5F9",
            "--color-muted": "#94A3B8",
            "--color-card-border": "rgba(240, 198, 116, 0.26)",
            "--color-border-hairline": "rgba(240, 198, 116, 0.22)",
            "--card-shadow": "0 20px 50px -10px rgba(0, 0, 0, 0.6), 0 0 20px rgba(240, 198, 116, 0.08)"
        },
        "royal-velvet": {
            "--color-bg": "#220810",
            "--color-surface": "#2F0E18",
            "--color-surface-translucent": "rgba(47, 14, 24, 0.88)",
            "--color-sage": "#8C3B4F",
            "--color-sage-light": "#3D1320",
            "--color-sage-dark": "#EAA8B8",
            "--color-maroon": "#F7D6A5",
            "--color-maroon-dark": "#FFE8C2",
            "--color-gold": "#E5B869",
            "--color-gold-light": "#FBE6BE",
            "--color-gold-glow": "rgba(229, 184, 105, 0.35)",
            "--color-pink": "#4A1727",
            "--color-pink-soft": "#36111D",
            "--color-charcoal": "#FFF4ED",
            "--color-muted": "#C29EA8",
            "--color-card-border": "rgba(229, 184, 105, 0.28)",
            "--color-border-hairline": "rgba(229, 184, 105, 0.24)",
            "--card-shadow": "0 22px 55px -12px rgba(0, 0, 0, 0.65), 0 0 22px rgba(229, 184, 105, 0.10)"
        },
        "sunset-bloom": {
            "--color-bg": "#FAF2EC",
            "--color-surface": "#FFF8F4",
            "--color-surface-translucent": "rgba(255, 248, 244, 0.90)",
            "--color-sage": "#E07A5F",
            "--color-sage-light": "#F9E4DD",
            "--color-sage-dark": "#9C3820",
            "--color-maroon": "#A83244",
            "--color-maroon-dark": "#7C1F2E",
            "--color-gold": "#D97706",
            "--color-gold-light": "#FDE68A",
            "--color-gold-glow": "rgba(217, 119, 6, 0.26)",
            "--color-pink": "#FBCFE8",
            "--color-pink-soft": "#FFF1F2",
            "--color-charcoal": "#2E2421",
            "--color-muted": "#7C6C67",
            "--color-card-border": "rgba(217, 119, 6, 0.30)",
            "--color-border-hairline": "rgba(217, 119, 6, 0.25)",
            "--card-shadow": "0 18px 45px -12px rgba(168, 50, 68, 0.09), 0 4px 16px rgba(46, 36, 33, 0.04)"
        }
    }
};

// Global export for vanilla JS modules
if (typeof window !== "undefined") {
    window.TRIBUTE_CONFIG = TRIBUTE_CONFIG;
    // Backward compatibility shortcut
    window.teacher = {
        name: TRIBUTE_CONFIG.teacher.name,
        greeting: TRIBUTE_CONFIG.teacher.greeting,
        salutation: TRIBUTE_CONFIG.personalMessage.salutation,
        studentName: TRIBUTE_CONFIG.signature.studentName,
        message: TRIBUTE_CONFIG.personalMessage.body,
        quote: TRIBUTE_CONFIG.quoteSection.quote,
        finalMessage: TRIBUTE_CONFIG.finalGreeting.emotionalLine,
        images: TRIBUTE_CONFIG.gallery.items.map(item => item.src),
        music: TRIBUTE_CONFIG.music.src,
        theme: TRIBUTE_CONFIG.theme
    };
}
