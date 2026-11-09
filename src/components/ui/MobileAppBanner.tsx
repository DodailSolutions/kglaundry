'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Sparkles, Download, ArrowRight, ShieldCheck } from 'lucide-react';

export default function MobileAppBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const dismissed = sessionStorage.getItem('kg_app_banner_dismissed');

    if (isMobile && !dismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setClosed(true);
    sessionStorage.setItem('kg_app_banner_dismissed', 'true');
  };

  if (!isVisible || closed) return null;

  return (
    <div className="fixed bottom-28 left-4 right-4 z-40 md:hidden animate-in slide-in-from-bottom-4 duration-300">
      <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-slate-900/95 via-[#1E2325]/95 to-[#2C3032]/95 p-3.5 text-white shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        {/* Glow Accent */}
        <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[#6EC5B8]/25 blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          aria-label="Close"
          className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white transition"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3.5 pr-6">
          {/* Official KG Laundry Logo in Pure White Container */}
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-lg border border-slate-100">
            <Image
              src="/logo.png"
              alt="KG Laundry"
              fill
              className="object-contain p-1.5"
              priority
            />
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-black text-sm tracking-tight text-white font-['Plus_Jakarta_Sans',sans-serif]">
                KG Laundry App
              </span>
              <span className="rounded-full bg-[#6EC5B8]/20 px-2 py-0.5 text-[9px] font-extrabold text-[#6EC5B8] border border-[#6EC5B8]/30">
                4.9 ★ (15k+)
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium leading-snug">
              Live driver tracking & instant ₹100 discount on your first wash!
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-3.5 flex items-center gap-2.5 pt-2 border-t border-white/10">
          <a
            href="#download"
            onClick={handleDismiss}
            className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-[#6EC5B8] py-2.5 px-4 text-center text-xs font-black text-slate-900 shadow-md hover:bg-[#5bb3a6] active:scale-95 transition"
          >
            <Download className="h-4 w-4 stroke-[2.5]" />
            <span>Download App</span>
          </a>

          <button
            onClick={handleDismiss}
            className="rounded-2xl px-3 py-2 text-center text-xs font-semibold text-slate-400 hover:text-white"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
