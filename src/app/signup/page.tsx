"use client";
import React from "react";
import { useTheme } from "next-themes";

export default function SignupPage() {
  const { theme } = useTheme();
  // If you have a Signup component, import and render it here. Otherwise, render a placeholder.
  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-main-bg-dark text-primary-text-dark' : 'bg-main-bg-light text-primary-text-light'}`}>
      <div className="text-2xl font-bold">Signup page coming soon.</div>
    </div>
  );
} 