"use client";

import { memo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { DEFAULT_BLUR_DATA_URL } from "@/lib/utils/image";
import { formatPrice, calculateDiscount } from "@/lib/utils/formatting";
import { scrollFadeInUp, buttonAnimation } from "@/lib/animations/variants";

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  href: string;
  badge?: string;
  universe?: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

export const ProductCard = memo(function ProductCard({
  name,
  price,
  originalPrice,
  image,
  href,
  badge,
  universe,
  isNew,
  isBestseller,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const discount = originalPrice ? calculateDiscount(originalPrice, price) : null;

  return (
    <Link
      href={href}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        {...scrollFadeInUp}
        className="relative bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(196,169,104,0.15)] border border-[#f0ebe3] hover:border-gold/30 transition-all duration-500"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-[#faf8f5] to-[#f5f0e8]">
          {/* Badges */}
          <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
            {isNew && (
              <span className="px-2 py-0.5 bg-primary/90 backdrop-blur-sm text-white text-[8px] font-medium uppercase tracking-wider rounded-full">
                New
              </span>
            )}
            {isBestseller && (
              <span className="px-2 py-0.5 bg-gradient-to-r from-gold to-[#d4b978] text-[#1a1512] text-[8px] font-medium uppercase tracking-wider rounded-full">
                Bestseller
              </span>
            )}
            {badge && (
              <span className="px-2 py-0.5 bg-rose-gold/90 backdrop-blur-sm text-white text-[8px] font-medium uppercase tracking-wider rounded-full">
                {badge}
              </span>
            )}
            {discount && (
              <span className="px-2 py-0.5 bg-primary/90 backdrop-blur-sm text-white text-[8px] font-medium uppercase tracking-wider rounded-full">
                {discount}% Off
              </span>
            )}
          </div>

          {/* Universe Tag */}
          {universe && (
            <span className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-mocha-brown text-[10px] font-medium uppercase tracking-wider shadow-lg shadow-black/5">
              {universe}
            </span>
          )}

          {/* Product Image */}
          <motion.div
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full h-full"
          >
            <Image
              src={image}
              alt={name}
              fill
              className={`object-contain p-6 transition-opacity duration-500 ${isImageLoaded ? "opacity-100" : "opacity-0"
                }`}
              loading="lazy"
              placeholder="blur"
              blurDataURL={DEFAULT_BLUR_DATA_URL}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              onLoad={() => setIsImageLoaded(true)}
            />
          </motion.div>

          {/* Subtle Glow on Hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-gradient-to-t from-gold/5 via-transparent to-transparent pointer-events-none"
          />

          {/* Hover Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 right-4 flex gap-2 z-10"
          >
            <motion.button
              {...buttonAnimation}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-mocha-brown text-ivory-white font-medium text-sm tracking-wide hover:bg-primary transition-colors duration-300 shadow-lg shadow-mocha-brown/20"
              onClick={(e) => {
                e.preventDefault();
                // Add to cart logic
              }}
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Bag
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-black/5 hover:bg-primary hover:text-white transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                // Add to wishlist logic
              }}
            >
              <Heart className="w-4 h-4 text-mocha-brown group-hover:text-current" />
            </motion.button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Name */}
          <p className="font-display text-lg font-semibold text-mocha-brown mb-1 group-hover:text-primary transition-colors duration-300 line-clamp-1">
            {name}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-sans text-xl font-semibold text-mocha-brown">
              {formatPrice(price)}
            </span>
            {originalPrice && (
              <span className="font-sans text-sm text-muted-foreground/60 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          {/* Gold Accent Line */}
          <div className="h-px bg-gradient-to-r from-gold/40 via-gold/20 to-transparent" />
        </div>
      </motion.div>
    </Link>
  );
});

ProductCard.displayName = "ProductCard";
