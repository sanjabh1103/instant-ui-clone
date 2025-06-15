
import { useState } from "react";
import Header from "@/components/Header";
import SketchUploader from "@/components/SketchUploader";
import PromptPanel from "@/components/PromptPanel";
import PastGenerations from "@/components/PastGenerations";
import { interpretSketch } from "@/lib/interpreterApi";
import { toast } from "@/hooks/use-toast";
import GeneratedPreview from "@/components/GeneratedPreview";

const Index = () => {
  const [image, setImage] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [generating, setGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<null | { projectId: string; status: string; files: string[] }>(null);

  // Loads last generation from localStorage on mount (if any)
  useState(() => {
    try {
      const arr = JSON.parse(localStorage.getItem("r2c-past-generations") || "[]");
      if (arr[0]?.projectId) {
        setGenerationResult({
          projectId: arr[0].projectId,
          status: arr[0].status,
          files: [], // We can't recall files from store, but will display projectId/status for link
        });
      }
    } catch {}
  });

  // Handles the main generate process
  const handleGenerate = async (userPrompt: string) => {
    if (!image) {
      toast({
        title: "No sketch uploaded",
        description: "Please upload or capture a sketch first.",
      });
      return;
    }
    setPrompt(userPrompt);
    setGenerating(true);
    setGenerationResult(null);
    try {
      const result = await interpretSketch({ image, prompt: userPrompt });
      setGenerationResult(result);
      toast({
        title: "App generated!",
        description: "Check your preview below, or edit/deploy.",
      });
    } catch (e) {
      setGenerationResult(null);
      toast({
        title: "Error generating app",
        description: String(e),
        variant: "destructive",
      });
    }
    setGenerating(false);
  };

  // Handler to reload previous generation
  const handleReloadGeneration = (projectId: string) => {
    setGenerationResult((prev) =>
      prev && prev.projectId === projectId ? prev : { projectId, status: "ready", files: [] }
    );
    toast({
      title: "Loaded previous generation",
      description: `Loaded project ID: ${projectId}`,
    });
  };

  // Handler to re-run a previous prompt/sketch combo
  const handleRerun = async (image: string, prompt: string) => {
    setGenerating(true);
    setGenerationResult(null);
    try {
      const result = await interpretSketch({ image, prompt });
      setGenerationResult(result);
      toast({
        title: "App regenerated!",
        description: "A new version of the app was generated.",
      });
    } catch (e) {
      setGenerationResult(null);
      toast({
        title: "Error re-generating app",
        description: String(e),
        variant: "destructive",
      });
    }
    setGenerating(false);
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
          onReload={handleReloadGeneration}
          onRerun={handleRerun}
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
