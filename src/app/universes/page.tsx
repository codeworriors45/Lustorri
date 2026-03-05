"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Heart } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LuxuryDiamond } from "@/components/common/LuxuryDiamond";
import { universes, getUniversesByType } from "@/lib/data/universes";

export default function UniversesPage() {
  const momentUniverses = getUniversesByType("moment");
  const identityUniverses = getUniversesByType("identity");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20 lg:pt-[120px]">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 bg-linear-to-b from-[#1a1512] to-[#0f0d0b] overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-[0.03]">
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="univ-list-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M40 0 L45 20 L40 40 L35 20 Z" fill="#C4A968"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#univ-list-pattern)" />
            </svg>
          </div>

          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[200px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gold/5 blur-[180px] rounded-full" />

          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-40 h-40">
            <div className="absolute top-8 left-8 w-24 h-[1px] bg-linear-to-r from-gold/60 to-transparent" />
            <div className="absolute top-8 left-8 w-[1px] h-24 bg-linear-to-b from-gold/60 to-transparent" />
          </div>
          <div className="absolute top-0 right-0 w-40 h-40">
            <div className="absolute top-8 right-8 w-24 h-[1px] bg-linear-to-l from-gold/60 to-transparent" />
            <div className="absolute top-8 right-8 w-[1px] h-24 bg-linear-to-b from-gold/60 to-transparent" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <LuxuryDiamond className="w-12 h-12 mx-auto" />
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-4 text-[11px] font-sans font-semibold uppercase tracking-[0.35em] text-gold"
            >
              <span className="w-10 h-[1px] bg-linear-to-r from-transparent to-gold" />
              Story-Driven Collections
              <span className="w-10 h-[1px] bg-linear-to-l from-transparent to-gold" />
            </motion.span>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-display font-light text-white tracking-tight"
            >
              Explore Our
              <span className="block mt-3 font-semibold bg-linear-to-r from-primary via-gold to-primary bg-clip-text text-transparent">
                Universes
              </span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 text-base sm:text-lg font-sans text-white/60 max-w-2xl mx-auto"
            >
              Each Universe is a complete emotional world — a story that inspires every ring, necklace, earring, and bracelet within it.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 font-serif italic text-gold text-lg"
            >
              Fewer than 10 Universes — ever. Each one rare, intentional, eternal.
            </motion.p>
          </div>
        </section>

        {/* Moment Universes */}
        <section className="py-20 lg:py-28 bg-linear-to-b from-background to-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-12"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-primary/70">Type 1</span>
                <p className="font-display text-2xl lg:text-3xl font-semibold text-foreground">Moment Universes</p>
              </div>
            </motion.div>

            <p className="font-sans text-muted-foreground max-w-2xl mb-12">
              Capturing Sensations — These immortalize physical and emotional sensations, the intimate moments that words can&apos;t capture.
              <span className="block mt-2 font-serif italic text-primary">&ldquo;What did you feel in that moment?&rdquo;</span>
            </p>

            {/* Universe Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {momentUniverses.map((universe, index) => (
                <motion.div
                  key={universe.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/universes/${universe.slug}`} className="group block">
                    <div
                      className="relative p-8 lg:p-10 border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${universe.color}08, transparent)`,
                      }}
                    >
                      {/* Corner Diamonds */}
                      <div
                        className="absolute -top-1.5 -left-1.5 w-3 h-3 rotate-45"
                        style={{ backgroundColor: universe.color }}
                      />
                      <div
                        className="absolute -top-1.5 -right-1.5 w-3 h-3 rotate-45 opacity-60"
                        style={{ backgroundColor: universe.color }}
                      />

                      {/* Content */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div
                            className="w-3 h-3 rounded-full mb-4"
                            style={{ backgroundColor: universe.color }}
                          />
                          <p className="font-display text-2xl lg:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                            {universe.name}
                          </p>
                          <p className="font-serif italic text-muted-foreground mb-4">
                            {universe.tagline}
                          </p>
                          <p className="font-sans text-sm text-muted-foreground line-clamp-2">
                            {universe.description}
                          </p>

                          <div className="mt-6 flex items-center gap-4">
                            <span className="text-sm font-sans text-muted-foreground">
                              {universe.productCount} pieces
                            </span>
                            <span
                              className="inline-flex items-center gap-2 text-sm font-sans font-medium group-hover:gap-3 transition-all"
                              style={{ color: universe.color }}
                            >
                              Explore
                              <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Hover Glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                        style={{ backgroundColor: universe.color }}
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Identity Universes */}
        <section className="py-20 lg:py-28 bg-linear-to-b from-[#1a1512] to-[#0f0d0b]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-12"
            >
              <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                <Heart className="w-6 h-6 text-gold" />
              </div>
              <div>
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-gold/70">Type 2</span>
                <p className="font-display text-2xl lg:text-3xl font-semibold text-white">Identity Universes</p>
              </div>
            </motion.div>

            <p className="font-sans text-white/50 max-w-2xl mb-12">
              Naming the Relationship — These don&apos;t capture a single moment, they name and define the relationship itself.
              <span className="block mt-2 font-serif italic text-gold">&ldquo;What kind of love is this?&rdquo;</span>
            </p>

            {/* Universe Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {identityUniverses.map((universe, index) => (
                <motion.div
                  key={universe.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/universes/${universe.slug}`} className="group block">
                    <div
                      className="relative p-8 lg:p-10 border border-white/10 hover:border-gold/50 bg-white/[0.02] transition-all duration-500 overflow-hidden"
                    >
                      {/* Corner Diamonds */}
                      <div
                        className="absolute -top-1.5 -left-1.5 w-3 h-3 rotate-45"
                        style={{ backgroundColor: universe.color }}
                      />
                      <div
                        className="absolute -top-1.5 -right-1.5 w-3 h-3 rotate-45 opacity-60"
                        style={{ backgroundColor: universe.color }}
                      />

                      {/* Content */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div
                            className="w-3 h-3 rounded-full mb-4"
                            style={{ backgroundColor: universe.color }}
                          />
                          <p className="font-display text-2xl lg:text-3xl font-semibold text-white group-hover:text-gold transition-colors mb-2">
                            {universe.name}
                          </p>
                          <p className="font-serif italic text-white/60 mb-4">
                            {universe.tagline}
                          </p>
                          <p className="font-sans text-sm text-white/40 line-clamp-2">
                            {universe.description}
                          </p>

                          <div className="mt-6 flex items-center gap-4">
                            <span className="text-sm font-sans text-white/40">
                              {universe.productCount} pieces
                            </span>
                            <span className="inline-flex items-center gap-2 text-sm font-sans font-medium text-gold group-hover:gap-3 transition-all">
                              Explore
                              <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Hover Glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"
                        style={{ backgroundColor: universe.color }}
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <LuxuryDiamond className="w-10 h-10 mx-auto mb-6" />
            <p className="font-display text-2xl lg:text-3xl font-semibold text-foreground mb-4">
              Not sure which Universe is yours?
            </p>
            <p className="font-sans text-muted-foreground mb-8">
              Explore our entire collection and let the story find you.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-white font-sans font-medium hover:bg-primary/90 transition-colors"
            >
              <span className="uppercase tracking-wider text-sm">Shop All Pieces</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
