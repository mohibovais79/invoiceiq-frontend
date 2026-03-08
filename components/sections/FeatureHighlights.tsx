"use client";

import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

export function FeatureHighlights() {
    return (
        <section id="features" className="py-24 px-8 bg-surface border-t border-border">
            <div className="mx-auto max-w-6xl space-y-24">

                {/* Feature 1: Accuracy */}
                <motion.div
                    className="grid lg:grid-cols-2 gap-12 items-center"
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <motion.div className="space-y-4" variants={fadeUp}>
                        <h2 className="text-3xl font-heading font-bold text-ink tracking-tight">97%+ extraction accuracy across 50+ invoice formats</h2>
                        <p className="text-sm text-slate leading-relaxed">Stop wasting time on manual entry. Our hybrid OCR + LLM engine understands messy scans, handwritten notes, and complex layouts, turning them into clean, structured data instantly.</p>
                    </motion.div>
                    <motion.div className="bg-surface-raised p-6 rounded-lg border border-border shadow-card flex gap-4" variants={fadeUp}>
                        <div className="w-1/2 bg-canvas border border-border rounded-md p-4 text-xs text-muted font-mono">
                            [Scanned Image Placeholder]
                        </div>
                        <div className="w-1/2 space-y-3">
                            <div className="text-xs font-semibold text-ink uppercase tracking-wider">Extracted</div>
                            <div className="p-2 border border-border rounded-sm text-sm font-mono">$1,240.00</div>
                            <Badge variant="success">99% Confidence</Badge>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Feature 2: Anomalies */}
                <motion.div
                    className="grid lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse"
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <motion.div className="space-y-4 lg:order-2" variants={fadeUp}>
                        <h2 className="text-3xl font-heading font-bold text-ink tracking-tight">Catch duplicates and anomalies before they cost you</h2>
                        <p className="text-sm text-slate leading-relaxed">InvoiceIQ automatically cross-references incoming invoices against your existing ledger. We flag potential duplicates and suspicious amounts before they ever reach your accounting software.</p>
                    </motion.div>
                    <motion.div className="bg-surface-raised p-6 rounded-lg border border-border shadow-card space-y-4 lg:order-1" variants={fadeUp}>
                        <div className="flex items-center gap-3 p-3 border border-danger-bg bg-danger-bg rounded-md">
                            <AlertTriangle className="text-danger" size={20} />
                            <span className="text-sm font-medium text-danger">Possible duplicate detected</span>
                        </div>
                        <p className="text-xs text-slate font-mono">Matched with INV-4421 from same vendor, similar amount.</p>
                    </motion.div>
                </motion.div>

                {/* Feature 3: Export */}
                <motion.div
                    className="grid lg:grid-cols-2 gap-12 items-center"
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <motion.div className="space-y-4" variants={fadeUp}>
                        <h2 className="text-3xl font-heading font-bold text-ink tracking-tight">QuickBooks & Xero ready in one click</h2>
                        <p className="text-sm text-slate leading-relaxed">No more CSV imports or manual entry. Once verified, your data is pushed directly to your accounting platform with the correct GL codes and tax mapping applied.</p>
                    </motion.div>
                    <motion.div className="bg-surface-raised p-6 rounded-lg border border-border shadow-card space-y-4" variants={fadeUp}>
                        <div className="flex items-center justify-between p-3 border border-border rounded-md">
                            <span className="text-sm font-medium text-ink">QuickBooks Online</span>
                            <CheckCircle2 className="text-success" size={20} />
                        </div>
                        <div className="flex items-center justify-between p-3 border border-border rounded-md">
                            <span className="text-sm font-medium text-ink">Xero</span>
                            <CheckCircle2 className="text-success" size={20} />
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 text-sm font-medium text-brand-primary hover:text-brand-hover transition-colors">
                            Export to Accounting <ArrowRight size={16} />
                        </button>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
