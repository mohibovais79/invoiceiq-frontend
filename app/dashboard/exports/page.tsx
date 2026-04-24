"use client";

import {
    Calendar,
    ChevronDown,
    Download,
    FileJson,
    FileSpreadsheet,
    FileText
} from "lucide-react";
import { useState } from "react";

// --- DUMMY DATA ---
const exportHistory = [
    { id: 1, name: "qb_export_oct_2023.csv", format: "QuickBooks CSV", date: "Oct 24, 2023, 10:42 AM", count: 142, size: "128 KB" },
    { id: 2, name: "xero_export_q3.csv", format: "Xero CSV", date: "Oct 15, 2023, 04:15 PM", count: 315, size: "294 KB" },
    { id: 3, name: "raw_data_backup.json", format: "JSON", date: "Oct 01, 2023, 09:00 AM", count: 480, size: "1.2 MB" },
    { id: 4, name: "qb_export_sep_2023.csv", format: "QuickBooks CSV", date: "Sep 30, 2023, 11:20 AM", count: 185, size: "165 KB" },
    { id: 5, name: "audit_pull_q2.json", format: "JSON", date: "Aug 15, 2023, 02:30 PM", count: 512, size: "1.4 MB" },
    { id: 6, name: "xero_export_aug.csv", format: "Xero CSV", date: "Aug 01, 2023, 10:05 AM", count: 190, size: "172 KB" },
    { id: 7, name: "qb_export_jul_2023.csv", format: "QuickBooks CSV", date: "Jul 31, 2023, 03:45 PM", count: 210, size: "188 KB" },
    { id: 8, name: "xero_export_jul.csv", format: "Xero CSV", date: "Jul 15, 2023, 09:12 AM", count: 85, size: "76 KB" },
    { id: 9, name: "mid_year_backup.json", format: "JSON", date: "Jul 01, 2023, 12:00 PM", count: 1042, size: "3.1 MB" },
    { id: 10, name: "qb_export_jun_2023.csv", format: "QuickBooks CSV", date: "Jun 30, 2023, 04:50 PM", count: 175, size: "155 KB" },
];

export default function ExportsPage() {
    const [isExporting, setIsExporting] = useState<string | null>(null);

    // Simulated download function
    const handleExport = (format: string) => {
        setIsExporting(format);
        setTimeout(() => {
            setIsExporting(null);
        }, 1500);
    };

    return (
        <div className="max-w-[1200px] mx-auto space-y-8 pb-12">

            {/* HEADER AREA */}
            <div>
                <h1 className="font-heading text-[28px] font-bold text-ink leading-tight">Exports</h1>
                <p className="font-sans text-[14px] text-slate mt-1">
                    Download your processed invoice data in accounting-ready formats.
                </p>
            </div>

            {/* EXPORT CARDS (3-COLUMN GRID) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* CARD 1: QuickBooks */}
                <div className="bg-surface border border-border rounded-[12px] p-6 shadow-sm flex flex-col h-full">
                    <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-5 shrink-0 border border-success/20">
                        <FileSpreadsheet size={24} className="text-success" />
                    </div>

                    <h2 className="font-heading text-[16px] font-semibold text-ink mb-2">QuickBooks CSV</h2>
                    <p className="text-[13px] text-slate mb-5 flex-1 leading-relaxed">
                        Formatted specifically for QuickBooks Online import. Maps vendor, amount, date, category, and memo fields automatically.
                    </p>

                    <div className="space-y-4 mt-auto">
                        <div className="flex items-center gap-1.5 text-[12px] font-medium text-success bg-success/5 px-2.5 py-1.5 rounded-md border border-success/10">
                            <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                            223 approved invoices ready
                        </div>

                        <div className="relative">
                            <select className="w-full appearance-none bg-canvas border border-border-subtle rounded-[8px] pl-9 pr-10 py-2.5 text-[13px] font-medium text-ink focus:outline-none focus:border-brand-primary transition-colors shadow-sm cursor-pointer">
                                <option>This Month</option>
                                <option>Last Month</option>
                                <option>Last 3 Months</option>
                                <option>All Un-exported</option>
                            </select>
                            <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                        </div>

                        <button
                            onClick={() => handleExport('qb')}
                            disabled={isExporting !== null}
                            className="w-full bg-surface-raised border border-border text-ink py-2.5 rounded-[8px] font-medium hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-colors shadow-sm flex justify-center items-center gap-2 disabled:opacity-50"
                        >
                            {isExporting === 'qb' ? "Generating..." : "Download .csv"}
                        </button>
                    </div>
                </div>

                {/* CARD 2: Xero */}
                <div className="bg-surface border border-border rounded-[12px] p-6 shadow-sm flex flex-col h-full">
                    <div className="w-12 h-12 rounded-full bg-info/10 flex items-center justify-center mb-5 shrink-0 border border-info/20">
                        <FileSpreadsheet size={24} className="text-info" />
                    </div>

                    <h2 className="font-heading text-[16px] font-semibold text-ink mb-2">Xero CSV</h2>
                    <p className="text-[13px] text-slate mb-5 flex-1 leading-relaxed">
                        Compatible with the Xero bulk bill import tool. Accurately maps to Xero's contact, reference, date, and account code fields.
                    </p>

                    <div className="space-y-4 mt-auto">
                        <div className="flex items-center gap-1.5 text-[12px] font-medium text-success bg-success/5 px-2.5 py-1.5 rounded-md border border-success/10">
                            <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                            223 approved invoices ready
                        </div>

                        <div className="relative">
                            <select className="w-full appearance-none bg-canvas border border-border-subtle rounded-[8px] pl-9 pr-10 py-2.5 text-[13px] font-medium text-ink focus:outline-none focus:border-brand-primary transition-colors shadow-sm cursor-pointer">
                                <option>This Month</option>
                                <option>Last Month</option>
                                <option>Last 3 Months</option>
                                <option>All Un-exported</option>
                            </select>
                            <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                        </div>

                        <button
                            onClick={() => handleExport('xero')}
                            disabled={isExporting !== null}
                            className="w-full bg-surface-raised border border-border text-ink py-2.5 rounded-[8px] font-medium hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-colors shadow-sm flex justify-center items-center gap-2 disabled:opacity-50"
                        >
                            {isExporting === 'xero' ? "Generating..." : "Download .csv"}
                        </button>
                    </div>
                </div>

                {/* CARD 3: Raw JSON */}
                <div className="bg-surface border border-border rounded-[12px] p-6 shadow-sm flex flex-col h-full">
                    <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center mb-5 shrink-0 border border-brand-primary/20">
                        <FileJson size={24} className="text-brand-primary" />
                    </div>

                    <h2 className="font-heading text-[16px] font-semibold text-ink mb-2">Full JSON Export</h2>
                    <p className="text-[13px] text-slate mb-5 flex-1 leading-relaxed">
                        Complete extracted data including confidence scores, flags, line items, and raw metadata. Best for custom API integrations.
                    </p>

                    <div className="space-y-4 mt-auto">
                        <div className="flex items-center gap-1.5 text-[12px] font-medium text-brand-primary bg-brand-primary/5 px-2.5 py-1.5 rounded-md border border-brand-primary/10">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary"></div>
                            Includes all 247 invoices
                        </div>

                        <div className="relative">
                            <select className="w-full appearance-none bg-canvas border border-border-subtle rounded-[8px] pl-9 pr-10 py-2.5 text-[13px] font-medium text-ink focus:outline-none focus:border-brand-primary transition-colors shadow-sm cursor-pointer">
                                <option>This Month</option>
                                <option>Last Month</option>
                                <option>Last 3 Months</option>
                                <option>Everything (All Time)</option>
                            </select>
                            <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                        </div>

                        <button
                            onClick={() => handleExport('json')}
                            disabled={isExporting !== null}
                            className="w-full bg-brand-primary text-white py-2.5 rounded-[8px] font-medium hover:bg-brand-hover transition-colors shadow-sm flex justify-center items-center gap-2 disabled:opacity-70"
                        >
                            {isExporting === 'json' ? "Generating..." : "Download .json"}
                        </button>
                    </div>
                </div>

            </div>

            {/* EXPORT HISTORY TABLE */}
            <div className="bg-surface border border-border rounded-[12px] shadow-sm overflow-hidden flex flex-col mt-8">
                <div className="p-5 border-b border-border">
                    <h2 className="font-heading text-lg font-semibold text-ink">Export History</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border bg-canvas/50">
                                <th className="py-3 px-5 text-[12px] font-medium text-muted uppercase tracking-wider">File Name</th>
                                <th className="py-3 px-5 text-[12px] font-medium text-muted uppercase tracking-wider">Format</th>
                                <th className="py-3 px-5 text-[12px] font-medium text-muted uppercase tracking-wider">Date</th>
                                <th className="py-3 px-5 text-[12px] font-medium text-muted uppercase tracking-wider text-right">Invoices</th>
                                <th className="py-3 px-5 text-[12px] font-medium text-muted uppercase tracking-wider text-right">Size</th>
                                <th className="py-3 px-5 w-16"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {exportHistory.map((item) => (
                                <tr key={item.id} className="hover:bg-brand-subtle/30 transition-colors group">
                                    <td className="py-3.5 px-5">
                                        <div className="flex items-center gap-2">
                                            {item.format.includes("JSON") ? (
                                                <FileJson size={14} className="text-muted" />
                                            ) : (
                                                <FileText size={14} className="text-muted" />
                                            )}
                                            <span className="font-mono text-[13px] font-medium text-ink">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-3.5 px-5">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-medium ${item.format.includes("QuickBooks") ? "bg-success/10 text-success border border-success/20" :
                                            item.format.includes("Xero") ? "bg-info/10 text-info border border-info/20" :
                                                "bg-brand-primary/10 text-brand-primary border border-brand-primary/20"
                                            }`}>
                                            {item.format}
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-5 font-sans text-[13px] text-slate">{item.date}</td>
                                    <td className="py-3.5 px-5 font-mono text-[13px] text-slate text-right">{item.count}</td>
                                    <td className="py-3.5 px-5 font-mono text-[13px] text-slate text-right">{item.size}</td>
                                    <td className="py-3.5 px-5 text-right">
                                        <button
                                            className="p-1.5 text-slate hover:text-brand-primary hover:bg-brand-subtle rounded-md transition-colors opacity-0 group-hover:opacity-100"
                                            title="Download again"
                                        >
                                            <Download size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}