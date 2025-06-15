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

// Helper function to convert data URL to File object
const dataURLtoFile = (dataurl: string, filename: string) => {
  const arr = dataurl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) {
    // Fallback for images that might not have the mime type prefix, e.g. from clipboard
    try {
        const bstr = atob(arr[0]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: 'image/png' });
    } catch (e) {
        throw new Error('Invalid base64 string for image');
    }
  }
  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

type ProjectRow = {
  created_at: string;
  description?: string;
  id: string;
  is_public: boolean;
  name: string;
  project_id: string;
  updated_at: string;
  user_id: string;
  image_url?: string;
  // Add these optional fields to support fallback/local project objects only
  files?: string[];
  prompt?: string;
};

const Index = () => {
  const [image, setImage] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [generating, setGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<null | { projectId: string; status: string; files: string[] }>(null);
  const [pastGenerations, setPastGenerations] = useState<ProjectRow[]>([]);

  const { user, loading } = useAuth();
  const nav = useNavigate();

  // Enforce auth
  useEffect(() => {
    if (!loading && !user) {
      nav("/auth");
    }
  }, [user, loading, nav]);

  // Loads past generations from Supabase on mount
  useEffect(() => {
    if (!user) return;
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Failed to fetch past generations", error);
        return;
      }
      
      if (data) {
        setPastGenerations(data as ProjectRow[]);
        // For DB rows always gracefully handle missing .files and .prompt (not present in DB)
        if (data[0] && data[0].project_id) {
          setGenerationResult({
            projectId: data[0].project_id,
            status: "ready",
            files: (data[0] as any).files ?? [], // fallback for local projects
          });
          setPrompt((data[0] as any).prompt ?? ''); // fallback for local projects
        }
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
    if (!user) {
      toast({ title: "Please log in", description: "You must be logged in to generate an app." });
      return;
    }
    setPrompt(userPrompt);
    setGenerating(true);
    setGenerationResult(null);
    try {
      // 1. Upload image to Supabase Storage
      const file = dataURLtoFile(image, 'sketch.png');
      const filePath = `${user.id}/${Date.now()}_sketch.png`;
      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, file);

      if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`);

      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);

      // 2. Call interpreter function
      const result = await interpretSketch({ image, prompt: userPrompt });

      // 3. Store in Supabase projects table
      const { data: newProject, error: insertError } = await supabase.from("projects").insert({
        user_id: user.id,
        name: userPrompt.substring(0, 50),
        prompt: userPrompt,
        project_id: result.projectId,
        image_url: publicUrl,
        // 'files' not saved in DB
      }).select();

      if (insertError) throw new Error(`Failed to save project: ${insertError.message}`);

      setGenerationResult(result);

      if (newProject) {
        // Cast to ProjectRow and add .files/.prompt only as fallback to local result
        setPastGenerations(prev => [newProject[0] as ProjectRow, ...prev].slice(0, 5));
      }

      toast({
        title: "App generated!",
        description: "Check your preview below, or edit/deploy.",
      });
    } catch (e: any) {
      setGenerationResult(null);
      toast({
        title: "Error generating app",
        description: e.message || String(e),
        variant: "destructive",
      });
    }
    setGenerating(false);
  };

  // Handler to reload previous generation
  const handleReloadGeneration = (projectId: string) => {
    if (!user) return;
    
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

    // Fallback if not in local state
    supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id)
      .eq("project_id", projectId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (data) {
          setGenerationResult({
            projectId: data.project_id,
            status: "ready",
            files: (data as any).files ?? [],
          });
          setPrompt((data as any).prompt ?? '');
          toast({
            title: "Loaded previous generation",
            description: `Loaded project ID: ${data.project_id}`,
          });
        } else if (error) {
            toast({
              title: "Error loading project",
              description: error.message,
              variant: "destructive",
            });
        }
      });
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
          generations={pastGenerations}
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
