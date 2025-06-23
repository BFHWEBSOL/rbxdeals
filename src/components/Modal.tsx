"use client";
import React from "react";
import { ReactNode, useEffect } from "react";

export default function Modal({ open, onClose, children, title }: { open: boolean, onClose: () => void, children: ReactNode, title?: string }) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm transition-all">
      <div className="relative bg-card-bg-light dark:bg-card-bg-dark rounded-2xl shadow-card-bg-light dark:shadow-card-bg-dark p-6 w-full max-w-md mx-2 animate-fadeInScale">
        <button onClick={onClose} aria-label="Close" className="absolute top-3 right-3 text-muted-text-light dark:text-muted-text-dark hover:text-accent text-2xl font-bold">×</button>
        {title && <h2 className="text-xl font-bold mb-4 text-primary-text-light dark:text-primary-text-dark">{title}</h2>}
        {children}
      </div>
      <style jsx global>{`
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fadeInScale { animation: fadeInScale 0.2s cubic-bezier(.4,0,.2,1); }
      `}</style>
    </div>
  );
} 