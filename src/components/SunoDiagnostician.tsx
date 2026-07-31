import React, { useState } from "react";
import { Activity, Search, AlertCircle, Zap, RefreshCw } from "lucide-react";

interface Diagnosis {
  issue: string;
  cause: string;
  fix: string;
  icon: React.ElementType;
}

const FAILURE_MODES: Diagnosis[] = [
  {
    issue: "Sounds Too Pop",
    cause: "Pop Gravity Well. Pop is Suno's latent default; it pulls everything toward itself unless countered.",
    fix: "Add 'no pop, no hooks, raw' to your style tags, or use a strong producer anchor like 'Rick Rubin'.",
    icon: Activity
  },
  {
    issue: "Sounds Generic or Bland",
    cause: "Vague Prompting. You haven't anchored the AI to a specific era, producer, or distinctive instrumentation.",
    fix: "Add a decade (e.g. '1990s'), a producer anchor (e.g. 'produced by George Martin'), and 5-7 specific instruments.",
    icon: Search
  },
  {
    issue: "Wrong Vocal Style",
    cause: "Weak Vocal Tag. Saying 'male vocals' is not enough information.",
    fix: "Detail the gender, nationality, range, and tone. e.g. 'Male British vocals, soaring high tenor, breathy'.",
    icon: AlertCircle
  },
  {
    issue: "Audio Sounds Compressed or Lo-Fi",
    cause: "Default Production. The AI defaults to a safe, sometimes murky mix unless told otherwise.",
    fix: "Append Quality Metadata to your style prompt: '[high-fidelity, 24-bit 192kHz, wide stereo, pristine mastering]'.",
    icon: Zap
  },
  {
    issue: "Missing Instrumentation",
    cause: "Underspecified Arrangement. The AI will guess if you don't explicitly list what's playing.",
    fix: "List 5-7 specific instruments (e.g. 'analog synth bass, heavy 808s, electric piano, driving hi-hats').",
    icon: Search
  },
  {
    issue: "Wrong Era Feel",
    cause: "No Decade Specified. Era is the single most powerful signal to the AI.",
    fix: "Always include the decade at the very beginning of your prompt (e.g. '1970s', '2010s').",
    icon: RefreshCw
  },
  {
    issue: "Over-Produced or Too Clean",
    cause: "v4.5/v5.5 Cleanup. The newer models default heavily to high-fidelity, polished audio and resist lo-fi aesthetics.",
    fix: "Use aggressive anti-clean tags (e.g., 'analog distortion, lo-fi cassette tape, bleed, noise'). If it still resists, revert to v3.5.",
    icon: Zap
  }
];

export const SunoDiagnostician: React.FC = () => {
  const [selectedIssue, setSelectedIssue] = useState<Diagnosis | null>(null);

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
      <div className="pb-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-amber-400" />
          Suno AI Failure Diagnostician
        </h2>
        <p className="text-xs text-slate-300 mt-1">
          Select the problem with your generated song to see the Suno Bible solution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FAILURE_MODES.map((mode) => (
          <button
            key={mode.issue}
            onClick={() => setSelectedIssue(mode)}
            className={`p-4 rounded-2xl text-left border transition-all ${
              selectedIssue?.issue === mode.issue
                ? "bg-amber-500/20 border-amber-500 text-white"
                : "bg-black/20 border-white/10 text-slate-300 hover:bg-white/10"
            }`}
          >
            <div className="flex items-center gap-3">
              <mode.icon className={`w-5 h-5 ${selectedIssue?.issue === mode.issue ? "text-amber-400" : "text-slate-400"}`} />
              <span className="font-bold text-sm">{mode.issue}</span>
            </div>
          </button>
        ))}
      </div>

      {selectedIssue && (
        <div className="bg-black/40 border border-amber-500/30 rounded-2xl p-6 mt-6 space-y-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-amber-300">Diagnosis: {selectedIssue.cause}</h3>
              <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">The Fix:</span>
                <p className="text-slate-200 leading-relaxed font-semibold text-sm">
                  {selectedIssue.fix}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
