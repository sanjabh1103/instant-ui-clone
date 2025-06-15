
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { interpretSketch } from "@/lib/interpreterApi";
import { dataURLtoFile } from "@/utils/imageUtils";
import { useAuth } from "@/hooks/useAuth";
import type { ProjectRow } from "./usePastGenerationsFetcher";

/**
 * Handles the generation of app from sketch and prompt (upload, API, DB insert).
 */
export function useGenerateApp(
  image: string,
  setPrompt: (v: string) => void,
  setGenerationResult: (v: { projectId: string; status: string; files: string[] } | null) => void,
  setPastGenerations: (cb: (prev: ProjectRow[]) => ProjectRow[]) => void,
  user: any
) {
  const [generating, setGenerating] = useState(false);

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
      }).select();

      if (insertError) throw new Error(`Failed to save project: ${insertError.message}`);

      setGenerationResult(result);

      if (newProject) {
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

  return { generating, handleGenerate };
}
