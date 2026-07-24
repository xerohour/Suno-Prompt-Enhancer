import React, { useState } from "react";
import {
  Sparkles,
  Dice5,
  ChevronDown,
  ChevronUp,
  Settings2,
  Mic,
  Activity,
  Music,
  Sliders,
  Layers,
  HelpCircle,
} from "lucide-react";
import { SunoPromptRequest, SunoVersion } from "../types";
import {
  PRIMARY_GENRES,
  SUB_GENRES_MAP,
  VOCAL_TYPES,
  TEMPOS,
  MOODS,
  INSTRUMENTS,
  RANDOM_IDEAS,
} from "../data/genres";

interface PromptEnhancerFormProps {
  onEnhance: (req: SunoPromptRequest) => void;
  isLoading: boolean;
  sunoVersion: SunoVersion;
}

export const PromptEnhancerForm: React.FC<PromptEnhancerFormProps> = ({
  onEnhance,
  isLoading,
  sunoVersion,
}) => {
  const [topic, setTopic] = useState("");
  const [genre, setGenre] = useState(PRIMARY_GENRES[0]);
  const [selectedSubGenres, setSelectedSubGenres] = useState<string[]>([]);
  const [vocalType, setVocalType] = useState(VOCAL_TYPES[0]);
  const [tempo, setTempo] = useState(TEMPOS[2].value);
  const [mood, setMood] = useState(MOODS[0]);
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([
    "Electric Guitar",
    "Analog Synthesizer",
  ]);
  const [structurePreferences, setStructurePreferences] = useState<string[]>([
    "[Intro]",
    "[Verse]",
    "[Pre-Chorus]",
    "[Chorus]",
    "[Bridge]",
    "[Outro]",
  ]);
  const [customInstructions, setCustomInstructions] = useState("");
  const [producerAnchor, setProducerAnchor] = useState("");
  const [audioQuality, setAudioQuality] = useState("24-bit 192kHz, wide stereo panorama");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const availableSubGenres = SUB_GENRES_MAP[genre] || [];

  const handleRandomIdea = () => {
    const randomTopic = RANDOM_IDEAS[Math.floor(Math.random() * RANDOM_IDEAS.length)];
    const randomGenre = PRIMARY_GENRES[Math.floor(Math.random() * PRIMARY_GENRES.length)];
    const randomVocal = VOCAL_TYPES[Math.floor(Math.random() * VOCAL_TYPES.length)];
    const randomMood = MOODS[Math.floor(Math.random() * MOODS.length)];

    setTopic(randomTopic);
    setGenre(randomGenre);
    setSelectedSubGenres([]);
    setVocalType(randomVocal);
    setMood(randomMood);
    setProducerAnchor("");
  };

  const toggleSubGenre = (sg: string) => {
    setSelectedSubGenres((prev) =>
      prev.includes(sg) ? prev.filter((i) => i !== sg) : [...prev, sg]
    );
  };

  const toggleInstrument = (inst: string) => {
    setSelectedInstruments((prev) =>
      prev.includes(inst) ? prev.filter((i) => i !== inst) : [...prev, inst]
    );
  };

  const toggleStructureTag = (tag: string) => {
    setStructurePreferences((prev) =>
      prev.includes(tag) ? prev.filter((i) => i !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEnhance({
      topic,
      genre,
      subGenres: selectedSubGenres,
      vocalType,
      tempo,
      mood,
      sunoVersion,
      instrumentation: selectedInstruments,
      structurePreferences,
      customInstructions,
      producerAnchor: producerAnchor.trim() || undefined,
      audioQuality,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            Suno Prompt Architect
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Transform raw concepts into hit-ready Suno style prompts & structured lyrics
          </p>
        </div>
        <button
          type="button"
          onClick={handleRandomIdea}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold border border-white/10 transition-all hover:scale-[1.02] active:scale-95 shadow-md"
        >
          <Dice5 className="w-4 h-4 text-cyan-400" />
          Inspire Me (Random Idea)
        </button>
      </div>

      {/* Main Idea Input */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2.5 flex items-center justify-between">
          <span>Original Concept / Song Idea</span>
          <span className="text-slate-400 font-normal lowercase italic text-[11px]">e.g. "80s synthwave heartbreak in Tokyo"</span>
        </label>
        <textarea
          rows={3}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Describe your song idea, emotional storyline, atmosphere, or key lyrics line..."
          className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all"
        />
      </div>

      {/* Genre & Subgenre Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Music className="w-3.5 h-3.5 text-cyan-400" />
            Primary Music Genre
          </label>
          <select
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value);
              setSelectedSubGenres([]);
            }}
            className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            {PRIMARY_GENRES.map((g) => (
              <option key={g} value={g} className="bg-slate-900 text-slate-100">
                {g}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Mic className="w-3.5 h-3.5 text-fuchsia-400" />
            Vocal Profile
          </label>
          <select
            value={vocalType}
            onChange={(e) => setVocalType(e.target.value)}
            className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            {VOCAL_TYPES.map((v) => (
              <option key={v} value={v} className="bg-slate-900 text-slate-100">
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Subgenre Chips */}
      {availableSubGenres.length > 0 && (
        <div>
          <span className="block text-xs text-slate-400 mb-2 font-medium">
            Sub-genres & Micro-styles (Optional):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {availableSubGenres.map((sg) => {
              const active = selectedSubGenres.includes(sg);
              return (
                <button
                  type="button"
                  key={sg}
                  onClick={() => toggleSubGenre(sg)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                      : "bg-white/5 text-slate-300 hover:text-white border border-white/10 hover:bg-white/10"
                  }`}
                >
                  {active ? `✓ ${sg}` : `+ ${sg}`}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tempo & Mood Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            Tempo & Cadence
          </label>
          <select
            value={tempo}
            onChange={(e) => setTempo(e.target.value)}
            className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            {TEMPOS.map((t) => (
              <option key={t.label} value={t.value} className="bg-slate-900 text-slate-100">
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-fuchsia-400" />
            Emotional Mood
          </label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            {MOODS.map((m) => (
              <option key={m} value={m} className="bg-slate-900 text-slate-100">
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Instrumentation Chips */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
          Featured Instruments & Acoustic Texture
        </label>
        <div className="flex flex-wrap gap-1.5">
          {INSTRUMENTS.map((inst) => {
            const active = selectedInstruments.includes(inst);
            return (
              <button
                type="button"
                key={inst}
                onClick={() => toggleInstrument(inst)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? "bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40 shadow-sm"
                    : "bg-white/5 text-slate-300 hover:text-white border border-white/10 hover:bg-white/10"
                }`}
              >
                {active ? `✓ ${inst}` : `+ ${inst}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Advanced Drawer Toggle */}
      <div>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 font-bold"
        >
          <Settings2 className="w-4 h-4" />
          {showAdvanced ? "Hide Advanced Customizations" : "Show Advanced Options & Structure Builder"}
          {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showAdvanced && (
          <div className="mt-4 p-5 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl space-y-4">
            {/* Preferred Structure Metatags */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                Include Structural Metatags in Lyrics:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "[Intro]",
                  "[Verse]",
                  "[Pre-Chorus]",
                  "[Chorus]",
                  "[Post-Chorus]",
                  "[Guitar Solo]",
                  "[Drop]",
                  "[Bridge]",
                  "[Outro]",
                  "[Fade Out]",
                ].map((tag) => {
                  const active = structurePreferences.includes(tag);
                  return (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => toggleStructureTag(tag)}
                      className={`px-3 py-1 rounded-xl text-xs font-mono font-semibold transition-all ${
                        active
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                          : "bg-white/5 text-slate-400 border border-white/5 hover:text-slate-200"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Extra Instructions */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Custom Instructions for Gemini Lyricist:
              </label>
              <input
                type="text"
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                placeholder="e.g. Include a catchy 2-line rhyming refrain in Spanish; make the chorus explosive..."
                className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
            
            {/* SUNO Bible: Producer Anchors & Quality Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Producer Anchor / Era Specificity:
                </label>
                <input
                  type="text"
                  value={producerAnchor}
                  onChange={(e) => setProducerAnchor(e.target.value)}
                  placeholder="e.g. Produced by Danger Mouse, 1970s Abbey Road..."
                  className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Audio Quality Metadata:
                </label>
                <input
                  type="text"
                  value={audioQuality}
                  onChange={(e) => setAudioQuality(e.target.value)}
                  placeholder="e.g. Tape saturation, 24-bit 192kHz..."
                  className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.005] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Architecting Suno Prompt & Lyrics...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 fill-current text-cyan-200" />
              <span>Enhance for Suno {sunoVersion}</span>
            </>
          )}
        </button>
        <p className="text-[11px] text-slate-400 text-center mt-3 flex items-center justify-center gap-1">
          <HelpCircle className="w-3 h-3 text-slate-400" />
          Optimized for Suno {sunoVersion} prompt box character limits & bracketed metatags.
        </p>
      </div>
    </form>
  );
};
