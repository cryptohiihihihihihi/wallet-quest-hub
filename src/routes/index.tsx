import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/site/Navbar";
import { ProductCard, type Product } from "@/components/site/ProductCard";
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

    </div>
  );
}
