import React, { useState } from "react";
import { UserCheck, Search, Copy, Check, Sparkles, ExternalLink, Disc } from "lucide-react";
import { ARTIST_DATABASE } from "../data/artistDatabase";
import { ArtistReplica } from "../types";

interface ArtistReplicasProps {
  onUseArtistPrompt: (prompt: string, genre: string) => void;
}

export const ArtistReplicas: React.FC<ArtistReplicasProps> = ({ onUseArtistPrompt }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEra, setSelectedEra] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const eras = ["all", "1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s"];

  const filteredArtists = ARTIST_DATABASE.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
      a.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.producer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEra = selectedEra === "all" || a.era === selectedEra;
    return matchesSearch && matchesEra;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-cyan-400" />
            Suno Bible Artist Replicas & Iconic Prompts
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            40+ production-verified Suno AI prompt replicas based on legendary artists and iconic producers
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Beatles, Quincy Jones, 80s..."
            className="w-full pl-9 pr-3 py-2 bg-black/30 border border-white/10 rounded-2xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Era Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {eras.map((era) => (
          <button
            key={era}
            onClick={() => setSelectedEra(era)}
            className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedEra === era
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "bg-white/5 text-slate-400 hover:text-slate-200 border border-white/10"
            }`}
          >
            {era === "all" ? "All Eras" : era}
          </button>
        ))}
      </div>

      {/* Artist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredArtists.map((artist) => (
          <div
            key={artist.id}
            className="bg-black/20 border border-white/10 hover:border-cyan-500/30 rounded-2xl p-5 space-y-4 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    {artist.name}
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      {artist.era}
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Producer Anchor: <span className="text-slate-200 font-semibold">{artist.producer}</span>
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-black/30 p-3 rounded-xl border border-white/5">
                {artist.description}
              </p>

              <div>
                <span className="block text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  Suno Style Box Prompt (Suno Bible Formula)
                </span>
                <div className="bg-black/40 p-3 rounded-xl font-mono text-[11px] text-cyan-200 border border-white/10 leading-relaxed max-h-28 overflow-y-auto">
                  {artist.prompt}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
              <button
                onClick={() => handleCopy(artist.prompt, artist.id)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold transition-all border border-white/10"
              >
                {copiedId === artist.id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-300" />}
                {copiedId === artist.id ? "Copied!" : "Copy Style Prompt"}
              </button>

              <button
                onClick={() => onUseArtistPrompt(artist.prompt, artist.genres[0] || "Rock")}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Load into Enhancer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
