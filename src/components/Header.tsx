
import { ArrowUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const Header = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been logged out.",
      });
      setTimeout(() => {
        window.location.href = "/auth";
      }, 400);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message || "Failed to log out.",
        variant: "destructive",
      });
    }
    setLoggingOut(false);
  };

  return (
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
        <Link to="/docs" className="hover:text-indigo-700 transition-colors">Docs</Link>
        <Link to="/community" className="hover:text-indigo-700 transition-colors">Community</Link>
        {!user && (
          <Link
            to="/auth"
            className="font-medium bg-primary text-primary-foreground px-3 py-1 rounded shadow hover:bg-indigo-700 transition-colors flex items-center gap-1"
          >
            Login
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 border rounded bg-gray-50 text-gray-700 text-xs">{user.email}</span>
            <button
              onClick={handleLogout}
              disabled={loading || loggingOut}
              className="flex items-center gap-1 border bg-secondary hover:bg-indigo-100 text-indigo-800 px-2 py-1 rounded transition text-xs font-semibold"
            >
              <LogOut className="w-4 h-4" /> {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
