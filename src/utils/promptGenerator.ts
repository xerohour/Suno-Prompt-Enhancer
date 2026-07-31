import { SunoPromptRequest, SunoPromptResult } from "../types";

function getEraForGenre(genre: string): string {
  const g = genre.toLowerCase();
  if (g.includes("synthwave") || g.includes("cyberpunk")) {
    return "1980s";
  }
  if (
    g.includes("rock") ||
    g.includes("alternative") ||
    g.includes("metal") ||
    g.includes("hardcore") ||
    g.includes("r&b") ||
    g.includes("rnb") ||
    g.includes("soul") ||
    g.includes("reggae")
  ) {
    return "1990s";
  }
  if (
    g.includes("hip-hop") ||
    g.includes("hip hop") ||
    g.includes("trap") ||
    g.includes("phonk") ||
    g.includes("rap") ||
    g.includes("cinematic") ||
    g.includes("orchestral")
  ) {
    return "2000s";
  }
  if (g.includes("jazz") || g.includes("funk")) {
    return "1970s";
  }
  if (
    g.includes("pop") ||
    g.includes("edm") ||
    g.includes("k-pop") ||
    g.includes("j-pop") ||
    g.includes("dance") ||
    g.includes("country") ||
    g.includes("americana") ||
    g.includes("indie") ||
    g.includes("folk") ||
    g.includes("lo-fi") ||
    g.includes("lofi")
  ) {
    return "2010s";
  }
  return "2010s";
}

function getGenreCategory(genre: string): "rock" | "hiphop" | "country" | "electronic" | "cinematic" | "default" {
  const g = genre.toLowerCase();
  if (g.includes("rock") || g.includes("metal") || g.includes("hardcore") || g.includes("alternative")) {
    return "rock";
  }
  if (g.includes("hip-hop") || g.includes("hip hop") || g.includes("trap") || g.includes("phonk") || g.includes("rap")) {
    return "hiphop";
  }
  if (g.includes("country") || g.includes("americana") || g.includes("bluegrass") || g.includes("folk")) {
    return "country";
  }
  if (
    g.includes("edm") ||
    g.includes("electronic") ||
    g.includes("synthwave") ||
    g.includes("cyberpunk") ||
    g.includes("dance") ||
    g.includes("house") ||
    g.includes("techno") ||
    g.includes("trance") ||
    g.includes("dubstep")
  ) {
    return "electronic";
  }
  if (g.includes("cinematic") || g.includes("orchestral") || g.includes("score") || g.includes("soundtrack")) {
    return "cinematic";
  }
  return "default";
}

function generateGenreSpecificLyrics(
  genreCategory: "rock" | "hiphop" | "country" | "electronic" | "cinematic" | "default",
  topicStr: string,
  instrumentsStr: string,
  mood: string
): { lyrics: string; hook: string; metatagsUsed: string[] } {
  let hook = "";
  let lyrics = "";
  const metatagsUsed = [
    `[Intro, ${instrumentsStr}]`,
    "[Verse 1]",
    "[Building Pre-Chorus]",
    "[Intense Chorus]",
    "[Melodic Interlude]",
    "[Bridge]",
    "[Intense Chorus]",
    "[Outro, Fade Out]",
  ];

  switch (genreCategory) {
    case "rock":
      hook = "We strike like thunder! Heavy riffs tearing through!";
      lyrics = `[Intro, ${instrumentsStr}]
. . . ! . .

[Verse 1]
Electric riffs tearing through the ambient dark,
${topicStr} ignited by an aggressive spark.
(Thunder shaking the ground!)

[Building Pre-Chorus]
Feel the distortion building up inside,
No more shelter left, nowhere left to hide!

[Intense Chorus]
${hook}
Aggressive power screaming through the night!
(Yeah! We strike like thunder!)

[Melodic Interlude]
. . . ! . .

[Bridge]
If the sky should shatter... into dust today...
We will stand through thunder... and carve our own way...

[Intense Chorus]
${hook}
Aggressive power screaming through the night!
(Yeah! We strike like thunder!)

[Outro, Fade Out]
Heavy riffs fading in the thunder... fading away...
[End]`;
      break;

    case "hiphop":
      hook = "Spit that relentless flow! Heavy bars locked on beat!";
      lyrics = `[Intro, ${instrumentsStr}]
. . . ! . .

[Verse 1]
Heavy bass dropping, spitting heavy bars,
Rhythmic patterns cutting straight through the stars.
(Flow tight! Check the mic!)

[Building Pre-Chorus]
Rhythmic patterns locked in, we never slow down,
${topicStr} taking over every block in town!

[Intense Chorus]
${hook}
Seamless flow rising, we claim our street!
(Spit that flow! Claim the street!)

[Melodic Interlude]
. . . ! . .

[Bridge]
Counting every bar... rhyming in the dark...
Pacing through the silence... leaving our mark...

[Intense Chorus]
${hook}
Seamless flow rising, we claim our street!
(Spit that flow! Claim the street!)

[Outro, Fade Out]
Rhythmic flow fading with the bass... dropping out...
[End]`;
      break;

    case "country":
      hook = "Riding down the open road under endless prairie skies!";
      lyrics = `[Intro, ${instrumentsStr}]
. . . ! . .

[Verse 1]
Dust on the highway, open skies ahead,
Pastoral dirt road where the wild river led.
(Long open road ahead...)

[Building Pre-Chorus]
Engine humming soft beneath the evening shade,
Remembering ${topicStr} and the promises we made!

[Intense Chorus]
${hook}
Pastoral valleys where the morning sun will rise!
(Open road! Golden skies!)

[Melodic Interlude]
. . . ! . .

[Bridge]
Faded wooden porch... quiet evening breeze...
Pastoral winds calling... rolling through the trees...

[Intense Chorus]
${hook}
Pastoral valleys where the morning sun will rise!
(Open road! Golden skies!)

[Outro, Fade Out]
Driving down the open road... fading into the night...
[End]`;
      break;

    case "electronic":
      hook = "Feel the drop! Systems pulse in the electric light!";
      metatagsUsed[4] = "[Drop]";
      lyrics = `[Intro, ${instrumentsStr}]
. . . ! . .

[Verse 1]
Neon lights pulse.
${topicStr} in sound.
(Signal pulse...)

[Building Pre-Chorus]
Synth line rising...
Prepare for the drop!

[Intense Chorus]
${hook}
Minimal words! Maximum energy tonight!
(Feel the drop! Bass drop!)

[Drop]
! ! . ! ! . !

[Bridge]
Frequencies shifting... endless sound waves...
Drifting through digital space... digital days...

[Intense Chorus]
${hook}
Minimal words! Maximum energy tonight!
(Feel the drop! Bass drop!)

[Outro, Fade Out]
Fading pulses... systems down...
[End]`;
      break;

    case "cinematic":
      hook = "Epic destiny unfolds! Standing against the storm!";
      lyrics = `[Intro, ${instrumentsStr}]
. . . ! . .

[Verse 1]
Ancient shadows fall across the majestic hall,
Epic horns echo as ${topicStr} answers the call.
(Echoes of dramatic fate...)

[Building Pre-Chorus]
The dramatic hour approaches, epic shadows clear,
Rising from the ashes with no fear!

[Intense Chorus]
${hook}
Dramatic skies ablaze with glory reborn!
(Epic glory! Stand tall!)

[Melodic Interlude]
. . . ! . .

[Bridge]
Whispers of ancient legends... written in time...
Through dramatic valleys... we begin to climb...

[Intense Chorus]
${hook}
Dramatic skies ablaze with glory reborn!
(Epic glory! Stand tall!)

[Outro, Fade Out]
Symphonic swell subsides... dramatic silence...
[End]`;
      break;

    default:
      hook = `We rise above the tide for ${topicStr}!`;
      lyrics = `[Intro, ${instrumentsStr}]
. . . ! . .

[Verse 1]
Walking through the shadows of ${topicStr},
Every single step taking us further along.
(Moving forward... into the light)

[Building Pre-Chorus]
Feel the rhythm building up inside!
No more secrets left to hide!

[Intense Chorus]
${hook}
Shining bright with nowhere left to hide!
(Yeah! We rise above!)

[Melodic Interlude]
. . . ! . .

[Bridge]
If the sky should fall down today...
We will stand firm... and find a way...

[Intense Chorus]
${hook}
Shining bright with nowhere left to hide!
(Yeah! We rise above!)

[Outro, Fade Out]
Fading away into the night...
[End]`;
      break;
  }

  return { lyrics, hook, metatagsUsed };
}

export function generateClientSidePrompt(req: SunoPromptRequest): SunoPromptResult {
  const {
    topic,
    genre,
    subGenres,
    vocalType,
    tempo,
    mood,
    sunoVersion,
    instrumentation,
    structurePreferences,
    customInstructions,
    exclusions,
  } = req;

  const conceptStr = topic.trim() || "Epic journey of transformation and resilience";
  const genreStr = genre.trim() || "Rock";

  // Clarify Weak Tags Rule (Suno Bible)
  const expandedSubGenres = (subGenres || []).map((sg) => {
    const s = sg.toLowerCase();
    if (s === "grunge") return "90s grunge rock, alternative rock, heavy metal";
    if (s === "swing") return "1940s swing, big band jazz, uptempo, energetic";
    if (s === "synthwave") return "80s synthwave, retrowave, analog synthesizers";
    if (s === "lo-fi beats" || s === "lofi") return "lo-fi hip hop, vinyl crackle, chillhop, mellow beats";
    return sg;
  });

  const subGenresStr = expandedSubGenres.length > 0 ? expandedSubGenres.join(", ") : "";
  const vocalTypeStr = vocalType || "Powerful Vocals";
  const tempoStr = tempo || "120 BPM";
  const moodStr = mood || "Energetic";
  const instrumentsStr =
    instrumentation && instrumentation.length > 0
      ? instrumentation.join(", ")
      : "Electric Guitar, Drums";

  // 1. Anti-Pop Gravity Well (#1 Suno Bible rule)
  const gLower = genreStr.toLowerCase();
  const isPop =
    gLower.includes("pop") ||
    gLower.includes("dance") ||
    gLower.includes("k-pop") ||
    gLower.includes("j-pop");
  
  let exclusionsStr = exclusions ? exclusions.trim() : "";
  if (!isPop && !exclusionsStr.includes("pop")) {
    exclusionsStr += (exclusionsStr ? ", " : "") + "no pop, no polished hooks";
  }
  const antiPopTag = exclusionsStr ? `, ${exclusionsStr}` : "";

  const producerAnchorStr = req.producerAnchor || "";
  const audioQualityStr = req.audioQuality || "24-bit 192kHz, wide stereo panorama";

  // 2. Era Mapping automatically (or override if producerAnchor implies an era, but we just prepend producerAnchor)
  const era = getEraForGenre(genreStr);

  // 2. Universal Prompt Formula Order:
  // [producer anchor] + [era/decade] + [genre] + [subgenres] + [vocal description] + [moods] + [instruments] + [production metadata]
  const shortParts = [producerAnchorStr, era, genreStr, subGenresStr, vocalTypeStr, moodStr, instrumentsStr].filter(
    Boolean
  );
  const shortStyleRaw = `${shortParts.join(", ")}${antiPopTag}`;
  const stylePromptShort =
    shortStyleRaw.length > 120 ? shortStyleRaw.substring(0, 117) + "..." : shortStyleRaw;

  // 3. Quality Metadata
  const featuredInstruments = instrumentsStr ? `featured instruments: ${instrumentsStr}` : "";
  const expandedParts = [
    producerAnchorStr,
    era,
    genreStr,
    subGenresStr,
    vocalTypeStr,
    tempoStr,
    moodStr,
    featuredInstruments,
    audioQualityStr,
  ].filter(Boolean);
  const stylePromptExpanded = `${expandedParts.join(", ")}${antiPopTag}`;

  // 4 & 5. Smarter Genre-Specific Lyrics Generation
  const genreCategory = getGenreCategory(genreStr);
  const { lyrics, hook, metatagsUsed: lyricsMetatags } = generateGenreSpecificLyrics(
    genreCategory,
    conceptStr,
    instrumentsStr,
    moodStr
  );

  const generatedTitle = conceptStr
    .split(" ")
    .slice(0, 4)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const metatagsUsed =
    structurePreferences && structurePreferences.length > 0
      ? structurePreferences
      : lyricsMetatags;

  const titleForArt = generatedTitle.toUpperCase().replace(/[^A-Z0-9 ]/g, "");
  const visualStyle = isPop ? "vivid colors, glossy pop art, vibrant, modern" : "moody lighting, cinematic atmosphere, highly detailed, expressive";
  const albumArtPrompt = `album art: ${conceptStr.slice(0, 60)}, ${genreStr} aesthetic, ${visualStyle}, 8k resolution, text reads "${titleForArt}" at the top`;

  // Dual-Naming Convention (Suno Bible)
  const context = isPop ? "PopHit" : genreCategory === "cinematic" ? "FilmScore" : genreCategory === "hiphop" ? "RapTrack" : genreCategory === "electronic" ? "EDM" : "Song";
  const theme = titleForArt.replace(/\s+/g, "").slice(0, 15);
  const projectTitle = `${context}_${theme}_v1`;

  return {
    id: `suno-${Date.now()}`,
    title: generatedTitle || "Suno Anthem",
    projectTitle,
    stylePromptShort,
    stylePromptExpanded,
    genreTags: [genreStr, ...(subGenres || []), moodStr],
    bpm: tempoStr,
    musicalKey: "A Minor",
    vocalDescription: vocalTypeStr,
    hook,
    lyrics,
    metatagsUsed,
    sunoTips: [
      `Optimized for Suno ${sunoVersion || "v3.5"} character limits and structural tag execution.`,
      !isPop
        ? `Anti-pop gravity well directive ('${exclusionsStr}') applied to enforce genre authenticity.`
        : "Pop style tags optimized for punchy earworm chorus.",
      "Universal prompt order applied: [Era] + [Genre] + [Subgenres] + [Vocals] + [Mood] + [Instruments] + [Production Metadata].",
      "Suno Bible Weak Tag Clarification: Expanded generic sub-genres with strong stylistic anchors to prevent generic output.",
      sunoVersion === "v4.5" ? "v4.5 Tip: Maximize your 8-minute generations by writing longer, more complex song structures." : "",
      (sunoVersion === "v5" || sunoVersion === "v5.5") ? "v5.5 Tip: You can now clone your own voice or train a custom model with your personal catalog in Suno!" : "",
      "Temporal Optimization: Generate during off-peak hours (3:00 AM - 4:30 AM local time) for peak AI performance."
    ].filter(Boolean),
    moodAnalysis: `A ${moodStr.toLowerCase()} ${genreStr} production set in the ${era} era, featuring ${vocalTypeStr.toLowerCase()} delivery and ${instrumentsStr}.`,
    albumArtPrompt,
    createdAt: new Date().toISOString(),
  };
}
