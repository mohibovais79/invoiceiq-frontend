"use client";

import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { Building2, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const supabase = createClient();

    const handleSignUp = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                },
            },
        });

        if (error) {
            setError(error.message);
            setIsLoading(false);
        } else {
            router.push("/dashboard");
        }
    };

    // NEW: Handle Google OAuth
    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };


    // Simple password strength calculator (0 to 4)
    const calculateStrength = (pass: string) => {
        let score = 0;
        if (!pass) return score;
        if (pass.length > 8) score += 1;
        if (/[A-Z]/.test(pass)) score += 1;
        if (/[0-9]/.test(pass)) score += 1;
        if (/[^A-Za-z0-9]/.test(pass)) score += 1;
        return score;
    };

    const strength = calculateStrength(password);

    // Helper to determine the color of the strength bars
    const getBarColor = (index: number) => {
        if (index >= strength) return "bg-surface-raised"; // Inactive
        if (strength === 1) return "bg-danger"; // Weak
        if (strength === 2) return "bg-warning"; // Fair
        if (strength >= 3) return "bg-success"; // Strong
        return "bg-surface-raised";
    };

    return (
        <main className="min-h-screen w-full flex flex-col lg:flex-row bg-canvas selection:bg-brand-subtle selection:text-brand-primary">

            {/* LEFT SIDE: Form (Using bg-surface to maintain dark theme consistency) */}
            <div className="w-full lg:w-[50%] xl:w-[45%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 bg-surface relative z-10 shadow-elevated">

                {/* Logo / Back to Home */}
                <div className="absolute top-8 left-8 sm:left-16 lg:left-24">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-brand-primary p-1.5 rounded-md text-white group-hover:bg-brand-hover transition-colors">
                            <Building2 size={20} strokeWidth={2.5} />
                        </div>
                        <span className="font-heading font-bold text-xl tracking-tight text-ink">
                            InvoiceIQ
                        </span>
                    </Link>
                </div>

                <div className="w-full max-w-[400px] mx-auto mt-12 lg:mt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <h1 className="text-[24px] font-bold text-ink mb-2">Create your account</h1>
                        <p className="text-[14px] text-slate mb-8">Start processing invoices in 2 minutes</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    >
                        {/* Google OAuth Button */}
                        <button className="w-full flex items-center justify-center gap-3 bg-ink text-surface py-2.5 rounded-md font-medium hover:bg-slate transition-colors mb-6 shadow-sm" onClick={handleGoogleLogin}>
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </button>

                        {/* Divider */}
                        <div className="relative flex items-center mb-6">
                            <div className="flex-grow border-t border-border-subtle"></div>
                            <span className="flex-shrink-0 mx-4 text-slate text-sm">or</span>
                            <div className="flex-grow border-t border-border-subtle"></div>
                        </div>

                        {/* Form */}
                        <form className="space-y-4" onSubmit={handleSignUp}>
                            {error && (
                                <div className="bg-danger-bg text-danger text-sm p-3 rounded-md border border-danger/20">
                                    {error}
                                </div>
                            )}
                            <div className="space-y-1.5">

                                <label className="text-sm font-medium text-ink block">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Jane Doe"
                                    className="w-full bg-canvas border border-border-subtle rounded-md px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-ink block">Work Email</label>
                                <input
                                    type="email"
                                    placeholder="jane@company.com"
                                    className="w-full bg-canvas border border-border-subtle rounded-md px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                />
                            </div>

                            <div className="space-y-1.5 pb-2">
                                <label className="text-sm font-medium text-ink block">Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-canvas border border-border-subtle rounded-md px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all mb-2"
                                />

                                {/* Password Strength Indicator */}
                                <div className="flex gap-1.5 h-1.5 w-full">
                                    {[0, 1, 2, 3].map((index) => (
                                        <div
                                            key={index}
                                            className={`flex-1 rounded-full transition-colors duration-300 ${getBarColor(index)}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Checkbox */}
                            <div className="flex items-start gap-3 py-2">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="mt-1 w-4 h-4 rounded border-border-subtle bg-canvas text-brand-primary focus:ring-brand-primary focus:ring-offset-surface"
                                />
                                <label htmlFor="terms" className="text-sm text-slate leading-tight">
                                    I agree to the{" "}
                                    <Link href="/terms" className="text-brand-primary hover:text-brand-hover underline-offset-2 hover:underline">Terms of Service</Link>
                                    {" "}and{" "}
                                    <Link href="/privacy" className="text-brand-primary hover:text-brand-hover underline-offset-2 hover:underline">Privacy Policy</Link>.
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-brand-primary text-white py-2.5 rounded-md font-medium hover:bg-brand-hover transition-colors shadow-md mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Creating Account..." : "Create Account"}
                            </button>
                        </form>

                        <p className="text-center text-sm text-slate mt-8">
                            Already have an account?{" "}
                            <Link href="/login" className="text-brand-primary font-medium hover:text-brand-hover underline-offset-2 hover:underline">
                                Log in
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* RIGHT SIDE: Visual/Value Prop (bg-canvas) */}
            <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-12 relative overflow-hidden">

                {/* Subtle background glow effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary opacity-[0.03] blur-[100px] rounded-full pointer-events-none"></div>

                <div className="w-full max-w-2xl z-10 flex flex-col items-center">

                    {/* Dashboard Placeholder  */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-full aspect-[16/10] bg-surface rounded-xl border border-border shadow-elevated flex flex-col overflow-hidden mb-12"
                    >
                        {/* Fake Dashboard Header */}
                        <div className="h-12 border-b border-border-subtle flex items-center px-4 gap-4 bg-surface-raised/50">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-danger/80"></div>
                                <div className="w-3 h-3 rounded-full bg-warning/80"></div>
                                <div className="w-3 h-3 rounded-full bg-success/80"></div>
                            </div>
                            <div className="h-6 w-full max-w-[200px] bg-canvas rounded-md flex items-center px-3 text-xs text-muted font-mono">
                                invoiceiq.com/dashboard
                            </div>
                        </div>
                        {/* Fake Dashboard Body */}
                        <div className="flex-1 p-6 flex items-center justify-center relative">
                            <LayoutDashboard size={48} className="text-border absolute opacity-50" strokeWidth={1} />
                            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-10"></div>
                            {/* Mock extracted data lines */}
                            <div className="w-full h-full flex flex-col gap-3 z-0 opacity-40">
                                <div className="h-4 w-1/3 bg-border rounded-sm"></div>
                                <div className="h-10 w-full bg-border-subtle rounded-md"></div>
                                <div className="h-10 w-full bg-border-subtle rounded-md"></div>
                                <div className="h-10 w-full bg-border-subtle rounded-md"></div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-center"
                    >
                        <h2 className="text-xl font-medium text-ink mb-8">
                            Join 500+ firms saving 10+ hours weekly
                        </h2>

                        {/* Stat Pills */}
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="bg-surface border border-border px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
                                <span className="text-sm font-medium text-brand-dark">97% accuracy</span>
                            </div>
                            <div className="bg-surface border border-border px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
                                <span className="text-sm font-medium text-brand-dark">4s avg processing</span>
                            </div>
                            <div className="bg-surface border border-border px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
                                <span className="text-sm font-medium text-brand-dark">50+ formats</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </main >
    );
}