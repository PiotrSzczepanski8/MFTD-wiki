import { Link } from "react-router-dom";
import { RarityBadge } from "@/components/wiki/RarityBadge";
import { categoryMeta } from "@/wiki";

export const WikiCard = ({ entry }) => {
  const meta = categoryMeta[entry.category] || { gradient: "bg-muted", label: "Unknown" };
  const showImage = entry.category === "fishermen" || entry.category === "fish";

  return (
    <Link to={`/wiki/${entry.id}`} className="group block">
      <div className="h-full p-5 bg-card/60 backdrop-blur border border-border/60 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-card overflow-hidden rounded-3xl">
        <div className={`absolute inset-x-0 top-0 h-1 ${meta.gradient} opacity-80`} />
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
              <div className="h-full w-full flex items-center justify-center text-muted-foreground">No image</div>
            )}
          </div>
        )}
        <div className="flex items-start justify-between gap-2 mb-2">
          <RarityBadge rarity={entry.rarity} />
          <span className="text-muted-foreground">→</span>
        </div>
        <h3 className="font-display text-xl font-bold mb-1.5 group-hover:text-primary transition-colors">{entry.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{entry.description}</p>
        <div className="flex flex-wrap gap-1">
          {entry.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-muted/60 px-2 py-1 text-xs text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};
