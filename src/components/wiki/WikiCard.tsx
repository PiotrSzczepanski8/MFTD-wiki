import { Link } from "react-router-dom";
import { WikiEntry, categoryMeta } from "@/data/wiki";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RarityBadge } from "./RarityBadge";
import { ArrowUpRight, ImageOff } from "lucide-react";

export const WikiCard = ({ entry }: { entry: WikiEntry }) => {
  const meta = categoryMeta[entry.category];
  const showImage = entry.category === "fishermen" || entry.category === "fish";
  return (
    <Link to={`/wiki/${entry.id}`} className="group">
      <Card className="h-full p-5 bg-card/60 backdrop-blur border-border/60 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-card relative overflow-hidden">
        <div className={`absolute top-0 left-0 right-0 h-1 ${meta.gradient} opacity-80`} />
        {showImage && (
          <div className="-mx-5 -mt-5 mb-4 aspect-[16/9] overflow-hidden bg-muted/40 border-b border-border/40">
            {entry.image ? (
              <img
                src={entry.image}
                alt={entry.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                <ImageOff className="h-8 w-8 opacity-40" />
              </div>
            )}
          </div>
        )}
        <div className="flex items-start justify-between gap-2 mb-2">
          <RarityBadge rarity={entry.rarity} />
          <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <h3 className="font-display text-xl font-bold mb-1.5 group-hover:text-primary transition-colors">
          {entry.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{entry.description}</p>
        <div className="flex flex-wrap gap-1">
          {entry.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-muted/60 text-muted-foreground border-0">
              {tag}
            </Badge>
          ))}
        </div>
      </Card>
    </Link>
  );
};