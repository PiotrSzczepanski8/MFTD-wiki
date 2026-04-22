import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import { ArrowLeft, Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Post {
  id: string;
  title: string;
  content: string;
  likes_count: number;
  created_at: string;
  user_id: string;
  profiles: { username: string } | null;
}
interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: { username: string } | null;
}

const commentSchema = z.string().trim().min(1, "Empty comment").max(1000, "Too long");

const IdeaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    if (!id) return;
    setLoading(true);
    const [{ data: postData, error: pErr }, { data: cmts }] = await Promise.all([
      supabase.from("posts").select("id, title, content, likes_count, created_at, user_id, profiles(username)").eq("id", id).maybeSingle(),
      supabase.from("comments").select("id, content, created_at, user_id, profiles(username)").eq("post_id", id).order("created_at", { ascending: true }),
    ]);
    if (pErr || !postData) {
      toast.error("Post not found");
      navigate("/ideas");
      return;
    }
    setPost(postData as any);
    setComments((cmts ?? []) as any);

    if (user) {
      const { data: likeRow } = await supabase
        .from("post_likes")
        .select("id")
        .eq("post_id", id)
        .eq("user_id", user.id)
        .maybeSingle();
      setLiked(!!likeRow);
    }
    setLoading(false);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [id, user?.id]);

  const toggleLike = async () => {
    if (!user || !post) {
      toast.error("Sign in to like");
      return;
    }
    if (liked) {
      await supabase.from("post_likes").delete().eq("post_id", post.id).eq("user_id", user.id);
      setLiked(false);
      setPost({ ...post, likes_count: Math.max(0, post.likes_count - 1) });
    } else {
      const { error } = await supabase.from("post_likes").insert({ post_id: post.id, user_id: user.id });
      if (error) { toast.error(error.message); return; }
      setLiked(true);
      setPost({ ...post, likes_count: post.likes_count + 1 });
    }
  };

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !post) return;
    const parsed = commentSchema.safeParse(comment);
    if (!parsed.success) { toast.error(parsed.error.errors[0].message); return; }
    setSubmitting(true);
    const { error } = await supabase.from("comments").insert({
      post_id: post.id,
      user_id: user.id,
      content: parsed.data,
    });
    setSubmitting(false);
    if (error) { toast.error(error.message); return; }
    setComment("");
    load();
  };

  const deleteComment = async (cid: string) => {
    await supabase.from("comments").delete().eq("id", cid);
    setComments((cs) => cs.filter((c) => c.id !== cid));
  };

  const deletePost = async () => {
    if (!post || !user) return;
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", post.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Post deleted");
    navigate("/ideas");
  };

  if (loading || !post) {
    return <div className="container py-16 text-center text-muted-foreground">Loading…</div>;
  }

  return (
    <div className="container py-10 max-w-3xl">
      <Link to="/ideas">
        <Button variant="ghost" size="sm" className="mb-6 gap-2 -ml-3">
          <ArrowLeft className="h-4 w-4" /> Back to ideas
        </Button>
      </Link>

      <Card className="p-7 bg-card/60 backdrop-blur border-border/60 mb-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h1 className="font-display text-3xl md:text-4xl font-bold">{post.title}</h1>
          {user?.id === post.user_id && (
            <Button variant="ghost" size="icon" onClick={deletePost} className="text-muted-foreground hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
          <span>by <span className="text-foreground font-medium">{post.profiles?.username ?? "unknown"}</span></span>
          <span>·</span>
          <span>{new Date(post.created_at).toLocaleString()}</span>
        </div>
        <p className="whitespace-pre-wrap text-foreground/90 leading-relaxed">{post.content}</p>
        <div className="mt-6 pt-4 border-t border-border/40">
          <Button
            onClick={toggleLike}
            variant={liked ? "default" : "outline"}
            size="sm"
            className={liked ? "bg-primary text-primary-foreground gap-2" : "gap-2"}
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
            {post.likes_count}
          </Button>
        </div>
      </Card>

      <h2 className="font-display text-2xl font-bold mb-4">Comments ({comments.length})</h2>

      {user ? (
        <Card className="p-4 mb-5 bg-card/60 backdrop-blur border-border/60">
          <form onSubmit={submitComment} className="space-y-3">
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add to the conversation…"
              rows={3}
              maxLength={1000}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={submitting} size="sm" className="bg-gradient-lime text-primary-foreground hover:opacity-90">
                {submitting ? "Posting…" : "Post comment"}
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Card className="p-4 mb-5 bg-card/40 border-dashed border-border/60 text-center text-sm text-muted-foreground">
          <Link to="/auth" className="text-primary hover:underline">Sign in</Link> to leave a comment.
        </Card>
      )}

      <div className="space-y-3">
        {comments.map((c) => (
          <Card key={c.id} className="p-4 bg-card/40 border-border/40">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-medium text-foreground">{c.profiles?.username ?? "unknown"}</span>
                <span className="text-muted-foreground">· {new Date(c.created_at).toLocaleString()}</span>
              </div>
              {user?.id === c.user_id && (
                <Button variant="ghost" size="icon" onClick={() => deleteComment(c.id)} className="h-7 w-7 text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
            <p className="text-sm whitespace-pre-wrap">{c.content}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IdeaDetail;