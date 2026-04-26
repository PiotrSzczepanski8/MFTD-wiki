import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import auth from "@/useAuth";
import storage from "@/storage";

const Profile = () => {
  const { user, loading, updateProfile } = auth.useAuth();
  const [form, setForm] = useState({ username: "", bio: "" });
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({ username: user.username || "", bio: user.bio || "" });
      setPosts(storage.getUserPosts(user.id));
    }
  }, [user]);

  if (!loading && !user) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return (
      <div className="container py-16 text-center text-muted-foreground">
        Loading…
      </div>
    );
  }

  const handleSave = async (event) => {
    event.preventDefault();
    setMessage(null);
    if (!form.username.trim() || form.username.trim().length < 3) {
      setMessage({
        type: "error",
        text: "Username needs at least 3 characters.",
      });
      return;
    }
    setSaving(true);
    try {
      await updateProfile({
        username: form.username.trim(),
        bio: form.bio.trim(),
      });
      setMessage({ type: "success", text: "Profile updated." });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container py-10 max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-16 w-16 rounded-2xl bg-gradient-red flex items-center justify-center shadow-glow text-2xl">
          <span style={{ filter: "grayscale(100%) brightness(0)" }}>👤</span>
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold">{user.username}</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      {message && (
        <div
          className={`rounded-2xl p-4 mb-6 ${message.type === "error" ? "bg-red-500/10 text-red-300" : "bg-emerald-500/10 text-emerald-300"}`}
        >
          {message.text}
        </div>
      )}

      <div className="rounded-3xl border border-border/60 bg-card/60 p-6 mb-8">
        <h2 className="font-display text-xl font-bold mb-4">Edit profile</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Username
            </label>
            <input
              value={form.username}
              onChange={(event) =>
                setForm({ ...form, username: event.target.value })
              }
              className="w-full rounded-2xl border border-border/60 bg-background/80 px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Bio
            </label>
            <textarea
              value={form.bio}
              onChange={(event) =>
                setForm({ ...form, bio: event.target.value })
              }
              rows={3}
              className="w-full rounded-2xl border border-border/60 bg-background/80 px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-gradient-red px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </form>
      </div>

      <h2 className="font-display text-xl font-bold mb-3">
        Your posts ({posts.length})
      </h2>
      {posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          You haven't posted any ideas yet.
        </p>
      ) : (
        <div className="space-y-2">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/ideas/${post.id}`}
              className="block rounded-3xl border border-border/60 bg-card/60 p-4 transition hover:border-primary/50"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">{post.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-xs">❤ {post.likes_count}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
