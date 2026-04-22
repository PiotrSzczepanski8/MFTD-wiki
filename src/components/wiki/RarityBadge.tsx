import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  common: "bg-muted text-muted-foreground border-border",
  uncommon: "bg-secondary/20 text-secondary border-secondary/40",
  rare: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  epic: "bg-purple-500/20 text-purple-300 border-purple-500/40",
  legendary: "bg-primary/20 text-primary border-primary/50 shadow-glow",
};

export const RarityBadge = ({ rarity }: { rarity: string }) => (
  <Badge variant="outline" className={cn("capitalize font-medium", styles[rarity] ?? styles.common)}>
    {rarity}
  </Badge>
);