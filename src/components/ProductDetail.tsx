"use client";

import React, { useMemo, useState } from "react";
import { Sparkle, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

function formatCurrency(value: number) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `$${value}`;
  }
}

type SizeOption = {
  id: string;
  label: string;
  ml: number;
  price: number;
};

type Product = {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  story: string;
  scent: {
    top: string[];
    heart: string[];
    base: string[];
  };
  sizes: SizeOption[];
  images: string[]; // main first
  related: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
  }>;
};

export interface ProductDetailProps {
  className?: string;
  product?: Product;
  defaultSelectedSizeId?: string;
  defaultQuantity?: number;
  onAddToCart?: (payload: { productId: string; sizeId: string; quantity: number }) => Promise<void> | void;
  onToggleWishlist?: (payload: { productId: string; wished: boolean }) => Promise<void> | void;
  onSubmitReview?: (payload: any) => Promise<any> | void;
}

const defaultProduct: Product = {
  id: "velluto-notturno",
  name: "Velluto Notturno",
  subtitle: "Eau de Parfum",
  description:
    "A nocturnal velvet embrace. Velluto Notturno unfolds with luminous citrus before revealing a heart of smoky florals and an intimate, resinous trail.",
  story:
    "Inspired by a midnight stroll through a rain-kissed Venetian calle, Velluto Notturno captures the hush between footsteps and starlight. Gold leaf flickers under lantern glow as whispers of bergamot and incense drift through ancient stone. The fragrance is an ode to chiaroscuro—where shadows soften, secrets blossom, and the night itself becomes silk.",
  scent: {
    top: ["Calabrian Bergamot", "Black Pepper", "Pink Grapefruit Zest"],
    heart: ["Smoked Jasmine", "Iris Concrete", "Black Tea"],
    base: ["Amber Resin", "Sandalwood", "Patchouli Coeur"],
  },
  sizes: [
    { id: "size-30", label: "30 ml", ml: 30, price: 95 },
    { id: "size-50", label: "50 ml", ml: 50, price: 145 },
    { id: "size-100", label: "100 ml", ml: 100, price: 220 },
  ],
  images: [
    "./1.png",
    "./3.jpg",
  ],
  related: [
    {
      id: "oro-soave",
      name: "Oro Soave",
      image: "./1.png",
      price: 175,
    },
    {
      id: "blu-notte",
      name: "Blu di Notte",
      image: "./1.png",
      price: 160,
    },
    {
      id: "ambra-velata",
      name: "Ambra Velata",
      image: "./1.png",
      price: 210,
    },
  ],
};

export default function ProductDetail({
  className,
  product: productProp,
  defaultSelectedSizeId,
  defaultQuantity = 1,
}: ProductDetailProps) {
  const product = productProp ?? defaultProduct;

  const [selectedSizeId, setSelectedSizeId] = useState<string>(
    defaultSelectedSizeId && product.sizes.some((s) => s.id === defaultSelectedSizeId)
      ? defaultSelectedSizeId
      : product.sizes[1]?.id ?? product.sizes[0].id
  );
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  const selectedSize = useMemo(() => product.sizes.find((s) => s.id === selectedSizeId) ?? product.sizes[0], [product.sizes, selectedSizeId]);
  const price = selectedSize.price;

  return (
    <section
      className={[
        "w-full max-w-full",
        "text-foreground",
        "bg-card",
        "rounded-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Product detail"
    >
      {/* Hero and core info */}
      <div className="grid gap-8 md:gap-10 lg:gap-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {/* Media gallery */}
          <div className="min-w-0">
            <Card className="bg-secondary border border-border overflow-hidden py-0 gap-0">
              <div className="relative aspect-[4/5] sm:aspect-[5/6] w-full overflow-hidden">
                <img
                  src={product.images[activeImageIdx]}
                  alt={`${product.name} image ${activeImageIdx + 1}`}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              </div>
              <CardContent className="p-4 sm:p-5">
                <div className="flex gap-3 overflow-x-auto py-1" role="listbox" aria-label="Image thumbnails">
                  {product.images.map((src, idx) => (
                    <button
                      key={src + idx}
                      type="button"
                      onClick={() => setActiveImageIdx(idx)}
                      className={[
                        "relative h-16 w-16 shrink-0 overflow-hidden rounded-md border",
                        activeImageIdx === idx ? "border-[var(--color-yellow)]" : "border-border",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-yellow)]",
                      ].join(" ")}
                      aria-label={`Show image ${idx + 1}`}
                      aria-selected={activeImageIdx === idx}
                    >
                      <img src={src} alt="" className="h-full w-full object-cover" />
                      {activeImageIdx === idx ? (
                        <span className="pointer-events-none absolute inset-0 ring-2 ring-[var(--color-yellow)]/60 rounded-md" />
                      ) : null}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Size comparison visualization */}
            <div className="mt-6 md:mt-8">
              <Card className="bg-secondary border border-border">
                <CardHeader className="px-5 pt-5 pb-2">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    <Package className="h-5 w-5 text-[var(--color-yellow)]" />
                    Bottle size comparison
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <div className="flex items-end gap-6 sm:gap-8 md:gap-10">
                    {product.sizes.map((s) => {
                      const h = 48 + (s.ml / product.sizes[product.sizes.length - 1].ml) * 72; // visual height
                      const isSelected = s.id === selectedSizeId;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSelectedSizeId(s.id)}
                          className="group flex flex-col items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-yellow)] rounded-sm"
                          aria-pressed={isSelected}
                          aria-label={`Select ${s.label}`}
                        >
                          <div
                            className={[
                              "w-10 sm:w-12 rounded-t-md",
                              "bg-gradient-to-b from-zinc-700 to-zinc-900",
                              "border border-border",
                              isSelected ? "ring-2 ring-[var(--color-yellow)]" : "ring-0",
                            ].join(" ")}
                            style={{ height: `${h}px` }}
                          />
                          <div className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground">
                            {s.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Product info and actions */}
          <div className="min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight break-words">
                  {product.name}
                </h1>
                {product.subtitle ? (
                  <p className="mt-1 text-sm sm:text-base text-muted-foreground">{product.subtitle}</p>
                ) : null}
              </div>
            </div>

            <p className="mt-5 text-sm sm:text-base md:text-lg text-muted-foreground">
              {product.description}
            </p>

            <Separator className="my-6" />

            {/* Scent notes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-secondary border border-border rounded-md p-4">
                <div className="text-xs uppercase tracking-wide text-[var(--color-yellow)] mb-2">Top</div>
                <ul className="space-y-1">
                  {product.scent.top.map((n) => (
                    <li key={`top-${n}`} className="text-sm">{n}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-secondary border border-border rounded-md p-4">
                <div className="text-xs uppercase tracking-wide text-[var(--color-yellow)] mb-2">Heart</div>
                <ul className="space-y-1">
                  {product.scent.heart.map((n) => (
                    <li key={`heart-${n}`} className="text-sm">{n}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-secondary border border-border rounded-md p-4">
                <div className="text-xs uppercase tracking-wide text-[var(--color-yellow)] mb-2">Base</div>
                <ul className="space-y-1">
                  {product.scent.base.map((n) => (
                    <li key={`base-${n}`} className="text-sm">{n}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Purchase info - no cart/quantity */}
            <div className="mt-6 md:mt-8">
              <Card className="bg-secondary border border-border">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Sparkle className="h-5 w-5 text-[var(--color-yellow)]" />
                      <div className="text-lg sm:text-xl font-semibold">{formatCurrency(price)}</div>
                      <span className="text-xs text-muted-foreground">incl. taxes</span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="block text-sm mb-2">Select size</label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => {
                        const active = s.id === selectedSizeId;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setSelectedSizeId(s.id)}
                            className={[
                              "px-3 py-2 rounded-md border text-sm",
                              active
                                ? "border-[var(--color-yellow)] text-foreground"
                                : "border-border text-foreground",
                              "bg-card hover:bg-accent",
                              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-yellow)]",
                            ].join(" ")}
                            aria-pressed={active}
                            aria-label={`Select ${s.label}`}
                          >
                            <span className="font-medium">{s.label}</span>
                            <span className="ml-2 text-xs text-muted-foreground">{formatCurrency(s.price)}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Story and details tabs */}
        <div className="mt-2">
          <Tabs defaultValue="story" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-secondary">
              <TabsTrigger value="story">Story</TabsTrigger>
              <TabsTrigger value="ingredients">Notes</TabsTrigger>
              <TabsTrigger value="care">Care</TabsTrigger>
            </TabsList>
            <TabsContent value="story" className="mt-4">
              <Card className="bg-secondary border border-border">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <Sparkle className="h-5 w-5 mt-0.5 text-[var(--color-yellow)]" />
                    <p className="text-base leading-relaxed">{product.story}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="ingredients" className="mt-4">
              <Card className="bg-secondary border border-border">
                <CardContent className="p-5">
                  <div className="grid sm:grid-cols-3 gap-6">
                    <div>
                      <div className="text-sm uppercase tracking-wide mb-2 text-[var(--color-yellow)]">Top</div>
                      <ul className="space-y-1">
                        {product.scent.top.map((n) => (
                          <li key={`t-${n}`} className="text-sm">{n}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-sm uppercase tracking-wide mb-2 text-[var(--color-yellow)]">Heart</div>
                      <ul className="space-y-1">
                        {product.scent.heart.map((n) => (
                          <li key={`h-${n}`} className="text-sm">{n}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-sm uppercase tracking-wide mb-2 text-[var(--color-yellow)]">Base</div>
                      <ul className="space-y-1">
                        {product.scent.base.map((n) => (
                          <li key={`b-${n}`} className="text-sm">{n}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="care" className="mt-4">
              <Card className="bg-secondary border border-border">
                <CardContent className="p-5">
                  <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                    <li>Store away from direct sunlight and heat to preserve the composition.</li>
                    <li>Apply to pulse points for a refined sillage.</li>
                    <li>Avoid contact with delicate fabrics and polished surfaces.</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

      </div>
    </section>
  );
}