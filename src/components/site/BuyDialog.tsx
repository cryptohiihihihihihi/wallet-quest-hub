import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bitcoin, Copy, Check } from "lucide-react";
import { z } from "zod";
import type { Product } from "./ProductCard";

const emailSchema = z.string().trim().email().max(255);

const chains = [
  { id: "btc", name: "Bitcoin", symbol: "BTC", icon: "₿", address: "bc1qvaultkey0xexamplepay2crypto7address5demoaddr", rate: 0.0000152 },
  { id: "eth", name: "Ethereum", symbol: "ETH", icon: "Ξ", address: "0xVaultKey0000ExamplePay2CryptoDemoAddress00001", rate: 0.000312 },
  { id: "usdc", name: "USDC", symbol: "USDC", icon: "$", address: "0xVaultKey0000ExamplePay2CryptoDemoAddress00001", rate: 1 },
  { id: "sol", name: "Solana", symbol: "SOL", icon: "◎", address: "VaultKeySo1anaExamp1ePay2CryptoDem0Addre55Xy", rate: 0.0061 },
];

export function BuyDialog({ product }: { product: Product }) {
  const [chain, setChain] = useState(chains[0]);
  const [copied, setCopied] = useState<"addr" | "amt" | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  const amount = (product.price * chain.rate).toFixed(chain.id === "usdc" ? 2 : 6);

  const copy = (val: string, kind: "addr" | "amt") => {
    navigator.clipboard.writeText(val);
    setCopied(kind);
    setTimeout(() => setCopied(null), 1500);
  };

  const handleConfirm = () => {
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError(null);
    setConfirmed(true);
  };

  return (
    <Dialog onOpenChange={() => { setConfirmed(false); setChain(chains[0]); setEmail(""); setEmailError(null); }}>
      <DialogTrigger asChild>
        <Button variant="hero" className="flex-1">
          <Bitcoin className="h-4 w-4" /> Buy now
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md glass border-border/60 p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="font-display text-2xl">
            {confirmed ? "Order received" : `Pay with crypto`}
          </DialogTitle>
          <DialogDescription>
            {confirmed
              ? "We'll confirm your transaction on-chain and ship within 24h."
              : <>Buying <span className="text-foreground font-semibold">{product.name}</span> · <span className="text-gradient font-bold">${product.price}</span></>}
          </DialogDescription>
        </DialogHeader>

        {!confirmed ? (
          <div className="space-y-4">
            <div>
              <div className="mb-2 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Select asset</div>
              <div className="grid grid-cols-4 gap-2">
                {chains.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setChain(c)}
                    className={`rounded-xl border p-2.5 text-center transition-all ${chain.id === c.id ? "border-primary/70 bg-primary/10 shadow-glow" : "border-border/60 bg-secondary/30 hover:border-primary/40 hover:bg-secondary/60"}`}
                  >
                    <div className="text-base font-bold">{c.icon}</div>
                    <div className="mt-0.5 text-[10px] font-medium text-muted-foreground">{c.symbol}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border/50 bg-secondary/30 p-3.5">
              <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Send exactly</div>
              <div className="mt-1 flex items-center justify-between gap-2">
                <div className="font-display text-xl font-bold text-gradient truncate">{amount} {chain.symbol}</div>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => copy(amount, "amt")}>
                  {copied === "amt" ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-border/50 bg-secondary/30 p-3.5">
              <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">To {chain.name} address</div>
              <div className="mt-1 flex items-center gap-2 min-w-0">
                <code className="flex-1 truncate font-mono text-xs text-foreground/90 min-w-0">{chain.address}</code>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => copy(chain.address, "addr")}>
                  {copied === "addr" ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Email for order confirmation</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                maxLength={255}
                onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(null); }}
                className="h-10 bg-secondary/40 border-border/60"
              />
              {emailError && <p className="text-xs text-destructive">{emailError}</p>}
            </div>

            <Button variant="hero" size="lg" className="w-full" onClick={handleConfirm}>
              I've sent the payment
            </Button>
          </div>
        ) : (
          <div className="space-y-4 py-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary shadow-glow">
              <Check className="h-8 w-8 text-primary-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Watching the {chain.name} network for your transaction. You'll receive a confirmation email once it's mined.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
