import React, { useState } from "react";
import { BookOpen, Search, Copy, Check, Info, Lightbulb } from "lucide-react";
import { METATAGS_LIST } from "../data/metatags";

export const MetatagsGuide: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Metatags" },
    { id: "structure", label: "Song Structure" },
    { id: "instrumental", label: "Solos & Riffs" },
    { id: "vocal", label: "Vocal Dynamics" },
    { id: "effect", label: "Effects & Transitions" },
  ];

  const filteredTags = METATAGS_LIST.filter((t) => {
    const matchesSearch =
      t.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopyTag = (tag: string) => {
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 2000);
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            Suno Metatags & Prompt Engineering Bible
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Master Suno AI's bracketed structure tags, sacred prompt strategies, and gravity-well counters based on the Suno Bible system
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search metatags e.g. [Guitar Solo]"
            className="w-full pl-9 pr-3 py-2 bg-black/30 border border-white/10 rounded-2xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "bg-white/5 text-slate-400 hover:text-slate-200 border border-white/10"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Metatags Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTags.map((t) => (
          <div
            key={t.tag}
            className="bg-black/20 border border-white/10 hover:border-cyan-500/30 rounded-2xl p-5 space-y-3 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-xl border border-cyan-500/20">
                {t.tag}
              </span>

              <button
                onClick={() => handleCopyTag(t.tag)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
              >
                {copiedTag === t.tag ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedTag === t.tag ? "Copied" : "Copy Tag"}
              </button>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed">{t.description}</p>

            <div className="bg-black/30 p-3 rounded-xl border border-white/5 text-[11px] space-y-1">
              <div className="flex items-center gap-1 text-cyan-300 font-bold">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Suno Pro Tip:
              </div>
              <p className="text-slate-300">{t.sunoTip}</p>
            </div>

            <div className="bg-black/40 p-3 rounded-xl font-mono text-[11px] text-slate-300 whitespace-pre-wrap border border-white/5">
              {t.example}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
