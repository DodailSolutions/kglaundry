import type { GlobalConfig } from 'payload';

export const FooterSettings: GlobalConfig = {
  slug: 'footer-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'bio',
      type: 'textarea',
      defaultValue: 'KG Laundry delivers premium, doorstep laundry, dry cleaning, and garment care. Fast 24-hour turnaround, separated eco-friendly cycles, and transparent per-kg pricing.',
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: '© 2026 KG Laundry. All rights reserved.',
    },
    {
      name: 'showBottomNav',
      type: 'checkbox',
      label: 'Enable App-Style Bottom Navigation on Mobile/Tablet',
      defaultValue: true,
    },
    {
      name: 'bottomNavItems',
      type: 'array',
      defaultValue: [
        { label: 'Home', icon: 'home', link: '/' },
        { label: 'Services', icon: 'shirt', link: '#services' },
        { label: 'Pricing', icon: 'tag', link: '#pricing' },
        { label: 'Chat', icon: 'message-square', link: '#chat' },
        { label: 'Book', icon: 'calendar', link: '#order' },
      ],
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'icon', type: 'text', required: true },
        { name: 'link', type: 'text', required: true },
      ],
    },
  ],
};
