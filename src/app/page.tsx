"use client";

import React from "react";
import PerfumeHeader from "@/components/PerfumeHeader";
import PerfumeCatalog from "@/components/PerfumeCatalog";
import PerfumeFooter from "@/components/PerfumeFooter";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      {/* Header simplified */}
      <PerfumeHeader className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/80" />

      {/* Brand hero */}
      <section
        aria-label="Brand hero"
        className="relative overflow-hidden border-b border-border/60"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[var(--color-yellow)]/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[var(--color-yellow)]/10 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 relative">
          <div className="max-w-3xl">
            <p className="text-[var(--color-yellow)]/90 tracking-wide text-xs uppercase">
              Italian luxury
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
              VellutoDeParfum
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              A modern house of haute parfumerie. Crafted in Italy with rare
              ingredients and quiet precision. Discover a catalog of refined,
              enduring compositions with gold-kissed accents and velvet depth.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#catalog"
                className="inline-flex items-center rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Explore the collection"
              >
                Explore the collection
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured product spotlight */}
      <section
        aria-label="Featured composition"
        className="container mx-auto px-4 sm:px-6 py-10 sm:py-14"
      >
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold">Featured</h2>
            <p className="text-sm text-muted-foreground">
              A nocturnal velvet embrace, meticulously balanced.
            </p>
          </div>
        </div>
        {/* @ts-expect-error - ProductDetail is a client component and this page is client */}
        {React.createElement(
          require("@/components/ProductDetail").default,
          {
            className: "rounded-lg border border-border bg-card p-5 sm:p-6",
          }
        )}
      </section>

      <Separator className="container mx-auto my-6 sm:my-10" />

      {/* Catalog */}
      <section
        id="catalog"
        aria-label="Catalog"
        className="container mx-auto px-4 sm:px-6 py-10 sm:py-16"
      >
        <PerfumeCatalog />
      </section>

      {/* Footer */}
      <PerfumeFooter className="mt-12" />
    </main>
  );
}