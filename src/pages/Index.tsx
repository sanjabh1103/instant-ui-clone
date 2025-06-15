
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import SketchUploader from "@/components/SketchUploader";
import PromptPanel from "@/components/PromptPanel";
import PastGenerations from "@/components/PastGenerations";
import { interpretSketch } from "@/lib/interpreterApi";
import { toast } from "@/hooks/use-toast";
import GeneratedPreview from "@/components/GeneratedPreview";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [image, setImage] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [generating, setGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<null | { projectId: string; status: string; files: string[] }>(null);

  const { user, loading } = useAuth();
  const nav = useNavigate();

  // Enforce auth
  useEffect(() => {
    if (!loading && !user) {
      nav("/auth");
    }
  }, [user, loading, nav]);

  // Loads last generation from localStorage on mount (if any)
  useEffect(() => {
    if (!user) return;
    // Fetch user's recent generations from Supabase
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (data && data[0]) {
        setGenerationResult({
          projectId: data[0].id,
          status: "ready",
          files: [], // The files property no longer exists; use empty array or fetch/compute if needed
        });
      }
    };
    fetchProjects();
  }, [user]);

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

      // Store in Supabase projects table if user is logged in
      if (user) {
        await supabase.from("projects").insert({
          user_id: user.id,
          name: userPrompt,
          // The table expects only certain fields; remove fields that are not in your table schema
          // You may want to store 'prompt' as 'description' or 'name'
          // and 'image_url' in a field that makes sense if it exists
          // If your schema does not have an image_url field, you may need to add it on the backend
          // For now, only include values present in the schema
        });
      }

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
    if (!user) return;
    supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id)
      .eq("id", projectId)
      .single()
      .then(({ data }) => {
        if (data) {
          setGenerationResult({
            projectId: data.id,
            status: "ready",
            files: [], // No files property in your schema currently
          });
          toast({
            title: "Loaded previous generation",
            description: `Loaded project ID: ${data.id}`,
          });
        }
      });
  };

  // Handler to re-run a previous prompt/sketch combo
  const handleRerun = async (image: string, prompt: string) => {
    setGenerating(true);
    setGenerationResult(null);
    try {
      const result = await interpretSketch({ image, prompt });
      setGenerationResult(result);
      if (user) {
        await supabase.from("projects").insert({
          user_id: user.id,
          name: prompt,
        });
      }
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <span className="text-xl text-muted-foreground">Loading...</span>
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

