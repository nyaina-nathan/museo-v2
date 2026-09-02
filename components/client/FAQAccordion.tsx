"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string | string[];
}

interface FAQAccordionProps {
  items: FAQItem[];
  sectionTitle?: string;
}

export function FAQAccordion({ items, sectionTitle }: FAQAccordionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {sectionTitle && (
        <h2 className="mb-8 font-display text-2xl font-bold text-primary">
          {sectionTitle}
        </h2>
      )}
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-border rounded-lg bg-white overflow-hidden transition-all"
          >
            <button
              onClick={() => toggleExpanded(index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/80 transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-expanded={expandedIndex === index}
            >
              <h3 className="font-display text-base font-bold text-primary pr-4">
                {item.question}
              </h3>
              <span
                className={`text-primary transition-transform flex-shrink-0 ${
                  expandedIndex === index ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              >
                <i className="fa-solid fa-chevron-down"></i>
              </span>
            </button>

            {expandedIndex === index && (
              <div className="px-6 py-4 border-t border-border bg-white/50 animate-banner-message">
                <div className="text-text-dark leading-relaxed space-y-4">
                  {typeof item.answer === "string" ? (
                    <p>{item.answer}</p>
                  ) : (
                    item.answer.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
