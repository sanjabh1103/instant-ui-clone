
import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

interface PromptPanelProps {
  onSubmit: (prompt: string) => void;
  disabled?: boolean;
  loading?: boolean;
}

const PromptPanel = ({ onSubmit, disabled, loading }: PromptPanelProps) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) onSubmit(prompt);
  };

  const examplePrompts = [
    "A todo list with priority tags and due dates",
    "A dashboard with charts and analytics",
    "A contact form with validation",
    "A product catalog with filters"
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-md w-full mx-auto relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Describe Your App</h3>
          <p className="text-gray-600 text-sm">Tell us what functionality you want</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="prompt-description" className="block font-semibold text-gray-900 mb-3">
            What should this app do?
          </label>
          <textarea
            id="prompt-description"
            className="w-full min-h-[120px] rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-4 text-base transition-all resize-none bg-gray-50 focus:bg-white"
            placeholder="I want to create a todo list with priority tags, due dates, and the ability to mark tasks as complete..."
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            disabled={disabled || loading}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Quick examples:</label>
          <div className="grid grid-cols-1 gap-2">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setPrompt(example)}
                className="text-left text-sm text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 p-2 rounded-lg transition-colors"
                disabled={disabled || loading}
              >
                "{example}"
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center gap-3 justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          disabled={!prompt.trim() || disabled || loading}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Generating App...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate App
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PromptPanel;
