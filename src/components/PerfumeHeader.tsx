"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export interface PerfumeHeaderProps {
  cartCount?: number;
  className?: string;
  ctaLabel?: string;
  ctaHref?: string;
  onCartClick?: () => void;
  scrolled?: boolean;
}

export default function PerfumeHeader({
  className,
  scrolled = false,
}: PerfumeHeaderProps) {
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 w-full  transition-all duration-300",
        scrolled ? "bg-white text-black opacity-100" : "bg-transparent text-white backdrop-blur opacity-0",
        className
      )}
      role="banner"
    >
      <div className="container mx-auto w-full max-w-full">
        <div className="flex items-center justify-center py-3 md:py-3 gap-3">
          {/* Brand */}
          <Link
            href="/"
            aria-label="VellutoDeParfum home"
            className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] rounded-[--radius] relative"
          >
            <div className="flex items-end gap-2">
              <span
                className={cn(
                  "text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide leading-none relative z-10 duration-200 border-none",
                  scrolled ? "text-[black]" : "text-[white]",
                  className
                )}
                style={{ letterSpacing: "0.02em" }}
              >
                VellutoDeParfum
              </span>
            </div>
          </Link>

          {/* Minimal header - no nav, no cart */}
          <div className="hidden" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
