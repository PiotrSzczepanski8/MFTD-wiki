import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RarityBadge } from "@/components/wiki/RarityBadge";
import { categoryMeta, wikiEntries } from "@/data/wiki";

const WikiDetail = () => {
  const { id } = useParams();
  const entry = wikiEntries.find((e) => e.id === id);
  if (!entry) return <Navigate to="/wiki" replace />;
  const meta = categoryMeta[entry.category];

  return (
    <div className="container py-10 max-w-3xl">
      <Link to="/wiki">
        <Button variant="ghost" size="sm" className="mb-6 gap-2 -ml-3">
          <ArrowLeft className="h-4 w-4" />
          Back to Codex
        </Button>
      </Link>

      <Card className="overflow-hidden bg-card/60 backdrop-blur border-border/60">
        <div className={`h-2 ${meta.gradient}`} />
        {(entry.category === "fishermen" || entry.category === "fish") && entry.image && (
          <div className="aspect-[21/9] overflow-hidden bg-muted/30 border-b border-border/40">
            <img
              src={entry.image}
              alt={entry.title}
              className="h-full w-full object-cover"
            />
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
                <div key={key} className="rounded-lg bg-muted/40 p-3 border border-border/40">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">{key}</div>
                  <div className="font-display font-bold text-lg">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-sm uppercase tracking-widest text-muted-foreground mb-3">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {entry.tags.map((t) => (
                <Badge key={t} variant="outline" className="border-border/60">{t}</Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WikiDetail;