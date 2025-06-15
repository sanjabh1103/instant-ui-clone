
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type ProjectRow = {
  created_at: string;
  description?: string;
  id: string;
  is_public: boolean;
  name: string;
  project_id: string;
  updated_at: string;
  user_id: string;
  image_url?: string;
  files?: string[];
  prompt?: string;
};

export function usePastGenerationsFetcher(
  setGenerationResult: (v: { projectId: string; status: string; files: string[] } | null) => void,
  setPrompt: (v: string) => void
) {
  const { user } = useAuth();
  const [pastGenerations, setPastGenerations] = useState<ProjectRow[]>([]);

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

      if (data && data[0] && data[0].project_id) {
        setGenerationResult({
          projectId: data[0].project_id,
          status: "ready",
          files: (data[0] as any).files ?? [],
        });
        setPrompt((data[0] as any).prompt ?? '');
      }
      setPastGenerations((data || []) as ProjectRow[]);
    };
    fetchProjects();
  }, [user, setGenerationResult, setPrompt]);

  return pastGenerations;
}
