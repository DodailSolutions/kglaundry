import type { CollectionConfig } from 'payload';

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'serviceInterested', 'source', 'status', 'createdAt'],
  },
  access: {
    create: () => true, // Public leads submission via form or chat
    read: ({ req: { user } }) => Boolean(user), // Admin only
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'email',
          type: 'email',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'serviceInterested',
          type: 'text',
          admin: {
            width: '50%',
            description: 'E.g. "Wash & Fold by KG", "Express Dry Cleaning"',
          },
        },
        {
          name: 'source',
          type: 'select',
          required: true,
          defaultValue: 'website_form',
          options: [
            { label: 'Website Contact Form', value: 'website_form' },
            { label: 'AI Chat Assistant', value: 'chat_assistant' },
            { label: 'WhatsApp Click', value: 'whatsapp_click' },
            { label: 'Direct Call', value: 'direct_call' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'address',
      type: 'text',
      admin: {
        description: 'Customer pickup location / area',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'New',
      options: [
        { label: 'New Lead', value: 'New' },
        { label: 'Contacted', value: 'Contacted' },
        { label: 'Order Scheduled', value: 'Scheduled' },
        { label: 'Converted Customer', value: 'Converted' },
        { label: 'Cancelled / Spam', value: 'Cancelled' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
