import React, { useState } from "react";
import {
  Copy,
  Check,
  Bookmark,
  Download,
  Play,
  Pause,
  Sparkles,
  Music2,
  ListMusic,
  Lightbulb,
  FileText,
  Volume2,
  Edit3,
  Flame,
  Key,
  Activity,
  Layers,
} from "lucide-react";
import { SunoPromptResult } from "../types";

interface EnhancementOutputProps {
  result: SunoPromptResult;
  onSave: (res: SunoPromptResult) => void;
  isSaved: boolean;
}

export const EnhancementOutput: React.FC<EnhancementOutputProps> = ({
  result,
  onSave,
  isSaved,
}) => {
  const [copiedStyleShort, setCopiedStyleShort] = useState(false);
  const [copiedStyleExpanded, setCopiedStyleExpanded] = useState(false);
  const [copiedLyrics, setCopiedLyrics] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedHook, setCopiedHook] = useState(false);
  const [copiedArt, setCopiedArt] = useState(false);

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  const [lyricsText, setLyricsText] = useState(result.lyrics);
  const [isEditingLyrics, setIsEditingLyrics] = useState(false);

  // Copy helper
  const handleCopy = (text: string, setFn: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  // Copy full master prompt for Suno
  const handleCopyFullMaster = () => {
    const fullMaster = `=== SUNO STYLE PROMPT ===\n${result.stylePromptShort}\n\n=== SUNO LYRICS WITH METATAGS ===\n${lyricsText}`;
    handleCopy(fullMaster, setCopiedAll);
  };

  // Download TXT
  const handleDownloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob(
      [
        `TITLE: ${result.title}\nBPM: ${result.bpm}\nKEY: ${result.musicalKey}\nVOCAL: ${result.vocalDescription}\n\n=== STYLE PROMPT (SHORT) ===\n${result.stylePromptShort}\n\n=== STYLE PROMPT (EXPANDED) ===\n${result.stylePromptExpanded}\n\n=== ALBUM ART PROMPT ===\n${result.albumArtPrompt || "N/A"}\n\n=== CATCHY HOOK ===\n${result.hook}\n\n=== LYRICS ===\n${lyricsText}\n\n=== SUNO PRO TIPS ===\n${result.sunoTips.join("\n")}`,
      ],
      { type: "text/plain" }
    );
    element.href = URL.createObjectURL(file);
    element.download = `${result.title.replace(/\s+/g, "_")}_Suno_Prompt.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // TTS Speech Audition for Hook
  const handleAudioAudition = async () => {
    if (isPlayingAudio) {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
      return;
    }

    setAudioError(null);
    setIsPlayingAudio(true);

    try {
      // Try Gemini TTS server route first
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: result.hook }),
      });
      const data = await res.json();

      if (data.success && data.audioBase64) {
        // Play binary audio
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
          sampleRate: 24000,
        });
        const binary = atob(data.audioBase64);
        const len = binary.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binary.charCodeAt(i);
        }

        // Decode PCM / WAV
        audioCtx.decodeAudioData(
          bytes.buffer,
          (buffer) => {
            const source = audioCtx.createBufferSource();
            source.buffer = buffer;
            source.connect(audioCtx.destination);
            source.onended = () => setIsPlayingAudio(false);
            source.start(0);
          },
          () => {
            // Fallback to Web Speech API
            playWebSpeech(result.hook);
          }
        );
        return;
      }
    } catch (err) {
      console.warn("Server TTS failed, using Web Speech API fallback:", err);
    }

    // Fallback to Web Speech API
    playWebSpeech(result.hook);
  };

  const playWebSpeech = (text: string) => {
    if (!("speechSynthesis" in window)) {
      setAudioError("Browser speech playback not supported.");
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.1;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setAudioError("Audio playback error.");
    };

    window.speechSynthesis.speak(utterance);
  };

  // Quick insert metatag into lyrics
  const handleInsertMetatag = (tag: string) => {
    setLyricsText((prev) => `${prev}\n\n${tag}\n`);
  };

  const shortLength = result.stylePromptShort.length;
  const isShortOptimal = shortLength <= 120;

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-fuchsia-500/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />

      {/* Title & Metadata Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold uppercase tracking-wider">
              Suno AI Generated Song
            </span>
            <span className="text-xs text-slate-400">• {new Date().toLocaleDateString()}</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1 flex items-center gap-2">
            <Music2 className="w-6 h-6 text-cyan-400" />
            {result.title}
          </h2>
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopyFullMaster}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-xl shadow-cyan-500/20 transition-all active:scale-95"
          >
            {copiedAll ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedAll ? "Copied All!" : "Copy Full Master Prompt"}
          </button>

          <button
            onClick={() => onSave({ ...result, lyrics: lyricsText })}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border text-xs font-bold transition-all ${
              isSaved
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : "bg-white/10 text-slate-200 border-white/10 hover:bg-white/20"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
            {isSaved ? "Saved" : "Save"}
          </button>

          <button
            onClick={handleDownloadTxt}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 text-xs font-bold transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            Export TXT
          </button>
        </div>
      </div>

      {/* Badges Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
        <div className="bg-black/20 border border-white/10 rounded-2xl p-3.5">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block flex items-center gap-1">
            <Activity className="w-3 h-3 text-amber-400" /> Tempo / BPM
          </span>
          <span className="text-sm font-bold text-slate-100 mt-1 block">{result.bpm}</span>
        </div>

        <div className="bg-black/20 border border-white/10 rounded-2xl p-3.5">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block flex items-center gap-1">
            <Key className="w-3 h-3 text-cyan-400" /> Musical Key
          </span>
          <span className="text-sm font-bold text-slate-100 mt-1 block">{result.musicalKey}</span>
        </div>

        <div className="bg-black/20 border border-white/10 rounded-2xl p-3.5 col-span-2 sm:col-span-2">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block flex items-center gap-1">
            <Volume2 className="w-3 h-3 text-fuchsia-400" /> Vocal Timbre
          </span>
          <span className="text-sm font-bold text-slate-100 mt-1 block truncate">
            {result.vocalDescription}
          </span>
        </div>
      </div>

      {/* Suggested Song Structure Timeline (from design spec) */}
      <div className="bg-black/20 border border-white/10 rounded-2xl p-4 space-y-2.5 relative z-10">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-cyan-400" /> Suggested Song Structure Analysis
        </h4>
        <div className="flex items-center space-x-1 h-10 w-full overflow-hidden rounded-xl bg-black/40 p-1">
          <div className="flex-1 bg-cyan-400/80 hover:bg-cyan-400 rounded-lg flex items-center justify-center text-[10px] font-black text-slate-950 transition-all">INTRO</div>
          <div className="flex-[2] bg-blue-400/80 hover:bg-blue-400 rounded-lg flex items-center justify-center text-[10px] font-black text-slate-950 transition-all">VERSE 1</div>
          <div className="flex-[1.5] bg-fuchsia-400/80 hover:bg-fuchsia-400 rounded-lg flex items-center justify-center text-[10px] font-black text-slate-950 transition-all">CHORUS</div>
          <div className="flex-[2] bg-blue-400/80 hover:bg-blue-400 rounded-lg flex items-center justify-center text-[10px] font-black text-slate-950 transition-all">VERSE 2</div>
          <div className="flex-[1.5] bg-fuchsia-400/80 hover:bg-fuchsia-400 rounded-lg flex items-center justify-center text-[10px] font-black text-slate-950 transition-all">CHORUS</div>
          <div className="flex-[1] bg-slate-400/80 hover:bg-slate-300 rounded-lg flex items-center justify-center text-[10px] font-black text-slate-950 transition-all">OUTRO</div>
        </div>
      </div>

      {/* 1. Style Prompt Box */}
      <div className="bg-black/20 rounded-2xl p-5 border border-white/10 relative space-y-3 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-300">
              Suno Style Prompt (Copy into Suno "Style of Music" box)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {!isShortOptimal && (
              <span className="text-[10px] text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full font-bold">
                ⚠️ Over 120 chars (might truncate)
              </span>
            )}
            {result.stylePromptExpanded.includes("no pop, no hooks") && (
              <span className="text-[10px] text-fuchsia-400 bg-fuchsia-400/10 border border-fuchsia-400/20 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                <Activity className="w-3 h-3" /> Anti-Pop Gravity Well Active
              </span>
            )}
            <button
              onClick={() => handleCopy(result.stylePromptShort, setCopiedStyleShort)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
            >
              {copiedStyleShort ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedStyleShort ? "Copied Style!" : "Copy Style"}
            </button>
          </div>
        </div>

        <p className="text-cyan-200 leading-relaxed italic bg-black/40 border border-white/10 rounded-2xl p-4 font-mono text-sm select-all">
          "{result.stylePromptShort}"
        </p>

        {/* Expanded Style Prompt */}
        <details className="text-xs text-slate-400 cursor-pointer pt-1">
          <summary className="hover:text-slate-200 font-medium">
            View Expanded Detailed Style Prompt (for advanced tagging)
          </summary>
          <div className="mt-2 bg-black/30 border border-white/10 rounded-2xl p-3.5 font-mono text-xs text-slate-300 flex items-center justify-between gap-2">
            <span>{result.stylePromptExpanded}</span>
            <button
              onClick={() => handleCopy(result.stylePromptExpanded, setCopiedStyleExpanded)}
              className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white"
            >
              {copiedStyleExpanded ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </details>
      </div>

      {/* 2. Highlighted Catchy Hook & Vocal Audition */}
      <div className="bg-gradient-to-r from-fuchsia-950/40 via-purple-950/30 to-blue-950/20 border border-fuchsia-500/30 rounded-2xl p-5 space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-fuchsia-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-fuchsia-300">
              Catchy Hook / Chorus Earworm
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAudioAudition}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold text-xs shadow-md transition-all"
            >
              {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isPlayingAudio ? "Pause Audition" : "Audition Vocal Rhythm"}
            </button>

            <button
              onClick={() => handleCopy(result.hook, setCopiedHook)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-slate-200 transition-all border border-white/10"
            >
              {copiedHook ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <p className="text-sm md:text-base font-semibold text-white italic bg-black/40 p-4 rounded-2xl border border-fuchsia-500/20">
          "{result.hook}"
        </p>

        {audioError && <p className="text-xs text-amber-400">{audioError}</p>}
      </div>

      {/* 2.5. Album Art Prompt Box (Optional) */}
      {result.albumArtPrompt && (
        <div className="bg-black/20 rounded-2xl p-4 border border-white/10 relative space-y-2 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                Suno Bible Album Art Prompt
              </h3>
            </div>
            <button
              onClick={() => handleCopy(result.albumArtPrompt!, setCopiedArt)}
              className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 transition-all border border-white/5"
            >
              {copiedArt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <p className="text-slate-300 leading-relaxed italic bg-black/40 border border-white/5 rounded-xl p-3 font-mono text-xs select-all">
            {result.albumArtPrompt}
          </p>
        </div>
      )}

      {/* 3. Lyrics Box & Metatags Editor */}
      <div className="bg-black/20 border border-white/10 rounded-2xl p-5 space-y-4 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ListMusic className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Suno Lyrics with Bracketed Metatags
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditingLyrics(!isEditingLyrics)}
              className="flex items-center gap-1 text-xs text-slate-300 hover:text-white font-semibold px-3 py-1.5 rounded-xl bg-white/10 border border-white/10"
            >
              <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
              {isEditingLyrics ? "View Rendered" : "Edit Lyrics"}
            </button>

            <button
              onClick={() => handleCopy(lyricsText, setCopiedLyrics)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
            >
              {copiedLyrics ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedLyrics ? "Copied Lyrics!" : "Copy Lyrics Box"}
            </button>
          </div>
        </div>

        {/* Metatag Quick Inserter Bar */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 font-bold text-[11px] whitespace-nowrap uppercase tracking-wider">Structure:</span>
            {[
              "[Intro]",
              "[Verse 1]",
              "[Pre-Chorus]",
              "[Chorus]",
              "[Bridge]",
              "[Interlude]",
              "[Break]",
              "[Build]",
              "[Solo]",
              "[Outro]",
              "[Fade to End]",
              "[End]"
            ].map((tag) => (
              <button
                key={tag}
                onClick={() => handleInsertMetatag(tag)}
                className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-cyan-300 font-mono text-[11px] hover:bg-white/10 whitespace-nowrap font-semibold"
              >
                + {tag}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 font-bold text-[11px] whitespace-nowrap uppercase tracking-wider">Vocals & FX:</span>
            {[
              "[Spoken Word Narration]",
              "[Ethereal Female Whisper]",
              "[Ensemble Chorus]",
              ". . . ! . . (Rhythm Map)",
              "... (Slow Pace)",
              "(Call & Response)"
            ].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  if (tag === "(Call & Response)") handleInsertMetatag("(Yeah!)");
                  else if (tag === "... (Slow Pace)") handleInsertMetatag("...");
                  else if (tag === ". . . ! . . (Rhythm Map)") handleInsertMetatag(". . . ! . .");
                  else handleInsertMetatag(tag);
                }}
                className="px-2.5 py-1 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300 font-mono text-[11px] hover:bg-fuchsia-500/20 whitespace-nowrap font-semibold"
              >
                + {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Lyrics Content Display or Textarea */}
        {isEditingLyrics ? (
          <textarea
            rows={14}
            value={lyricsText}
            onChange={(e) => setLyricsText(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-xs font-mono text-slate-200 leading-relaxed focus:outline-none focus:border-cyan-400"
          />
        ) : (
          <div className="bg-black/30 border border-white/10 rounded-2xl p-5 font-mono text-xs md:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap selection:bg-cyan-500/30">
            {lyricsText.split("\n").map((line, idx) => {
              const isTag = line.trim().startsWith("[") && line.trim().endsWith("]");
              if (isTag) {
                return (
                  <span
                    key={idx}
                    className="block my-2 text-cyan-300 font-bold bg-cyan-500/10 px-3 py-1 rounded-xl border border-cyan-500/20 w-max"
                  >
                    {line}
                  </span>
                );
              }
              return (
                <span key={idx} className="block min-h-[1.2rem]">
                  {line}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Pro Suno Tips */}
      {result.sunoTips && result.sunoTips.length > 0 && (
        <div className="bg-black/20 border border-white/10 rounded-2xl p-5 space-y-2.5 relative z-10">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-400" /> Pro Suno AI Generation Tips for this Song
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-slate-300">
            {result.sunoTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 bg-black/30 p-3 rounded-xl border border-white/5">
                <span className="text-cyan-400 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
