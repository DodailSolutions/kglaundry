'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  X,
  CheckCircle,
  Phone,
  MessageCircle,
  Headphones,
  HelpCircle,
  Clock,
  Sparkles,
  Lock,
  ShieldCheck,
  LogOut,
  ArrowRight,
  UserCheck,
  RefreshCw
} from 'lucide-react';

interface BottomNavProps {
  onOpenChat?: () => void;
}

export default function BottomNav({ onOpenChat }: BottomNavProps) {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);

  // Quick Order State
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    service: 'Clean & Fold (Wash by KG - ₹79/kg)',
    address: '',
    pickupTime: 'Today: 2:00 PM – 5:00 PM',
  });
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  // User Auth & Session state
  const [userPhone, setUserPhone] = useState<string>('');
  const [loginPhoneInput, setLoginPhoneInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [userOrders, setUserOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPhone = localStorage.getItem('kg_user_phone');
      if (savedPhone) {
        setUserPhone(savedPhone);
        fetchOrders(savedPhone);
      }
    }
  }, []);

  const fetchOrders = async (phone: string) => {
    if (!phone) return;
    setOrdersLoading(true);
    try {
      const res = await fetch(`/api/user/orders?phone=${encodeURIComponent(phone)}`);
      const data = await res.json();
      if (data.orders) {
        setUserOrders(data.orders);
      }
    } catch (e) {
      console.warn('Orders fetch error:', e);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleQuickOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderForm.name || !orderForm.phone) return;
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderForm),
      });
      const clean = orderForm.phone.replace(/\D/g, '').slice(-10);
      if (!userPhone) {
        localStorage.setItem('kg_user_phone', clean);
        setUserPhone(clean);
      }
      fetchOrders(clean);
    } catch {}
    setOrderSubmitted(true);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPhoneInput || loginPhoneInput.trim().length < 10) return;
    setAuthLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setAuthLoading(false);
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpInput) return;
    setAuthLoading(true);
    setTimeout(() => {
      const clean = loginPhoneInput.replace(/\D/g, '').slice(-10);
      localStorage.setItem('kg_user_phone', clean);
      setUserPhone(clean);
      setOtpSent(false);
      setAuthLoading(false);
      fetchOrders(clean);
    }, 500);
  };

  const handleLogout = () => {
    localStorage.removeItem('kg_user_phone');
    setUserPhone('');
    setUserOrders([]);
    setLoginPhoneInput('');
    setOtpInput('');
    setOtpSent(false);
  };

  return (
    <>
      {/* Syed bhai's Custom Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/90 bg-white/95 backdrop-blur-xl px-2 py-1 sm:hidden shadow-[0_-6px_25px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-around relative">
          {/* 1. Home */}
          <Link
            href="/"
            className="flex flex-col items-center justify-center py-1 px-2.5 text-slate-700 hover:text-emerald-700 transition"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="text-[10px] font-bold mt-1 text-slate-800">Home</span>
          </Link>

          {/* 2. Orders (Receipt / Bill with Serrated Edge - NO DOLLAR SIGN) */}
          <button
            onClick={() => {
              setTrackingModalOpen(true);
              setOrderModalOpen(false);
              setSupportModalOpen(false);
            }}
            className="flex flex-col items-center justify-center py-1 px-2.5 text-slate-700 hover:text-emerald-700 transition"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 3h16v17l-3-2-3 2-3-2-3 2-4-2V3z" />
              <path d="M8 8h8" />
              <path d="M8 12h8" />
              <path d="M8 16h5" />
            </svg>
            <span className="text-[10px] font-bold mt-1 text-slate-800">Orders</span>
          </button>

          {/* 3. CENTER HIGHLIGHT: Prominent Elevated Green Plus (+) Button for New Order */}
          <div className="relative -top-4 flex flex-col items-center">
            <button
              onClick={() => {
                setOrderModalOpen(true);
                setOrderSubmitted(false);
                setTrackingModalOpen(false);
                setSupportModalOpen(false);
              }}
              aria-label="New Order"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-[#6EC5B8] text-slate-900 shadow-[0_8px_20px_rgba(110,197,184,0.55)] border-4 border-white transition-all active:scale-95 hover:bg-[#5bb3a6] hover:scale-105"
            >
              <Plus className="h-7 w-7 stroke-[3] text-black" />
            </button>
            <span className="text-[10px] font-black text-black mt-0.5 tracking-tight">New Order</span>
          </div>

          {/* 4. Services */}
          <Link
            href="/#services"
            className="flex flex-col items-center justify-center py-1 px-2.5 text-slate-700 hover:text-emerald-700 transition"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
            </svg>
            <span className="text-[10px] font-bold mt-1 text-slate-800">Services</span>
          </Link>

          {/* 5. Customer Support Tab (Replaced Sign Up as requested by Syed bhai) */}
          <button
            onClick={() => {
              setSupportModalOpen(true);
              setOrderModalOpen(false);
              setTrackingModalOpen(false);
            }}
            className="flex flex-col items-center justify-center py-1 px-2.5 text-slate-700 hover:text-emerald-700 transition"
          >
            <Headphones className="h-6 w-6 stroke-[2.2]" />
            <span className="text-[10px] font-bold mt-1 text-slate-800">Support</span>
          </button>
        </div>
      </nav>

      {/* POPUP MODAL 1: New Order Sheet */}
      {orderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-t-3xl sm:rounded-3xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-[#6EC5B8]/20 flex items-center justify-center text-[#2C3032]">
                  <Plus className="h-5 w-5 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Create New Pickup Order</h3>
                  <p className="text-[11px] text-slate-500">Free Doorstep Pickup & Digital Scale Weighing</p>
                </div>
              </div>
              <button
                onClick={() => setOrderModalOpen(false)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {orderSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-black text-slate-900">Order Placed!</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thank you, {orderForm.name || 'valued customer'}. Our concierge will contact you on WhatsApp/Call to confirm your pickup slot.
                </p>
                <button
                  onClick={() => setOrderModalOpen(false)}
                  className="rounded-xl bg-[#6EC5B8] px-6 py-2.5 text-xs font-bold text-slate-900"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuickOrder} className="mt-4 space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={orderForm.name}
                    onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                    placeholder="e.g. Syed"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#6EC5B8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#6EC5B8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Choose Service</label>
                  <select
                    value={orderForm.service}
                    onChange={(e) => setOrderForm({ ...orderForm, service: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#6EC5B8] focus:outline-none"
                  >
                    <option>Clean & Fold (Wash by KG - ₹79/kg)</option>
                    <option>Wash & Steam Iron (₹119/kg)</option>
                    <option>Dry Cleaning (Suits & Blazers - ₹149/pc)</option>
                    <option>Bed Sheets & Comforters (₹149/pc starts)</option>
                    <option>Sofa Cleaning (₹399/seat)</option>
                    <option>Carpet Cleaning (₹35/sq.ft)</option>
                    <option>Wedding Wears & Lehenga Care</option>
                    <option>Steam Pressing (₹25/pc)</option>
                    <option>Shoe & Sneaker Cleaning</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Address & Landmark</label>
                  <input
                    type="text"
                    value={orderForm.address}
                    onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                    placeholder="e.g. Flat 301, Jubilee Hills, Hyderabad"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#6EC5B8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Pickup Time</label>
                  <select
                    value={orderForm.pickupTime}
                    onChange={(e) => setOrderForm({ ...orderForm, pickupTime: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#6EC5B8] focus:outline-none"
                  >
                    <option>Today: 2:00 PM – 5:00 PM</option>
                    <option>Today: 5:00 PM – 8:00 PM</option>
                    <option>Tomorrow: 8:00 AM – 11:00 AM</option>
                    <option>Tomorrow: 2:00 PM – 5:00 PM</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#6EC5B8] py-3.5 text-center text-xs font-black text-slate-900 shadow-md hover:bg-[#5bb3a6] transition"
                >
                  Place Your Order
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* POPUP MODAL 2: Orders & Invoices (Protected & Private to Logged-in Customer) */}
      {trackingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-t-3xl sm:rounded-3xl bg-white p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-full bg-slate-900 flex items-center justify-center text-white">
                  <Lock className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    Orders & Invoices
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                      Private
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-500">Live driver tracking & digital weight slips</p>
                </div>
              </div>
              <button
                onClick={() => setTrackingModalOpen(false)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* 1. GUEST VIEW: STRICT LOGIN PROTECTION */}
            {!userPhone ? (
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl bg-amber-50 border border-amber-200/80 p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-amber-900">Protected Customer Data</div>
                      <p className="text-[11px] text-amber-800 leading-relaxed mt-1">
                        To safeguard customer privacy and doorstep addresses, order details are strictly protected and <strong>never shown to guests</strong>. Please sign in to access your personal laundry orders.
                      </p>
                    </div>
                  </div>
                </div>

                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Registered Mobile Number
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          value={loginPhoneInput}
                          onChange={(e) => setLoginPhoneInput(e.target.value)}
                          placeholder="98765 43210"
                          maxLength={10}
                          className="w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 py-2.5 text-xs font-medium text-slate-900 focus:border-[#6EC5B8] focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={authLoading || loginPhoneInput.length < 10}
                      className="w-full rounded-xl bg-slate-900 py-3 text-center text-xs font-bold text-white hover:bg-black transition flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {authLoading ? (
                        <span>Sending Secure OTP...</span>
                      ) : (
                        <>
                          <span>Verify with OTP</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-700">Enter 4-Digit Code</label>
                        <button
                          type="button"
                          onClick={() => setOtpSent(false)}
                          className="text-[11px] font-semibold text-emerald-700 hover:underline"
                        >
                          Change Number
                        </button>
                      </div>
                      <input
                        type="text"
                        required
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        placeholder="e.g. 1234"
                        maxLength={6}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-center tracking-widest text-base font-bold text-slate-900 focus:border-[#6EC5B8] focus:outline-none"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Code sent to +91 {loginPhoneInput}.</p>
                    </div>

                    <button
                      type="submit"
                      disabled={authLoading || !otpInput}
                      className="w-full rounded-xl bg-[#6EC5B8] py-3 text-center text-xs font-black text-slate-900 hover:bg-[#5bb3a6] transition flex items-center justify-center gap-2"
                    >
                      {authLoading ? 'Verifying...' : 'Sign In & View My Orders'}
                    </button>
                  </form>
                )}
              </div>
            ) : (
              /* 2. AUTHENTICATED VIEW: STRICTLY USER'S OWN ORDERS */
              <div className="mt-4 space-y-4">
                {/* User Account Bar */}
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 border border-slate-200 p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                      <UserCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-900">
                        +91 ••••• ••{userPhone.slice(-3)}
                      </div>
                      <div className="text-[10px] text-emerald-700 font-semibold">Verified Account</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => fetchOrders(userPhone)}
                      title="Refresh Orders"
                      className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-200 transition"
                    >
                      <RefreshCw className={`h-3.5 w-3.5 ${ordersLoading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1 rounded-lg bg-slate-200/70 hover:bg-rose-50 hover:text-rose-700 px-2 py-1 text-[10px] font-bold text-slate-700 transition"
                    >
                      <LogOut className="h-3 w-3" />
                      Sign Out
                    </button>
                  </div>
                </div>

                {ordersLoading ? (
                  <div className="py-8 text-center text-xs text-slate-500">
                    <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent mb-2"></div>
                    <div>Fetching your active orders...</div>
                  </div>
                ) : userOrders.length > 0 ? (
                  <div className="space-y-3">
                    {userOrders.map((ord: any, idx: number) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-[#6EC5B8] transition"
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <div>
                            <span className="font-extrabold text-xs text-slate-900">{ord.orderId}</span>
                            <div className="text-[10px] text-slate-400 font-medium">
                              {ord.createdAt ? new Date(ord.createdAt).toLocaleDateString() : 'Active Order'}
                            </div>
                          </div>
                          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                            {ord.status}
                          </span>
                        </div>

                        <div className="mt-3 space-y-1.5 text-xs text-slate-700">
                          <div>
                            <strong>Service:</strong> {ord.service}
                          </div>
                          <div>
                            <strong>Slot:</strong> {ord.timeSlot}
                          </div>
                          <div>
                            <strong>Driver:</strong> {ord.driverName} ({ord.driverPhone})
                          </div>
                          <div className="text-[11px] text-slate-500">
                            <strong>Location:</strong> {ord.pickupAddress}
                          </div>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <Sparkles className="h-3 w-3" /> Digital Scales at Doorstep
                          </span>
                          <span className="font-bold text-slate-800">Private Separate Wash</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center">
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-2">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="text-xs font-bold text-slate-800">No Orders Under This Account</div>
                    <p className="text-[11px] text-slate-500 mt-1 max-w-[240px] mx-auto">
                      You do not have any active or previous laundry orders under this phone number.
                    </p>
                    <button
                      onClick={() => {
                        setTrackingModalOpen(false);
                        setOrderModalOpen(true);
                      }}
                      className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#6EC5B8] px-4 py-2 text-xs font-black text-slate-900 shadow-sm hover:bg-[#5bb3a6] transition"
                    >
                      <Plus className="h-3.5 w-3.5 stroke-[3]" />
                      Schedule Doorstep Pickup
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* POPUP MODAL 3: Dedicated Customer Support Sheet (As requested by Syed bhai) */}
      {supportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-t-3xl sm:rounded-3xl bg-white p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-[#6EC5B8]/20 flex items-center justify-center text-[#2C3032]">
                  <Headphones className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Customer Support</h3>
                  <p className="text-[11px] text-slate-500">We are here to assist with your order</p>
                </div>
              </div>
              <button
                onClick={() => setSupportModalOpen(false)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {/* WhatsApp Live Agent */}
              <a
                href="https://wa.me/919876543210?text=Hi%20KG%20Laundry,%20I%20need%20help%20with%20my%20pickup"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-xs text-slate-900">Chat on WhatsApp</div>
                    <div className="text-[11px] text-slate-500">Quickest response within 5 mins</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700">Open →</span>
              </a>

              {/* Direct Phone Call */}
              <a
                href="tel:+919876543210"
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-xs text-slate-900">Call Doorstep Concierge</div>
                    <div className="text-[11px] text-slate-500">+91 98765 43210 (7 AM - 9 PM)</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-700">Call →</span>
              </a>

              {/* Instant AI Assistant */}
              <button
                onClick={() => {
                  setSupportModalOpen(false);
                  if (onOpenChat) onOpenChat();
                }}
                className="flex items-center justify-between w-full p-4 rounded-2xl bg-[#6EC5B8]/15 border border-[#6EC5B8]/30 hover:bg-[#6EC5B8]/25 transition group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#6EC5B8] text-slate-900 flex items-center justify-center font-black">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">Ask AI Laundry Assistant</div>
                    <div className="text-[11px] text-slate-600">Live prices (₹), fabric queries & turnaround</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-900">Chat →</span>
              </button>

              <div className="pt-2 text-center text-[11px] text-slate-400">
                Operating across all zones in Hyderabad: Gachibowli, Hitech City, Madhapur, Jubilee Hills.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
