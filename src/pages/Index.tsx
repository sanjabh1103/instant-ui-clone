
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import SketchUploader from "@/components/SketchUploader";
import PromptPanel from "@/components/PromptPanel";
import PastGenerations from "@/components/PastGenerations";
import GeneratedPreview from "@/components/GeneratedPreview";
import { useAuth } from "@/hooks/useAuth";
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

  // Use new pastGenerations management from hook
  const {
    pastGenerations,
    refreshPastGenerations,
    deleteProject,
    renameProject,
  } = usePastGenerationsFetcher(setGenerationResult, setPrompt);

  const { user, loading: authLoading, session } = useAuth();

  // Error boundary state
  const [fatalError, setFatalError] = useState<string | null>(null);

  // Session expiry & re-auth
  useEffect(() => {
    // watch for session expiry
    if (!authLoading && !session) {
      setFatalError("Session expired. Please log in again.");
      setTimeout(() => {
        window.location.href = "/auth";
      }, 1250);
    }
  }, [session, authLoading]);

  // Enhanced API error boundary
  useEffect(() => {
    window.addEventListener("unhandledrejection", (e) => {
      setFatalError((e?.reason as Error)?.message || "Unexpected error.");
    });
    window.addEventListener("error", (e) => {
      setFatalError((e as ErrorEvent)?.message || "Unexpected error.");
    });
    return () => {
      window.removeEventListener("unhandledrejection", () => {});
      window.removeEventListener("error", () => {});
    };
  }, []);

  // Generate app handler
  const { generating, handleGenerate } = useGenerateApp(
    image,
    setPrompt,
    setGenerationResult,
    (cb: (prev: ProjectRow[]) => ProjectRow[]) => refreshPastGenerations(),
    user // pass real user; if null, will show toast error
  );

  // Reload handler for previous generations (used by PastGenerations)
  const handleReloadGeneration = (projectId: string) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to reload previous generations.",
        variant: "destructive",
      });
      return;
    }
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
    }
  };

  // Delete handler
  const handleDeleteGeneration = async (projectId: string) => {
    await deleteProject(projectId);
  };

  // Rename handler
  const handleRenameGeneration = async (projectId: string, newName: string) => {
    await renameProject(projectId, newName);
  };

  if (fatalError) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
        <Header />
        <div className="bg-white border px-6 py-10 rounded-xl shadow text-center">
          <div className="text-2xl font-bold text-red-600 mb-4">Something went wrong</div>
          <div className="text-gray-800">{fatalError}</div>
          <button
            className="mt-6 px-6 py-2 rounded bg-indigo-700 text-white font-bold shadow"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <Header />
      <main className="flex flex-col items-center py-8 px-2 max-w-6xl mx-auto w-full">
        <section className="w-full flex flex-col lg:flex-row gap-10 items-center lg:items-start justify-center mt-10">
          <div className="w-full lg:w-1/2 max-w-lg mb-6 lg:mb-0">
            <SketchUploader onImageSelected={setImage} disabled={generating} />
          </div>
          <div className="w-full lg:w-1/2 max-w-lg">
            <PromptPanel onSubmit={handleGenerate} disabled={generating || authLoading} loading={generating} />
            {!user && !authLoading && (
              <div className="mt-4 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded p-3 text-sm">
                <b>Note:</b> To generate an app or view past generations, please <a href="/auth" className="underline text-indigo-700 hover:text-indigo-900">log in</a>.
              </div>
            )}
          </div>
        </section>
        <GeneratedPreview generation={generationResult} prompt={prompt} loading={generating} />
        {user ? (
          <PastGenerations
            generations={pastGenerations.map(g => ({
              ...g,
              prompt: g.prompt ?? "",
            }))}
            onReload={handleReloadGeneration}
            onDelete={handleDeleteGeneration}
            onRename={handleRenameGeneration}
          />
        ) : (
          <section className="mt-10 mb-4 px-2 w-full max-w-xl mx-auto">
            <h3 className="font-bold text-md mb-3 text-gray-700">Past Generations</h3>
            <div className="rounded-lg bg-white border p-5 shadow text-center text-gray-500 text-sm">
              <span>
                <b>Login required.</b> Sign in to view your previous generations and reload projects!
              </span>
            </div>
          </section>
        )}
        <section className="mt-12 text-center max-w-2xl mx-auto p-6">
          <h2 className="font-bold text-lg mb-2 text-gray-800">How it works</h2>
          <ol className="list-decimal list-inside text-lg text-gray-600 space-y-1">
            <li>Upload or capture your UI sketch.</li>
            <li>Describe its behavior in plain English.</li>
            <li>
              Click “Generate” to see magic. 
              <span className="inline ml-2 text-xs text-yellow-800 bg-yellow-100 px-1 py-0.5 rounded">
                Login required
              </span>
            </li>
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
