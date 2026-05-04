import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ProductCard, type Product } from "@/components/site/ProductCard";
import { ShieldCheck, Zap, Lock, Cpu, Globe, Fingerprint, ArrowRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-wallet.jpg";
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

const features = [
  { icon: ShieldCheck, title: "EAL6+ Secure Element", desc: "Bank-grade chip that keeps your private keys offline, always." },
  { icon: Fingerprint, title: "Biometric unlock", desc: "Approve transactions with a single touch. Zero passwords." },
  { icon: Cpu, title: "Open-source firmware", desc: "Audited by the community. Trust through transparency." },
  { icon: Globe, title: "5,500+ assets", desc: "Bitcoin, Ethereum, Solana, and every major chain — natively." },
  { icon: Zap, title: "Lightning fast", desc: "Sign transactions in under 200ms. Built for speed." },
  { icon: Lock, title: "Recovery guaranteed", desc: "Shamir backup with up to 16 shares for true peace of mind." },
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

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-20 lg:grid-cols-2 lg:pt-28">
          <div>
            <Badge className="border border-primary/30 bg-primary/10 text-primary hover:bg-primary/15">
              <Sparkles className="mr-1.5 h-3 w-3" /> New: Vault Card with NFC
            </Badge>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Own your <span className="text-gradient">crypto</span>.<br />
              Truly. Privately.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Vaultkey hardware wallets keep your private keys offline in a tamper-proof secure element.
              Beautifully engineered. Brutally secure.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="hero" size="xl" asChild>
                <a href="#products">Shop wallets <ArrowRight className="h-4 w-4" /></a>
              </Button>
              <Button variant="glow" size="xl" asChild>
                <a href="#features">How it works</a>
              </Button>
            </div>

            <div className="mt-12 grid max-w-md grid-cols-3 gap-6">
              {[
                { v: "1.2M+", l: "Wallets shipped" },
                { v: "$48B", l: "Assets secured" },
                { v: "0", l: "Breaches. Ever." },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl font-bold text-gradient">{s.v}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 bg-gradient-primary opacity-30 blur-3xl" />
            <div className="relative animate-float overflow-hidden rounded-3xl glass shadow-elevated">
              <img
                src={heroImg}
                alt="Premium Vaultkey hardware crypto wallet"
                width={1536}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="border-y border-border/40 bg-background/40 py-10">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">Trusted by holders worldwide</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 font-display text-xl font-bold text-muted-foreground/60">
            <span>BITCOIN</span><span>ETHEREUM</span><span>SOLANA</span><span>POLYGON</span><span>AVALANCHE</span><span>ARBITRUM</span>
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

      {/* FEATURES */}
      <section id="features" className="relative py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="border border-primary/30 bg-primary/10 text-primary hover:bg-primary/15">Why Vaultkey</Badge>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Engineered for <span className="text-gradient">paranoia</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="group relative overflow-hidden rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
                  <f.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY CTA */}
      <section id="security" className="relative py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-3xl glass p-10 sm:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-accent/30 blur-3xl" />
            <div className="relative grid items-center gap-10 lg:grid-cols-2">
              <div>
                <Badge className="border border-primary/30 bg-primary/10 text-primary hover:bg-primary/15">Self-custody</Badge>
                <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                  Not your keys,<br />not your <span className="text-gradient">coins</span>.
                </h2>
                <p className="mt-5 max-w-lg text-muted-foreground">
                  Exchange collapses. Account freezes. Hacks. The crypto graveyard is full of cautionary tales.
                  Take possession of what's yours — in under 3 minutes.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" asChild><a href="#products">Get a wallet</a></Button>
                  <Button variant="glow" size="lg">Watch demo</Button>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-card p-8 glass">
                  <div className="grid h-full grid-cols-2 gap-3">
                    {[ShieldCheck, Lock, Fingerprint, Cpu].map((Icon, i) => (
                      <div key={i} className="flex flex-col items-center justify-center rounded-xl bg-secondary/50 p-4">
                        <Icon className="h-8 w-8 text-primary animate-pulse-glow" style={{ animationDelay: `${i * 0.4}s` }} />
                        <div className="mt-3 text-xs text-muted-foreground">Layer {i + 1}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Questions?</h2>
            <p className="mt-3 text-muted-foreground">Everything you need to know before going self-custody.</p>
          </div>
          <div className="mt-12 space-y-3">
            {[
              { q: "What happens if I lose my wallet?", a: "Your assets aren't on the device — they're on the blockchain. Use your 24-word recovery phrase to restore on any new Vaultkey or compatible wallet." },
              { q: "Which cryptocurrencies are supported?", a: "Vaultkey supports 5,500+ assets including Bitcoin, Ethereum, Solana, and every major EVM chain. New chains are added monthly." },
              { q: "Is shipping really free?", a: "Yes — free worldwide shipping on all orders, with discreet packaging and tamper-evident seals." },
              { q: "How is Vaultkey different from a software wallet?", a: "Your private keys never touch an internet-connected device. Even if your computer is compromised, your crypto stays safe." },
            ].map((item) => (
              <details key={item.q} className="group rounded-xl glass p-5 transition-colors open:bg-secondary/40">
                <summary className="flex cursor-pointer list-none items-center justify-between font-display font-semibold">
                  {item.q}
                  <span className="text-primary transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
