import React from "react";
import { BookOpen, Zap, ShieldAlert, ListChecks, Clock, Target } from "lucide-react";

export const BibleCheatsheet: React.FC = () => {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-white/10 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            Suno AI Cheatsheet & Sacred Strategies
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            The 30-Second Quick Reference from the Suno Prompt Engineering Bible.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Universal Formula */}
        <div className="bg-black/30 border border-white/10 rounded-2xl p-5 space-y-4">
          <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
            <Target className="w-5 h-5" />
            The Universal Formula
          </h3>
          <div className="bg-black/50 p-3 rounded-xl border border-white/5 font-mono text-[11px] text-fuchsia-300">
            [decade], [genre], [subgenre], [country], [vocalist info], [style + mood + instruments + production]
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-slate-100">Example:</strong> 1970s, rock, progressive rock, UK, male British vocals, epic and mystical, lush guitars, analog synths, warm analog grit, wide stereo.
          </p>
        </div>

        {/* 30-Second Prompt Writing */}
        <div className="bg-black/30 border border-white/10 rounded-2xl p-5 space-y-3">
          <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            30-Second Prompting
          </h3>
          <ol className="text-xs text-slate-300 list-decimal list-inside space-y-1.5 ml-1">
            <li><strong>Pick era:</strong> "1970s" or "2010s"</li>
            <li><strong>Pick genre:</strong> "rock" or "pop" or "hip-hop"</li>
            <li><strong>Add subgenre:</strong> "progressive" or "indie"</li>
            <li><strong>Pick vocalist:</strong> "male British vocals"</li>
            <li><strong>Add 3 moods:</strong> "epic, mystical, energetic"</li>
            <li><strong>Add 3 instruments:</strong> "guitars, drums, keyboards"</li>
            <li><strong>Counter pop:</strong> "no pop hooks, raw" (if needed)</li>
            <li><strong>Add production:</strong> "warm analog, wide stereo"</li>
          </ol>
        </div>

        {/* The 7 Sacred Strategies */}
        <div className="bg-black/30 border border-white/10 rounded-2xl p-5 space-y-4 md:col-span-2">
          <h3 className="text-lg font-bold text-fuchsia-300 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            The 7 Sacred Strategies
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <strong className="text-xs text-slate-100 block">1. Avoid Gravity Wells</strong>
              <p className="text-[11px] text-slate-400">Don't use 'pop, bass, beat, hook, catchy' unless making a pop song.</p>
            </div>
            <div className="space-y-1">
              <strong className="text-xs text-slate-100 block">2. Force Exclusions</strong>
              <p className="text-[11px] text-slate-400">Ex. "90s hip hop, boom bap, no trap, no modern production".</p>
            </div>
            <div className="space-y-1">
              <strong className="text-xs text-slate-100 block">3. Contrast Stacking</strong>
              <p className="text-[11px] text-slate-400">Combine odd genres (e.g., "bluegrass synthwave", "math rock gospel").</p>
            </div>
            <div className="space-y-1">
              <strong className="text-xs text-slate-100 block">4. Clarify Weak Tags</strong>
              <p className="text-[11px] text-slate-400">Expand "grunge" into "90s grunge rock, alternative, heavy metal".</p>
            </div>
            <div className="space-y-1">
              <strong className="text-xs text-slate-100 block">5. Producer Anchors</strong>
              <p className="text-[11px] text-slate-400">Add "Produced by Rick Rubin" for raw, or "Quincy Jones" for pop.</p>
            </div>
            <div className="space-y-1">
              <strong className="text-xs text-slate-100 block">6. Quality Metadata in Lyrics</strong>
              <p className="text-[11px] text-slate-400">Put <code>[Produced by Rick Rubin]</code> at the top of your lyrics.</p>
            </div>
            <div className="space-y-1 sm:col-span-2 lg:col-span-3">
              <strong className="text-xs text-slate-100 block">7. Lyrical Anchoring</strong>
              <p className="text-[11px] text-slate-400">Match the genre's language: Rock = "riffs, solo". Hip-Hop = "bars, flow, drop". Soul = "groove, vocal runs".</p>
            </div>
          </div>
        </div>

        {/* Pre-Generation Checklist */}
        <div className="bg-black/30 border border-white/10 rounded-2xl p-5 space-y-3">
          <h3 className="text-lg font-bold text-green-300 flex items-center gap-2">
            <ListChecks className="w-5 h-5" />
            Pre-Gen Checklist
          </h3>
          <ul className="text-xs text-slate-300 space-y-2">
            <li className="flex items-start gap-2"><CheckboxIcon /> <span><strong>Era specified?</strong> (decade or year range)</span></li>
            <li className="flex items-start gap-2"><CheckboxIcon /> <span><strong>Vocalist clear?</strong> (male/female/instrumental)</span></li>
            <li className="flex items-start gap-2"><CheckboxIcon /> <span><strong>5-7 style descriptors?</strong> (not too many)</span></li>
            <li className="flex items-start gap-2"><CheckboxIcon /> <span><strong>Pop gravity countered?</strong> (if not pop)</span></li>
            <li className="flex items-start gap-2"><CheckboxIcon /> <span><strong>Generating variations?</strong> (3-5 minimum)</span></li>
          </ul>
        </div>

        {/* Temporal Optimization */}
        <div className="bg-black/30 border border-white/10 rounded-2xl p-5 space-y-3">
          <h3 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Temporal Optimization
          </h3>
          <div className="space-y-3">
            <div>
              <strong className="text-xs text-slate-100 block">Peak Performance Window</strong>
              <p className="text-[11px] text-slate-400">BEST: 3:00 AM - 4:30 AM (Local Time). AVOID: 8 AM - 10 PM.</p>
            </div>
            <div>
              <strong className="text-xs text-slate-100 block">Visual Quality Prediction</strong>
              <p className="text-[11px] text-slate-400">High-quality visual thumbnail = Higher audio quality. Regenerate if blurry.</p>
            </div>
            <div>
              <strong className="text-xs text-slate-100 block">Variance Strategy</strong>
              <p className="text-[11px] text-slate-400">Expect a Power-law distribution (1 great : 3 good : 1 ok).</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const CheckboxIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400 mt-0.5 shrink-0">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
