
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Loader2 } from "lucide-react";

const ProjectPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) nav("/auth");
  }, [user, loading, nav]);

  useEffect(() => {
    const fetchProject = async () => {
      if (!user || !projectId) return;
      setFetching(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id)
        .eq("project_id", projectId)
        .single();
      setProject(data);
      setFetching(false);
    };
    fetchProject();
  }, [user, projectId]);

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-10 h-10 text-indigo-700" />
        <span className="ml-2">Loading project...</span>
      </div>
    );
  }
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Header />
        <h1 className="text-2xl font-bold mb-3">Project Not Found</h1>
        <p className="text-muted-foreground">This project was not found or you do not have access.</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <Header />
      <div className="max-w-xl mx-auto bg-white border border-border shadow rounded-xl mt-12 p-8">
        <h1 className="text-2xl font-bold mb-2 text-gray-900">Generated Project</h1>
        <div className="mb-1 text-xs text-gray-700">
          Project ID: <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{project.project_id}</span>
        </div>
        <div className="text-sm text-muted-foreground mb-4">
          Prompt: <span className="italic">{project.prompt}</span>
        </div>
        <img src={project.image_url} alt="Sketch" className="max-h-48 mb-4 border rounded" />
        <div className="text-md font-semibold mt-6 mb-3">Files:</div>
        <ul className="grid gap-1 font-mono text-sm">
          {project.files && Array.isArray(project.files)
            ? project.files.map((f: string, idx: number) => <li key={idx}>{f}</li>)
            : "None"}
        </ul>
      </div>
    </div>
  );
};

export default ProjectPage;
