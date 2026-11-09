'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Calendar, ChevronDown, Sparkles, Truck, ShieldCheck, Tag, ArrowRight } from 'lucide-react';
import { KG_ALL_SERVICES } from '@/lib/constants/servicesList';
import ServiceIcon from '@/components/ui/ServiceIcons';
import Logo from '@/components/ui/Logo';

const PROMO_ANNOUNCEMENTS = [
  {
    icon: Sparkles,
    text: 'First Order? Use code FRESHKG for 20% OFF your first wash bag!',
    highlight: 'FRESHKG',
  },
  {
    icon: Truck,
    text: 'Free Doorstep Pickup & Delivery in Hyderabad on orders above ₹499',
    highlight: 'FREE PICKUP',
  },
  {
    icon: ShieldCheck,
    text: '100% Individual Washing Drums • Never mixed with other clothes',
    highlight: 'HYGIENIC',
  },
  {
    icon: Tag,
    text: 'Doorstep Digital Weighing • Instant WhatsApp Invoice • Zero Hidden Fees',
    highlight: 'TRANSPARENT',
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [activePromoIndex, setActivePromoIndex] = useState(0);

  // Auto-rotating sliding announcement ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePromoIndex((prev) => (prev + 1) % PROMO_ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentPromo = PROMO_ANNOUNCEMENTS[activePromoIndex];
  const PromoIcon = currentPromo.icon;

  const renderAnnouncementBar = (isMobile: boolean) => (
    <div
      className={`${
        isMobile ? 'block md:hidden border-t' : 'hidden md:block border-b'
      } bg-[#2C3032] py-2 px-4 text-center text-xs font-medium text-slate-200 border-white/5 relative overflow-hidden`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-center gap-3 transition-all duration-500 ease-in-out">
        <span className="flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-300">
          <PromoIcon className="h-3.5 w-3.5 text-[#6EC5B8] shrink-0" />
          <span>{currentPromo.text}</span>
        </span>

        {/* Quick Dots Indicator */}
        <div className="hidden sm:flex items-center gap-1 ml-3">
          {PROMO_ANNOUNCEMENTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActivePromoIndex(i)}
              aria-label={`Announcement ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === activePromoIndex ? 'w-4 bg-[#6EC5B8]' : 'w-1.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md transition-all">
      {/* 1. Desktop Only: Announcement Bar ABOVE the Header */}
      {renderAnnouncementBar(false)}

      {/* 2. Main Navbar */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo - Official Original KG Laundry Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-14 w-40 overflow-hidden transition-transform group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="KG Laundry"
              fill
              sizes="(max-width: 768px) 140px, 180px"
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          {/* Services with Mega Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              className="flex items-center gap-1.5 transition hover:text-emerald-700 font-semibold py-2"
            >
              <span>Services</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${servicesDropdownOpen ? 'rotate-180 text-emerald-600' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {servicesDropdownOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-[540px] rounded-3xl bg-white p-5 shadow-2xl border border-slate-100 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <div className="text-xs font-black uppercase tracking-wider text-black">
                    Discover Our Services
                  </div>
                  <Link
                    href="/#services"
                    onClick={() => setServicesDropdownOpen(false)}
                    className="text-xs font-bold text-emerald-700 hover:underline"
                  >
                    View All 13 Services →
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-[360px] overflow-y-auto pr-1">
                  {KG_ALL_SERVICES.map((s) => (
                    <Link
                      key={s.id}
                      href={`/services/${s.id}`}
                      onClick={() => setServicesDropdownOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-emerald-50 transition group"
                    >
                      <div className="h-9 w-9 rounded-xl bg-emerald-50 text-slate-800 flex items-center justify-center shrink-0 border border-emerald-100 group-hover:bg-[#6EC5B8] group-hover:text-white transition">
                        <ServiceIcon name={s.iconName} className="h-5 w-5" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="font-bold text-xs text-slate-900 group-hover:text-emerald-800 truncate">
                          {s.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium">
                          From {s.priceStart} • {s.turnaround}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <Sparkles className="h-3 w-3" /> Free Doorstep Pickup & Delivery
                  </span>
                  <Link
                    href="/#order"
                    onClick={() => setServicesDropdownOpen(false)}
                    className="font-bold text-slate-900 hover:text-emerald-700"
                  >
                    Place Your Order →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/#how-it-works" className="transition hover:text-emerald-700">
            How It Works
          </Link>
          <Link href="/pricing" className="transition hover:text-emerald-700">
            Pricing (₹)
          </Link>
          <Link href="/#faq" className="transition hover:text-emerald-700">
            FAQ
          </Link>
        </nav>

        {/* Action CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="#download"
            className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            <svg className="h-4 w-4 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="3" ry="3" />
              <path d="M12 18h.01" />
            </svg>
            Get App
          </Link>
          <Link
            href="#order"
            className="flex items-center gap-2 rounded-full bg-[#6EC5B8] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#5bb3a6] hover:shadow-md"
          >
            <Calendar className="h-3.5 w-3.5" />
            Place Your Order
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl p-2 text-slate-700 hover:bg-slate-100"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* 3. Mobile Only: Announcement Bar BELOW the Navbar */}
      {renderAnnouncementBar(true)}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-200 max-h-[80vh] overflow-y-auto">
          <div className="pt-2">
            <div className="text-xs font-black uppercase tracking-wider text-black mb-2">
              Our 13 Services
            </div>
            <div className="grid grid-cols-2 gap-2">
              {KG_ALL_SERVICES.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-xs font-bold text-slate-800"
                >
                  <ServiceIcon name={s.iconName} className="h-4 w-4 text-[#2C3032] shrink-0" />
                  <span className="truncate">{s.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-2">
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              How It Works
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Pricing (₹)
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              FAQ
            </Link>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="#order"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#6EC5B8] py-3 text-center text-xs font-bold text-white shadow-md"
            >
              <Calendar className="h-4 w-4" />
              Place Your Order
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
