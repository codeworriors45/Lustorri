"use client";

import type { ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trash2, ShoppingBag, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/shop/QuantitySelector";
import { TrustBadges } from "@/components/common/TrustBadges";
import { FormTextarea } from "@/components/forms";
import { useCart } from "@/store/useCartStore";
import { getProductById } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils/formatting";
import { getMetalDisplayName } from "@/types/product";

export default function CartPage() {
  const {
    state,
    removeItem,
    updateQuantity,
    updateEngraving,
    clearCart,
    cartTotal,
    cartCount,
  } = useCart();

  const shippingCost = cartTotal >= 500 ? 0 : 25;
  const total = cartTotal + shippingCost;

  return (
    <main className="min-h-screen bg-background pt-20 lg:pt-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-2">
                Shopping Bag
              </p>
              <p className="font-sans text-muted-foreground">
                {cartCount} {cartCount === 1 ? "item" : "items"} in your bag
              </p>
            </div>
            {state.items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-sm font-sans text-muted-foreground hover:text-primary transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          {state.items.length === 0 ? (
            /* Empty Cart */
            <div className="text-center py-20">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-8">
                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="h2 text-foreground mb-4">
                Your bag is empty
              </p>
              <p className="font-sans text-muted-foreground mb-8 max-w-md mx-auto">
                Discover pieces that tell your story. Each piece comes with a free metal engraved story card.
              </p>
              <Button asChild size="xl">
                <Link href="/shop">
                  <ArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          ) : (
            /* Cart Content */
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {state.items.map((item, index) => {
                  const product = getProductById(item.productId);
                  if (!product) return null;

                  const variant = product.variants.find((v) => v.id === item.variantId);
                  if (!variant) return null;

                  return (
                    <motion.div
                      key={`${item.productId}-${item.variantId}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-6 p-6 border border-border"
                    >
                      {/* Image */}
                      <Link
                        href={`/product/${product.slug}`}
                        className="relative w-32 h-32 shrink-0 bg-muted"
                      >
                        <Image
                          src={product.images[0]?.url || "/images/placeholder.jpg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <Link href={`/product/${product.slug}`}>
                              <p className="font-display text-xl font-semibold text-foreground hover:text-primary transition-colors">
                                {product.name}
                              </p>
                            </Link>
                            <p className="text-sm font-serif italic text-muted-foreground">
                              {product.subtitle}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.productId, item.variantId)}
                            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Variant Info */}
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: product.universe.color }}
                          />
                          <span className="text-xs font-sans text-muted-foreground">
                            {product.universe.name}
                          </span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-xs font-sans text-muted-foreground">
                            {getMetalDisplayName(variant.metal)}
                          </span>
                        </div>

                        {/* Engraving */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-gold" />
                            <span className="text-sm font-sans font-medium text-foreground">
                              Story Card Engraving
                            </span>
                          </div>
                          <FormTextarea
                            value={item.engraving || ""}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                              updateEngraving(
                                item.productId,
                                item.variantId,
                                e.target.value.slice(0, 150)
                              )
                            }
                            placeholder="Add your personal message (free)"
                            maxLength={150}
                            showCount
                            className="bg-muted/30 font-serif h-20"
                          />
                        </div>

                        {/* Quantity & Price */}
                        <div className="flex items-center justify-between">
                          <QuantitySelector
                            quantity={item.quantity}
                            onQuantityChange={(newQty) =>
                              updateQuantity(item.productId, item.variantId, newQty)
                            }
                            min={1}
                            max={10}
                          />

                          <span className="font-sans text-xl font-semibold text-foreground">
                            {formatPrice(variant.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Continue Shopping */}
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 p-8 border border-border bg-muted/20">
                  <p className="text-xl lg:text-2xl font-display font-semibold text-foreground mb-6">
                    Order Summary
                  </p>

                  {/* Summary Lines */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between font-sans">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex items-center justify-between font-sans">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-foreground">
                        {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                      </span>
                    </div>
                    {shippingCost > 0 && (
                      <p className="text-xs font-sans text-gold">
                        Add {formatPrice(500 - cartTotal)} more for free shipping
                      </p>
                    )}
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="font-sans font-medium text-foreground">Total</span>
                        <span className="font-sans text-2xl font-semibold text-foreground">
                          {formatPrice(total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Free Story Card */}
                  <div className="flex items-center gap-3 p-4 bg-gold/10 border border-gold/20 mb-6">
                    <Sparkles className="w-5 h-5 text-gold shrink-0" />
                    <p className="text-sm font-sans text-foreground">
                      {cartCount} free metal engraved story {cartCount === 1 ? "card" : "cards"} included
                    </p>
                  </div>

                  {/* Checkout Button */}
                  <Button asChild size="lg" fullWidth uppercase className="mb-6">
                    <Link href="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>

                  {/* Trust Badges */}
                  <TrustBadges
                    variant="compact"
                    badges={["shipping", "warranty", "returns"]}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
    </main>
  );
}
