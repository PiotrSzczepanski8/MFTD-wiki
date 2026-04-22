import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Heart, MessageCircle, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface PostRow {
  id: string;
  title: string;
  content: string;
  likes_count: number;
  created_at: string;
  user_id: string;
  profiles: { username: string } | null;
  comments: { count: number }[];
}

const postSchema = z.object({
  title: z.string().trim().min(3, "Title too short").max(120),
  content: z.string().trim().min(10, "Tell us more").max(5000),
});

const Ideas = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, content, likes_count, created_at, user_id, profiles(username), comments(count)")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load posts");
    } else {
      setPosts((data ?? []) as any);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Sign in to share an idea");
      return;
    }
    const parsed = postSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("posts").insert({
      title: parsed.data.title,
      content: parsed.data.content,
      user_id: user.id,
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Idea cast into the deep!");
      setForm({ title: "", content: "" });
      setShowForm(false);
      load();
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
          <Button onClick={() => setShowForm((s) => !s)} className="bg-gradient-lime text-primary-foreground hover:opacity-90 gap-2">
            {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {showForm ? "Cancel" : "New idea"}
          </Button>
        ) : (
          <Link to="/auth"><Button variant="outline">Sign in to post</Button></Link>
        )}
      </div>

      {showForm && user && (
        <Card className="p-6 mb-6 bg-card/60 backdrop-blur border-primary/30 animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="A new legendary fisherman idea…"
                maxLength={120}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Describe your idea…"
                rows={6}
                maxLength={5000}
              />
            </div>
            <Button type="submit" disabled={submitting} className="bg-gradient-lime text-primary-foreground hover:opacity-90">
              {submitting ? "Posting…" : "Post idea"}
            </Button>
          </form>
        </Card>
      )}

      {loading ? (
        <div className="text-center text-muted-foreground py-12">Reeling in posts…</div>
      ) : posts.length === 0 ? (
        <Card className="p-12 text-center bg-card/40 border-dashed border-border/60">
          <p className="font-display text-xl mb-1">The waters are still.</p>
          <p className="text-muted-foreground text-sm">Be the first to share an idea.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <Link key={p.id} to={`/ideas/${p.id}`}>
              <Card className="p-5 bg-card/60 backdrop-blur border-border/60 hover:border-primary/50 transition-all hover:-translate-y-0.5 hover:shadow-card">
                <h2 className="font-display text-xl font-bold mb-1 hover:text-primary transition-colors">{p.title}</h2>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{p.content}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>by <span className="text-foreground font-medium">{p.profiles?.username ?? "unknown"}</span></span>
                  <span>·</span>
                  <span>{new Date(p.created_at).toLocaleDateString()}</span>
                  <span className="ml-auto flex items-center gap-3">
                    <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5" /> {p.likes_count}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" /> {p.comments?.[0]?.count ?? 0}</span>
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ideas;