import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { categoryMeta, wikiEntries } from "@/wiki";
import { WikiCard } from "@/components/wiki/WikiCard";

const Wiki = () => {
  const [params, setParams] = useSearchParams();
  const initial = params.get("category") || "all";
  const [filter, setFilter] = useState(initial);
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const setFilterAndUrl = (newFilter) => {
    setFilter(newFilter);
    if (newFilter === "all") {
      setParams({});
    } else {
      setParams({ category: newFilter });
    }
  };

  const allTags = useMemo(() => {
    const tagSet = new Set();
    wikiEntries.forEach(entry => {
      entry.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, []);

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return wikiEntries.filter((entry) => {
      const matchCategory = filter === "all" || entry.category === filter;
      const matchQuery = !search ||
        entry.title.toLowerCase().includes(search) ||
        entry.description.toLowerCase().includes(search) ||
        entry.tags.some((tag) => tag.toLowerCase().includes(search));
      const matchTags = selectedTags.length === 0 || selectedTags.every(tag => entry.tags.includes(tag));
      return matchCategory && matchQuery && matchTags;
    });
  }, [filter, query, selectedTags]);

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">The Codex</h1>
        <p className="text-muted-foreground">Every fisherman, fish, and mechanic - catalogued.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <input
            className="w-full rounded-2xl border border-border/60 bg-card/60 px-4 py-3 pl-11 text-sm text-foreground outline-none transition focus:border-primary"
            placeholder="Search by name, tag, or trait…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'red' }}>🔍</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          onClick={() => setFilterAndUrl("all")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${filter === "all" ? "bg-primary text-primary-foreground" : "border border-border/60 bg-card/60 text-muted-foreground hover:bg-card"}`}
        >
          All ({wikiEntries.length})
        </button>
        {Object.keys(categoryMeta).map((cat) => {
          const count = wikiEntries.filter((entry) => entry.category === cat).length;
          const active = filter === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterAndUrl(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${active ? "bg-primary text-primary-foreground" : "border border-border/60 bg-card/60 text-muted-foreground hover:bg-card"}`}
            >
              {categoryMeta[cat].label} ({count})
            </button>
          );
        })}
      </div>

      {allTags.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Filter by Tags</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                    isSelected 
                      ? "bg-primary text-primary-foreground" 
                      : "border border-border/60 bg-card/60 text-muted-foreground hover:bg-card"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
          {selectedTags.length > 0 && (
            <button
              type="button"
              onClick={() => setSelectedTags([])}
              className="mt-2 text-xs text-muted-foreground hover:text-foreground transition"
            >
              Clear all tags
            </button>
          )}
        </div>
      )}

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
