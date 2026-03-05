"use client";

import { useState, memo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, Eye } from "lucide-react";

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

const blurDataURL = `data:image/svg+xml;base64,${toBase64(shimmer(400, 400))}`;

const products = [
  {
    id: 1,
    name: "Celestial Diamond Ring",
    price: 2499,
    originalPrice: 2999,
    category: "Rings",
    image: "/images/products/diamond-ring-isolated-white-background-3d-render.png",
    isNew: true,
    rating: 4.9,
  },
  {
    id: 2,
    name: "Aurora Pearl Necklace",
    price: 1899,
    originalPrice: null,
    category: "Necklaces",
    image: "/images/products/elegant-rose-gold-necklace-with-vibrant-gemstones.png",
    isNew: false,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Rose Gold Eternity Band",
    price: 1299,
    originalPrice: 1599,
    category: "Rings",
    image: "/images/products/exquisite-3d-gold-rings-diamond-rings-elegant-jewelry-special-occasions.png",
    isNew: true,
    rating: 5.0,
  },
  {
    id: 4,
    name: "Diamond Drop Earrings",
    price: 3299,
    originalPrice: null,
    category: "Earrings",
    image: "/images/products/elegant-blue-sapphire-gold-earrings.png",
    isNew: false,
    rating: 4.7,
  },
  {
    id: 5,
    name: "Golden Charm Bracelet",
    price: 899,
    originalPrice: 1199,
    category: "Bracelets",
    image: "/images/products/gold-jewelry-bracelet-white-background.png",
    isNew: true,
    rating: 4.9,
  },
  {
    id: 6,
    name: "Sapphire Princess Ring",
    price: 4599,
    originalPrice: null,
    category: "Rings",
    image: "/images/products/closeup-shot-two-diamond-rings-white-surface.png",
    isNew: false,
    rating: 4.8,
  },
];

const categories = ["All", "Rings", "Necklaces", "Earrings", "Bracelets"];

export function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-foreground mb-4">
            Bestselling Pieces
          </p>
          <p className="font-sans text-muted-foreground text-lg max-w-2xl mx-auto">
            Our most loved designs, cherished by customers worldwide
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-background text-foreground hover:bg-primary/10 border border-border"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Card className="group cursor-pointer overflow-hidden border border-border/50 bg-card hover:shadow-2xl transition-all duration-500">
                  <CardContent className="p-0">
                    {/* Image Container */}
                    <div className="relative h-72 bg-muted overflow-hidden">
                      {/* Product Image */}
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={blurDataURL}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.isNew && (
                          <Badge className="bg-primary text-primary-foreground">
                            New
                          </Badge>
                        )}
                        {product.originalPrice && (
                          <Badge variant="secondary" className="bg-burgundy text-white">
                            Sale
                          </Badge>
                        )}
                      </div>

                      {/* Quick Actions */}
                      <motion.div
                        className="absolute top-4 right-4 flex flex-col gap-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{
                          opacity: hoveredId === product.id ? 1 : 0,
                          x: hoveredId === product.id ? 0 : 20,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 rounded-full bg-background/90 flex items-center justify-center shadow-md hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Heart className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 rounded-full bg-background/90 flex items-center justify-center shadow-md hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Eye className="w-5 h-5" />
                        </motion.button>
                      </motion.div>

                      {/* Add to Cart Button */}
                      <motion.div
                        className="absolute bottom-4 left-4 right-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: hoveredId === product.id ? 1 : 0,
                          y: hoveredId === product.id ? 0 : 20,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Button className="w-full bg-foreground text-background hover:bg-foreground/90 gap-2">
                          <ShoppingBag className="w-4 h-4" />
                          Add to Cart
                        </Button>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <p className="card-label text-muted-foreground mb-1">
                        {product.category}
                      </p>
                      <p className="card-title text-foreground mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "text-gold fill-gold"
                                : "text-muted-foreground"
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">
                          ({product.rating})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="card-price-lg text-foreground">
                          ${product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="card-meta text-muted-foreground line-through">
                            ${product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              size="lg"
              className="px-8 rounded-full border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              View All Products
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
