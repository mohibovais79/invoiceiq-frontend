import { FeatureHighlights } from "@/components/sections/FeatureHighlights";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SocialProof } from "@/components/sections/SocialProof";
import { Testimonial } from "@/components/sections/Testimonial";
import { PricingPreview } from "@/components/sections/PricingPreview";
import { Footer } from "@/components/ui/layout/Footer";
import { Navbar } from "@/components/ui/layout/Navbar";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-canvas selection:bg-brand-subtle selection:text-brand-primary">
      <Navbar />
      <Hero />
      <SocialProof />
      <HowItWorks />
      <FeatureHighlights />
      <Testimonial />
      <PricingPreview />

      {/* Future sections will go here */}
      {/* <Features /> */}
      {/* <HowItWorks /> */}
      <Footer />
    </main>
  );
}