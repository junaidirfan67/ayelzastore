"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export const AnnouncementBar: React.FC = () => {
  const { announcement } = useStore();

  if (!announcement || !announcement.enabled) return null;

  return (
    <div className="bg-brand-charcoal text-brand-ivory text-xs py-2 px-4 tracking-wider uppercase border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center flex-wrap">
        <Sparkles className="w-3.5 h-3.5 text-brand-rose animate-pulse hidden sm:inline-block" />
        <span className="font-medium tracking-wide">
          {announcement.text}
        </span>
        {announcement.linkText && (
          <Link
            href={announcement.linkUrl || "/shop"}
            className="inline-flex items-center gap-1 font-semibold text-brand-rose underline underline-offset-4 hover:text-white transition-colors ml-1"
          >
            {announcement.linkText}
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  );
};
