'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Truck, Clock, ShieldCheck, ChevronRight, MapPin, Check } from 'lucide-react';

export default function SmartphoneMockup() {
  return (
    <div className="relative mx-auto w-[330px] sm:w-[350px] select-none">
      {/* Ambient Phone Shadow & Back Glow */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-[#6EC5B8]/25 via-emerald-500/15 to-slate-900/40 blur-2xl rounded-[60px] opacity-70 pointer-events-none" />

      {/* Titanium Hardware Frame */}
      <div className="relative rounded-[55px] p-[10px] bg-gradient-to-b from-[#3A3F45] via-[#202428] to-[#14171A] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.15)_inset] ring-1 ring-black/80">
        {/* Hardware Buttons - Left: Action & Volume Rockers */}
        <div className="absolute -left-[5px] top-[110px] w-[5px] h-[28px] bg-[#474D54] rounded-l-md shadow-sm" />
        <div className="absolute -left-[5px] top-[155px] w-[5px] h-[50px] bg-[#474D54] rounded-l-md shadow-sm" />
        <div className="absolute -left-[5px] top-[215px] w-[5px] h-[50px] bg-[#474D54] rounded-l-md shadow-sm" />

        {/* Hardware Button - Right: Power / Lock Button */}
        <div className="absolute -right-[5px] top-[165px] w-[5px] h-[68px] bg-[#474D54] rounded-r-md shadow-sm" />

        {/* Inner Phone Display (Authentic Tall Smartphone Aspect Ratio) */}
        <div className="relative rounded-[45px] bg-white h-[660px] flex flex-col justify-between overflow-hidden shadow-inner border border-slate-300">
          {/* Subtle Screen Glass Glare */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none z-30" />

          {/* Top Speaker Ear Slit */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#1C1E21] rounded-full z-40 opacity-70" />

          {/* Top Bar: Dynamic Island & Status Icons */}
          <div className="relative z-30 pt-3 pb-2 px-6 flex items-center justify-between bg-white text-slate-900">
            <span className="text-[12px] font-bold tracking-tight">9:41</span>

            {/* Apple Dynamic Island */}
            <div className="h-[24px] w-[110px] bg-black rounded-full flex items-center justify-between px-3 shadow-md">
              <div className="h-2.5 w-2.5 rounded-full bg-[#181818] ring-1 ring-slate-800" />
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#6EC5B8] animate-pulse" />
                <span className="text-[9px] font-bold text-white tracking-wider">KG</span>
              </div>
            </div>

            {/* Signal & Battery */}
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-900">
              <span className="text-[10px] font-bold">5G</span>
              <div className="w-[20px] h-[11px] rounded-[3px] border-[1.5px] border-slate-900 p-[1px] flex items-center">
                <div className="h-full w-full bg-slate-900 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* App Body Content */}
          <div className="flex-1 px-4 py-2 space-y-3 overflow-y-auto no-scrollbar bg-slate-50/70">
            {/* App Nav Header */}
            <div className="flex items-center justify-between bg-white p-2.5 rounded-2xl border border-slate-200/70 shadow-2xs">
              <div className="flex items-center gap-2">
                <div className="relative h-7 w-20">
                  <Image src="/logo.png" alt="KG Laundry" fill className="object-contain" priority />
                </div>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                Driver Live
              </span>
            </div>

            {/* Active Order Card */}
            <div className="rounded-2xl bg-white p-3.5 shadow-sm border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Live Order</span>
                  <span className="text-xs font-black text-slate-900">#KG-8492 • Hyderabad</span>
                </div>
                <span className="rounded-xl bg-[#6EC5B8]/20 px-2.5 py-1 text-[11px] font-black text-emerald-800">
                  ₹410
                </span>
              </div>

              {/* Selected Bag Card */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="h-10 w-10 rounded-xl bg-[#6EC5B8] text-white flex items-center justify-center font-black text-xs shadow-sm">
                  KG
                </div>
                <div className="flex-1">
                  <div className="font-bold text-xs text-slate-900">Clean & Fold Bag</div>
                  <div className="text-[10px] text-slate-500">5.2 kg • Casuals & Linens</div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  24h Return
                </span>
              </div>

              {/* Progress Tracker */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[11px] font-semibold text-slate-700">
                  <span className="flex items-center gap-1 text-emerald-700 font-bold">
                    <Truck className="h-3.5 w-3.5" /> Driver Arriving
                  </span>
                  <span className="text-slate-500">In 12 Mins</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#6EC5B8] to-emerald-500 w-4/5 rounded-full" />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Concierge: Ramesh K.</span>
                  <span className="font-bold text-slate-800">Delivery: Tomorrow</span>
                </div>
              </div>
            </div>

            {/* Quick Service Bags Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-base">👔</span>
                  <span className="text-[10px] font-extrabold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">₹119/kg</span>
                </div>
                <div className="font-bold text-xs text-slate-900 leading-tight">Wash & Iron</div>
                <div className="text-[10px] text-slate-400">Steam pressed</div>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-base">✨</span>
                  <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">₹149/pc</span>
                </div>
                <div className="font-bold text-xs text-slate-900 leading-tight">Dry Clean</div>
                <div className="text-[10px] text-slate-400">Suits & Sarees</div>
              </div>
            </div>

            {/* Guaranteed Doorstep Care Badge */}
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-100 text-[11px] text-emerald-900 font-medium">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>100% Color Separated & Sanitized Wash</span>
            </div>
          </div>

          {/* Bottom Action Section: Place Your Order CTA & Home Bar */}
          <div className="relative z-30 p-4 pt-2 bg-white border-t border-slate-100">
            <a
              href="#order"
              className="flex items-center justify-center gap-2 w-full rounded-2xl bg-[#6EC5B8] py-3.5 text-center text-sm font-extrabold text-white shadow-lg shadow-emerald-500/25 hover:bg-[#5bb3a6] transition"
            >
              <span>Place Your Order</span>
              <ChevronRight className="h-4 w-4" />
            </a>

            {/* Bottom iOS Home Indicator */}
            <div className="mt-3 h-1 w-36 bg-slate-300 rounded-full mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
