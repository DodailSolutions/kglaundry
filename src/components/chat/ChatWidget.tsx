'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  PhoneCall,
  ExternalLink,
  Tag,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  pricingData?: any[];
}

interface ChatWidgetProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function ChatWidget({ isOpen: controlledIsOpen, onClose }: ChatWidgetProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        '👋 Hello! I am your **KG Laundry Concierge**. I can help you with wash rates (₹/kg), turnaround times, pickup areas in Hyderabad, and scheduling an order.\n\nHow can I help you today?',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi' | 'te'>('en');
  const [userPhone, setUserPhone] = useState<string>('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kg_user_phone');
      if (saved) setUserPhone(saved);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleToggle = () => {
    if (onClose && isOpen) {
      onClose();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const currentPhone = typeof window !== 'undefined' ? localStorage.getItem('kg_user_phone') || userPhone : userPhone;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      role: 'user',
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhone: currentPhone,
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          role: 'assistant',
          content: data.content,
          pricingData: data.pricingData,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          role: 'assistant',
          content:
            "I can only help with questions about KG Laundry's services, prices, and orders. Is there anything I can help you with regarding your laundry needs?",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    { label: '💰 Rates & Pricing (₹)', prompt: 'What are your wash and fold rates per kg?' },
    { label: '📍 Pickup Areas', prompt: 'Which areas do you deliver in Hyderabad?' },
    { label: '⚡ 24h Turnaround', prompt: 'How does your 24-hour turnaround service work?' },
    { label: '📱 Mobile App', prompt: 'Where can I download the KG Laundry mobile app?' },
  ];

  return (
    <>
      {/* Floating Launcher Button (All Devices Friendly) */}
      {!isOpen && (
        <button
          onClick={handleToggle}
          id="chat-toggle"
          aria-label="Open AI Laundry Assistant"
          className="fixed bottom-20 right-3.5 md:bottom-6 md:right-6 z-40 flex items-center gap-2 rounded-full bg-[#6EC5B8] p-3 md:p-4 text-slate-900 shadow-[0_8px_25px_rgba(110,197,184,0.45)] transition-all hover:scale-105 hover:bg-[#5bb3a6] focus:outline-none active:scale-95 border-2 border-white"
        >
          <div className="relative">
            <MessageSquare className="h-5 w-5 md:h-6 md:w-6 stroke-[2.5]" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-900"></span>
            </span>
          </div>
          <span className="font-black text-xs hidden sm:inline text-slate-900 tracking-tight">Ask KG AI</span>
        </button>
      )}

      {/* Chat Window / Drawer */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[420px] sm:h-[620px] z-50 flex flex-col bg-white sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-900 px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 rounded-full bg-white/10 p-1 flex items-center justify-center border border-white/20">
                <Sparkles className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold flex items-center gap-2">
                  KG Laundry Concierge
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                    Live Rates
                  </span>
                </h3>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                  {userPhone ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      🔒 Verified Account (+91 ••••{userPhone.slice(-3)})
                    </span>
                  ) : (
                    <span>Doorstep Laundry • Private Mode</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="rounded-lg bg-slate-800 px-2 py-1 text-[11px] text-slate-300 border border-slate-700 focus:outline-none"
              >
                <option value="en">EN</option>
                <option value="hi">HI</option>
                <option value="te">TE</option>
              </select>

              <button
                onClick={handleToggle}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#6EC5B8] text-white rounded-tr-none shadow-sm'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none shadow-sm'
                  }`}
                >
                  <div className="whitespace-pre-line">{m.content}</div>

                  {/* Render Live Pricing Cards if available */}
                  {m.pricingData && m.pricingData.length > 0 && (
                    <div className="mt-3 space-y-2 pt-2 border-t border-slate-100">
                      {m.pricingData.slice(0, 3).map((item: any) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 border border-slate-200"
                        >
                          <div>
                            <div className="font-semibold text-xs text-slate-800">{item.title}</div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <Clock className="h-3 w-3 text-emerald-600" />
                              {item.turnaroundTime}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold text-slate-900">₹{item.basePrice}</span>
                            <span className="text-[10px] text-slate-500 block">
                              /{item.pricingUnit.replace('per_', '')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-white border border-slate-200 px-4 py-3 text-xs text-slate-500 shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce" />
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-1">Checking live rates...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="border-t border-slate-100 bg-white px-3 py-2">
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
              {quickPrompts.map((q) => (
                <button
                  key={q.label}
                  onClick={() => handleSendMessage(q.prompt)}
                  className="whitespace-nowrap rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 px-3 py-1.5 text-[11px] font-medium text-slate-600 transition border border-slate-200/60"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input & Actions */}
          <div className="border-t border-slate-200 bg-white p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about prices (₹), pickup areas..."
                className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-[#6EC5B8] focus:bg-white focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6EC5B8] text-white transition hover:bg-[#5bb3a6] disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

            {/* Human Handoff / WhatsApp */}
            <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 px-1">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                Live pricing from database
              </span>
              <a
                href="https://wa.me/919876543210?text=Hi%20KG%20Laundry,%20I%20would%20like%20to%20schedule%20a%20doorstep%20pickup"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-semibold text-emerald-700 hover:underline"
              >
                <PhoneCall className="h-3 w-3" />
                Talk to Human on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
