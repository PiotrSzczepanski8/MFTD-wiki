import { cn } from "@/utils";

const styles = {
  common: "bg-muted text-muted-foreground border-border",
  uncommon: "bg-secondary/20 text-secondary border-secondary/40",
  rare: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  epic: "bg-purple-500/20 text-purple-300 border-purple-500/40",
  legendary: "bg-primary/20 text-primary border-primary/50 shadow-glow",
};

export const RarityBadge = ({ rarity }) => (
  <span className={cn("rounded-full border px-2 py-1 text-xs font-medium capitalize", styles[rarity] || styles.common)}>
    {rarity}
  </span>
);
