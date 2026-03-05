import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Hero,
  UniverseShowcase,
  EngravedCard,
  HowItWorks,
  LoveStories,
  Testimonials,
  Newsletter,
  BrandPhilosophy,
  UniverseTypes,
} from "@/components/sections";

export default function HomeV1() {
  return (
    <>
      <Header />
      <main>
        {/* Hero - First impression with brand message */}
        <Hero />

        {/* Brand Philosophy - What makes Lustorri unique */}
        <BrandPhilosophy />

        {/* Universe Showcase - Featured collections */}
        <UniverseShowcase />

        {/* Universe Types - Moment vs Identity */}
        <UniverseTypes />

        {/* Engraved Card - USP highlight */}
        <EngravedCard />

        {/* How It Works - Simple process */}
        <HowItWorks />

        {/* Love Stories - Real couples */}
        <LoveStories />

        {/* Testimonials - Social proof */}
        <Testimonials />

        {/* Newsletter - Capture leads */}
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
