import { Link } from "react-router-dom";
import { Anchor, BookOpen, Dices, Fish, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { categoryMeta, wikiEntries } from "@/data/wiki";

const Index = () => {
  const featured = wikiEntries.filter((e) => e.rarity === "legendary").slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl animate-float" />
          <div className="absolute bottom-10 right-20 h-40 w-40 rounded-full bg-secondary/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>
        <div className="container relative py-20 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
            <Sparkles className="h-3 w-3" />
            Community Wiki · Patch 0.1
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            The deep is hungry.
            <br />
            <span className="text-primary text-glow italic">Cast wisely.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            A community-built field guide for <strong className="text-foreground">Magical Fih TD</strong> — the fishing tower defense where every wave is a gamble.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/wiki">
              <Button size="lg" className="bg-gradient-lime text-primary-foreground hover:opacity-90 shadow-glow gap-2">
                <BookOpen className="h-4 w-4" />
                Browse the Wiki
              </Button>
            </Link>
            <Link to="/ideas">
              <Button size="lg" variant="outline" className="border-border/60 gap-2">
                <MessageSquare className="h-4 w-4" />
                Share an Idea
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container py-16">
        <div className="grid md:grid-cols-3 gap-5">
          {(Object.keys(categoryMeta) as Array<keyof typeof categoryMeta>).map((key) => {
            const meta = categoryMeta[key];
            const count = wikiEntries.filter((e) => e.category === key).length;
            const Icon = key === "fishermen" ? Anchor : key === "fish" ? Fish : Dices;
            return (
              <Link key={key} to={`/wiki?category=${key}`}>
                <Card className="group p-6 h-full bg-card/60 backdrop-blur border-border/60 hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-card relative overflow-hidden">
                  <div className={`absolute -top-12 -right-12 h-32 w-32 rounded-full ${meta.gradient} opacity-20 group-hover:opacity-40 transition-opacity blur-2xl`} />
                  <div className={`relative inline-flex h-12 w-12 items-center justify-center rounded-xl ${meta.gradient} mb-4 shadow-card`}>
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-1">{meta.label}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{meta.tagline}</p>
                  <p className="text-xs text-muted-foreground/80">{count} entries</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED LEGENDARIES */}
      <section className="container py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Legendary Entries</h2>
            <p className="text-muted-foreground mt-1">The rarest catches in the codex.</p>
          </div>
          <Link to="/wiki" className="text-sm text-primary hover:underline hidden sm:inline">View all →</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {featured.map((entry) => {
            const meta = categoryMeta[entry.category];
            return (
              <Link key={entry.id} to={`/wiki/${entry.id}`}>
                <Card className="group p-6 h-full bg-card/60 backdrop-blur border-primary/30 hover:border-primary transition-all hover:-translate-y-1 hover:shadow-glow relative overflow-hidden">
                  <div className={`absolute inset-x-0 top-0 h-1 ${meta.gradient}`} />
                  <p className="text-xs uppercase tracking-widest text-primary mb-2">{meta.label}</p>
                  <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{entry.title}</h3>
                  <p className="text-sm text-muted-foreground">{entry.description}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Index;
