import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import ItemizedPricingTable, { BAG_RATES } from '@/components/ui/ItemizedPricingTable';
import {
  Tag,
  ShieldCheck,
  Scale,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Phone,
  ChevronRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Transparent Pricing & Rates | KG Laundry Hyderabad',
  description:
    '100% honest laundry & dry cleaning pricing in Indian Rupees (₹). Wash by KG at ₹79/kg, dry cleaning from ₹149/pc. Doorstep digital scale weighing with zero hidden fees.',
};

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Pricing Page Hero Banner */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-emerald-50/40 pt-16 pb-12 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
            <Link href="/" className="hover:text-slate-900 transition">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="text-emerald-700 font-bold">Pricing & Rates</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800">
              <Tag className="h-3.5 w-3.5 text-emerald-600" />
              100% Transparent Price Card • All Rates in ₹
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Simple, Honest Rates.{' '}
              <span className="text-[#6EC5B8] underline decoration-emerald-200 decoration-wavy decoration-2">
                Zero Surprises.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              We weigh your laundry right in front of you on a certified digital scale at your doorstep. Instant digital invoice sent to your WhatsApp before processing.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                <Scale className="h-4 w-4 text-[#6EC5B8]" />
                Digital scale weighing at pickup
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                <ShieldCheck className="h-4 w-4 text-[#6EC5B8]" />
                Free delivery on orders above ₹499
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                <Clock className="h-4 w-4 text-[#6EC5B8]" />
                24h to 48h turnaround
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Detailed Itemized Pricing Component */}
      <ItemizedPricingTable />

      {/* Pricing FAQs Section */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <HelpCircle className="h-3.5 w-3.5 text-slate-500" />
              Pricing Queries
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions About Rates
            </h2>
            <p className="text-sm text-slate-600">
              Clear answers regarding weighing, minimum orders, and payment.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How does the Wash by KG weighing work?',
                a: 'Our concierge carries a calibrated portable digital scale to your doorstep. You pack your daily clothes, we hang the bag on the hook in front of you, and note the exact weight. You receive an instant WhatsApp confirmation of the weight and amount before the driver leaves.',
              },
              {
                q: 'What is the minimum order value for free pickup & delivery?',
                a: 'Doorstep pickup and return delivery are 100% FREE for all orders above ₹499 across Hyderabad. For orders below ₹499, a nominal ₹50 delivery convenience fee applies.',
              },
              {
                q: 'What is the difference between Clean & Fold and Wash & Steam Iron?',
                a: 'Clean & Fold (₹79/kg) is ideal for casuals, t-shirts, gym wear, and pajamas which are machine washed, tumble dried, and neatly hand-folded. Wash & Steam Iron (₹119/kg) includes specialized vacuum high-pressure vertical steam pressing for shirts, formal trousers, and kurtas.',
              },
              {
                q: 'How is Dyeing priced?',
                a: 'Garment Dyeing starts at ₹199 per piece for t-shirts and shirts, and ₹249 for denim jeans and sarees. We use industrial-grade, non-bleeding German dyes to re-dye faded clothes back to their deep original shade.',
              },
              {
                q: 'Which payment methods do you accept?',
                a: 'We accept all major UPI apps (Google Pay, PhonePe, Paytm), credit/debit cards, net banking, and Cash on Delivery upon receiving your fresh garments.',
              },
            ].map((faq, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
                <h3 className="text-base font-bold text-slate-900 mb-2 flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#6EC5B8] mt-1 shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* Doorstep Booking Banner */}
          <div className="mt-14 rounded-3xl bg-slate-900 p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-2xl font-bold text-white">Ready for fresh, crisp laundry?</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Book your doorstep collection slot in less than 60 seconds.
              </p>
            </div>
            <Link
              href="/#order"
              className="rounded-2xl bg-[#6EC5B8] px-8 py-4 text-xs sm:text-sm font-bold text-white shadow-lg hover:bg-[#5bb3a6] transition whitespace-nowrap"
            >
              Book Doorstep Pickup Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
