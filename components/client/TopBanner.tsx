"use client";

import { useEffect, useState } from "react";
import { SocialLinks } from "@/components/client/SocialLinks";
import { useDictionary } from "@/libs/i18n/locale-provider";

export function TopBanner() {
  const [messageIndex, setMessageIndex] = useState(0);
  const dict = useDictionary();
  const messages = dict.banner.messages;

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((current) => (current + 1) % messages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="bg-primary text-white">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center px-5 py-5 md:px-10 lg:px-[60px]">
        <div className="flex items-center gap-4">
          <SocialLinks linkClassName="text-white/70 transition-colors hover:text-white" />
        </div>

        <p
          aria-live="polite"
          className="text-center text-xs font-medium uppercase tracking-[0.2em] text-white"
        >
          <span key={messageIndex} className="animate-banner-message block">
            {messages[messageIndex]}
          </span>
        </p>

        <div aria-hidden="true" />
      </div>
    </div>
  );
}
