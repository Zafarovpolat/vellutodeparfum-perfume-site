"use client";

import * as React from "react";
import {
  FunnelPlus,
  Sparkle,
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ArrowDownNarrowWide,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

type FragranceCategory = "Floral" | "Woody" | "Oriental" | "Citrus" | "Aromatic" | "Gourmand";

type Product = {
  id: string;
  name: string;
  description: string; // 2-3 sentences, mention key notes
  price: number; // in EUR
  category: FragranceCategory;
  imageUrl: string; // Unsplash only
};

type SortKey = "featured" | "price-asc" | "price-desc";

export interface PerfumeCatalogProps {
  className?: string;
  style?: React.CSSProperties;
  products?: Product[]; // Optional override; otherwise internal dataset
  initialQuery?: string;
  pageSize?: number;
  defaultSelectedCategories?: FragranceCategory[];
  defaultSort?: SortKey;
}

const DEFAULT_PAGE_SIZE = 8;

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "DIOR JADORE EDP",
    category: "Floral",
    price: 105,
    imageUrl: "./list/1.png",
    description: "A captivating floral fragrance with notes of jasmine, rose, and ylang-ylang, evoking elegance and sensuality.",
  },
  {
    id: "2",
    name: "GUCCI FLORA GORGEOUS MAGNOLIA EDP",
    category: "Floral",
    price: 115,
    imageUrl: "./list/2.png",
    description: "A vibrant floral scent featuring magnolia, peony, and patchouli for a fresh and romantic allure.",
  },
  {
    id: "3",
    name: "DIOR MISS DIOR ROSE N'ROSES EDT",
    category: "Floral",
    price: 120,
    imageUrl: "./list/3.png",
    description: "A delicate rose bouquet with hints of rosewood and musk, perfect for everyday elegance.",
  },
  {
    id: "4",
    name: "GUCCI GUILTY ABSOLUTE POUR FEMME EDP",
    category: "Oriental",
    price: 90,
    imageUrl: "./list/4.png",
    description: "An intense oriental fragrance with pink pepper, lilac, and patchouli for a bold, seductive presence.",
  },
  {
    id: "5",
    name: "GUCCI GUILTY POUR HOMME EDT",
    category: "Aromatic",
    price: 85,
    imageUrl: "./list/5.png",
    description: "A fresh aromatic scent with pink pepper, lilac, and leather, ideal for the modern man.",
  },
  {
    id: "6",
    name: "YSL BLACK OPIUM EDP OVER RED",
    category: "Oriental",
    price: 105,
    imageUrl: "./list/6.png",
    description: "A smoky oriental with coffee, vanilla, and white flowers, exuding mystery and allure.",
  },
  {
    id: "7",
    name: "YSL BLACK OPIUM EDP",
    category: "Oriental",
    price: 95,
    imageUrl: "./list/7.png",
    description: "An addictive oriental blend of coffee, vanilla, and jasmine for a captivating, sensual experience.",
  },
  {
    id: "8",
    name: "TF FUCKING FABULOUS EDP",
    category: "Gourmand",
    price: 145,
    imageUrl: "./list/8.png",
    description: "A playful gourmand fragrance with raspberry, saffron, and patchouli, celebrating boldness and fun.",
  },
  {
    id: "9",
    name: "TF BITTER PEACH EDP",
    category: "Gourmand",
    price: 150,
    imageUrl: "./list/9.png",
    description: "A fruity gourmand with bitter peach, almond, and vanilla, offering a sweet yet edgy twist.",
  },
  {
    id: "10",
    name: "TF TOBACCO VANILLE EDP",
    category: "Oriental",
    price: 160,
    imageUrl: "./list/10.png",
    description: "A rich oriental scent blending tobacco, tonka bean, and vanilla for a warm, sophisticated vibe.",
  },
  {
    id: "11",
    name: "GIORGIO ARMANI ACQUA DI GIO EDT",
    category: "Citrus",
    price: 95,
    imageUrl: "./list/11.png",
    description: "A fresh citrus aquatic with sea notes, rosemary, and patchouli, evoking coastal serenity.",
  },
  {
    id: "12",
    name: "EMPORIO ARMANI STRONGER WITH YOU SANDALWOOD",
    category: "Woody",
    price: 115,
    imageUrl: "./list/12.png",
    description: "A woody fragrance with sandalwood, vetiver, and tonka bean, radiating strength and warmth.",
  },
  {
    id: "13",
    name: "EMPORIO ARMANI STRONGER WITH YOU TOBACCO",
    category: "Oriental",
    price: 120,
    imageUrl: "./list/13.png",
    description: "An oriental tobacco scent with spicy notes and amber, perfect for confident personalities.",
  },
  {
    id: "14",
    name: "EMPORIO ARMANI STRONGER WITH YOU PARFUM",
    category: "Oriental",
    price: 110,
    imageUrl: "./list/14.png",
    description: "A versatile oriental with leather, spice, and ambergris, embodying timeless allure.",
  },
  {
    id: "15",
    name: "EMPORIO ARMANI STRONGER WITH YOU AMBER EDP",
    category: "Oriental",
    price: 115,
    imageUrl: "./list/15.png",
    description: "An amber-rich oriental with warm spices and resins, offering depth and sophistication.",
  },
  {
    id: "16",
    name: "DIOR SAUVAGE (ELIXIR)",
    category: "Woody",
    price: 130,
    imageUrl: "./list/16.png",
    description: "A woody aromatic with pepper, lavender, and ambroxan, capturing wild freedom.",
  },
  {
    id: "17",
    name: "DIOR SAUVAGE (EDP)",
    category: "Woody",
    price: 105,
    imageUrl: "./list/17.png",
    description: "A fresh woody scent with bergamot, pepper, and vetiver, for the adventurous spirit.",
  },
  {
    id: "18",
    name: "VERSACE EROS EDP",
    category: "Oriental",
    price: 70,
    imageUrl: "./list/18.png",
    description: "An oriental fougère with mint, geranium, and tonka bean, symbolizing passion and energy.",
  },
  {
    id: "19",
    name: "VERSACE EROS PARFUM",
    category: "Oriental",
    price: 75,
    imageUrl: "./list/19.png",
    description: "A deeper oriental with amber, vanilla, and wood, enhancing the essence of desire.",
  },
  {
    id: "20",
    name: "YSL MON PARIS EDP",
    category: "Floral",
    price: 80,
    imageUrl: "./list/20.png",
    description: "A floral chypre with jasmine, rose, and patchouli, celebrating Parisian elegance.",
  },
  {
    id: "21",
    name: "RALPH LAUREN POLO BLUE",
    category: "Citrus",
    price: 65,
    imageUrl: "./list/21.png",
    description: "A fresh citrus aquatic with melon, cucumber, and musk, embodying classic American style.",
  },
  {
    id: "22",
    name: "CREED CENTAURUS",
    category: "Woody",
    price: 140,
    imageUrl: "./list/22.png",
    description: "A woody oriental with ginger, apple, and sandalwood, for the discerning gentleman.",
  },
  {
    id: "23",
    name: "INITIO OUD FOR GREATNESS",
    category: "Woody",
    price: 160,
    imageUrl: "./list/23.png",
    description: "A luxurious woody oud with saffron and rose, representing power and ambition.",
  },
  {
    id: "24",
    name: "CREED SPRING FLOWER",
    category: "Floral",
    price: 115,
    imageUrl: "./list/24.png",
    description: "A fresh floral with lily of the valley, rose, and musk, blooming with springtime joy.",
  },
  {
    id: "25",
    name: "LE LABO ANOTHER 13",
    category: "Woody",
    price: 115,
    imageUrl: "./list/25.png",
    description: "A woody floral with tuberose, orange blossom, and patchouli, uniquely personal.",
  },
  {
    id: "26",
    name: "TF BLACK ORCHID EDP",
    category: "Floral",
    price: 135,
    imageUrl: "./list/26.png",
    description: "A dark floral with black currant, orchid, and vanilla, exuding mystery and seduction.",
  },
  {
    id: "27",
    name: "VERSACE EROS ENERGY POUR HOMME EDP",
    category: "Aromatic",
    price: 65,
    imageUrl: "./list/27.png",
    description: "An aromatic fougère with grapefruit, geranium, and tonka bean, boosting vitality.",
  },
  {
    id: "28",
    name: "TF ELECTRIC CHERRY EDP",
    category: "Gourmand",
    price: 150,
    imageUrl: "./list/28.png",
    description: "A fruity gourmand with cherry, saffron, and amber, sparking electric excitement.",
  },
  {
    id: "29",
    name: "TF LOST CHERRY EDP",
    category: "Gourmand",
    price: 150,
    imageUrl: "./list/29.png",
    description: "A sweet gourmand with cherry, almond, and tonka bean, rediscovering lost pleasures.",
  },
  {
    id: "30",
    name: "TF CHERRY SMOKE EDP",
    category: "Gourmand",
    price: 150,
    imageUrl: "./list/30.png",
    description: "A smoky gourmand with cherry, incense, and leather, blending sweetness with edge.",
  },
  {
    id: "31",
    name: "CARTIER LA PANTHERE PARFUM",
    category: "Floral",
    price: 95,
    imageUrl: "./list/31.png",
    description: "A floral oriental with rose, jasmine, and amber, embodying feline grace and power.",
  },
  {
    id: "32",
    name: "CARTIER LA PANTHERE EDT",
    category: "Floral",
    price: 90,
    imageUrl: "./list/32.png",
    description: "A fresh floral with mandarin, rose, and musk, capturing playful elegance.",
  },
  {
    id: "33",
    name: "MFK BACCARAT ROUGE 540 PARFUM (WHITE)",
    category: "Oriental",
    price: 110,
    imageUrl: "./list/33.png",
    description: "An oriental floral with rose, incense, and saffron, in a luxurious white edition.",
  },
  {
    id: "34",
    name: "KILIAN PEARL OUD EDP",
    category: "Woody",
    price: 120,
    imageUrl: "./list/34.png",
    description: "A precious woody oud with rose, saffron, and ambergris, radiating opulence.",
  },
  {
    id: "35",
    name: "LE LABO THE MATCHA 26",
    category: "Woody",
    price: 100,
    imageUrl: "./list/35.png",
    description: "A green woody scent with matcha, geranium, and sandalwood, fresh and grounding.",
  },
  {
    id: "36",
    name: "LE LABO MUSC 25",
    category: "Woody",
    price: 100,
    imageUrl: "./list/36.png",
    description: "A musky woody with tuberose, saffron, and tonka bean, warm and enveloping.",
  },
  {
    id: "37",
    name: "LE LABO TUBEREUSE 40",
    category: "Floral",
    price: 100,
    imageUrl: "./list/37.png",
    description: "A floral tuberose with neroli, sandalwood, and musk, bold and intoxicating.",
  },
  {
    id: "38",
    name: "LE LABO MYRRHE 55",
    category: "Woody",
    price: 100,
    imageUrl: "./list/38.png",
    description: "A resinous woody with myrrh, opoponax, and labdanum, ancient and mystical.",
  },
];

const CATEGORIES: FragranceCategory[] = ["Floral", "Woody", "Oriental", "Citrus", "Aromatic", "Gourmand"];

export default function PerfumeCatalog({
  className,
  style,
  products,
  initialQuery = "",
  pageSize = DEFAULT_PAGE_SIZE,
  defaultSelectedCategories = [],
  defaultSort = "featured",
}: PerfumeCatalogProps) {
  const dataset = React.useMemo<Product[]>(
    () => (products && products.length > 0 ? products : DEFAULT_PRODUCTS),
    [products]
  );

  const [query, setQuery] = React.useState(initialQuery);
  const [selectedCategories, setSelectedCategories] = React.useState<FragranceCategory[]>(
    defaultSelectedCategories
  );
  const [sort, setSort] = React.useState<SortKey>(defaultSort);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  // Debounced filter/search effect to simulate loading and avoid jank
  React.useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, [query, selectedCategories, sort, pageSize]);

  // Derived filtered products
  const filtered = React.useMemo(() => {
    let out = dataset;

    // Filter by categories
    if (selectedCategories.length > 0) {
      const set = new Set(selectedCategories);
      out = out.filter((p) => set.has(p.category));
    }

    // Search by name, description, category
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sort === "price-asc") {
      out = [...out].sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      out = [...out].sort((a, b) => b.price - a.price);
    } else {
      // featured: stable by original order (dataset)
      out = [...out];
    }

    return out;
  }, [dataset, query, selectedCategories, sort]);

  // Reset page when filters/search change
  React.useEffect(() => {
    setPage(1);
  }, [query, selectedCategories, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const start = (pageSafe - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  function toggleCategory(cat: FragranceCategory) {
    setSelectedCategories((prev) => {
      const has = prev.includes(cat);
      const next = has ? prev.filter((c) => c !== cat) : [...prev, cat];
      return next;
    });
  }

  function clearAll() {
    setQuery("");
    setSelectedCategories([]);
    setSort("featured");
    setPage(1);
  }

  function formatPrice(usd: number) {
    try {
      return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(usd);
    } catch {
      return `$${usd.toFixed(2)}`;
    }
  }

  return (
    <section
      className={["w-full max-w-full", className].filter(Boolean).join(" ")}
      style={style}
      aria-label="Perfume catalog"
    >

      {/* Controls */}
      <div className="mt-8 rounded-lg border bg-secondary/50 p-4 sm:p-5">
        <div className="flex flex-col gap-4">
          {/* Top row: search and sort */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1 min-w-0">
              <label htmlFor="catalog-search" className="sr-only">
                Search perfumes
              </label>
              <div className="relative">
                <Input
                  id="catalog-search"
                  value={query}
                  onChange={(e) => setQuery(e.currentTarget.value)}
                  placeholder="Search by name, note, or category"
                  aria-label="Search perfumes"
                  className="w-full bg-card text-foreground placeholder:text-muted-foreground/70"
                />
                <div
                  className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground"
                  aria-hidden="true"
                >
                  <FunnelPlus className="h-4 w-4 opacity-60" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:justify-end">
              <div
                role="group"
                aria-label="Sort products"
                className="inline-flex rounded-md border bg-card p-1"
              >
                <button
                  type="button"
                  onClick={() => setSort("featured")}
                  aria-pressed={sort === "featured"}
                  className={[
                    "px-3 py-1.5 text-sm rounded",
                    sort === "featured"
                      ? "bg-secondary text-secondary-foreground"
                      : "text-foreground/80 hover:bg-secondary/60",
                  ].join(" ")}
                >
                  Featured
                </button>
                <button
                  type="button"
                  onClick={() => setSort("price-asc")}
                  aria-pressed={sort === "price-asc"}
                  className={[
                    "px-3 py-1.5 text-sm rounded inline-flex items-center gap-1",
                    sort === "price-asc"
                      ? "bg-secondary text-secondary-foreground"
                      : "text-foreground/80 hover:bg-secondary/60",
                  ].join(" ")}
                >
                  <ArrowDownWideNarrow className="h-4 w-4" aria-hidden="true" />
                  Price
                </button>
                <button
                  type="button"
                  onClick={() => setSort("price-desc")}
                  aria-pressed={sort === "price-desc"}
                  className={[
                    "px-3 py-1.5 text-sm rounded inline-flex items-center gap-1",
                    sort === "price-desc"
                      ? "bg-secondary text-secondary-foreground"
                      : "text-foreground/80 hover:bg-secondary/60",
                  ].join(" ")}
                >
                  <ArrowUpNarrowWide className="h-4 w-4" aria-hidden="true" />
                  Price
                </button>
              </div>
              <Button variant="secondary" onClick={clearAll} className="shrink-0">
                Reset
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <FunnelPlus className="h-4 w-4" aria-hidden="true" />
              Filter by category
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const checked = selectedCategories.includes(cat);
                return (
                  <label
                    key={cat}
                    className={[
                      "group inline-flex items-center gap-2 rounded-md border px-3 py-1.5",
                      checked ? "bg-card" : "bg-card/60",
                      "hover:bg-secondary/70 transition-colors cursor-pointer",
                    ].join(" ")}
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggleCategory(cat)}
                      aria-label={`Filter by ${cat}`}
                    />
                    <span className="text-sm text-foreground">{cat}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Active filter chips */}
          {(selectedCategories.length > 0 || query.trim()) && (
            <div className="flex flex-wrap items-center gap-2">
              {query.trim() && (
                <Badge
                  variant="secondary"
                  className="bg-secondary text-secondary-foreground"
                  aria-label={`Search filter: ${query}`}
                >
                  “{query}”
                </Badge>
              )}
              {selectedCategories.map((c) => (
                <Badge
                  key={c}
                  variant="secondary"
                  className="bg-secondary text-secondary-foreground"
                  aria-label={`Category filter: ${c}`}
                >
                  {c}
                </Badge>
              ))}
              <button
                type="button"
                onClick={clearAll}
                className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8">
        {loading ? (
          <SkeletonGrid count={pageSize} />
        ) : paged.length === 0 ? (
          <EmptyState onReset={clearAll} />
        ) : (
          <>
            <ul
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              role="list"
            >
              {paged.map((product) => (
                <li key={product.id} className="min-w-0">
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                className="mt-8 flex items-center justify-between gap-3"
                aria-label="Pagination"
              >
                <div className="text-sm text-muted-foreground">
                  Page {pageSafe} of {totalPages} · {filtered.length} items
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="px-3"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={pageSafe === 1}
                    aria-label="Previous page"
                  >
                    <ArrowDownNarrowWide className="h-4 w-4 rotate-90" aria-hidden="true" />
                  </Button>
                  {getPageNumbers(pageSafe, totalPages).map((pNum, idx) =>
                    pNum === -1 ? (
                      <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">
                        …
                      </span>
                    ) : (
                      <Button
                        key={pNum}
                        variant={pNum === pageSafe ? "default" : "secondary"}
                        size="sm"
                        className={pNum === pageSafe ? "" : "bg-secondary"}
                        onClick={() => setPage(pNum)}
                        aria-current={pNum === pageSafe ? "page" : undefined}
                        aria-label={`Go to page ${pNum}`}
                      >
                        {pNum}
                      </Button>
                    )
                  )}
                  <Button
                    variant="secondary"
                    size="sm"
                    className="px-3"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={pageSafe === totalPages}
                    aria-label="Next page"
                  >
                    <ArrowDownNarrowWide className="h-4 w-4 -rotate-90" aria-hidden="true" />
                  </Button>
                </div>
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group relative overflow-hidden border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 pt-0 h-full flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {/* Subtle vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
      </div>
      <CardHeader className="space-y-2 flex-grow">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base sm:text-lg md:text-xl leading-snug break-words hyphens-auto">
            {product.name}
          </CardTitle>
          <Badge
            variant="secondary"
            className="bg-secondary text-secondary-foreground shrink-0 mt-1"
            aria-label={`Category: ${product.category}`}
          >
            {product.category}
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground break-words line-clamp-3 leading-relaxed">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between mt-auto">
        <div className="text-foreground font-medium">{formatPriceLocal(product.price)}</div>
        <div className="text-sm text-muted-foreground">50 ml</div>
      </CardContent>
    </Card>
  );
}

function SkeletonGrid({ count }: { count: number }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i}>
          <div className="animate-pulse overflow-hidden rounded-lg border bg-card">
            <div className="h-44 bg-muted" />
            <div className="p-4 space-y-3">
              <div className="h-5 w-2/3 rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-5/6 rounded bg-muted" />
              <div className="mt-2 flex items-center justify-between">
                <div className="h-5 w-20 rounded bg-muted" />
                <div className="h-5 w-12 rounded bg-muted" />
              </div>
              <div className="mt-2 h-9 w-36 rounded bg-muted" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-lg border bg-card p-10 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
        <FunnelPlus className="h-6 w-6 text-secondary-foreground" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold">No perfumes match your filters</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Try adjusting your search or clearing some categories to discover more from our collection.
      </p>
      <div className="mt-5">
        <Button variant="secondary" onClick={onReset}>
          Clear filters
        </Button>
      </div>
    </div>
  );
}

function getPageNumbers(current: number, total: number): number[] {
  // Returns array with page numbers; -1 denotes ellipsis
  const pages: number[] = [];
  const add = (n: number) => pages.push(n);

  if (total <= 7) {
    for (let i = 1; i <= total; i++) add(i);
    return pages;
  }

  add(1);
  if (current > 4) pages.push(-1);

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) add(i);

  if (current < total - 3) pages.push(-1);
  add(total);

  return pages;
}

function formatPriceLocal(price: number): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `$${price}`;
  }
}
