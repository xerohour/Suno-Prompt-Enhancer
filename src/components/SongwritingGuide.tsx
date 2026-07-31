import React from "react";
import { BookOpen, User, Film, Music, CheckCircle } from "lucide-react";

export const SongwritingGuide: React.FC = () => {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-8">
      <div className="pb-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-emerald-400" />
          The Art of Suno Songwriting
        </h2>
        <p className="text-xs text-slate-300 mt-1">
          From the Suno Bible: A Composer's Guide to Crafting Memorable Lyrics and Narratives
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Concepts */}
        <div className="bg-black/20 border border-white/10 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400">
            <User className="w-5 h-5" />
            <h3 className="font-bold text-sm">Define the Song's Soul</h3>
          </div>
          <p className="text-xs text-slate-300">
            Before writing a single word, you must first understand the song's purpose. What is the archetype?
          </p>
          <ul className="text-xs text-slate-300 space-y-2 mt-2">
            <li>• <strong className="text-white">The Narrative:</strong> Telling a story with a clear beginning, middle, and end.</li>
            <li>• <strong className="text-white">Emotional Snapshot:</strong> Capturing a single, powerful feeling or moment in time.</li>
            <li>• <strong className="text-white">Character Theme:</strong> Revealing a character's inner world or struggles.</li>
            <li>• <strong className="text-white">World-Builder:</strong> Creating atmospheric underscore for a place or scene.</li>
          </ul>
        </div>

        {/* Lyrical Techniques */}
        <div className="bg-black/20 border border-white/10 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-blue-400">
            <Music className="w-5 h-5" />
            <h3 className="font-bold text-sm">Lyrical Techniques for Impact</h3>
          </div>
          <ul className="text-xs text-slate-300 space-y-3">
            <li>
              <strong className="text-white block mb-1">Show, Don't Tell</strong>
              Instead of `I am sad`, write `The coffee's cold, the rain is tracing lines`.
            </li>
            <li>
              <strong className="text-white block mb-1">Syllable Stress & Rhythm</strong>
              Vary line length. The AI tries to sing exactly what you write, so a natural conversational meter is crucial.
            </li>
            <li>
              <strong className="text-white block mb-1">The Power of Repetition</strong>
              Repeat the most memorable line (the hook) two or three times within the chorus to drill it into the listener's memory.
            </li>
          </ul>
        </div>

        {/* The Director's Libretto (Instrumentals) */}
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-2xl p-5 space-y-4 md:col-span-2">
          <div className="flex items-center gap-2 text-emerald-300">
            <Film className="w-5 h-5" />
            <h3 className="font-bold text-sm">The Director's Libretto (For Instrumentals)</h3>
          </div>
          <p className="text-xs text-slate-300">
            For instrumental tracks, the lyrics box is not empty. It becomes a detailed script, a set of stage directions, or a storyboard for the AI orchestra.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="bg-black/40 p-3 rounded-xl border border-white/5">
              <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider block mb-2">Instead of Abstract...</span>
              <code className="text-xs text-slate-400 block mb-1">[Verse - add piano]</code>
              <code className="text-xs text-slate-400 block mb-1">[Build - more intense]</code>
              <code className="text-xs text-slate-400 block">[Drop - synth lead]</code>
            </div>
            <div className="bg-black/40 p-3 rounded-xl border border-white/5">
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block mb-2">Write Evocative Cues</span>
              <code className="text-xs text-emerald-100 block mb-1">(a lone, distant piano, melancholic three-note melody)</code>
              <code className="text-xs text-emerald-100 block mb-1">(deep war drum, pulsing, growing faster)</code>
              <code className="text-xs text-emerald-100 block">(distorted, angry synth lead, full of static)</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
