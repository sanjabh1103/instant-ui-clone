
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
import HowItWorksPanel from "@/components/HowItWorksPanel";
import GuestPastGenerationsNotice from "@/components/GuestPastGenerationsNotice";

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

  // TEMPORARILY DISABLED: Session expiry check for UI review
  // useEffect(() => {
  //   if (!authLoading && !session) {
  //     setFatalError("Session expired. Please log in again.");
  //     setTimeout(() => {
  //       window.location.href = "/auth";
  //     }, 1250);
  //   }
  // }, [session, authLoading]);

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
    user
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
        <section className="w-full flex flex-col lg:flex-row gap-12 items-center lg:items-start justify-center mt-10">
          <div className="w-full lg:w-1/2 max-w-[420px] mb-6 lg:mb-0">
            <SketchUploader onImageSelected={setImage} disabled={generating} />
          </div>
          <div className="w-full lg:w-1/2 max-w-[520px]">
            {/* TEMPORARILY SHOWING PROMPT PANEL FOR ALL USERS - FOR UI REVIEW */}
            <PromptPanel onSubmit={handleGenerate} disabled={generating || authLoading} loading={generating} />
            {/* TEMPORARILY DISABLED: Login notice */}
            {/* {!user && !authLoading && (
              <div className="mt-4 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded p-3 text-sm shadow-inner">
                <b>To generate an app or view past generations, please</b>
                <a href="/auth" className="ml-2 underline text-indigo-700 hover:text-indigo-900">log in</a>.
              </div>
            )} */}
          </div>
        </section>
        <GeneratedPreview generation={generationResult} prompt={prompt} loading={generating} />
        {/* TEMPORARILY SHOWING PAST GENERATIONS FOR ALL USERS - FOR UI REVIEW */}
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
          <GuestPastGenerationsNotice />
        )}
        <HowItWorksPanel />
      </main>
    </div>
  );
};

export default Index;
