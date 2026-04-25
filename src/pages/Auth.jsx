import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Auth = () => {
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [mode, setMode] = useState(
    params.get("mode") === "signup" ? "signup" : "signin",
  );
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", username: "" });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setMode(params.get("mode") === "signup" ? "signup" : "signin");
  }, [params]);

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      if (mode === "signup") {
        if (!form.username.trim() || form.username.trim().length < 3) {
          throw new Error("Username requires at least 3 characters.");
        }
        if (!form.email.trim() || !form.email.includes("@")) {
          throw new Error("Provide a valid email.");
        }
        if (!form.password || form.password.length < 6) {
          throw new Error("Password must be at least 6 characters.");
        }
        await signUp(form.email.trim(), form.password, form.username.trim());
      } else {
        if (!form.email.trim() || !form.email.includes("@")) {
          throw new Error("Provide a valid email.");
        }
        if (!form.password) {
          throw new Error("Password is required.");
        }
        await signIn(form.email.trim(), form.password);
      }
      navigate("/");
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-16 max-w-md">
      <div className="text-center mb-8">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-red shadow-glow mb-4 text-2xl">
          <span style={{ filter: 'grayscale(100%) brightness(0)'}}>⚓</span>
        </div>
        <h1 className="font-display text-3xl font-bold">
          {mode === "signup" ? "Join the crew" : "Welcome back, angler"}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {mode === "signup"
            ? "Sign up to share ideas and comment."
            : "Sign in to your account."}
        </p>
      </div>

      {message && (
        <div
          className={`rounded-2xl p-4 mb-6 ${message.type === "error" ? "bg-red-500/10 text-red-300" : "bg-emerald-500/10 text-emerald-300"}`}
        >
          {message.text}
        </div>
      )}

      <div className="rounded-3xl border border-border/60 bg-card/60 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Username
              </label>
              <input
                id="username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="captain_hook"
                className="w-full rounded-2xl border border-border/60 bg-background/80 px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@dock.sea"
              className="w-full rounded-2xl border border-border/60 bg-background/80 px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-border/60 bg-background/80 px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-red px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
          >
            {loading ? "Casting…" : mode === "signup" ? "Sign up" : "Sign in"}
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-muted-foreground">
          {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setParams({})}
                className="text-primary hover:underline"
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              New here?{" "}
              <button
                type="button"
                onClick={() => setParams({ mode: "signup" })}
                className="text-primary hover:underline"
              >
                Create account
              </button>
            </>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-6">
        <Link to="/" className="hover:text-foreground">
          ← Back to Home
        </Link>
      </p>
    </div>
  );
};

export default Auth;
