'use client';

import React, { useState, useMemo } from 'react';
import { KG_ALL_SERVICES, ServiceDetail } from '@/lib/constants/servicesList';
import {
  Tag,
  Search,
  Clock,
  CheckCircle2,
  Calendar,
  Sparkles,
  ShieldCheck,
  Scale,
  Shirt,
  Layers,
  Sparkle,
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Services' },
  { id: 'bags', label: 'Wash Bags (₹/KG)' },
  { id: 'cleaning', label: 'Dry Cleaning & Press' },
  { id: 'linens', label: 'Linens, Curtains & Bedding' },
  { id: 'wedding', label: 'Wedding & Silk Care' },
  { id: 'sofa', label: 'Sofa & Upholstery' },
  { id: 'spa', label: 'Shoes, Bags & Plushies' },
  { id: 'repair', label: 'Darning & Fabric Restoration' },
] as const;

export const BAG_RATES = [
  {
    id: 'clean-fold',
    name: 'Clean & Fold',
    rate: '₹79',
    unit: '/ kg',
    color: 'border-blue-500 bg-blue-50/50 text-blue-900',
    badge: 'Daily Essentials',
    turnaround: '24 Hours',
    desc: 'T-shirts, shorts, pajamas, track pants, gym wear & daily casuals.',
    inclusions: ['Antiseptic wash cycle', 'Tumble dried & folded', 'Eco-friendly German detergent'],
  },
  {
    id: 'wash-iron',
    name: 'Wash & Steam Iron',
    rate: '₹119',
    unit: '/ kg',
    color: 'border-[#6EC5B8] bg-emerald-50/50 text-slate-900',
    badge: 'Office & Casuals',
    turnaround: '24 Hours',
    popular: true,
    desc: 'Formal shirts, trousers, kurtas, denim & daily office wear.',
    inclusions: ['Collars & cuffs steam-pressed', 'Hanger or crisp fold packaging', 'Fabric softener infused'],
  },
  {
    id: 'home-linens',
    name: 'Home Linens',
    rate: '₹89',
    unit: '/ kg',
    color: 'border-amber-500 bg-amber-50/50 text-amber-950',
    badge: 'Household Wash',
    turnaround: '48 Hours',
    desc: 'Bedsheets, duvet covers, pillowcases, bath towels & napkins.',
    inclusions: ['High-temp thermal disinfection', 'Dust mite extraction', 'Crisp rotary flat ironing'],
  },
  {
    id: 'dry-clean-bag',
    name: 'Premium Dry Clean',
    rate: '₹149',
    unit: '/ pc',
    color: 'border-purple-500 bg-purple-50/50 text-purple-950',
    badge: 'Delicates & Formals',
    turnaround: '48 Hours',
    desc: 'Blazers, 2-piece suits, silk sarees, winter jackets & partywear.',
    inclusions: ['Perchloroethylene-free solvent', 'Hand inspection for spots', 'Dust-proof hanger bag'],
  },
];

export default function ItemizedPricingTable() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract all itemized pricing rows
  const allPricingRows = useMemo(() => {
    const rows: {
      serviceId: string;
      serviceName: string;
      category: string;
      item: string;
      price: string;
      turnaround: string;
      features: string[];
    }[] = [];

    KG_ALL_SERVICES.forEach((service) => {
      if (service.pricingItems && service.pricingItems.length > 0) {
        service.pricingItems.forEach((p) => {
          rows.push({
            serviceId: service.id,
            serviceName: service.name,
            category: service.category,
            item: p.item,
            price: p.price,
            turnaround: service.turnaround,
            features: service.features,
          });
        });
      }
    });

    return rows;
  }, []);

  // Filter rows by category and search
  const filteredRows = useMemo(() => {
    return allPricingRows.filter((row) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        selectedCategory === 'bags' ||
        row.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        row.item.toLowerCase().includes(q) ||
        row.serviceName.toLowerCase().includes(q) ||
        row.price.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [allPricingRows, selectedCategory, searchQuery]);

  return (
    <section id="pricing" className="py-20 bg-slate-50/80 border-y border-slate-200 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <Tag className="h-3.5 w-3.5 text-emerald-600" />
            100% Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Clear, Transparent Pricing
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            No surprise add-ons. Verified weight via calibrated digital scale in front of you at pickup, with instant WhatsApp receipts.
          </p>
        </div>

        {/* 4 Core Wash Bag Rate Cards */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Scale className="h-5 w-5 text-[#6EC5B8]" />
              Core Wash Bag Rates (Priced per KG)
            </h3>
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
              Doorstep pickup & delivery included
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BAG_RATES.map((bag) => (
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

                <h4 className="text-xl font-bold text-slate-900 mb-1">{bag.name}</h4>
                <p className="text-xs text-slate-500 min-h-[34px] mb-4 leading-relaxed">{bag.desc}</p>

                <div className="flex items-baseline gap-1 mb-4 pb-4 border-b border-slate-100">
                  <span className="text-4xl font-extrabold text-slate-900">{bag.rate}</span>
                  <span className="text-sm font-semibold text-slate-500">{bag.unit}</span>
                  <span className="ml-auto text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {bag.turnaround}
                  </span>
                </div>

                <ul className="space-y-2 mb-6 text-xs text-slate-600">
                  {bag.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#6EC5B8] mt-0.5 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>

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
        </div>

        {/* Detailed Itemized Rate Card Directory */}
        <div className="rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
          {/* Controls: Search & Category Tabs */}
          <div className="p-6 border-b border-slate-200 bg-slate-50/50 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Shirt className="h-5 w-5 text-[#6EC5B8]" />
                  Itemized Price List (By Garment & Service)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Explore per-piece pricing for dry cleaning, wedding wear, shoes, sofas, and repairs.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search shirt, saree, suit, shoes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#6EC5B8] focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100/70 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-6">Garment / Item</th>
                  <th className="py-3.5 px-6">Service Category</th>
                  <th className="py-3.5 px-6">Turnaround</th>
                  <th className="py-3.5 px-6">Price (₹)</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRows.length > 0 ? (
                  filteredRows.map((row, idx) => (
                    <tr
                      key={`${row.serviceId}-${row.item}-${idx}`}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="py-4 px-6 font-semibold text-slate-900">
                        <div className="flex items-center gap-2.5">
                          <span className="h-2 w-2 rounded-full bg-[#6EC5B8]" />
                          {row.item}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px]">
                          {row.serviceName}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-500">
                        <span className="flex items-center gap-1.5 text-[11px]">
                          <Clock className="h-3.5 w-3.5 text-slate-400" />
                          {row.turnaround}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-900 text-sm">
                        <span className="text-[#0d9488] font-black">{row.price}</span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <a
                          href="#order"
                          className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-[11px] font-bold text-slate-800 hover:bg-[#6EC5B8] hover:text-white transition"
                        >
                          Book Now
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      <p className="font-medium text-sm">No items found matching &quot;{searchQuery}&quot;</p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('all');
                        }}
                        className="mt-2 text-xs text-[#6EC5B8] underline font-semibold"
                      >
                        Reset filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Transparent Assurance Footer */}
          <div className="p-6 bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-bold text-white">
                <ShieldCheck className="h-4 w-4 text-[#6EC5B8]" />
                Zero Hidden Charges Guarantee
              </div>
              <p className="text-xs text-slate-400">
                Doorstep digital scale weighing • Free pickup & delivery for orders above ₹499 • No unexpected surges
              </p>
            </div>

            <a
              href="#order"
              className="rounded-xl bg-[#6EC5B8] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#5bb3a6] transition whitespace-nowrap"
            >
              Schedule Doorstep Pickup
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
