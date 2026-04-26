import { Link } from "react-router-dom";
import wikiData from "@/wiki";

const Index = () => {
  const featured = wikiData.wikiEntries.filter((entry) => entry.rarity === "legendary").slice(0, 3);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl animate-float" />
          <div className="absolute bottom-10 right-20 h-40 w-40 rounded-full bg-secondary/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>
        <div className="container relative py-20 md:py-32 text-center">
          <h1 className="font-display text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            The deep is hungry.
            <br />
            <span className="text-primary text-glow italic">Cast wisely.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            A community-built field guide for <strong className="text-foreground">Magical Fih TD</strong> - the fishing tower defense where every wave is a gamble.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/wiki" className="inline-flex items-center gap-2 rounded-full bg-gradient-red px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition">
              Browse the Wiki
            </Link>
            <Link to="/ideas" className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-6 py-3 text-sm font-semibold hover:bg-card transition">
              Share an Idea
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid md:grid-cols-3 gap-5">
          {Object.keys(wikiData.categoryMeta).map((key) => {
            const meta = wikiData.categoryMeta[key];
            const count = wikiData.wikiEntries.filter((entry) => entry.category === key).length;
            return (
              <Link key={key} to={`/wiki?category=${key}`} className="block rounded-3xl border border-border/60 bg-card/60 p-6 transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-card">
                <div className={`relative inline-flex h-12 w-12 items-center justify-center rounded-xl ${meta.gradient} mb-4 shadow-card`}>
                  <span className="text-lg" style={{ filter: 'grayscale(100%) brightness(0)' }}>{key === "fishermen" ? "⚓" : key === "fish" ? "🐟" : "🎲"}</span>
                </div>
                <h3 className="font-display text-2xl font-bold mb-1">{meta.label}</h3>
                <p className="text-sm text-muted-foreground mb-3">{meta.tagline}</p>
                <p className="text-xs text-muted-foreground/80">{count} entries</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Legendary Entries</h2>
            <p className="text-muted-foreground mt-1">The rarest catches in the codex.</p>
          </div>
          <Link to="/wiki" className="hidden sm:inline text-sm text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {featured.map((entry) => (
            <Link key={entry.id} to={`/wiki/${entry.id}`} className="block rounded-3xl border border-border/60 bg-card/60 p-6 transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow">
              <p className="text-xs uppercase tracking-widest text-primary mb-2">{wikiData.categoryMeta[entry.category]?.label}</p>
              <h3 className="font-display text-2xl font-bold mb-2">{entry.title}</h3>
              <p className="text-sm text-muted-foreground">{entry.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
