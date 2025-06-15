
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

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
    if (!user) {
      setPastGenerations([]);
      return;
    }
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        setPastGenerations([]);
        setGenerationResult(null);
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

  // NEW: Helper to manually refresh generations after delete/rename
  const refreshPastGenerations = async () => {
    if (!user) {
      setPastGenerations([]);
      return;
    }
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      setPastGenerations([]);
      toast({
        title: "Failed to refresh generations",
        description: error?.message || "Unknown error",
        variant: "destructive",
      });
      return;
    }
    setPastGenerations((data || []) as ProjectRow[]);
  };

  // NEW: Delete action
  const deleteProject = async (project_id: string) => {
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("project_id", project_id);
    if (error) {
      toast({
        title: "Delete failed",
        description: error?.message || "Could not delete the project.",
        variant: "destructive",
      });
      return false;
    }
    toast({
      title: "Deleted!",
      description: "Project has been deleted.",
      variant: "default", // fixed type to default since only "default" and "destructive" are allowed.
    });
    await refreshPastGenerations();
    return true;
  };

  // NEW: Rename action
  const renameProject = async (project_id: string, newName: string) => {
    const { error } = await supabase
      .from("projects")
      .update({ name: newName })
      .eq("project_id", project_id);
    if (error) {
      toast({
        title: "Rename failed",
        description: error?.message || "Could not rename the project.",
        variant: "destructive",
      });
      return false;
    }
    toast({
      title: "Renamed",
      description: "Project has been renamed.",
    });
    await refreshPastGenerations();
    return true;
  };

  return {
    pastGenerations,
    refreshPastGenerations,
    deleteProject,
    renameProject,
  };
}
