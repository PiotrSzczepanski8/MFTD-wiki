import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/useAuth";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/wiki", label: "Wiki" },
  { to: "/ideas", label: "Ideas" },
];

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/90 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 h-16" onClick={scrollToTop}>
            <img src="/fih-logo.svg" alt="fih" className="h-12"/>
            <p className="font-display text-2xl font-bold">WIKI</p>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={scrollToTop}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link to="/profile" onClick={scrollToTop} className="px-4 py-2 rounded-md text-sm font-medium bg-card/70 hover:bg-card transition">
                {user.username || "Angler"}
              </Link>
              <button onClick={() => { scrollToTop(); handleSignOut(); }} className="px-3 py-2 rounded-md text-sm font-medium bg-muted/60 hover:bg-muted/80 transition">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" onClick={scrollToTop} className="px-4 py-2 rounded-md text-sm font-medium bg-card/70 hover:bg-card transition">
                Login
              </Link>
              <Link to="/auth?mode=signup" onClick={scrollToTop} className="px-4 py-2 rounded-md text-sm font-medium bg-gradient-red text-primary-foreground hover:opacity-90 transition">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="md:hidden border-t border-border/40 px-4 py-2 flex gap-1 overflow-x-auto bg-background/95">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            onClick={scrollToTop}
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};
