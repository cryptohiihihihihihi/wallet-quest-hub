import { Wallet, Twitter, Github, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/60">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
                <Wallet className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold">VAULTKEY</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              The most secure way to own your crypto. Built for the next generation of digital sovereignty.
            </p>
            <div className="mt-6 flex gap-3">
              {[Twitter, Github, Send].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-lg glass transition-colors hover:text-primary">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold">Products</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="#products" className="hover:text-foreground">Vault Nano</a></li>
              <li><a href="#products" className="hover:text-foreground">Vault Pro</a></li>
              <li><a href="#products" className="hover:text-foreground">Vault Card</a></li>
              <li><a href="#products" className="hover:text-foreground">Accessories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold">Company</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">About</a></li>
              <li><a href="#" className="hover:text-foreground">Security</a></li>
              <li><a href="#" className="hover:text-foreground">Support</a></li>
              <li><a href="#" className="hover:text-foreground">Press</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 Vaultkey Labs. Not your keys, not your coins.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
