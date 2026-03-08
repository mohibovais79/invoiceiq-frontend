"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { FileCheck2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
                    <Link
                        href="/login"
                        className="hidden md:block text-[14px] font-medium text-slate hover:text-ink transition-colors"
                    >
                        Sign in
                    </Link>
                    <Button variant="primary">
                        Try Free
                    </Button>
                </div>
            </div>
        </motion.header>
    );
}