
import React from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

interface GeneratedPreviewProps {
  generation: null | { projectId: string; status: string; files: string[] };
  prompt: string;
  loading: boolean;
}

const GeneratedPreview: React.FC<GeneratedPreviewProps> = ({ generation, prompt, loading }) => {
  if (loading) {
    return (
      <div className="my-8 flex flex-col items-center justify-center h-48">
        <Loader2 className="animate-spin w-10 h-10 mb-3 text-indigo-700" />
        <div className="font-medium text-indigo-700">Generating app, please wait...</div>
      </div>
    );
  }

  if (!generation) return null;

  if (generation.status === "ready") {
    return (
      <div className="w-full max-w-xl mx-auto bg-white border p-6 rounded-xl shadow my-8 flex flex-col items-center">
        <CheckCircle2 className="text-green-600 w-8 h-8 mb-2" />
        <div className="font-semibold mb-2 text-gray-900 text-lg">Preview Generated App</div>
        {prompt && <div className="text-muted-foreground mb-2 text-sm">Prompt: <span className="italic">{prompt}</span></div>}
        <div className="mb-2 text-xs text-gray-700">
          Project ID: <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{generation.projectId}</span>
        </div>
        <a
          href={`/project/${generation.projectId}`}
          className="inline-block mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-bold"
        >
          View Preview
        </a>
      </div>
    );
  }

  // If result status is not ready or failed
  return (
    <div className="w-full max-w-xl mx-auto bg-white border p-6 rounded-xl shadow my-8 flex flex-col items-center">
      <XCircle className="text-red-500 w-8 h-8 mb-2" />
      <div className="font-medium text-red-700">App generation error.</div>
    </div>
  );
};

export default GeneratedPreview;
