"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

export function SocialProof() {
    // Placeholder data for logos. 
    // In production, replace these with actual SVG logos.
    const logos = [
        { name: "Acme Accounting", id: 1 },
        { name: "Global Finance", id: 2 },
        { name: "Nexus Bookkeeping", id: 3 },
        { name: "Apex Partners", id: 4 },
        { name: "Vertex CPAs", id: 5 },
    ];

    return (
        <section className="w-full border-y border-border bg-surface py-10 overflow-hidden">
            <div className="mx-auto max-w-6xl px-8">

                {/* Trust Text */}
                <motion.p
                    // FIX: Removed arbitrary text-[13px], using standard text-sm (14px) from our scale
                    className="text-center text-sm font-medium uppercase tracking-wider text-slate mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Trusted by firms processing 100,000+ invoices monthly
                </motion.p>

                {/* Logos Container */}
                <motion.div
                    className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-20 opacity-60 grayscale transition-all hover:grayscale-0 hover:opacity-100 duration-500"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.6 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    {logos.map((logo) => (
                        <div
                            key={logo.id}
                            className="flex items-center gap-2 text-ink font-heading font-semibold text-lg tracking-tight"
                        >
                            {/* Placeholder Icon */}
                            <Building2 size={24} className="text-slate" strokeWidth={1.5} />
                            {logo.name}
                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}