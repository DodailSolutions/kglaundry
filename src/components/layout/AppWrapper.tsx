'use client';

import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import BottomNav from './BottomNav';
import ChatWidget from '@/components/chat/ChatWidget';
import MobileAppBanner from '@/components/ui/MobileAppBanner';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col font-sans selection:bg-[#6EC5B8]/30">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <BottomNav onOpenChat={() => setChatOpen(true)} />
      <ChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      <MobileAppBanner />
    </div>
  );
}
