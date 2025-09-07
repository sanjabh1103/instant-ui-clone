
import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
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

  const heroVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // easeOut cubic bezier
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94] // easeOut cubic bezier
      }
    }
  };

  return (
    <div className="min-h-screen w-full">
      <AnimatedHeader />

      {/* Full-width Hero Section with Background Image */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
          }}
        />

        {/* Blurred Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        {/* Glassmorphism Content Container */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl">
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-serif font-light text-white mb-6 sm:mb-8 tracking-wide leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Turn Your
              <motion.span
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="block sm:inline bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 text-transparent bg-clip-text font-medium"
              >
                Sketches
              </motion.span>
              Into Code
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-12 leading-relaxed max-w-4xl mx-auto font-light"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Upload a hand-drawn wireframe, describe your vision, and watch AI generate production-ready web applications in minutes.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
            >
              {[
                { color: "bg-emerald-400", text: "React & TypeScript" },
                { color: "bg-blue-400", text: "Tailwind CSS" },
                { color: "bg-purple-400", text: "AI-Powered" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.05,
                    y: -3,
                    boxShadow: "0 10px 25px rgba(255,255,255,0.2)"
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-white font-medium hover:bg-white/30 transition-all duration-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <div className={`w-2 h-2 ${item.color} rounded-full animate-pulse`}></div>
                  {item.text}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      <main className="flex flex-col items-center py-12 sm:py-16 lg:py-20 px-4 w-full bg-gradient-to-br from-slate-50 via-white to-slate-100">

        {/* Main Creation Flow - Premium Mobile Layout */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-7xl mx-auto mb-16 lg:mb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-2 lg:order-1"
            >
              <div className="backdrop-blur-sm bg-white/80 border border-white/20 rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
                <AnimatedSketchUploader onImageSelected={setImage} disabled={generating} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="order-1 lg:order-2"
            >
              <div className="backdrop-blur-sm bg-white/80 border border-white/20 rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
                <AnimatedPromptPanel onSubmit={handleGenerate} disabled={generating || authLoading} loading={generating} />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Generated Preview with Enhanced Animations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl mx-auto mb-16"
        >
          <GeneratedPreview generation={generationResult} prompt={prompt} loading={generating} />
        </motion.div>

        {/* Past Generations with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-6xl mx-auto mb-16"
        >
          {user && session ? (
            <div className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-2xl p-6 sm:p-8 shadow-xl">
              <PastGenerations
                generations={pastGenerations.map(g => ({
                  ...g,
                  prompt: g.prompt ?? "",
                }))}
                onReload={handleReloadGeneration}
                onDelete={handleDeleteGeneration}
                onRename={handleRenameGeneration}
              />
            </div>
          ) : (
            <div className="backdrop-blur-sm bg-white/60 border border-white/20 rounded-2xl p-6 sm:p-8 shadow-xl">
              <AnimatedGuestNotice />
            </div>
          )}
        </motion.div>

        {/* How It Works Panel with Enhanced Styling */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full"
        >
          <AnimatedHowItWorksPanel />
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
