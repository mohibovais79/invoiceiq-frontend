"use client";

import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { FileCheck2, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useState<{ email: string; id: string } | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data: { user }, error } = await supabase.auth.getUser();
                if (error) {
                    console.error("Auth error:", error.message);
                }
                setUser(user ? { email: user.email || "", id: user.id } : null);
            } catch (e) {
                console.error("Failed to get user:", e);
            } finally {
                setIsLoading(false);
            }
        };

        // Timeout fallback in case Supabase hangs
        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN" || event === "USER_UPDATED") {
                setUser(session?.user ? { email: session.user.email || "", id: session.user.id } : null);
            } else if (event === "SIGNED_OUT") {
                setUser(null);
            }
        });

        return () => {
            subscription.unsubscribe();
            clearTimeout(timeoutId);
        };
    }, [supabase]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isDropdownOpen]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsDropdownOpen(false);
        router.push("/");
    };

    const getInitials = (email: string) => {
        return email.substring(0, 2).toUpperCase();
    };

    // DEBUG: Force user state for testing UI
    const DEBUG_USER = { email: "test@example.com", id: "123" }; // Set to null to use real auth
    const displayUser = DEBUG_USER || user;

    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ease-in-out",
                isScrolled
                    ? "bg-surface/90 backdrop-blur-md shadow-sm border-b border-border"
                    : "bg-transparent border-b border-transparent"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-8">
                {/* Left: Logo */}
                <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-primary text-white">
                        <FileCheck2 size={18} strokeWidth={2} />
                    </div>
                    <span className="font-heading text-[18px] font-semibold tracking-tight text-ink">
                        InvoiceIQ
                    </span>
                </Link>

                {/* Center: Navigation */}
                <nav className="hidden md:flex items-center gap-[32px]">
                    <Link
                        href="#features"
                        className="text-[14px] font-medium text-slate hover:text-ink transition-colors"
                    >
                        Features
                    </Link>
                    <Link
                        href="/pricing"
                        className="text-[14px] font-medium text-slate hover:text-ink transition-colors"
                    >
                        Pricing
                    </Link>
                </nav>

                {/* Right: Actions */}
                <div className="flex items-center gap-[24px]">
                    {!isLoading && (
                        displayUser ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsDropdownOpen((prev) => !prev);
                                    }}
                                    className="flex items-center gap-2 focus:outline-none cursor-pointer"
                                    type="button"
                                >
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary text-white font-medium text-sm hover:bg-brand-hover transition-colors">
                                        {getInitials(displayUser.email)}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div
                                            key="dropdown"
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute right-0 top-full mt-2 w-48 bg-surface rounded-lg shadow-elevated border border-border py-1 z-[100]"
                                        >
                                            <div className="px-4 py-2 border-b border-border-subtle">
                                                <p className="text-sm font-medium text-ink truncate">{displayUser.email}</p>
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate hover:text-ink hover:bg-surface-raised transition-colors"
                                            >
                                                <LogOut size={16} />
                                                Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="hidden md:block text-[14px] font-medium text-slate hover:text-ink transition-colors"
                                >
                                    Sign in
                                </Link>
                                <Link href="/signup">
                                    <Button variant="primary">
                                        Try Free
                                    </Button>
                                </Link>
                            </>
                        )
                    )}
                </div>
            </div>
        </motion.header >
    );
}