import type { Metadata } from 'next';
import './globals.css';
import AppWrapper from '@/components/layout/AppWrapper';

export const metadata: Metadata = {
  title: 'KG Laundry | Doorstep Laundry, Dry Cleaning & Bag Wash in Hyderabad',
  description:
    'KG Laundry delivers premium, doorstep laundry and dry cleaning in Hyderabad. 24-hour turnaround, transparent per-kg pricing in ₹, sanitized cycles, and free pickup.',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#6EC5B8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-50 text-slate-800 antialiased font-['Plus_Jakarta_Sans',sans-serif]">
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
