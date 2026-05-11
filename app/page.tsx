import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { VibeSection } from "@/components/vibe-section"
import { WhySection } from "@/components/why-section"
import { HowItWorks } from "@/components/how-it-works"
import { FeaturedProducts } from "@/components/featured-products"
import { Testimonials } from "@/components/testimonials"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"
import { MobileStickyCTA } from "@/components/mobile-sticky-cta"

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <VibeSection />
      <WhySection />
      <HowItWorks />
      <FeaturedProducts />
      <Testimonials />
      <FinalCTA />
      <Footer />
      <MobileStickyCTA />
    </main>
  )
}
