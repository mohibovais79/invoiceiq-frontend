"use client";

import { motion } from "framer-motion";
import { Download, Sparkles, Upload } from "lucide-react";

export function HowItWorks() {
    const steps = [
        {
            number: "01",
            title: "Upload",
            description: "Drop invoices in any format. PDF, scanned image, phone photo. Process one or hundreds at once.",
            icon: <Upload size={20} className="text-brand-primary" />,
        },
        {
            number: "02",
            title: "Extract & Classify",
            description: "AI reads every field — vendor, amounts, dates, line items, tax. ML classifies expense categories and flags anomalies.",
            icon: <Sparkles size={20} className="text-brand-primary" />,
        },
        {
            number: "03",
            title: "Review & Export",
            description: "Verify extracted data with confidence scores. One-click export to QuickBooks, Xero, or CSV.",
            icon: <Download size={20} className="text-brand-primary" />,
        },
    ];

    return (
        <section id="how-it-works" className="py-20 px-8 bg-canvas">
            <div className="mx-auto max-w-6xl">
                <motion.h2
                    className="text-3xl font-heading font-bold text-center text-ink mb-16 tracking-tight"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    From invoice chaos to structured data in three steps
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            className="bg-surface p-8 rounded-lg border border-border shadow-card flex flex-col items-start transition-all hover:shadow-elevated"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                            {/* Step Number Circle */}
                            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-brand-primary text-white font-mono font-bold text-sm mb-6">
                                {step.number}
                            </div>

                            {/* Title & Icon */}
                            <div className="flex items-center gap-3 mb-4">
                                <h3 className="text-lg font-heading font-semibold text-ink">{step.title}</h3>
                                {step.icon}
                            </div>

                            {/* Description */}
                            <p className="text-sm font-sans text-slate leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
