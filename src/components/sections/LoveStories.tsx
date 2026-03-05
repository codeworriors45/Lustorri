"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { LuxuryDiamond } from "@/components/common/LuxuryDiamond";

const stories = [
  {
    id: "pulse-story",
    universe: "The Pulse",
    universeType: "Moment",
    quote: "His fingers brushed mine reaching for the same book. That pulse — I still feel it every time he holds my hand.",
    couple: "Aria & James",
    location: "Brooklyn, NY",
  },
  {
    id: "eclipse-story",
    universe: "The Eclipse",
    universeType: "Identity",
    quote: "She was chaos. I was order. Together, we became something the world had never seen.",
    couple: "Maya & Daniel",
    location: "Austin, TX",
  },
  {
    id: "ember-story",
    universe: "The Ember",
    universeType: "Identity",
    quote: "15 years later, he still looks at me like it's our first date. Some fires just burn quieter.",
    couple: "Sofia & Marcus",
    location: "Seattle, WA",
  },
];

export function LoveStories() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-44 bg-linear-to-b from-[#1a1512] via-[#141110] to-[#1a1512] overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-primary/5 blur-[200px] rounded-full" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-gold/5 blur-[180px] rounded-full" />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32">
        <div className="absolute top-6 left-6 w-16 h-[1px] bg-linear-to-r from-gold/60 to-transparent" />
        <div className="absolute top-6 left-6 w-[1px] h-16 bg-linear-to-b from-gold/60 to-transparent" />
      </div>
      <div className="absolute top-0 right-0 w-32 h-32">
        <div className="absolute top-6 right-6 w-16 h-[1px] bg-linear-to-l from-gold/60 to-transparent" />
        <div className="absolute top-6 right-6 w-[1px] h-16 bg-linear-to-b from-gold/60 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32">
        <div className="absolute bottom-6 left-6 w-16 h-[1px] bg-linear-to-r from-gold/60 to-transparent" />
        <div className="absolute bottom-6 left-6 w-[1px] h-16 bg-linear-to-t from-gold/60 to-transparent" />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32">
        <div className="absolute bottom-6 right-6 w-16 h-[1px] bg-linear-to-l from-gold/60 to-transparent" />
        <div className="absolute bottom-6 right-6 w-[1px] h-16 bg-linear-to-t from-gold/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <LuxuryDiamond className="w-10 h-10 mx-auto" />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-4 text-[11px] font-sans font-semibold uppercase tracking-[0.35em] text-gold"
          >
            <span className="w-10 h-[1px] bg-linear-to-r from-transparent to-gold" />
            Real Love Stories
            <span className="w-10 h-[1px] bg-linear-to-l from-transparent to-gold" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-display font-light text-white tracking-tight"
          >
            Stories That
            <span className="block mt-3 font-semibold bg-linear-to-r from-gold via-[#E8D5B7] to-gold bg-clip-text text-transparent">
              Inspired Us
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 text-base font-sans text-white/50 max-w-lg mx-auto leading-relaxed"
          >
            Every Lustorri piece begins with a real story. These are the moments,
            the confessions, the touches that inspired our Universes.
          </motion.p>

          {/* Featured Quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 max-w-xl mx-auto"
          >
            <Quote className="w-8 h-8 text-gold/30 mx-auto mb-4" />
            <blockquote className="font-serif italic text-lg text-white/60 leading-relaxed">
              &ldquo;We design for couples who feel deeply — and aren&apos;t afraid to show it.&rdquo;
            </blockquote>
          </motion.div>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.15 }}
              className="group"
            >
              <div className="relative p-8 bg-white/[0.03] border border-white/10 hover:border-gold/30 hover:bg-white/[0.05] transition-all duration-500 h-full">
                {/* Corner Diamonds */}
                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 rotate-45 bg-linear-to-br from-gold to-gold/60" />
                <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rotate-45 bg-linear-to-bl from-gold to-gold/60" />
                <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 rotate-45 bg-linear-to-tr from-gold to-gold/60" />
                <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 rotate-45 bg-linear-to-tl from-gold to-gold/60" />

                {/* Universe Badge */}
                <div className="flex items-center gap-2 mb-6">
                  <span
                    className={`px-3 py-1.5 text-[10px] font-sans font-semibold uppercase tracking-wider ${
                      story.universeType === "Moment"
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "bg-gold/20 text-gold border border-gold/30"
                    }`}
                  >
                    {story.universeType}
                  </span>
                  <span className="px-3 py-1.5 bg-white/10 text-white/80 text-[10px] font-sans font-medium uppercase tracking-wider">
                    {story.universe}
                  </span>
                </div>

                {/* Quote */}
                <div className="mb-8">
                  <div className="w-1 h-1 rotate-45 bg-gold/60 mb-4" />
                  <p className="font-serif italic text-white/80 text-base leading-relaxed">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </div>

                {/* Couple Info */}
                <div className="pt-6 border-t border-white/10">
                  <p className="font-display font-medium text-white text-sm">
                    {story.couple}
                  </p>
                  <p className="font-sans text-white/40 text-xs mt-1">
                    {story.location}
                  </p>
                </div>

                {/* Hover Line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-20"
        >
          <p className="font-serif italic text-white/40 text-lg mb-8">
            Every love story deserves to be told. What&apos;s yours?
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/stories"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-linear-to-r from-gold via-[#D4B978] to-gold text-[#1a1512] font-sans font-semibold shadow-xl hover:shadow-[0_0_30px_rgba(196,169,104,0.4)] transition-all duration-500"
            >
              <span className="uppercase tracking-wider text-sm">Read All Stories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <Link
              href="/submit-story"
              className="group inline-flex items-center gap-3 px-10 py-4 border border-gold/40 hover:border-gold text-gold font-sans font-medium hover:bg-gold/10 transition-all duration-500"
            >
              <span className="uppercase tracking-wider text-sm">Share Your Story</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
