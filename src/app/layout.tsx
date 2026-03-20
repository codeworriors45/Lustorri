import type { Metadata, Viewport } from "next";
import { Playfair_Display, Cormorant_Garamond, Montserrat } from "next/font/google";
import { defaultMetadata, organizationSchema, localBusinessSchema } from "@/lib/seo/config";
import { SmoothScroll } from "@/components/providers";
import { CartDrawer } from "@/components/shop";
import { HeaderV2 } from "@/components/layout/HeaderV2";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";
import "./typography.css";

// Primary Serif - For Logos, Headlines, Stories
// Elegant, romantic, luxurious. Ideal for emotional reels & engraved card stories.
const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// Secondary Serif - For poetic lines, quotes, intimate captions
// High-end editorial feel (Vogue / Tiffany style)
const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Sans Serif - For Instagram, website, descriptions, clean text
// Minimal, modern, readable — balances the luxury serif beautifully
const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F9F5EF" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${cormorant.variable} ${playfair.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <SmoothScroll>
          <HeaderV2 />
          {children}
          <Footer />
        </SmoothScroll>
        <CartDrawer />
      </body>
    </html>
  );
}
