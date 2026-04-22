import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { wikiEntries, categoryMeta, WikiCategory } from "@/data/wiki";
import { WikiCard } from "@/components/wiki/WikiCard";
import { cn } from "@/lib/utils";

type Filter = "all" | WikiCategory;

const Wiki = () => {
  const [params, setParams] = useSearchParams();
  const initial = (params.get("category") as Filter) || "all";
  const [filter, setFilter] = useState<Filter>(initial);
  const [query, setQuery] = useState("");

  const setFilterAndUrl = (f: Filter) => {
    setFilter(f);
    if (f === "all") setParams({});
    else setParams({ category: f });
  };

  const filtered = useMemo(() => {
    return wikiEntries.filter((e) => {
      const matchCat = filter === "all" || e.category === filter;
      const q = query.trim().toLowerCase();
      const matchQuery = !q ||
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [filter, query]);

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">The Codex</h1>
        <p className="text-muted-foreground">Every fisherman, fish, and gamble — catalogued.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, tag, or trait…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 bg-card/60 border-border/60"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterAndUrl("all")}
          className={cn(filter === "all" && "bg-primary text-primary-foreground")}
        >
          All ({wikiEntries.length})
        </Button>
        {(Object.keys(categoryMeta) as WikiCategory[]).map((cat) => {
          const count = wikiEntries.filter((e) => e.category === cat).length;
          const active = filter === cat;
          return (
            <Button
              key={cat}
              variant={active ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterAndUrl(cat)}
              className={cn(active && "bg-primary text-primary-foreground")}
            >
              {categoryMeta[cat].label} ({count})
            </Button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="font-display text-xl">No catches matched.</p>
          <p className="text-sm mt-1">Try a different lure.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((entry) => (
            <WikiCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wiki;