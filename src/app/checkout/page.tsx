"use client";

import { useState, useCallback } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, CreditCard, Sparkles, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LuxuryDiamond } from "@/components/common/LuxuryDiamond";
import { TrustBadges } from "@/components/common/TrustBadges";
import { useCart } from "@/store/useCartStore";
import { getProductById } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils/formatting";
import { getMetalDisplayName } from "@/types/product";

type CheckoutStep = "information" | "shipping" | "payment";

export default function CheckoutPage() {
  const { state, cartTotal, cartCount } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("information");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
    saveInfo: true,
    shippingMethod: "standard",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const shippingCost = cartTotal >= 500 ? 0 : 25;
  const expressShippingCost = 45;
  const selectedShippingCost = formData.shippingMethod === "express" ? expressShippingCost : shippingCost;
  const total = cartTotal + selectedShippingCost;

  const steps = [
    { id: "information", label: "Information" },
    { id: "shipping", label: "Shipping" },
    { id: "payment", label: "Payment" },
  ];

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name, value, type } = target;
    const isCheckbox = type === "checkbox";
    const newValue = isCheckbox ? (target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentStep === "information") {
      setCurrentStep("shipping");
    } else if (currentStep === "shipping") {
      setCurrentStep("payment");
    } else {
      // Handle payment submission
      console.log("Order submitted:", formData);
    }
  };

  if (state.items.length === 0) {
    return (
      <main className="min-h-screen bg-background pt-20 lg:pt-[120px] flex items-center justify-center">
          <div className="text-center px-4">
            <LuxuryDiamond id="checkout-empty" className="w-16 h-16 mx-auto mb-6 opacity-30" />
            <p className="h1 text-foreground mb-4">Your cart is empty</p>
            <p className="font-sans text-muted-foreground mb-8">
              Add some beautiful pieces to your cart before checkout.
            </p>
            <Button asChild size="xl">
              <Link href="/shop">
                Continue Shopping
              </Link>
            </Button>
          </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-20 lg:pt-[120px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm font-sans text-muted-foreground mb-8">
            <Link href="/cart" className="hover:text-foreground transition-colors">
              Cart
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Checkout</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Form */}
            <div>
              {/* Steps */}
              <div className="flex items-center gap-4 mb-8">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <button
                      onClick={() => {
                        if (step.id === "information") setCurrentStep("information");
                        else if (step.id === "shipping" && formData.email) setCurrentStep("shipping");
                        else if (step.id === "payment" && formData.shippingMethod) setCurrentStep("payment");
                      }}
                      className={`flex items-center gap-2 text-sm font-sans transition-colors ${
                        currentStep === step.id
                          ? "text-foreground font-medium"
                          : steps.findIndex((s) => s.id === currentStep) > index
                          ? "text-gold"
                          : "text-muted-foreground"
                      }`}
                    >
                      {steps.findIndex((s) => s.id === currentStep) > index ? (
                        <Check className="w-4 h-4" />
                      ) : null}
                      {step.label}
                    </button>
                    {index < steps.length - 1 && (
                      <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {/* Information Step */}
                {currentStep === "information" && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <p className="text-xl lg:text-2xl font-display font-semibold text-foreground">
                      Contact Information
                    </p>

                    <div>
                      <label className="block text-sm font-sans font-medium text-foreground mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-border bg-background font-sans focus:outline-none focus:border-gold transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="saveInfo"
                        id="saveInfo"
                        checked={formData.saveInfo}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-primary"
                      />
                      <label htmlFor="saveInfo" className="text-sm font-sans text-muted-foreground">
                        Save this information for next time
                      </label>
                    </div>

                    <div className="pt-6 border-t border-border">
                      <p className="text-xl lg:text-2xl font-display font-semibold text-foreground mb-6">
                        Shipping Address
                      </p>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-sans font-medium text-foreground mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-border bg-background font-sans focus:outline-none focus:border-gold transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-sans font-medium text-foreground mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-border bg-background font-sans focus:outline-none focus:border-gold transition-colors"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-sans font-medium text-foreground mb-2">
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-border bg-background font-sans focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-sans font-medium text-foreground mb-2">
                          Apartment, suite, etc. (optional)
                        </label>
                        <input
                          type="text"
                          name="apartment"
                          value={formData.apartment}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-border bg-background font-sans focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-sans font-medium text-foreground mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-border bg-background font-sans focus:outline-none focus:border-gold transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-sans font-medium text-foreground mb-2">
                            State
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-border bg-background font-sans focus:outline-none focus:border-gold transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-sans font-medium text-foreground mb-2">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-border bg-background font-sans focus:outline-none focus:border-gold transition-colors"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-sans font-medium text-foreground mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-border bg-background font-sans focus:outline-none focus:border-gold transition-colors"
                          placeholder="For delivery updates"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6">
                      <Link
                        href="/cart"
                        className="inline-flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Return to cart
                      </Link>
                      <Button type="submit" size="xl">
                        Continue to Shipping
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Shipping Step */}
                {currentStep === "shipping" && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <p className="h2 font-medium text-foreground">
                      Shipping Method
                    </p>

                    <div className="space-y-4">
                      <label
                        className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                          formData.shippingMethod === "standard"
                            ? "border-gold bg-gold/5"
                            : "border-border hover:border-gold/50"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value="standard"
                            checked={formData.shippingMethod === "standard"}
                            onChange={handleInputChange}
                            className="w-4 h-4 accent-primary"
                          />
                          <div>
                            <span className="block font-sans font-medium text-foreground">
                              Standard Shipping
                            </span>
                            <span className="text-sm font-sans text-muted-foreground">
                              5-7 business days
                            </span>
                          </div>
                        </div>
                        <span className="font-sans font-medium text-foreground">
                          {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                        </span>
                      </label>

                      <label
                        className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                          formData.shippingMethod === "express"
                            ? "border-gold bg-gold/5"
                            : "border-border hover:border-gold/50"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value="express"
                            checked={formData.shippingMethod === "express"}
                            onChange={handleInputChange}
                            className="w-4 h-4 accent-primary"
                          />
                          <div>
                            <span className="block font-sans font-medium text-foreground">
                              Express Shipping
                            </span>
                            <span className="text-sm font-sans text-muted-foreground">
                              2-3 business days
                            </span>
                          </div>
                        </div>
                        <span className="font-sans font-medium text-foreground">
                          {formatPrice(expressShippingCost)}
                        </span>
                      </label>
                    </div>

                    <div className="flex items-center justify-between pt-6">
                      <button
                        type="button"
                        onClick={() => setCurrentStep("information")}
                        className="inline-flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Return to information
                      </button>
                      <Button type="submit" size="xl">
                        Continue to Payment
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Payment Step */}
                {currentStep === "payment" && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <p className="text-xl lg:text-2xl font-display font-semibold text-foreground">
                      Payment
                    </p>

                    <div className="p-4 border border-border">
                      <div className="flex items-center gap-3 mb-4">
                        <CreditCard className="w-5 h-5 text-gold" />
                        <span className="font-sans font-medium text-foreground">Credit Card</span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-sans font-medium text-foreground mb-2">
                            Card Number
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-3 border border-border bg-background font-sans focus:outline-none focus:border-gold transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-sans font-medium text-foreground mb-2">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-border bg-background font-sans focus:outline-none focus:border-gold transition-colors"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-sans font-medium text-foreground mb-2">
                              Expiration Date
                            </label>
                            <input
                              type="text"
                              name="expiry"
                              value={formData.expiry}
                              onChange={handleInputChange}
                              required
                              placeholder="MM / YY"
                              className="w-full px-4 py-3 border border-border bg-background font-sans focus:outline-none focus:border-gold transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-sans font-medium text-foreground mb-2">
                              Security Code
                            </label>
                            <input
                              type="text"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              required
                              placeholder="CVV"
                              className="w-full px-4 py-3 border border-border bg-background font-sans focus:outline-none focus:border-gold transition-colors"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Security Badge */}
                    <div className="flex items-center gap-3 p-4 bg-muted/30 border border-border">
                      <Lock className="w-5 h-5 text-gold" />
                      <p className="text-sm font-sans text-muted-foreground">
                        Your payment information is encrypted and secure.
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-6">
                      <button
                        type="button"
                        onClick={() => setCurrentStep("shipping")}
                        className="inline-flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Return to shipping
                      </button>
                      <Button type="submit" size="xl" uppercase>
                        Place Order
                      </Button>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:border-l lg:border-border lg:pl-12">
              <div className="sticky top-24">
                <p className="text-xl lg:text-2xl font-display font-semibold text-foreground mb-6">
                  Order Summary
                </p>

                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {state.items.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;

                    const variant = product.variants.find((v) => v.id === item.variantId);
                    if (!variant) return null;

                    return (
                      <div key={`${item.productId}-${item.variantId}`} className="flex gap-4">
                        <div className="relative w-20 h-20 shrink-0 bg-muted">
                          <Image
                            src={product.images[0]?.url || "/images/placeholder.jpg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                          <span className="absolute -top-2 -right-2 w-5 h-5 bg-muted-foreground text-background text-xs font-sans font-medium rounded-full flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="card-title font-medium text-foreground">
                            {product.name}
                          </p>
                          <p className="text-xs font-sans text-muted-foreground">
                            {getMetalDisplayName(variant.metal)}
                          </p>
                          {item.engraving && (
                            <div className="flex items-center gap-1 text-xs text-gold mt-1">
                              <Sparkles className="w-3 h-3" />
                              <span className="truncate">&ldquo;{item.engraving}&rdquo;</span>
                            </div>
                          )}
                        </div>
                        <span className="font-sans font-medium text-foreground">
                          {formatPrice(variant.price * item.quantity)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Totals */}
                <div className="space-y-3 py-6 border-t border-border">
                  <div className="flex items-center justify-between font-sans">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex items-center justify-between font-sans">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">
                      {selectedShippingCost === 0 ? "Free" : formatPrice(selectedShippingCost)}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="font-sans font-medium text-foreground">Total</span>
                      <span className="font-sans text-2xl font-semibold text-foreground">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Free Story Card */}
                <div className="flex items-center gap-3 p-4 bg-gold/10 border border-gold/20">
                  <Sparkles className="w-5 h-5 text-gold shrink-0" />
                  <p className="text-sm font-sans text-foreground">
                    {cartCount} free metal engraved story {cartCount === 1 ? "card" : "cards"} included
                  </p>
                </div>

                {/* Trust Badges */}
                <TrustBadges
                  variant="inline"
                  badges={["secure", "shipping"]}
                  className="mt-6 pt-6 border-t border-border"
                />
              </div>
            </div>
          </div>
        </div>
    </main>
  );
}
