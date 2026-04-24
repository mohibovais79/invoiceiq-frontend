"use client";

import {
    AlertTriangle,
    Camera,
    CheckCircle2, Copy,
    Cpu,
    CreditCard,
    Download,
    Eye, EyeOff,
    Key,
    Lock, Plus,
    Tag,
    User,
    Users,
    X
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
    // --- STATE ---
    const [activeTab, setActiveTab] = useState("Profile");
    const [isPro, setIsPro] = useState(false); // Toggle to test Pro features

    // Tab-specific state
    const [showLlmKey, setShowLlmKey] = useState(false);
    const [llmTestStatus, setLlmTestStatus] = useState<"idle" | "testing" | "success" | "error">("idle");
    const [exportPrefs, setExportPrefs] = useState({ confidence: true, lineItems: true });
    const [categories, setCategories] = useState(["Software", "Travel", "Office Supplies", "Rent", "Utilities", "Cloud Services", "Marketing", "Legal", "Consulting", "Insurance", "Meals", "Equipment"]);
    const [newCategory, setNewCategory] = useState("");

    // --- NAVIGATION CONFIG ---
    const tabs = [
        { id: "Profile", icon: User },
        { id: "LLM Provider", icon: Cpu },
        { id: "Export Preferences", icon: Download },
        { id: "Expense Categories", icon: Tag },
        { id: "Team", icon: Users, isProFeature: true },
        { id: "Billing", icon: CreditCard },
        { id: "API Keys", icon: Key, isProFeature: true },
    ];

    // --- HANDLERS ---
    const handleLlmTest = () => {
        setLlmTestStatus("testing");
        setTimeout(() => setLlmTestStatus("success"), 1500);
    };

    const handleAddCategory = () => {
        if (newCategory.trim() && !categories.includes(newCategory.trim())) {
            setCategories([...categories, newCategory.trim()]);
            setNewCategory("");
        }
    };

    const removeCategory = (cat: string) => {
        setCategories(categories.filter(c => c !== cat));
    };

    // --- RENDER FUNCTIONS FOR TABS ---

    const renderProfile = () => (
        <div className="max-w-2xl space-y-8 animate-in fade-in duration-300">
            <div>
                <h2 className="text-xl font-heading font-semibold text-ink mb-1">Profile</h2>
                <p className="text-[14px] text-slate">Update your personal information and timezone.</p>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative group w-20 h-20 rounded-full bg-brand-subtle flex items-center justify-center text-brand-primary text-2xl font-bold overflow-hidden cursor-pointer border border-brand-primary/20">
                    JM
                    <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity">
                        <Camera size={20} className="text-ink mb-1" />
                        <span className="text-[10px] font-medium text-ink">Change</span>
                    </div>
                </div>
                <div>
                    <button className="text-[13px] font-medium bg-surface border border-border px-3 py-1.5 rounded-md hover:bg-surface-raised transition-colors text-ink">
                        Upload new picture
                    </button>
                    <p className="text-[12px] text-slate mt-2">JPG, GIF or PNG. 1MB max.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-ink">Full Name</label>
                    <input type="text" defaultValue="John McInvoice" className="w-full bg-canvas border border-border rounded-md px-3 py-2 text-[14px] text-ink focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all shadow-sm" />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-ink">Company Name</label>
                    <input type="text" defaultValue="Acme Corp" className="w-full bg-canvas border border-border rounded-md px-3 py-2 text-[14px] text-ink focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all shadow-sm" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[13px] font-medium text-ink flex items-center justify-between">
                        Email Address
                        <button className="text-brand-primary hover:text-brand-hover hover:underline text-[12px]">Change email</button>
                    </label>
                    <input type="email" value="john@acmecorp.com" readOnly className="w-full bg-surface-raised border border-border rounded-md px-3 py-2 text-[14px] text-slate outline-none cursor-not-allowed shadow-sm" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[13px] font-medium text-ink">Timezone</label>
                    <select className="w-full bg-canvas border border-border rounded-md px-3 py-2 text-[14px] text-ink focus:border-brand-primary outline-none shadow-sm cursor-pointer">
                        <option>Pacific Time (US & Canada)</option>
                        <option>Mountain Time (US & Canada)</option>
                        <option>Central Time (US & Canada)</option>
                        <option>Eastern Time (US & Canada)</option>
                        <option>Greenwich Mean Time (GMT)</option>
                    </select>
                </div>
            </div>

            <div className="pt-4 border-t border-border">
                <button className="bg-brand-primary text-white px-5 py-2.5 rounded-md text-[14px] font-medium hover:bg-brand-hover transition-colors shadow-sm">
                    Save Changes
                </button>
            </div>
        </div>
    );

    const renderLlmProvider = () => (
        <div className="max-w-2xl space-y-8 animate-in fade-in duration-300">
            <div>
                <h2 className="text-xl font-heading font-semibold text-ink mb-1">LLM Provider</h2>
                <p className="text-[14px] text-slate">Configure the AI model used for OCR and data extraction.</p>
            </div>

            <div className="space-y-5 bg-surface border border-border rounded-[12px] p-6 shadow-sm">
                <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-ink">AI Model</label>
                    <select className="w-full bg-canvas border border-border rounded-md px-3 py-2 text-[14px] text-ink focus:border-brand-primary outline-none shadow-sm cursor-pointer">
                        <option>OpenAI (GPT-4o)</option>
                        <option>Google Gemini 2.0 Flash</option>
                        <option>Google Gemini 2.0 Pro</option>
                        <option>Anthropic (Claude 3.5 Sonnet)</option>
                    </select>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-ink">API Key</label>
                    <div className="relative">
                        <input
                            type={showLlmKey ? "text" : "password"}
                            defaultValue="sk-proj-8x92nd83nd923nd82nd..."
                            className="w-full bg-canvas border border-border rounded-md pl-3 pr-10 py-2 text-[14px] text-ink font-mono focus:border-brand-primary outline-none shadow-sm"
                        />
                        <button
                            onClick={() => setShowLlmKey(!showLlmKey)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors"
                        >
                            {showLlmKey ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <button
                        onClick={handleLlmTest}
                        className="bg-surface-raised border border-border text-ink px-4 py-2 rounded-md text-[13px] font-medium hover:bg-border-subtle transition-colors shadow-sm flex items-center gap-2"
                    >
                        {llmTestStatus === "testing" ? "Testing..." : "Test Connection"}
                    </button>
                    {llmTestStatus === "success" && (
                        <span className="text-[13px] font-medium text-success flex items-center gap-1.5">
                            <CheckCircle2 size={16} /> Connection successful
                        </span>
                    )}
                </div>
            </div>

            <p className="text-[12px] text-muted leading-relaxed">
                Your API key is encrypted at rest and never logged. You can also leave this blank to use InvoiceIQ's built-in managed credits (included in your plan usage).
            </p>
        </div>
    );

    const renderExportPrefs = () => (
        <div className="max-w-2xl space-y-8 animate-in fade-in duration-300">
            <div>
                <h2 className="text-xl font-heading font-semibold text-ink mb-1">Export Preferences</h2>
                <p className="text-[14px] text-slate">Set default formats and toggles for your data exports.</p>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label className="text-[13px] font-medium text-ink">Default Export Format</label>
                        <select className="w-full bg-canvas border border-border rounded-md px-3 py-2 text-[14px] text-ink focus:border-brand-primary outline-none shadow-sm cursor-pointer">
                            <option>QuickBooks CSV</option>
                            <option>Xero CSV</option>
                            <option>Full JSON</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[13px] font-medium text-ink">Default Currency</label>
                        <select className="w-full bg-canvas border border-border rounded-md px-3 py-2 text-[14px] text-ink focus:border-brand-primary outline-none shadow-sm cursor-pointer">
                            <option>USD ($)</option>
                            <option>EUR (€)</option>
                            <option>GBP (£)</option>
                            <option>CAD ($)</option>
                            <option>AUD ($)</option>
                            <option>PKR (Rs)</option>
                        </select>
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-[13px] font-medium text-ink">Date Format</label>
                        <select className="w-full bg-canvas border border-border rounded-md px-3 py-2 text-[14px] text-ink focus:border-brand-primary outline-none shadow-sm cursor-pointer">
                            <option>MM/DD/YYYY (US Default)</option>
                            <option>DD/MM/YYYY (EU Default)</option>
                            <option>YYYY-MM-DD (ISO 8601)</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[14px] font-medium text-ink">Include confidence scores</p>
                            <p className="text-[12px] text-slate">Adds a column for AI confidence percentage.</p>
                        </div>
                        {/* Custom CSS Toggle */}
                        <button
                            onClick={() => setExportPrefs({ ...exportPrefs, confidence: !exportPrefs.confidence })}
                            className={`w-10 h-6 rounded-full relative transition-colors ${exportPrefs.confidence ? 'bg-brand-primary' : 'bg-surface-raised border border-border'}`}
                        >
                            <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${exportPrefs.confidence ? 'translate-x-4 shadow-sm' : ''}`} />
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[14px] font-medium text-ink">Include line items</p>
                            <p className="text-[12px] text-slate">Exports each line item as a separate row.</p>
                        </div>
                        <button
                            onClick={() => setExportPrefs({ ...exportPrefs, lineItems: !exportPrefs.lineItems })}
                            className={`w-10 h-6 rounded-full relative transition-colors ${exportPrefs.lineItems ? 'bg-brand-primary' : 'bg-surface-raised border border-border'}`}
                        >
                            <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${exportPrefs.lineItems ? 'translate-x-4 shadow-sm' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderExpenseCategories = () => (
        <div className="max-w-2xl space-y-8 animate-in fade-in duration-300">
            <div>
                <h2 className="text-xl font-heading font-semibold text-ink mb-1">Expense Categories</h2>
                <p className="text-[14px] text-slate">Manage the categories our AI uses to classify your invoices.</p>
            </div>

            <div className="bg-surface border border-border rounded-[12px] p-6 shadow-sm space-y-6">
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <div key={cat} className="flex items-center gap-1.5 bg-canvas border border-border-subtle px-3 py-1.5 rounded-full text-[13px] font-medium text-ink group">
                            {cat}
                            <button onClick={() => removeCategory(cat)} className="text-muted hover:text-danger transition-colors">
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <input
                        type="text"
                        placeholder="New category name..."
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                        className="flex-1 bg-canvas border border-border rounded-md px-3 py-2 text-[14px] text-ink focus:border-brand-primary outline-none shadow-sm"
                    />
                    <button
                        onClick={handleAddCategory}
                        disabled={!newCategory.trim()}
                        className="bg-brand-primary text-white px-4 py-2 rounded-md text-[14px] font-medium hover:bg-brand-hover transition-colors shadow-sm disabled:opacity-50 flex items-center gap-1.5"
                    >
                        <Plus size={16} /> Add
                    </button>
                </div>
            </div>

            <p className="text-[12px] text-muted leading-relaxed">
                Custom categories are used by the Machine Learning model to improve classification accuracy for your specific business context.
            </p>
        </div>
    );

    const renderTeam = () => (
        <div className="max-w-3xl space-y-8 animate-in fade-in duration-300 relative">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-xl font-heading font-semibold text-ink mb-1 flex items-center gap-2">
                        Team Members
                        {!isPro && <span className="bg-brand-subtle text-brand-primary text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wider border border-brand-primary/20">Pro</span>}
                    </h2>
                    <p className="text-[14px] text-slate">Manage who has access to your workspace.</p>
                </div>
                <button className={`bg-brand-primary text-white px-4 py-2 rounded-md text-[13px] font-medium shadow-sm flex items-center gap-2 ${!isPro ? 'opacity-50' : 'hover:bg-brand-hover transition-colors'}`}>
                    <Plus size={16} /> Invite Member
                </button>
            </div>

            {/* Paywall Overlay */}
            {!isPro && (
                <div className="absolute inset-0 top-20 z-10 flex items-center justify-center bg-canvas/60 backdrop-blur-sm rounded-[12px] border border-border">
                    <div className="text-center max-w-[300px]">
                        <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock size={24} className="text-brand-primary" />
                        </div>
                        <h3 className="font-heading font-semibold text-ink mb-2">Upgrade to Pro</h3>
                        <p className="text-[13px] text-slate mb-4">Team collaboration features are only available on Pro and Business plans.</p>
                        <button onClick={() => setIsPro(true)} className="text-[13px] font-medium text-brand-primary hover:text-brand-hover hover:underline">
                            Upgrade now →
                        </button>
                    </div>
                </div>
            )}

            <div className={`bg-surface border border-border rounded-[12px] shadow-sm overflow-hidden ${!isPro ? 'opacity-30 pointer-events-none select-none' : ''}`}>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-border bg-canvas/50">
                            <th className="py-3 px-5 text-[12px] font-medium text-muted uppercase tracking-wider">Name</th>
                            <th className="py-3 px-5 text-[12px] font-medium text-muted uppercase tracking-wider">Role</th>
                            <th className="py-3 px-5 text-[12px] font-medium text-muted uppercase tracking-wider">Last Active</th>
                            <th className="py-3 px-5"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle">
                        <tr>
                            <td className="py-3 px-5">
                                <p className="text-[14px] font-medium text-ink">John McInvoice</p>
                                <p className="text-[12px] text-slate">john@acmecorp.com</p>
                            </td>
                            <td className="py-3 px-5"><span className="text-[12px] font-medium bg-surface-raised border border-border px-2 py-0.5 rounded text-ink">Admin</span></td>
                            <td className="py-3 px-5 text-[13px] text-slate">Just now</td>
                            <td className="py-3 px-5 text-right text-muted text-[13px]">Owner</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-5">
                                <p className="text-[14px] font-medium text-ink">Sarah Accountant</p>
                                <p className="text-[12px] text-slate">sarah@acmecorp.com</p>
                            </td>
                            <td className="py-3 px-5"><span className="text-[12px] font-medium bg-surface-raised border border-border px-2 py-0.5 rounded text-slate">Member</span></td>
                            <td className="py-3 px-5 text-[13px] text-slate">2 hours ago</td>
                            <td className="py-3 px-5 text-right"><button className="text-[13px] text-slate hover:text-danger">Remove</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderBilling = () => (
        <div className="max-w-2xl space-y-8 animate-in fade-in duration-300">
            <div>
                <h2 className="text-xl font-heading font-semibold text-ink mb-1">Billing & Usage</h2>
                <p className="text-[14px] text-slate">Manage your subscription and payment methods.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Plan Card */}
                <div className="bg-brand-subtle border border-brand-primary/20 rounded-[12px] p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-[12px] font-bold text-brand-primary uppercase tracking-wider mb-1">Current Plan</h3>
                            <p className="font-heading text-2xl font-bold text-ink">{isPro ? "Pro Plan" : "Free Plan"}</p>
                        </div>
                        <p className="text-right">
                            <span className="text-xl font-bold text-ink">{isPro ? "$49" : "$0"}</span><span className="text-slate text-[13px]">/mo</span>
                        </p>
                    </div>
                    <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-[13px]">
                            <span className="text-slate">Invoices processed</span>
                            <span className="font-medium text-ink">32 / {isPro ? "1,000" : "50"}</span>
                        </div>
                        <div className="w-full h-1.5 bg-brand-primary/20 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-primary rounded-full" style={{ width: isPro ? "3%" : "64%" }}></div>
                        </div>
                        <p className="text-[11px] text-muted">Resets on Nov 1, 2023</p>
                    </div>
                    <button className="w-full bg-surface border border-border text-ink py-2 rounded-md text-[13px] font-medium hover:bg-surface-raised transition-colors">
                        {isPro ? "Manage Subscription" : "Upgrade Plan"}
                    </button>
                </div>

                {/* Payment Method */}
                <div className="bg-surface border border-border rounded-[12px] p-6 shadow-sm flex flex-col">
                    <h3 className="text-[14px] font-semibold text-ink mb-4">Payment Method</h3>
                    <div className="flex items-center gap-4 bg-canvas border border-border rounded-md p-3 mb-auto">
                        <div className="w-10 h-6 bg-slate rounded-sm flex items-center justify-center text-[10px] font-bold text-white tracking-widest">VISA</div>
                        <div>
                            <p className="text-[13px] font-medium text-ink">•••• •••• •••• 4242</p>
                            <p className="text-[11px] text-slate">Expires 12/2025</p>
                        </div>
                    </div>
                    <button className="text-[13px] font-medium text-brand-primary hover:text-brand-hover hover:underline self-start mt-4">
                        Update payment method
                    </button>
                </div>
            </div>

            <div className="bg-surface border border-border rounded-[12px] shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border">
                    <h3 className="text-[14px] font-semibold text-ink">Billing History</h3>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-border bg-canvas/50">
                            <th className="py-2.5 px-4 text-[11px] font-medium text-muted uppercase tracking-wider">Date</th>
                            <th className="py-2.5 px-4 text-[11px] font-medium text-muted uppercase tracking-wider">Description</th>
                            <th className="py-2.5 px-4 text-[11px] font-medium text-muted uppercase tracking-wider text-right">Amount</th>
                            <th className="py-2.5 px-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle">
                        <tr>
                            <td className="py-3 px-4 text-[13px] text-slate">Oct 01, 2023</td>
                            <td className="py-3 px-4 text-[13px] font-medium text-ink">Pro Plan (Monthly)</td>
                            <td className="py-3 px-4 text-[13px] font-mono text-slate text-right">$49.00</td>
                            <td className="py-3 px-4 text-right"><button className="text-[12px] text-brand-primary hover:underline">Invoice</button></td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4 text-[13px] text-slate">Sep 01, 2023</td>
                            <td className="py-3 px-4 text-[13px] font-medium text-ink">Pro Plan (Monthly)</td>
                            <td className="py-3 px-4 text-[13px] font-mono text-slate text-right">$49.00</td>
                            <td className="py-3 px-4 text-right"><button className="text-[12px] text-brand-primary hover:underline">Invoice</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderApiKeys = () => (
        <div className="max-w-2xl space-y-8 animate-in fade-in duration-300 relative">
            <div>
                <h2 className="text-xl font-heading font-semibold text-ink mb-1 flex items-center gap-2">
                    Developer API
                    {!isPro && <span className="bg-brand-subtle text-brand-primary text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wider border border-brand-primary/20">Pro</span>}
                </h2>
                <p className="text-[14px] text-slate">Access InvoiceIQ programmatically.</p>
            </div>

            {!isPro && (
                <div className="absolute inset-0 top-16 z-10 flex items-center justify-center bg-canvas/60 backdrop-blur-sm rounded-[12px] border border-border">
                    <div className="text-center max-w-[300px]">
                        <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock size={24} className="text-brand-primary" />
                        </div>
                        <h3 className="font-heading font-semibold text-ink mb-2">Upgrade to Pro</h3>
                        <p className="text-[13px] text-slate mb-4">API access for custom integrations is only available on Pro and Business plans.</p>
                        <button onClick={() => setIsPro(true)} className="text-[13px] font-medium text-brand-primary hover:text-brand-hover hover:underline">
                            Upgrade now →
                        </button>
                    </div>
                </div>
            )}

            <div className={`space-y-6 ${!isPro ? 'opacity-30 pointer-events-none select-none' : ''}`}>
                <div className="bg-surface border border-border rounded-[12px] p-6 shadow-sm">
                    <h3 className="text-[14px] font-semibold text-ink mb-4">Your Secret Key</h3>
                    <div className="flex items-center gap-2 mb-6">
                        <input
                            type="password"
                            readOnly
                            value="iiq_live_8x92nd83nd923nd82nd92"
                            className="flex-1 bg-canvas border border-border rounded-md px-3 py-2 text-[14px] text-ink font-mono outline-none shadow-sm cursor-text"
                        />
                        <button className="p-2 bg-surface-raised border border-border rounded-md text-slate hover:text-ink hover:bg-border-subtle transition-colors shadow-sm" title="Copy to clipboard">
                            <Copy size={18} />
                        </button>
                    </div>

                    <div className="space-y-2 mb-6 p-4 bg-canvas rounded-lg border border-border">
                        <div className="flex justify-between text-[13px]">
                            <span className="text-slate">API Calls this month</span>
                            <span className="font-medium text-ink">847 / 1,000</span>
                        </div>
                        <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                            <div className="h-full bg-info rounded-full" style={{ width: "84%" }}></div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-border flex items-center justify-between">
                        <button className="text-[13px] font-medium text-danger hover:text-white hover:bg-danger border border-danger/20 hover:border-danger px-4 py-2 rounded-md transition-colors">
                            Regenerate Key
                        </button>
                        <a href="#" className="text-[13px] font-medium text-brand-primary hover:underline flex items-center gap-1">
                            View API Documentation <ChevronRight size={14} className="ml-0.5" />
                        </a>
                    </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-warning-bg border border-warning/20 rounded-[8px]">
                    <AlertTriangle size={18} className="text-warning shrink-0 mt-0.5" />
                    <p className="text-[12px] text-warning-dark leading-relaxed font-medium">
                        Keep your API key secure. Never expose it in client-side code (like the browser). If you suspect your key has been compromised, regenerate it immediately.
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-[1100px] mx-auto pb-12">
            <div className="mb-8">
                <h1 className="font-heading text-[28px] font-bold text-ink leading-tight">Settings</h1>
            </div>

            <div className="flex flex-col md:flex-row gap-10">

                {/* LEFT NAV (200px) */}
                <aside className="w-full md:w-[200px] flex-shrink-0 flex flex-row md:flex-col gap-1 overflow-x-auto pb-4 md:pb-0">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium transition-colors whitespace-nowrap ${isActive
                                    ? "bg-brand-subtle text-brand-primary"
                                    : "text-slate hover:bg-surface-raised hover:text-ink"
                                    }`}
                            >
                                <Icon size={16} />
                                {tab.id}
                            </button>
                        );
                    })}
                </aside>

                {/* RIGHT CONTENT AREA */}
                <main className="flex-1 min-w-0">
                    {activeTab === "Profile" && renderProfile()}
                    {activeTab === "LLM Provider" && renderLlmProvider()}
                    {activeTab === "Export Preferences" && renderExportPrefs()}
                    {activeTab === "Expense Categories" && renderExpenseCategories()}
                    {activeTab === "Team" && renderTeam()}
                    {activeTab === "Billing" && renderBilling()}
                    {activeTab === "API Keys" && renderApiKeys()}
                </main>

            </div>
        </div>
    );
}

// Quick helper icon for the API tab
function ChevronRight(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}