
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

interface AnimatedPromptPanelProps {
  onSubmit: (prompt: string) => void;
  disabled?: boolean;
  loading?: boolean;
}

const AnimatedPromptPanel = ({ onSubmit, disabled = false, loading = false }: AnimatedPromptPanelProps) => {
  const [prompt, setPrompt] = useState("");
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !disabled && !loading) {
      onSubmit(prompt.trim());
    }
  };

  const canSubmit = prompt.trim() && !disabled && !loading;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
        <div className="flex items-center gap-3 mb-2">
          <motion.div
            animate={{ rotate: loading ? 360 : 0 }}
            transition={{ duration: 2, repeat: loading ? Infinity : 0, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>
          <h3 className="text-xl font-bold text-white">Describe Your Vision</h3>
        </div>
        <p className="text-indigo-100 text-sm">
          Tell me what kind of app you want to build, and I'll turn your sketch into reality.
        </p>
      </div>

      <div className="p-6">
        {!user ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-indigo-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Sign In Required</h4>
            <p className="text-gray-600 mb-6">
              Please sign in to start generating your app from sketches.
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <User className="w-5 h-5" />
              Sign In to Continue
            </Link>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                App Description
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your app idea... For example: 'A todo list with priority levels and due dates' or 'A social media dashboard with analytics'"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition-all duration-200"
                rows={4}
                disabled={disabled || loading}
              />
            </div>
            
            <motion.button
              type="submit"
              disabled={!canSubmit}
              whileHover={canSubmit ? { scale: 1.02 } : {}}
              whileTap={canSubmit ? { scale: 0.98 } : {}}
              className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                canSubmit
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  Generating Your App...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Generate App
                </>
              )}
            </motion.button>
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default AnimatedPromptPanel;
