var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_genai = require("@google/genai");
var import_vite = require("vite");
var import_meta = {};
var __filename = (0, import_url.fileURLToPath)(import_meta.url);
var __dirname = import_path.default.dirname(__filename);
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json({ limit: "10mb" }));
var getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }
  return new import_genai.GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
};
app.post("/api/enhance-prompt", async (req, res) => {
  try {
    const {
      topic = "",
      genre = "",
      subGenres = [],
      vocalType = "",
      tempo = "",
      mood = "",
      sunoVersion = "v3.5",
      instrumentation = [],
      structurePreferences = [],
      targetDuration = "full",
      // "short", "full", "extended"
      customInstructions = ""
    } = req.body;
    const ai = getGeminiClient();
    const systemInstruction = `You are an expert Music Producer, Lyricist, and Suno AI Prompt Engineer specializing in optimizing song prompts for Suno AI (v3, v3.5, and v4) based on the official Suno Bible prompt engineering system.

Suno AI Prompt Engineering Principles (from Suno Bible):
1. **Universal Prompt Formula**: Format style prompts using the structured order:
   [Decade/Era, Primary Genre, Sub-genres/Micro-styles, Vocal Description (Gender, Nationality, Timbre), Moods, Key Featured Instrumentation, Producer Anchor / Production Metadata].
2. **Style Prompt Character Limit**: Keep style tag string under 120-150 characters for optimal adherence without tag truncation.
3. **Gravity Well Countering**: "Pop" is Suno's latent default gravity well. If the target genre is NOT pop (e.g. metal, ambient, folk, heavy rock), explicitly add negative directives in the style tag such as "no pop, no hooks, raw" or "raw unpolished mix" to avoid pop drift.
4. **Producer Anchors**: Reference producer mixing styles (e.g. "Abbey Road analog warmth", "George Martin production", "Rick Rubin raw minimalism", "Quincy Jones polished funk") to anchor sound signature.
5. **Production Metadata & Audio Quality**: Include high-fidelity tags like "[24-bit 192kHz, wide stereo panorama, pristine mastering]".
6. **Lyrics Box & Metatags**: Use precise structural metatags like [Intro], [Verse 1], [Pre-Chorus], [Chorus], [Post-Chorus], [Guitar Solo], [Breakdown], [Bridge], [Drop], [Outro], [Fade Out], [End].
7. **Lyrical Anchors & Formatting**: Format lyrics with rhythm, explicit call-and-response in parentheses e.g. (echo response), ellipses for slower pacing, and exclamation points for accents. Provide structured JSON output according to the requested schema.`;
    const prompt = `Create an enhanced Suno AI song prompt and lyrics for the following concept:
- Concept / Topic / Idea: "${topic || "Epic anthem about overcoming impossible odds"}"
- Target Genre: "${genre || "Modern Pop Rock"}"
- Sub-genres: ${subGenres.length ? subGenres.join(", ") : "Synth Pop, Electronic"}
- Vocal Style: "${vocalType || "Emotional High-Range Male Lead"}"
- Tempo / Rhythm: "${tempo || "Upbeat 120 BPM"}"
- Mood / Vibe: "${mood || "Energetic, Triumphant"}"
- Instruments: ${instrumentation.length ? instrumentation.join(", ") : "Electric Guitar, Synth Bass, Punchy Drums"}
- Preferred Structure: ${structurePreferences.length ? structurePreferences.join(", ") : "Standard (Intro, Verse, Pre-Chorus, Chorus, Verse, Chorus, Bridge, Chorus, Outro)"}
- Suno Version: "${sunoVersion}"
- Additional Custom Instructions: "${customInstructions}"

Generate a complete, production-ready Suno prompt breakdown.`;
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
          properties: {
            title: { type: import_genai.Type.STRING, description: "Catchy song title" },
            stylePromptShort: {
              type: import_genai.Type.STRING,
              description: "Optimized Suno Style prompt under 120 characters for the main Style box"
            },
            stylePromptExpanded: {
              type: import_genai.Type.STRING,
              description: "Detailed, extended style prompt with full nuances for advanced tagging"
            },
            genreTags: {
              type: import_genai.Type.ARRAY,
              items: { type: import_genai.Type.STRING },
              description: "Key genre and style tags"
            },
            bpm: { type: import_genai.Type.STRING, description: "Recommended tempo / BPM" },
            musicalKey: { type: import_genai.Type.STRING, description: "Suggested musical key (e.g. A Minor)" },
            vocalDescription: { type: import_genai.Type.STRING, description: "Detailed vocal timbre description" },
            hook: { type: import_genai.Type.STRING, description: "The central catchy hook line or refrain" },
            lyrics: {
              type: import_genai.Type.STRING,
              description: "Complete lyrics formatted with Suno metatags like [Verse], [Chorus], [Bridge], [Outro]"
            },
            metatagsUsed: {
              type: import_genai.Type.ARRAY,
              items: { type: import_genai.Type.STRING },
              description: "List of Suno metatags used in the lyrics"
            },
            sunoTips: {
              type: import_genai.Type.ARRAY,
              items: { type: import_genai.Type.STRING },
              description: "Pro tips for getting the best sound in Suno with this specific prompt"
            },
            moodAnalysis: { type: import_genai.Type.STRING, description: "Brief analysis of emotional arc and acoustic vibe" }
          },
          required: [
            "title",
            "stylePromptShort",
            "stylePromptExpanded",
            "genreTags",
            "bpm",
            "musicalKey",
            "vocalDescription",
            "hook",
            "lyrics",
            "metatagsUsed",
            "sunoTips"
          ]
        }
      }
    });
    const data = JSON.parse(response.text || "{}");
    return res.json({ success: true, data });
  } catch (err) {
    console.error("Enhance prompt error:", err);
    return res.status(500).json({ success: false, error: err.message || "Failed to enhance prompt" });
  }
});
app.post("/api/generate-hook", async (req, res) => {
  try {
    const { topic = "", genre = "", mood = "", count = 4 } = req.body;
    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Generate ${count} distinct, ultra-catchy, viral hook/chorus concepts for a song in the "${genre || "Pop/Rock"}" genre about "${topic || "late night memories"}". Mood: "${mood || "bittersweet"}".`,
      config: {
        systemInstruction: "You are a platinum hit songwriter known for writing irresistible, earworm song hooks with memorable rhythm, punchy lyrics, and emotional resonance.",
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
          properties: {
            hooks: {
              type: import_genai.Type.ARRAY,
              items: {
                type: import_genai.Type.OBJECT,
                properties: {
                  title: { type: import_genai.Type.STRING },
                  hookText: { type: import_genai.Type.STRING },
                  vibe: { type: import_genai.Type.STRING },
                  rhymeScheme: { type: import_genai.Type.STRING },
                  metatagSnippet: { type: import_genai.Type.STRING, description: "Formatted Suno chorus bracket block e.g. [Chorus] [Explosive Synth Drop]" }
                },
                required: ["title", "hookText", "vibe", "metatagSnippet"]
              }
            }
          },
          required: ["hooks"]
        }
      }
    });
    const data = JSON.parse(response.text || "{}");
    return res.json({ success: true, hooks: data.hooks });
  } catch (err) {
    console.error("Hook generator error:", err);
    return res.status(500).json({ success: false, error: err.message || "Failed to generate hooks" });
  }
});
app.post("/api/mix-genres", async (req, res) => {
  try {
    const { genres = [] } = req.body;
    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Mix these music genres into an innovative Suno AI style prompt: ${genres.join(", ")}. Explain how they blend and provide an optimized prompt.`,
      config: {
        systemInstruction: "You are an expert music genre fusionologist. Combine requested music genres into cohesive, high-impact style tags that Suno AI handles exceptionally well.",
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
          properties: {
            fusionName: { type: import_genai.Type.STRING },
            stylePrompt: { type: import_genai.Type.STRING },
            description: { type: import_genai.Type.STRING },
            recommendedInstruments: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
            vocalSuggestions: { type: import_genai.Type.STRING },
            exampleBpm: { type: import_genai.Type.STRING }
          },
          required: ["fusionName", "stylePrompt", "description", "recommendedInstruments", "vocalSuggestions", "exampleBpm"]
        }
      }
    });
    const data = JSON.parse(response.text || "{}");
    return res.json({ success: true, fusion: data });
  } catch (err) {
    console.error("Genre mix error:", err);
    return res.status(500).json({ success: false, error: err.message || "Failed to mix genres" });
  }
});
app.post("/api/tts", async (req, res) => {
  try {
    const { text, voice = "Zephyr" } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, error: "Text is required for speech synthesis" });
    }
    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: `Recite rhythmically like a song lyric hook: ${text}` }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice }
          }
        }
      }
    });
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      throw new Error("No audio data returned from Gemini TTS");
    }
    return res.json({ success: true, audioBase64: base64Audio });
  } catch (err) {
    console.error("TTS preview error:", err);
    return res.status(500).json({ success: false, error: err.message || "Failed to synthesize speech" });
  }
});
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Suno Prompt Enhancer server listening on http://0.0.0.0:${PORT}`);
  });
}
setupServer();
//# sourceMappingURL=server.cjs.map
