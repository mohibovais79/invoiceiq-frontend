"use client";

import {
    Calendar,
    ChevronDown,
    Clock,
    Lock,
    ShieldCheck,
    TrendingUp,
    Zap
} from "lucide-react";
import { useState } from "react";

// --- DUMMY DATA ---
const stats = [
    { label: "Total Spend (30d)", value: "$35,740.22", icon: TrendingUp },
    { label: "Avg Invoice Amount", value: "$144.70", icon: TrendingUp },
    { label: "Avg Processing Time", value: "3.8s", icon: Clock },
    { label: "Auto-Approved Rate", value: "78%", icon: Zap },
];

const categoryData = [
    { name: "Cloud Services", amount: "$12,450.00", percent: "45%", color: "bg-brand-primary" },
    { name: "Software / SaaS", amount: "$8,230.50", percent: "30%", color: "bg-info" },
    { name: "Advertising", amount: "$5,100.00", percent: "18%", color: "bg-success" },
    { name: "Travel", amount: "$3,420.75", percent: "12%", color: "bg-warning" },
    { name: "Office Supplies", amount: "$1,840.20", percent: "7%", color: "bg-danger" },
    { name: "Legal", amount: "$1,500.00", percent: "5%", color: "bg-brand-hover" },
    { name: "Meals", amount: "$840.50", percent: "3%", color: "bg-slate" },
    { name: "Other", amount: "$2,358.27", percent: "9%", color: "bg-muted" },
];

const vendorData = [
    { name: "AWS Web Services", count: 14, spend: "$12,450.00", avg: "$889.28", last: "Oct 24, 2023" },
    { name: "Google Ads", count: 8, spend: "$4,500.00", avg: "$562.50", last: "Oct 22, 2023" },
    { name: "Stripe", count: 42, spend: "$3,105.40", avg: "$73.93", last: "Oct 24, 2023" },
    { name: "Salesforce", count: 1, spend: "$2,400.00", avg: "$2,400.00", last: "Oct 01, 2023" },
    { name: "Delta Airlines", count: 4, spend: "$1,850.00", avg: "$462.50", last: "Oct 18, 2023" },
    { name: "WeWork", count: 2, spend: "$1,700.00", avg: "$850.00", last: "Oct 05, 2023" },
    { name: "Adobe Systems", count: 12, spend: "$659.88", avg: "$54.99", last: "Oct 21, 2023" },
    { name: "Mailchimp", count: 1, spend: "$120.00", avg: "$120.00", last: "Oct 20, 2023" },
];

const trendData = [
    { month: "May", volume: 45, spendY: 80 }, // SVG coordinates (100 is bottom, 0 is top)
    { month: "Jun", volume: 60, spendY: 70 },
    { month: "Jul", volume: 55, spendY: 75 },
    { month: "Aug", volume: 85, spendY: 45 },
    { month: "Sep", volume: 110, spendY: 30 },
    { month: "Oct", volume: 142, spendY: 15 },
];

export default function AnalyticsPage() {
    // Toggle this to true to see the unlocked state!
    const [isPro, setIsPro] = useState(false);

    return (
        <div className="max-w-[1400px] mx-auto pb-12">

            {/* HEADER AREA */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="font-heading text-[28px] font-bold text-ink leading-tight">Analytics</h1>
                    <p className="font-sans text-[14px] text-slate mt-1">
                        Spending insights and processing performance
                    </p>
                </div>

                <div className="relative min-w-[180px]">
                    <select className="w-full appearance-none bg-surface border border-border rounded-[8px] pl-9 pr-10 py-2.5 text-[13px] font-medium text-ink focus:outline-none focus:border-brand-primary transition-colors shadow-sm cursor-pointer">
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                        <option>This year</option>
                        <option>Custom range...</option>
                    </select>
                    <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                </div>
            </div>

            {/* CONTENT WRAPPER (Handles the Free Plan Gate) */}
            <div className="relative">

                {/* THE PAYWALL OVERLAY */}
                {!isPro && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-canvas/40 backdrop-blur-md rounded-[16px] border border-border">
                        <div className="bg-surface border border-border shadow-elevated p-10 rounded-[16px] text-center max-w-[420px] flex flex-col items-center">
                            <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6 border border-brand-primary/20">
                                <Lock size={32} className="text-brand-primary" />
                            </div>
                            <h2 className="font-heading text-[22px] font-bold text-ink leading-tight mb-3">
                                Analytics is available on Pro and Business plans
                            </h2>
                            <p className="text-[14px] text-slate mb-8 leading-relaxed">
                                Unlock deep insights into your spending patterns, vendor volume, and AI processing metrics to optimize your cash flow.
                            </p>
                            <button
                                onClick={() => setIsPro(true)} // Simulate upgrade
                                className="w-full bg-brand-primary text-white py-3 rounded-[8px] font-medium hover:bg-brand-hover transition-colors shadow-sm text-[15px]"
                            >
                                Upgrade to Pro — $49/mo
                            </button>
                            <p className="text-[12px] text-muted mt-4">Demo: Click button to unlock</p>
                        </div>
                    </div>
                )}

                {/* THE LOCKED/UNLOCKED CONTENT */}
                <div className={`space-y-6 ${!isPro ? "pointer-events-none select-none opacity-40" : ""}`}>

                    {/* STATS ROW */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, i) => {
                            const Icon = stat.icon;
                            return (
                                <div key={i} className="bg-surface border border-border rounded-[12px] p-6 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-[12px] font-medium text-muted uppercase tracking-wider">
                                            {stat.label}
                                        </h3>
                                        <Icon size={16} className="text-brand-primary" />
                                    </div>
                                    <div className="font-mono text-[32px] font-bold text-ink leading-none">
                                        {stat.value}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                        {/* SPENDING BY CATEGORY (Horizontal Bars) */}
                        <div className="xl:col-span-1 bg-surface border border-border rounded-[12px] shadow-sm p-6 flex flex-col">
                            <h2 className="font-heading text-lg font-semibold text-ink mb-6">Spending by Category</h2>
                            <div className="space-y-4 flex-1">
                                {categoryData.map((cat, i) => (
                                    <div key={i} className="flex flex-col gap-1.5 group">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[13px] font-medium text-ink">{cat.name}</span>
                                            <span className="font-mono text-[13px] text-slate">{cat.amount}</span>
                                        </div>
                                        <div className="w-full h-2 bg-surface-raised rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${cat.color} group-hover:brightness-110 transition-all duration-500`}
                                                style={{ width: cat.percent }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="xl:col-span-2 flex flex-col gap-6">

                            {/* MONTHLY TREND (Dual Axis CSS/SVG Chart) */}
                            <div className="bg-surface border border-border rounded-[12px] shadow-sm p-6 flex flex-col">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="font-heading text-lg font-semibold text-ink">Monthly Invoice Volume & Spend</h2>
                                    <div className="flex items-center gap-4 text-[12px] font-medium">
                                        <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-surface-raised border border-border rounded-sm"></div> <span className="text-slate">Volume</span></div>
                                        <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-brand-primary"></div> <span className="text-slate">Spend</span></div>
                                    </div>
                                </div>

                                <div className="relative h-[220px] w-full mt-auto flex items-end justify-between px-4">
                                    {/* Background grid lines */}
                                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                                        {[0, 1, 2, 3].map(i => <div key={i} className="w-full h-px bg-border-subtle"></div>)}
                                    </div>

                                    {/* The SVG Line (Spend) */}
                                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="none">
                                        <polyline
                                            points="8,80 25,70 41,75 58,45 75,30 91,15"
                                            fill="none"
                                            className="stroke-brand-primary"
                                            strokeWidth="2.5"
                                            vectorEffect="non-scaling-stroke"
                                            strokeLinejoin="round"
                                        />
                                        {/* SVG Dots */}
                                        {trendData.map((d, i) => (
                                            <circle key={i} cx={8 + (i * 16.6)} cy={d.spendY} r="4" className="fill-surface stroke-brand-primary" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                                        ))}
                                    </svg>

                                    {/* The Bars (Volume) */}
                                    {trendData.map((d, i) => (
                                        <div key={i} className="flex flex-col items-center gap-3 w-[10%] relative z-0">
                                            <div className="w-full relative bg-surface-raised rounded-t-[4px] flex items-end h-[180px] hover:bg-surface-raised/80 transition-colors cursor-pointer group">
                                                <div
                                                    className="w-full bg-border rounded-t-[4px] group-hover:bg-border-subtle transition-colors"
                                                    style={{ height: `${(d.volume / 150) * 100}%` }}
                                                ></div>
                                                {/* Tooltip */}
                                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-canvas border border-border text-ink text-[11px] font-medium py-1 px-2 rounded-[6px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-elevated z-20">
                                                    {d.volume} invoices
                                                </div>
                                            </div>
                                            <span className="text-[12px] text-muted font-medium">{d.month}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ANOMALY SUMMARY */}
                            <div className="bg-warning-bg border border-warning/30 rounded-[12px] p-5 flex items-start gap-4 shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center shrink-0 border border-warning/20">
                                    <ShieldCheck size={20} className="text-warning" />
                                </div>
                                <div>
                                    <h3 className="font-heading text-[15px] font-semibold text-warning-dark mb-1">Anomaly Detection Active</h3>
                                    <p className="text-[13px] text-warning-dark/80 leading-relaxed font-medium">
                                        This month: <strong className="text-warning-dark">3 duplicates</strong> caught ($1,247 saved) and <strong className="text-warning-dark">5 unusual amount anomalies</strong> flagged for manual review before export.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* VENDOR BREAKDOWN TABLE */}
                    <div className="bg-surface border border-border rounded-[12px] shadow-sm overflow-hidden flex flex-col">
                        <div className="p-5 border-b border-border">
                            <h2 className="font-heading text-lg font-semibold text-ink">Top Vendors by Spend</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-border bg-canvas/50">
                                        <th className="py-3 px-5 text-[12px] font-medium text-muted uppercase tracking-wider">Vendor Name</th>
                                        <th className="py-3 px-5 text-[12px] font-medium text-muted uppercase tracking-wider text-right">Invoice Count</th>
                                        <th className="py-3 px-5 text-[12px] font-medium text-muted uppercase tracking-wider text-right">Total Spend</th>
                                        <th className="py-3 px-5 text-[12px] font-medium text-muted uppercase tracking-wider text-right">Avg Amount</th>
                                        <th className="py-3 px-5 text-[12px] font-medium text-muted uppercase tracking-wider">Last Invoice</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-subtle">
                                    {vendorData.map((v, i) => (
                                        <tr key={i} className="hover:bg-brand-subtle/30 transition-colors">
                                            <td className="py-3.5 px-5 font-sans text-[14px] font-medium text-ink">{v.name}</td>
                                            <td className="py-3.5 px-5 font-mono text-[13px] text-slate text-right">{v.count}</td>
                                            <td className="py-3.5 px-5 font-mono text-[14px] font-medium text-ink text-right">{v.spend}</td>
                                            <td className="py-3.5 px-5 font-mono text-[13px] text-slate text-right">{v.avg}</td>
                                            <td className="py-3.5 px-5 font-sans text-[13px] text-slate">{v.last}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}