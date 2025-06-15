
import { useEffect, useState } from "react";
import { RefreshCw, ArrowUpRight } from "lucide-react";

interface PastGen {
  image?: string;
  prompt: string;
  date: string;
  status: string;
  projectId?: string;
}

const KEY = "r2c-past-generations";

/**
 * Props for enhanced UX:
 * - onReload: reload/display a previous generation in the UI preview (projectId)
 * - onRerun: re-run a previous image+prompt via interpreter API (image, prompt)
 */
export default function PastGenerations({
  onReload,
  onRerun,
}: {
  onReload?: (projectId: string) => void;
  onRerun?: (image: string, prompt: string) => void;
}) {
  const [generations, setGenerations] = useState<PastGen[]>([]);

  useEffect(() => {
    const arr = localStorage.getItem(KEY);
    setGenerations(arr ? JSON.parse(arr) : []);
  }, []);

  if (!generations.length) return null;

  return (
    <section className="mt-10 mb-4 px-2">
      <h3 className="font-bold text-md mb-3 text-gray-700">Past Generations</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {generations.slice(0, 5).map((g, i) => (
          <div
            key={i}
            className="rounded-lg bg-white border p-3 shadow group cursor-pointer flex flex-col relative hover:shadow-lg transition-all"
          >
            {g.image && (
              <img
                src={g.image}
                alt="sketch"
                className="object-contain h-24 rounded mb-3 group-hover:scale-105 transition"
              />
            )}
            <div className="text-xs text-muted-foreground mb-1">{new Date(g.date).toLocaleString()}</div>
            <div className="text-gray-900 text-sm font-medium line-clamp-2 mb-2">{g.prompt}</div>
            <div className={`text-xs mt-auto ${g.status === "ready" ? "text-green-700" : "text-yellow-700"}`}>
              {g.status === "ready" ? "Ready" : "Processing"}
            </div>
            <div className="flex items-center mt-2 gap-2">
              {g.projectId && (
                <>
                  <a
                    href={`/project/${g.projectId}`}
                    className="text-indigo-600 underline text-xs hover:text-indigo-800 flex items-center gap-1"
                    title="Open preview"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    View
                  </a>
                  {onReload && (
                    <button
                      className="px-2 py-0.5 bg-gray-100 rounded hover:bg-indigo-50 text-xs text-indigo-700 border border-indigo-100 ml-2"
                      title="Reload preview"
                      onClick={() => g.projectId && onReload(g.projectId)}
                    >
                      Reload
                    </button>
                  )}
                </>
              )}
              {onRerun && g.image && g.prompt && (
                <button
                  className="ml-auto px-2 py-0.5 bg-gray-100 hover:bg-yellow-50 text-xs text-yellow-700 border border-yellow-200 rounded flex items-center gap-1"
                  title="Regenerate this app"
                  onClick={() => onRerun(g.image!, g.prompt)}
                >
                  <RefreshCw className="w-3 h-3" />
                  Rerun
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
