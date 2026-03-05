"use client";

import { useState, useEffect, useCallback } from "react";
import type { ChangeEvent } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Share2,
  Star,
  Check,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/shop";
import { LuxuryDiamond } from "@/components/common/LuxuryDiamond";
import { TrustBadges } from "@/components/common/TrustBadges";
import { QuantitySelector } from "@/components/shop/QuantitySelector";
import { FormTextarea } from "@/components/forms";
import { getProductBySlug, getProductsByUniverse } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils/formatting";
import { DEFAULT_BLUR_DATA_URL } from "@/lib/utils/image";
import { getMetalDisplayName, type ProductVariant } from "@/types/product";
import { useCart } from "@/store/useCartStore";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import { iconSpringAnimation, buttonAnimation } from "@/lib/animations/variants";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [engraving, setEngraving] = useState("");
  const [showEngravingInput, setShowEngravingInput] = useState(false);

  const { addItem } = useCart();
  const { isInWishlist: inWishlist, toggleWishlist } = useWishlist(product?.id);

  useEffect(() => {
    if (product && product.variants.length > 0) {
      setSelectedVariant(product.variants.find((v) => v.inStock) || product.variants[0]);
    }
  }, [product]);

  const handleAddToCart = useCallback(() => {
    if (!selectedVariant || !product) return;
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      quantity,
      engraving: engraving || undefined,
    });
  }, [selectedVariant, product, quantity, engraving, addItem]);

  const handleEngravingChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setEngraving(e.target.value.slice(0, 150));
  }, []);

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-20 lg:pt-30 flex items-center justify-center">
          <div className="text-center">
            <LuxuryDiamond id="pdp-empty" className="w-16 h-16 mx-auto mb-6 opacity-30" />
            <p className="h1 text-foreground mb-4">Product not found</p>
            <Link href="/shop" className="text-primary hover:underline">
              Return to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const relatedProducts = getProductsByUniverse(product.universeId)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20 lg:pt-30">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm font-sans text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/universes/${product.universe.slug}`} className="hover:text-foreground transition-colors">
              {product.universe.name}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        {/* Product Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <motion.div
                key={selectedImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-square bg-muted/30 overflow-hidden"
              >
                <Image
                  src={product.images[selectedImageIndex]?.url || "/images/products/jewelry-isolated.png"}
                  alt={product.images[selectedImageIndex]?.alt || product.name}
                  fill
                  className="object-cover"
                  priority
                  placeholder="blur"
                  blurDataURL={DEFAULT_BLUR_DATA_URL}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="px-3 py-1 bg-primary text-white text-xs font-sans font-semibold uppercase tracking-wider">
                      New
                    </span>
                  )}
                  {product.isBestseller && (
                    <span className="px-3 py-1 bg-gold text-[#1a1512] text-xs font-sans font-semibold uppercase tracking-wider">
                      Bestseller
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <motion.button
                    onClick={toggleWishlist}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                      inWishlist
                        ? "bg-primary text-white"
                        : "bg-white/90 text-foreground hover:bg-primary hover:text-white"
                    )}
                  >
                    <motion.div
                      key={inWishlist ? "filled" : "empty"}
                      {...iconSpringAnimation}
                    >
                      <Heart className={cn("w-5 h-5", inWishlist && "fill-current")} />
                    </motion.div>
                  </motion.button>
                  <button className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-foreground hover:bg-muted transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      "relative w-20 h-20 shrink-0 border-2 transition-all",
                      selectedImageIndex === index
                        ? "border-primary"
                        : "border-transparent hover:border-muted-foreground/30"
                    )}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={DEFAULT_BLUR_DATA_URL}
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              {/* Universe Tag */}
              <Link
                href={`/universes/${product.universe.slug}`}
                className="inline-flex items-center gap-2 mb-4 group"
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: product.universe.color }}
                />
                <span className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
                  {product.universe.name} Universe
                </span>
              </Link>

              {/* Title */}
              <p className="font-display text-3xl lg:text-5xl font-semibold text-foreground mb-2">
                {product.name}
              </p>
              <p className="font-serif italic text-lg text-muted-foreground mb-4">
                {product.subtitle}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-5 h-5",
                        i < Math.floor(product.rating) ? "text-gold fill-gold" : "text-muted-foreground/30"
                      )}
                    />
                  ))}
                </div>
                <span className="font-sans text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              {selectedVariant && (
                <div className="flex items-center gap-4 mb-8">
                  <span className="font-sans text-3xl font-semibold text-foreground">
                    {formatPrice(selectedVariant.price)}
                  </span>
                  {selectedVariant.comparePrice && (
                    <span className="font-sans text-lg text-muted-foreground line-through">
                      {formatPrice(selectedVariant.comparePrice)}
                    </span>
                  )}
                </div>
              )}

              {/* Metal Selection */}
              <div className="mb-8">
                <label className="block text-sm font-sans font-medium uppercase tracking-wider text-foreground mb-3">
                  Metal: {selectedVariant && getMetalDisplayName(selectedVariant.metal)}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      disabled={!variant.inStock}
                      className={cn(
                        "px-4 py-3 border font-sans text-sm transition-all",
                        selectedVariant?.id === variant.id
                          ? "border-primary bg-primary/5 text-primary"
                          : variant.inStock
                            ? "border-border hover:border-primary text-foreground"
                            : "border-border/50 text-muted-foreground opacity-50 cursor-not-allowed"
                      )}
                    >
                      {getMetalDisplayName(variant.metal)}
                      {!variant.inStock && " (Out of Stock)"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-sm font-sans font-medium uppercase tracking-wider text-foreground mb-3">
                  Quantity
                </label>
                <QuantitySelector
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                  min={1}
                  max={10}
                  size="lg"
                />
              </div>

              {/* Story Card Engraving */}
              <div className="mb-8 p-6 bg-gold/5 border border-gold/20">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-5 h-5 text-gold" />
                  <span className="font-sans font-semibold text-foreground">
                    Free Metal Engraved Story Card
                  </span>
                </div>
                <p className="text-sm font-sans text-muted-foreground mb-4">
                  Add your personal message to be engraved on a metal story card — included free with your purchase.
                </p>
                {!showEngravingInput ? (
                  <button
                    onClick={() => setShowEngravingInput(true)}
                    className="text-sm font-sans text-primary hover:underline"
                  >
                    + Add your story
                  </button>
                ) : (
                  <FormTextarea
                    value={engraving}
                    onChange={handleEngravingChange}
                    placeholder="Write your message (max 150 characters)"
                    maxLength={150}
                    showCount
                    className="font-serif"
                  />
                )}
              </div>

              {/* Add to Cart */}
              <div className="flex gap-4 mb-8">
                <motion.button
                  onClick={handleAddToCart}
                  disabled={!selectedVariant?.inStock}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-3 py-4 font-sans font-semibold text-base uppercase tracking-wider transition-all",
                    selectedVariant?.inStock
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  )}
                >
                  <ShoppingBag className="w-5 h-5" />
                  {selectedVariant?.inStock ? "Add to Bag" : "Out of Stock"}
                </motion.button>
              </div>

              {/* Trust Badges */}
              <TrustBadges
                variant="compact"
                badges={["shipping", "warranty", "returns"]}
                className="py-6 border-t border-b border-border"
              />

              {/* Description */}
              <div className="mt-8">
                <p className="h3 font-medium text-foreground mb-4">About This Piece</p>
                <p className="font-sans text-muted-foreground leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Story Card Preview */}
                <div className="p-6 bg-[#1a1512] text-white mb-6">
                  <p className="text-xs font-sans uppercase tracking-wider text-gold/70 mb-3">
                    Story Card Message
                  </p>
                  <p className="font-serif italic text-white/80 leading-relaxed">
                    &ldquo;{product.storyCard}&rdquo;
                  </p>
                </div>

                {/* Diamond Specs */}
                <div className="grid grid-cols-2 gap-4 p-6 bg-muted/30">
                  <div>
                    <span className="text-xs font-sans uppercase tracking-wider text-muted-foreground">Shape</span>
                    <p className="font-sans font-medium text-foreground capitalize">{product.diamond.shape}</p>
                  </div>
                  <div>
                    <span className="text-xs font-sans uppercase tracking-wider text-muted-foreground">Carat</span>
                    <p className="font-sans font-medium text-foreground">{product.diamond.carat} ct</p>
                  </div>
                  <div>
                    <span className="text-xs font-sans uppercase tracking-wider text-muted-foreground">Color</span>
                    <p className="font-sans font-medium text-foreground">{product.diamond.color}</p>
                  </div>
                  <div>
                    <span className="text-xs font-sans uppercase tracking-wider text-muted-foreground">Clarity</span>
                    <p className="font-sans font-medium text-foreground">{product.diamond.clarity}</p>
                  </div>
                  <div>
                    <span className="text-xs font-sans uppercase tracking-wider text-muted-foreground">Cut</span>
                    <p className="font-sans font-medium text-foreground">{product.diamond.cut}</p>
                  </div>
                  <div>
                    <span className="text-xs font-sans uppercase tracking-wider text-muted-foreground">Certification</span>
                    <p className="font-sans font-medium text-foreground">{product.diamond.certification}</p>
                  </div>
                </div>

                {/* Features */}
                <ul className="mt-6 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 font-sans text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
            <div className="text-center mb-12">
              <p className="h2 font-semibold text-foreground mb-2">
                More from {product.universe.name}
              </p>
              <p className="font-sans text-muted-foreground">
                Explore other pieces from the same universe
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
