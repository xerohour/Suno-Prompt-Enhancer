import React from "react";
import { Sparkles, Music2, BookOpen, Layers, Bookmark, Wand2, Disc } from "lucide-react";
import { SunoVersion } from "../types";

interface HeaderProps {
  activeTab: "enhancer" | "hook" | "mixer" | "metatags" | "presets" | "saved";
  setActiveTab: (tab: "enhancer" | "hook" | "mixer" | "metatags" | "presets" | "saved") => void;
  sunoVersion: SunoVersion;
  setSunoVersion: (v: SunoVersion) => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  sunoVersion,
  setSunoVersion,
  savedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/5 backdrop-blur-md border-b border-white/10 px-4 py-3.5 shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-fuchsia-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Music2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                SunoPrompt<span className="text-cyan-400 font-black">AI</span>
              </h1>
              <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-semibold">
                Suno AI Studio
              </span>
            </div>
            <p className="text-xs text-slate-300">
              AI Music Prompt Enhancer & Lyric Metatag Architect
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-white/5 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 overflow-x-auto max-w-full">
          {[
            { id: "enhancer", label: "Prompt Enhancer", icon: Sparkles },
            { id: "hook", label: "Hook Lab", icon: Wand2 },
            { id: "mixer", label: "Genre Blender", icon: Disc },
            { id: "metatags", label: "Metatags Cheat Sheet", icon: BookOpen },
            { id: "presets", label: "Hit Presets", icon: Layers },
            { id: "saved", label: "Library", icon: Bookmark, badge: savedCount },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 font-bold"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-cyan-200" />
                {tab.label}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-fuchsia-500/30 text-fuchsia-200 rounded-full font-bold border border-fuchsia-400/30">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Suno Target Engine Version Switcher */}
        <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/10 text-xs text-slate-300">
          <span className="text-slate-400 font-medium hidden sm:inline">Suno Target:</span>
          <div className="flex items-center gap-1">
            {(["v3", "v3.5", "v4"] as SunoVersion[]).map((v) => (
              <button
                key={v}
                onClick={() => setSunoVersion(v)}
                className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                  sunoVersion === v
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
