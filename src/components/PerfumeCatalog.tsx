"use client";

import * as React from "react";
import Link from "next/link";
import {
  FunnelPlus,
  Sparkle,
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ArrowDownNarrowWide,
  Package2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
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
    id: "velluto-aurora",
    name: "Aurora di Firenze",
    category: "Floral",
    price: 185,
    imageUrl:
      "./1.png",
    description:
      "A luminous floral bouquet inspired by dawn over Tuscan hills. Notes of peony, freesia, and neroli drift over a whisper of white musk. Soft, radiant, and endlessly romantic.",
  },
  {
    id: "velluto-notte-nera",
    name: "Notte Nera",
    category: "Oriental",
    price: 210,
    imageUrl:
      "./1.png",
    description:
      "An opulent oriental that glows like midnight velvet. Saffron and cardamom ignite a heart of rose absolute, anchored by smoky vanilla and resinous amber. Intense, addictive, and hypnotic.",
  },
  {
    id: "velluto-liguria-citrus",
    name: "Ligurian Coast",
    category: "Citrus",
    price: 160,
    imageUrl:
      "./1.png",
    description:
      "A sparkling plunge into sunlit seas. Zesty bergamot and Amalfi lemon lift aromatic basil and petitgrain, settling into a clean cedar dry-down. Brisk, modern, and effortlessly fresh.",
  },
  {
    id: "velluto-selva-di-ombre",
    name: "Selva di Ombre",
    category: "Woody",
    price: 195,
    imageUrl:
      "./1.png",
    description:
      "A dusky forest walk captured in scent. Black tea and vetiver weave through textured cedar and guaiac wood, warmed by a thread of tonka. Textural, earthy, and serene.",
  },
  {
    id: "velluto-rosa-vecchia",
    name: "Rosa Vecchia",
    category: "Floral",
    price: 205,
    imageUrl:
      "./1.png",
    description:
      "A timeless rose rendered with Italian restraint. Dewy rose and pink pepper meet tea leaves and cashmere woods. Elegant, balanced, and quietly luminous.",
  },
  {
    id: "velluto-ambra-venezia",
    name: "Ambra di Venezia",
    category: "Oriental",
    price: 225,
    imageUrl:
      "./1.png",
    description:
      "Amber gilded by Venetian gold. Labdanum and benzoin melt into spicy vanilla and toasted almond facets. Decadent warmth that lingers like candlelight.",
  },
  {
    id: "velluto-nero-legno",
    name: "Legno Nero",
    category: "Woody",
    price: 198,
    imageUrl:
      "./1.png",
    description:
      "A sculpted ode to dark woods. Incense curls around smoky birch and patchouli, with a mineral touch for modern clarity. Bold, architectural, and impeccably tailored.",
  },
  {
    id: "velluto-arancia-amara",
    name: "Arancia Amara",
    category: "Citrus",
    price: 175,
    imageUrl:
      "./1.png",
    description:
      "Bitter orange zest softened by neroli blossom. A saline breeze and crisp vetiver create a clean, uplifting trail. Effervescent elegance for everyday light.",
  },
  {
    id: "velluto-spezie-di-mercato",
    name: "Spezie di Mercato",
    category: "Aromatic",
    price: 170,
    imageUrl:
      "./1.png",
    description:
      "Sun-warmed herbs and market spices. Clary sage and rosemary mingle with pink pepper over dry woods. Lively, textured, and irresistibly wearable.",
  },
  {
    id: "velluto-vaniglia-setosa",
    name: "Vaniglia Setosa",
    category: "Gourmand",
    price: 215,
    imageUrl:
      "./1.png",
    description:
      "A silk-smooth vanilla with couture poise. Madagascar vanilla absolute folds into almond milk and soft suede. Creamy, refined, and totally indulgent.",
  },
  {
    id: "velluto-lavanda-di-colline",
    name: "Lavanda di Colline",
    category: "Aromatic",
    price: 165,
    imageUrl:
      "./1.png",
    description:
      "Rolling lavender fields warmed by Mediterranean light. Crushed lavender and bergamot rest on clean musk and pale woods. Airy, calming, and beautifully balanced.",
  },
  {
    id: "velluto-cacao-ombra",
    name: "Cacao Ombra",
    category: "Gourmand",
    price: 220,
    imageUrl:
      "./1.png",
    description:
      "Dark cacao wrapped in smoky velvet. Subtle spice, roasted hazelnut, and a shadow of oud create a magnetic, lingering depth. Seductive and unforgettable.",
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

  function formatPrice(eur: number) {
    try {
      return new Intl.NumberFormat(undefined, { style: "currency", currency: "EUR" }).format(eur);
    } catch {
      return `€${eur.toFixed(2)}`;
    }
  }

  return (
    <section
      className={["w-full max-w-full", className].filter(Boolean).join(" ")}
      style={style}
      aria-label="Perfume catalog"
    >
      {/* Hero */}
      <div className="relative overflow-hidden rounded-lg bg-card">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[var(--color-yellow)]/10 blur-3xl" />
        </div>
        <div className="relative px-6 py-10 sm:px-8 sm:py-14">
          <div className="flex items-start gap-3">
            <div className="rounded-md bg-secondary text-secondary-foreground p-2">
              <Sparkle className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h1 className="text-foreground text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
                VellutoDeParfum Collection
              </h1>
              <p className="mt-2 text-muted-foreground max-w-3xl">
                Crafted in Italy with rare ingredients and quiet precision. Explore our curated catalog of modern classics—each composition a study in texture, light, and unforgettable trail.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                  {dataset.length} perfumes
                </Badge>
                <span aria-hidden="true" className="hidden sm:inline">
                  ·
                </span>
                <span className="hidden sm:inline">Complimentary samples with every order</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    <Card className="group relative overflow-hidden border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 pt-0">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg bg-black">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {/* Subtle vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
      </div>
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-base sm:text-lg md:text-xl leading-snug">
            <span className="block truncate">{product.name}</span>
          </CardTitle>
          <Badge
            variant="secondary"
            className="bg-secondary text-secondary-foreground shrink-0"
            aria-label={`Category: ${product.category}`}
          >
            {product.category}
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground break-words line-clamp-3">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="text-foreground font-medium">{formatPriceLocal(product.price)}</div>
        <div className="text-sm text-muted-foreground">50 ml</div>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-3">
        <Link
          href="/product"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap"
          aria-label={`Discover more about ${product.name}`}
        >
          <Package2 className="h-4 w-4" aria-hidden="true" />
          <span>Discover More</span>
        </Link>
        <div className="text-xs text-muted-foreground">Ships in 2–4 days</div>
      </CardFooter>
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
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `€${price}`;
  }
}
