import type { CollectionConfig } from 'payload';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'isHome', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isHome',
      type: 'checkbox',
      label: 'Set as Homepage',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'includeInChat',
      type: 'checkbox',
      label: 'Include in Chat Assistant Index',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Only enabled pages are ever read by the AI assistant.',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        {
          slug: 'hero',
          labels: { singular: 'Hero Banner', plural: 'Hero Banners' },
          fields: [
            { name: 'tagline', type: 'text', defaultValue: 'Premium Doorstep Laundry & Dry Cleaning' },
            { name: 'headline', type: 'text', required: true, defaultValue: 'Effortless Laundry for Modern Lifestyles' },
            { name: 'subheadline', type: 'textarea', defaultValue: 'Schedule a pickup in 30 seconds. We wash, steam iron, and fold with fabric-specific care, delivered crisp to your door in 24 hours.' },
            { name: 'ctaPrimaryText', type: 'text', defaultValue: 'Book Pickup Now' },
            { name: 'ctaPrimaryLink', type: 'text', defaultValue: '#order' },
            { name: 'ctaSecondaryText', type: 'text', defaultValue: 'View Price List' },
            { name: 'ctaSecondaryLink', type: 'text', defaultValue: '#pricing' },
            { name: 'showAppBadges', type: 'checkbox', defaultValue: true },
            { name: 'badgeHighlight', type: 'text', defaultValue: '⚡ Express 6-Hour Service Available in Selected Areas' },
          ],
        },
        {
          slug: 'servicesGrid',
          labels: { singular: 'Services Bag Grid', plural: 'Services Bag Grids' },
          fields: [
            { name: 'heading', type: 'text', defaultValue: 'Choose Your Laundry Bag' },
            { name: 'subheading', type: 'textarea', defaultValue: 'Simple, transparent pricing. Pack your clothes into our color-coded bags or request a doorstep pickup.' },
            { name: 'showAllServices', type: 'checkbox', defaultValue: true },
          ],
        },
        {
          slug: 'howItWorks',
          labels: { singular: 'How It Works (3 Steps)', plural: 'How It Works' },
          fields: [
            { name: 'heading', type: 'text', defaultValue: 'How KG Laundry Works' },
            { name: 'subheading', type: 'text', defaultValue: 'Zero hassle from pickup to pristine delivery in 3 easy steps.' },
          ],
        },
        {
          slug: 'pricingTable',
          labels: { singular: 'Pricing Calculator / Table', plural: 'Pricing Tables' },
          fields: [
            { name: 'heading', type: 'text', defaultValue: 'Honest & Transparent Rates' },
            { name: 'subheading', type: 'text', defaultValue: 'No hidden fees. Every service priced clearly in Indian Rupees (₹).' },
          ],
        },
        {
          slug: 'appDownloadBanner',
          labels: { singular: 'App Download Banner', plural: 'App Download Banners' },
          fields: [
            { name: 'headline', type: 'text', defaultValue: 'Get KG Laundry on iOS & Android' },
            { name: 'description', type: 'textarea', defaultValue: 'Track your order live, customize fabric preferences, and repeat past orders in 1 tap.' },
            { name: 'appStoreUrl', type: 'text', defaultValue: 'https://apps.apple.com' },
            { name: 'playStoreUrl', type: 'text', defaultValue: 'https://play.google.com' },
          ],
        },
        {
          slug: 'faq',
          labels: { singular: 'FAQ Section', plural: 'FAQ Sections' },
          fields: [
            { name: 'heading', type: 'text', defaultValue: 'Frequently Asked Questions' },
            {
              name: 'items',
              type: 'array',
              fields: [
                { name: 'question', type: 'text', required: true },
                { name: 'answer', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          slug: 'testimonials',
          labels: { singular: 'Customer Testimonials', plural: 'Testimonials' },
          fields: [
            { name: 'heading', type: 'text', defaultValue: 'Loved by Over 15,000+ Customers' },
            {
              name: 'reviews',
              type: 'array',
              fields: [
                { name: 'author', type: 'text', required: true },
                { name: 'role', type: 'text' },
                { name: 'quote', type: 'textarea', required: true },
                { name: 'rating', type: 'number', defaultValue: 5 },
              ],
            },
          ],
        },
        {
          slug: 'ctaBanner',
          labels: { singular: 'Call to Action Banner', plural: 'CTA Banners' },
          fields: [
            { name: 'heading', type: 'text', defaultValue: 'Experience Freshness Delivered to Your Door' },
            { name: 'subheading', type: 'text', defaultValue: 'First time using KG Laundry? Enjoy 20% off your first wash bag with code FRESHKG.' },
            { name: 'buttonText', type: 'text', defaultValue: 'Schedule Pickup' },
            { name: 'buttonLink', type: 'text', defaultValue: '#order' },
          ],
        },
        {
          slug: 'contactForm',
          labels: { singular: 'Contact & Order Form', plural: 'Contact Forms' },
          fields: [
            { name: 'heading', type: 'text', defaultValue: 'Quick Doorstep Booking' },
            { name: 'subheading', type: 'text', defaultValue: 'Leave your details and our pickup concierge will contact you within 15 minutes.' },
          ],
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'noindex', type: 'checkbox', defaultValue: false },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
