import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { z } from "zod";
import { User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const profileSchema = z.object({
  username: z.string().trim().min(3).max(24).regex(/^[a-zA-Z0-9_]+$/, "Letters, numbers and _ only"),
  bio: z.string().trim().max(280).optional(),
});

interface UserPost { id: string; title: string; created_at: string; likes_count: number; }

const Profile = () => {
  const { user, profile, loading, refreshProfile } = useAuth();
  const [form, setForm] = useState({ username: "", bio: "" });
  const [saving, setSaving] = useState(false);
  const [posts, setPosts] = useState<UserPost[]>([]);

  useEffect(() => {
    if (profile) setForm({ username: profile.username, bio: profile.bio ?? "" });
  }, [profile]);

  useEffect(() => {
    if (!user) return;
    supabase.from("posts").select("id, title, created_at, likes_count").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => setPosts((data ?? []) as any));
  }, [user]);

  if (!loading && !user) return <Navigate to="/auth" replace />;
  if (loading) return <div className="container py-16 text-center text-muted-foreground">Loading…</div>;

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = profileSchema.safeParse(form);
    if (!parsed.success) { toast.error(parsed.error.errors[0].message); return; }
    setSaving(true);
    const { error } = await supabase.from("profiles").update({
      username: parsed.data.username,
      bio: parsed.data.bio || null,
    }).eq("id", user!.id);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Profile updated");
    refreshProfile();
  };

  return (
    <div className="container py-10 max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-16 w-16 rounded-2xl bg-gradient-lime flex items-center justify-center shadow-glow">
          <UserIcon className="h-8 w-8 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold">{profile?.username}</h1>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      <Card className="p-6 bg-card/60 backdrop-blur border-border/60 mb-8">
        <h2 className="font-display text-xl font-bold mb-4">Edit profile</h2>
        <form onSubmit={save} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="u">Username</Label>
            <Input id="u" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} maxLength={24} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="b">Bio</Label>
            <Textarea id="b" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} maxLength={280} rows={3} placeholder="Tell other anglers about yourself…" />
          </div>
          <Button type="submit" disabled={saving} className="bg-gradient-lime text-primary-foreground hover:opacity-90">
            {saving ? "Saving…" : "Save"}
          </Button>
        </form>
      </Card>

      <h2 className="font-display text-xl font-bold mb-3">Your posts ({posts.length})</h2>
      {posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">You haven't posted any ideas yet.</p>
      ) : (
        <div className="space-y-2">
          {posts.map((p) => (
            <Link key={p.id} to={`/ideas/${p.id}`}>
              <Card className="p-4 bg-card/60 backdrop-blur border-border/60 hover:border-primary/50 transition-colors flex items-center justify-between">
                <div>
                  <p className="font-medium">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{new Date(p.created_at).toLocaleDateString()} · {p.likes_count} likes</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;