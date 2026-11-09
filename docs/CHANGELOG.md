# KG Laundry — Project Changelog

All notable changes to the KG Laundry platform will be documented in this file, categorized by date and implementation phase.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Planned Phases
- **Phase 1**: Setup, database + pgvector, Payload CMS 3 configuration, RBAC auth, security headers.
- **Phase 2**: Collections, visual blocks, Washmen/Doobi-style frontend rendering, live preview.
- **Phase 3**: Custom admin dashboard, command palette, content calendar, leads inbox.
- **Phase 4**: Theme settings, logo-based palettes, 5 templates, snapshot rollback.
- **Phase 5**: Header & footer builder, mobile bottom navigation, Serwist PWA.
- **Phase 6**: SEO engine, local SEO structured data, site-wide SEO scanner.
- **Phase 7**: AI writing assistant, smart media library, approval workflow, audit log.
- **Phase 8**: Blog scheduling, password-protected posts, comments, automated backups.
- **Phase 9**: Customer RAG chat assistant, live pricing tool, guardrails, admin controls.
- **Phase 10**: 40+ adversarial red-team prompt testing suite.
- **Phase 11**: Demo content seeding, Lighthouse 95+ optimization, security audit, deployment docs.

---

## [Phase 1: Foundation, Auth & Security Headers] - 2026-11-09

### Added
- Next.js 15 App Router architecture with React 19, TypeScript strict mode, and Tailwind CSS.
- Dual-database configuration supporting local SQLite for standalone zero-dependency development and PostgreSQL with `pgvector` for production.
- Payload CMS 3 integration with custom `/admin` routing, Lexical rich-text editor, and Sharp image processing.
- Three-tier Role-Based Access Control (RBAC): Admin, Editor, Author in `Users` collection.
- Security middleware stripping `x-powered-by`, `x-nextjs-cache`, and setting strict CSP, HSTS, and `X-Frame-Options: SAMEORIGIN`.

---

## [Phase 2: Washmen/Doobi Landing Page, Collections & Chat API] - 2026-11-09

### Added
- Full Washmen & Doobi-inspired homepage (`/`) featuring:
  - App hero with App Store & Google Play badges, trust metrics (15k+ bags delivered, 24h turnaround, 4.9★ rating), and live phone frame mockup.
  - Color-coded Bag Selection System (Clean & Fold at ₹79/kg, Wash & Steam Iron at ₹119/kg, Dry Clean at ₹149/pc, Home Linens at ₹89/kg, Sneakers Spa at ₹299/pair).
  - Interactive Pricing Calculator with live slider, add-on toggles (sanitization, lavender softener, express delivery), and instant ₹ totals.
  - 3-step "How It Works" visual routine.
  - Instant Doorstep Pickup Booking form connected to Leads pipeline.
  - Customer review cards and FAQ accordion.
- Mobile experience: sticky mobile header, app-style bottom navigation bar, and full-screen AI chat drawer.
- Server-side Live Pricing Tool (`pricingTool.ts`) and multi-layer confidentiality guardrails (`guardrails.ts`) preventing prompt injections, tech stack disclosure, or internal operational leakage.
- AI Chat endpoint (`/api/chat`) returning live structured rates in ₹ and polite refusals for out-of-scope queries.

---

## [Phase 2.5: Client Feedback Refinements - Syed Bhai's Specifications] - 2026-11-09

### Added & Updated
- **Discover Our Services Section**:
  - Restyled with brand Cyan background (`#6EC5B8`).
  - Repositioned tagline **"SIMPLE, AFFORDABLE, DESIGNED JUST FOR YOU."** above the main **"Discover Our Services"** heading, both in bold black typography.
  - Removed old *"Our Laundry & Dry Cleaning Solutions"* eyebrow per client request.
  - Expanded catalog to display all 13 specialized services with custom SVGs (`ServiceIcon`), price starting points, turnaround badges, and direct order links to `/services/[slug]`.
- **Infinite Scrolling Marquee Ticker**: Added continuous black banner ticker with live animated text: `"FREE PICKUP & DELIVERY • 100% INDIVIDUAL DRUM WASH • GERMAN ECO-FRIENDLY DETERGENTS • SCHEDULED DOORSTEP SLOTS"`.
- **Why We Are The Best Section**: Added 6 core value cards (100% Individual Drums, German Eco-Friendly Solvents, Calibrated Doorstep Scales, Fabric-Specific Care, Dependable Turnaround, Crisp High-Pressure Steam Finish).
- **We Are Striving Section**: Added high-impact dark slate mission section detailing zero-compromise hygiene, eliminating laundry stress, honest per-kg pricing, and doorstep coverage across Hyderabad.
- **Turnaround Phrasing Refinement**: Replaced unrealistic rigid 24h delivery claims with realistic customer-friendly commitments ("Prompt & Reliable Doorstep Delivery across Hyderabad", "Scheduled Turnaround").

---

## [Phase 0: Planning & Documentation] - 2026-11-09

### Added
- Created `/docs/PROJECT_MEMORY.md` as the authoritative single source of truth for architecture, conventions, security constraints, and decisions.
- Created `/docs/TASK_TRACKER.md` as the internal audit and task tracking ledger covering all 12 phases with evidence logging.
- Created `/docs/CHANGELOG.md` for historical release tracking.
- Formulated the comprehensive implementation plan and task list for user review.
- Established design direction inspired by user references (`getdoobi.app`, `washmen.com`) and extracted branding tokens from the KG Laundry logo (`#6EC5B8` fresh teal/mint and `#2C3032` dark slate).
