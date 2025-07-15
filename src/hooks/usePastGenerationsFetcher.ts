
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

export type ProjectRow = Database['public']['Tables']['projects']['Row'];

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
          files: data[0].files ?? [],
        });
        setPrompt(data[0].prompt ?? '');
      }
      setPastGenerations(data || []);
    };
    fetchProjects();
  }, [user, setGenerationResult, setPrompt]);

  // Helper to manually refresh generations after delete/rename
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
    setPastGenerations(data || []);
  };

  // Delete action
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
      variant: "default",
    });
    await refreshPastGenerations();
    return true;
  };

  // Rename action
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
    setPastGenerations,
    refreshPastGenerations,
    deleteProject,
    renameProject,
  };
}
