
import { useEffect, useState } from "react";

interface PastGen {
  image?: string;
  prompt: string;
  date: string;
  status: string;
  projectId?: string;
}

const KEY = "r2c-past-generations";

export default function PastGenerations() {
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
          <div key={i} className="rounded-lg bg-white border p-3 shadow hover:shadow-lg transition-all group cursor-pointer flex flex-col">
            {g.image && <img src={g.image} alt="sketch" className="object-contain h-24 rounded mb-3 group-hover:scale-105 transition" />}
            <div className="text-xs text-muted-foreground mb-1">{new Date(g.date).toLocaleString()}</div>
            <div className="text-gray-900 text-sm font-medium line-clamp-2 mb-2">{g.prompt}</div>
            <div className={`text-xs mt-auto ${g.status === "ready" ? "text-green-700" : "text-yellow-700"}`}>
              {g.status === "ready" ? "Ready" : "Processing"}
            </div>
            {g.projectId && (
              <a href={`/project/${g.projectId}`} className="mt-1 text-indigo-600 underline text-xs hover:text-indigo-800">View</a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
