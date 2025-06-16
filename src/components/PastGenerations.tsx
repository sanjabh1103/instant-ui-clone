
import { ArrowUpRight, Clock, Sparkles } from "lucide-react";
import PastGenerationActions from "./PastGenerationActions";

interface PastGen {
  image_url?: string;
  prompt: string;
  created_at: string;
  project_id?: string;
  name?: string;
}

/** 
 * Props for enhanced UX:
 * - onReload: reload/display a previous generation in the UI preview (projectId)
 * - onDelete: delete project handler (optional)
 * - onRename: rename project handler (optional)
 */
export default function PastGenerations({
  generations,
  onReload,
  onDelete,
  onRename,
}: {
  generations: PastGen[];
  onReload?: (projectId: string) => void;
  onDelete?: (projectId: string) => void;
  onRename?: (projectId: string, newName: string) => void;
}) {
  if (!generations || !generations.length) return null;

  return (
    <section className="mt-16 mb-8 px-4 w-full max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-black text-gray-900 mb-4">Your Recent Creations</h3>
        <p className="text-lg text-gray-600">Pick up where you left off or start fresh</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {generations.slice(0, 6).map((g, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            {g.image_url && (
              <div className="relative h-48 bg-gray-50 overflow-hidden">
                <img
                  src={g.image_url}
                  alt="Project sketch"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <div className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Ready
                  </div>
                </div>
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <Clock className="w-4 h-4" />
                {new Date(g.created_at).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              
              <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                {g.name ?? g.prompt}
              </h4>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {g.prompt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {g.project_id && (
                    <>
                      <a
                        href={`/project/${g.project_id}`}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                        View
                      </a>
                      {onReload && (
                        <button
                          className="inline-flex items-center gap-2 bg-gray-100 hover:bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-semibold text-sm border border-gray-200 hover:border-indigo-200 transition-all"
                          onClick={() => g.project_id && onReload(g.project_id)}
                        >
                          <Sparkles className="w-4 h-4" />
                          Reload
                        </button>
                      )}
                    </>
                  )}
                </div>
                
                {/* Add Actions (Rename/Delete) */}
                {(onDelete || onRename) && g.project_id && (
                  <PastGenerationActions
                    onDelete={() => onDelete?.(g.project_id!)}
                    onRename={(name) => onRename?.(g.project_id!, name)}
                    initialName={g.name ?? g.prompt}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
