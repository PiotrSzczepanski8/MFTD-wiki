import { Link, Navigate, useParams } from "react-router-dom";
import wikiData from "@/wiki";
import { useMemo } from "react";
import RarityBadge from "@/components/wiki/RarityBadge";

const WikiDetail = () => {
  const { id } = useParams();
  const entry = useMemo(() => wikiData.wikiEntries.find((item) => item.id === id), [id]);

  if (!entry) {
    return <Navigate to="/wiki" replace />;
  }

  const meta = wikiData.categoryMeta[entry.category] || { gradient: "bg-muted", label: "Unknown" };

  return (
    <div className="container py-10 max-w-3xl">
      <Link to="/wiki" className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-2 text-sm text-muted-foreground hover:bg-card transition mb-6">
        ← Back to Codex
      </Link>

      <div className="overflow-hidden rounded-3xl bg-card/60 backdrop-blur border border-border/60">
        <div className={`h-2 ${meta.gradient}`} />
        {(entry.category === "fishermen" || entry.category === "fish") && entry.image && (
          <div className="aspect-[21/9] overflow-hidden bg-muted/30 border-b border-border/40">
            <img src={entry.image} alt={entry.title} className="h-full w-full object-contain pixel-art" />
          </div>
        )}
        <div className="p-8">
          <div className="flex items-start justify-between flex-wrap gap-3 mb-2">
            <p className="text-xs uppercase tracking-widest text-primary">{meta.label}</p>
            <RarityBadge rarity={entry.rarity} />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">{entry.title}</h1>
          <p className="text-lg text-muted-foreground mb-6">{entry.description}</p>

          {entry.lore && (
            <blockquote className="border-l-2 border-primary/50 pl-4 italic font-display text-muted-foreground mb-6">
              "{entry.lore}"
            </blockquote>
          )}

          <div className="mb-6">
            <h2 className="font-display text-sm uppercase tracking-widest text-muted-foreground mb-3">Stats</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(entry.stats).map(([key, value]) => (
                <div key={key} className="rounded-2xl bg-muted/40 p-3 border border-border/40">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">{key}</div>
                  <div className="font-display font-bold text-lg">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-sm uppercase tracking-widest text-muted-foreground mb-3">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-border/60 bg-card/70 px-3 py-1 text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WikiDetail;
