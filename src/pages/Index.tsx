
import { useState } from "react";
import Header from "@/components/Header";
import SketchUploader from "@/components/SketchUploader";
import PromptPanel from "@/components/PromptPanel";
import PastGenerations from "@/components/PastGenerations";
import GeneratedPreview from "@/components/GeneratedPreview";
// import { useAuth } from "@/hooks/useAuth"; // No auth check needed
// import AuthGuard from "@/components/AuthGuard";
import { usePastGenerationsFetcher, ProjectRow } from "@/hooks/usePastGenerationsFetcher";
import { useGenerateApp } from "@/hooks/useGenerateApp";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

/**
 * Main Index Page: Orchestrates app generation, sketch upload, prompt, and preview.
 */
const Index = () => {
  const [image, setImage] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [generationResult, setGenerationResult] = useState<null | { projectId: string; status: string; files: string[] }>(null);
  const [pastGenerations, setPastGenerations] = useState<ProjectRow[]>([]);
  // const { user } = useAuth(); // No user needed

  // Fetch previous projects on mount/refresh, auto-load latest as preview
  const fetchedGenerations = usePastGenerationsFetcher(setGenerationResult, setPrompt);
  // Ensure fetched generations update local state (for reloads and insertions)
  // Unwraps so reloads, deletions etc are synced
  if (fetchedGenerations !== pastGenerations) setPastGenerations(fetchedGenerations);

  // Generate app handler
  const { generating, handleGenerate } = useGenerateApp(
    image,
    setPrompt,
    setGenerationResult,
    setPastGenerations,
    undefined // No user for now
  );

  // Reload handler for previous generations (used by PastGenerations)
  const handleReloadGeneration = (projectId: string) => {
    // Skip auth guard for demo
    // if (!user) return;
    const project = pastGenerations.find(p => p.project_id === projectId);
    if (project) {
      setGenerationResult({
        projectId: project.project_id,
        status: "ready",
        files: project.files ?? [],
      });
      setPrompt(project.prompt ?? '');
      toast({
        title: "Loaded previous generation",
        description: `Loaded project ID: ${project.project_id}`,
      });
      return;
    }
    // Skipping Supabase .then call if user is undefined for now
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <Header />
      <main className="flex flex-col items-center py-8 px-2 max-w-6xl mx-auto w-full">
        <section className="w-full flex flex-col lg:flex-row gap-10 items-center lg:items-start justify-center mt-10">
          <div className="w-full lg:w-1/2 max-w-lg mb-6 lg:mb-0">
            <SketchUploader onImageSelected={setImage} disabled={generating} />
          </div>
          <div className="w-full lg:w-1/2 max-w-lg">
            <PromptPanel onSubmit={handleGenerate} disabled={generating} loading={generating} />
          </div>
        </section>
        <GeneratedPreview generation={generationResult} prompt={prompt} loading={generating} />
        <PastGenerations
          generations={pastGenerations.map(g => ({
            ...g,
            prompt: g.prompt ?? "",
          }))}
          onReload={handleReloadGeneration}
        />
        <section className="mt-12 text-center max-w-2xl mx-auto p-6">
          <h2 className="font-bold text-lg mb-2 text-gray-800">How it works</h2>
          <ol className="list-decimal list-inside text-lg text-gray-600 space-y-1">
            <li>Upload or capture your UI sketch.</li>
            <li>Describe its behavior in plain English.</li>
            <li>Click “Generate” to see magic. Edit and deploy—no code required!</li>
          </ol>
          <div className="text-xs text-muted-foreground mt-4">
            (Supabase authentication, Gemini 2.5 Vision/Chat, and deployment coming soon.)
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;

