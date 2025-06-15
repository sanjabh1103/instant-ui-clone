
import { ArrowUp } from "lucide-react";

const Header = () => (
  <header className="w-full flex items-center justify-between bg-background/80 sticky top-0 z-20 h-16 border-b border-border px-8 py-2">
    <div className="flex items-center space-x-3">
      <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-br from-blue-800 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
        Reality<span className="text-indigo-700">‑</span>to‑Code <span className="hidden md:inline">AI Builder</span>
      </span>
      <span className="hidden md:inline bg-indigo-50 text-indigo-800 rounded-full px-2 py-0.5 text-xs font-semibold ml-2">
        MVP
      </span>
    </div>
    <nav className="flex items-center space-x-6 text-sm">
      <a href="#" className="hover:text-indigo-700 transition-colors">Docs</a>
      <a href="#" className="hover:text-indigo-700 transition-colors">Community</a>
      <a href="#" className="font-medium bg-primary text-primary-foreground px-3 py-1 rounded shadow hover:bg-indigo-700 transition-colors flex items-center gap-1">
        Launch App <ArrowUp className="w-4 h-4" />
      </a>
    </nav>
  </header>
);

export default Header;
