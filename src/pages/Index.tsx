
import { useState } from "react";
import Header from "@/components/Header";
import SketchUploader from "@/components/SketchUploader";
import PromptPanel from "@/components/PromptPanel";
import PastGenerations from "@/components/PastGenerations";
import { interpretSketch } from "@/lib/interpreterApi";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [image, setImage] = useState<string>("");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async (prompt: string) => {
    if (!image) {
      toast({
        title: "No sketch uploaded",
        description: "Please upload or capture a sketch first.",
      });
      return;
    }
    setGenerating(true);
    try {
      await interpretSketch({ image, prompt });
      toast({
        title: "App generated!",
        description: "Check your preview below, or edit/deploy.",
      });
    } catch (e) {
      toast({
        title: "Error generating app",
        description: String(e),
        variant: "destructive",
      });
    }
    setGenerating(false);
  };

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
        <PastGenerations />
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
