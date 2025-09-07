
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Loader2, XCircle, Code, Eye, Save, Rocket } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeEditor from "@/components/CodeEditor";

const ProjectPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { user, loading, session } = useAuth();
  const nav = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [fetching, setFetching] = useState(true);
  const [fatalError, setFatalError] = useState<string | null>(null);
  const [editedCode, setEditedCode] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [deploymentUrl, setDeploymentUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !session) {
      setFatalError("Session expired or authentication lost. Please log in again.");
      setTimeout(() => {
        nav("/auth");
      }, 1200);
    }
  }, [loading, session, nav]);

  useEffect(() => {
    const fetchProject = async () => {
      if (!user || !projectId) return;
      setFetching(true);
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("user_id", user.id)
          .eq("project_id", projectId)
          .single();
        if (error) {
          throw error;
        }
        setProject(data);
      } catch (err: any) {
        setFatalError(
          err?.message ||
            "There was a problem loading your project. Please try again or contact support."
        );
      }
      setFetching(false);
    };
    fetchProject();
  }, [user, projectId]);

  useEffect(() => {
    if (project?.code_response) {
      setEditedCode(project.code_response);
    }
  }, [project]);

  const handleSaveCode = async () => {
    if (!project) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("projects")
        .update({ code_response: editedCode })
        .eq("id", project.id);
      if (error) throw error;
      toast({
        title: "Code saved",
        description: "Your changes have been saved successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Save failed",
        description: error.message || "Failed to save code.",
        variant: "destructive",
      });
    }
    setSaving(false);
  };

  const handleDeploy = async () => {
    if (!project || !session) return;
    setDeploying(true);
    try {
      // For demo, use a mock token. In real app, get from user settings
      const vercelToken = prompt("Enter your Vercel token:");
      if (!vercelToken) {
        setDeploying(false);
        return;
      }

      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          projectId: project.project_id,
          provider: 'vercel',
          token: vercelToken,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setDeploymentUrl(result.url);
        toast({
          title: "Deployment successful!",
          description: `Your app is live at ${result.url}`,
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast({
        title: "Deployment failed",
        description: error.message || "Failed to deploy.",
        variant: "destructive",
      });
    }
    setDeploying(false);
  };

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-10 h-10 text-indigo-700" />
        <span className="ml-2">Loading project...</span>
      </div>
    );
  }
  if (fatalError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Header />
        <XCircle className="w-10 h-10 text-red-500 mb-3" />
        <h1 className="text-2xl font-bold mb-3">Error</h1>
        <p className="text-muted-foreground">{fatalError}</p>
        <button
          className="mt-6 px-6 py-2 rounded bg-indigo-700 text-white font-bold shadow"
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
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
      <div className="max-w-6xl mx-auto mt-12 p-8">
        <div className="bg-white border border-border shadow rounded-xl p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2 text-gray-900">Generated Project</h1>
            <div className="mb-1 text-xs text-gray-700">
              Project ID: <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{project.project_id}</span>
            </div>
            <div className="text-sm text-muted-foreground mb-4">
              Prompt: <span className="italic">{project.prompt}</span>
            </div>
            {project.image_url && (
              <img src={project.image_url} alt="Sketch" className="max-h-48 mb-4 border rounded" />
            )}
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">
                <Eye className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="code">
                <Code className="w-4 h-4 mr-2" />
                Edit Code
              </TabsTrigger>
              <TabsTrigger value="files">
                Files
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              {project.confidence_score && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">AI Confidence Score</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(project.confidence_score * 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-mono text-blue-700">
                      {(project.confidence_score * 100).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-sm text-blue-700 mt-2">
                    {project.confidence_score > 0.8 ? "High confidence" :
                     project.confidence_score > 0.6 ? "Medium confidence" :
                     "Low confidence - consider refining your sketch or prompt"}
                  </p>
                </div>
              )}

              <div className="text-md font-semibold mb-3">Generated Files:</div>
              <ul className="grid gap-1 font-mono text-sm mb-6">
                {project.files && Array.isArray(project.files)
                  ? project.files.map((f: string, idx: number) => <li key={idx}>{f}</li>)
                  : "None"}
              </ul>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Deploy Your App</h3>
                {deploymentUrl ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 mb-2">✅ Successfully deployed!</p>
                    <a
                      href={`https://${deploymentUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 underline"
                    >
                      View Live App
                    </a>
                  </div>
                ) : (
                  <button
                    onClick={handleDeploy}
                    disabled={deploying}
                    className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    <Rocket className="w-5 h-5" />
                    {deploying ? "Deploying..." : "Deploy to Vercel"}
                  </button>
                )}
              </div>
            </TabsContent>

            <TabsContent value="code" className="mt-6">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold">Generated Code</h3>
                <button
                  onClick={handleSaveCode}
                  disabled={saving}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
              <CodeEditor
                value={editedCode}
                onChange={setEditedCode}
                language="typescript"
                height="600px"
              />
            </TabsContent>

            <TabsContent value="files" className="mt-6">
              <div className="text-md font-semibold mb-3">File Structure:</div>
              <ul className="grid gap-1 font-mono text-sm">
                {project.files && Array.isArray(project.files)
                  ? project.files.map((f: string, idx: number) => <li key={idx}>{f}</li>)
                  : "None"}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
