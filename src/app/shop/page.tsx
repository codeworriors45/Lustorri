"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard, ProductFilters } from "@/components/shop";
import { LuxuryDiamond } from "@/components/common/LuxuryDiamond";
import { products } from "@/lib/data/products";
import { JewelryCategory, MetalType, Product } from "@/types/product";

interface FilterState {
  categories: JewelryCategory[];
  universes: string[];
  metals: MetalType[];
  priceRange: [number, number];
  sortBy: string;
}

export default function ShopPage() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    universes: [],
    metals: [],
    priceRange: [0, 99999],
    sortBy: "featured",
  });

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    // Filter by universe
    if (filters.universes.length > 0) {
      result = result.filter((p) => filters.universes.includes(p.universeId));
    }

    // Filter by metal
    if (filters.metals.length > 0) {
      result = result.filter((p) =>
        p.variants.some((v) => filters.metals.includes(v.metal))
      );
    }

    // Filter by price
    result = result.filter((p) => {
      const lowestPrice = Math.min(...p.variants.map((v) => v.price));
      return lowestPrice >= filters.priceRange[0] && lowestPrice <= filters.priceRange[1];
    });

    // Sort
    switch (filters.sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "price-low":
        result.sort((a, b) => {
          const aPrice = Math.min(...a.variants.map((v) => v.price));
          const bPrice = Math.min(...b.variants.map((v) => v.price));
          return aPrice - bPrice;
        });
        break;
      case "price-high":
        result.sort((a, b) => {
          const aPrice = Math.min(...a.variants.map((v) => v.price));
          const bPrice = Math.min(...b.variants.map((v) => v.price));
          return bPrice - aPrice;
        });
        break;
      case "bestseller":
        result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
      default:
        // Featured - bestsellers first, then by review count
        result.sort((a, b) => {
          if (a.isBestseller && !b.isBestseller) return -1;
          if (!a.isBestseller && b.isBestseller) return 1;
          return b.reviewCount - a.reviewCount;
        });
    }

    return result;
  }, [filters]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20 lg:pt-[120px]">
        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 lg:py-28 bg-linear-to-b from-muted/50 to-background overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-[0.02]">
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="shop-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M40 0 L45 20 L40 40 L35 20 Z" fill="#C4A968" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#shop-pattern)" />
            </svg>
          </div>

          <div className="absolute top-20 left-[10%] w-[400px] h-[400px] bg-primary/5 blur-[150px] rounded-full" />
          <div className="absolute bottom-0 right-[10%] w-[300px] h-[300px] bg-gold/5 blur-[120px] rounded-full" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <LuxuryDiamond className="w-12 h-12 mx-auto" />
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-4 text-[11px] font-sans font-semibold uppercase tracking-[0.35em] text-gold"
            >
              <span className="w-10 h-px bg-linear-to-r from-transparent to-gold" />
              Shop Collection
              <span className="w-10 h-px bg-linear-to-l from-transparent to-gold" />
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-light text-foreground tracking-tight"
            >
              Discover Your
              <span className="block mt-2 sm:mt-3 font-semibold bg-linear-to-r from-primary via-rose-gold to-primary bg-clip-text text-transparent">
                Forever Piece
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg font-sans text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0"
            >
              Browse our curated collection of story-driven jewelry. Each piece comes with a free metal engraved story card.
            </motion.p>
          </div>
        </section>

        {/* Shop Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
            {/* Filters Sidebar */}
            <ProductFilters
              filters={filters}
              onFilterChange={setFilters}
              totalProducts={filteredProducts.length}
            />

            {/* Product Grid */}
            <div className="flex-1 min-w-0">
              {/* Desktop Sort & Count */}
              <div className="hidden lg:flex items-center justify-between mb-6 lg:mb-8 pb-4 lg:pb-6 border-b border-border">
                <p className="font-sans text-muted-foreground">
                  Showing <span className="text-foreground font-medium">{filteredProducts.length}</span> products
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-sans text-muted-foreground">Sort by:</span>
                  <Select
                    value={filters.sortBy}
                    onValueChange={(value) => setFilters({ ...filters, sortBy: value })}
                  >
                    <SelectTrigger className="w-[180px] h-9 rounded border-border">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="bestseller">Bestsellers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <LuxuryDiamond className="w-16 h-16 mx-auto mb-6 opacity-30" />
                  <p className="h3 text-foreground mb-2">No products found</p>
                  <p className="font-sans text-muted-foreground mb-6">
                    Try adjusting your filters to find what you&apos;re looking for.
                  </p>
                  <Button
                    onClick={() =>
                      setFilters({
                        categories: [],
                        universes: [],
                        metals: [],
                        priceRange: [0, 99999],
                        sortBy: "featured",
                      })
                    }
                    rounded="full"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
