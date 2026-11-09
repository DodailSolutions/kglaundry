import type { GlobalConfig } from 'payload';

export const HeaderSettings: GlobalConfig = {
  slug: 'header-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      defaultValue: [
        { label: 'Services & Bags', link: '#services' },
        { label: 'How It Works', link: '#how-it-works' },
        { label: 'Pricing', link: '#pricing' },
        { label: 'FAQ', link: '#faq' },
        { label: 'Reviews', link: '#reviews' },
      ],
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'link', type: 'text', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'ctaLabel',
          type: 'text',
          defaultValue: 'Book Pickup',
          admin: { width: '50%' },
        },
        {
          name: 'ctaLink',
          type: 'text',
          defaultValue: '#order',
          admin: { width: '50%' },
        },
      ],
    },
  ],
};
