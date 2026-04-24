"use client";

import {
    AlertTriangle,
    ArrowLeft,
    Check,
    CheckCircle2,
    ChevronLeft, ChevronRight,
    Download,
    Edit2,
    Maximize,
    Plus, Trash2,
    X,
    ZoomIn, ZoomOut
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// --- DUMMY DATA ---
const initialFields = [
    { id: "vendor_name", label: "Vendor Name", value: "AWS Web Services", confidence: 98, isAmount: false, manual: false, bounds: { top: "12%", left: "10%", width: "35%", height: "6%" } },
    { id: "invoice_number", label: "Invoice Number", value: "INV-0849", confidence: 95, isAmount: false, manual: false, bounds: { top: "12%", left: "70%", width: "20%", height: "4%" } },
    { id: "invoice_date", label: "Invoice Date", value: "Oct 23, 2023", confidence: 99, isAmount: false, manual: false, bounds: { top: "17%", left: "70%", width: "20%", height: "4%" } },
    { id: "due_date", label: "Due Date", value: "Nov 23, 2023", confidence: 65, isAmount: false, manual: false, bounds: { top: "22%", left: "70%", width: "20%", height: "4%" } }, // Low confidence example
    { id: "po_number", label: "Purchase Order #", value: "PO-2023-11A", confidence: 88, isAmount: false, manual: false, bounds: { top: "27%", left: "70%", width: "20%", height: "4%" } },
    { id: "subtotal", label: "Subtotal", value: "$3,800.00", confidence: 99, isAmount: true, manual: false, bounds: { top: "75%", left: "70%", width: "20%", height: "4%" } },
    { id: "tax_amount", label: "Tax Amount", value: "$302.80", confidence: 92, isAmount: true, manual: false, bounds: { top: "80%", left: "70%", width: "20%", height: "4%" } },
    { id: "total", label: "Total", value: "$4,102.80", confidence: 99, isAmount: true, manual: false, bounds: { top: "86%", left: "65%", width: "25%", height: "6%" } },
];

const initialLineItems = [
    { id: 1, desc: "EC2 Compute Instances (us-east-1)", qty: "1", price: "$2,400.00", total: "$2,400.00" },
    { id: 2, desc: "S3 Standard Storage", qty: "1", price: "$850.00", total: "$850.00" },
    { id: 3, desc: "RDS Database Hosting", qty: "1", price: "$550.00", total: "$550.00" },
];

export default function InvoiceDetailPage() {
    const [fields, setFields] = useState(initialFields);
    const [flags, setFlags] = useState([
        "Possible duplicate — similar to INV-0412 from same vendor ($4,102.80 on Sep 23)",
        "Low confidence on Due Date field — manual review recommended"
    ]);
    const [selectedCategory, setSelectedCategory] = useState("Cloud Services");
    const [status, setStatus] = useState<"Pending Review" | "Approved" | "Flagged">("Pending Review");
    const [hoveredFieldId, setHoveredFieldId] = useState<string | null>(null);
    const [mobileTab, setMobileTab] = useState<"preview" | "data">("data");

    // --- HANDLERS ---
    const dismissFlag = (indexToRemove: number) => {
        setFlags(flags.filter((_, i) => i !== indexToRemove));
    };

    const handleFieldSave = (id: string, newValue: string) => {
        setFields(fields.map(f =>
            f.id === id ? { ...f, value: newValue, manual: true } : f
        ));
    };

    // --- SUB-COMPONENTS ---
    // We build a mini-component for the row to handle its own inline-editing state cleanly
    const ExtractedFieldRow = ({ field }: { field: typeof fields[0] }) => {
        const [isEditing, setIsEditing] = useState(false);
        const [editValue, setEditValue] = useState(field.value);

        const onSave = () => {
            handleFieldSave(field.id, editValue);
            setIsEditing(false);
        };

        const getDotColor = () => {
            if (field.manual) return "bg-slate"; // Gray for manual override
            if (field.confidence >= 95) return "bg-success";
            if (field.confidence >= 80) return "bg-warning";
            return "bg-danger";
        };

        return (
            <div
                className="group flex items-center justify-between py-2.5 px-3 -mx-3 rounded-md hover:bg-surface-raised transition-colors border border-transparent hover:border-border-subtle"
                onMouseEnter={() => setHoveredFieldId(field.id)}
                onMouseLeave={() => setHoveredFieldId(null)}
            >
                <div className="flex items-center gap-3 w-1/3">
                    <div className={`w-2 h-2 rounded-full ${getDotColor()}`} title={field.manual ? "Manually verified" : `${field.confidence}% confidence`} />
                    <span className="text-[12px] font-medium text-muted uppercase tracking-wider">{field.label}</span>
                </div>

                <div className="flex-1 flex justify-end items-center gap-3">
                    {isEditing ? (
                        <div className="flex items-center gap-2 w-full max-w-[200px]">
                            <input
                                autoFocus
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className={`w-full bg-canvas border border-brand-primary rounded px-2 py-1 text-[13px] text-ink focus:outline-none focus:ring-1 focus:ring-brand-primary ${field.isAmount ? 'font-mono text-right' : 'font-sans'}`}
                                onKeyDown={(e) => e.key === 'Enter' && onSave()}
                            />
                            <button onClick={onSave} className="text-success hover:bg-success/10 p-1 rounded"><Check size={14} /></button>
                            <button onClick={() => { setIsEditing(false); setEditValue(field.value); }} className="text-danger hover:bg-danger/10 p-1 rounded"><X size={14} /></button>
                        </div>
                    ) : (
                        <>
                            <span className={`text-[14px] font-medium text-ink truncate ${field.isAmount ? 'font-mono' : 'font-sans'}`}>
                                {field.value}
                            </span>
                            {field.manual && <span className="text-[10px] font-medium bg-surface border border-border text-slate px-1.5 py-0.5 rounded ml-2">Manual</span>}
                            <button
                                onClick={() => setIsEditing(true)}
                                className="opacity-0 group-hover:opacity-100 p-1.5 text-slate hover:text-brand-primary hover:bg-brand-subtle rounded-md transition-all shrink-0"
                            >
                                <Edit2 size={14} />
                            </button>
                        </>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex flex-col bg-canvas">

            {/* TOP NAV BAR */}
            <div className="h-[60px] border-b border-border bg-surface px-6 flex items-center shrink-0 sticky top-0 z-20">
                <Link href="/dashboard/invoices" className="flex items-center gap-2 text-[14px] font-medium text-slate hover:text-ink transition-colors px-3 py-1.5 -ml-3 rounded-md hover:bg-surface-raised">
                    <ArrowLeft size={16} /> Back to Invoices
                </Link>
            </div>

            {/* MOBILE TAB SWITCHER */}
            <div className="lg:hidden flex border-b border-border bg-surface shrink-0">
                <button
                    onClick={() => setMobileTab("data")}
                    className={`flex-1 py-3 text-[13px] font-medium transition-colors ${mobileTab === "data" ? "text-brand-primary border-b-2 border-brand-primary" : "text-slate"}`}
                >
                    Extracted Data
                </button>
                <button
                    onClick={() => setMobileTab("preview")}
                    className={`flex-1 py-3 text-[13px] font-medium transition-colors ${mobileTab === "preview" ? "text-brand-primary border-b-2 border-brand-primary" : "text-slate"}`}
                >
                    Document Preview
                </button>
            </div>

            {/* TWO COLUMN SPLIT */}
            <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">

                {/* LEFT COLUMN: PREVIEW (55%) */}
                <div className={`w-full lg:w-[55%] border-r border-border bg-canvas flex-col relative ${mobileTab === "preview" ? "flex" : "hidden lg:flex"}`}>

                    {/* Toolbar */}
                    <div className="h-12 border-b border-border bg-surface flex items-center justify-between px-4 shrink-0">
                        <div className="flex items-center gap-1 text-slate">
                            <button className="p-1.5 hover:bg-surface-raised hover:text-ink rounded-md transition-colors"><ZoomOut size={16} /></button>
                            <span className="text-[12px] font-medium font-mono px-2">100%</span>
                            <button className="p-1.5 hover:bg-surface-raised hover:text-ink rounded-md transition-colors"><ZoomIn size={16} /></button>
                            <div className="w-px h-4 bg-border mx-2"></div>
                            <button className="p-1.5 hover:bg-surface-raised hover:text-ink rounded-md transition-colors" title="Fit to width"><Maximize size={16} /></button>
                        </div>

                        <div className="flex items-center gap-4 text-slate">
                            <div className="flex items-center gap-2">
                                <button className="p-1 hover:text-ink transition-colors disabled:opacity-30"><ChevronLeft size={16} /></button>
                                <span className="text-[12px] font-medium">Page 1 of 1</span>
                                <button className="p-1 hover:text-ink transition-colors disabled:opacity-30"><ChevronRight size={16} /></button>
                            </div>
                            <div className="w-px h-4 bg-border"></div>
                            <button className="flex items-center gap-1.5 text-[12px] font-medium hover:text-ink transition-colors">
                                <Download size={14} /> Original
                            </button>
                        </div>
                    </div>

                    {/* Document Viewer Area */}
                    <div className="flex-1 overflow-auto p-8 flex justify-center bg-canvas relative group">

                        {/* Mock PDF Document Wrapper */}
                        <div className="w-full max-w-[800px] aspect-[1/1.4] bg-white rounded shadow-elevated relative overflow-hidden ring-1 ring-border">
                            {/* Mock Invoice Visuals (Pure CSS for demo) */}
                            <div className="absolute top-[12%] left-[10%] text-brand-dark font-bold text-3xl font-heading">AWS Web Services</div>
                            <div className="absolute top-[12%] right-[10%] text-right">
                                <div className="text-brand-dark font-bold text-xl">INVOICE</div>
                                <div className="text-gray-500 font-mono text-sm mt-1">INV-0849</div>
                            </div>
                            <div className="absolute top-[28%] left-[10%] right-[10%] border-b-2 border-gray-200"></div>
                            {/* End Mock Visuals */}

                            {/* MAGICAL HOVER HIGHLIGHTS */}
                            {fields.map((field) => (
                                <div
                                    key={`highlight-${field.id}`}
                                    className={`absolute transition-all duration-200 pointer-events-none border-2 rounded-sm ${hoveredFieldId === field.id
                                        ? "border-brand-primary bg-brand-primary/20 z-10 opacity-100 scale-100"
                                        : "border-brand-primary/0 bg-brand-primary/0 opacity-0 scale-95"
                                        }`}
                                    style={field.bounds}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: EXTRACTED DATA (45%) */}
                <div className={`w-full lg:w-[45%] bg-surface flex-col relative h-full max-h-[calc(100vh-124px)] ${mobileTab === "data" ? "flex" : "hidden lg:flex"}`}>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-24">

                        {/* Header */}
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="font-heading text-[24px] font-bold text-ink">AWS Web Services</h1>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-warning-bg text-warning text-[12px] font-medium border border-warning/20">
                                        <div className="w-1.5 h-1.5 rounded-full bg-warning"></div> 82% overall confidence
                                    </span>
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium border ${status === "Approved" ? "bg-success-bg text-success border-success/20" :
                                        status === "Flagged" ? "bg-danger-bg text-danger border-danger/20" :
                                            "bg-warning-bg text-warning border-warning/20"
                                        }`}>
                                        {status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Flags & Alerts (Conditional) */}
                        {flags.length > 0 && (
                            <div className="bg-warning-bg border border-warning/30 rounded-[12px] overflow-hidden shadow-sm">
                                {flags.map((flag, idx) => (
                                    <div key={idx} className={`p-4 flex items-start gap-3 ${idx !== flags.length - 1 ? 'border-b border-warning/20' : ''}`}>
                                        <AlertTriangle size={18} className="text-warning shrink-0 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-[13px] text-warning-dark leading-relaxed font-medium">{flag}</p>
                                            <button onClick={() => dismissFlag(idx)} className="text-[12px] font-semibold text-warning hover:text-warning-dark mt-1.5 underline underline-offset-2 transition-colors">
                                                Dismiss
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Extracted Fields */}
                        <div className="bg-canvas border border-border rounded-[12px] p-5 shadow-sm">
                            <h3 className="text-[14px] font-semibold text-ink mb-4 border-b border-border pb-2">Invoice Details</h3>
                            <div className="flex flex-col gap-1">
                                {fields.map(field => <ExtractedFieldRow key={field.id} field={field} />)}
                            </div>
                        </div>

                        {/* Line Items */}
                        <div className="bg-canvas border border-border rounded-[12px] p-5 shadow-sm overflow-hidden">
                            <h3 className="text-[14px] font-semibold text-ink mb-4 border-b border-border pb-2">Line Items ({initialLineItems.length})</h3>
                            <table className="w-full text-left border-collapse mb-2">
                                <thead>
                                    <tr className="border-b border-border-subtle">
                                        <th className="py-2 text-[11px] font-medium text-muted uppercase tracking-wider">Description</th>
                                        <th className="py-2 text-[11px] font-medium text-muted uppercase tracking-wider text-right">Qty</th>
                                        <th className="py-2 text-[11px] font-medium text-muted uppercase tracking-wider text-right">Unit Price</th>
                                        <th className="py-2 text-[11px] font-medium text-muted uppercase tracking-wider text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-subtle">
                                    {initialLineItems.map(item => (
                                        <tr key={item.id} className="group cursor-pointer hover:bg-surface-raised transition-colors">
                                            <td className="py-2.5 text-[13px] text-ink font-medium">{item.desc}</td>
                                            <td className="py-2.5 text-[13px] text-slate font-mono text-right">{item.qty}</td>
                                            <td className="py-2.5 text-[13px] text-slate font-mono text-right">{item.price}</td>
                                            <td className="py-2.5 text-[13px] text-ink font-mono font-medium text-right">{item.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className="flex items-center gap-1.5 text-[13px] font-medium text-brand-primary hover:text-brand-hover transition-colors mt-3">
                                <Plus size={14} /> Add Line Item
                            </button>
                        </div>

                        {/* Expense Category */}
                        <div className="bg-canvas border border-border rounded-[12px] p-5 shadow-sm">
                            <h3 className="text-[14px] font-semibold text-ink mb-3">Expense Category</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Software", "Cloud Services", "Office Supplies", "Travel", "Marketing"].map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${selectedCategory === cat
                                            ? "bg-brand-primary text-white border border-brand-primary"
                                            : "bg-surface border border-border text-slate hover:bg-surface-raised hover:text-ink"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                                <button className="px-3 py-1.5 rounded-full text-[12px] font-medium bg-surface border border-border border-dashed text-muted hover:bg-surface-raised hover:text-ink transition-colors">
                                    Custom...
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* STICKY ACTION BAR */}
                    <div className="absolute bottom-0 left-0 w-full bg-surface/90 backdrop-blur-md border-t border-border p-4 flex items-center justify-between z-10">
                        <button className="flex items-center gap-2 text-[14px] font-medium text-slate hover:text-danger px-3 py-2 rounded-md transition-colors hover:bg-danger-bg">
                            <Trash2 size={16} /> Delete
                        </button>

                        <div className="flex items-center gap-3">
                            {status === "Approved" ? (
                                <>
                                    <button onClick={() => setStatus("Pending Review")} className="text-[13px] font-medium text-slate hover:text-ink underline underline-offset-2">Undo</button>
                                    <button disabled className="bg-success text-white px-6 py-2.5 rounded-[8px] font-medium flex items-center gap-2 shadow-sm opacity-90 cursor-default">
                                        <CheckCircle2 size={18} /> Approved
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setStatus("Flagged")}
                                        className="bg-surface border border-border text-ink px-4 py-2.5 rounded-[8px] font-medium hover:bg-warning-bg hover:text-warning hover:border-warning/30 transition-colors shadow-sm"
                                    >
                                        Flag for Review
                                    </button>
                                    <button
                                        onClick={() => { setStatus("Approved"); setFlags([]); }} // Approving clears flags
                                        className="bg-brand-primary text-white px-6 py-2.5 rounded-[8px] font-medium hover:bg-brand-hover transition-colors shadow-sm"
                                    >
                                        Approve Invoice
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}