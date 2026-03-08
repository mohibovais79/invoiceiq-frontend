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
    const duplicatedLogos = [...logos, ...logos];

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
                <div className="relative flex overflow-hidden group w-full">

                    {/* The Animated Container */}
                    <motion.div
                        // flex-nowrap prevents stacking, w-max allows it to grow beyond the screen
                        // pr-12 md:pr-20 matches the gap to keep spacing even when it loops
                        className="flex flex-nowrap items-center gap-x-12 md:gap-x-20 pr-12 md:pr-20 opacity-60 grayscale transition-all group-hover:grayscale-0 group-hover:opacity-100 duration-500 w-max"
                        animate={{
                            x: ["0%", "-50%"],
                        }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 20, // Lower is faster, higher is slower
                        }}
                    >
                        {duplicatedLogos.map((logo, index) => (
                            <div
                                // We combine id and index because we duplicated the array
                                key={`${logo.id}-${index}`}
                                className="flex items-center gap-2 text-ink font-heading font-semibold text-lg tracking-tight whitespace-nowrap"
                            >
                                <Building2 size={24} className="text-slate" strokeWidth={1.5} />
                                {logo.name}
                            </div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
}