import type { GlobalConfig } from 'payload';

export const ThemeSettings: GlobalConfig = {
  slug: 'theme-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'activeTemplate',
      type: 'select',
      defaultValue: 'fresh_mint',
      options: [
        { label: 'Fresh Mint (KG Signature - Mint & Slate)', value: 'fresh_mint' },
        { label: 'Ocean Fresh (Cool Cyan & Deep Blue)', value: 'ocean_fresh' },
        { label: 'Crisp Linen (Warm Minimalist Stone)', value: 'crisp_linen' },
        { label: 'Eco Clean (Sage & Earth Green)', value: 'eco_clean' },
        { label: 'Royal Steam (Luxury Indigo & Gold)', value: 'royal_steam' },
      ],
      admin: {
        description: 'Instant site-wide styling preset inspired by modern digital laundry brands.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'primaryColor',
          type: 'text',
          defaultValue: '#6EC5B8',
          admin: {
            width: '33%',
            description: 'Brand Primary (default: #6EC5B8 from logo)',
          },
        },
        {
          name: 'secondaryColor',
          type: 'text',
          defaultValue: '#2C3032',
          admin: {
            width: '33%',
            description: 'Brand Charcoal (default: #2C3032 from logo)',
          },
        },
        {
          name: 'accentColor',
          type: 'text',
          defaultValue: '#38BDF8',
          admin: {
            width: '33%',
            description: 'Accent / Highlight (default: #38BDF8)',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'backgroundColor',
          type: 'text',
          defaultValue: '#F8FAFC',
          admin: { width: '50%' },
        },
        {
          name: 'fontFamily',
          type: 'select',
          defaultValue: 'Plus Jakarta Sans',
          options: [
            { label: 'Plus Jakarta Sans (Modern & Clean)', value: 'Plus Jakarta Sans' },
            { label: 'Inter (SaaS & Technical)', value: 'Inter' },
            { label: 'Outfit (Friendly & Rounded)', value: 'Outfit' },
            { label: 'Poppins (Geometric & Bold)', value: 'Poppins' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'logoUrl',
      type: 'text',
      defaultValue: '/logo.png',
      admin: {
        description: 'URL of the brand logo',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Smart Doorstep Laundry & Dry Cleaning',
    },
  ],
};
