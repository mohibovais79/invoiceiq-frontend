"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FileText, ArrowRight } from "lucide-react";

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
    <section className="relative min-h-[calc(100vh-64px)] flex items-center py-20 lg:py-0 px-8 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
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
            {/* Fixed height and alignment to prevent layout jumping */}
            <span className="inline-block relative text-brand-primary w-[280px] h-[1.25em] text-left align-bottom">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute left-0 top-0"
                >
                  {ROTATING_WORDS[wordIndex]}.
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-[18px] font-normal text-slate leading-[1.6] max-w-[520px] mb-10">
            <span className="text-ink font-medium">Extract invoice data in seconds, not hours.</span> Upload any invoice — PDF, scan, phone photo. InvoiceIQ extracts every field, categorizes expenses, flags duplicates, and exports to QuickBooks or Xero.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
            <Button variant="primary" className="h-12 px-6 text-base w-full sm:w-auto">
              Start Free — No Card Required
            </Button>
            <Link href="#demo" className="w-full sm:w-auto">
              <Button variant="ghost" className="h-12 px-6 text-base w-full sm:w-auto gap-2">
                See it work <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Right Column: Invoice Detail Wireframe / Screenshot Placeholder */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-[600px] mx-auto lg:ml-auto"
        >
          {/* Decorative background glow (subtle, matches brand) */}
          <div className="absolute -inset-1 bg-brand-primary/10 blur-2xl rounded-full z-0" />

          {/* The "Screenshot" */}
          <div className="relative z-10 aspect-[16/10] w-full rounded-lg border border-border bg-surface shadow-elevated overflow-hidden flex flex-col">
            
            {/* Fake Browser Header */}
            <div className="h-10 w-full border-b border-border bg-canvas flex items-center px-4 gap-2 shrink-0">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-border-subtle border border-border" />
                <div className="w-2.5 h-2.5 rounded-full bg-border-subtle border border-border" />
                <div className="w-2.5 h-2.5 rounded-full bg-border-subtle border border-border" />
              </div>
              <div className="ml-4 h-5 w-48 bg-surface border border-border rounded-sm flex items-center px-2">
                <span className="text-[10px] text-muted font-mono">app.invoiceiq.com/inv_892</span>
              </div>
            </div>
            
            {/* Fake App Body (Invoice Detail View) */}
            <div className="flex-1 flex bg-canvas/30 p-4 gap-4 overflow-hidden">
              
              {/* Left Pane: PDF Viewer Placeholder */}
              <div className="w-1/2 h-full bg-surface border border-border rounded-md flex flex-col items-center justify-center text-slate shadow-sm">
                <FileText size={32} className="text-border mb-2" strokeWidth={1.5} />
                <div className="w-24 h-2 bg-canvas rounded-full mb-1" />
                <div className="w-16 h-2 bg-canvas rounded-full" />
              </div>

              {/* Right Pane: Extracted Data */}
              <div className="w-1/2 h-full flex flex-col gap-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-ink uppercase tracking-wider">Extracted Data</span>
                  <Badge variant="success">Approved</Badge>
                </div>

                {/* Data Row 1: High Confidence */}
                <div className="bg-surface border border-border rounded-md p-2.5 shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] font-medium text-slate">Vendor Name</span>
                    <span className="text-[10px] font-mono text-success bg-success-bg px-1.5 py-0.5 rounded-sm">99%</span>
                  </div>
                  <div className="text-sm font-medium text-ink">Stripe Inc.</div>
                </div>

                {/* Data Row 2: High Confidence */}
                <div className="bg-surface border border-border rounded-md p-2.5 shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] font-medium text-slate">Total Amount</span>
                    <span className="text-[10px] font-mono text-success bg-success-bg px-1.5 py-0.5 rounded-sm">98%</span>
                  </div>
                  <div className="text-sm font-mono font-medium text-ink">$1,240.00</div>
                </div>

                {/* Data Row 3: Warning / Needs Review */}
                <div className="bg-surface border-brand-primary/30 ring-1 ring-brand-primary/10 rounded-md p-2.5 shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] font-medium text-slate">Invoice Date</span>
                    <span className="text-[10px] font-mono text-warning bg-warning-bg px-1.5 py-0.5 rounded-sm">72%</span>
                  </div>
                  <div className="text-sm font-mono font-medium text-ink">Oct 12, 2023</div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}