
import { useState } from "react";
import { ArrowRight } from "lucide-react";

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

  return (
    <form className="flex flex-col gap-4 p-8 bg-white border border-border rounded-xl shadow-xl max-w-md w-full mx-auto" onSubmit={handleSubmit}>
      <label htmlFor="prompt-description" className="font-semibold text-lg">
        Describe What This App Should Do
      </label>
      <textarea
        id="prompt-description"
        className="w-full min-h-[64px] rounded border border-input focus:ring-2 focus:ring-indigo-400 p-2 text-base transition"
        placeholder="e.g. 'I want a todo list with priority tags and due dates'"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        disabled={disabled || loading}
      />
      <button
        type="submit"
        className="flex items-center gap-2 justify-center bg-primary text-primary-foreground px-4 py-2 rounded font-bold text-lg shadow hover:bg-indigo-700 transition-colors disabled:opacity-50"
        disabled={!prompt.trim() || disabled || loading}
      >
        {loading ? "Generating..." : "Generate App"}
        <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  );
};

export default PromptPanel;
