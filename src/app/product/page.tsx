"use client";

import React, { useState, useEffect } from "react";
import PerfumeHeader from "@/components/PerfumeHeader";
import PerfumeFooter from "@/components/PerfumeFooter";
import ProductDetail from "@/components/ProductDetail";

export default function ProductPage() {
    const [scrolled, setScrolled] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(true);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main className="min-h-screen w-full bg-background text-foreground">
            <PerfumeHeader scrolled={scrolled} className="z-40 border-b border-border" />
            <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-16 mt-8">
                <ProductDetail />
            </div>
            <PerfumeFooter className="mt-12" />
        </main>
    );
}
