import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { PromptEnhancerForm } from "./components/PromptEnhancerForm";
import { EnhancementOutput } from "./components/EnhancementOutput";
import { HookGeneratorModal } from "./components/HookGeneratorModal";
import { GenreMixerModal } from "./components/GenreMixerModal";
import { MetatagsGuide } from "./components/MetatagsGuide";
import { PresetLibrary } from "./components/PresetLibrary";
import { SavedPrompts } from "./components/SavedPrompts";
import { ArtistReplicas } from "./components/ArtistReplicas";
import { SunoDiagnostician } from "./components/SunoDiagnostician";
import { BibleCheatsheet } from "./components/BibleCheatsheet";
import { StyleIndex } from "./components/StyleIndex";
import { ModelComparison } from "./components/ModelComparison";
import { SongwritingGuide } from "./components/SongwritingGuide";
import { SunoPromptRequest, SunoPromptResult, SunoVersion, PresetPrompt, TabKey } from "./types";
import { generateClientSidePrompt } from "./utils/promptGenerator";
import { Sparkles, ArrowUp } from "lucide-react";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("enhancer");
  const [sunoVersion, setSunoVersion] = useState<SunoVersion>("v5.5");
  const [currentResult, setCurrentResult] = useState<SunoPromptResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Saved Prompts from localStorage
  const [savedList, setSavedList] = useLocalStorage<SunoPromptResult[]>("hookgenius_saved_prompts", []);

  // Handle Prompt Enhancement
  const handleEnhancePrompt = async (reqData: SunoPromptRequest) => {
    setIsLoading(true);
    setErrorMsg(null);

    // If hosted on GitHub Pages or static host without backend server, run client-side generator directly
    if (window.location.hostname.includes("github.io") || window.location.protocol === "file:") {
      setTimeout(() => {
        const fallbackResult = generateClientSidePrompt(reqData);
        setCurrentResult(fallbackResult);
        window.scrollTo({ top: 400, behavior: "smooth" });
        setIsLoading(false);
      }, 400);
      return;
    }

    try {
      const response = await fetch("/api/enhance-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqData),
      });

      if (response.ok) {
        const resJson = await response.json();
        if (resJson.success && resJson.data) {
          const newResult: SunoPromptResult = {
            ...resJson.data,
            id: `suno-${Date.now()}`,
            createdAt: new Date().toISOString(),
          };
          setCurrentResult(newResult);
          window.scrollTo({ top: 400, behavior: "smooth" });
          return;
        }
      }
      const fallbackResult = generateClientSidePrompt(reqData);
      setCurrentResult(fallbackResult);
      window.scrollTo({ top: 400, behavior: "smooth" });
    } catch {
      const fallbackResult = generateClientSidePrompt(reqData);
      setCurrentResult(fallbackResult);
      window.scrollTo({ top: 400, behavior: "smooth" });
    } finally {
      setIsLoading(false);
    }
  };

  // Save / Toggle saved prompt
  const handleSaveResult = (resToSave: SunoPromptResult) => {
    const existingIndex = savedList.findIndex((item) => item.id === resToSave.id);
    if (existingIndex >= 0) {
      // Remove
      setSavedList((prev) => prev.filter((item) => item.id !== resToSave.id));
    } else {
      // Add
      setSavedList((prev) => [resToSave, ...prev]);
    }
  };

  // Remove saved prompt
  const handleRemoveSaved = (id: string) => {
    setSavedList((prev) => prev.filter((item) => item.id !== id));
  };

  // Load preset into prompt enhancer tab
  const handleLoadPreset = (preset: PresetPrompt) => {
    setActiveTab("enhancer");
    handleEnhancePrompt({
      topic: preset.sampleHook,
      genre: preset.genre,
      subGenres: preset.tags,
      vocalType: "Male Lead",
      tempo: preset.bpm,
      mood: preset.vibe,
      sunoVersion,
      instrumentation: ["Electric Guitar", "Synth"],
      structurePreferences: ["[Intro]", "[Verse]", "[Chorus]", "[Outro]"],
    });
  };

  const isCurrentSaved =
    !!currentResult && savedList.some((item) => item.id === currentResult.id);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-violet-500/30 selection:text-white flex flex-col">
      {/* Top Header & Engine Selector */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sunoVersion={sunoVersion}
        setSunoVersion={setSunoVersion}
        savedCount={savedList.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-8">
        {/* Error Alert */}
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl text-sm flex items-center justify-between">
            <span>{errorMsg}</span>
            <button
              onClick={() => setErrorMsg(null)}
              className="text-red-400 hover:text-red-200 font-bold ml-4"
            >
              ✕
            </button>
          </div>
        )}

        {/* Tab 1: Prompt Enhancer / Architect */}
        {activeTab === "enhancer" && (
          <div className="space-y-8">
            <PromptEnhancerForm
              onEnhance={handleEnhancePrompt}
              isLoading={isLoading}
              sunoVersion={sunoVersion}
            />

            {/* Generated Output View */}
            {currentResult && (
              <EnhancementOutput
                result={currentResult}
                onSave={handleSaveResult}
                isSaved={isCurrentSaved}
              />
            )}
          </div>
        )}

        {/* Tab 2: Artist Replicas (Suno Bible) */}
        {activeTab === "artists" && (
          <ArtistReplicas
            onUseArtistPrompt={(promptStr, genreStr) => {
              setActiveTab("enhancer");
              handleEnhancePrompt({
                topic: `Song in style of ${promptStr.slice(0, 40)}`,
                genre: genreStr || "Rock",
                subGenres: [],
                vocalType: "Male Lead",
                tempo: "120 BPM",
                mood: "Energetic",
                sunoVersion,
                instrumentation: ["Guitar", "Drums"],
                structurePreferences: ["[Intro]", "[Verse]", "[Chorus]", "[Outro]"],
              });
            }}
          />
        )}

        {/* Tab 3: Hook Generator Lab */}
        {activeTab === "hook" && <HookGeneratorModal />}

        {/* Tab 3: Genre Blender */}
        {activeTab === "mixer" && <GenreMixerModal />}

        {/* Tab 4: Suno Metatags Guide */}
        {activeTab === "metatags" && <MetatagsGuide />}
        {activeTab === "songwriting" && <SongwritingGuide />}
        {activeTab === "styles" && <StyleIndex />}
        {activeTab === "models" && <ModelComparison />}

        {/* Bible Cheatsheet */}
        {activeTab === "cheatsheet" && <BibleCheatsheet />}

        {/* Tab 5: Hit Presets */}
        {activeTab === "presets" && <PresetLibrary onLoadPreset={handleLoadPreset} />}

        {/* Tab 6: Diagnostician */}
        {activeTab === "diagnostician" && <SunoDiagnostician />}

        {/* Tab 7: Saved Library */}
        {activeTab === "saved" && (
          <SavedPrompts
            savedList={savedList}
            onRemove={handleRemoveSaved}
            onSelectSaved={(item) => {
              setCurrentResult(item);
              setActiveTab("enhancer");
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950/80 py-6 px-4 text-center text-xs text-zinc-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
            HookGenius Suno Prompt Studio • AI-Powered Prompt Architecture for Suno v3, v3.5 & v4
          </p>
          <p className="text-zinc-600">
            Optimized character bounds, bracketed metatags & acoustic genre formatting
          </p>
        </div>
      </footer>
    </div>
  );
}
