"use client";
import React from "react";
import Login from "../../components/Login";
import { useTheme } from "next-themes";

export default function LoginPage() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-main-bg-dark text-primary-text-dark' : 'bg-main-bg-light text-primary-text-light'}`}>
      <Login />
    </div>
  );
} 