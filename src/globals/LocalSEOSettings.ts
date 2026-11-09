import type { GlobalConfig } from 'payload';

export const LocalSEOSettings: GlobalConfig = {
  slug: 'local-seo-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'businessName',
      type: 'text',
      defaultValue: 'KG Laundry & Dry Cleaners',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          defaultValue: '+91 98765 43210',
          admin: { width: '50%' },
        },
        {
          name: 'email',
          type: 'email',
          defaultValue: 'care@kglaundry.in',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'streetAddress',
      type: 'text',
      defaultValue: 'Plot 42, Silicon Valley Rd, Madhapur',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'city',
          type: 'text',
          defaultValue: 'Hyderabad',
          admin: { width: '33%' },
        },
        {
          name: 'state',
          type: 'text',
          defaultValue: 'Telangana',
          admin: { width: '33%' },
        },
        {
          name: 'postalCode',
          type: 'text',
          defaultValue: '500081',
          admin: { width: '33%' },
        },
      ],
    },
    {
      name: 'serviceAreas',
      type: 'array',
      label: 'Service Coverage Zones',
      defaultValue: [
        { area: 'Hitech City' },
        { area: 'Madhapur' },
        { area: 'Gachibowli' },
        { area: 'Kondapur' },
        { area: 'Jubilee Hills' },
        { area: 'Banjara Hills' },
        { area: 'Financial District' },
      ],
      fields: [
        { name: 'area', type: 'text', required: true },
      ],
    },
    {
      name: 'operatingHours',
      type: 'text',
      defaultValue: 'Monday to Sunday: 7:00 AM – 10:00 PM',
    },
    {
      name: 'googleBusinessUrl',
      type: 'text',
      defaultValue: 'https://maps.google.com/?q=KG+Laundry',
    },
  ],
};
