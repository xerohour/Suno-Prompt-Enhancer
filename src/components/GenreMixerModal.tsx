import React, { useState } from "react";
import { Disc, Copy, Check, Sparkles, RefreshCw, Music } from "lucide-react";
import { GenreFusionResult } from "../types";
import { PRIMARY_GENRES } from "../data/genres";

export const GenreMixerModal: React.FC = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([PRIMARY_GENRES[0], PRIMARY_GENRES[1]]);
  const [fusion, setFusion] = useState<GenreFusionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleGenre = (g: string) => {
    if (selectedGenres.includes(g)) {
      if (selectedGenres.length > 1) {
        setSelectedGenres((prev) => prev.filter((item) => item !== g));
      }
    } else {
      if (selectedGenres.length < 3) {
        setSelectedGenres((prev) => [...prev, g]);
      }
    }
  };

  const handleMix = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/mix-genres", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genres: selectedGenres }),
      });
      const data = await res.json();
      if (data.success && data.fusion) {
        setFusion(data.fusion);
      }
    } catch (err) {
      console.error("Mix genres error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyStyle = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Disc className="w-5 h-5 text-cyan-400" />
          Genre Fusion Blender
        </h2>
        <p className="text-xs text-slate-300 mt-1">
          Combine up to 3 distinct music genres into a cohesive, high-impact Suno style prompt
        </p>
      </div>

      {/* Selector Grid */}
      <div>
        <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
          Select 2 to 3 Genres to Blend ({selectedGenres.length}/3 selected):
        </label>
        <div className="flex flex-wrap gap-2">
          {PRIMARY_GENRES.map((g) => {
            const isSelected = selectedGenres.includes(g);
            return (
              <button
                key={g}
                onClick={() => toggleGenre(g)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 border border-cyan-400 active:scale-95"
                    : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
                }`}
              >
                {isSelected ? `✓ ${g}` : g}
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={handleMix}
        disabled={isLoading || selectedGenres.length < 2}
        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 text-white font-bold text-xs shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
      >
        {isLoading ? (
          <RefreshCw className="w-4 h-4 animate-spin" />
        ) : (
          <Sparkles className="w-4 h-4 fill-current" />
        )}
        {isLoading ? "Blending Genre Textures..." : `Fuse ${selectedGenres.length} Genres`}
      </button>

      {/* Fusion Result Display */}
      {fusion && (
        <div className="bg-black/20 border border-white/10 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">
                Hybrid Genre Creation
              </span>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Music className="w-4 h-4 text-cyan-400" />
                {fusion.fusionName}
              </h3>
            </div>
            <button
              onClick={() => handleCopyStyle(fusion.stylePrompt)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied Prompt!" : "Copy Style Prompt"}
            </button>
          </div>

          <div>
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Suno Style Prompt Box
            </span>
            <div className="bg-black/40 border border-white/10 rounded-2xl p-3.5 font-mono text-sm text-cyan-200">
              {fusion.stylePrompt}
            </div>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed bg-black/30 p-3.5 rounded-2xl border border-white/5">
            {fusion.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-black/30 p-3.5 rounded-2xl border border-white/10">
              <span className="text-slate-400 font-semibold block mb-1">Recommended Vocal Style:</span>
              <span className="text-slate-200 font-bold">{fusion.vocalSuggestions}</span>
            </div>
            <div className="bg-black/30 p-3.5 rounded-2xl border border-white/10">
              <span className="text-slate-400 font-semibold block mb-1">Suggested BPM:</span>
              <span className="text-cyan-300 font-bold">{fusion.exampleBpm}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
