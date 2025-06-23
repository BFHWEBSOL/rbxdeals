"use client";
import React from "react";
import { useState } from "react";

export default function FAQAccordion({ items }: { items: { question: string, answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="w-full max-w-2xl mx-auto">
      {items.map((item, i) => (
        <div key={i} className="mb-2 rounded-2xl bg-card-bg-light dark:bg-card-bg-dark shadow-card-bg-light dark:shadow-card-bg-dark overflow-hidden">
          <button
            className="w-full flex justify-between items-center px-6 py-4 text-left text-primary-text-light dark:text-primary-text-dark font-semibold focus:outline-none focus:ring-2 focus:ring-accent transition"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span>{item.question}</span>
            <span className="ml-4 text-accent text-2xl">{openIndex === i ? "−" : "+"}</span>
          </button>
          <div
            className={`px-6 pb-4 text-muted-text-light dark:text-muted-text-dark text-sm transition-all duration-200 ease-in-out ${openIndex === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
            style={{
              transitionProperty: 'max-height, opacity',
            }}
          >
            {openIndex === i && <div>{item.answer}</div>}
          </div>
        </div>
      ))}
    </div>
  );
} 