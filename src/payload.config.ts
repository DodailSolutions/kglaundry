import path from 'path';
import { fileURLToPath } from 'url';
import { buildConfig } from 'payload';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import sharp from 'sharp';

import { Users } from './collections/Users';
import { Pages } from './collections/Pages';
import { Posts } from './collections/Posts';
import { Services } from './collections/Services';
import { Categories } from './collections/Categories';
import { Media } from './collections/Media';
import { ChatKnowledge } from './collections/ChatKnowledge';
import { Leads } from './collections/Leads';
import { AuditLogs } from './collections/AuditLogs';

import { ThemeSettings } from './globals/ThemeSettings';
import { HeaderSettings } from './globals/HeaderSettings';
import { FooterSettings } from './globals/FooterSettings';
import { LocalSEOSettings } from './globals/LocalSEOSettings';
import { ChatSettings } from './globals/ChatSettings';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const dbUri = process.env.DATABASE_URI || 'file:./kglaundry.db';
const isPostgres = dbUri.startsWith('postgres://') || dbUri.startsWith('postgresql://');

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '– KG Laundry Admin',
      icons: [{ url: '/logo.png' }],
    },
  },
  collections: [
    Users,
    Services,
    Pages,
    Posts,
    Categories,
    Media,
    ChatKnowledge,
    Leads,
    AuditLogs,
  ],
  globals: [
    ThemeSettings,
    HeaderSettings,
    FooterSettings,
    LocalSEOSettings,
    ChatSettings,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'kglaundry_fallback_secret_key_38291049281',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: isPostgres
    ? postgresAdapter({
        pool: {
          connectionString: dbUri,
        },
      })
    : sqliteAdapter({
        client: {
          url: dbUri,
        },
      }),
  sharp,
});
