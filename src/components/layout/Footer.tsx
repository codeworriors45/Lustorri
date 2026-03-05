"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";

const footerLinks = {
  shop: [
    { name: "All Jewelry", href: "/shop" },
    { name: "Rings", href: "/shop?category=rings" },
    { name: "Necklaces", href: "/shop?category=necklaces" },
    { name: "Earrings", href: "/shop?category=earrings" },
    { name: "Bracelets", href: "/shop?category=bracelets" },
    { name: "Explore Universes", href: "/universes" },
  ],
  company: [
    { name: "About Lustorri", href: "/about" },
    { name: "Our Universes", href: "/universes" },
    { name: "The Engraved Card", href: "/the-card" },
    { name: "Love Stories", href: "/stories" },
    { name: "Press & Media", href: "/press" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/faq" },
    { name: "Shipping & Returns", href: "/shipping" },
    { name: "Ring Size Guide", href: "/size-guide" },
    { name: "Care Instructions", href: "/care" },
    { name: "Track Your Order", href: "/track-order" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/images/logo/Logo.png"
                  alt="Lustorri"
                  width={180}
                  height={56}
                  className="h-12 w-auto object-contain brightness-0 invert"
                />
              </Link>
              <p className="font-serif italic text-background/60 leading-relaxed mb-2 max-w-sm">
                Where Lust Meets Love
              </p>
              <p className="font-sans text-background/70 leading-relaxed mb-6 max-w-sm">
                Story-driven lab diamond jewelry. Every piece comes with a free metal engraved story card — your words, eternally preserved.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 text-sm font-sans text-background/70">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span>123 Luxury Lane, New York, NY 10001</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gold" />
                  <span>+1 (800) LUSTORRI</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gold" />
                  <span>hello@lustorri.com</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Shop Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-xs font-sans font-semibold uppercase tracking-wider text-gold mb-5">
              Shop
            </p>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-sans text-background/70 hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xs font-sans font-semibold uppercase tracking-wider text-gold mb-5">
              Company
            </p>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-sans text-background/70 hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-xs font-sans font-semibold uppercase tracking-wider text-gold mb-5">
              Support
            </p>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-sans text-background/70 hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <Separator className="bg-background/10" />

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center text-background/70 hover:text-gold hover:border-gold transition-colors duration-300"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-sans text-background/50 text-center md:text-right"
          >
            <p>&copy; {new Date().getFullYear()} Lustorri. All rights reserved.</p>
            <div className="flex items-center justify-center md:justify-end gap-4 mt-2">
              <Link href="/privacy" className="hover:text-gold transition-colors">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link href="/terms" className="hover:text-gold transition-colors">
                Terms of Service
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
