"use client";

import { useState, memo, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star, Eye } from "lucide-react";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils/formatting";
import { useCart } from "@/store/useCartStore";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import { DEFAULT_BLUR_DATA_URL } from "@/lib/utils/image";
import gsap from "gsap";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = memo(function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem } = useCart();
  const { isInWishlist: inWishlist, toggleWishlist } = useWishlist(product.id);

  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lowestPrice = Math.min(...product.variants.map((v) => v.price));
  const comparePrice = product.variants[0]?.comparePrice;
  const isOnSale = comparePrice && comparePrice > lowestPrice;
  const discount = isOnSale ? Math.round(((comparePrice - lowestPrice) / comparePrice) * 100) : 0;


  // GSAP animations
  useEffect(() => {
    if (!cardRef.current) return;

    // Initial reveal animation
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.08,
        ease: "power3.out",
      }
    );
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height;

    // GSAP shine effect
    if (shineRef.current) {
      const xPos = ((e.clientX - rect.left) / rect.width) * 100;
      const yPos = ((e.clientY - rect.top) / rect.height) * 100;
      gsap.to(shineRef.current, {
        background: `radial-gradient(circle at ${xPos}% ${yPos}%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
        duration: 0.3,
      });
    }

    // GSAP parallax image
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: mouseX * 15,
        y: mouseY * 15,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);

    // GSAP content animation
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        y: -4,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);

    // Reset animations
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    if (shineRef.current) {
      gsap.to(shineRef.current, {
        background: "transparent",
        duration: 0.3,
      });
    }

    if (contentRef.current) {
      gsap.to(contentRef.current, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // GSAP button click animation
    const button = e.currentTarget;
    gsap.timeline()
      .to(button, { scale: 0.95, duration: 0.1 })
      .to(button, { scale: 1, duration: 0.2, ease: "back.out(2)" });

    addItem({
      productId: product.id,
      variantId: product.variants[0].id,
      quantity: 1,
    });
  };

  const handleWishlistToggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // GSAP heart animation
    const heart = e.currentTarget as HTMLElement;
    gsap.timeline()
      .to(heart, { scale: 1.3, duration: 0.15 })
      .to(heart, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" });

    toggleWishlist();
  }, [toggleWishlist]);

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group"
    >
      <div className={cn(
        "relative bg-white rounded-xl sm:rounded-2xl overflow-hidden transition-shadow duration-500",
        "shadow-[0_2px_10px_rgba(0,0,0,0.06)] sm:shadow-[0_4px_20px_rgba(0,0,0,0.06)]",
        isHovered && "shadow-[0_10px_30px_rgba(196,169,104,0.15)] sm:shadow-[0_20px_50px_rgba(196,169,104,0.2)]"
      )}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#fafafa] to-[#f5f5f5]">
          {/* Shine Effect Overlay */}
          <div
            ref={shineRef}
            className="absolute inset-0 z-30 pointer-events-none"
          />

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 + 0.2, duration: 0.4 }}
            className="absolute top-2 sm:top-3 left-2 sm:left-3 z-20 flex flex-wrap gap-1 sm:gap-1.5"
          >
            {product.isNew && (
              <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-black text-white text-[7px] sm:text-[8px] font-semibold uppercase tracking-wider rounded-full">
                New
              </span>
            )}
            {product.isBestseller && (
              <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-gradient-to-r from-gold to-amber-400 text-black text-[7px] sm:text-[8px] font-semibold uppercase tracking-wider rounded-full">
                Best
              </span>
            )}
            {isOnSale && (
              <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-primary text-white text-[7px] sm:text-[8px] font-semibold uppercase tracking-wider rounded-full">
                -{discount}%
              </span>
            )}
          </motion.div>

          {/* Wishlist Button */}
          <motion.button
            onClick={handleWishlistToggle}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 + 0.3, duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            className={cn(
              "absolute top-2 sm:top-3 right-2 sm:right-3 z-20 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-colors duration-300",
              inWishlist
                ? "bg-primary text-white"
                : "bg-white/90 backdrop-blur-sm text-gray-500 hover:bg-primary hover:text-white shadow-lg"
            )}
          >
            <motion.div
              key={inWishlist ? "filled" : "empty"}
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 15
              }}
            >
              <Heart className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4", inWishlist && "fill-current")} />
            </motion.div>
          </motion.button>

          {/* Product Image with Parallax */}
          <Link href={`/product/${product.slug}`} className="block w-full h-full">
            <div ref={imageRef} className="relative w-full h-full p-4 sm:p-6 md:p-8">
              <motion.div
                animate={{ scale: isHovered ? 1.08 : 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative w-full h-full"
              >
                <Image
                  src={product.images[currentImageIndex]?.url || "/images/products/jewelry-isolated.png"}
                  alt={product.name}
                  fill
                  className="object-contain drop-shadow-lg"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={DEFAULT_BLUR_DATA_URL}
                />
              </motion.div>
            </div>
          </Link>

          {/* Image Dots */}
          {product.images.length > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-2"
            >
              {product.images.slice(0, 4).map((_, idx) => (
                <button
                  key={idx}
                  onMouseEnter={() => setCurrentImageIndex(idx)}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImageIndex(idx);
                  }}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    currentImageIndex === idx
                      ? "w-6 bg-gold"
                      : "w-1.5 bg-black/20 hover:bg-black/40"
                  )}
                />
              ))}
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 z-20 flex gap-1.5 sm:gap-2"
          >
            <button
              onClick={handleAddToCart}
              className="flex-1 py-2 sm:py-2.5 bg-primary text-white text-[10px] sm:text-xs font-medium rounded-full flex items-center justify-center gap-1 sm:gap-2 hover:bg-primary/90 transition-colors duration-300"
            >
              <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden xs:inline">Add to Cart</span>
              <span className="xs:hidden">Add</span>
            </button>
            <Link
              href={`/product/${product.slug}`}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-gold hover:text-black transition-colors duration-300 shadow-lg shrink-0"
            >
              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Product Info */}
        <div ref={contentRef} className="p-2.5 sm:p-4">
          <Link href={`/product/${product.slug}`} className="block">
            {/* Universe Tag */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.08 + 0.4 }}
              className="text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gold mb-1 sm:mb-2"
            >
              {product.universe.name}
            </motion.p>

            {/* Product Name */}
            <p className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1 mb-1 sm:mb-2">
              {product.name}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 sm:gap-1.5 mb-2 sm:mb-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-2.5 h-2.5 sm:w-3 sm:h-3",
                      i < Math.floor(product.rating)
                        ? "text-gold fill-gold"
                        : "text-gray-200 fill-gray-200"
                    )}
                  />
                ))}
              </div>
              <span className="text-[9px] sm:text-[10px] text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-1 sm:gap-2">
              <span className="text-sm sm:text-lg font-sans font-bold text-foreground">
                {formatPrice(lowestPrice)}
              </span>
              {isOnSale && (
                <span className="text-[10px] sm:text-xs font-sans text-muted-foreground line-through">
                  {formatPrice(comparePrice)}
                </span>
              )}
            </div>
          </Link>
        </div>

      </div>
    </article>
  );
});

ProductCard.displayName = "ProductCard";
