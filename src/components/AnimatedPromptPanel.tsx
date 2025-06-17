
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface AnimatedPromptPanelProps {
  onSubmit: (prompt: string) => void;
  disabled?: boolean;
  loading?: boolean;
}

const AnimatedPromptPanel = ({ onSubmit, disabled, loading }: AnimatedPromptPanelProps) => {
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 max-w-md w-full mx-auto relative overflow-hidden"
    >
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      />
      
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-3 mb-6"
      >
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ duration: 0.3 }}
          className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center"
        >
          <Sparkles className="w-5 h-5 text-white" />
        </motion.div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Describe Your App</h3>
          <p className="text-gray-600 text-sm">Tell us what functionality you want</p>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label htmlFor="prompt-description" className="block font-semibold text-gray-900 mb-3">
            What should this app do?
          </label>
          <motion.textarea
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            id="prompt-description"
            className="w-full min-h-[120px] rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-4 text-base transition-all resize-none bg-gray-50 focus:bg-white"
            placeholder="I want to create a todo list with priority tags, due dates, and the ability to mark tasks as complete..."
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            disabled={disabled || loading}
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-2"
        >
          <label className="block text-sm font-medium text-gray-700">Quick examples:</label>
          <div className="grid grid-cols-1 gap-2">
            {examplePrompts.map((example, index) => (
              <motion.button
                key={index}
                type="button"
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                onClick={() => setPrompt(example)}
                className="text-left text-sm text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 p-2 rounded-lg transition-all duration-200"
                disabled={disabled || loading}
              >
                "{example}"
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="w-full flex items-center gap-3 justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!prompt.trim() || disabled || loading}
        >
          {loading ? (
            <>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
              Generating App...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate App
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AnimatedPromptPanel;
