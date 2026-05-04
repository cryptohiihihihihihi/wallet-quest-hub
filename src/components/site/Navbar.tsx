import { Link } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-b border-border/40">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight">VAULTKEY</span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#products" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Products</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="hero" size="sm" asChild>
              <a href="#products">Shop now</a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
