"use client";

import { useEffect, useState } from "react";
import { SocialLinks } from "@/components/client/SocialLinks";

const BANNER_MESSAGES = [
  "100% authentic",
  "On command",
  "Deliver everywhere",
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
          <SocialLinks linkClassName="text-white/70 transition-colors hover:text-white" />
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
