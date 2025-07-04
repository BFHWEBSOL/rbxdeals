"use client";
import { useSession } from "../../context/SessionContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, mounted } = useSession();
  const router = useRouter();
  useEffect(() => { if (mounted && !user) router.push("/"); }, [user, router, mounted]);
  useEffect(() => { router.replace("/Earn"); }, [router]);
  if (!mounted) return null;
  if (!user) return null;

  return null;
} 