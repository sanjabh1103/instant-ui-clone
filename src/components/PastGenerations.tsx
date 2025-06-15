
import { ArrowUpRight } from "lucide-react";

interface PastGen {
  image_url?: string;
  prompt: string;
  created_at: string;
  project_id?: string;
}

/**
 * Props for enhanced UX:
 * - onReload: reload/display a previous generation in the UI preview (projectId)
 */
export default function PastGenerations({
  generations,
  onReload,
}: {
  generations: PastGen[];
  onReload?: (projectId: string) => void;
}) {

  if (!generations || !generations.length) return null;

  return (
    <section className="mt-10 mb-4 px-2">
      <h3 className="font-bold text-md mb-3 text-gray-700">Past Generations</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {generations.slice(0, 5).map((g, i) => (
          <div
            key={i}
            className="rounded-lg bg-white border p-3 shadow group cursor-pointer flex flex-col relative hover:shadow-lg transition-all"
          >
            {g.image_url && (
              <img
                src={g.image_url}
                alt="sketch"
                className="object-contain h-24 rounded mb-3 group-hover:scale-105 transition"
              />
            )}
            <div className="text-xs text-muted-foreground mb-1">{new Date(g.created_at).toLocaleString()}</div>
            <div className="text-gray-900 text-sm font-medium line-clamp-2 mb-2">{g.prompt}</div>
            <div className={`text-xs mt-auto text-green-700`}>
              Ready
            </div>
            <div className="flex items-center mt-2 gap-2">
              {g.project_id && (
                <>
                  <a
                    href={`/project/${g.project_id}`}
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
                      onClick={() => g.project_id && onReload(g.project_id)}
                    >
                      Reload
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
