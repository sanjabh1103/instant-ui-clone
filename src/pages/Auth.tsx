
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { user, loading, signIn, signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState<"login" | "signup">("login");
  const [formLoading, setFormLoading] = useState(false);
  const nav = useNavigate();

  if (user) {
    setTimeout(() => nav("/"), 300);
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <Loader2 className="animate-spin w-8 h-8 mr-2" />
        Redirecting...
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    if (type === "login") {
      const { error } = await signIn(email, password);
      if (error) {
        toast({
          title: "Login failed",
          description: error.message || "Invalid credentials",
          variant: "destructive"
        });
      }
    } else {
      const { error } = await signUp(email, password);
      if (error) {
        toast({
          title: "Signup failed",
          description: error.message || "Could not create account",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Signup successful",
          description: "Check your email to confirm your address.",
        });
      }
    }
    setFormLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border rounded-xl shadow-lg p-8 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-extrabold">{type === "login" ? "Login" : "Sign up"}</h2>
        <input
          type="email"
          required
          placeholder="Email"
          className="border p-2 rounded w-full"
          value={email}
          disabled={loading || formLoading}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="Password"
          className="border p-2 rounded w-full"
          value={password}
          disabled={loading || formLoading}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading || formLoading}
          className="w-full py-2 bg-indigo-700 text-white rounded font-bold flex items-center justify-center"
        >
          {(loading || formLoading) && <Loader2 className="animate-spin w-5 h-5 mr-2" />}
          {type === "login" ? "Login" : "Create Account"}
        </button>
        <div className="text-sm text-center text-muted-foreground mt-2">
          {type === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                className="underline text-indigo-700"
                onClick={() => setType("signup")}
                disabled={loading || formLoading}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                className="underline text-indigo-700"
                onClick={() => setType("login")}
                disabled={loading || formLoading}
              >
                Login
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Auth;
