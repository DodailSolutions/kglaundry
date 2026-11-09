import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 pt-16 pb-24 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="relative h-12 w-32 bg-white/10 rounded-xl p-2 backdrop-blur-sm">
              <Image
                src="/logo.png"
                alt="KG Laundry"
                fill
                className="object-contain p-1"
              />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              KG Laundry is the premium doorstep laundry and dry cleaning service in Hyderabad. 
              Fabric-specific wash cycles, sanitized eco-friendly detergents, and guaranteed 24-hour delivery.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="h-4 w-4" />
              100% Color & Fabric Care Guarantee
            </div>
          </div>

          {/* Service Bags */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Our Wash Bags & Services
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="#services" className="hover:text-emerald-400 transition">
                  Clean & Fold (Wash by KG - ₹79/kg)
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-emerald-400 transition">
                  Wash & Steam Iron (₹119/kg)
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-emerald-400 transition">
                  Premium Dry Clean (Per piece - ₹149/pc)
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-emerald-400 transition">
                  Home Linens, Curtains & Quilts
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-emerald-400 transition">
                  Express 6-Hour Emergency Turnaround
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Doorstep Service Areas
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                'Hitech City',
                'Madhapur',
                'Gachibowli',
                'Kondapur',
                'Jubilee Hills',
                'Banjara Hills',
                'Financial District',
                'Kukatpally',
              ].map((area) => (
                <span
                  key={area}
                  className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
                >
                  {area}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Free doorstep pickup and delivery on all orders above ₹499.
            </p>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Concierge & Support
            </h4>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>care@kglaundry.in</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-slate-400">
              <Clock className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Mon – Sun: 7:00 AM – 10:00 PM</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-slate-400">
              <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Madhapur, Hyderabad, Telangana 500081</span>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 KG Laundry & Dry Cleaners. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/pricing" className="hover:text-slate-300">Pricing & Rates</Link>
            <Link href="#faq" className="hover:text-slate-300">FAQ</Link>
            <Link href="#order" className="hover:text-slate-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
