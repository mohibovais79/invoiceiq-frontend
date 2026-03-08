import { Navbar } from "@/components/ui/layout/Navbar";
import { Hero } from "@/components/sections/Hero";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-canvas selection:bg-brand-subtle selection:text-brand-primary">
      <Navbar />
      <Hero />

      {/* Future sections will go here */}
      {/* <Features /> */}
      {/* <HowItWorks /> */}
    </main>
  );
}