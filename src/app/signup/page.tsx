"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectToAuth() {
  const router = useRouter();
  useEffect(() => { router.replace("/auth"); }, [router]);
  return null;
} 