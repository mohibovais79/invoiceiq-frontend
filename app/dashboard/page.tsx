import { ArrowDownRight, ArrowUpRight, ChevronRight, Upload } from "lucide-react";

export default function DashboardPage() {

    // Dummy Data for Stats
    const stats = [
        { label: "Processed This Month", value: "247", change: "+18% vs last month", positive: true },
        { label: "Pending Review", value: "12", change: "3 flagged", positive: false, alert: true },
        { label: "Avg Confidence", value: "96.1%", change: "+1.2% improvement", positive: true },
        { label: "Exported", value: "223", change: "QuickBooks synced", positive: true, info: true },
    ];

    // Dummy Data for Recent Invoices
    const recentInvoices = [
        { id: "INV-0847", vendor: "Acme Corp", date: "Oct 24, 2023", amount: "$1,240.00", category: "Software", confidence: "98%", status: "Approved" },
        { id: "INV-0848", vendor: "Stripe", date: "Oct 24, 2023", amount: "$342.50", category: "Processing", confidence: "99%", status: "Exported" },
        { id: "INV-0849", vendor: "AWS Web Services", date: "Oct 23, 2023", amount: "$4,102.80", category: "Infrastructure", confidence: "82%", status: "Needs Review" },
        { id: "INV-0850", vendor: "WeWork", date: "Oct 22, 2023", amount: "$850.00", category: "Office", confidence: "95%", status: "Approved" },
        { id: "INV-0851", vendor: "Uber Eats", date: "Oct 22, 2023", amount: "$42.10", category: "Meals", confidence: "64%", status: "Flagged" },
        { id: "INV-0852", vendor: "Adobe Systems", date: "Oct 21, 2023", amount: "$54.99", category: "Software", confidence: "97%", status: "Exported" },
        { id: "INV-0853", vendor: "Mailchimp", date: "Oct 20, 2023", amount: "$120.00", category: "Marketing", confidence: "96%", status: "Approved" },
    ];

    // Helper for status badges based on your global CSS variables
    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Approved": return "bg-success-bg text-success border-success/20";
            case "Exported": return "bg-info-bg text-info border-info/20";
            case "Needs Review": return "bg-warning-bg text-warning border-warning/20";
            case "Flagged": return "bg-danger-bg text-danger border-danger/20";
            default: return "bg-surface-raised text-slate border-border";
        }
    };

    // Helper for confidence colors
    const getConfidenceColor = (conf: string) => {
        const val = parseInt(conf);
        if (val >= 95) return "text-success";
        if (val >= 85) return "text-warning";
        return "text-danger";
    };

    // Dummy activity chart data (percentages representing height)
    // Richer dummy data for the Processing Activity chart
    const activityData = [
        { fullDay: "Monday", label: "M", invoices: 142, height: "65%" },
        { fullDay: "Tuesday", label: "T", invoices: 98, height: "45%" },
        { fullDay: "Wednesday", label: "W", invoices: 185, height: "85%" },
        { fullDay: "Thursday", label: "T", invoices: 210, height: "100%" }, // Peak day
        { fullDay: "Friday", label: "F", invoices: 164, height: "75%" },
        { fullDay: "Saturday", label: "S", invoices: 42, height: "20%" },
        { fullDay: "Sunday", label: "S", invoices: 24, height: "10%" },
    ];
    return (
        <div className="max-w-7xl mx-auto space-y-8">

            {/* GREETING & QUICK ACTION */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="font-heading text-[28px] font-bold text-ink leading-tight">Good morning, John</h1>
                    <p className="font-sans text-[14px] text-slate mt-1">Here's your processing overview</p>
                </div>
                <button className="bg-brand-primary text-white px-5 py-2.5 rounded-[8px] font-medium hover:bg-brand-hover transition-colors flex items-center gap-2 shadow-sm">
                    <Upload size={18} />
                    Upload Invoices
                </button>
            </div>

            {/* STATS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-surface border border-border rounded-[12px] p-6 shadow-sm flex flex-col justify-between">
                        <h3 className="text-[12px] font-medium text-muted uppercase tracking-wider mb-3">
                            {stat.label}
                        </h3>
                        <div className="font-mono text-[32px] font-bold text-ink leading-none mb-3">
                            {stat.value}
                        </div>
                        <div className={`flex items-center gap-1 text-[12px] font-medium ${stat.info ? "text-info" : stat.alert ? "text-warning" : stat.positive ? "text-success" : "text-danger"
                            }`}>
                            {!stat.info && !stat.alert && (
                                stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />
                            )}
                            {stat.change}
                        </div>
                    </div>
                ))}
            </div>

            {/* MAIN CONTENT GRID */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* RECENT INVOICES TABLE */}
                <div className="xl:col-span-2 bg-surface border border-border rounded-[12px] shadow-sm overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-border flex justify-between items-center">
                        <h2 className="font-heading text-lg font-semibold text-ink">Recent Invoices</h2>
                        <button className="text-[13px] text-brand-primary font-medium hover:text-brand-hover transition-colors flex items-center">
                            View All <ChevronRight size={14} className="ml-0.5" />
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border bg-canvas/50">
                                    <th className="py-3 px-5 text-[12px] font-medium text-muted uppercase tracking-wider">Vendor</th>
                                    <th className="py-3 px-5 text-[12px] font-medium text-muted uppercase tracking-wider">Invoice #</th>
                                    <th className="py-3 px-5 text-[12px] font-medium text-muted uppercase tracking-wider">Date</th>
                                    <th className="py-3 px-5 text-[12px] font-medium text-muted uppercase tracking-wider text-right">Amount</th>
                                    <th className="py-3 px-5 text-[12px] font-medium text-muted uppercase tracking-wider">Category</th>
                                    <th className="py-3 px-5 text-[12px] font-medium text-muted uppercase tracking-wider">Confidence</th>
                                    <th className="py-3 px-5 text-[12px] font-medium text-muted uppercase tracking-wider">Status</th>
                                    <th className="py-3 px-5"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-subtle">
                                {recentInvoices.map((inv, i) => (
                                    <tr key={i} className="hover:bg-brand-subtle/50 transition-colors group cursor-pointer">
                                        <td className="py-3.5 px-5 font-sans text-[14px] font-medium text-ink">{inv.vendor}</td>
                                        <td className="py-3.5 px-5 font-mono text-[13px] text-muted">{inv.id}</td>
                                        <td className="py-3.5 px-5 font-sans text-[13px] text-slate">{inv.date}</td>
                                        <td className="py-3.5 px-5 font-mono text-[14px] font-medium text-ink text-right">{inv.amount}</td>
                                        <td className="py-3.5 px-5">
                                            <span className="inline-flex items-center px-2 py-1 rounded-[6px] bg-brand-subtle text-brand-primary text-[11px] font-medium tracking-wide">
                                                {inv.category}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-5 font-mono text-[13px] font-medium">
                                            <span className={getConfidenceColor(inv.confidence)}>{inv.confidence}</span>
                                        </td>
                                        <td className="py-3.5 px-5">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${getStatusStyle(inv.status)}`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-5 text-right">
                                            <ChevronRight size={16} className="text-muted group-hover:text-brand-primary transition-colors inline-block" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* PROCESSING ACTIVITY CHART */}
                <div className="xl:col-span-1 bg-surface border border-border rounded-[12px] shadow-sm p-6 flex flex-col">
                    <h2 className="font-heading text-lg font-semibold text-ink mb-1">Processing Activity</h2>
                    <p className="text-[13px] text-slate mb-8">Volume over the last 7 days</p>

                    <div className="flex-1 flex items-end justify-between gap-2 h-[200px] mt-auto">
                        {activityData.map((data, i) => (
                            <div key={i} className="w-full flex flex-col items-center gap-2 group relative">

                                {/* Custom CSS Tooltip (Appears on Hover) */}
                                <div className="absolute -top-10 bg-canvas border border-border text-ink text-[11px] font-medium py-1 px-2 rounded-[6px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-elevated z-10">
                                    {data.invoices} invoices
                                </div>

                                {/* The Bar */}
                                <div className="w-full relative bg-surface-raised rounded-t-[4px] overflow-hidden flex items-end h-[160px]">
                                    <div
                                        className="w-full bg-brand-primary rounded-t-[4px] group-hover:bg-brand-hover transition-all duration-300"
                                        style={{ height: data.height }}
                                    ></div>
                                </div>

                                {/* Day Label */}
                                <span className="text-[11px] text-muted font-medium group-hover:text-ink transition-colors">
                                    {data.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}