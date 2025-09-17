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

type FragranceCategory = "Цветочный" | "Древесный" | "Восточный" | "Цитрусовый" | "Ароматный" | "Гурманский";

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
    category: "Цветочный",
    price: 105,
    imageUrl: "./list/1.png",
    description: "Завораживающий цветочный аромат с нотами жасмина, розы и иланг-иланга, вызывающий элегантность и чувственность.",
  },
  {
    id: "2",
    name: "GUCCI FLORA GORGEOUS MAGNOLIA EDP",
    category: "Цветочный",
    price: 115,
    imageUrl: "./list/2.png",
    description: "Яркий цветочный аромат с магнолией, пионом и пачули для свежего романтического очарования.",
  },
  {
    id: "3",
    name: "DIOR MISS DIOR ROSE N'ROSES EDT",
    category: "Цветочный",
    price: 120,
    imageUrl: "./list/3.png",
    description: "Нежный букет роз с оттенками палисандра и мускуса, идеально для повседневной элегантности.",
  },
  {
    id: "4",
    name: "GUCCI GUILTY ABSOLUTE POUR FEMME EDP",
    category: "Восточный",
    price: 90,
    imageUrl: "./list/4.png",
    description: "Интенсивный восточный аромат с розовым перцем, сиренью и пачули для смелого соблазнительного присутствия.",
  },
  {
    id: "5",
    name: "GUCCI GUILTY POUR HOMME EDT",
    category: "Ароматный",
    price: 85,
    imageUrl: "./list/5.png",
    description: "Свежий ароматный аромат с розовым перцем, сиренью и кожей, идеально для современного мужчины.",
  },
  {
    id: "6",
    name: "YSL BLACK OPIUM EDP OVER RED",
    category: "Восточный",
    price: 105,
    imageUrl: "./list/6.png",
    description: "Дымный восточный аромат с кофе, ванилью и белыми цветами, излучающий тайну и очарование.",
  },
  {
    id: "7",
    name: "YSL BLACK OPIUM EDP",
    category: "Восточный",
    price: 95,
    imageUrl: "./list/7.png",
    description: "Зависимая восточная смесь кофе, ванили и жасмина для захватывающего чувственного опыта.",
  },
  {
    id: "8",
    name: "TF FUCKING FABULOUS EDP",
    category: "Гурманский",
    price: 145,
    imageUrl: "./list/8.png",
    description: "Игривый гурманский аромат с малиной, шафраном и пачули, празднующий смелость и веселье.",
  },
  {
    id: "9",
    name: "TF BITTER PEACH EDP",
    category: "Гурманский",
    price: 150,
    imageUrl: "./list/9.png",
    description: "Фруктовый гурманский аромат с горьким персиком, миндалем и ванилью, предлагающий сладкий, но острый поворот.",
  },
  {
    id: "10",
    name: "TF TOBACCO VANILLE EDP",
    category: "Восточный",
    price: 160,
    imageUrl: "./list/10.png",
    description: "Богатый восточный аромат, смешивающий табак, тонка-бобы и ваниль для теплой, утонченной атмосферы.",
  },
  {
    id: "11",
    name: "GIORGIO ARMANI ACQUA DI GIO EDT",
    category: "Цитрусовый",
    price: 95,
    imageUrl: "./list/11.png",
    description: "Свежий цитрусовый водный аромат с морскими нотами, розмарином и пачули, вызывающий прибрежное спокойствие.",
  },
  {
    id: "12",
    name: "EMPORIO ARMANI STRONGER WITH YOU SANDALWOOD",
    category: "Древесный",
    price: 115,
    imageUrl: "./list/12.png",
    description: "Древесный аромат с сандаловым деревом, ветивером и тонка-бобами, излучающий силу и тепло.",
  },
  {
    id: "13",
    name: "EMPORIO ARMANI STRONGER WITH YOU TOBACCO",
    category: "Восточный",
    price: 120,
    imageUrl: "./list/13.png",
    description: "Восточный табачный аромат с пряными нотами и янтарем, идеально для уверенных личностей.",
  },
  {
    id: "14",
    name: "EMPORIO ARMANI STRONGER WITH YOU PARFUM",
    category: "Восточный",
    price: 110,
    imageUrl: "./list/14.png",
    description: "Универсальный восточный с кожей, специями и амброй, воплощающий вечное очарование.",
  },
  {
    id: "15",
    name: "EMPORIO ARMANI STRONGER WITH YOU AMBER EDP",
    category: "Восточный",
    price: 115,
    imageUrl: "./list/15.png",
    description: "Богатый янтарем восточный с теплыми специями и смолами, предлагающий глубину и утонченность.",
  },
  {
    id: "16",
    name: "DIOR SAUVAGE (ELIXIR)",
    category: "Древесный",
    price: 130,
    imageUrl: "./list/16.png",
    description: "Древесный ароматный с перцем, лавандой и амброксаном, захватывающий дикую свободу.",
  },
  {
    id: "17",
    name: "DIOR SAUVAGE (EDP)",
    category: "Древесный",
    price: 105,
    imageUrl: "./list/17.png",
    description: "Свежий древесный аромат с бергамотом, перцем и ветивером для авантюрного духа.",
  },
  {
    id: "18",
    name: "VERSACE EROS EDP",
    category: "Восточный",
    price: 70,
    imageUrl: "./list/18.png",
    description: "Восточный фужер с мятой, геранью и тонка-бобами, символизирующий страсть и энергию.",
  },
  {
    id: "19",
    name: "VERSACE EROS PARFUM",
    category: "Восточный",
    price: 75,
    imageUrl: "./list/19.png",
    description: "Более глубокий восточный с янтарем, ванилью и деревом, усиливающий сущность желания.",
  },
  {
    id: "20",
    name: "YSL MON PARIS EDP",
    category: "Цветочный",
    price: 80,
    imageUrl: "./list/20.png",
    description: "Цветочный шипр с жасмином, розой и пачули, празднующий парижскую элегантность.",
  },
  {
    id: "21",
    name: "RALPH LAUREN POLO BLUE",
    category: "Цитрусовый",
    price: 65,
    imageUrl: "./list/21.png",
    description: "Свежий цитрусовый водный аромат с дыней, огурцом и мускусом, воплощающий классический американский стиль.",
  },
  {
    id: "22",
    name: "CREED CENTAURUS",
    category: "Древесный",
    price: 140,
    imageUrl: "./list/22.png",
    description: "Древесный восточный с имбирем, яблоком и сандаловым деревом для взыскательного джентльмена.",
  },
  {
    id: "23",
    name: "INITIO OUD FOR GREATNESS",
    category: "Древесный",
    price: 160,
    imageUrl: "./list/23.png",
    description: "Роскошный древесный уд с шафраном и розой, представляющий силу и амбиции.",
  },
  {
    id: "24",
    name: "CREED SPRING FLOWER",
    category: "Цветочный",
    price: 115,
    imageUrl: "./list/24.png",
    description: "Свежий цветочный с ландышем, розой и мускусом, цветущий весенней радостью.",
  },
  {
    id: "25",
    name: "LE LABO ANOTHER 13",
    category: "Древесный",
    price: 115,
    imageUrl: "./list/25.png",
    description: "Древесный цветочный с туберозой, апельсиновым цветом и пачули, уникально личный.",
  },
  {
    id: "26",
    name: "TF BLACK ORCHID EDP",
    category: "Цветочный",
    price: 135,
    imageUrl: "./list/26.png",
    description: "Темный цветочный с черной смородиной, орхидеей и ванилью, излучающий тайну и соблазн.",
  },
  {
    id: "27",
    name: "VERSACE EROS ENERGY POUR HOMME EDP",
    category: "Ароматный",
    price: 65,
    imageUrl: "./list/27.png",
    description: "Ароматный фужер с грейпфрутом, геранью и тонка-бобами, повышающий жизнеспособность.",
  },
  {
    id: "28",
    name: "TF ELECTRIC CHERRY EDP",
    category: "Гурманский",
    price: 150,
    imageUrl: "./list/28.png",
    description: "Фруктовый гурманский с вишней, шафраном и янтарем, вызывающий электрическое возбуждение.",
  },
  {
    id: "29",
    name: "TF LOST CHERRY EDP",
    category: "Гурманский",
    price: 150,
    imageUrl: "./list/29.png",
    description: "Сладкий гурманский с вишней, миндалем и тонка-бобами, открывающий потерянные удовольствия.",
  },
  {
    id: "30",
    name: "TF CHERRY SMOKE EDP",
    category: "Гурманский",
    price: 150,
    imageUrl: "./list/30.png",
    description: "Дымный гурманский с вишней, ладаном и кожей, смешивающий сладость с остротой.",
  },
  {
    id: "31",
    name: "CARTIER LA PANTHERE PARFUM",
    category: "Цветочный",
    price: 95,
    imageUrl: "./list/31.png",
    description: "Цветочный восточный с розой, жасмином и янтарем, воплощающий кошачью грацию и силу.",
  },
  {
    id: "32",
    name: "CARTIER LA PANTHERE EDT",
    category: "Цветочный",
    price: 90,
    imageUrl: "./list/32.png",
    description: "Свежий цветочный с мандарином, розой и мускусом, захватывающий игривую элегантность.",
  },
  {
    id: "33",
    name: "MFK BACCARAT ROUGE 540 PARFUM (WHITE)",
    category: "Восточный",
    price: 110,
    imageUrl: "./list/33.png",
    description: "Восточный цветочный с розой, ладаном и шафраном в роскошном белом издании.",
  },
  {
    id: "34",
    name: "KILIAN PEARL OUD EDP",
    category: "Древесный",
    price: 120,
    imageUrl: "./list/34.png",
    description: "Драгоценный древесный уд с розой, шафраном и амброй, излучающий роскошь.",
  },
  {
    id: "35",
    name: "LE LABO THE MATCHA 26",
    category: "Древесный",
    price: 100,
    imageUrl: "./list/35.png",
    description: "Зеленый древесный аромат с матчей, геранью и сандаловым деревом, свежий и заземляющий.",
  },
  {
    id: "36",
    name: "LE LABO MUSC 25",
    category: "Древесный",
    price: 100,
    imageUrl: "./list/36.png",
    description: "Мускусный древесный с туберозой, шафраном и тонка-бобами, теплый и обволакивающий.",
  },
  {
    id: "37",
    name: "LE LABO TUBEREUSE 40",
    category: "Цветочный",
    price: 100,
    imageUrl: "./list/37.png",
    description: "Цветочный тубероза с нероли, сандаловым деревом и мускусом, смелый и опьяняющий.",
  },
  {
    id: "38",
    name: "LE LABO MYRRHE 55",
    category: "Древесный",
    price: 100,
    imageUrl: "./list/38.png",
    description: "Смолистый древесный с миррой, опопонаксом и ладанумом, древний и мистический.",
  },
];

const CATEGORIES: FragranceCategory[] = ["Цветочный", "Древесный", "Восточный", "Цитрусовый", "Ароматный", "Гурманский"];

export default function PerfumeCatalog({
  className,
  style,
  products,
  initialQuery = "",
  pageSize = DEFAULT_PAGE_SIZE,
  defaultSelectedCategories = [],
  defaultSort = "featured",
}: PerfumeCatalogProps) {
  const catalogRef = React.useRef<HTMLElement>(null);

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

    // Прокрутка к каталогу после изменения фильтра
    setTimeout(() => scrollToCatalogTop(), 300); // Даем время на ре-рендер
  }

  function clearAll() {
    setQuery("");
    setSelectedCategories([]);
    setSort("featured");
    setPage(1);
  }

  // Добавьте обработчик для сортировки:
  function handleSortChange(newSort: SortKey) {
    setSort(newSort);
    setTimeout(() => scrollToCatalogTop(), 300);
  }

  // Замените существующую функцию scrollToTop и связанные useEffect

  // Добавьте эти функции в ваш компонент PerfumeCatalog
  function scrollToTop() {
    if (catalogRef.current) {
      // Для мобильного Safari используем более надежный подход
      const isMobileSafari = /iPhone|iPad|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

      if (isMobileSafari) {
        // Для мобильного Safari используем множественные попытки скролла
        const scrollToElement = () => {
          catalogRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
        };

        // Немедленный скролл
        scrollToElement();

        // Дублируем через requestAnimationFrame
        requestAnimationFrame(() => {
          scrollToElement();
        });

        // Дополнительная попытка через небольшую задержку
        setTimeout(() => {
          scrollToElement();
        }, 100);

      } else {
        // Для других браузеров
        catalogRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    }
  }

  // Альтернативная функция для более точного скролла
  function scrollToCatalogTop() {
    const isMobileSafari = /iPhone|iPad|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    if (catalogRef.current) {
      const rect = catalogRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset + rect.top - 20; // 20px отступ сверху

      if (isMobileSafari) {
        // Для Safari на iOS используем window.scrollTo с множественными попытками
        const performScroll = () => {
          window.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
          });
        };

        performScroll();

        requestAnimationFrame(performScroll);

        setTimeout(performScroll, 50);
        setTimeout(performScroll, 150);

      } else {
        window.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
      }
    }
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
      ref={catalogRef}
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
                  placeholder="Поиск по названию, ноте или категории"
                  aria-label="Поиск парфюмов"
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
                  onClick={() => handleSortChange("featured")}
                  aria-pressed={sort === "featured"}
                  className={[
                    "px-3 py-1.5 text-sm rounded",
                    sort === "featured"
                      ? "bg-secondary text-secondary-foreground"
                      : "text-foreground/80 hover:bg-secondary/60",
                  ].join(" ")}
                >
                  Рекомендуемые
                </button>
                <button
                  type="button"
                  onClick={() => handleSortChange("price-asc")}
                  aria-pressed={sort === "price-asc"}
                  className={[
                    "px-3 py-1.5 text-sm rounded inline-flex items-center gap-1",
                    sort === "price-asc"
                      ? "bg-secondary text-secondary-foreground"
                      : "text-foreground/80 hover:bg-secondary/60",
                  ].join(" ")}
                >
                  <ArrowDownWideNarrow className="h-4 w-4" aria-hidden="true" />
                  Цена
                </button>
                <button
                  type="button"
                  onClick={() => handleSortChange("price-desc")}
                  aria-pressed={sort === "price-desc"}
                  className={[
                    "px-3 py-1.5 text-sm rounded inline-flex items-center gap-1",
                    sort === "price-desc"
                      ? "bg-secondary text-secondary-foreground"
                      : "text-foreground/80 hover:bg-secondary/60",
                  ].join(" ")}
                >
                  <ArrowUpNarrowWide className="h-4 w-4" aria-hidden="true" />
                  Цена
                </button>
              </div>
              <Button variant="secondary" onClick={clearAll} className="shrink-0">
                Сбросить
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <FunnelPlus className="h-4 w-4" aria-hidden="true" />
              Фильтр по категории
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
                      aria-label={`Фильтр по ${cat}`}
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
                  aria-label={`Поисковый фильтр: ${query}`}
                >
                  "{query}"
                </Badge>
              )}
              {selectedCategories.map((c) => (
                <Badge
                  key={c}
                  variant="secondary"
                  className="bg-secondary text-secondary-foreground"
                  aria-label={`Фильтр категории: ${c}`}
                >
                  {c}
                </Badge>
              ))}
              <button
                type="button"
                onClick={clearAll}
                className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
              >
                Очистить все
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
                  Страница {pageSafe} из {totalPages} · {filtered.length} товаров
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="px-3"
                    onClick={() => {
                      setPage((p) => Math.max(1, p - 1));
                      // Используйте setTimeout для Safari
                      setTimeout(() => scrollToCatalogTop(), 10);
                    }}
                    disabled={pageSafe === 1}
                    aria-label="Предыдущая страница"
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
                        onClick={() => {
                          setPage(pNum);
                          setTimeout(() => scrollToCatalogTop(), 10);
                        }}
                        aria-current={pNum === pageSafe ? "page" : undefined}
                        aria-label={`Перейти на страницу ${pNum}`}
                      >
                        {pNum}
                      </Button>
                    )
                  )}
                  <Button
                    variant="secondary"
                    size="sm"
                    className="px-3"
                    onClick={() => {
                      setPage((p) => Math.min(totalPages, p + 1));
                      setTimeout(() => scrollToCatalogTop(), 10);
                    }}
                    disabled={pageSafe === totalPages}
                    aria-label="Следующая страница"
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
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg py-1">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {/* Subtle vignette */}
        <div className="pointer-events-none absolute inset-0 bg-black/10" />
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
      <h3 className="text-lg font-semibold">Парфюмы, соответствующие вашим фильтрам, не найдены</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Попробуйте изменить поиск или очистить категории, чтобы открыть больше из нашей коллекции.
      </p>
      <div className="mt-5">
        <Button variant="secondary" onClick={onReset}>
          Очистить фильтры
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
