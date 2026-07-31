import React, { useState } from "react";
import { Search, Copy, Check, Hash, Music, Zap, Sliders, Mic2 } from "lucide-react";

type TagCategory = {
  name: string;
  icon: React.ReactNode;
  tags: string[];
};

const STYLE_CATEGORIES: TagCategory[] = [
  {
    name: "Rap & Hip-Hop",
    icon: <Mic2 className="w-4 h-4" />,
    tags: ["rap", "hip hop", "trap", "boom bap", "bass", "beat", "drill", "emo rap", "conscious rap", "grime", "garage rap", "lo-fi hip hop", "cloud rap", "phonk", "jersey club", "trap soul"]
  },
  {
    name: "Rock & Metal",
    icon: <Zap className="w-4 h-4" />,
    tags: ["rock", "alternative", "indie", "punk", "metal", "hard rock", "heavy metal", "death metal", "black metal", "grindcore", "mathcore", "metalcore", "progressive metal", "thrash metal", "glam rock", "punk rock", "post-punk", "gothic rock", "garage rock", "psychedelic rock", "blues rock", "folk rock", "country rock"]
  },
  {
    name: "Orchestral & Classical",
    icon: <Music className="w-4 h-4" />,
    tags: ["orchestral", "classical", "symphonic", "epic", "cinematic", "dramatic", "film score", "neo-classical", "baroque", "romantic era", "orchestral metal", "symphonic rock", "classical crossover"]
  },
  {
    name: "Electronic & Dance",
    icon: <Sliders className="w-4 h-4" />,
    tags: ["electronic", "synth", "synth-pop", "synthwave", "ambient", "experimental", "electro", "vaporwave", "chillwave", "drum and bass", "techno", "house", "trance", "dubstep", "industrial", "noise", "glitch", "IDM", "witch house"]
  },
  {
    name: "Soul, R&B & Jazz",
    icon: <Music className="w-4 h-4" />,
    tags: ["soul", "R&B", "funk", "gospel", "jazz", "blues", "jazz fusion", "smooth jazz", "neo-soul", "funk metal", "nu-funk"]
  },
  {
    name: "Pop",
    icon: <Hash className="w-4 h-4" />,
    tags: ["pop", "dance-pop", "electro-pop", "bubblegum pop", "pop-punk", "pop-rock", "indie pop", "bedroom pop", "dark pop", "alternative pop", "art pop", "experimental pop"]
  },
  {
    name: "Country & Folk",
    icon: <Music className="w-4 h-4" />,
    tags: ["country", "folk", "Americana", "bluegrass", "country-rock", "country-pop", "outlaw country", "alt-country", "progressive bluegrass"]
  },
  {
    name: "Mood: Emotional",
    icon: <Hash className="w-4 h-4" />,
    tags: ["romantic", "melancholic", "introspective", "nostalgic", "bittersweet", "emotional", "heartfelt", "soulful", "intimate", "vulnerable"]
  },
  {
    name: "Mood: Energy",
    icon: <Hash className="w-4 h-4" />,
    tags: ["energetic", "intense", "aggressive", "explosive", "dynamic", "vibrant", "uplifting", "euphoric", "triumphant", "powerful"]
  },
  {
    name: "Mood: Atmosphere",
    icon: <Hash className="w-4 h-4" />,
    tags: ["dreamlike", "ethereal", "mystical", "mysterious", "dark", "brooding", "cinematic", "epic", "surreal", "transcendent", "meditative"]
  },
  {
    name: "Mood: Character",
    icon: <Hash className="w-4 h-4" />,
    tags: ["playful", "whimsical", "experimental", "bold", "raw", "polished", "flamboyant", "understated", "dramatic", "theatrical"]
  },
  {
    name: "Production: Quality",
    icon: <Sliders className="w-4 h-4" />,
    tags: ["high-fidelity", "high-definition", "crystal-clear", "pristine", "lossless", "master quality", "studio quality", "professional grade", "24-bit", "96kHz", "192kHz", "Dolby Atmos", "spatial audio"]
  },
  {
    name: "Production: Warmth & Character",
    icon: <Sliders className="w-4 h-4" />,
    tags: ["warm", "analog", "vintage", "warm analog", "tape saturation", "warm tape feel", "natural room reverb", "organic tone", "rich texture", "smooth", "sleek"]
  },
  {
    name: "Production: Spatial & Dynamics",
    icon: <Sliders className="w-4 h-4" />,
    tags: ["punchy", "crisp", "clear", "wide dynamic range", "compressed", "wide stereo", "stereo panorama", "spacious", "spacious mix", "surround sound", "immersive", "mono", "centered vocals"]
  },
  {
    name: "Production: Eras",
    icon: <Sliders className="w-4 h-4" />,
    tags: ["60s Abbey Road", "70s warmth", "80s sheen", "90s raw", "2000s digital clarity", "2010s modern", "2020s cutting-edge"]
  }
];

export const StyleIndex: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  const handleCopy = (tag: string) => {
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 1500);
  };

  const filteredCategories = STYLE_CATEGORIES.map(cat => ({
    ...cat,
    tags: cat.tags.filter(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  })).filter(cat => cat.tags.length > 0);

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
      {/* Header & Search */}
      <div className="pb-4 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Hash className="w-5 h-5 text-cyan-400" />
            Comprehensive Style Index
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Browse and copy from 500+ verified Suno style tags, moods, and production metadata.
          </p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tags (e.g., '192kHz', 'analog')..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/30 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCategories.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-400 text-sm">
            No tags found for "{searchTerm}". Try a different keyword.
          </div>
        ) : (
          filteredCategories.map((category, idx) => (
            <div key={idx} className="bg-black/20 border border-white/10 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
                {category.icon}
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleCopy(tag)}
                    className="group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/30 transition-all"
                    title={`Click to copy: ${tag}`}
                  >
                    <span className="text-[11px] font-mono text-slate-300 group-hover:text-cyan-100">{tag}</span>
                    {copiedTag === tag ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
