
import React from "react";

interface ProjectStructurePanelProps {
  files: string[];
}

const ProjectStructurePanel: React.FC<ProjectStructurePanelProps> = ({ files }) => {
  if (!files?.length) return null;
  return (
    <div className="w-full mt-6 max-w-xl mx-auto bg-slate-50 border border-border rounded-xl shadow p-4">
      <h4 className="font-bold text-md mb-2 text-gray-700 flex gap-2 items-center">
        🗂️ Project Structure
      </h4>
      <ul className="text-sm font-mono grid gap-1 pl-1">
        {files.map((f, i) => (
          <li key={i} className="text-gray-800">{f}</li>
        ))}
      </ul>
      <div className="mt-3 text-xs text-muted-foreground">
        (Editing files in-app coming soon)
      </div>
    </div>
  );
};

export default ProjectStructurePanel;
