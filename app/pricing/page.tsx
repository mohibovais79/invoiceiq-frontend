"use client";

import { Footer } from "@/components/ui/layout/Footer";
import { Navbar } from "@/components/ui/layout/Navbar";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(true);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const plans = [
        {
            name: "Free",
            priceMonthly: 0,
            priceAnnual: 0,
            subtitle: "For testing and solo use",
            limits: "50 invoices/month • 1 user",
            features: [
                "OCR + AI field extraction",
                "PDF, image, scan support",
                "CSV export",
                "Basic expense categorization",
                "7-day processing history",
                "Email support",
            ],
            ctaText: "Get Started Free",
            ctaPrimary: false,
        },
        {
            name: "Pro",
            popular: true,
            priceMonthly: 49,
            priceAnnual: 39,
            subtitle: "For bookkeepers and small firms",
            limits: "500 invoices/month • 5 users",
            features: [
                "Everything in Free, plus:",
                "QuickBooks Online export",
                "Xero export",
                "Duplicate detection",
                "Anomaly flagging",
                "Full analytics dashboard",
                "Custom expense categories",
                "REST API access (1,000 calls/month)",
                "Priority email support",
                "90-day processing history",
            ],
            ctaText: "Start 14-Day Free Trial",
            ctaPrimary: true,
        },
        {
            name: "Business",
            priceMonthly: 149,
            priceAnnual: 119,
            subtitle: "For accounting firms at scale",
            limits: "Unlimited invoices • Unlimited users",
            features: [
                "Everything in Pro, plus:",
                "Custom extraction rules and templates",
                "Bulk batch processing (upload ZIP)",
                "Webhook notifications",
                "Custom export formats",
                "SSO (SAML) and team management",
                "Dedicated account manager",
                "Custom API limits",
                "Unlimited processing history",
                "SLA with 99.9% uptime guarantee",
            ],
            ctaText: "Contact Sales",
            ctaPrimary: false,
        },
    ];

    const faqs = [
        {
            question: "Can I switch plans anytime?",
            answer: "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the prorated difference will be applied to your next billing cycle.",
        },
        {
            question: "What happens when I hit my invoice limit?",
            answer: "We won't interrupt your workflow. You will be notified when you reach 80% and 100% of your limit. Overage invoices are billed at a small flat rate per invoice, or you can upgrade to the next tier.",
        },
        {
            question: "Is my data secure?",
            answer: "Absolutely. We use bank-level AES-256 encryption at rest and TLS 1.2+ in transit. Invoices are processed securely and we are fully GDPR compliant. We do not use your financial data to train public AI models.",
        },
        {
            question: "Do you offer refunds?",
            answer: "We offer a 14-day money-back guarantee for all new paid subscriptions if you are not satisfied with the extraction accuracy.",
        },
        {
            question: "Can I bring my own API key for the LLM?",
            answer: "Enterprise and Business customers can configure custom LLM endpoints or provide their own API keys for specific extraction models upon request.",
        },
    ];

    return (
        <main className="min-h-screen bg-canvas selection:bg-brand-subtle selection:text-brand-primary flex flex-col">
            <Navbar />

            <div className="flex-grow pt-24 pb-20 px-6 sm:px-8">
                <div className="mx-auto max-w-7xl">

                    {/* Header Section */}
                    <div className="text-center mb-16 space-y-6">
                        <motion.h1
                            className="text-4xl md:text-[36px] font-bold text-ink"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Transparent pricing for every team size
                        </motion.h1>
                        <motion.p
                            className="text-base text-slate max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            All plans include core extraction. Upgrade for volume, integrations, and team features.
                        </motion.p>

                        {/* Billing Toggle */}
                        <motion.div
                            className="flex items-center justify-center mt-8"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="bg-surface border border-border p-1 rounded-full inline-flex items-center">
                                <button
                                    onClick={() => setIsAnnual(false)}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${!isAnnual ? "bg-canvas text-ink shadow-sm border border-border-subtle" : "text-slate hover:text-ink"
                                        }`}
                                >
                                    Monthly
                                </button>
                                <button
                                    onClick={() => setIsAnnual(true)}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${isAnnual ? "bg-brand-primary text-white shadow-sm" : "text-slate hover:text-ink"
                                        }`}
                                >
                                    Annual <span className={isAnnual ? "text-white/80" : "text-brand-primary"}>(-20%)</span>
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                        {plans.map((plan, index) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                className={`relative flex flex-col h-full bg-surface rounded-[12px] p-8 ${plan.popular
                                    ? "border-2 border-brand-primary shadow-elevated md:-mt-4 md:mb-4"
                                    : "border border-border shadow-card mt-0"
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <span className="bg-brand-primary text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-ink mb-2">{plan.name}</h3>
                                    <p className="text-sm text-slate h-10">{plan.subtitle}</p>
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold text-ink">
                                            ${isAnnual ? plan.priceAnnual : plan.priceMonthly}
                                        </span>
                                        <span className="text-slate text-sm">/mo</span>
                                    </div>
                                    {isAnnual && plan.priceAnnual > 0 && (
                                        <p className="text-xs text-brand-primary mt-1 font-medium">
                                            Billed ${plan.priceAnnual * 12} annually
                                        </p>
                                    )}
                                </div>

                                <div className="mb-8 py-4 border-y border-border-subtle">
                                    <p className="text-sm font-medium text-ink">{plan.limits}</p>
                                </div>

                                <ul className="flex-grow space-y-4 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate">
                                            <Check className="w-5 h-5 text-success shrink-0 mt-0.5" strokeWidth={2.5} />
                                            <span className={feature.includes("Everything in") ? "font-medium text-ink" : ""}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className={`w-full py-3 px-4 rounded-md font-medium transition-all duration-200 mt-auto ${plan.ctaPrimary
                                        ? "bg-brand-primary text-white hover:bg-brand-hover shadow-md"
                                        : "bg-transparent border border-border text-ink hover:bg-surface-raised"
                                        }`}
                                >
                                    {plan.ctaText}
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-32 max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-[28px] font-bold text-ink mb-4">Frequently Asked Questions</h2>
                            <p className="text-slate">Need more details? We're here to help.</p>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-surface border border-border rounded-[12px] overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-surface-raised"
                                    >
                                        <span className="font-medium text-ink text-sm md:text-base">{faq.question}</span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-slate transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div className="p-5 pt-0 text-slate text-sm leading-relaxed border-t border-border-subtle mt-2">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}