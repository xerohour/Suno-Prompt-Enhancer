import React, { useState } from "react";
import { Wand2, Copy, Check, Flame, RefreshCw, Music2 } from "lucide-react";
import { HookIdea } from "../types";
import { PRIMARY_GENRES, MOODS } from "../data/genres";

interface HookGeneratorModalProps {
  onSelectHook?: (hookText: string) => void;
}

export const HookGeneratorModal: React.FC<HookGeneratorModalProps> = ({ onSelectHook }) => {
  const [topic, setTopic] = useState("");
  const [genre, setGenre] = useState(PRIMARY_GENRES[0]);
  const [mood, setMood] = useState(MOODS[0]);
  const [hooks, setHooks] = useState<HookIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleGenerateHooks = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setHooks([]);

    try {
      const res = await fetch("/api/generate-hook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, genre, mood, count: 4 }),
      });
      const data = await res.json();
      if (data.success && data.hooks) {
        setHooks(data.hooks);
      }
    } catch (err) {
      console.error("Generate hook error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyHook = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-cyan-400" />
          Hook Generator Lab
        </h2>
        <p className="text-xs text-slate-300 mt-1">
          Generate irresistible, viral song hooks and earworm choruses specifically structured for Suno AI
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleGenerateHooks} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-3">
          <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
            Song Concept or Theme
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Late night highway racing, unrequited love, standing up against the odds..."
            className="w-full bg-black/20 border border-white/10 rounded-2xl p-3.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Genre
          </label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full bg-black/30 border border-white/10 rounded-2xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            {PRIMARY_GENRES.map((g) => (
              <option key={g} value={g} className="bg-slate-900 text-slate-100">
                {g}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Vibe / Mood
          </label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full bg-black/30 border border-white/10 rounded-2xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            {MOODS.map((m) => (
              <option key={m} value={m} className="bg-slate-900 text-slate-100">
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xl shadow-cyan-500/20 active:scale-95 disabled:opacity-50"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Flame className="w-4 h-4 fill-current text-cyan-200" />
            )}
            {isLoading ? "Crafting Hooks..." : "Generate 4 Viral Hooks"}
          </button>
        </div>
      </form>

      {/* Generated Hooks Output Grid */}
      {hooks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {hooks.map((h, idx) => (
            <div
              key={idx}
              className="bg-black/20 border border-white/10 hover:border-cyan-500/40 rounded-2xl p-5 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                    <Music2 className="w-3.5 h-3.5" /> {h.title}
                  </span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/10 font-semibold">
                    {h.vibe}
                  </span>
                </div>

                <p className="text-sm font-semibold text-white italic my-3 bg-black/40 p-4 rounded-xl border border-white/5">
                  "{h.hookText}"
                </p>

                <div className="bg-black/30 p-2.5 rounded-xl text-[11px] font-mono text-cyan-300 border border-white/5">
                  {h.metatagSnippet}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                {h.rhymeScheme && (
                  <span className="text-[10px] text-slate-400 font-semibold">Rhyme: {h.rhymeScheme}</span>
                )}
                <button
                  onClick={() => handleCopyHook(h.hookText, idx)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs ml-auto shadow-md"
                >
                  {copiedIdx === idx ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedIdx === idx ? "Copied!" : "Copy Hook"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
