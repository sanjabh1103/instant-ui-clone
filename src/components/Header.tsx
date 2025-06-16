
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
    <header className="w-full flex items-center justify-between bg-white/95 backdrop-blur-sm sticky top-0 z-20 h-20 border-b border-gray-200/50 px-6 lg:px-12 py-4 shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <ArrowUp className="w-6 h-6 text-white rotate-45" />
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-700 text-transparent bg-clip-text">
              Reality‑to‑Code
            </span>
            <div className="text-xs text-gray-500 font-medium tracking-wide">AI Builder Platform</div>
          </div>
        </div>
        <span className="hidden md:inline bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full px-3 py-1 text-xs font-bold shadow-md">
          BETA
        </span>
      </div>
      <nav className="flex items-center space-x-8 text-sm">
        <Link to="/docs" className="text-gray-600 hover:text-indigo-700 transition-colors font-medium">Documentation</Link>
        <Link to="/community" className="text-gray-600 hover:text-indigo-700 transition-colors font-medium">Community</Link>
        {!user && (
          <Link
            to="/auth"
            className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Get Started
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-4">
            <div className="px-3 py-1.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 text-sm font-medium">
              {user.email}
            </div>
            <button
              onClick={handleLogout}
              disabled={loading || loggingOut}
              className="flex items-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 hover:text-red-600 px-4 py-2 rounded-lg transition-all text-sm font-medium shadow-sm hover:shadow-md"
            >
              <LogOut className="w-4 h-4" /> 
              {loggingOut ? "Signing out..." : "Sign Out"}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
