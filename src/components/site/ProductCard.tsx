import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { BuyDialog } from "./BuyDialog";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  badge?: string;
  features: string[];
  accent: "cyan" | "violet" | "blue";
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-gradient-card glass transition-all duration-500 hover:-translate-y-2 hover:shadow-elevated">
      {/* glow ring */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
           style={{ boxShadow: "inset 0 0 0 1px oklch(0.78 0.18 195 / 0.4)" }} />

      <div className="relative aspect-square overflow-hidden bg-secondary/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <img
          src={product.image}
          alt={product.name}
          width={1024}
          height={1024}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.badge && (
          <Badge className="absolute left-4 top-4 border-0 bg-gradient-primary text-primary-foreground">
            {product.badge}
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-bold">{product.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
          </div>
          <div className="text-right">
            <div className="font-display text-2xl font-bold text-gradient">${product.price}</div>
          </div>
        </div>

        <ul className="mt-5 space-y-2">
          {product.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-primary" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <BuyDialog product={product} />
        </div>
      </div>
    </div>
  );
}
