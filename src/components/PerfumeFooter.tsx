"use client";

import React from "react";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PerfumeFooterProps {
  className?: string;
  style?: React.CSSProperties;
  brandName?: string;
  brandTagline?: string;
  brandStatement?: string;
}

export default function PerfumeFooter({
  className,
  style,
  brandName = "VellutoDeParfum",
  brandTagline = "A modern house of haute parfumerie",
  brandStatement =
  "VellutoDeParfum embodies timeless elegance and Italian craftsmanship. Each fragrance is created with rare raw materials and meticulous care, offering a refined sensory experience for those seeking authentic luxury.",
}: PerfumeFooterProps) {
  return (
    <footer
      className={cn(
        "w-full bg-card text-foreground border-t border-border",
        "pt-10 pb-8",
        className
      )}
      style={style}
      aria-labelledby="footer-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <h2 id="footer-heading" className="sr-only">
          Site Information
        </h2>

        {/* Brand block */}
        <section className="min-w-0">
          <div className="flex items-center gap-3">
            <span className="inline-flex  h-10 w-10 items-center justify-center rounded-full text-foreground/90 ring-1 ring-border bg-accent-foreground">
              <img src={'./logo.svg'} />
            </span>
            <div className="min-w-0">
              <p className="text-base font-semibold tracking-wide">{brandName}</p>
              <p className="text-sm text-muted-foreground">{brandTagline}</p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground/90 break-words">
            {brandStatement}
          </p>
        </section>

        <div className="mt-8 h-px w-full bg-border" aria-hidden="true" />

        {/* Copyright only */}
        <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
          <p className="truncate">
            © {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
          {/* No footer links */}
        </div>
      </div>
    </footer>
  );
}
