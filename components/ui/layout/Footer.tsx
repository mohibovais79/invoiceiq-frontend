import { FileCheck2, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const links = {
    Product: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "/pricing" },
    ],
    Company: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Security", href: "/security" },
    ],
};

const socials = [
    { label: "X / Twitter", href: "https://twitter.com", icon: Twitter },
    { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { label: "GitHub", href: "https://github.com", icon: Github },
];

export function Footer() {
    return (
        <footer className="w-full border-t border-border bg-surface">
            <div className="mx-auto max-w-6xl px-8 py-12">

                {/* Top row: logo + nav columns */}
                <div className="flex flex-col gap-10 md:flex-row md:justify-between">

                    {/* Brand */}
                    <div className="flex flex-col gap-3">
                        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80 w-fit">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-primary text-white">
                                <FileCheck2 size={18} strokeWidth={2} />
                            </div>
                            <span className="font-heading text-[18px] font-semibold tracking-tight text-ink">
                                InvoiceIQ
                            </span>
                        </Link>
                        <p className="text-sm text-muted max-w-[220px] leading-relaxed">
                            AI-powered invoice extraction and accounting automation.
                        </p>
                    </div>

                    {/* Nav columns */}
                    <div className="flex gap-16">
                        {Object.entries(links).map(([group, items]) => (
                            <div key={group} className="flex flex-col gap-3">
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">{group}</p>
                                <ul className="flex flex-col gap-2.5">
                                    {items.map((item) => (
                                        <li key={item.label}>
                                            <Link
                                                href={item.href}
                                                className="text-sm text-slate hover:text-ink transition-colors"
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="my-8 border-t border-border-subtle" />

                {/* Bottom row: copyright + socials */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-muted">
                        &copy; {new Date().getFullYear()} InvoiceIQ. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        {socials.map(({ label, href, icon: Icon }) => (
                            <Link
                                key={label}
                                href={href}
                                aria-label={label}
                                className="text-muted hover:text-ink transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Icon size={18} strokeWidth={1.75} />
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    );
}
