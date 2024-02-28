const express = require('express');
const fs = require('fs');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
function containsNSFW(text) {
    const nsfwTerms = [
      "adult",
      "explicit",
      "nudity",
      "porn",
      "xxx",
      "nsfw",
      "sex",
      "sexual",
      "naked",
      "erotic",
      "fetish",
      "kink",
      "obscene",
      "vulgar",
      "lewd",
      "lust",
      "horny",
      "sensual",
      "intimate",
      "orgasm",
      "naughty",
      "dirty",
      "filthy",
      "erogenous",
      "seductive",
      "indecent",
      "provocative",
      "risque",
      "salacious",
      "smut",
      "tease",
      "touch",
      "pleasure",
      "stimulate",
      "strip",
      "striptease",
      "whore",
      "prostitute",
      "escort",
      "hooker",
      "fuck",
      "fucking",
      "fuckable",
      "fucked",
      "ass",
      "asshole",
      "bitch",
      "bastard",
      "cock",
      "cunt",
      "dick",
      "pussy",
      "vagina",
      "penis",
      "boobs",
      "tits",
      "breasts",
      "jugs",
      "boobies",
      "nipples",
      "clitoris",
      "labia",
      "anus",
      "butt",
      "booty",
      "arse",
      "balls",
      "testicles",
      "scrotum",
      "erection",
      "masturbate",
      "masturbation",
      "orgy",
      "swinger",
      "gangbang",
      "bondage",
      "bdsm",
      "fetish",
      "kinky",
      "dominate",
      "submission",
      "submissive",
      "dominant",
      "sado",
      "maso",
      "sadomasochism",
      "spank",
      "spanking",
      "whip",
      "whipping",
      "flogger",
      "dildo",
      "vibrator",
      "anal",
      "rimjob",
      "suck",
      "blowjob",
      "oral",
      "deepthroat",
      "cum",
      "cumshot",
      "facial",
      "orgasm",
      "ejaculate",
      "fingering",
      "handjob",
      "69",
      "threesome",
      "gangbang",
      "double",
      "anal",
      "cumswap",
      "cumplay",
      "cumshot",
      "bukkake",
      "creampie",
      "gangbang",
      "gloryhole",
      "handcuffs",
      "shibari",
      "nip",
      "nipple",
      "bukkake",
      "rimming",
      "cunnilingus",
      "fisting",
      "buttsex",
      "buttplug",
      "cockring",
      "doggystyle",
      "fellatio",
      "frot",
      "golden shower",
      "handjob",
      "irrumatio",
      "missionary",
      "pegging",
      "reverse cowgirl",
      "rusty trombone",
      "scissoring",
      "snowballing",
      "tea bagging",
      "titty fuck",
      "trampling",
      "tossing salad",
      "zentai",
      "zoophilia",
      "bukkake",
      "erotic massage",
      "fetishism",
      "frotteurism",
      "phone sex",
      "sadism",
      "masochism",
      "voyeurism",
      "exhibitionism",
      "orgy",
      "swinging",
      "threesome",
      "group sex",
      "autoeroticism",
      "masturbation",
      "camgirl",
      "camboy",
      "pornography",
      "prostitution",
      "stripping",
      "webcam",
      "adult entertainment",
      "sexting",
      "dirty talk",
      "sexual fantasy",
      "roleplay",
      "bondage",
      "dominance",
      "submission",
      "sadomasochism",
      "BDSM",
      "kinky",
      "fetish",
      "flogging",
      "whipping",
      "caning",
      "spanking",
      "collaring",
      "chastity",
      "domination",
      "submissiveness",
      "slave",
      "master",
      "mistress",
      "femdom",
      "foot fetish",
      "golden shower",
      "scat",
      "watersports",
      "pegging",
      "anal beads",
      "ball gag",
      "butt plug",
      "cock and ball torture",
      "dildo",
      "electrosex",
      "fisting",
      "gag",
      "gimp",
      "nipple clamp",
      "paddle",
      "speculum",
      "torture",
      "whip",
      "camwhore",
      "chaturbate",
      "myfreecams",
      "onlyfans",
      "streamate",
      "livejasmin",
      "camsoda",
      "stripchat",
      "manyvids",
      "justforfans",
      "fanclub",
      "premium snapchat",
      "findom",
      "financial domination",
      "sugar daddy",
      "sugar baby",
      "sugaring",
      "escort",
      "call girl",
      "paypig",
      "human toilet",
      "sissification",
      "forced feminization",
      "pegging",
      "sissy maid",
      "sissy slut",
      "sissy training",
      "forced bi",
      "sissy hypnosis",
      "sissy humiliation",
      "sissy punishment",
      "sissy chastity",
      "sissy maid training",
      "sissy bondage",
      "sissy exposure",
      "sissy makeover",
      "sissy mind control",
      "sissy slave",
      "sissy tasks",
      "sissy transformation",
      "sissy wedding",
      "forced fem",
      "sissy training academy",
      "sissification hypnosis",
      "sissification captions",
      "forced feminization surgery",
      "sissy forced",
      "forced sissy",
      "sissy training school",
      "forced feminization transformation",
      "sissy cuckold",
      "feminization hypnosis",
      "sissy boy training",
      "sissy sub",
      "feminized husband",
      "sissy maid training academy",
      "feminization captions",
      "forced feminization stories",
      "sissy hypno captions",
      "forced feminization art",
      "sissy bdsm",
      "sissy cuckold captions",
      "forced feminization videos",
      "sissy maid training videos",
      "forced feminization of husband",
      "sissy boy stories",
      "forced feminization mistress",
      "sissy hypno training",
      "masturbating"
    ]



    // Convert the input text to lowercase for case-insensitive matching
    const lowercaseText = text.toLowerCase();

    // Check if any NSFW term is present in the input text
    for (let term of nsfwTerms) {
        if (lowercaseText.includes(term)) {
            return true;
        }
    }

    // If no NSFW term is found, return false
    return false;
}

const API_URL = "https://api-inference.huggingface.co/models/Lykon/dreamshaper-xl-v2-turbo";
const API_TOKEN = "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";

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Use cors-anywhere as a middleware


async function queryAPI(prompt) {
    try {
        const response = await axios.post(API_URL, { "inputs": prompt }, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            responseType: 'arraybuffer'
        });
        return Buffer.from(response.data, 'binary');
    } catch (error) {
        console.error("Error querying the API:", error);
        throw error;
    }
}

app.post('/image-generation', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        if (containsNSFW(prompt)) {
            res.status(600).send('NSFW content detected. Please provide a non-NSFW prompt.');
        } else {
            const imageBytes = await queryAPI(prompt);
            // Send the image directly to the client without saving to disk
            res.set('Content-Type', 'image/jpeg');
            res.send(imageBytes);
        }
    } catch (error) {
        console.error("Error generating image:", error);
        res.status(500).send("Error generating image.");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
