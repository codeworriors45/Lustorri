"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, ArrowLeft, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/useCartStore";
import { getProductById } from "@/lib/data/products";
import { formatPrice } from "@/types/product";
import { cn } from "@/lib/utils";

export default function WishlistPage() {
  const {
    state,
    removeFromWishlist,
    addItem,
    wishlistCount,
  } = useCart();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  const handleAddToCart = (productId: string) => {
    const product = getProductById(productId);
    if (!product || !product.variants[0]) return;

    addItem({
      productId: product.id,
      variantId: product.variants[0].id,
      quantity: 1,
    });
  };

  const handleAddAllToCart = () => {
    state.wishlist.forEach((item) => {
      handleAddToCart(item.productId);
    });
  };

  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <main className="min-h-screen bg-background pt-20 lg:pt-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="animate-pulse">
              <div className="h-10 bg-muted rounded w-48 mb-4" />
              <div className="h-6 bg-muted rounded w-32" />
            </div>
          </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-20 lg:pt-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
            <div>
              <p className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-2">
                My Wishlist
              </p>
              <p className="font-sans text-muted-foreground">
                {wishlistCount} {wishlistCount === 1 ? "item" : "items"} saved for later
              </p>
            </div>
            {state.wishlist.length > 0 && (
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleAddAllToCart}
                  variant="outline"
                  size="default"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add All to Cart
                </Button>
              </div>
            )}
          </div>

          {state.wishlist.length === 0 ? (
            /* Empty Wishlist */
            <div className="text-center py-20">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-8">
                <Heart className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="font-display text-2xl lg:text-3xl font-semibold text-foreground mb-4">
                Your wishlist is empty
              </p>
              <p className="font-sans text-muted-foreground mb-8 max-w-md mx-auto">
                Save pieces you love by clicking the heart icon. They&apos;ll be waiting here for you.
              </p>
              <Button asChild size="lg" rounded="full">
                <Link href="/shop">
                  <ArrowLeft className="w-4 h-4" />
                  Explore Collection
                </Link>
              </Button>
            </div>
          ) : (
            /* Wishlist Content */
            <div className="space-y-8">
              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {state.wishlist.map((wishlistItem, index) => {
                  const product = getProductById(wishlistItem.productId);
                  if (!product) return null;

                  const lowestPrice = Math.min(...product.variants.map((v) => v.price));
                  const comparePrice = product.variants[0]?.comparePrice;
                  const isOnSale = comparePrice && comparePrice > lowestPrice;

                  return (
                    <motion.div
                      key={wishlistItem.productId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative bg-white rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                    >
                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromWishlist(wishlistItem.productId)}
                        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-md"
                        aria-label="Remove from wishlist"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                        {product.isNew && (
                          <span className="px-2 py-0.5 bg-black text-white text-[10px] font-semibold uppercase tracking-wider rounded-full">
                            New
                          </span>
                        )}
                        {product.isBestseller && (
                          <span className="px-2 py-0.5 bg-gold text-black text-[10px] font-semibold uppercase tracking-wider rounded-full">
                            Bestseller
                          </span>
                        )}
                        {isOnSale && (
                          <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-semibold uppercase tracking-wider rounded-full">
                            Sale
                          </span>
                        )}
                      </div>

                      {/* Image */}
                      <Link href={`/product/${product.slug}`} className="block">
                        <div className="relative aspect-square bg-muted/30 overflow-hidden">
                          <Image
                            src={product.images[0]?.url || "/images/placeholder.jpg"}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </Link>

                      {/* Content */}
                      <div className="p-4">
                        {/* Universe Tag */}
                        <div className="flex items-center gap-1.5 mb-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: product.universe.color }}
                          />
                          <span className="text-[10px] font-sans font-medium uppercase tracking-wider text-muted-foreground">
                            {product.universe.name}
                          </span>
                        </div>

                        {/* Product Name */}
                        <Link href={`/product/${product.slug}`}>
                          <p className="font-display text-base font-semibold text-foreground hover:text-primary transition-colors line-clamp-1 mb-1">
                            {product.name}
                          </p>
                        </Link>

                        {/* Subtitle */}
                        <p className="text-xs font-serif italic text-muted-foreground line-clamp-1 mb-2">
                          {product.subtitle}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-1.5 mb-3">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "w-3 h-3",
                                  i < Math.floor(product.rating)
                                    ? "text-gold fill-gold"
                                    : "text-gray-200 fill-gray-200"
                                )}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-muted-foreground">
                            ({product.reviewCount})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-lg font-sans font-bold text-foreground">
                            {formatPrice(lowestPrice)}
                          </span>
                          {isOnSale && comparePrice && (
                            <span className="text-sm font-sans text-muted-foreground line-through">
                              {formatPrice(comparePrice)}
                            </span>
                          )}
                        </div>

                        {/* Add to Cart Button */}
                        <Button
                          onClick={() => handleAddToCart(wishlistItem.productId)}
                          fullWidth
                          size="sm"
                          variant="outline-primary"
                          className="group/btn"
                        >
                          <ShoppingBag className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                          Add to Cart
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Section */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </Link>

                {/* Free Story Card Notice */}
                <div className="flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span className="text-sm font-sans text-foreground">
                    Free engraved story card with every piece
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
    </main>
  );
}
