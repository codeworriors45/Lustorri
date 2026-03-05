"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ShoppingBag, Heart, User, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/useCartStore";
import { cn } from "@/lib/utils";

// Universe Data based on Brand Document
const universeData = {
  moment: {
    title: "Moment Universes",
    subtitle: "What did you feel?",
    description: "Capturing physical and emotional sensations — the intimate, fleeting moments between lovers.",
    universes: [
      {
        name: "The Pulse",
        tagline: "The first electric touch that made your heart race",
        href: "/universes/the-pulse",
        color: "from-rose-500/20 to-red-500/20",
      },
      {
        name: "The Bite",
        tagline: "Fierce desire that leaves its mark",
        href: "/universes/the-bite",
        color: "from-red-500/20 to-rose-500/20",
      },
      {
        name: "The Vein",
        tagline: "Love that runs through your entire being",
        href: "/universes/the-vein",
        color: "from-purple-500/20 to-rose-500/20",
      },
      {
        name: "The Drown",
        tagline: "Surrendering completely to someone",
        href: "/universes/the-drown",
        color: "from-blue-500/20 to-purple-500/20",
      },
    ],
  },
  identity: {
    title: "Identity Universes",
    subtitle: "What kind of love is this?",
    description: "Naming and defining the relationship itself — giving your love a symbol and a story.",
    universes: [
      {
        name: "The Eclipse",
        tagline: "For opposites drawn together by gravity stronger than reason",
        href: "/universes/the-eclipse",
        color: "from-gray-500/20 to-gold/20",
      },
      {
        name: "The Melted Promise",
        tagline: "For lovers who dissolved into each other",
        href: "/universes/the-melted-promise",
        color: "from-gold/20 to-amber-500/20",
      },
      {
        name: "The Midnight Thread",
        tagline: "For love born in darkness, raw and magnetic",
        href: "/universes/the-midnight-thread",
        color: "from-indigo-500/20 to-gray-500/20",
      },
      {
        name: "The Sin Curve",
        tagline: "For those who chose feeling over fear",
        href: "/universes/the-sin-curve",
        color: "from-rose-500/20 to-pink-500/20",
      },
      {
        name: "The Scar Line",
        tagline: "For love that survived imperfection and became eternal",
        href: "/universes/the-scar-line",
        color: "from-amber-500/20 to-orange-500/20",
      },
      {
        name: "The Ember",
        tagline: "For flames that never die, just burn quieter",
        href: "/universes/the-ember",
        color: "from-orange-500/20 to-red-500/20",
      },
    ],
  },
};

// Shop Categories
const shopData = {
  categories: [
    {
      title: "By Category",
      links: [
        { name: "Rings", href: "/shop/rings", count: "50+" },
        { name: "Necklaces", href: "/shop/necklaces", count: "40+" },
        { name: "Earrings", href: "/shop/earrings", count: "35+" },
        { name: "Bracelets", href: "/shop/bracelets", count: "25+" },
      ],
    },
    {
      title: "Specials",
      links: [
        { name: "Waist Chains", href: "/shop/waist-chains" },
        { name: "Hand Pieces", href: "/shop/hand-pieces" },
        { name: "Navel Jewelry", href: "/shop/navel-jewelry" },
        { name: "Intimate Adornments", href: "/shop/intimate" },
      ],
    },
    {
      title: "Collections",
      links: [
        { name: "New Arrivals", href: "/shop/new-arrivals" },
        { name: "Bestsellers", href: "/shop/bestsellers" },
        { name: "Limited Edition", href: "/shop/limited-edition" },
        { name: "Gift Sets", href: "/shop/gift-sets" },
      ],
    },
  ],
  featured: {
    title: "The Engraved Card",
    description: "Every piece comes with a metal story card — your words, eternally engraved.",
    image: "/images/engraved-card-preview.jpg",
    href: "/the-card",
  },
};

const navLinksLeft = [
  { name: "Universes", href: "/universes", hasMegaMenu: true, menuType: "universes" as const },
  { name: "Shop", href: "/shop", hasMegaMenu: true, menuType: "shop" as const },
  { name: "Love Stories", href: "/stories", hasMegaMenu: false, menuType: null },
];

const navLinksRight = [
  { name: "The Card", href: "/the-card", hasMegaMenu: false, menuType: null },
  { name: "Our Story", href: "/about", hasMegaMenu: false, menuType: null },
];

const allNavLinks = [...navLinksLeft, ...navLinksRight];

// Header Actions Component with Cart and Wishlist
function HeaderActions() {
  const { cartCount, wishlistCount } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center space-x-1 sm:space-x-3">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 text-foreground/80 hover:text-primary transition-colors"
        aria-label="Search"
      >
        <Search size={20} />
      </motion.button>

      <Link href="/wishlist">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative hidden sm:block p-2 text-foreground/80 hover:text-primary transition-colors"
          aria-label="Wishlist"
        >
          <Heart size={20} />
          {mounted && wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
              {wishlistCount > 99 ? "99+" : wishlistCount}
            </span>
          )}
        </motion.div>
      </Link>

      <Link href="/account">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="hidden sm:block p-2 text-foreground/80 hover:text-primary transition-colors"
          aria-label="Account"
        >
          <User size={20} />
        </motion.div>
      </Link>

      <Link href="/cart">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 text-foreground/80 hover:text-primary transition-colors"
          aria-label="Shopping bag"
        >
          <ShoppingBag size={20} />
          {mounted && cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </motion.div>
      </Link>
    </div>
  );
}

export function HeaderV2() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const pathname = usePathname();

  // Check if current route is under a specific nav section
  const isActiveRoute = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-background/80 backdrop-blur-sm"
          }`}
      >
        {/* Top Bar - Brand Messaging */}
        <div className="hidden lg:block bg-foreground text-background text-xs py-2.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="font-serif italic">Where Lust Meets Love</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-background/70">Every piece tells your story</span>
              <span className="text-gold">|</span>
              <Link href="/the-card" className="hover:text-gold transition-colors flex items-center gap-1">
                <span>Free Engraved Story Card</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link href="/">
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Image
                  src="/images/logo/Logo.png"
                  alt="Lustorri"
                  width={160}
                  height={50}
                  className="h-10 w-auto object-contain"
                  priority
                />
              </motion.div>
            </Link>

            <HeaderActions />
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block px-8 xl:px-12">
          <div className="relative flex items-center" style={{ height: '52px' }}>
            {/* Left Navigation */}
            <nav className="flex items-center space-x-2">
              {navLinksLeft.map((link) => {
                const isActive = isActiveRoute(link.href);
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => link.hasMegaMenu && setActiveMenu(link.name)}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-1 px-4 py-2 text-sm font-sans font-medium transition-colors duration-300 group",
                        isActive
                          ? "text-primary"
                          : "text-foreground/80 hover:text-primary"
                      )}
                    >
                      {link.name}
                      {link.hasMegaMenu && (
                        <ChevronDown
                          size={14}
                          className={cn(
                            "transition-transform duration-300",
                            activeMenu === link.name && "rotate-180"
                          )}
                        />
                      )}
                    </Link>
                  </div>
                );
              })}
            </nav>

            {/* Right Navigation + Actions */}
            <div className="ml-auto flex items-center gap-6">
              <nav className="flex items-center space-x-2">
                {navLinksRight.map((link) => {
                  const isActive = isActiveRoute(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "px-4 py-2 text-sm font-sans font-medium transition-colors duration-300",
                        isActive
                          ? "text-primary"
                          : "text-foreground/80 hover:text-primary"
                      )}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
              <div className="border-l border-border pl-4">
                <HeaderActions />
              </div>
            </div>
          </div>

          {/* Full-width border line + center notch — left/right are transparent (no fill) */}
          <div className="relative overflow-visible -mx-8 xl:-mx-12" style={{ height: '0px' }}>
            <svg
              className="absolute top-0 left-0 w-full pointer-events-none"
              height="36"
              viewBox="0 0 1440 36"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Fill ONLY the notch center area — left/right stay transparent */}
              <path
                d="M620,-1 L620,0.5 C626,0.5 630,4.5 630,10.5 L630,26 C630,31.5 634.5,35.5 640,35.5 L800,35.5 C805.5,35.5 810,31.5 810,26 L810,10.5 C810,4.5 814,0.5 820,0.5 L820,-1 Z"
                fill="var(--color-background, #F9F5EF)"
                fillOpacity={isScrolled ? 0.95 : 0.8}
                className="transition-all duration-500"
              />
              {/* Full-width stroke: left line → notch curve → right line */}
              <path
                id="notchPath"
                d="M0,0.5 L620,0.5 C626,0.5 630,4.5 630,10.5 L630,26 C630,31.5 634.5,35.5 640,35.5 L800,35.5 C805.5,35.5 810,31.5 810,26 L810,10.5 C810,4.5 814,0.5 820,0.5 L1440,0.5"
                stroke="var(--color-border, #e5e5e5)"
                strokeWidth="1"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
              {/* Animated moving line across the full width */}
              <defs>
                <linearGradient id="movingLine" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="200" y2="0">
                  <stop offset="0%" stopColor="var(--color-primary, #8B6F4E)" stopOpacity="0" />
                  <stop offset="40%" stopColor="var(--color-primary, #8B6F4E)" stopOpacity="0.7" />
                  <stop offset="50%" stopColor="var(--color-primary, #8B6F4E)" stopOpacity="1" />
                  <stop offset="60%" stopColor="var(--color-primary, #8B6F4E)" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="var(--color-primary, #8B6F4E)" stopOpacity="0" />
                  <animateTransform
                    attributeName="gradientTransform"
                    type="translate"
                    from="-200 0"
                    to="1640 0"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </linearGradient>
              </defs>
              <path
                d="M0,0.5 L620,0.5 C626,0.5 630,4.5 630,10.5 L630,26 C630,31.5 634.5,35.5 640,35.5 L800,35.5 C805.5,35.5 810,31.5 810,26 L810,10.5 C810,4.5 814,0.5 820,0.5 L1440,0.5"
                stroke="url(#movingLine)"
                strokeWidth="2"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Logo inside notch */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}
              className="absolute left-1/2 -translate-x-1/2 -top-3 flex items-center justify-center z-10 pointer-events-auto"
              style={{ width: '200px', height: '36px' }}
            >
              <Link href="/">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src="/images/logo/Logo.png"
                    alt="Lustorri"
                    width={230}
                    height={80}
                    className="h-10 w-auto object-contain"
                    priority
                  />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Universes Mega Menu */}
        <AnimatePresence>
          {activeMenu === "Universes" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 bg-background border-t border-border shadow-2xl"
              onMouseEnter={() => setActiveMenu("Universes")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-2 gap-8">
                  {/* Moment Universes */}
                  <div>
                    <div className="mb-4">
                      <span className="text-xs font-sans font-medium uppercase tracking-[0.15em] text-rose-gold">
                        {universeData.moment.subtitle}
                      </span>
                      <p className="text-sm font-sans font-semibold text-foreground mt-0.5">
                        {universeData.moment.title}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {universeData.moment.universes.map((universe) => (
                        <Link
                          key={universe.name}
                          href={universe.href}
                          className={`group p-2.5 rounded-lg bg-linear-to-br ${universe.color} hover:shadow-md transition-all duration-300`}
                        >
                          <p className="text-sm font-sans font-semibold text-foreground group-hover:text-primary transition-colors">
                            {universe.name}
                          </p>
                          <p className="text-xs font-sans text-muted-foreground mt-0.5 line-clamp-1">
                            {universe.tagline}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Identity Universes */}
                  <div>
                    <div className="mb-4">
                      <span className="text-xs font-sans font-medium uppercase tracking-[0.15em] text-gold">
                        {universeData.identity.subtitle}
                      </span>
                      <p className="text-sm font-sans font-semibold text-foreground mt-0.5">
                        {universeData.identity.title}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {universeData.identity.universes.map((universe) => (
                        <Link
                          key={universe.name}
                          href={universe.href}
                          className={`group p-2.5 rounded-lg bg-linear-to-br ${universe.color} hover:shadow-md transition-all duration-300`}
                        >
                          <p className="text-sm font-sans font-semibold text-foreground group-hover:text-primary transition-colors">
                            {universe.name}
                          </p>
                          <p className="text-xs font-sans text-muted-foreground mt-0.5 line-clamp-1">
                            {universe.tagline}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                  <p className="font-serif italic text-sm text-muted-foreground">
                    Every Universe is a complete emotional world.
                  </p>
                  <Link
                    href="/universes"
                    className="text-xs font-sans font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                  >
                    Explore All
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shop Mega Menu */}
        <AnimatePresence>
          {activeMenu === "Shop" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 bg-background border-t border-border shadow-2xl"
              onMouseEnter={() => setActiveMenu("Shop")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-12 gap-8">
                  {/* Categories */}
                  <div className="col-span-8 grid grid-cols-3 gap-8">
                    {shopData.categories.map((category) => (
                      <div key={category.title}>
                        <p className="text-xs font-sans font-medium uppercase tracking-[0.15em] text-primary/80 mb-4">
                          {category.title}
                        </p>
                        <ul className="space-y-2">
                          {category.links.map((link) => (
                            <li key={link.name}>
                              <Link
                                href={link.href}
                                className="flex items-center justify-between text-sm font-sans text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200"
                              >
                                <span>{link.name}</span>
                                {"count" in link && (
                                  <span className="text-xs text-primary/60">{link.count}</span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Featured - The Card */}
                  <div className="col-span-4">
                    <Link
                      href={shopData.featured.href}
                      className="group block relative overflow-hidden rounded-xl bg-linear-to-br from-primary/10 to-gold/10 p-6 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-xs font-sans font-medium uppercase tracking-[0.15em] text-primary">
                          Signature Feature
                        </span>
                      </div>
                      <p className="text-lg font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {shopData.featured.title}
                      </p>
                      <p className="text-sm font-sans text-muted-foreground mb-4">
                        {shopData.featured.description}
                      </p>
                      <span className="text-sm font-sans font-medium text-primary flex items-center gap-1">
                        Learn More <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Can&apos;t decide? <Link href="/quiz" className="text-primary hover:underline">Take our Universe Quiz</Link>
                  </p>
                  <Link
                    href="/shop"
                    className="text-sm font-sans font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
                  >
                    View All Products
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              className="absolute top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-background shadow-2xl overflow-y-auto"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex flex-col h-full pt-24 pb-8 px-6">
                {/* Brand Tagline */}
                <div className="mb-6 pb-6 border-b border-border">
                  <div className="flex items-center gap-2 text-primary">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-serif italic text-sm">Where Lust Meets Love</span>
                  </div>
                </div>

                <div className="space-y-1">
                  {allNavLinks.map((link, index) => (
                    <MobileMenuItemV2
                      key={link.name}
                      link={link}
                      index={index}
                      onClose={() => setIsMobileMenuOpen(false)}
                      isActive={isActiveRoute(link.href)}
                    />
                  ))}
                </div>

                {/* The Card CTA */}
                <div className="mt-6 p-4 rounded-xl bg-linear-to-br from-primary/10 to-gold/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-xs font-sans font-medium uppercase tracking-wider text-primary">
                      Free with every piece
                    </span>
                  </div>
                  <p className="text-sm font-sans text-muted-foreground">
                    Metal engraved story card — your words, forever.
                  </p>
                </div>

                <div className="mt-auto pt-6 space-y-4 border-t border-border">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Sign In
                  </Button>
                  <Button variant="outline" className="w-full">
                    Create Account
                  </Button>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Mobile Menu Item Component
function MobileMenuItemV2({
  link,
  index,
  onClose,
  isActive,
}: {
  link: typeof allNavLinks[0];
  index: number;
  onClose: () => void;
  isActive: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {link.hasMegaMenu ? (
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "w-full flex items-center justify-between py-3 text-lg font-display font-medium transition-colors border-b border-border/50",
              isActive ? "text-primary" : "text-foreground hover:text-primary"
            )}
          >
            {link.name}
            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>

          <AnimatePresence>
            {isOpen && link.menuType === "universes" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden bg-muted/30 rounded-lg my-2"
              >
                <div className="p-4 space-y-4">
                  {/* Moment Universes */}
                  <div>
                    <p className="text-xs font-sans font-medium text-rose-gold uppercase tracking-[0.15em] mb-2">
                      Moment Universes
                    </p>
                    <div className="space-y-1">
                      {universeData.moment.universes.map((universe) => (
                        <Link
                          key={universe.name}
                          href={universe.href}
                          onClick={onClose}
                          className="block text-sm font-sans text-muted-foreground hover:text-foreground py-1"
                        >
                          {universe.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Identity Universes */}
                  <div>
                    <p className="text-xs font-sans font-medium text-gold uppercase tracking-[0.15em] mb-2">
                      Identity Universes
                    </p>
                    <div className="space-y-1">
                      {universeData.identity.universes.map((universe) => (
                        <Link
                          key={universe.name}
                          href={universe.href}
                          onClick={onClose}
                          className="block text-sm font-sans text-muted-foreground hover:text-foreground py-1"
                        >
                          {universe.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/universes"
                    onClick={onClose}
                    className="block text-sm font-sans font-medium text-primary pt-2 border-t border-border"
                  >
                    View All Universes →
                  </Link>
                </div>
              </motion.div>
            )}

            {isOpen && link.menuType === "shop" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden bg-muted/30 rounded-lg my-2"
              >
                <div className="p-4 space-y-4">
                  {shopData.categories.map((category) => (
                    <div key={category.title}>
                      <p className="text-xs font-sans font-semibold text-primary/80 uppercase tracking-wider mb-2">
                        {category.title}
                      </p>
                      <div className="grid grid-cols-2 gap-1">
                        {category.links.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={onClose}
                            className="text-sm text-muted-foreground hover:text-foreground py-1"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Link
                    href="/shop"
                    onClick={onClose}
                    className="block text-sm font-medium text-primary pt-2 border-t border-border"
                  >
                    View All Products →
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <Link
          href={link.href}
          onClick={onClose}
          className={cn(
            "block py-3 text-lg font-display font-medium transition-colors border-b border-border/50",
            isActive ? "text-primary" : "text-foreground hover:text-primary"
          )}
        >
          {link.name}
        </Link>
      )}
    </motion.div>
  );
}
