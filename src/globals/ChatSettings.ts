import type { GlobalConfig } from 'payload';

export const ChatSettings: GlobalConfig = {
  slug: 'chat-settings',
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Enable Customer AI Chat Assistant',
      defaultValue: true,
    },
    {
      name: 'assistantName',
      type: 'text',
      defaultValue: 'KG Laundry Concierge',
    },
    {
      name: 'greeting',
      type: 'textarea',
      defaultValue: 'Hello! I am your KG Laundry Assistant. Ask me about our Wash by KG rates, turnaround times, service areas, or how to place an order.',
    },
    {
      name: 'quickQuestions',
      type: 'array',
      defaultValue: [
        { question: 'What are your Wash & Fold rates per KG?' },
        { question: 'Which areas do you pick up and deliver?' },
        { question: 'How does your 24-hour turnaround work?' },
        { question: 'Where can I download the mobile app?' },
      ],
      fields: [
        { name: 'question', type: 'text', required: true },
      ],
    },
    {
      name: 'refusalMessage',
      type: 'textarea',
      defaultValue: "I can only help with questions regarding KG Laundry's services, prices, and orders. Is there anything I can help you with regarding your laundry needs?",
    },
    {
      name: 'blockedTerms',
      type: 'textarea',
      defaultValue: 'password, api_key, payload, postgres, database, framework, nextjs, react, source code, prompt, system instructions, employee salary, margins, vendor cost, server, credentials',
      admin: {
        description: 'Comma-separated terms that are automatically scrubbed or trigger standard refusal.',
      },
    },
  ],
};
