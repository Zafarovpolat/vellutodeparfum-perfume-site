"use client";

import React, { useState, useEffect } from "react";
import PerfumeHeader from "@/components/PerfumeHeader";
import PerfumeCatalog from "@/components/PerfumeCatalog";
import PerfumeFooter from "@/components/PerfumeFooter";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setScrolled(window.scrollY > heroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      {/* Header simplified */}
      <PerfumeHeader scrolled={scrolled} className="z-40" />

      {/* Brand hero */}
      <section
        aria-label="Brand hero"
        className="relative overflow-hidden h-screen"
      >
        <picture className="absolute inset-0 w-full h-full">
          <source media="(max-width: 767px)" srcSet="./s.jpg" />
          <img
            className="w-full h-full object-cover md:object-center object-left"
            src="./t.jpg"
            alt="Hero background"
          />
        </picture>

        <div className="container h-full flex items-center mx-auto px-4 sm:px-6 py-12 sm:py-20 relative">
          <div className="max-w-3xl">
            <p className="text-[var(--color-yellow)]/90 tracking-wide text-xs uppercase">
              Italian luxury
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-primary-foreground">
              VellutoDeParfum
            </h1>
            <p className="mt-4 text-base sm:text-lg text-primary-foreground">
              An online boutique of parfumerie. Crafted in Italy with rare ingredients and quiet precision.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="/product"
                className="inline-flex items-center rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Explore the collection"
              >
                Explore the collection
              </a>
            </div>
          </div>
        </div>
      </section>

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
