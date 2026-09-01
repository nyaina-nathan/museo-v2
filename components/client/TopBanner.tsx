"use client";

import { useEffect, useState } from "react";

const BANNER_MESSAGES = [
  "100% authentic",
  "On command",
  "Deliver everywhere",
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://facebook.com/museo.mg",
    icon: (
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/museo.mg",
    icon: (
      <>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </>
    ),
  },
];

export function TopBanner() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((current) => (current + 1) % BANNER_MESSAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary text-white">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center px-5 py-2 md:px-10 lg:px-[60px]">
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-white/70 transition-colors hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                {link.icon}
              </svg>
            </a>
          ))}
        </div>

        <p
          aria-live="polite"
          className="text-center text-xs font-medium uppercase tracking-[0.2em] text-white"
        >
          <span key={messageIndex} className="animate-banner-message block">
            {BANNER_MESSAGES[messageIndex]}
          </span>
        </p>

        <div aria-hidden="true" />
      </div>
    </div>
  );
}
