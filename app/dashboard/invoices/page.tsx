"use client";

import {
    ArrowDown,
    CheckCircle2,
    ChevronDown,
    Download,
    Eye,
    FileText,
    Filter,
    MoreHorizontal,
    Pencil,
    Plus,
    Search,
    Trash2
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// --- DUMMY DATA ---
const initialInvoices = [
    { id: "INV-0847", vendor: "Acme Corp", date: "Oct 24, 2023", amount: "$1,240.00", category: "Software", confidence: 98, status: "Approved" },
    { id: "INV-0848", vendor: "Stripe", date: "Oct 24, 2023", amount: "$342.50", category: "Processing", confidence: 99, status: "Exported" },
    { id: "INV-0849", vendor: "AWS Web Services", date: "Oct 23, 2023", amount: "$4,102.80", category: "Cloud Services", confidence: 82, status: "Pending Review" },
    { id: "INV-0850", vendor: "WeWork", date: "Oct 22, 2023", amount: "$850.00", category: "Rent", confidence: 95, status: "Approved" },
    { id: "INV-0851", vendor: "Uber Eats", date: "Oct 22, 2023", amount: "$42.10", category: "Travel", confidence: 64, status: "Flagged" },
    { id: "INV-0852", vendor: "Adobe Systems", date: "Oct 21, 2023", amount: "$54.99", category: "Software", confidence: 97, status: "Exported" },
    { id: "INV-0853", vendor: "Mailchimp", date: "Oct 20, 2023", amount: "$120.00", category: "Marketing", confidence: 96, status: "Approved" },
    { id: "INV-0854", vendor: "Delta Airlines", date: "Oct 19, 2023", amount: "$450.00", category: "Travel", confidence: 88, status: "Pending Review" },
];

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState(initialInvoices);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isFilterActive, setIsFilterActive] = useState(false); // Toggle to show "Clear filters"

    // --- SELECTION LOGIC ---
    const toggleSelectAll = () => {
        if (selectedIds.length === invoices.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(invoices.map(inv => inv.id));
        }
    };

    const toggleSelect = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    // --- STYLING HELPERS ---
    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Approved": return "bg-success-bg text-success border-success/20";
            case "Exported": return "bg-info-bg text-info border-info/20";
            case "Pending Review": return "bg-warning-bg text-warning border-warning/20";
            case "Flagged": return "bg-danger-bg text-danger border-danger/20";
            default: return "bg-surface-raised text-slate border-border";
        }
    };

    const getConfidenceColor = (conf: number) => {
        if (conf >= 95) return "text-success";
        if (conf >= 85) return "text-warning";
        return "text-danger";
    };

    // --- EMPTY STATE RENDERING ---
    if (invoices.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] max-w-md mx-auto text-center space-y-4">
                <div className="w-20 h-20 bg-surface border border-border rounded-full flex items-center justify-center mb-2 shadow-sm">
                    <FileText size={48} strokeWidth={1} className="text-muted" />
                </div>
                <h2 className="font-heading text-[20px] font-semibold text-ink">No invoices yet</h2>
                <p className="font-sans text-[14px] text-slate pb-4">
                    Upload your first invoice to get started. Our AI will automatically extract the vendor, amount, and line items.
                </p>
                <Link
                    href="/dashboard/upload"
                    className="bg-brand-primary text-white px-6 py-2.5 rounded-[8px] font-medium hover:bg-brand-hover transition-colors shadow-sm flex items-center gap-2"
                >
                    <Plus size={18} />
                    Upload Invoices
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-[1600px] mx-auto space-y-6 pb-12">

            {/* HEADER ROW */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="flex items-baseline gap-3">
                    <h1 className="font-heading text-[28px] font-bold text-ink leading-tight">Invoices</h1>
                    <span className="font-sans text-[14px] font-medium text-muted bg-surface border border-border px-2.5 py-0.5 rounded-full">
                        247 total
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        disabled={selectedIds.length === 0}
                        className="bg-surface border border-border text-ink px-4 py-2.5 rounded-[8px] font-medium hover:bg-surface-raised transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Download size={18} />
                        Export Selected
                    </button>
                    <Link
                        href="/dashboard/upload"
                        className="bg-brand-primary text-white px-4 py-2.5 rounded-[8px] font-medium hover:bg-brand-hover transition-colors flex items-center gap-2 shadow-sm"
                    >
                        <Plus size={18} />
                        Upload New
                    </Link>
                </div>
            </div>

            {/* FILTER BAR (48px height) */}
            <div className="h-[48px] flex items-center gap-3">
                {/* Search */}
                <div className="relative h-full w-[300px]">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                    <input
                        type="text"
                        placeholder="Search vendor, invoice #, amount..."
                        className="w-full h-full bg-surface border border-border rounded-[8px] pl-9 pr-4 text-[13px] text-ink placeholder:text-muted focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-sm"
                    />
                </div>

                {/* Status Dropdown (Custom styled select) */}
                <div className="relative h-full min-w-[140px]">
                    <select className="w-full h-full appearance-none bg-surface border border-border rounded-[8px] pl-4 pr-10 text-[13px] font-medium text-ink focus:outline-none focus:border-brand-primary transition-colors shadow-sm cursor-pointer">
                        <option>All Statuses</option>
                        <option>Pending Review</option>
                        <option>Approved</option>
                        <option>Flagged</option>
                        <option>Exported</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                </div>

                {/* Category Dropdown */}
                <div className="relative h-full min-w-[140px]">
                    <select className="w-full h-full appearance-none bg-surface border border-border rounded-[8px] pl-4 pr-10 text-[13px] font-medium text-ink focus:outline-none focus:border-brand-primary transition-colors shadow-sm cursor-pointer">
                        <option>All Categories</option>
                        <option>Software</option>
                        <option>Travel</option>
                        <option>Office</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                </div>

                {/* Date Range Dropdown */}
                <div className="relative h-full min-w-[140px]">
                    <select className="w-full h-full appearance-none bg-surface border border-border rounded-[8px] pl-4 pr-10 text-[13px] font-medium text-ink focus:outline-none focus:border-brand-primary transition-colors shadow-sm cursor-pointer">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>This month</option>
                        <option>Custom range...</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                </div>

                {/* Clear Filters (Simulated active state) */}
                <button
                    onClick={() => setIsFilterActive(!isFilterActive)}
                    className="text-[13px] font-medium text-brand-primary hover:text-brand-hover hover:underline underline-offset-2 px-2 transition-all"
                >
                    {isFilterActive ? "Clear filters" : <span className="text-slate flex items-center gap-1.5 hover:text-ink"><Filter size={14} /> More Filters</span>}
                </button>
            </div>

            {/* TABLE CONTAINER */}
            <div className="bg-surface border border-border rounded-[12px] shadow-sm flex flex-col relative overflow-hidden">

                {/* BULK ACTIONS BAR (Slides down purely via CSS when rows are selected) */}
                <div className={`absolute top-0 left-0 w-full bg-brand-primary/10 border-b border-brand-primary/20 flex items-center justify-between px-5 transition-all duration-300 z-10 ${selectedIds.length > 0 ? "h-14 opacity-100" : "h-0 opacity-0 overflow-hidden"
                    }`}>
                    <div className="flex items-center gap-2">
                        <div className="bg-brand-primary text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                            {selectedIds.length}
                        </div>
                        <span className="text-[13px] font-medium text-brand-primary">invoices selected</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="text-[13px] font-medium text-success hover:bg-success/10 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5">
                            <CheckCircle2 size={16} /> Approve
                        </button>
                        <button className="text-[13px] font-medium text-info hover:bg-info/10 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5">
                            <Download size={16} /> Export
                        </button>
                        <div className="w-px h-4 bg-brand-primary/20 mx-1"></div>
                        <button className="text-[13px] font-medium text-danger hover:bg-danger/10 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5">
                            <Trash2 size={16} /> Delete
                        </button>
                    </div>
                </div>

                {/* MOBILE CARD LIST (hidden on md+) */}
                <div className="md:hidden divide-y divide-border-subtle">
                    {invoices.map((inv) => (
                        <Link
                            key={inv.id}
                            href={`/dashboard/invoices/${inv.id}`}
                            className="flex items-center justify-between px-4 py-3.5 hover:bg-brand-subtle/20 transition-colors"
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[14px] font-medium text-ink truncate">{inv.vendor}</span>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border shrink-0 ${getStatusStyle(inv.status)}`}>
                                        {inv.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-[12px] text-slate">
                                    <span className="font-mono">{inv.id}</span>
                                    <span>·</span>
                                    <span>{inv.date}</span>
                                    <span>·</span>
                                    <span className={`font-mono font-medium ${getConfidenceColor(inv.confidence)}`}>{inv.confidence}%</span>
                                </div>
                            </div>
                            <span className="font-mono text-[15px] font-semibold text-ink ml-4 shrink-0">{inv.amount}</span>
                        </Link>
                    ))}
                </div>

                {/* TABLE (hidden on mobile) */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border bg-canvas/50">
                                <th className="py-3.5 px-5 w-12">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.length === invoices.length && invoices.length > 0}
                                        onChange={toggleSelectAll}
                                        className="w-4 h-4 rounded border-border-subtle bg-canvas text-brand-primary focus:ring-brand-primary cursor-pointer"
                                    />
                                </th>
                                <th className="py-3.5 px-5 text-[12px] font-medium text-muted uppercase tracking-wider cursor-pointer hover:text-ink transition-colors group">
                                    <div className="flex items-center gap-1.5">Vendor</div>
                                </th>
                                <th className="py-3.5 px-5 text-[12px] font-medium text-muted uppercase tracking-wider">Invoice #</th>
                                <th className="py-3.5 px-5 text-[12px] font-medium text-muted uppercase tracking-wider cursor-pointer hover:text-ink transition-colors group">
                                    <div className="flex items-center gap-1.5">Date <ArrowDown size={12} className="text-brand-primary" /></div>
                                </th>
                                <th className="py-3.5 px-5 text-[12px] font-medium text-muted uppercase tracking-wider text-right">Amount</th>
                                <th className="py-3.5 px-5 text-[12px] font-medium text-muted uppercase tracking-wider">Category</th>
                                <th className="py-3.5 px-5 text-[12px] font-medium text-muted uppercase tracking-wider">Confidence</th>
                                <th className="py-3.5 px-5 text-[12px] font-medium text-muted uppercase tracking-wider">Status</th>
                                <th className="py-3.5 px-5 w-24"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {invoices.map((inv) => {
                                const isSelected = selectedIds.includes(inv.id);
                                return (
                                    <tr
                                        key={inv.id}
                                        className={`transition-colors group ${isSelected ? "bg-brand-subtle/30" : "hover:bg-brand-subtle/20"}`}
                                    >
                                        <td className="py-3 px-5">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => toggleSelect(inv.id)}
                                                className="w-4 h-4 rounded border-border-subtle bg-canvas text-brand-primary focus:ring-brand-primary cursor-pointer"
                                            />
                                        </td>
                                        <td className="py-3 px-5">
                                            <Link href={`/dashboard/invoices/${inv.id}`} className="font-sans text-[14px] font-medium text-ink hover:text-brand-primary transition-colors">
                                                {inv.vendor}
                                            </Link>
                                        </td>
                                        <td className="py-3 px-5 font-mono text-[13px] text-muted">{inv.id}</td>
                                        <td className="py-3 px-5 font-sans text-[13px] text-slate">{inv.date}</td>
                                        <td className="py-3 px-5 font-mono text-[14px] font-medium text-ink text-right">{inv.amount}</td>
                                        <td className="py-3 px-5">
                                            <span className="inline-flex items-center px-2 py-1 rounded-[6px] bg-brand-subtle text-brand-primary text-[11px] font-medium tracking-wide">
                                                {inv.category}
                                            </span>
                                        </td>
                                        <td className="py-3 px-5 font-mono text-[13px] font-medium">
                                            <span className={getConfidenceColor(inv.confidence)}>{inv.confidence}%</span>
                                        </td>
                                        <td className="py-3 px-5">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${getStatusStyle(inv.status)}`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-5 text-right">
                                            {/* HOVER ACTIONS (Pure CSS) */}
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 text-slate hover:text-brand-primary hover:bg-brand-subtle rounded-md transition-colors" title="View Details">
                                                    <Eye size={16} />
                                                </button>
                                                <button className="p-1.5 text-slate hover:text-brand-primary hover:bg-brand-subtle rounded-md transition-colors" title="Edit">
                                                    <Pencil size={16} />
                                                </button>
                                                <button className="p-1.5 text-slate hover:text-ink hover:bg-surface-raised rounded-md transition-colors" title="More Options">
                                                    <MoreHorizontal size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                <div className="p-4 border-t border-border bg-canvas/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[13px] text-slate">
                        Showing <span className="font-medium text-ink">1</span> to <span className="font-medium text-ink">25</span> of <span className="font-medium text-ink">247</span> invoices
                    </p>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-[13px] text-slate">Rows per page:</span>
                            <select className="bg-surface border border-border rounded-md text-[13px] text-ink px-2 py-1 focus:outline-none focus:border-brand-primary">
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-1">
                            <button disabled className="px-3 py-1 border border-border rounded-md text-[13px] font-medium text-muted bg-surface/50 cursor-not-allowed">
                                Previous
                            </button>
                            <button className="px-3 py-1 border border-border rounded-md text-[13px] font-medium text-ink bg-surface hover:bg-surface-raised transition-colors">
                                1
                            </button>
                            <button className="px-3 py-1 border border-transparent rounded-md text-[13px] font-medium text-slate hover:bg-surface-raised transition-colors">
                                2
                            </button>
                            <button className="px-3 py-1 border border-transparent rounded-md text-[13px] font-medium text-slate hover:bg-surface-raised transition-colors">
                                3
                            </button>
                            <span className="text-muted px-1">...</span>
                            <button className="px-3 py-1 border border-border rounded-md text-[13px] font-medium text-ink bg-surface hover:bg-surface-raised transition-colors">
                                Next
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}