export const PRIMARY_GENRES = [
  "Pop",
  "Synthwave / Cyberpunk",
  "Rock / Alternative",
  "Hip-Hop / Trap",
  "Phonk / Drift",
  "Country / Americana",
  "Indie / Folk",
  "EDM / House / Future Bass",
  "K-Pop / J-Pop",
  "Lo-Fi / Chillhop",
  "Metal / Hardcore",
  "R&B / Soul",
  "Cinematic / Orchestral",
  "Reggae / Dancehall",
  "Jazz / Funk / City Pop",
];

export const SUB_GENRES_MAP: Record<string, string[]> = {
  Pop: ["Synthpop", "Dance Pop", "Dark Pop", "Hyperpop", "Acoustic Pop", "80s Pop", "Indie Pop"],
  "Synthwave / Cyberpunk": ["Darksynth", "Retrowave", "Outrun", "Chillwave", "Synthfolk", "EBM", "Vaporwave"],
  "Rock / Alternative": ["Grunge", "Hard Rock", "Pop Punk", "Post-Rock", "Indie Rock", "Shoegaze", "Prog Rock"],
  "Hip-Hop / Trap": ["Boom Bap", "Drift Trap", "Melodic Rap", "Conscious Rap", "Cloud Rap", "Rage Trap"],
  "Phonk / Drift": ["Drift Phonk", "Wave Phonk", "Memphis Cult", "Lofi Phonk", "Chill Phonk"],
  "Country / Americana": ["Country Rock", "Outlaw Country", "Bluegrass", "Country Pop", "Folk Country"],
  "Indie / Folk": ["Indie Folk", "Chamber Folk", "Dream Pop", "Acoustic Ballad", "Stomp & Holler"],
  "EDM / House / Future Bass": ["Melodic Dubstep", "Deep House", "Drum & Bass", "Tropical House", "Trance", "Future Bass"],
  "K-Pop / J-Pop": ["K-Pop EDM", "J-Rock Opening", "City Pop", "K-R&B", "Kawaii Bass"],
  "Lo-Fi / Chillhop": ["Lo-Fi Beats", "Jazzhop", "Ambient Chill", "Study Beats", "Rainy Lofi"],
  "Metal / Hardcore": ["Metalcore", "Heavy Metal", "Industrial Metal", "Nu-Metal", "Symphonic Metal"],
  "R&B / Soul": ["Neo-Soul", "Alternative R&B", "Contemporary R&B", "Motown Soul", "Trapsoul"],
  "Cinematic / Orchestral": ["Epic Trailer Score", "Dark Ambient", "Hybrid Orchestral", "Gothic Choir", "Fantasy Film"],
  "Reggae / Dancehall": ["Roots Reggae", "Modern Dancehall", "Dub", "Reggaeton"],
  "Jazz / Funk / City Pop": ["Smooth Jazz", "Funk Rock", "Nu-Jazz", "Disco Funk", "Japanese City Pop"],
};

export const VOCAL_TYPES = [
  "Raspy Male Lead",
  "Crystalline Female Lead",
  "Emotional High-Range Male",
  "Husky Low Female Vocal",
  "Duet (Male & Female)",
  "Choir & Gospel Harmonies",
  "Breathy Whispered Vocals",
  "Aggressive Rap Delivery",
  "Melodic R&B Belt",
  "Falsetto Lead",
  "Autotuned Pitch-Shifted",
  "Deep Voice Baritone",
  "Spoken Word Monologue",
  "Instrumental Only (No Vocals)",
];

export const TEMPOS = [
  { label: "Slow Ballad (65 - 80 BPM)", value: "65-80 BPM, slow emotional tempo" },
  { label: "Relaxed Groove (85 - 100 BPM)", value: "85-100 BPM, relaxed chill groove" },
  { label: "Moderate Pace (105 - 120 BPM)", value: "105-120 BPM, steady driving cadence" },
  { label: "Upbeat Dance (122 - 135 BPM)", value: "122-135 BPM, high energy upbeat rhythm" },
  { label: "Fast / Frenetic (140 - 180 BPM)", value: "140-180 BPM, fast intense high speed" },
];

export const MOODS = [
  "Energetic & Triumphant",
  "Bittersweet & Nostalgic",
  "Dark & Melancholic",
  "Atmospheric & Ethereal",
  "Euphoric & Uplifting",
  "Aggressive & Fierce",
  "Cozy & Intimate",
  "Mysterious & Suspenseful",
  "Funky & Playful",
  "Epic & Heroic",
];

export const INSTRUMENTS = [
  "Electric Guitar",
  "Acoustic Guitar",
  "Analog Synthesizer",
  "Rhodes Piano",
  "Heavy 808 Bass",
  "Taiko / Cinematic Drums",
  "Saxophone",
  "Violin / Orchestral Strings",
  "Slap Bass",
  "Brass Section",
  "Phonk Cowbell",
  "Lo-Fi Vinyl Crackle",
];

export const RANDOM_IDEAS = [
  "A dark cyberpunk detective tracking a ghost through neon Tokyo in 2099",
  "A bitter breakup at a 2 AM highway diner under flickering lights",
  "A triumphant anthem about breaking free from a toxic city and driving west",
  "An intimate acoustic love song about finding peace in a quiet rainy afternoon",
  "A fast-paced drift phonk track inspired by midnight street racing on mountain passes",
  "A nostalgic 80s synthwave anthem about summer nights that never end",
  "An epic orchestral trailer song about the rise of an ancient hero",
  "A cozy lo-fi beat about late-night study sessions and warm coffee",
  "A high-energy K-Pop banger about glowing under starlight",
  "An outlaw country rock song about a dusty highway ranger seeking redemption",
];
