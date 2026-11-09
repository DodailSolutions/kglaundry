'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SmartphoneMockup from '@/components/ui/SmartphoneMockup';
import BasicPricingSection from '@/components/ui/BasicPricingSection';
import ServiceSparkles from '@/components/ui/ServiceSparkles';
import { KG_ALL_SERVICES } from '@/lib/constants/servicesList';
import ServiceIcon from '@/components/ui/ServiceIcons';
import {
  Sparkles,
  Clock,
  ShieldCheck,
  Check,
  Smartphone,
  ArrowRight,
  Truck,
  RotateCcw,
  Star,
  ChevronDown,
  Calendar,
  Phone,
  Tag,
  CheckCircle,
  Award,
  HeartHandshake,
  Layers,
  Leaf,
  Scale,
  Sparkle,
} from 'lucide-react';

export default function HomePage() {
  // Doorstep Booking Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Clean & Fold (Wash by KG)',
    address: '',
    pickupTime: 'Today: 2:00 PM - 5:00 PM',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitting(true);

    try {
      // In production connects to Payload /api/leads
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).catch(() => null);

      setFormSubmitted(true);
    } catch {
      setFormSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section (Washmen App & Download Style) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-emerald-50/30 pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-4 py-1.5 text-xs font-semibold text-emerald-800">
                <Truck className="h-4 w-4 text-emerald-600" />
                On-Time & Safe Doorstep Delivery across Hyderabad
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Doorstep Laundry & Dry Cleaning,{' '}
                <span className="text-[#6EC5B8] underline decoration-emerald-200 decoration-wavy decoration-2">
                  Made Effortless.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                Pack your clothes in our specialized wash bags. We separate whites and colors, wash with eco-friendly German detergents, steam iron, and return them crisp and clean at your preferred time slot.
              </p>

              {/* Action Buttons & App Badges */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#order"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#6EC5B8] px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-[#5bb3a6] hover:shadow-xl"
                >
                  <Calendar className="h-5 w-5" />
                  Place Your Order
                </a>

                <a
                  href="#pricing"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <Tag className="h-5 w-5 text-emerald-600" />
                  View Pricing (₹/kg)
                </a>
              </div>

              {/* Mobile App Download Badges */}
              <div id="download" className="pt-4 border-t border-slate-200/80 text-center sm:text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  Download our mobile app for live driver & laundry tracking:
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  {/* Apple App Store */}
                  <a
                    href="https://apps.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 rounded-2xl bg-black px-5 py-3 text-white shadow-md transition hover:bg-slate-800 hover:scale-105"
                  >
                    <svg className="h-7 w-7 fill-current text-white shrink-0" viewBox="0 0 384 512">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                    </svg>
                    <div className="text-left leading-none">
                      <div className="text-[10px] text-slate-300 font-normal">Download on the</div>
                      <div className="text-base font-bold tracking-tight mt-0.5">App Store</div>
                    </div>
                  </a>

                  {/* Google Play */}
                  <a
                    href="https://play.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 rounded-2xl bg-black px-5 py-3 text-white shadow-md transition hover:bg-slate-800 hover:scale-105"
                  >
                    <svg className="h-7 w-7 shrink-0" viewBox="0 0 512 512">
                      <path fill="#4285F4" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z"/>
                      <path fill="#34A853" d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256-256L47 0z"/>
                      <path fill="#EA4335" d="M325.3 277.7l60.1 60.1L104.6 499l220.7-221.3z"/>
                      <path fill="#FBBC04" d="M481.3 234.3c15.2 8.7 24.7 24.7 24.7 41.7s-9.5 33-24.7 41.7l-95.9 55.1-60.1-60.1 60.1-60.1 95.9-55.1z"/>
                    </svg>
                    <div className="text-left leading-none">
                      <div className="text-[10px] text-slate-300 font-normal">GET IT ON</div>
                      <div className="text-base font-bold tracking-tight mt-0.5">Google Play</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Trust Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-4 text-center">
                <div>
                  <div className="text-2xl font-extrabold text-slate-900">15k+</div>
                  <div className="text-xs text-slate-500">Wash Bags Delivered</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-emerald-600">On-Time</div>
                  <div className="text-xs text-slate-500">Scheduled Delivery</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-900">4.9 ★</div>
                  <div className="text-xs text-slate-500">Customer Rating</div>
                </div>
              </div>
            </div>

            {/* Right Phone Mockup (Ultra-Realistic Modern Smartphone) */}
            <div className="lg:col-span-5 flex justify-center">
              <SmartphoneMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Discover Our Services Section (Styled per Syed bhai's exact instructions) */}
      <section id="services" className="py-20 bg-[#6EC5B8] relative overflow-hidden">
        {/* Interactive Three.js/Canvas Sparkles with black border and white fill */}
        <ServiceSparkles />
        {/* Subtle Ambient Sparkle Stars in Background */}
        <div className="absolute top-10 left-10 pointer-events-none opacity-40">
          <Sparkles className="h-6 w-6 text-white/50" />
        </div>
        <div className="absolute bottom-12 right-12 pointer-events-none opacity-40">
          <Sparkles className="h-8 w-8 text-white/40" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header per Syed bhai: Tiny Sparkle Badge + Discover Our Services on TOP, Tagline BELOW, both in Bold Black */}
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-14">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-1 text-[11px] font-black tracking-wider text-white shadow-sm mb-1 uppercase">
              <Sparkles className="h-3 w-3 text-[#6EC5B8]" />
              <span>Hygienic & Sanitized Garment Care</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight">
              Discover Our Services
            </h2>
            <p className="text-base sm:text-xl font-black text-black tracking-wide uppercase">
              Simple, affordable, designed just for you.
            </p>
            <p className="text-black/85 font-medium text-sm sm:text-base max-w-2xl mx-auto pt-2">
              From everyday wash by kg to delicate wedding lehengas, comforters, sofas, and shoes—choose from our 13 specialized doorstep services.
            </p>
          </div>

          {/* 13 Dedicated Service Cards Grid with Unique Custom SVG Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {KG_ALL_SERVICES.map((service) => (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between rounded-3xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl border border-white/60"
              >
                <div>
                  {/* Top Bar with Icon & Turnaround */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-14 w-14 rounded-2xl bg-emerald-50 text-slate-800 flex items-center justify-center p-3 shadow-sm border border-emerald-100 group-hover:bg-[#6EC5B8]/20 transition-colors">
                      <ServiceIcon name={service.iconName} className="h-8 w-8 text-[#2C3032]" />
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-700">
                      <Clock className="h-3 w-3 text-emerald-600" />
                      {service.turnaround}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {service.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {service.tagline}
                  </p>

                  {/* Pricing Starting Tag */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Starts From
                    </span>
                    <span className="text-xl font-black text-slate-900">
                      {service.priceStart}
                    </span>
                  </div>

                  {/* Features Bullet Points */}
                  <ul className="mt-4 space-y-1.5 text-[11px] text-slate-600">
                    {service.features.slice(0, 2).map((feat, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct Action Link */}
                <div className="mt-6 pt-2">
                  <Link
                    href={`/services/${service.id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-center text-xs font-bold text-white shadow-sm transition hover:bg-black group-hover:bg-[#2C3032]"
                  >
                    <span>View Rate Card & Order</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infinite Scrolling Marquee Ticker */}
      <div className="bg-black py-4 overflow-hidden border-y border-white/10 relative">
        <div className="flex w-max animate-marquee space-x-12 text-sm font-black tracking-wider text-white uppercase">
          {[...Array(6)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-3">
                <Truck className="h-4 w-4 text-[#6EC5B8]" />
                FREE PICKUP & DELIVERY
              </span>
              <span className="text-[#6EC5B8]">★</span>
              <span className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-[#6EC5B8]" />
                100% INDIVIDUAL DRUM WASH
              </span>
              <span className="text-[#6EC5B8]">★</span>
              <span className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-[#6EC5B8]" />
                GERMAN ECO-FRIENDLY DETERGENTS
              </span>
              <span className="text-[#6EC5B8]">★</span>
              <span className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-[#6EC5B8]" />
                SCHEDULED DOORSTEP SLOTS
              </span>
              <span className="text-[#6EC5B8]">★</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Why We Are The Best Section */}
      <section className="py-24 bg-white relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900">
              Why We Are The Best?
            </h2>
            <p className="text-slate-600 text-base max-w-2xl mx-auto">
              We engineered a modern laundry experience from the ground up to solve Hyderabad’s biggest garment care headaches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-8 hover:shadow-lg transition">
              <div className="h-14 w-14 rounded-2xl bg-[#6EC5B8] text-white flex items-center justify-center mb-6 shadow-md">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Never Mixed With Other Clothes</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                100% private & hygienic wash. Your clothes are washed separately in an individual machine drum—never mixed with anyone else’s clothes.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-8 hover:shadow-lg transition">
              <div className="h-14 w-14 rounded-2xl bg-[#6EC5B8] text-white flex items-center justify-center mb-6 shadow-md">
                <Leaf className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Eco-Friendly Fabric Care</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Gentle liquid detergents and fabric softeners that keep colors vibrant, protect delicate threads, and leave no harsh chemical smell.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-8 hover:shadow-lg transition">
              <div className="h-14 w-14 rounded-2xl bg-[#6EC5B8] text-white flex items-center justify-center mb-6 shadow-md">
                <Scale className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Digital Weighing at Your Doorstep</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                100% honest pricing. Our concierge weighs your laundry bag in front of you on a certified digital scale, with instant WhatsApp confirmation.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-8 hover:shadow-lg transition">
              <div className="h-14 w-14 rounded-2xl bg-[#6EC5B8] text-white flex items-center justify-center mb-6 shadow-md">
                <Layers className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Fabric-Specific Custom Care</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                From daily cottons and formal trousers to heavy bridal lehengas, zari sarees, leather jackets, and home upholstery—every fabric receives tailored temperature and wash cycles.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-8 hover:shadow-lg transition">
              <div className="h-14 w-14 rounded-2xl bg-[#6EC5B8] text-white flex items-center justify-center mb-6 shadow-md">
                <Clock className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Dependable Turnaround & Tracking</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                No endless chasing or missing garments. Real-time SMS and WhatsApp status updates from collection, washing, pressing, to doorstep delivery.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-8 hover:shadow-lg transition">
              <div className="h-14 w-14 rounded-2xl bg-[#6EC5B8] text-white flex items-center justify-center mb-6 shadow-md">
                <Sparkle className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Crisp High-Pressure Steam Finish</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Commercial vacuum-suction steam iron tables give shirts, trousers, and ethnic wear razor-sharp creases with zero scorch marks or cloth shine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Promise Section (Styled matching Discover Our Services prominence) */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(110,197,184,0.18),transparent_65%)]" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Centered Header matching Discover Our Services exact scale & hierarchy */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-black/80 border border-emerald-400/40 px-4 py-1 text-[11px] font-black tracking-wider text-emerald-300 shadow-sm mb-1 uppercase">
              <HeartHandshake className="h-3.5 w-3.5 text-[#6EC5B8]" />
              <span>Hygienic, Reliable & Transparent Care</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Our Mission & Promise
            </h2>
            <p className="text-base sm:text-xl font-black text-emerald-400 tracking-wide uppercase">
              We Are Striving Every Day To Give You Your Weekends Back
            </p>
            <p className="text-slate-300 font-medium text-sm sm:text-base max-w-2xl mx-auto pt-2 leading-relaxed">
              At KG Laundry, our goal goes far beyond clean clothes. We engineered an effortless, modern laundry routine to give Hyderabad’s families and professionals peace of mind and precious time to live.
            </p>
          </div>

          {/* 4 Cards with refreshed, vibrant numbered color badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-emerald-500/25 bg-emerald-950/20 p-6 backdrop-blur-sm transition-all hover:border-emerald-500/50 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center rounded-xl bg-[#6EC5B8]/20 border border-[#6EC5B8]/40 px-3 py-1 text-sm font-black text-[#6EC5B8] mb-3">
                01
              </div>
              <h4 className="text-base font-bold text-white mb-2">Eliminate Laundry Stress</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                No more sorting piles, waiting on washing machines, balcony drying, or spending Sunday afternoons standing with an iron.
              </p>
            </div>

            <div className="rounded-2xl border border-sky-500/25 bg-sky-950/20 p-6 backdrop-blur-sm transition-all hover:border-sky-500/50 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center rounded-xl bg-sky-500/20 border border-sky-500/40 px-3 py-1 text-sm font-black text-sky-400 mb-3">
                02
              </div>
              <h4 className="text-base font-bold text-white mb-2">Uncompromising Hygiene</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Individual machine drums for every customer, ozone water sanitization, and protective sealed delivery packaging.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-500/25 bg-amber-950/20 p-6 backdrop-blur-sm transition-all hover:border-amber-500/50 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center rounded-xl bg-amber-500/20 border border-amber-500/40 px-3 py-1 text-sm font-black text-amber-400 mb-3">
                03
              </div>
              <h4 className="text-base font-bold text-white mb-2">Honest & Fair Pricing</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Clear per-kg and per-piece rates in Rupees. You only pay for what your clothes weigh—with zero hidden delivery charges.
              </p>
            </div>

            <div className="rounded-2xl border border-purple-500/25 bg-purple-950/20 p-6 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center rounded-xl bg-purple-500/20 border border-purple-500/40 px-3 py-1 text-sm font-black text-purple-300 mb-3">
                04
              </div>
              <h4 className="text-base font-bold text-white mb-2">Expanding Doorstep Reach</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connecting Gachibowli, Hitech City, Madhapur, Kondapur, Jubilee Hills, and Banjara Hills with seamless doorstep pickup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Basic Core Pricing Overview on Homepage */}
      <BasicPricingSection />

      {/* How It Works - Interactive 4-Step Flow with Motion & Process Line */}
      <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-3 mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              Effortless Doorstep Routine
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900">
              How KG Laundry Works
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Say goodbye to washing machines, balconies filled with drying clothes, and weekend ironing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="group relative rounded-3xl border border-slate-200/90 bg-slate-50/70 p-7 text-left hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <div className="h-12 w-12 rounded-2xl bg-[#6EC5B8] text-slate-900 flex items-center justify-center font-black text-lg shadow-sm">
                  01
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Step 1</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                Fill Your Bags
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pack casuals or garments in any bag or our reusable KG bag. Choose your convenient 1-hour doorstep collection slot.
              </p>
            </div>

            {/* Step 2 */}
            <div className="group relative rounded-3xl border border-slate-200/90 bg-slate-50/70 p-7 text-left hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <div className="h-12 w-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-lg shadow-sm">
                  02
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Step 2</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                Digital Weighing at Door
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our uniformed driver arrives with calibrated digital hanging scales. Instant weight and bill confirmation sent directly to your WhatsApp.
              </p>
            </div>

            {/* Step 3 */}
            <div className="group relative rounded-3xl border border-slate-200/90 bg-slate-50/70 p-7 text-left hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <div className="h-12 w-12 rounded-2xl bg-[#6EC5B8] text-slate-900 flex items-center justify-center font-black text-lg shadow-sm">
                  03
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Step 3</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                Private Sanitized Wash
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Washed in an individual drum (never mixed with other orders), treated with eco-softeners, and finished with vacuum steam ironing.
              </p>
            </div>

            {/* Step 4 */}
            <div className="group relative rounded-3xl border border-slate-200/90 bg-slate-50/70 p-7 text-left hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <div className="h-12 w-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
                  04
                </div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Step 4</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                Delivered Fresh & Crisp
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Delivered back to your doorstep neatly folded or hanger-packed in weather-proof bags. Pay conveniently via UPI or cash upon delivery!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Doorstep Booking Form (Lead Capture) */}
      <section id="order" className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
              Instant Doorstep Booking
            </span>
            <h3 className="text-3xl font-extrabold text-slate-900">
              Schedule Your Pickup
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              Our driver will arrive with a digital scale at your selected slot. No upfront payment required—pay after delivery!
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-10 shadow-lg">
            {formSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900">Pickup Confirmed!</h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, {formData.name || 'valued customer'}. Our concierge has received your request and will WhatsApp/call you shortly to confirm the driver's arrival.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="rounded-xl bg-slate-900 px-6 py-2.5 text-xs font-semibold text-white hover:bg-black"
                >
                  Book Another Pickup
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Reddy"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number (for SMS & WhatsApp tracking) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Service / Bag Type
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
                    >
                      <option>Clean & Fold (Wash by KG - ₹79/kg)</option>
                      <option>Wash & Steam Iron (₹119/kg)</option>
                      <option>Premium Dry Cleaning (₹149/pc)</option>
                      <option>Home Linens & Curtains (₹89/kg)</option>
                      <option>Sneakers & Bag Spa (₹299/pair)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Pickup Slot
                    </label>
                    <select
                      value={formData.pickupTime}
                      onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
                    >
                      <option>Today: 2:00 PM – 5:00 PM</option>
                      <option>Today: 5:00 PM – 8:00 PM</option>
                      <option>Tomorrow: 7:00 AM – 10:00 AM</option>
                      <option>Tomorrow: 10:00 AM – 1:00 PM</option>
                      <option>Tomorrow: 2:00 PM – 5:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pickup Address & Apartment / Landmark
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. Flat 402, My Home Bhooja, Hitech City"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl bg-[#6EC5B8] py-4 text-center text-sm font-bold text-white shadow-md hover:bg-[#5bb3a6] transition disabled:opacity-50"
                >
                  {submitting ? 'Placing Order...' : 'Place Your Order (Zero Upfront Payment)'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h3 className="text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-slate-500">
              Everything you need to know about KG Laundry's doorstep care.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How does Wash by KG work?',
                a: 'You pack your everyday clothes into our bag. Our driver weighs the bag in front of you using a calibrated digital scale. Your clothes are washed separately in high-efficiency commercial washers, dried, and folded neatly for ₹79/kg.',
              },
              {
                q: 'Are my clothes washed with other customers’ clothes?',
                a: 'Never. At KG Laundry, strict hygiene is our core promise. Every order is assigned an individual machine drum and never mixed with any other customer’s garments.',
              },
              {
                q: 'What is your turnaround time?',
                a: 'Our standard turnaround is guaranteed within 24 hours. If you are in a rush, we also offer an Express 6-Hour turnaround in select Hyderabad coverage zones.',
              },
              {
                q: 'How do I pay?',
                a: 'You can pay conveniently after delivery via UPI (Google Pay, PhonePe, Paytm), credit/debit card, or cash upon receiving your clean clothes.',
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-slate-200 bg-white p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-900 text-sm">
                  <span>{faq.q}</span>
                  <ChevronDown className="h-4 w-4 text-slate-500 transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
