import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addComment, deleteComment, deletePost, getPostById, toggleLike } from "@/lib/storage";
import { useAuth } from "@/hooks/useAuth";

const IdeaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState(null);
  const [liked, setLiked] = useState(false);

  const load = () => {
    const nextPost = getPostById(id);
    if (!nextPost) {
      navigate("/ideas");
      return;
    }
    setPost(nextPost);
    setLiked(Boolean(nextPost.liked));
  };

  useEffect(() => {
    load();
  }, [id, user]);

  const handleLike = () => {
    try {
      const result = toggleLike(id);
      setLiked(result.liked);
      setPost((current) => current ? { ...current, likes_count: result.likes_count } : current);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  const handleComment = (event) => {
    event.preventDefault();
    setMessage(null);
    if (!comment.trim()) {
      setMessage({ type: "error", text: "Comment cannot be empty." });
      return;
    }
    try {
      addComment(id, comment.trim());
      setComment("");
      setMessage({ type: "success", text: "Comment added." });
      load();
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  const removeComment = (commentId) => {
    try {
      deleteComment(commentId);
      setMessage({ type: "success", text: "Comment removed." });
      load();
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  const removePost = () => {
    if (!confirm("Delete this post?")) {
      return;
    }
    try {
      deletePost(id);
      navigate("/ideas");
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  if (!post) {
    return <div className="container py-16 text-center text-muted-foreground">Loading…</div>;
  }

  const canEdit = user && user.id === post.userId;

  return (
    <div className="container py-10 max-w-3xl">
      <Link to="/ideas" className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-2 text-sm text-muted-foreground hover:bg-card transition mb-6">
        ← Back to ideas
      </Link>

      {message && (
        <div className={`rounded-2xl p-4 mb-6 ${message.type === "error" ? "bg-red-500/10 text-red-300" : "bg-emerald-500/10 text-emerald-300"}`}>
          {message.text}
        </div>
      )}

      <div className="rounded-3xl border border-border/60 bg-card/60 p-7 mb-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold">{post.title}</h1>
            <p className="text-xs text-muted-foreground">by {post.username} · {new Date(post.createdAt).toLocaleString()}</p>
          </div>
          {canEdit && (
            <button onClick={removePost} className="rounded-full px-3 py-2 text-sm text-destructive border border-destructive/30 hover:bg-destructive/10 transition">
              Delete
            </button>
          )}
        </div>
        <p className="whitespace-pre-wrap text-foreground/90 leading-relaxed">{post.content}</p>
        <div className="mt-6 pt-4 border-t border-border/40 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleLike}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${liked ? "bg-primary text-primary-foreground" : "border border-border/60 bg-card/60 hover:bg-card"}`}
          >
            <span style={liked ? { filter: 'grayscale(100%) brightness(0)' } : undefined}>❤</span> {post.likes_count}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold mb-4">Comments ({post.comments.length})</h2>

        {user ? (
          <form onSubmit={handleComment} className="rounded-3xl border border-border/60 bg-card/60 p-4 mb-5">
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Add to the conversation…"
              rows={3}
              className="w-full rounded-2xl border border-border/60 bg-background/80 px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
            />
            <div className="mt-3 text-right">
              <button type="submit" className="rounded-full bg-gradient-red px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition">
                Post comment
              </button>
            </div>
          </form>
        ) : (
          <div className="rounded-3xl border border-border/60 bg-card/40 p-4 text-center text-sm text-muted-foreground">
            <Link to="/auth" className="text-primary hover:underline">Sign in</Link> to leave a comment.
          </div>
        )}

        <div className="space-y-3">
          {post.comments.map((commentItem) => (
            <div key={commentItem.id} className="rounded-3xl border border-border/60 bg-card/40 p-4">
              <div className="flex items-center justify-between gap-3 mb-2 text-xs text-muted-foreground">
                <span>{commentItem.username} · {new Date(commentItem.createdAt).toLocaleString()}</span>
                {user && user.id === commentItem.userId ? (
                  <button type="button" onClick={() => removeComment(commentItem.id)} className="text-destructive hover:underline">
                    Delete
                  </button>
                ) : null}
              </div>
              <p className="text-sm whitespace-pre-wrap">{commentItem.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IdeaDetail;
