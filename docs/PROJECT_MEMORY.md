# KG Laundry — Project Memory & Architecture Blueprint

> **Single Source of Truth & Project Memory**
> **Rule**: Read this file at the start of *every* session or task. Update it at the conclusion of *every* task. Never reverse a past decision without logging the change, date, and justification in the Decisions Log.
> **Confidentiality Notice**: This file is strictly for internal engineering reference. It must never be exposed to public web routes, public API payloads, production search indexes, or customer-facing chat assistant retrieval sources.

---

## 1. Project Overview & Goals

**KG Laundry** is a premium, modern on-demand laundry and dry-cleaning service inspired by modern digital-first services like **Washmen** (Dubai) and **Doobi**. 

The goal of this project is to build an end-to-end, production-ready web platform comprising:
1. **High-Converting Customer Experience**:
   - Ultra-fast, app-like responsive web experience (Lighthouse 95+ across all metrics).
   - Mobile-first architecture featuring sticky app bar, native bottom navigation, app store download CTAs (App Store & Google Play), bag/service breakdown, transparent pricing, and instant booking/leads.
   - PWA (Progressive Web App) capability with offline caching and standalone display.
2. **Custom Smart Admin CMS (Payload CMS 3 on Next.js 15)**:
   - Modern, SaaS-grade admin UI customized with KG Laundry branding (never looking like an out-of-the-box CMS template).
   - Live visual side-by-side editing, command palette (`Cmd/Ctrl+K`), content calendar, visual block builder with per-device visibility toggles, saved sections library, smart media manager, SEO scanner, and leads inbox.
   - Built-in AI writing assistant and 3-tier editorial approval workflow (Author → Editor → Admin).
3. **RAG-Powered AI Chat Assistant**:
   - Customer-facing smart assistant answering queries on pricing (₹), service turnaround times, pickup/delivery areas, add-ons, hours, and app download links.
   - Strict zero-hallucination policy with live database pricing tool invocation.
   - Hardened multi-layer guardrails (server-side prompt isolation, input injection blocker, semantic retrieval thresholding, output secret/PII redactor).
   - Absolute refusal of off-topic, internal operational, or technical implementation questions.
4. **Enterprise Security & Performance**:
   - Technology fingerprint hiding (no `X-Powered-By`, no CMS/framework meta tags).
   - Comprehensive CSP, HSTS, secure cookie policies, role-based access control, rate limiting, and automated backup routines.

---

## 2. Tech Stack & Justifications

| Component | Technology | Rationale & Selection Criteria |
| :--- | :--- | :--- |
| **Framework** | **Next.js 15 (App Router, React 19, Turbopack)** | Unified full-stack server component architecture, streaming SSR, edge/node runtime flexibility, optimized font and image pipelines. |
| **Headless CMS & Admin** | **Payload CMS 3** | Runs natively inside Next.js 15 without separate server instances. Native TypeScript schema, Lexical rich text, custom React components for deep admin customization, robust auth & permissions. |
| **Database** | **PostgreSQL + `pgvector`** | Single unified database engine handling relational content, admin sessions, media metadata, full-text search, and vector embeddings for semantic RAG search without extra infrastructure. |
| **Styling & UI Components** | **Tailwind CSS v4 / v3.4 + shadcn/ui + Framer Motion** | Utility-first CSS for rapid, lean styling; accessible unstyled Radix primitives; fluid micro-interactions matching Washmen and Doobi's polished mobile design. |
| **AI Orchestration & Streaming** | **Vercel AI SDK (`ai` + `@ai-sdk/openai` / `@ai-sdk/google`)** | Standardized streaming responses, tool calling (live pricing lookup), multi-provider abstraction allowing admin toggle between Gemini and OpenAI. |
| **PWA & Offline** | **Serwist** (modern `@serwist/next` worker) | Modern, actively maintained service worker tool replacing deprecated `next-pwa`, compliant with Next.js 15 App Router. |
| **Image Processing** | **Sharp** | High-performance WebP/AVIF transformations, automatic focal point cropping, compression, and blur-up placeholder generation. |
| **Containerization & Deployment** | **Docker multi-stage build + VPS / Vercel** | Reproducible environment, zero host dependencies, portable across any cloud or VPS provider. |

---

## 3. Architecture & Data Flow

### 3.1 Directory Topology
```
/kglaundry
├── /docs                     # INTERNAL ONLY: Project memory, task tracker, changelogs
│   ├── PROJECT_MEMORY.md
│   ├── TASK_TRACKER.md
│   └── CHANGELOG.md
├── /src
│   ├── /app                  # Next.js App Router
│   │   ├── (app)             # Customer-facing storefront routes
│   │   │   ├── (home)/       # Washmen/Doobi-style landing page
│   │   │   ├── services/     # Service catalog & pricing details
│   │   │   ├── blog/         # Editorial content & guides
│   │   │   ├── contact/      # Contact & order inquiry forms
│   │   │   ├── api/          # Public API routes (chat assistant, revalidate, leads)
│   │   │   └── layout.tsx    # Root customer layout with theme variable injection
│   │   ├── (payload)         # Custom-routed Payload CMS admin panel
│   │   │   ├── admin/        # Custom admin root
│   │   │   └── api/          # Payload GraphQL/REST endpoints
│   ├── /collections          # Payload CMS collections
│   │   ├── Users.ts          # Admins, Editors, Authors with RBAC
│   │   ├── Pages.ts          # Flexible block-based pages
│   │   ├── Posts.ts          # Blog articles with category/author/scheduling
│   │   ├── Services.ts       # Structured laundry services, prices (₹), add-ons
│   │   ├── Categories.ts     # Post & service categories
│   │   ├── Media.ts          # Uploads with focal points, auto-alt, folders
│   │   ├── ChatKnowledge.ts  # RAG entries (FAQs, policies, delivery zones)
│   │   ├── Leads.ts          # Inbound leads from forms and chat handoffs
│   │   └── AuditLogs.ts      # Activity feed and record changes
│   ├── /globals              # Payload CMS site-wide globals
│   │   ├── ThemeSettings.ts  # Logos, palette generator, 5 templates, custom colors
│   │   ├── HeaderSettings.ts # Desktop, tablet, and mobile navigation layouts
│   │   ├── FooterSettings.ts # Footer blocks + bottom app navigation
│   │   ├── LocalSEOSettings.ts # Schema.org, address, operating hours, coordinates
│   │   └── ChatSettings.ts   # Model provider, prompt parameters, blocked terms
│   ├── /components
│   │   ├── /admin            # Custom Payload admin components (dashboard, calendar, etc.)
│   │   ├── /blocks           # Page builder blocks (Hero, ServicesGrid, PricingTable, etc.)
│   │   ├── /chat             # Customer chat widget, stream handler, pricing cards
│   │   ├── /layout           # Sticky header, app bar, bottom navigation, footer
│   │   └── /ui               # shadcn / Radix primitives
│   ├── /lib
│   │   ├── ai/               # AI SDK clients, prompt guardrails, embeddings, vector search
│   │   ├── db/               # PostgreSQL & Drizzle / pgvector client utilities
│   │   ├── seo/              # JSON-LD generators, sitemap builder, scanner
│   │   └── utils/            # Shared formatting, currency (₹), security helpers
│   ├── /payload.config.ts    # Centralized Payload CMS configuration
│   └── /middleware.ts        # Security headers, custom admin path routing, rate limiting
├── /public                   # Static assets (logo, icons, PWA manifest)
├── Dockerfile                # Multi-stage production container
└── .env.example              # Environment contract template
```

### 3.2 Data Flow Architecture
1. **Public Content Delivery**:
   - Customer requests page → Next.js App Router executes Server Component.
   - Payload Local API fetches published content directly via PostgreSQL queries (no HTTP loopback overhead).
   - Theme and Local SEO globals inject dynamic CSS custom properties and JSON-LD schema into the `<head>` without rebuilds.
2. **Interactive RAG Chat Flow**:
   - User submits query → Client-side widget streams query to `/api/chat`.
   - **Guardrail Layer 1 (Input)**: Regex & heuristic classifier inspects input for prompt injections, system extraction, or off-topic questions. Off-topic/adversarial prompts receive instant canned refusal.
   - **Guardrail Layer 2 (Pricing Tool)**: If query asks for pricing or turnaround, AI SDK invokes server-side tool `lookupServicePricing()` which queries `Services` collection directly. Model never invents numbers.
   - **Guardrail Layer 3 (RAG Retrieval)**: Generates vector embedding of query via selected provider (Gemini or OpenAI). Executes cosine similarity search over `chat_embeddings` table with strict relevance threshold ($> 0.78$). Chunks below threshold are dropped.
   - **Guardrail Layer 4 (Output Filter)**: Response stream is scanned for internal tech tokens, file paths, DB schemas, or unlisted contact details before rendering to client.
3. **Admin Visual Editing & Live Preview**:
   - Payload admin renders custom split-pane preview. Changes in field inputs emit postMessage events to the live iframe preview, updating state synchronously with zero flicker.

---

## 4. Coding Conventions & Standards

- **TypeScript**: Strict mode enabled (`strict: true`, `noImplicitAny: true`). Explicit return types on server actions and API handlers.
- **Components**: Server Components by default. Client Components explicitly marked with `'use client'` only when state, event handlers, or browser APIs are required.
- **Naming Conventions**:
  - Components: PascalCase (`ServicesGrid.tsx`, `ChatWidget.tsx`).
  - Utilities & Hooks: camelCase (`useLivePreview.ts`, `formatCurrency.ts`).
  - Collections & Schemas: PascalCase (`Services.ts`, `ChatKnowledge.ts`).
- **Styling**: Tailwind CSS semantic utility classes with CSS variable tokens (`var(--primary)`, `var(--accent)`, `var(--bg)`). No arbitrary hardcoded pixel colors in component templates.
- **Security by Default**:
  - Never trust client inputs: validate with Zod.
  - Escape all rich text outputs (Lexical serializer).
  - All external links use `rel="noopener noreferrer"`.
  - Content Security Policy (CSP) headers applied on all HTTP responses.

---

## 5. Environment Variables Contract

| Variable Name | Category | Purpose |
| :--- | :--- | :--- |
| `DATABASE_URI` | Database | PostgreSQL connection string including credentials and pgvector pool |
| `PAYLOAD_SECRET` | Security | Cryptographic key used by Payload CMS for session signing and auth |
| `NEXT_PUBLIC_SERVER_URL` | Application | Canonical public base URL (e.g. `https://kglaundry.in`) |
| `ADMIN_ROUTE` | Security | Obfuscated admin path (defaults to `/admin` in dev, customizable in prod) |
| `OPENAI_API_KEY` | AI Service | Secret key for OpenAI text and embedding generation (optional if using Gemini) |
| `GEMINI_API_KEY` | AI Service | Secret key for Google Gemini model and embeddings |
| `DEFAULT_AI_PROVIDER` | AI Service | Active provider selector (`gemini` \| `openai`) |
| `NEXT_PUBLIC_APP_STORE_URL` | Store Links | Direct link to iOS App Store listing |
| `NEXT_PUBLIC_PLAY_STORE_URL`| Store Links | Direct link to Google Play Store listing |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`| Communication | Direct WhatsApp API number for human handoff (e.g. `919876543210`) |
| `CRON_SECRET` | Internal | Authentication token for scheduled publishing and automated backups |

---

## 6. Decisions Log

| Date | Decision | Rationale | Alternatives Rejected |
| :--- | :--- | :--- | :--- |
| **2026-11-09** | Adopt Next.js 15 + Payload CMS 3 unified architecture | Payload 3 runs directly inside Next.js App Router as native middleware/components. Eliminates separate Node CMS servers, reduces hosting overhead, enables shared types. | Strapi (separate server required), Sanity (hosted SaaS, lacks local pgvector ownership), WordPress (slow, PHP dependency). |
| **2026-11-09** | Use PostgreSQL with `pgvector` for both relational data & RAG | Eliminates secondary vector DB (Pinecone, Weaviate), keeps ACID transactions, syncs knowledge embeddings in same database transaction as content publication. | Pinecone (additional monthly cost, data sync lag), Chroma (extra operational burden). |
| **2026-11-09** | Visual Language inspired by Washmen & Doobi | Fresh, clean, high-trust aesthetic with crisp mint/teal `#6EC5B8` and dark charcoal `#2C3032` derived directly from user's logo. Mobile-first app feel with sticky bottom bar & quick download cards. | Generic flat agency template, dark moody themes (ill-suited for clean laundry brand). |
| **2026-11-09** | Multi-Layer Server-Side Guardrails for RAG Chat | Laundry customers require instant, highly accurate service rates (₹) and zero technical or operational leakage. LLMs alone hallucinate prices; server-side tool calling guarantees 100% price accuracy. | Client-side prompt filtering (easily bypassed), pure prompt-only instructions (vulnerable to prompt injection). |

---

## 7. Known Issues & Technical Debt

- *Initial state*: Repository initialization pending. Database migrations and vector extension setup to be performed in Phase 1.

---

## 8. Current Status

- **Active Phase**: Phase 3 (Custom Admin Dashboard, Command Palette, Content Calendar, Leads Inbox)
- **Last Completed Task**: Phase 1 (Foundation & Security) & Phase 2 (Washmen/Doobi-style Landing Page, Color-Coded Bag System, Live Pricing Calculator, Chat Assistant API & Guardrails)
- **Next Task**: Build bespoke SaaS Admin Dashboard widgets, Command Palette (`Cmd+K`), Content Calendar, and Leads Inbox.
