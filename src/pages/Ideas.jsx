import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import storage from "@/storage";
import auth from "@/useAuth";

const Ideas = () => {
  const { user } = auth.useAuth();
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });
  const [message, setMessage] = useState(null);

  const load = () => {
    setPosts(storage.getPosts());
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);

    if (!form.title.trim() || form.title.trim().length < 3) {
      setMessage({ type: "error", text: "Title should be at least 3 characters." });
      return;
    }
    if (!form.content.trim() || form.content.trim().length < 10) {
      setMessage({ type: "error", text: "Content should be at least 10 characters." });
      return;
    }

    try {
      await storage.createPost({ title: form.title.trim(), content: form.content.trim() });
      setForm({ title: "", content: "" });
      setShowForm(false);
      setMessage({ type: "success", text: "Idea posted to the deep." });
      load();
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  return (
    <div className="container py-10 max-w-4xl">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">Player Ideas</h1>
          <p className="text-muted-foreground">Share strategies, suggest fishermen, dream up new fish.</p>
        </div>
        {user ? (
          <button
            type="button"
            onClick={() => setShowForm((current) => !current)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-red px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
          >
            {showForm ? "Cancel" : "New idea"}
          </button>
        ) : (
          <Link to="/auth" className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-5 py-3 text-sm font-semibold transition hover:bg-card">
            Sign in to post
          </Link>
        )}
      </div>

      {message && (
        <div className={`rounded-2xl p-4 mb-6 ${message.type === "error" ? "bg-red-500/10 text-red-300" : "bg-emerald-500/10 text-emerald-300"}`}>
          {message.text}
        </div>
      )}

      {showForm && user && (
        <div className="rounded-3xl border border-primary/30 bg-card/60 p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Title</label>
              <input
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                placeholder="A new legendary fisherman idea…"
                className="w-full rounded-2xl border border-border/60 bg-background/80 px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Content</label>
              <textarea
                value={form.content}
                onChange={(event) => setForm({ ...form, content: event.target.value })}
                placeholder="Describe your idea…"
                rows={6}
                className="w-full rounded-2xl border border-border/60 bg-background/80 px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
              />
            </div>
            <button type="submit" className="rounded-full bg-gradient-red px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition">
              Post idea
            </button>
          </form>
        </div>
      )}

      {posts.length === 0 ? (
        <div className="rounded-3xl border border-border/60 bg-card/40 p-12 text-center text-muted-foreground">
          <p className="font-display text-xl mb-1">The waters are still.</p>
          <p className="text-sm">Be the first to share an idea.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link key={post.id} to={`/ideas/${post.id}`} className="block rounded-3xl border border-border/60 bg-card/60 p-5 transition hover:-translate-y-0.5 hover:shadow-card">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h2 className="font-display text-xl font-bold mb-1">{post.title}</h2>
                  <p className="text-xs text-muted-foreground">by {post.username} · {new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span>❤ {post.likes_count}</span>
                  <span>💬 {post.comments_count}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ideas;
