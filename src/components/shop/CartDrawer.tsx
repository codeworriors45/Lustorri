"use client";

import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/useCartStore";
import { getProductById } from "@/lib/data/products";
import { formatPrice, getMetalDisplayName } from "@/types/product";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const {
    state,
    toggleCart,
    removeItem,
    updateQuantity,
    cartTotal,
    cartCount,
  } = useCart();

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleCart(false)}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-background z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <p className="font-display text-lg font-medium text-foreground">
                  Your Bag ({cartCount})
                </p>
              </div>
              <button
                onClick={() => toggleCart(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                    <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="font-display text-xl text-foreground mb-2">
                    Your bag is empty
                  </p>
                  <p className="font-sans text-muted-foreground mb-6">
                    Discover pieces that tell your story
                  </p>
                  <Button onClick={() => toggleCart(false)} rounded="full">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="px-6 py-4 space-y-6">
                  {state.items.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;

                    const variant = product.variants.find((v) => v.id === item.variantId);
                    if (!variant) return null;

                    return (
                      <motion.div
                        key={`${item.productId}-${item.variantId}`}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="flex gap-4"
                      >
                        {/* Image */}
                        <Link
                          href={`/product/${product.slug}`}
                          onClick={() => toggleCart(false)}
                          className="relative w-24 h-24 shrink-0 bg-muted"
                        >
                          <Image
                            src={product.images[0]?.url || "/images/placeholder.jpg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </Link>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/product/${product.slug}`}
                            onClick={() => toggleCart(false)}
                            className="block"
                          >
                            <p className="font-display font-medium text-foreground truncate hover:text-primary transition-colors">
                              {product.name}
                            </p>
                          </Link>
                          <p className="text-sm font-sans text-muted-foreground mb-1">
                            {getMetalDisplayName(variant.metal)}
                          </p>

                          {/* Engraving */}
                          {item.engraving && (
                            <div className="flex items-center gap-1 text-xs text-gold mb-2">
                              <Sparkles className="w-3 h-3" />
                              <span className="truncate">&ldquo;{item.engraving}&rdquo;</span>
                            </div>
                          )}

                          {/* Price & Quantity */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-border">
                              <button
                                onClick={() =>
                                  updateQuantity(item.productId, item.variantId, item.quantity - 1)
                                }
                                className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-sm font-sans">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.productId, item.variantId, item.quantity + 1)
                                }
                                className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="font-sans font-semibold text-foreground">
                              {formatPrice(variant.price * item.quantity)}
                            </span>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.productId, item.variantId)}
                          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t border-border px-6 py-6 space-y-4 bg-background">
                {/* Free Story Card Notice */}
                <div className="flex items-center gap-3 p-3 bg-gold/10 border border-gold/20 rounded">
                  <Sparkles className="w-5 h-5 text-gold shrink-0" />
                  <p className="text-sm font-sans text-foreground">
                    Free metal engraved story card with each piece
                  </p>
                </div>

                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="font-sans text-muted-foreground">Subtotal</span>
                  <span className="font-sans text-xl font-semibold text-foreground">
                    {formatPrice(cartTotal)}
                  </span>
                </div>

                <p className="text-xs font-sans text-muted-foreground text-center">
                  Shipping & taxes calculated at checkout
                </p>

                {/* Actions */}
                <div className="space-y-3">
                  <Button asChild variant="outline" size="lg" fullWidth rounded="none">
                    <Link href="/cart" onClick={() => toggleCart(false)}>
                      View Cart
                    </Link>
                  </Button>
                  <Button asChild size="lg" fullWidth rounded="none">
                    <Link href="/checkout" onClick={() => toggleCart(false)}>
                      Checkout
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
