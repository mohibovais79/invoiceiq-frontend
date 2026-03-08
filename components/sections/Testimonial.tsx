"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function Testimonial() {
    return (
        <section className="w-full bg-canvas border-y border-border py-24 px-8">
            <div className="mx-auto max-w-4xl flex flex-col items-center text-center gap-10">

                {/* Star Rating */}
                <motion.div
                    className="flex items-center gap-1"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={20} className="fill-warning text-warning" />
                    ))}
                </motion.div>

                {/* Quote */}
                <motion.blockquote
                    className="font-sans text-[22px] italic font-normal leading-[1.55] text-ink"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    &ldquo;InvoiceIQ cut our month-end close from three days to half a day. The extraction accuracy is
                    genuinely remarkable — it handles our messiest vendor PDFs without a single correction. It's the
                    first tool that actually delivered on its promise.&rdquo;
                </motion.blockquote>

                {/* Attribution */}
                <motion.div
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {/* Avatar */}
                    <div className="w-11 h-11 rounded-full bg-surface border border-border-subtle flex items-center justify-center shrink-0 overflow-hidden">
                        <span className="text-sm font-heading font-semibold text-slate select-none">SM</span>
                    </div>

                    {/* Name + Title */}
                    <div className="text-left">
                        <p className="text-sm font-semibold text-ink leading-snug">Sarah Mitchell</p>
                        <p className="text-sm text-muted leading-snug">Controller · Nexus Bookkeeping</p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
