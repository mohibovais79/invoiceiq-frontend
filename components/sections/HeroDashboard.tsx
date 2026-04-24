"use client";

import { ArrowDownRight, ArrowUpRight, ChevronRight, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const INNER_W = 950;
const INNER_H = 650;

const stats = [
  { label: "Processed", value: "247", change: "+18% vs last month", positive: true },
  { label: "Pending Review", value: "12", change: "3 flagged", alert: true },
  { label: "Avg Confidence", value: "96.1%", change: "+1.2% improvement", positive: true },
  { label: "Exported", value: "223", change: "QuickBooks synced", info: true },
];

const invoices = [
  { id: "INV-0847", vendor: "Acme Corp", date: "Oct 24", amount: "$1,240.00", category: "Software", confidence: "98%", status: "Approved" },
  { id: "INV-0848", vendor: "Stripe", date: "Oct 24", amount: "$342.50", category: "Processing", confidence: "99%", status: "Exported" },
  { id: "INV-0849", vendor: "AWS", date: "Oct 23", amount: "$4,102.80", category: "Infra", confidence: "82%", status: "Needs Review" },
  { id: "INV-0850", vendor: "WeWork", date: "Oct 22", amount: "$850.00", category: "Office", confidence: "95%", status: "Approved" },
  { id: "INV-0851", vendor: "Uber Eats", date: "Oct 22", amount: "$42.10", category: "Meals", confidence: "64%", status: "Flagged" },
];

const bars = [
  { label: "M", h: "65%" },
  { label: "T", h: "45%" },
  { label: "W", h: "85%" },
  { label: "T", h: "100%" },
  { label: "F", h: "75%" },
  { label: "S", h: "20%" },
  { label: "S", h: "10%" },
];

const statusCls = (s: string) => {
  if (s === "Approved") return "bg-success-bg text-success border-success/20";
  if (s === "Exported") return "bg-info-bg text-info border-info/20";
  if (s === "Needs Review") return "bg-warning-bg text-warning border-warning/20";
  if (s === "Flagged") return "bg-danger-bg text-danger border-danger/20";
  return "bg-surface-raised text-slate border-border";
};

const confCls = (c: string) => {
  const v = parseInt(c);
  if (v >= 95) return "text-success";
  if (v >= 85) return "text-warning";
  return "text-danger";
};

export function HeroDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.6);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setScale(containerRef.current.offsetWidth / INNER_W);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    // Outer wrapper: height tracks the scaled inner height
    <div ref={containerRef} className="overflow-hidden rounded-xl w-full" style={{ height: `${INNER_H * scale}px` }}>
      {/* Inner content at fixed design width, scaled to fit container */}
      <div
        className="pointer-events-none select-none bg-canvas p-5 flex flex-col gap-4"
        style={{
          width: `${INNER_W}px`,
          height: `${INNER_H}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-[20px] font-bold text-ink leading-tight">Good morning, John</h1>
            <p className="text-[12px] text-slate mt-0.5">Here's your processing overview</p>
          </div>
          <button className="bg-brand-primary text-white px-4 py-2 rounded-[8px] font-medium flex items-center gap-2 text-[12px]">
            <Upload size={14} /> Upload Invoices
          </button>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-4 gap-3">
          {stats.map((s, i) => (
            <div key={i} className="bg-surface border border-border rounded-[10px] p-4 shadow-sm">
              <p className="text-[10px] font-medium text-muted uppercase tracking-wider mb-2">{s.label}</p>
              <p className="font-mono text-[26px] font-bold text-ink leading-none mb-2">{s.value}</p>
              <div className={`flex items-center gap-1 text-[11px] font-medium ${s.info ? "text-info" : s.alert ? "text-warning" : s.positive ? "text-success" : "text-danger"
                }`}>
                {!s.info && !s.alert && (s.positive ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />)}
                {s.change}
              </div>
            </div>
          ))}
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-3 gap-3 flex-1 min-h-0">

          {/* Invoice table */}
          <div className="col-span-2 bg-surface border border-border rounded-[10px] shadow-sm overflow-hidden flex flex-col">
            <div className="px-4 py-2.5 border-b border-border flex justify-between items-center shrink-0">
              <span className="font-heading text-[13px] font-semibold text-ink">Recent Invoices</span>
              <span className="text-[11px] text-brand-primary font-medium flex items-center gap-0.5">
                View All <ChevronRight size={11} />
              </span>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-canvas/50">
                  {["Vendor", "Invoice #", "Date", "Amount", "Category", "Conf.", "Status"].map((h) => (
                    <th key={h} className="py-2 px-3 text-[9px] font-medium text-muted uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {invoices.map((inv, i) => (
                  <tr key={i} className="hover:bg-brand-subtle/40">
                    <td className="py-2 px-3 text-[11px] font-medium text-ink">{inv.vendor}</td>
                    <td className="py-2 px-3 font-mono text-[10px] text-muted">{inv.id}</td>
                    <td className="py-2 px-3 text-[11px] text-slate">{inv.date}</td>
                    <td className="py-2 px-3 font-mono text-[11px] font-medium text-ink">{inv.amount}</td>
                    <td className="py-2 px-3">
                      <span className="px-1.5 py-0.5 rounded-[4px] bg-brand-subtle text-brand-primary text-[9px] font-medium">{inv.category}</span>
                    </td>
                    <td className={`py-2 px-3 font-mono text-[11px] font-medium ${confCls(inv.confidence)}`}>{inv.confidence}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium border ${statusCls(inv.status)}`}>{inv.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bar chart */}
          <div className="bg-surface border border-border rounded-[10px] shadow-sm p-4 flex flex-col">
            <p className="font-heading text-[13px] font-semibold text-ink">Processing Activity</p>
            <p className="text-[10px] text-slate mb-3">Last 7 days</p>
            <div className="flex-1 flex items-end justify-between gap-2">
              {bars.map((b, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full bg-surface-raised rounded-t-[3px] overflow-hidden flex items-end" style={{ height: "100px" }}>
                    <div className="w-full bg-brand-primary rounded-t-[3px] transition-all" style={{ height: b.h }} />
                  </div>
                  <span className="text-[9px] text-muted font-medium">{b.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
