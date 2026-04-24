"use client";

import { createClient } from "@/lib/supabase/client";
import { AnimatePresence, motion } from "framer-motion";
import {
    BarChart3,
    Bell,
    Building2,
    ChevronRight,
    Download,
    FileText,
    LayoutDashboard,
    LogOut,
    Search,
    Settings,
    Upload
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Upload", href: "/dashboard/upload", icon: Upload },
    { name: "Invoices", href: "/dashboard/invoices", icon: FileText },
    { name: "Exports", href: "/dashboard/exports", icon: Download },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

// Bottom tab bar uses 5 items (Analytics dropped in favour of Settings per spec)
const BOTTOM_TABS = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Upload", href: "/dashboard/upload", icon: Upload },
    { name: "Invoices", href: "/dashboard/invoices", icon: FileText },
    { name: "Exports", href: "/dashboard/exports", icon: Download },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    // On tablet (md–lg) the sidebar collapses to icon-only; user can expand with toggle
    const [tabletExpanded, setTabletExpanded] = useState(false);

    // Profile Dropdown & User State
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const [userEmail, setUserEmail] = useState<string>("");

    useEffect(() => {
        // Fetch current user email
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.email) setUserEmail(user.email);
        };
        getUser();

        // Close dropdown when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [supabase]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    const getInitials = (email: string) => {
        return email ? email.substring(0, 2).toUpperCase() : "US";
    };

    return (
        <div className="min-h-screen bg-canvas flex text-ink selection:bg-brand-subtle selection:text-brand-primary">

            {/* ── SIDEBAR ─────────────────────────────────────────────────────────
                Mobile  (<768px): hidden — replaced by bottom tab bar
                Tablet  (768–1279px): 64px icon-only, toggle to 240px
                Desktop (≥1280px): always 240px
            ─────────────────────────────────────────────────────────────────── */}
            <aside
                className={`
                    fixed top-0 left-0 h-screen bg-surface border-r border-border flex-col z-20
                    hidden md:flex
                    transition-[width] duration-200 ease-in-out overflow-hidden
                    ${tabletExpanded ? "w-[240px]" : "md:w-[64px] lg:w-[240px]"}
                `}
            >
                {/* Logo */}
                <div className="pt-4 px-3 lg:px-6 pb-6 flex items-center justify-between min-h-[72px]">
                    <Link href="/" className="flex items-center gap-2 group overflow-hidden">
                        <div className="bg-brand-primary p-1.5 rounded-md text-white group-hover:bg-brand-hover transition-colors shrink-0">
                            <Building2 size={20} strokeWidth={2.5} />
                        </div>
                        <span className={`font-heading font-bold text-xl tracking-tight text-ink whitespace-nowrap transition-opacity duration-150 ${tabletExpanded ? "opacity-100" : "opacity-0 lg:opacity-100"}`}>
                            InvoiceIQ
                        </span>
                    </Link>
                    {/* Collapse / expand toggle — tablet only */}
                    <button
                        onClick={() => setTabletExpanded(!tabletExpanded)}
                        className="hidden md:flex lg:hidden p-1 rounded text-slate hover:text-ink hover:bg-surface-raised transition-colors shrink-0"
                        title={tabletExpanded ? "Collapse sidebar" : "Expand sidebar"}
                    >
                        <ChevronRight size={16} className={`transition-transform duration-200 ${tabletExpanded ? "rotate-180" : ""}`} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-2 space-y-1">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                title={item.name}
                                className={`flex items-center gap-3 px-3 h-[40px] rounded-[8px] transition-colors ${isActive
                                    ? "bg-brand-subtle text-brand-primary font-medium"
                                    : "text-slate font-normal hover:bg-surface-raised"
                                    }`}
                            >
                                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className="shrink-0" />
                                <span className={`text-sm whitespace-nowrap transition-opacity duration-150 ${tabletExpanded ? "opacity-100" : "opacity-0 lg:opacity-100"}`}>
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Plan usage — hidden in icon-only mode */}
                <div className={`p-4 transition-opacity duration-150 ${tabletExpanded ? "opacity-100" : "opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto"}`}>
                    <div className="bg-brand-subtle rounded-[8px] p-4 border border-brand-primary/10">
                        <h4 className="text-[11px] font-bold text-brand-primary uppercase tracking-wider mb-2">Free Plan</h4>
                        <div className="mb-1 flex justify-between items-baseline text-sm">
                            <span className="text-ink font-medium">32 <span className="text-slate font-normal">/ 50 invoices</span></span>
                        </div>
                        <div className="w-full h-1 bg-brand-primary/20 rounded-full overflow-hidden mb-3">
                            <div className="h-full bg-brand-primary rounded-full" style={{ width: "64%" }} />
                        </div>
                        <Link href="/dashboard/settings" className="text-[13px] font-medium text-brand-primary hover:text-brand-hover transition-colors">
                            Upgrade plan
                        </Link>
                    </div>
                </div>
            </aside>

            {/* ── MAIN CONTENT ────────────────────────────────────────────────── */}
            <div className={`
                flex-1 flex flex-col min-h-screen
                transition-[margin] duration-200 ease-in-out
                ${tabletExpanded ? "md:ml-[240px]" : "md:ml-[64px] lg:ml-[240px]"}
            `}>

                {/* Top bar */}
                <header className="h-[64px] bg-surface border-b border-border flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
                    <div className="text-sm font-medium text-ink flex items-center gap-2">
                        <span className="text-slate">Dashboard</span>
                        {pathname !== "/dashboard" && (
                            <>
                                <span className="text-slate">/</span>
                                <span className="capitalize">{pathname.split("/").filter(Boolean).pop()}</span>
                            </>
                        )}
                    </div>

                    <div className="flex items-center gap-4 md:gap-5">
                        <button className="text-slate hover:text-ink transition-colors hidden sm:block">
                            <Search size={20} strokeWidth={2} />
                        </button>
                        <button className="text-slate hover:text-ink transition-colors relative">
                            <Bell size={20} strokeWidth={2} />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-danger rounded-full border border-surface" />
                        </button>

                        {/* Interactive Profile Dropdown */}
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsProfileOpen((prev) => !prev);
                                }}
                                className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs font-bold shadow-sm hover:bg-brand-hover transition-colors"
                            >
                                {getInitials(userEmail)}
                            </button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 top-full mt-2 w-56 bg-surface rounded-[12px] shadow-elevated border border-border py-1 z-[100] overflow-hidden"
                                    >
                                        <div className="px-4 py-3 border-b border-border-subtle bg-canvas/30">
                                            <p className="text-[11px] font-bold text-slate uppercase tracking-wider mb-0.5">Signed in as</p>
                                            <p className="text-[13px] font-medium text-ink truncate">{userEmail || "Loading..."}</p>
                                        </div>
                                        <div className="p-1">
                                            <Link
                                                href="/dashboard/settings"
                                                onClick={() => setIsProfileOpen(false)}
                                                className="flex items-center gap-2 w-full px-3 py-2 text-[13px] font-medium text-slate hover:text-ink hover:bg-surface-raised rounded-md transition-colors"
                                            >
                                                <Settings size={16} /> Account Settings
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-2 w-full px-3 py-2 text-[13px] font-medium text-danger hover:bg-danger-bg rounded-md transition-colors"
                                            >
                                                <LogOut size={16} /> Sign out
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {/* Page content — extra bottom padding on mobile for tab bar */}
                <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
                    {children}
                </main>
            </div>

            {/* ── BOTTOM TAB BAR (mobile only) ────────────────────────────────── */}
            <nav className="fixed bottom-0 left-0 right-0 h-16 bg-surface/95 backdrop-blur border-t border-border flex md:hidden z-30">
                {BOTTOM_TABS.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${isActive ? "text-brand-primary" : "text-slate"}`}
                        >
                            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

        </div>
    );
}