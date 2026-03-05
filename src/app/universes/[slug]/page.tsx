"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/shop";
import { LuxuryDiamond } from "@/components/common/LuxuryDiamond";
import { getUniverseBySlug } from "@/lib/data/universes";
import { getProductsByUniverse } from "@/lib/data/products";
import { getCategoryDisplayName, JewelryCategory } from "@/types/product";

export default function UniverseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const universe = getUniverseBySlug(slug);
  const products = universe ? getProductsByUniverse(universe.id) : [];

  // Group products by category
  const productsByCategory = useMemo(() => {
    const grouped: Record<JewelryCategory, typeof products> = {
      rings: [],
      necklaces: [],
      earrings: [],
      bracelets: [],
      specials: [],
    };

    products.forEach((product) => {
      grouped[product.category].push(product);
    });

    return grouped;
  }, [products]);

  // Get categories with products
  const categoriesWithProducts = Object.entries(productsByCategory).filter(
    ([, items]) => items.length > 0
  ) as [JewelryCategory, typeof products][];

  if (!universe) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-20 lg:pt-[120px] flex items-center justify-center">
          <div className="text-center">
            <LuxuryDiamond className="w-16 h-16 mx-auto mb-6 opacity-30" />
            <p className="font-display text-2xl text-foreground mb-4">Universe not found</p>
            <Link href="/universes" className="text-primary hover:underline">
              Explore All Universes
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20 lg:pt-[120px]">
        {/* Hero Section */}
        <section
          className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(to bottom, ${universe.color}15, transparent)`,
          }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="univ-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M30 0 L35 15 L30 30 L25 15 Z" fill={universe.color}/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#univ-pattern)" />
            </svg>
          </div>

          {/* Gradient Orbs */}
          <div
            className="absolute top-0 left-1/4 w-[600px] h-[600px] blur-[200px] rounded-full opacity-30"
            style={{ backgroundColor: universe.color }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-[400px] h-[400px] blur-[150px] rounded-full opacity-20"
            style={{ backgroundColor: universe.color }}
          />

          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-40 h-40">
            <div
              className="absolute top-8 left-8 w-24 h-[1px]"
              style={{ background: `linear-gradient(to right, ${universe.color}80, transparent)` }}
            />
            <div
              className="absolute top-8 left-8 w-[1px] h-24"
              style={{ background: `linear-gradient(to bottom, ${universe.color}80, transparent)` }}
            />
          </div>
          <div className="absolute top-0 right-0 w-40 h-40">
            <div
              className="absolute top-8 right-8 w-24 h-[1px]"
              style={{ background: `linear-gradient(to left, ${universe.color}80, transparent)` }}
            />
            <div
              className="absolute top-8 right-8 w-[1px] h-24"
              style={{ background: `linear-gradient(to bottom, ${universe.color}80, transparent)` }}
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 text-sm font-sans text-muted-foreground mb-8"
            >
              <Link href="/universes" className="hover:text-foreground transition-colors">
                Universes
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">{universe.name}</span>
            </motion.nav>

            {/* Universe Type Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-sans font-semibold uppercase tracking-wider border"
                style={{
                  color: universe.color,
                  borderColor: `${universe.color}40`,
                  backgroundColor: `${universe.color}10`,
                }}
              >
                {universe.type === "moment" ? "Moment Universe" : "Identity Universe"}
              </span>
            </motion.div>

            {/* Universe Name */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-semibold text-foreground mb-6"
            >
              {universe.name}
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl sm:text-2xl font-serif italic text-muted-foreground mb-8"
            >
              {universe.tagline}
            </motion.p>

            {/* Diamond Divider */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <div className="w-16 h-[1px] bg-linear-to-r from-transparent to-gold" />
              <LuxuryDiamond className="w-6 h-6" />
              <div className="w-16 h-[1px] bg-linear-to-l from-transparent to-gold" />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base font-sans text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8"
            >
              {universe.description}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-8"
            >
              <div className="text-center">
                <span className="block font-display text-3xl font-semibold" style={{ color: universe.color }}>
                  {products.length}
                </span>
                <span className="text-sm font-sans text-muted-foreground">Pieces</span>
              </div>
              <div className="w-[1px] h-12 bg-border" />
              <div className="text-center flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold" />
                <span className="text-sm font-sans text-muted-foreground">Free Story Card</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs font-sans font-semibold uppercase tracking-[0.3em] text-gold mb-6">
                The Story
              </p>
              <blockquote className="font-serif italic text-xl sm:text-2xl text-foreground leading-relaxed">
                &ldquo;{universe.story}&rdquo;
              </blockquote>
            </motion.div>
          </div>
        </section>

        {/* Products by Category */}
        {categoriesWithProducts.map(([category, categoryProducts], sectionIndex) => (
          <section key={category} className="py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Category Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-between mb-12"
              >
                <div>
                  <p className="font-display text-2xl lg:text-3xl font-semibold text-foreground">
                    {getCategoryDisplayName(category)}
                  </p>
                  <p className="font-sans text-muted-foreground mt-1">
                    {categoryProducts.length} {categoryProducts.length === 1 ? "piece" : "pieces"}
                  </p>
                </div>
                <Link
                  href={`/shop?universe=${universe.id}&category=${category}`}
                  className="text-sm font-sans text-primary hover:underline"
                >
                  View All
                </Link>
              </motion.div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {categoryProducts.slice(0, 4).map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={sectionIndex * 4 + index}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Back to Universes */}
        <section className="py-16 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link
              href="/universes"
              className="inline-flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Explore Other Universes
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
