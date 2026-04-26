import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container py-10">
      <div className="mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">Magical Fih TD</h1>
        <p className="text-lg text-muted-foreground mb-4">
          Wiki for the 24-hour Tower Defense Game Jam masterpiece
        </p>
        <p className="text-sm text-muted-foreground">
          Created during <span className="font-semibold text-foreground">Turniej Trójgamiczny</span> game jam event
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-12">
        <a href="https://artificialidiots.itch.io/mg-fih-td" target="_blank" className="bg-card/60 border border-border/40 hover:border-primary/40 rounded-lg p-6 transition">
          <h3 className="text-lg font-bold mb-2">🐟 Alpha Version</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Play the original 24-hour game jam version
          </p>
          <span className="text-primary hover:underline">Play Alpha →</span>
        </a>
        <a href="https://github.com/1p22geo/dzem" target="_blank" className="bg-card/60 border border-border/40 hover:border-primary/40 rounded-lg p-6 transition">
          <h3 className="text-lg font-bold mb-2">⭐ Latest Version</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Experience the newest updates and improvements
          </p>
          <span className="text-primary hover:underline">Play Latest →</span>
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-4">The Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The village faces an unprecedented threat. Mutated fish, twisted by unknown forces, surge from the waters and attack without mercy. All seems lost.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              But there is hope. As the village's protector, you command a group of elite fishermen. These skilled warriors are your towers - your first and last line of defense against the incoming aquatic hordes.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-4">How to Play</h2>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="text-primary font-bold text-lg">🎣</span>
                <div>
                  <p className="font-semibold text-foreground">Manage Your Fishermen</p>
                  <p className="text-sm text-muted-foreground">Deploy fishermen as towers to defend strategic positions</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-bold text-lg">⬆️</span>
                <div>
                  <p className="font-semibold text-foreground">Upgrade Your Defense</p>
                  <p className="text-sm text-muted-foreground">Strengthen your fishermen to handle tougher waves</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-bold text-lg">✨</span>
                <div>
                  <p className="font-semibold text-foreground">Cast Magic - But Beware</p>
                  <p className="text-sm text-muted-foreground">Use powerful spells to turn the tide, but remember: magic is a gamble</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-card/60 border border-border/40 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-3">📖 Wiki</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Explore the complete database of fishermen, fish, upgrades, and magical abilities.
          </p>
          <Link to="/wiki" className="text-primary hover:underline text-sm">
            Browse the Codex →
          </Link>
        </div>

        <div className="bg-card/60 border border-border/40 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-3">💡 Community Ideas</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Check out community suggestions for new fishermen, spells, and game mechanics.
          </p>
          <Link to="/ideas" className="text-primary hover:underline text-sm">
            View Ideas →
          </Link>
        </div>

        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-3">👥 Community</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Join other players and contribute to the wiki community.
          </p>
          <Link to="/auth?mode=signup" className="text-primary hover:underline text-sm">
            Sign Up →
          </Link>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Ready to Defend the Village?</h2>
        <p className="text-muted-foreground mb-6">
          Choose your version and begin your tower defense adventure
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://artificialidiots.itch.io/mg-fih-td" target="_blank" className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-semibold hover:opacity-90 transition">
            Play Alpha
          </a>
          <a href="https://github.com/1p22geo/dzem" target="_blank" className="px-6 py-2 bg-card border border-border/60 rounded-md font-semibold hover:bg-card/80 transition">
            Play Latest
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
