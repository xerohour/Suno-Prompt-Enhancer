import { SunoPromptRequest, SunoPromptResult } from "../types";

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
  } = req;

  const conceptStr = topic.trim() || "Epic journey of transformation and resilience";
  const subGenresStr = subGenres.length > 0 ? subGenres.join(", ") : "Synth Pop, Electronic";
  const instrumentsStr = instrumentation.length > 0 ? instrumentation.join(", ") : "Electric Guitar, Analog Synthesizer, Punchy Drums";
  
  // Gravity Well check (Suno Bible rule)
  const isPop = genre.toLowerCase().includes("pop");
  const antiPopTag = !isPop ? ", no pop, no hooks, raw mix" : "";

  // Universal Prompt Formula: [Decade, Genre, Subgenres, Vocals, Moods, Instruments, Production]
  const shortStyle = `${genre}, ${subGenresStr}, ${vocalType}, ${mood}, ${instrumentsStr}${antiPopTag}`;
  const trimmedShortStyle = shortStyle.length > 120 ? shortStyle.substring(0, 117) + "..." : shortStyle;

  const expandedStyle = `${genre}, ${subGenresStr}, ${vocalType}, ${tempo}, ${mood}, featured instruments: ${instrumentsStr}, 24-bit 192kHz audio resolution, wide stereo panorama, studio master quality${antiPopTag}`;

  const generatedTitle = conceptStr
    .split(" ")
    .slice(0, 4)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const lyrics = `[Intro, ${instrumentsStr}]
. . . ! . .

[Verse 1]
${conceptStr}
Walking through the shadows into the dawn,
Every single step taking us further along.
(Echoing echoes... into the night)

[Pre-Chorus, Rising Cadence]
Feel the rhythm building up inside,
No more secrets left to hide!

[Chorus, ${mood}]
We rise above the stormy tide!
Shining bright with nowhere to hide!
(Yeah, we own the night!)

[Guitar Solo, ${instrumentsStr}]
! ! . ! ! . !

[Bridge, Melancholic departure]
If the sky should fall down today,
We will stand firm and find a way...

[Chorus, Explosive Final Refrain]
We rise above the stormy tide!
Shining bright with nowhere to hide!

[Outro, Fade Out]
Fading away into the atmosphere...
[End]`;

  return {
    id: `suno-${Date.now()}`,
    title: generatedTitle || "Suno Anthem",
    stylePromptShort: trimmedShortStyle,
    stylePromptExpanded: expandedStyle,
    genreTags: [genre, ...subGenres, mood],
    bpm: tempo || "120 BPM",
    musicalKey: "A Minor",
    vocalDescription: vocalType,
    hook: "We rise above the stormy tide! Shining bright with nowhere to hide!",
    lyrics,
    metatagsUsed: structurePreferences.length > 0 ? structurePreferences : ["[Intro]", "[Verse 1]", "[Pre-Chorus]", "[Chorus]", "[Guitar Solo]", "[Bridge]", "[Outro]"],
    sunoTips: [
      "Optimized for Suno " + sunoVersion + " character limits.",
      !isPop ? "Anti-pop gravity well directive applied to maintain genre authenticity." : "Pop style tags optimized for punchy earworm chorus.",
      "Bracketed metatags like [Guitar Solo] and [Intro] enforce structural transitions.",
    ],
    moodAnalysis: `A ${mood.toLowerCase()} track blending ${genre} dynamics with ${vocalType.toLowerCase()} delivery.`,
    createdAt: new Date().toISOString(),
  };
}
