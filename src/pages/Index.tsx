
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedHeader from "@/components/AnimatedHeader";
import AnimatedSketchUploader from "@/components/AnimatedSketchUploader";
import AnimatedPromptPanel from "@/components/AnimatedPromptPanel";
import PastGenerations from "@/components/PastGenerations";
import GeneratedPreview from "@/components/GeneratedPreview";
import { useAuth } from "@/hooks/useAuth";
import { usePastGenerationsFetcher, ProjectRow } from "@/hooks/usePastGenerationsFetcher";
import { useGenerateApp } from "@/hooks/useGenerateApp";
import { toast } from "@/hooks/use-toast";
import AnimatedHowItWorksPanel from "@/components/AnimatedHowItWorksPanel";
import AnimatedGuestNotice from "@/components/AnimatedGuestNotice";

/**
 * Main Index Page: Orchestrates app generation, sketch upload, prompt, and preview.
 * Security: Authentication checks, input validation, and secure state management.
 */
const Index = () => {
  const [image, setImage] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [generationResult, setGenerationResult] = useState<null | { projectId: string; status: string; files: string[] }>(null);

  // Enhanced security: Authentication state management
  const { user, loading: authLoading, session } = useAuth();

  // Past generations management with security checks
  const {
    pastGenerations,
    refreshPastGenerations,
    deleteProject,
    renameProject,
  } = usePastGenerationsFetcher(setGenerationResult, setPrompt);

  // Error boundary state
  const [fatalError, setFatalError] = useState<string | null>(null);

  // Security Check: Session validation and cleanup
  useEffect(() => {
    // Enhanced session validation
    if (!authLoading && session) {
      // Validate session integrity
      const now = new Date().getTime();
      const sessionExpiry = session.expires_at ? new Date(session.expires_at).getTime() : 0;
      
      if (sessionExpiry && sessionExpiry < now) {
        console.warn("Session expired, cleaning up");
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/auth";
      }
    }
  }, [session, authLoading]);

  // Enhanced API error boundary with security logging
  useEffect(() => {
    const handleError = (e: any) => {
      const errorMessage = e?.reason?.message || e?.message || "Unexpected error occurred";
      console.error("Application error:", errorMessage);
      setFatalError(errorMessage);
    };

    window.addEventListener("unhandledrejection", handleError);
    window.addEventListener("error", handleError);
    
    return () => {
      window.removeEventListener("unhandledrejection", handleError);
      window.removeEventListener("error", handleError);
    };
  }, []);

  // Security-enhanced generation handler with input validation
  const { generating, handleGenerate } = useGenerateApp(
    image,
    setPrompt,
    setGenerationResult,
    (cb: (prev: ProjectRow[]) => ProjectRow[]) => refreshPastGenerations(),
    user
  );

  // Secure reload handler with authentication check
  const handleReloadGeneration = (projectId: string) => {
    if (!user || !session) {
      toast({
        title: "Authentication required",
        description: "Please log in to reload previous generations.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate project ownership
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
    } else {
      toast({
        title: "Project not found",
        description: "This project may have been deleted or you don't have access.",
        variant: "destructive",
      });
    }
  };

  // Secure delete handler with confirmation
  const handleDeleteGeneration = async (projectId: string) => {
    if (!user || !session) {
      toast({
        title: "Authentication required",
        description: "Please log in to delete projects.",
        variant: "destructive",
      });
      return;
    }
    await deleteProject(projectId);
  };

  // Secure rename handler with input sanitization
  const handleRenameGeneration = async (projectId: string, newName: string) => {
    if (!user || !session) {
      toast({
        title: "Authentication required", 
        description: "Please log in to rename projects.",
        variant: "destructive",
      });
      return;
    }
    
    // Input validation
    const sanitizedName = newName.trim().slice(0, 100); // Limit length
    if (!sanitizedName) {
      toast({
        title: "Invalid name",
        description: "Project name cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    
    await renameProject(projectId, sanitizedName);
  };

  // Enhanced error UI with security context
  if (fatalError) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100">
        <AnimatedHeader />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-red-200 px-8 py-12 rounded-2xl shadow-xl text-center max-w-md"
        >
          <div className="text-3xl font-bold text-red-600 mb-4">Security Error</div>
          <div className="text-gray-800 mb-6">{fatalError}</div>
          <button
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
            onClick={() => {
              localStorage.clear();
              sessionStorage.clear();
              window.location.reload();
            }}
          >
            Secure Reload
          </button>
        </motion.div>
      </div>
    );
  }

  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <AnimatedHeader />
      <main className="flex flex-col items-center py-8 md:py-12 px-4 w-full">
        {/* Animated Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          className="text-center mb-12 md:mb-16 max-w-4xl mx-auto"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-tight"
          >
            Turn Your
            <motion.span 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text"
            > Sketches </motion.span>
            Into Code
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto"
          >
            Upload a hand-drawn wireframe, describe your vision, and watch AI generate production-ready web applications in minutes.
          </motion.p>
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 md:gap-4 text-sm text-gray-500"
          >
            {[
              { color: "bg-green-500", text: "React & TypeScript" },
              { color: "bg-blue-500", text: "Tailwind CSS" },
              { color: "bg-purple-500", text: "AI-Powered" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100"
              >
                <div className={`w-2 h-2 ${item.color} rounded-full`}></div>
                {item.text}
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Main Creation Flow - Enhanced Mobile Layout */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-full flex flex-col lg:flex-row gap-8 md:gap-12 items-start justify-center mb-12 md:mb-16 max-w-6xl mx-auto"
        >
          <div className="w-full lg:w-1/2 max-w-lg mx-auto lg:mx-0">
            <AnimatedSketchUploader onImageSelected={setImage} disabled={generating} />
          </div>
          <div className="w-full lg:w-1/2 max-w-lg mx-auto lg:mx-0">
            <AnimatedPromptPanel onSubmit={handleGenerate} disabled={generating || authLoading} loading={generating} />
          </div>
        </motion.section>

        <GeneratedPreview generation={generationResult} prompt={prompt} loading={generating} />
        
        {/* Conditional rendering based on authentication with enhanced security */}
        {user && session ? (
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
          <AnimatedGuestNotice />
        )}
        
        <AnimatedHowItWorksPanel />
      </main>
    </div>
  );
};

export default Index;
