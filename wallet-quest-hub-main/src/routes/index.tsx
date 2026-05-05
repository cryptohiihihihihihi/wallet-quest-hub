import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/site/Navbar";
import { ProductCard, type Product } from "@/components/site/ProductCard";
import { Footer } from "@/components/site/Footer";
import { ArrowRight, Sparkles } from "lucide-react";
import nano from "@/assets/wallet-nano.jpg";
import pro from "@/assets/wallet-pro.jpg";
import card from "@/assets/wallet-card.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vaultkey — Modern Hardware Crypto Wallets" },
      { name: "description", content: "Buy the most secure, beautifully designed hardware crypto wallets. Self-custody made effortless." },
      { property: "og:title", content: "Vaultkey — Modern Hardware Crypto Wallets" },
      { property: "og:description", content: "Self-custody made effortless. Premium hardware wallets for the next generation." },
    ],
  }),
  component: Index,
});

const products: Product[] = [
  {
    id: "nano",
    name: "Vault Nano",
    tagline: "Pocket-sized cold storage",
    price: 99,
    image: nano,
    features: ["Secure Element chip", "Bluetooth 5.3", "1000+ coins", "USB-C"],
    accent: "blue",
  },
  {
    id: "pro",
    name: "Vault Pro",
    tagline: "Touchscreen flagship",
    price: 219,
    image: pro,
    badge: "Best seller",
    features: ['2.5" touchscreen', "Air-gapped mode", "Biometric unlock", "Titanium body"],
    accent: "violet",
  },
  {
    id: "card",
    name: "Vault Card",
    tagline: "Tap-to-sign metal card",
    price: 79,
    image: card,
    badge: "New",
    features: ["NFC tap-to-sign", "Credit-card thin", "No battery needed", "Steel finish"],
    accent: "cyan",
  },
];

function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="pointer-events-none absolute right-0 top-40 h-[400px] w-[400px] rounded-full bg-accent/20 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl px-6 pb-20 pt-20 text-center lg:pt-28">
          <Badge className="border border-primary/30 bg-primary/10 text-primary hover:bg-primary/15">
            <Sparkles className="mr-1.5 h-3 w-3" /> New: Vault Card with NFC
          </Badge>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Own your <span className="text-gradient">crypto</span>.<br />
            Truly. Privately.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Vaultkey hardware wallets keep your private keys offline in a tamper-proof secure element.
            Beautifully engineered. Brutally secure.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="hero" size="xl" asChild>
              <a href="#products">Shop wallets <ArrowRight className="h-4 w-4" /></a>
            </Button>
          </div>
          <div className="mt-10 grid gap-3 text-left sm:grid-cols-3">
            {[
              { label: "Keys never leave device", value: "100%" },
              { label: "Countries shipped", value: "120+" },
              { label: "Avg. customer rating", value: "4.9/5" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border/50 bg-card/40 px-4 py-3 backdrop-blur-md">
                <div className="font-display text-lg font-semibold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="border border-accent/30 bg-accent/10 text-accent hover:bg-accent/15">Our wallets</Badge>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Choose your <span className="text-gradient">vault</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Three devices. One mission: put you in absolute control of your digital wealth.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-3xl border border-border/50 bg-gradient-to-r from-primary/15 via-card/70 to-accent/15 p-8 shadow-elevated sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Badge className="border border-primary/30 bg-primary/10 text-primary hover:bg-primary/15">
                  New checkout experience
                </Badge>
                <h3 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  Card payment UI is now available
                </h3>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                  You can now choose between crypto and card directly in checkout. Card processing is currently a visual preview and will be activated in a future update.
                </p>
              </div>
              <Button variant="hero" size="xl" asChild>
                <a href="#products">Try checkout</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
