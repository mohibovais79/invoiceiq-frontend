"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
    AlertCircle,
    Camera,
    CheckCircle2,
    ChevronRight,
    FileText, FolderOpen, Image as ImageIcon,
    Loader2,
    UploadCloud,
    X
} from "lucide-react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

// Define the steps for our mock AI processing
const PROCESSING_STEPS = ["Preprocessing", "OCR", "Extracting", "Classifying", "Done"];

type FileStatus = "Ready" | "Processing" | "Done" | "Failed";

interface FileItem {
    id: string;
    file: File;
    status: FileStatus;
    progress: number;
    currentStep: string;
}

export default function UploadPage() {
    const [files, setFiles] = useState<FileItem[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingComplete, setProcessingComplete] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);

    // --- Drag & Drop Handlers ---
    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            addFiles(Array.from(e.dataTransfer.files));
        }
    }, []);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            addFiles(Array.from(e.target.files));
        }
    };

    const addFiles = (newFiles: File[]) => {
        // Prevent adding if currently processing
        if (isProcessing) return;

        const newItems: FileItem[] = newFiles.map((file) => ({
            id: Math.random().toString(36).substring(7),
            file,
            status: "Ready",
            progress: 0,
            currentStep: "Ready",
        }));
        setFiles((prev) => [...prev, ...newItems]);
        setProcessingComplete(false);
    };

    const removeFile = (id: string) => {
        if (isProcessing) return;
        setFiles((prev) => prev.filter((f) => f.id !== id));
    };

    const clearQueue = () => {
        if (isProcessing) return;
        setFiles([]);
        setProcessingComplete(false);
    };

    // --- Mock Processing Logic ---
    const processFiles = () => {
        if (files.length === 0 || isProcessing) return;
        setIsProcessing(true);

        // Update all files to 'Processing'
        setFiles((prev) =>
            prev.map((f) => ({ ...f, status: "Processing", currentStep: PROCESSING_STEPS[0] }))
        );

        // Simulate OCR/AI Extraction processing for each file
        files.forEach((file, index) => {
            // Stagger the start times slightly for realism
            setTimeout(() => {
                let stepIndex = 0;

                const interval = setInterval(() => {
                    stepIndex++;
                    const progressPercent = (stepIndex / (PROCESSING_STEPS.length - 1)) * 100;

                    setFiles((currentFiles) =>
                        currentFiles.map((f) => {
                            if (f.id === file.id) {
                                // If we reached the end
                                if (stepIndex >= PROCESSING_STEPS.length - 1) {
                                    clearInterval(interval);
                                    // Randomly fail ~10% of invoices for demo purposes
                                    const isFailure = Math.random() > 0.9;
                                    return {
                                        ...f,
                                        status: isFailure ? "Failed" : "Done",
                                        progress: 100,
                                        currentStep: isFailure ? "Failed during extraction" : "Done",
                                    };
                                }
                                // Update normal step
                                return {
                                    ...f,
                                    progress: progressPercent,
                                    currentStep: PROCESSING_STEPS[stepIndex],
                                };
                            }
                            return f;
                        })
                    );
                }, 800 + Math.random() * 600); // 800ms - 1.4s per step
            }, index * 400); // 400ms stagger between files
        });
    };

    // Check if all files are done processing to show the summary card
    if (isProcessing && files.every((f) => f.status === "Done" || f.status === "Failed")) {
        setIsProcessing(false);
        setProcessingComplete(true);
    }

    // Formatting helpers
    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    const getFileIcon = (type: string) => {
        if (type.includes("pdf")) return <FileText size={20} className="text-brand-primary" />;
        if (type.includes("image")) return <ImageIcon size={20} className="text-info" />;
        return <FileText size={20} className="text-slate" />;
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">

            {/* TITLE AREA */}
            <div>
                <h1 className="font-heading text-[28px] font-bold text-ink leading-tight">Upload Invoices</h1>
                <p className="font-sans text-[14px] text-slate mt-1">
                    Drop files or browse. Supports PDF, PNG, JPG, TIFF, and multi-page scans.
                </p>
            </div>

            {/* MOBILE UPLOAD BUTTONS (camera-first, hidden on md+) */}
            <div className="md:hidden space-y-3">
                <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleFileInput}
                    disabled={isProcessing}
                />
                <button
                    onClick={() => cameraInputRef.current?.click()}
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center gap-3 h-14 rounded-[12px] bg-brand-primary text-white font-medium text-[16px] shadow-sm hover:bg-brand-hover transition-colors disabled:opacity-50"
                >
                    <Camera size={22} /> Take Photo
                </button>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center gap-3 h-14 rounded-[12px] bg-surface border border-border text-ink font-medium text-[16px] hover:bg-surface-raised transition-colors disabled:opacity-50"
                >
                    <FolderOpen size={22} /> Choose File
                </button>
            </div>

            {/* DROP ZONE (desktop only) */}
            <motion.div
                animate={{
                    height: files.length > 0 ? 120 : 240,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={`hidden md:flex relative w-full border-2 border-dashed rounded-[16px] flex-col items-center justify-center overflow-hidden transition-colors ${isDragging
                    ? "border-brand-primary bg-brand-subtle"
                    : "border-border bg-surface hover:border-border-subtle hover:bg-surface-raised"
                    }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    multiple
                    accept=".pdf,.png,.jpg,.jpeg,.tiff"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileInput}
                    disabled={isProcessing}
                />

                <motion.div
                    animate={{ y: isDragging ? -5 : 0 }}
                    className="flex flex-col items-center justify-center p-6 text-center z-10"
                >
                    <UploadCloud size={40} strokeWidth={1.5} className={isDragging ? "text-brand-primary mb-3" : "text-slate mb-3"} />

                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-sans text-[16px] font-medium text-ink">Drag and drop invoices here</span>
                        <span className="font-sans text-[13px] text-muted">or</span>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isProcessing}
                            className="text-[14px] font-medium text-brand-primary hover:text-brand-hover hover:underline underline-offset-2 transition-all disabled:opacity-50"
                        >
                            Browse Files
                        </button>
                    </div>

                    <p className="text-[11px] text-muted mt-2 font-medium tracking-wide">
                        PDF, PNG, JPG, TIFF — up to 25 files, 10MB each
                    </p>
                </motion.div>
            </motion.div>

            {/* FILE QUEUE */}
            {files.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-surface border border-border rounded-[12px] shadow-sm overflow-hidden flex flex-col"
                >
                    <div className="p-4 border-b border-border-subtle bg-canvas/30 flex justify-between items-center">
                        <h3 className="text-[14px] font-medium text-ink">File Queue ({files.length})</h3>
                        {files.length > 0 && !isProcessing && !processingComplete && (
                            <button
                                onClick={clearQueue}
                                className="text-[12px] font-medium text-slate hover:text-danger transition-colors"
                            >
                                Clear Queue
                            </button>
                        )}
                    </div>

                    <div className="divide-y divide-border-subtle max-h-[400px] overflow-y-auto">
                        <AnimatePresence>
                            {files.map((fileItem) => (
                                <motion.div
                                    key={fileItem.id}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="p-4 flex items-center gap-4 bg-surface hover:bg-surface-raised/50 transition-colors"
                                >
                                    {/* Icon */}
                                    <div className="w-10 h-10 rounded-[8px] bg-canvas border border-border-subtle flex items-center justify-center shrink-0">
                                        {getFileIcon(fileItem.file.type)}
                                    </div>

                                    {/* File Info & Progress */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <p className="text-[14px] font-medium text-ink truncate pr-4">
                                                {fileItem.file.name}
                                            </p>

                                            {/* Dynamic Status Display */}
                                            {fileItem.status === "Ready" && (
                                                <span className="text-[11px] font-medium text-muted bg-surface-raised px-2 py-0.5 rounded flex-shrink-0">
                                                    Ready
                                                </span>
                                            )}
                                            {fileItem.status === "Processing" && (
                                                <span className="text-[11px] font-medium text-brand-primary bg-brand-subtle px-2 py-0.5 rounded flex items-center gap-1.5 flex-shrink-0">
                                                    <Loader2 size={10} className="animate-spin" />
                                                    Processing...
                                                </span>
                                            )}
                                            {fileItem.status === "Done" && (
                                                <span className="text-[11px] font-medium text-success flex items-center gap-1 flex-shrink-0">
                                                    <CheckCircle2 size={12} /> Done
                                                </span>
                                            )}
                                            {fileItem.status === "Failed" && (
                                                <span className="text-[11px] font-medium text-danger flex items-center gap-1 flex-shrink-0">
                                                    <AlertCircle size={12} /> Failed
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex justify-between items-center mt-1.5">
                                            <p className="text-[12px] font-mono text-slate">
                                                {formatBytes(fileItem.file.size)}
                                            </p>

                                            {/* Processing Progress Bar vs Completed Actions */}
                                            {fileItem.status === "Processing" ? (
                                                <div className="w-1/2 flex items-center gap-3">
                                                    <span className="text-[10px] text-muted font-mono tracking-tighter w-20 text-right truncate">
                                                        {fileItem.currentStep}
                                                    </span>
                                                    <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-brand-primary transition-all duration-300 ease-out"
                                                            style={{ width: `${fileItem.progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ) : fileItem.status === "Done" ? (
                                                <Link href="/dashboard/invoices" className="text-[12px] font-medium text-brand-primary hover:underline">
                                                    View details
                                                </Link>
                                            ) : fileItem.status === "Failed" ? (
                                                <button className="text-[12px] font-medium text-danger hover:underline">
                                                    Retry
                                                </button>
                                            ) : null}
                                        </div>
                                    </div>

                                    {/* Remove Button (Only visible if not processing/done) */}
                                    {!isProcessing && !processingComplete && (
                                        <button
                                            onClick={() => removeFile(fileItem.id)}
                                            className="p-1.5 text-slate hover:text-danger hover:bg-danger-bg rounded-md transition-colors"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* ACTION FOOTER */}
                    {!processingComplete && (
                        <div className="p-4 border-t border-border bg-canvas/30">
                            <button
                                onClick={processFiles}
                                disabled={isProcessing}
                                className="w-full bg-brand-primary text-white py-3 rounded-[8px] font-medium hover:bg-brand-hover transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                            >
                                {isProcessing ? (
                                    <><Loader2 size={18} className="animate-spin" /> Processing {files.length} Invoices...</>
                                ) : (
                                    `Process All (${files.length})`
                                )}
                            </button>
                        </div>
                    )}
                </motion.div>
            )}

            {/* SUMMARY CARD (Appears at the very end) */}
            <AnimatePresence>
                {processingComplete && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="bg-brand-subtle border border-brand-primary/20 rounded-[12px] p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-success-bg text-success rounded-full flex items-center justify-center shrink-0">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <h3 className="font-heading text-[18px] font-semibold text-ink">Processing Complete</h3>
                                <p className="text-[14px] text-slate mt-0.5">
                                    <span className="font-medium text-ink">{files.length}</span> invoices processed.{" "}
                                    <span className="text-success">{files.filter(f => f.status === 'Done').length} approved</span>,{" "}
                                    <span className="text-danger">{files.filter(f => f.status === 'Failed').length} failed</span>.
                                </p>
                            </div>
                        </div>

                        <Link
                            href="/dashboard/invoices"
                            className="bg-surface border border-border text-ink px-5 py-2.5 rounded-[8px] font-medium hover:bg-surface-raised transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap"
                        >
                            View Results <ChevronRight size={16} />
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}