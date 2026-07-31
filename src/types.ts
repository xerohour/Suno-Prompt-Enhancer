export type SunoVersion = "v3.5" | "v4" | "v4.5" | "v5" | "v5.5";
export type TabKey = "enhancer" | "artists" | "hook" | "mixer" | "metatags" | "cheatsheet" | "presets" | "saved" | "diagnostician" | "styles" | "models";

export interface SunoPromptRequest {
  topic: string;
  genre: string;
  subGenres: string[];
  vocalType: string;
  tempo: string;
  mood: string;
  sunoVersion: SunoVersion;
  instrumentation: string[];
  structurePreferences: string[];
  customInstructions?: string;
  producerAnchor?: string;
  audioQuality?: string;
  exclusions?: string;
  useVoiceClone?: boolean;
  isInstrumental?: boolean;
  density?: "Sparse" | "Medium" | "Lush" | "Auto";
  useAnchorRepeat?: boolean;
}

export interface SunoPromptResult {
  id: string;
  title: string;
  projectTitle?: string;
  stylePromptShort: string;
  stylePromptExpanded: string;
  genreTags: string[];
  bpm: string;
  musicalKey: string;
  vocalDescription: string;
  hook: string;
  lyrics: string;
  metatagsUsed: string[];
  sunoTips: string[];
  moodAnalysis?: string;
  albumArtPrompt?: string;
  createdAt?: string;
}

export interface HookIdea {
  title: string;
  hookText: string;
  vibe: string;
  rhymeScheme?: string;
  metatagSnippet: string;
}

export interface GenreFusionResult {
  fusionName: string;
  stylePrompt: string;
  description: string;
  recommendedInstruments: string[];
  vocalSuggestions: string;
  exampleBpm: string;
}

export interface MetatagInfo {
  tag: string;
  category: "structure" | "vocal" | "instrumental" | "effect";
  description: string;
  sunoTip: string;
  example: string;
}

export interface PresetPrompt {
  id: string;
  title: string;
  genre: string;
  vibe: string;
  bpm: string;
  stylePrompt: string;
  sampleHook: string;
  tags: string[];
}

export interface ArtistReplica {
  id: string;
  name: string;
  era: string;
  producer: string;
  genres: string[];
  vocalType: string;
  prompt: string;
  description: string;
}
