
import React from "react";
import { Loader2, CheckCircle2, XCircle, ExternalLink, Code2 } from "lucide-react";
import ProjectStructurePanel from "./ProjectStructurePanel";

interface GeneratedPreviewProps {
  generation: null | { projectId: string; status: string; files: string[] };
  prompt: string;
  loading: boolean;
}

const GeneratedPreview: React.FC<GeneratedPreviewProps> = ({ generation, prompt, loading }) => {
  if (loading) {
    return (
      <section className="my-12 w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
            <Loader2 className="animate-spin w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Generating Your App</h3>
          <p className="text-gray-600 text-lg mb-6">Our AI is analyzing your sketch and creating custom code...</p>
          <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
          </div>
          <p className="text-sm text-gray-500 mt-4">This usually takes 30-60 seconds</p>
        </div>
      </section>
    );
  }

  if (!generation) return null;

  if (generation.status === "ready") {
    return (
      <section className="my-12 w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
            <div className="flex items-center gap-4 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">App Generated Successfully!</h3>
                <p className="text-green-100">Your custom application is ready to preview</p>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            {prompt && (
              <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Your Request:</h4>
                <p className="text-gray-700 italic">"{prompt}"</p>
              </div>
            )}
            
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5 text-sm text-gray-600 font-mono mb-4">
                <Code2 className="w-4 h-4" />
                Project ID: {generation.projectId}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/project/${generation.projectId}`}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <ExternalLink className="w-5 h-5" />
                View Live Preview
              </a>
              <a
                href={`/project/${generation.projectId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all duration-200"
              >
                Open in New Tab
              </a>
            </div>

            <ProjectStructurePanel files={generation.files || []} />
          </div>
        </div>
      </section>
    );
  }

  // Error state
  return (
    <section className="my-12 w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
          <div className="flex items-center gap-4 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <XCircle className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Generation Failed</h3>
              <p className="text-red-100">There was an error generating your app</p>
            </div>
          </div>
        </div>
        
        <div className="p-8 text-center">
          <p className="text-gray-600 mb-6">Please try again with a different sketch or description.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    </section>
  );
};

export default GeneratedPreview;
