import React, { useState } from "react";
import { Bookmark, Search, Copy, Check, Trash2, Download, Music2 } from "lucide-react";
import { SunoPromptResult } from "../types";

interface SavedPromptsProps {
  savedList: SunoPromptResult[];
  onRemove: (id: string) => void;
  onSelectSaved: (item: SunoPromptResult) => void;
}

export const SavedPrompts: React.FC<SavedPromptsProps> = ({
  savedList,
  onRemove,
  onSelectSaved,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredList = savedList.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.stylePromptShort.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lyrics.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleCopyStyle = (style: string, id: string) => {
    navigator.clipboard.writeText(style);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportAllJSON = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(savedList, null, 2)], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = `Suno_Prompts_Library_Export.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-cyan-400" />
            Saved Prompts Library ({savedList.length})
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Access, view, copy, and manage your saved Suno AI song prompts and lyrics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-56">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search library..."
              className="w-full pl-9 pr-3 py-2 bg-black/30 border border-white/10 rounded-2xl text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {savedList.length > 0 && (
            <button
              onClick={handleExportAllJSON}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold whitespace-nowrap border border-white/10"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" /> Export All JSON
            </button>
          )}
        </div>
      </div>

      {/* List / Empty State */}
      {filteredList.length === 0 ? (
        <div className="text-center py-12 text-slate-400 space-y-2">
          <Bookmark className="w-10 h-10 mx-auto stroke-1 text-slate-500" />
          <p className="text-sm font-semibold text-slate-300">No saved Suno prompts yet.</p>
          <p className="text-xs text-slate-400">
            Generate prompts in the Architect or Hook Lab and click "Save" to build your song library.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredList.map((item) => (
            <div
              key={item.id}
              className="bg-black/20 border border-white/10 hover:border-cyan-500/40 rounded-2xl p-5 space-y-3 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Music2 className="w-4 h-4 text-cyan-400" />
                    {item.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
                  </span>
                </div>

                <div className="mt-2 text-xs text-slate-300">
                  BPM: <span className="text-cyan-300 font-bold">{item.bpm}</span> • Key:{" "}
                  <span className="text-cyan-300 font-bold">{item.musicalKey}</span>
                </div>

                <div className="mt-3">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                    Style Prompt
                  </span>
                  <div className="bg-black/40 border border-white/10 rounded-xl p-3 font-mono text-xs text-cyan-200">
                    {item.stylePromptShort}
                  </div>
                </div>

                <p className="mt-2 text-xs italic text-slate-300 bg-black/30 p-2.5 rounded-xl border border-white/5 line-clamp-2">
                  "{item.hook}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10 gap-2">
                <button
                  onClick={() => onSelectSaved(item)}
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold border border-white/10"
                >
                  View Full Song & Lyrics
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopyStyle(item.stylePromptShort, item.id || "")}
                    className="p-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl transition-all shadow-md font-bold"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => onRemove(item.id || "")}
                    className="p-2 bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-xl border border-white/10 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
