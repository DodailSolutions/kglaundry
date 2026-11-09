import type { CollectionConfig } from 'payload';

export const ChatKnowledge: CollectionConfig = {
  slug: 'chat-knowledge',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'visibility', 'status', 'updatedAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true;
      return {
        visibility: { equals: 'Public' },
        status: { equals: 'Approved' },
      };
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'E.g. "Pickup & Delivery Timings", "Stain Removal Guarantee", "Service Coverage Areas"',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'faq',
      options: [
        { label: 'Pricing & Packages', value: 'pricing' },
        { label: 'Turnaround Times', value: 'turnaround' },
        { label: 'Service Areas & Delivery', value: 'service_areas' },
        { label: 'Guarantees & Policies', value: 'policies' },
        { label: 'Discounts & Offers', value: 'offers' },
        { label: 'General FAQ', value: 'faq' },
      ],
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Clean factual knowledge for the AI chat assistant. Keep it direct and accurate.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'visibility',
          type: 'select',
          required: true,
          defaultValue: 'Public',
          options: [
            { label: 'Public (Eligible for Chat RAG)', value: 'Public' },
            { label: 'Internal (Never Indexed)', value: 'Internal' },
          ],
          admin: {
            width: '50%',
            description: 'Strict Guardrail: Internal entries are never vectorized or exposed.',
          },
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'Approved',
          options: [
            { label: 'Draft', value: 'Draft' },
            { label: 'Approved', value: 'Approved' },
            { label: 'Archived', value: 'Archived' },
          ],
          admin: {
            width: '50%',
            description: 'Only Approved entries are indexed into active RAG memory.',
          },
        },
      ],
    },
    {
      name: 'sourceCitation',
      type: 'text',
      admin: {
        description: 'Optional URL or section citation to show customers (e.g. "/services#pricing")',
      },
    },
    {
      name: 'documentFile',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload training PDF, policy doc, or price list file to train the RAG AI assistant.',
      },
    },
  ],
};
