import React from "react";
import { Cpu, Zap, Sliders, Activity, Workflow, Info } from "lucide-react";

export const ModelComparison: React.FC = () => {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-6 h-6 text-fuchsia-400" />
            Suno Engine Capabilities (v4.5 – v5.5)
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Understanding model evolution to optimize your prompting strategy
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* v3.5 */}
        <div className="bg-black/20 border border-white/10 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400">
            <Activity className="w-5 h-5" />
            <h3 className="font-bold text-sm">v3.5 (Legacy Raw)</h3>
          </div>
          <ul className="text-xs text-slate-300 space-y-2">
            <li>• <strong className="text-slate-100">Vibe-driven:</strong> Emotionally authentic, requires less complex prompting.</li>
            <li>• <strong className="text-slate-100">Gritty aesthetic:</strong> Naturally leans toward raw, unpolished, or lo-fi audio.</li>
            <li>• <strong className="text-slate-100">Lengths:</strong> Up to 4 minutes generation.</li>
            <li>• <strong className="text-slate-100">Trade-offs:</strong> Complex arrangements can suffer from "tinny" or messy audio fidelity.</li>
          </ul>
        </div>

        {/* v4.5 */}
        <div className="bg-black/20 border border-white/10 rounded-2xl p-5 space-y-4 relative">
          <div className="absolute top-0 right-0 px-2 py-1 bg-white/10 rounded-bl-lg rounded-tr-lg text-[9px] font-bold text-slate-400">
            STABLE
          </div>
          <div className="flex items-center gap-2 text-blue-400">
            <Workflow className="w-5 h-5" />
            <h3 className="font-bold text-sm">v4.5+ (Studio Polish)</h3>
          </div>
          <ul className="text-xs text-slate-300 space-y-2">
            <li>• <strong className="text-slate-100">Studio Grade:</strong> Polished mix balance and crystal-clear vocal fidelity.</li>
            <li>• <strong className="text-slate-100">Prompt Obedience:</strong> Handles complex genre mashups (e.g., "midwest emo + neosoul").</li>
            <li>• <strong className="text-slate-100">Lengths:</strong> Epic tracks up to 8 minutes.</li>
            <li>• <strong className="text-slate-100">Trade-offs:</strong> Default output is heavily "cleaned up", requiring aggressive negative prompting for lo-fi/raw styles.</li>
          </ul>
        </div>

        {/* v5.5 */}
        <div className="bg-black/20 border border-fuchsia-500/30 rounded-2xl p-5 space-y-4 relative shadow-[0_0_15px_rgba(217,70,239,0.1)]">
          <div className="absolute top-0 right-0 px-2 py-1 bg-fuchsia-500/20 text-fuchsia-300 rounded-bl-lg rounded-tr-lg text-[9px] font-bold">
            FLAGSHIP
          </div>
          <div className="flex items-center gap-2 text-fuchsia-400">
            <Zap className="w-5 h-5" />
            <h3 className="font-bold text-sm">v5.5 (Personalization)</h3>
          </div>
          <ul className="text-xs text-slate-300 space-y-2">
            <li>• <strong className="text-slate-100">Voice Cloning:</strong> Use your own verified voice; prompt strictly for delivery cues, not timbre.</li>
            <li>• <strong className="text-slate-100">Stem Extraction:</strong> Extract up to 12 time-aligned WAV stems.</li>
            <li>• <strong className="text-slate-100">Vector Prompting:</strong> Requires layered prompting (Core, Timbre, Atmos, Constraints). Vague tags yield flat results.</li>
            <li>• <strong className="text-slate-100">Synonym Penalty:</strong> Fails on redundant tags (e.g., "sad, depressing"). Use distinct instructions.</li>
          </ul>
        </div>
      </div>

      <div className="p-4 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-xl flex items-start gap-3">
        <Info className="w-5 h-5 text-fuchsia-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-fuchsia-300 uppercase tracking-wider mb-1">
            Prompting Strategy for v5.5
          </h4>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Unlike v3.5 which thrived on random tag dumping, v5.5 acts as a strict tokenizer. 
            Front-load your most important genre descriptors. The internal AI engine weights the 
            beginning of your prompt heaviest. When using <strong>Voice Cloning</strong>, 
            do not waste characters describing vocal tone (e.g., "husky baritone")—the model 
            will inherit your upload. Instead, focus entirely on <em>delivery modifiers</em> 
            (e.g., "whispered, breathless, frantic, belted").
          </p>
        </div>
      </div>
    </div>
  );
};
