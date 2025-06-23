import React from "react";
import { ReactNode } from "react";

export default function FeatureCard({ icon, title, description }: { icon: ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center bg-card-bg-light dark:bg-card-bg-dark rounded-2xl shadow-card-bg-light dark:shadow-card-bg-dark p-6 w-full max-w-xs text-center">
      <div className="text-4xl mb-3 text-accent">{icon}</div>
      <h3 className="text-lg font-bold mb-2 text-primary-text-light dark:text-primary-text-dark">{title}</h3>
      <p className="text-muted-text-light dark:text-muted-text-dark text-sm">{description}</p>
    </div>
  );
} 