import type { CollectionConfig } from 'payload';

export const AuditLogs: CollectionConfig = {
  slug: 'audit-logs',
  admin: {
    useAsTitle: 'action',
    defaultColumns: ['action', 'performedBy', 'entityType', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: () => false, // Immutable audit logs
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'action',
      type: 'text',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'performedBy',
          type: 'text',
          defaultValue: 'system',
          admin: { width: '50%' },
        },
        {
          name: 'entityType',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'details',
      type: 'textarea',
    },
  ],
};
