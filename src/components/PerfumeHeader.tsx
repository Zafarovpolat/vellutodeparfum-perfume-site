"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export interface PerfumeHeaderProps {
  cartCount?: number;
  className?: string;
  ctaLabel?: string;
  ctaHref?: string;
  onCartClick?: () => void;
}

export default function PerfumeHeader({
  className,
}: PerfumeHeaderProps) {
  return (
    <header
      className={cn(
        "w-full bg-background text-foreground border-b border-border/60",
        className
      )}
      role="banner"
    >
      <div className="container mx-auto w-full max-w-full">
        <div className="flex items-center justify-between py-3 md:py-4 gap-3">
          {/* Brand */}
          <Link
            href="/"
            aria-label="VellutoDeParfum home"
            className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] rounded-[--radius]"
          >
            <div className="flex items-end gap-2">
              <span
                className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide leading-none"
                style={{ letterSpacing: "0.02em" }}
              >
                VellutoDeParfum
              </span>
              <span
                className="hidden sm:inline-block h-[6px] w-[6px] rounded-full translate-y-[-2px]"
                aria-hidden="true"
                style={{ backgroundColor: "var(--color-yellow)" }}
              />
            </div>
          </Link>

          {/* Minimal header - no nav, no cart */}
          <div className="hidden" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}