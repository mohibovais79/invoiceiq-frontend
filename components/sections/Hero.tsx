"use client";

import { Button } from "@/components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HeroDashboard } from "./HeroDashboard";
import { useEffect, useState } from "react";

const ROTATING_WORDS = ["Accountants", "Bookkeepers", "Firms", "Teams"];

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-center py-16 lg:py-0 px-8 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-20 items-center">

        {/* Left Column: Copy & CTAs */}
        <motion.div
          className="flex flex-col items-start text-left"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Headline with Rotating Text */}
          <h1 className="font-heading text-[48px] font-bold text-ink tracking-[-0.03em] leading-[1.1] max-w-[600px] mb-6">
            Intelligent invoice processing <br className="hidden xl:block" />
            for{" "}
            {/* Fixed width prevents layout shift; overflow-hidden clips the slide animation */}
            <span className="inline-block relative text-brand-primary w-[340px] h-[1.1em] align-middle overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: "-100%" }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center"
                >
                  {ROTATING_WORDS[wordIndex]}.
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-[18px] font-normal text-slate leading-[1.6] max-w-[460px] mb-6">
            Any format, any vendor — structured data exported to your accounting software in seconds.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {["PDF, scan & photos", "99%+ AI accuracy", "QuickBooks & Xero", "Duplicate detection"].map((f) => (
              <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-subtle text-brand-primary text-[13px] font-medium border border-brand-primary/10">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/60 shrink-0" />
                {f}
              </span>
            ))}
          </div>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">

            <Link href="/signup">
              <Button variant="primary" className="h-12 px-6 text-base w-full sm:w-auto">
                Start Free — No Card Required
              </Button>
            </Link>

            <Link href="#demo" className="w-full sm:w-auto">
              <Button variant="ghost" className="h-12 px-6 text-base w-full sm:w-auto gap-2">
                See it work <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Right Column: Dashboard Screenshot */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="relative w-full"
          style={{ perspective: "1200px" }}
        >
          {/* Ambient glow */}
          <div
            className="absolute -inset-10 rounded-3xl z-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 60% 50%, rgba(99,102,241,0.12) 0%, transparent 70%)",
            }}
          />

          {/* Dashboard with 3D tilt */}
          <div
            className="relative z-10 w-full rounded-xl overflow-hidden"
            style={{
              transform: "perspective(1200px) rotateY(-8deg) rotateX(4deg)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)",
            }}
          >
            <HeroDashboard />
          </div>
        </motion.div>

      </div>
    </section>
  );
}