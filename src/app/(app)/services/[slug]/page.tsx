import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { KG_ALL_SERVICES } from '@/lib/constants/servicesList';
import ServiceIcon from '@/components/ui/ServiceIcons';
import { Clock, ShieldCheck, Check, ArrowLeft, Phone, Calendar, Truck, Sparkles } from 'lucide-react';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return KG_ALL_SERVICES.map((s) => ({
    slug: s.id,
  }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = KG_ALL_SERVICES.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-emerald-700 mb-8 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Services
        </Link>

        {/* Hero Card */}
        <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-md border border-slate-200/80 mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-[#6EC5B8] text-white flex items-center justify-center shadow-md">
                <ServiceIcon name={service.iconName} className="h-9 w-9 text-white" />
              </div>
              <div>
                <span className="inline-block rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800 mb-1">
                  KG Specialized Care
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900">{service.name}</h1>
                <p className="text-slate-600 text-sm mt-1">{service.tagline}</p>
              </div>
            </div>

            <div className="text-left md:text-right">
              <div className="text-xs text-slate-400 font-semibold uppercase">Pricing Starts At</div>
              <div className="text-3xl font-extrabold text-[#6EC5B8]">{service.priceStart}</div>
              <div className="text-xs text-slate-500 flex items-center md:justify-end gap-1 mt-1">
                <Clock className="h-3.5 w-3.5 text-emerald-600" />
                Turnaround: {service.turnaround}
              </div>
            </div>
          </div>

          <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-base font-bold text-slate-900 mb-2">Service Process & Details</h2>
                <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
              </div>

              {/* Price Breakdown Table */}
              {service.pricingItems && service.pricingItems.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-3">Itemized Rate Card</h3>
                  <div className="rounded-2xl border border-slate-200 overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                        <tr>
                          <th className="p-3.5">Garment / Item</th>
                          <th className="p-3.5 text-right">Standard Rate (₹)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {service.pricingItems.map((item) => (
                          <tr key={item.item} className="hover:bg-slate-50/50">
                            <td className="p-3.5 font-medium text-slate-800">{item.item}</td>
                            <td className="p-3.5 font-extrabold text-slate-900 text-right">{item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Features List */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-3">Included Fabric & Quality Guarantees</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {service.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Order Booking Card */}
            <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-800 p-6 text-white space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-2">
                  <Truck className="h-4 w-4" />
                  Free Pickup & Delivery in Hyderabad
                </div>
                <h3 className="text-xl font-bold">Ready to clean your {service.name.toLowerCase()}?</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Our uniformed concierge arrives at your doorstep with digital scales. Pay only after fresh delivery!
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-700">
                <Link
                  href={`/#order?service=${encodeURIComponent(service.name)}`}
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#6EC5B8] py-3.5 text-center text-xs font-bold text-white shadow-md hover:bg-[#5bb3a6] transition"
                >
                  <Calendar className="h-4 w-4" />
                  Place Your Order
                </Link>

                <a
                  href={`https://wa.me/919876543210?text=Hi%20KG%20Laundry,%20I%20want%20to%20inquire%20about%20${encodeURIComponent(service.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-xl border border-slate-600 py-3 text-center text-xs font-semibold text-slate-300 hover:bg-slate-800 transition"
                >
                  <Phone className="h-3.5 w-3.5 text-emerald-400" />
                  Inquire on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
