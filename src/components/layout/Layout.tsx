import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 animate-fade-in">
        <Outlet />
      </main>
      <footer className="border-t border-border/40 py-8 mt-16">
        <div className="container text-center text-sm text-muted-foreground">
          <p className="font-display italic">"The deep gives. The deep takes."</p>
          <p className="mt-2">Community wiki · Built by anglers, for anglers.</p>
        </div>
      </footer>
    </div>
  );
};