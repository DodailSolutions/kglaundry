import type { CollectionConfig } from 'payload';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'basePrice', 'pricingUnit', 'turnaroundTime', 'active'],
  },
  access: {
    read: () => true, // Publicly readable for website and chat assistant
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
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'bag_wash',
      options: [
        { label: 'Wash & Fold by KG', value: 'bag_wash' },
        { label: 'Wash & Steam Iron', value: 'wash_iron' },
        { label: 'Premium Dry Cleaning', value: 'dry_cleaning' },
        { label: 'Home Linens & Curtains', value: 'household' },
        { label: 'Shoe & Bag Spa', value: 'spa' },
      ],
    },
    {
      name: 'badge',
      type: 'text',
      admin: {
        description: 'E.g. "Most Popular", "Best Value", "Save 20%", "24h Express"',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'basePrice',
          type: 'number',
          required: true,
          admin: {
            description: 'Price in Indian Rupees (₹)',
            width: '50%',
          },
        },
        {
          name: 'pricingUnit',
          type: 'select',
          required: true,
          defaultValue: 'per_kg',
          options: [
            { label: 'Per KG (₹/kg)', value: 'per_kg' },
            { label: 'Per Piece (₹/pc)', value: 'per_piece' },
            { label: 'Per Bag (₹/bag)', value: 'per_bag' },
            { label: 'Per Pair (₹/pair)', value: 'per_pair' },
            { label: 'Per Sq Ft (₹/sqft)', value: 'per_sqft' },
          ],
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'turnaroundTime',
          type: 'text',
          required: true,
          defaultValue: '24 Hours',
          admin: {
            width: '50%',
            description: 'E.g. "24 Hours", "48 Hours", "Same Day (6h)"',
          },
        },
        {
          name: 'bagColor',
          type: 'text',
          defaultValue: '#6EC5B8',
          admin: {
            width: '50%',
            description: 'Hex color for Washmen-style bag visual (e.g. #6EC5B8, #2563EB, #F59E0B)',
          },
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      label: 'Included Features',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'addOns',
      type: 'array',
      label: 'Available Add-ons & Extra Charges',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          admin: {
            description: 'Extra charge in ₹',
          },
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    },
    {
      name: 'ctaText',
      type: 'text',
      defaultValue: 'Book Pick-up',
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
