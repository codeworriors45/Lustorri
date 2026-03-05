"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

// Shimmer placeholder for blur effect
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="0%" />
      <stop stop-color="#edeef1" offset="20%" />
      <stop stop-color="#f6f7f8" offset="40%" />
      <stop stop-color="#f6f7f8" offset="100%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str);

const blurDataURL = `data:image/svg+xml;base64,${toBase64(shimmer(400, 500))}`;

const collections = [
  {
    id: 1,
    name: "Diamond Dreams",
    description: "Exquisite diamond pieces that capture light and hearts",
    image: "/images/products/diamond-ring-isolated-white-background-3d-render.png",
    tag: "Bestseller",
    bgColor: "from-gold-light/50 to-champagne/50",
  },
  {
    id: 2,
    name: "Golden Heritage",
    description: "Timeless gold designs inspired by royal traditions",
    image: "/images/products/precious-necklace-decorated-with-gemstones-lights-isolated.png",
    tag: "New",
    bgColor: "from-rose-gold-light/50 to-rose-gold/20",
  },
  {
    id: 3,
    name: "Pearl Elegance",
    description: "Sophisticated pearls for the modern woman",
    image: "/images/products/rainbow-teardrop-earrings-dazzling-gemstone-jewelry.png",
    tag: "Limited",
    bgColor: "from-platinum/30 to-muted/50",
  },
  {
    id: 4,
    name: "Rose Romance",
    description: "Delicate rose gold pieces for everyday luxury",
    image: "/images/products/rose-gold-pyramid-stud-bracelet.png",
    tag: "Trending",
    bgColor: "from-champagne/50 to-gold-light/30",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export function FeaturedCollections() {
  return (
    <section className="py-24 bg-linear-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-foreground mb-4">
            Featured Collections
          </p>
          <p className="font-sans text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our carefully curated collections, each piece designed to make you shine
          </p>
        </motion.div>

        {/* Collections Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {collections.map((collection) => (
            <motion.div key={collection.id} variants={itemVariants}>
              <Card className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-card">
                <CardContent className="p-0">
                  {/* Image Container */}
                  <div className="relative h-80 overflow-hidden">
                    {/* Actual Image */}
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={blurDataURL}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Badge */}
                    <Badge
                      className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 z-10"
                    >
                      {collection.tag}
                    </Badge>

                    {/* Hover Arrow */}
                    <motion.div
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowUpRight className="w-5 h-5 text-foreground" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="card-label text-primary mb-2">
                      Collection
                    </p>
                    <p className="card-title-md text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {collection.name}
                    </p>
                    <p className="card-description text-muted-foreground">
                      {collection.description}
                    </p>

                    {/* Animated Underline */}
                    <motion.div
                      className="mt-4 h-0.5 bg-linear-to-r from-gold to-rose-gold origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
