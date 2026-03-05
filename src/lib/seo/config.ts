import { Metadata } from "next";

export const siteConfig = {
  name: "Lustorri",
  tagline: "Where Lust Meets Love",
  description:
    "Handcrafted jewelry that tells your unique love story. Each piece comes with a metal engraved story card — because your love deserves to be remembered.",
  url: "https://lustorri.com",
  ogImage: "/images/og-image.jpg",
  creator: "@lustorri",
  keywords: [
    "couple jewelry",
    "engagement rings",
    "love story jewelry",
    "personalized rings",
    "engraved jewelry",
    "story card",
    "handcrafted jewelry",
    "Indian jewelry",
    "wedding rings",
    "anniversary gifts",
    "proposal rings",
    "romantic jewelry",
    "luxury jewelry India",
  ],
  links: {
    instagram: "https://instagram.com/lustorri",
    facebook: "https://facebook.com/lustorri",
    pinterest: "https://pinterest.com/lustorri",
  },
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.creator,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.creator,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

// Helper function to generate page metadata
export function generatePageMetadata({
  title,
  description,
  image,
  noIndex = false,
}: {
  title: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  return {
    title,
    description: description || siteConfig.description,
    openGraph: {
      title,
      description: description || siteConfig.description,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      title,
      description: description || siteConfig.description,
      images: image ? [image] : undefined,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

// Structured data for organization
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo.png`,
  description: siteConfig.description,
  sameAs: [
    siteConfig.links.instagram,
    siteConfig.links.facebook,
    siteConfig.links.pinterest,
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
};

// Structured data for jewelry store
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  priceRange: "₹₹₹",
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  brand: {
    "@type": "Brand",
    name: siteConfig.name,
  },
};
