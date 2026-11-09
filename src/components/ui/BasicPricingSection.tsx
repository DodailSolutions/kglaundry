'use client';

import React from 'react';
import Link from 'next/link';
import {
  Tag,
  Clock,
  CheckCircle2,
  Scale,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const BASIC_BAGS = [
  {
    id: 'clean-fold',
    name: 'Clean & Fold',
    rate: '₹79',
    unit: '/ kg',
    badge: 'Daily Wear',
    turnaround: '24 Hours',
    desc: 'T-shirts, shorts, pajamas, gym wear & casual clothes.',
    highlight: 'Antiseptic wash cycle & tumble folded',
  },
  {
    id: 'wash-iron',
    name: 'Wash & Steam Iron',
    rate: '₹119',
    unit: '/ kg',
    badge: 'Office Wear',
    popular: true,
    turnaround: '24 Hours',
    desc: 'Formal shirts, trousers, kurtas, denim & daily office wear.',
    highlight: 'Vacuum vertical steam iron finish',
  },
  {
    id: 'home-linens',
    name: 'Home Linens',
    rate: '₹89',
    unit: '/ kg',
    badge: 'Household',
    turnaround: '48 Hours',
    desc: 'Bedsheets, duvet covers, pillowcases, and bath towels.',
    highlight: 'High-temp thermal anti-allergen cycle',
  },
  {
    id: 'dry-clean',
    name: 'Premium Dry Clean',
    rate: '₹149',
    unit: '/ pc',
    badge: 'Delicates',
    turnaround: '48 Hours',
    desc: 'Blazers, 2-piece suits, silk sarees, jackets & partywear.',
    highlight: 'Eco-solvent care & hanger packaging',
  },
];

export default function BasicPricingSection() {
  return (
    <section id="pricing" className="py-20 bg-slate-50/80 border-y border-slate-200 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <Tag className="h-3.5 w-3.5 text-emerald-600" />
            100% Transparent Rates
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Clear, Honest Pricing in Indian Rupees (₹)
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Doorstep digital scale weighing in front of you. Zero hidden fees or unexpected surge charges.
          </p>
        </div>

        {/* 4 Core Wash Bag Rate Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {BASIC_BAGS.map((bag) => (
            <div
              key={bag.id}
              className={`relative rounded-3xl border-2 p-6 transition-all hover:shadow-xl hover:-translate-y-1 bg-white ${
                bag.popular
                  ? 'border-[#6EC5B8] shadow-lg shadow-emerald-500/10 ring-2 ring-[#6EC5B8]/20'
                  : 'border-slate-200'
              }`}
            >
              {bag.popular && (
                <span className="absolute -top-3.5 right-6 rounded-full bg-[#6EC5B8] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-sm">
                  Most Popular
                </span>
              )}

              <div className="inline-block rounded-xl px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 mb-3">
                {bag.badge}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-1">{bag.name}</h3>
              <p className="text-xs text-slate-500 min-h-[34px] mb-4 leading-relaxed">{bag.desc}</p>

              <div className="flex items-baseline gap-1 mb-4 pb-4 border-b border-slate-100">
                <span className="text-4xl font-extrabold text-slate-900">{bag.rate}</span>
                <span className="text-sm font-semibold text-slate-500">{bag.unit}</span>
                <span className="ml-auto text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {bag.turnaround}
                </span>
              </div>

              <div className="flex items-start gap-2 mb-6 text-xs text-slate-600">
                <CheckCircle2 className="h-4 w-4 text-[#6EC5B8] mt-0.5 shrink-0" />
                <span>{bag.highlight}</span>
              </div>

              <a
                href="#order"
                className={`block w-full text-center rounded-xl py-3 text-xs font-bold transition ${
                  bag.popular
                    ? 'bg-[#6EC5B8] text-white hover:bg-[#5bb3a6] shadow-md shadow-emerald-500/20'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                Book This Bag
              </a>
            </div>
          ))}
        </div>

        {/* Action Callout Linking to Dedicated Full Pricing Page */}
        <div className="rounded-3xl bg-slate-900 p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-base font-bold text-white">
              <Scale className="h-5 w-5 text-[#6EC5B8]" />
              Need pricing for specific garments, sarees, shoes, sofas or dyeing?
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Explore our comprehensive itemized rate card covering over 12 laundry & dry cleaning categories.
            </p>
          </div>

          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#6EC5B8] px-7 py-4 text-xs sm:text-sm font-bold text-white hover:bg-[#5bb3a6] shadow-lg shadow-emerald-500/20 transition hover:scale-105 whitespace-nowrap"
          >
            <span>View Full Itemized Price List</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
