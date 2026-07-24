import React, { useState } from "react";
import { Layers, Search, Copy, Check, Sparkles, ArrowRight } from "lucide-react";
import { PRESET_PROMPTS } from "../data/presets";
import { PresetPrompt } from "../types";

interface PresetLibraryProps {
  onLoadPreset: (preset: PresetPrompt) => void;
}

export const PresetLibrary: React.FC<PresetLibraryProps> = ({ onLoadPreset }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const allTags = Array.from(new Set(PRESET_PROMPTS.flatMap((p) => p.tags)));

  const filteredPresets = PRESET_PROMPTS.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.stylePrompt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === "all" || p.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleCopyStyle = (style: string, id: string) => {
    navigator.clipboard.writeText(style);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            Curated Hit Presets Library
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Proven, battle-tested Suno AI music style prompts across trending genres
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search presets e.g. Synthwave, Phonk..."
            className="w-full pl-9 pr-3 py-2 bg-black/30 border border-white/10 rounded-2xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Tag Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedTag("all")}
          className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap ${
            selectedTag === "all"
              ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
              : "bg-white/5 text-slate-400 hover:text-slate-200 border border-white/10"
          }`}
        >
          All Presets
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap ${
              selectedTag === tag
                ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                : "bg-white/5 text-slate-400 hover:text-slate-200 border border-white/10"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Presets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPresets.map((p) => (
          <div
            key={p.id}
            className="bg-black/20 border border-white/10 hover:border-cyan-500/40 rounded-2xl p-5 space-y-3 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-sm font-bold text-white">{p.title}</span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                  {p.bpm}
                </span>
              </div>

              <div className="mt-2 text-xs text-slate-300 font-medium">
                Genre: <span className="text-white font-bold">{p.genre}</span> • Vibe:{" "}
                <span className="text-white font-bold">{p.vibe}</span>
              </div>

              <div className="mt-3">
                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                  Style Prompt Box
                </span>
                <div className="bg-black/40 border border-white/10 rounded-xl p-3 font-mono text-xs text-cyan-200">
                  {p.stylePrompt}
                </div>
              </div>

              <p className="mt-2 text-xs italic text-slate-300 bg-black/30 p-2.5 rounded-xl border border-white/5">
                "{p.sampleHook}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10 gap-2">
              <button
                onClick={() => onLoadPreset(p)}
                className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold border border-white/10"
              >
                Load into Builder <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              </button>

              <button
                onClick={() => handleCopyStyle(p.stylePrompt, p.id)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
              >
                {copiedId === p.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedId === p.id ? "Copied!" : "Copy Style"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
