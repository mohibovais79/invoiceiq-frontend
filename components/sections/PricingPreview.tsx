"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const plans = [
    {
        name: "Free",
        price: "$0",
        period: null,
        description: "For individuals getting started.",
        features: ["50 invoices / month", "PDF & image upload", "CSV export"],
        cta: "Get started",
        ctaVariant: "secondary" as const,
        highlight: false,
    },
    {
        name: "Pro",
        price: "$49",
        period: "/mo",
        description: "For growing accounting teams.",
        features: ["2,000 invoices / month", "QuickBooks & Xero sync", "Anomaly detection", "Priority support"],
        cta: "Start free trial",
        ctaVariant: "primary" as const,
        highlight: true,
    },
    {
        name: "Business",
        price: "$149",
        period: "/mo",
        description: "For high-volume operations.",
        features: ["Unlimited invoices", "Custom GL mapping", "API access", "Dedicated account manager"],
        cta: "Contact sales",
        ctaVariant: "secondary" as const,
        highlight: false,
    },
];

export function PricingPreview() {
    return (
        <section id="pricing" className="py-24 px-8 bg-canvas">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <motion.div
                    className="text-center mb-12 space-y-3"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-heading font-bold text-ink tracking-tight">
                        Simple pricing. Start free, upgrade when you need more.
                    </h2>
                </motion.div>

                {/* Plan Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={plan.name}
                            className={[
                                "relative flex flex-col rounded-lg border p-6 shadow-card transition-all hover:shadow-elevated",
                                plan.highlight
                                    ? "bg-surface border-brand-primary"
                                    : "bg-surface border-border",
                            ].join(" ")}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                        >
                            {/* Popular badge */}
                            {plan.highlight && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center h-[24px] px-3 rounded-sm text-[11px] font-semibold uppercase tracking-wider bg-brand-primary text-white">
                                    Most popular
                                </span>
                            )}

                            {/* Plan name & price */}
                            <div className="mb-5">
                                <p className="text-sm font-semibold text-slate uppercase tracking-wider mb-2">{plan.name}</p>
                                <div className="flex items-end gap-1">
                                    <span className="text-3xl font-heading font-bold text-ink tracking-tight">{plan.price}</span>
                                    {plan.period && (
                                        <span className="text-sm text-muted mb-1">{plan.period}</span>
                                    )}
                                </div>
                                <p className="text-sm text-slate mt-1">{plan.description}</p>
                            </div>

                            {/* Features */}
                            <ul className="space-y-2.5 mb-6 flex-1">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2.5">
                                        <Check size={14} className="text-success shrink-0" strokeWidth={2.5} />
                                        <span className="text-sm text-slate">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <Button variant={plan.ctaVariant} className="w-full">
                                {plan.cta}
                            </Button>
                        </motion.div>
                    ))}
                </div>

                {/* Full pricing link */}
                <motion.div
                    className="mt-10 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Link
                        href="/pricing"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary hover:text-brand-hover transition-colors"
                    >
                        See full pricing <ArrowRight size={15} />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
