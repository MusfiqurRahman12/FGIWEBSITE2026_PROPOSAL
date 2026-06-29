# Technical Proposal: FGI Website, Membership Platform & Digital Community Ecosystem

**Prepared for:** Fashion Group International (FGI)
**Attn:** Maryanne Grisz, President & CEO
**Prepared by:** Dynamicflow
**Date:** June 25, 2026
**RFP Deadline:** June 30, 2027

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Understanding of Requirements](#2-understanding-of-requirements)
3. [Recommended Technology Stack](#3-recommended-technology-stack)
4. [System Architecture](#4-system-architecture)
5. [CRM Recommendation](#5-crm-recommendation)
6. [Module-by-Module Implementation Plan](#6-module-by-module-implementation-plan)
7. [Development Timeline](#7-development-timeline)
8. [Project Team Structure](#8-project-team-structure)
9. [Training Plan](#9-training-plan)
10. [Ongoing Support & Maintenance](#10-ongoing-support--maintenance)
11. [Cost Proposal](#11-cost-proposal)
12. [Security, Compliance & Risk Mitigation](#12-security-compliance--risk-mitigation)
13. [Why Dynamicflow](#13-why-dynamicflow)

---

## 1. Executive Summary

We propose a **modern, headless architecture** that decouples FGI's public-facing website from its membership, events, governance, and communications platform — delivering a premium editorial experience worthy of a 95-year-old fashion institution while providing enterprise-grade membership management under the hood.

### Key Architectural Decisions

| Decision | Rationale |
|---|---|
| **Next.js 15 (App Router)** front-end | Server-side rendering for SEO, React Server Components for performance, image optimization for media-heavy fashion content |
| **Strapi 5 (Headless CMS)** | Open-source, self-hosted, nonprofit-friendly licensing; content team edits without developer involvement |
| **Node.js / NestJS API layer** | Type-safe, modular back-end; aligns skill-set across the stack (full JavaScript/TypeScript) |
| **PostgreSQL + Redis** | Relational integrity for membership data, Redis for session caching and real-time dashboards |
| **Stripe Connect** | PCI-DSS Level 1 compliant payments; supports memberships, events, invoicing, and recurring billing |
| **HubSpot CRM (Nonprofit)** | Free tier for nonprofits; native email marketing, contact segmentation, pipeline management |
| **AWS (Cloud)** | HIPAA-eligible, SOC 2 compliant infrastructure; scales from current traffic to 10x without re-architecture |

### What FGI Gets

* A **visually stunning, fashion-forward website** that reflects FGI's prestige in the industry.
* A **unified membership platform** managing 9 membership tiers with automated workflows.
* An **integrated events engine** with smart pricing, sponsorship tools, and attendance analytics.
* A **student club ecosystem** with graduation-to-professional transition automation.
* A **governance portal** for board, regional directors, and HQ with compliance tracking.
* **Enterprise analytics dashboards** with real-time KPIs across membership, events, revenue, and regions.

---

## 2. Understanding of Requirements

We have analyzed the RFP comprehensively and organized FGI's requirements into **seven functional domains**:

```
+----------------------------------------------------------+
|                    FGI DIGITAL ECOSYSTEM                  |
+----------+----------+----------+----------+--------------+
| Public   | Member   | Events & | Student  | Governance   |
| Website  | Platform | Tickets  | Clubs    | Portal       |
+----------+----------+----------+----------+--------------+
|            Communications & Analytics Engine              |
+----------------------------------------------------------+
|         Shared Services (Auth, Payments, CRM)             |
+----------------------------------------------------------+
```

### Requirements Traceability Matrix

| RFP Requirement | Proposed Solution | Module |
|---|---|---|
| Visually sophisticated design | Next.js + Framer Motion + custom design system | Website |
| Mobile-responsive, ADA compliant | Responsive CSS + WCAG 2.1 AA audit | Website |
| SEO optimized | SSR + structured data + sitemap generation | Website |
| Video/media integration | Cloudinary CDN + embedded video players | Website |
| 14 public pages + regional directory | Next.js dynamic pages + Strapi collections | Website |
| Online membership applications | Multi-step forms with approval workflows | Membership |
| 9 membership levels with RBAC | Role-based middleware + permission matrix | Membership |
| Payment processing (recurring/one-time) | Stripe Connect + Stripe Billing | Membership |
| Automated reminders & renewals | NestJS cron jobs + email triggers | Membership |
| Searchable member directory | Elasticsearch-powered search with privacy controls | Member Portal |
| Role-based dashboards | Custom React dashboards per membership tier | Member Portal |
| Event registration with smart pricing | Event module with membership-aware pricing engine | Events |
| Event sponsorship & ticketing | Sponsor tiers + QR ticket generation | Events |
| Student club management | Club registration + advisor/officer workflows | Student Platform |
| Student-to-professional transition | Automated graduation triggers + upgrade flows | Student Platform |
| Governance document management | Versioned document repository + submission tracking | Governance |
| HQ admin compliance dashboard | Real-time compliance metrics + deadline alerts | Governance |
| Targeted email/newsletters | HubSpot integration with segment sync | Communications |
| Custom reporting dashboards | Metabase embedded analytics + custom widgets | Analytics |
| PCI-compliant payments | Stripe (PCI-DSS Level 1) | Security |
| SSO & API integration | NextAuth.js + OAuth 2.0 / SAML | Security |
| GDPR & privacy compliance | Consent management + data export/deletion APIs | Security |

---

## 3. Recommended Technology Stack

### 3.1 Front-End Layer

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 15.x (App Router) | SSR/SSG framework, SEO, image optimization |
| **React** | 19.x | Component-based UI library |
| **TypeScript** | 5.x | Type safety across entire front-end |
| **Framer Motion** | 12.x | Page transitions, micro-animations, scroll effects |
| **Radix UI** | Latest | Accessible, unstyled component primitives (modals, dropdowns, tabs) |
| **CSS Modules + CSS Variables** | — | Scoped styling with design tokens; no utility-class lock-in |
| **React Hook Form + Zod** | Latest | Form management & validation for applications, registrations |
| **TanStack Query** | 5.x | Server-state management, caching, optimistic updates |
| **Chart.js / Recharts** | Latest | Dashboard charting & data visualization |

**Why Next.js over a traditional CMS (WordPress, Drupal)?**
* Fashion-forward sites demand pixel-perfect design control — template-based CMS themes cannot deliver this.
* SSR ensures Google indexes all content for SEO while delivering sub-second page loads.
* React component architecture enables reusable design patterns across 14+ public pages and member portals.
* Image optimization (next/image) automatically serves WebP/AVIF at correct sizes — critical for a media-heavy fashion site.

### 3.2 Back-End / API Layer

| Technology | Version | Purpose |
|---|---|---|
| **NestJS** | 11.x | Modular, enterprise-grade Node.js framework |
| **TypeScript** | 5.x | End-to-end type safety (shared types with front-end) |
| **Prisma ORM** | 6.x | Type-safe database access, migrations, schema management |
| **Bull MQ** | 5.x | Background job queue (email, reminders, report generation) |
| **Passport.js + NextAuth** | Latest | Authentication strategies (credentials, OAuth, SAML SSO) |
| **Nodemailer + HubSpot API** | Latest | Transactional email + marketing email orchestration |
| **PDFKit** | Latest | Invoice, receipt, and report PDF generation |

**Why NestJS?**
* Module-based architecture maps 1:1 to FGI's functional domains (MembershipModule, EventsModule, GovernanceModule, etc.).
* Built-in dependency injection, guards (RBAC), interceptors (logging), and pipes (validation).
* First-class TypeScript support ensures type safety from database schema to API response.

### 3.3 Content Management

| Technology | Purpose |
|---|---|
| **Strapi 5 (Self-Hosted)** | Headless CMS for all editorial content (news, press, awards, resources) |
| **Strapi Media Library + Cloudinary** | Asset management for images, videos, documents |
| **Strapi RBAC** | Content editor roles (HQ editors, regional editors, read-only reviewers) |

**Why Strapi?**
* Open-source with self-hosted option — no per-seat licensing fees (critical for nonprofit budget).
* Rich content modeling: collections for News, Events, Awards, Scholarships, Resources, etc.
* REST + GraphQL APIs out of the box — feeds content to Next.js at build time (SSG) or request time (SSR).
* Custom plugins can extend admin panel for FGI-specific workflows.

### 3.4 Data Layer

| Technology | Purpose |
|---|---|
| **PostgreSQL 16** | Primary relational database (membership, events, governance, payments) |
| **Redis 7** | Session store, API response caching, real-time dashboard data |
| **Elasticsearch 8** | Full-text search for member directory, content search, event search |
| **Cloudinary** | Media CDN, image transformations, video streaming |

### 3.5 Infrastructure & DevOps

| Technology | Purpose |
|---|---|
| **AWS ECS (Fargate)** | Containerized, serverless compute — no server management |
| **AWS RDS (PostgreSQL)** | Managed database with automated backups, point-in-time recovery |
| **AWS ElastiCache (Redis)** | Managed Redis cluster |
| **AWS S3 + CloudFront** | Static asset storage + global CDN |
| **AWS SES** | Transactional email sending |
| **Docker + Docker Compose** | Local development parity |
| **GitHub Actions** | CI/CD pipeline (lint, test, build, deploy) |
| **Terraform** | Infrastructure as Code for reproducible deployments |
| **Sentry** | Error monitoring & performance tracking |
| **Datadog or AWS CloudWatch** | Infrastructure monitoring, alerting, log aggregation |

### 3.6 Full Stack Diagram

```
+-------------------------------------------------------------------+
|                          CLIENTS                                   |
|   Browser (Desktop/Mobile)  |  Admin Panel  |  Mobile (Future)     |
+--------------+--------------+-------+-------+---------------------+
               |                      |
         +-----v------+        +------v------+
         |  CloudFront |        |  CloudFront |
         |    (CDN)    |        |    (CDN)    |
         +-----+------+        +------+------+
               |                      |
    +----------v----------+  +--------v--------+
    |   Next.js 15 (SSR)  |  |   Strapi 5 CMS  |
    |   Public Website    |  |   Admin Panel    |
    |   Member Portal     |  |   Content API    |
    |   Student Portal    |  |                  |
    |   Governance Portal |  |                  |
    +----------+----------+  +--------+--------+
               |                      |
         +-----v--------------------------v-----+
         |         API Gateway (NestJS)          |
         |  +---------+----------+--------+      |
         |  | Auth    | Member   | Events |      |
         |  | Guard   | Module   | Module |      |
         |  +---------+----------+--------+      |
         |  | Student | Govern.  | Comms  |      |
         |  | Module  | Module   | Module |      |
         |  +---------+----------+--------+      |
         |  | Payment | Search   | Report |      |
         |  | Module  | Module   | Module |      |
         |  +---------+----------+--------+      |
         +---+--------+----------+---------------+
             |        |          |
    +--------v--+ +---v----+ +--v-----------+
    |PostgreSQL | | Redis  | |Elasticsearch |
    |  (RDS)    | |(Cache) | |  (Search)    |
    +-----------+ +--------+ +--------------+
             |
    +--------v-----------------------------------------+
    |          EXTERNAL SERVICES                        |
    |  Stripe  |  HubSpot  |  Cloudinary  |  AWS SES   |
    +--------------------------------------------------+
```

---

## 4. System Architecture

### 4.1 Authentication & Authorization (RBAC)

The system implements a **hierarchical role-based access control** model mapped directly to FGI's 9 membership tiers:

```
                    +---------------------+
                    |   HQ Administrator  |  <-- Full system access
                    +----------+----------+
                               |
              +----------------+----------------+
              |                |                |
    +---------v------+ +------v-------+ +------v-------+
    | Board Member   | | Regional Dir | | Committee Mbr|
    +---------+------+ +------+-------+ +------+-------+
              |               |                |
              +---------------+----------------+
                              |
                    +---------v---------+
                    |    Patron         |  <-- Enhanced access
                    +-------------------+
                    |    Corporate      |
                    +-------------------+
                    |    Professional   |  <-- Standard member access
                    +-------------------+
                    | Emerging Prof.    |
                    +-------------------+
                    |    Student        |  <-- Base access
                    +-------------------+
```

**Implementation:**
* **NextAuth.js** handles authentication (email/password, Google OAuth, LinkedIn OAuth, SAML SSO).
* **JWT tokens** with role claims, verified by NestJS guards on every API request.
* **Permission matrix** stored in PostgreSQL — HQ admins can add/modify roles and permissions without code changes.
* **Route-level and component-level guards** in Next.js ensure UI elements are hidden/shown based on role.

### 4.2 Data Model Overview

Core entities and their relationships:

```
+-------------+     +--------------+     +--------------+
|    User      |---->|  Membership  |---->|  MemberTier  |
|  (profile)   |     |  (status,    |     |  (level,     |
|              |     |   dates)     |     |   perms)     |
+------+--+---+     +--------------+     +--------------+
       |  |
       |  |         +--------------+     +--------------+
       |  +-------->|  EventReg    |---->|    Event     |
       |            |  (ticket,    |     |  (date, type,|
       |            |   payment)   |     |   pricing)   |
       |            +--------------+     +------+-------+
       |                                        |
       |            +--------------+     +------v-------+
       +----------->|  StudentClub |---->|   School     |
       |            |  (role,      |     |  (name,      |
       |            |   status)    |     |   region)    |
       |            +--------------+     +--------------+
       |
       |            +--------------+     +--------------+
       +----------->|  Payment     |---->|   Invoice    |
                    |  (stripe_id, |     |  (amount,    |
                    |   method)    |     |   status)    |
                    +--------------+     +--------------+
```

### 4.3 Search Architecture (Member Directory)

The member directory uses **Elasticsearch** for sub-100ms search across all filterable fields:

* **Index fields:** Name, company, discipline, sector, location, region, expertise, tier.
* **Privacy controls:** Members opt-in/out of directory visibility per field.
* **Faceted search:** Sidebar filters for all RFP-specified criteria.
* **Real-time sync:** PostgreSQL to Elasticsearch via Change Data Capture (Debezium) or NestJS event emitters.
* **Admin-managed filters:** HQ admins add/remove filter categories via admin panel — Elasticsearch mapping updates automatically.

### 4.4 Payment Architecture

```
+----------+    +----------+    +--------------+
|  Member  |--->| Checkout |--->|    Stripe    |
|  Portal  |    |  (Next)  |    |   Connect    |
+----------+    +----------+    +------+-------+
                                       |
                                +------v-------+
                                |  Webhooks    |
                                |  (NestJS)    |
                                +------+-------+
                                       |
                          +------------+------------+
                          |            |            |
                   +------v--+  +------v--+  +-----v----+
                   | Update  |  | Generate|  |  Send    |
                   | Member  |  | Invoice |  |  Receipt |
                   | Status  |  |  (PDF)  |  |  Email   |
                   +---------+  +---------+  +----------+
```

**Capabilities:**
* **Recurring billing:** Stripe Subscriptions for annual/monthly memberships with auto-renewal.
* **One-time payments:** Event tickets, donations, sponsorship packages.
* **Smart pricing engine:** Middleware checks membership status and applies member/non-member pricing automatically.
* **Membership upsell at checkout:** Non-members see "Save $X by joining FGI" during event registration.
* **Invoicing:** Automated PDF invoice generation with FGI branding.
* **Refunds & credits:** Admin panel for partial/full refunds through Stripe dashboard.

---

## 5. CRM Recommendation

### Primary: HubSpot CRM (Nonprofit Edition)

| Feature | Benefit for FGI |
|---|---|
| **Free CRM Core** | Unlimited contacts, deals, tasks — no per-seat cost |
| **HubSpot for Nonprofits** | 40% discount on paid hubs (Marketing, Sales, Service) |
| **Email Marketing** | Drag-and-drop email builder, A/B testing, send-time optimization |
| **Contact Segmentation** | Segment by membership tier, region, committee, student status |
| **Workflow Automation** | Renewal reminders, welcome sequences, re-engagement campaigns |
| **Reporting** | Custom dashboards for membership growth, email performance, funnel |
| **API Integration** | Bi-directional sync with NestJS back-end via HubSpot API v3 |
| **Forms & Landing Pages** | Membership inquiry forms, event landing pages |

### Integration Architecture

```
+--------------+         +--------------+         +--------------+
|  FGI Back-End|-------->|  HubSpot     |-------->|  Member Gets |
|  (NestJS)    | Webhook |  CRM         | Workflow|  Welcome     |
|              |  Sync   |              |  Trigger|  Email Series|
|  New member  |         |  Contact     |         |              |
|  created     |         |  created     |         |  30-day      |
|              |         |  + tagged    |         |  onboarding  |
+--------------+         +--------------+         +--------------+
```

**Sync Strategy:**
* **Real-time:** New members, renewals, cancellations pushed to HubSpot via webhooks.
* **Nightly batch:** Full membership roster sync to ensure consistency.
* **Segmentation properties:** Membership tier, region, committees, student status, renewal date — all synced as HubSpot contact properties for targeting.

### Alternative Considered: Salesforce Nonprofit Cloud
Salesforce is the industry standard but **significantly more expensive** ($36–$100/user/month), requires certified Salesforce administrators, and has a steeper learning curve. For FGI's scale (hundreds to low thousands of members), HubSpot delivers equivalent functionality at a fraction of the cost and complexity.

---

## 6. Module-by-Module Implementation Plan

### 6.1 Public Website

**Pages & Features:**

| Page | Key Features |
|---|---|
| Home | Hero video/carousel, upcoming events, latest news, membership CTA, impact stats |
| About FGI | Mission history, timeline, impact metrics |
| Mission & Impact | Annual report highlights, infographics, testimonials |
| Leadership & Board | Photo grid, bios, committee listings |
| Membership | Tier comparison table, benefits, application CTA, testimonials |
| Events | Calendar view + list view, filtering, past event archive with recordings |
| News & Press | Blog-style feed with categories, search, featured articles |
| Awards Programs | Award descriptions, past winners gallery, nomination forms |
| Scholarships & Grants | Eligibility, application forms, past recipient stories |
| Education & Prof. Dev. | Course catalog, webinar recordings, resource library |
| Student Programs | Club directory, how to start a club, student success stories |
| Industry Resources | Curated links, reports, publications (gated by membership) |
| Sponsors & Partners | Logo wall, sponsorship tiers, partnership inquiry form |
| Contact | Form, office locations, social links, regional directory |
| Regional Communities | Unified directory page with map, regional cards, contact info |

**Design Approach:**
* **Design system** with FGI brand tokens (colors, typography, spacing) built as CSS custom properties.
* **Micro-animations** on scroll (Framer Motion) for editorial storytelling feel.
* **Magazine-style layouts** for news and awards — reflecting fashion industry aesthetics.
* **Accessibility audit** against WCAG 2.1 AA with axe-core integrated into CI pipeline.

### 6.2 Membership Management System

**Workflow:**

```
Application --> Email Confirm --> Review Queue --> Approval/Rejection --> Payment --> Activation
     |               |                 |                |                  |          |
     v               v                 v                v                  v          v
  Form w/        Verification      HQ Admin         Email            Stripe      Welcome
  file upload    link email        dashboard        notification     checkout    sequence
                                                                                 (HubSpot)
```

**Key Implementation Details:**
* Multi-step application form with document uploads (resume, company info).
* Automated email confirmation and verification process to prevent spam and validate email addresses.
* Admin approval queue with bulk actions (approve, reject, request info).
* Configurable membership tiers — HQ admins add new tiers via admin panel without developer involvement.
* Automated renewal pipeline: 90/60/30/7-day reminders, auto-charge (if enabled), grace period, lapse.
* Membership history log: every status change, payment, tier change recorded with timestamp and actor.

### 6.3 Member Portal

**Dashboard Widgets (by tier):**

| Widget | Student | Professional | Corporate | Board | HQ Admin |
|---|---|---|---|---|---|
| Profile completion | Yes | Yes | Yes | Yes | Yes |
| Upcoming events | Yes | Yes | Yes | Yes | Yes |
| Renewal status | Yes | Yes | Yes | Yes | Yes |
| Exclusive content | — | Yes | Yes | Yes | Yes |
| Industry reports | — | — | Yes | Yes | Yes |
| Committee tools | — | — | — | Yes | Yes |
| Governance docs | — | — | — | Yes | Yes |
| System admin | — | — | — | — | Yes |
| Analytics dashboard | — | — | — | Yes | Yes |
| Member directory | Yes | Yes | Yes | Yes | Yes |

### 6.4 Events & Registration

* **Event creation:** Admin form with rich text description, multiple ticket types, sponsor slots, capacity limits.
* **Smart pricing engine:** Middleware automatically detects membership status and applies correct price tier.
* **Checkout flow:** Non-members see "Join FGI and save $X" banner and can add membership to cart.
* **QR ticket generation:** PDF tickets with unique QR codes for check-in.
* **Attendance tracking:** QR scan check-in leads to attendance record and post-event follow-up email.
* **Reporting:** Per-event P&L, attendee demographics, sponsor ROI metrics.

### 6.5 Student Club Platform

* **School application:** Faculty advisor submits school registration with institution details.
* **Club dashboard:** Student officers manage club events, communications, member roster.
* **Graduation trigger:** When student membership expires post-graduation, automated email series offers professional tier at discounted rate.
* **Mentorship matching:** Students browse professional member directory (filtered for mentors who opted in).

### 6.6 Governance & Leadership Portal

* **Document repository:** Version-controlled storage for policies, manuals, templates, branding assets.
* **Submission workflows:** Regional directors submit annual plans and reports; HQ reviews and approves/returns.
* **Deadline tracker:** Calendar view of all governance deadlines with status indicators (submitted, overdue, pending).
* **Compliance dashboard (HQ):** At-a-glance view of all regions' compliance status, outstanding items, and escalation alerts.

### 6.7 Communications & Analytics

**Email Segmentation Matrix:**

| Segment Dimension | Source | Example Use |
|---|---|---|
| Membership tier | Membership DB | "Patron-exclusive networking dinner" |
| Region | User profile | "NYC Regional: Fall Fashion Week Preview" |
| Committee | Committee roster | "Marketing Committee: Q3 Strategy Review" |
| Student status | Student club DB | "Summer Internship Opportunities" |
| Event attendance | Events DB | "Thank you for attending — Watch the Replay" |
| Renewal status | Payment DB | "Your membership expires in 30 days" |

**Analytics Dashboards (Metabase Embedded):**

| Dashboard | Audience | Key Metrics |
|---|---|---|
| Executive | CEO, Board | Total members, revenue, YoY growth, retention rate |
| Membership | HQ Admin | New apps, approvals, renewals, lapses, tier distribution |
| Events | Events Team | Registrations, attendance rate, revenue per event, sponsor performance |
| Regional | Regional Directors | Regional membership count, event participation, compliance status |
| Student | Student Programs | Club count, student members, graduation transitions, mentor matches |
| Financial | Finance/Board | Total revenue, MRR, payment failures, outstanding invoices |

---

## 7. Development Timeline

### Phase Overview (11 Months Total)

```
Month 1–1.5   | Discovery, Design & Architecture
Month 1.5–3   | Core Platform (Auth, DB, CMS, Base UI)
Month 3–5     | Membership System & Member Portal
Month 5–7     | Events, Payments & Student Platform
Month 7–9     | Governance Portal & Communications
Month 9–11    | Analytics, QA & Launch
```

### Detailed Phase Breakdown

#### Phase 1: Discovery & Design (Months 1–1.5)

| Deliverable | Duration | Details |
|---|---|---|
| Stakeholder interviews | 2 weeks | CEO, board members, regional directors, student advisors |
| Information architecture | 1 week | Sitemap, user flows, content model |
| UX wireframes | 2 weeks | All 14+ public pages, member portal, admin panels |
| Visual design (UI) | 3 weeks | Design system, 3 homepage concepts, key page mockups |
| Technical architecture doc | 1 week | Finalized stack, data model, deployment plan |
| **Milestone:** Design approval | — | Stakeholder sign-off before development begins |

#### Phase 2: Core Platform (Months 1.5–3)

| Deliverable | Duration |
|---|---|
| Project scaffolding (Next.js, NestJS, Strapi, DB) | 1 week |
| Authentication & RBAC system | 2 weeks |
| Database schema & Prisma migrations | 1 week |
| CMS setup (Strapi collections, roles, media) | 2 weeks |
| Design system implementation (CSS, components) | 2 weeks |
| CI/CD pipeline & staging environment | 1 week |

#### Phase 3: Membership & Portal (Months 3–5)

| Deliverable | Duration |
|---|---|
| Membership application & approval workflows | 3 weeks |
| Stripe integration (payments, subscriptions) | 2 weeks |
| Member portal (dashboard, profile, renewals) | 3 weeks |
| Member directory (Elasticsearch, privacy controls) | 2 weeks |

#### Phase 4: Events & Student Platform (Months 5–7)

| Deliverable | Duration |
|---|---|
| Event creation & management (admin) | 2 weeks |
| Registration, ticketing & smart pricing | 2 weeks |
| Student club registration & management | 2 weeks |
| Student-to-professional transition automation | 1 week |
| Attendance tracking & event reporting | 1 week |

#### Phase 5: Governance & Communications (Months 7–9)

| Deliverable | Duration |
|---|---|
| Governance document repository | 2 weeks |
| Submission workflows & compliance tracking | 2 weeks |
| HubSpot CRM integration & email segmentation | 2 weeks |
| Newsletter templates & automation workflows | 2 weeks |

#### Phase 6: Analytics, QA & Launch (Months 9–11)

| Deliverable | Duration |
|---|---|
| Metabase dashboards (6 dashboard views) | 2 weeks |
| Security audit & penetration testing | 1 week |
| Accessibility audit (WCAG 2.1 AA) | 1 week |
| Performance optimization & load testing | 1 week |
| User acceptance testing (UAT) | 2 weeks |
| Staff training (7 sessions) | 1 week |
| Data migration (existing members, events) | 1 week |
| **Go-live** | 1 day |

> **Notice of Project Initiation & Kick-Off Preparation:**
> A minimum lead time of **two (2) weeks** is required post-contract execution. This duration allows us to finalize team resource allocation, provision local/staging environments, and prepare initial materials to ensure a successful and structured project kick-off.

---

## 8. Project Team Structure

| Role | Count | Responsibilities |
|---|---|---|
| **Project Manager** | 1 | Timeline, budget, stakeholder communication, risk management |
| **UX/UI Designer** | 1 | Research, wireframes, visual design, design system, accessibility |
| **Front-End Developer (Senior)** | 1 | Next.js, React components, design system implementation |
| **Front-End Developer** | 1 | Portal dashboards, forms, member directory UI |
| **Back-End Developer (Senior)** | 1 | NestJS API, database architecture, authentication, payments |
| **Back-End Developer** | 1 | Events module, student platform, governance workflows |
| **CMS / Integration Specialist** | 1 | Strapi setup, HubSpot integration, Elasticsearch, data migration |
| **QA Engineer** | 1 | Test planning, automated testing, accessibility & security audits |
| **DevOps Engineer** | 0.5 | AWS infrastructure, CI/CD, monitoring, deployment |

**Total team:** 8.5 FTEs across 11 months.

---

## 9. Training Plan

### Training Sessions

| Session | Audience | Duration | Topics |
|---|---|---|---|
| **CMS Content Management** | HQ content editors, regional directors | 4 hours | Creating/editing pages, managing media, publishing workflows |
| **Membership Administration** | HQ membership admin | 4 hours | Processing applications, managing tiers, payment troubleshooting, reports |
| **Events Management** | Events team | 3 hours | Creating events, pricing rules, ticket management, sponsor setup, attendance |
| **Analytics & Reporting** | CEO, board, regional directors | 2 hours | Dashboard navigation, custom report creation, data export |
| **Student Club Admin** | Student programs coordinator | 2 hours | Club approvals, advisor management, graduation transitions |
| **Governance Portal** | Regional directors, board | 2 hours | Document uploads, submission workflows, compliance tracking |
| **System Administration** | HQ IT admin | 3 hours | User management, RBAC configuration, API keys, monitoring dashboards |

### Training Deliverables
* **Video recordings** of all training sessions (hosted in member portal).
* **Written documentation** (user guides with screenshots) for each module.
* **Quick-reference cards** (1-page PDFs) for common tasks.
* **Sandbox environment** for ongoing practice and testing.

---

## 10. Ongoing Support & Maintenance

### Support Tiers

| Tier | Response Time | Availability | Includes |
|---|---|---|---|
| **Critical (Site Down)** | 1 hour | 24/7 | Immediate incident response |
| **High (Feature Broken)** | 4 hours | Business hours | Bug diagnosis and fix deployment |
| **Medium (Minor Issue)** | 1 business day | Business hours | Non-blocking bug fixes |
| **Low (Enhancement Request)** | 3 business days | Business hours | Triage, scoping, and backlog prioritization |

### Monthly Maintenance Includes

* **Security updates:** OS, framework, and dependency patching.
* **Uptime monitoring:** 99.9% SLA with automated alerting.
* **Database backups:** Daily automated backups with 30-day retention + point-in-time recovery.
* **Performance monitoring:** Monthly performance reports with optimization recommendations.
* **CMS updates:** Strapi version updates and plugin maintenance.
* **SSL certificate management:** Auto-renewal via AWS Certificate Manager.
* **Monthly support hours:** 10 hours of included support/minor enhancements.

### Annual Maintenance Activities

* Security penetration test (annual).
* Accessibility re-audit (annual).
* Dependency major version upgrades (as needed).
* Infrastructure scaling review (annual).

---

## 11. Cost Proposal

### 11.1 Implementation Cost

| Phase | Duration | Cost (USD) |
|---|---|---|
| Phase 1: Discovery & Design | 1.5 months | $27,000 |
| Phase 2: Core Platform | 1.5 months | $41,500 |
| Phase 3: Membership & Portal | 2 months | $48,000 |
| Phase 4: Events & Student Platform | 2 months | $44,000 |
| Phase 5: Governance & Communications | 2 months | $37,000 |
| Phase 6: Analytics, QA & Launch | 2 months | $32,000 |
| **Subtotal: Development** | **11 months** | **$229,500** |
| Data Migration | — | $8,000 |
| Training (7 sessions) | — | $5,000 |
| **Total Implementation** | — | **$242,500** |

### 11.2 Annual Maintenance & Hosting

| Item | Annual Cost (USD) |
|---|---|
| AWS Infrastructure (ECS, RDS, ElastiCache, S3, CloudFront, SES) | $9,600 |
| Cloudinary (Media CDN — Pro plan) | $2,700 |
| Elasticsearch (AWS OpenSearch — small instance) | $3,600 |
| Stripe Processing Fees (2.9% + $0.30 per transaction) | Pass-through |
| HubSpot CRM (Nonprofit Marketing Starter) | $5,400 |
| Metabase (Self-hosted on ECS — included in AWS cost) | $0 |
| Sentry (Error Monitoring — Team plan) | $1,200 |
| Domain & SSL | $200 |
| Monitoring & Security Tools | $1,200 |
| **Subtotal: Hosting & Services** | **$23,900** |
| Ongoing Support & Maintenance (120 hrs/year) | $24,000 |
| **Total Annual Cost** | **$47,900** |

### 11.3 Cost Notes & Hosting Clarifications

> **NOTE:** All prices are estimates and will be finalized after the Discovery phase.
>
> * **Hosting & Services ($23,900/year):** These are direct utility and software licensing costs paid to third-party providers (AWS, HubSpot, Cloudinary, Sentry, domain registry, and security tools) to run the live application during the post-development (post-launch) operational phase. These are standard, pass-through operational expenses required to keep the system online and contain no agency service markup.
> * **Support & Maintenance ($24,000/year):** This represents our agency post-development (post-launch) support fee, which covers routine security patching, backup audits, and 120 support hours per year (10 monthly hours, bankable up to 30 hours).
> * **Merchant Fees:** Stripe transaction fees (2.9% + $0.30) are pass-through merchant charges and not included above.
> * **HubSpot Discount:** HubSpot pricing assumes a 40% nonprofit discount on the Marketing Starter hub.

---

## 12. Security, Compliance & Risk Mitigation

### Security Measures

| Measure | Implementation |
|---|---|
| **Encryption at rest** | AWS RDS encryption (AES-256), S3 server-side encryption |
| **Encryption in transit** | TLS 1.3 everywhere (CloudFront to ECS to RDS) |
| **Authentication** | NextAuth.js with bcrypt password hashing, MFA support |
| **Authorization** | JWT-based RBAC with role claims, NestJS guards |
| **PCI Compliance** | Stripe Elements (card data never touches FGI servers) |
| **GDPR Compliance** | Consent management, data export API, right-to-deletion workflow |
| **WAF** | AWS WAF in front of CloudFront (OWASP Top 10 protection) |
| **DDoS Protection** | AWS Shield Standard (included with CloudFront) |
| **Secrets Management** | AWS Secrets Manager for API keys, DB credentials |
| **Vulnerability Scanning** | Automated dependency scanning (GitHub Dependabot + Snyk) |
| **Penetration Testing** | Annual third-party pentest |
| **Backup & Recovery** | Daily automated backups, 30-day retention, tested recovery procedures |
| **Audit Logging** | All admin actions logged with actor, timestamp, and change detail |

### GDPR & Privacy

* **Cookie consent banner** with granular opt-in/out.
* **Privacy settings** in member profile (directory visibility, communication preferences).
* **Data export:** Members can download their data in JSON/CSV format.
* **Right to deletion:** Automated data purge workflow with 30-day grace period.
* **Data processing agreement (DPA)** with all third-party services.

---

## 13. Why Dynamicflow

### Our Differentiators

1. **Full-Stack TypeScript Expertise** — One language, one team, from database to UI. No translation gaps between front-end and back-end teams.

2. **Nonprofit & Membership Organization Experience** — We understand the unique challenges: tiered memberships, board governance, volunteer management, donor relations, and limited IT budgets.

3. **Fashion & Creative Industry Understanding** — We know that for FGI, the website IS the brand. We design to the aesthetic standards of the fashion industry, not generic corporate templates.

4. **Modern, Future-Proof Architecture** — Our headless approach means FGI can add a mobile app, integrate new services, or redesign the front-end without rebuilding the back-end.

5. **Transparent, Collaborative Process** — Bi-weekly demos, shared project board, dedicated Slack channel, and no surprises on timeline or budget.

6. **Cost-Effective for Nonprofits** — Open-source stack (Strapi, Metabase, NestJS) eliminates recurring license fees that enterprise CMS platforms would charge.

---

*This proposal is valid for 90 days from the date of submission. We welcome the opportunity to present this proposal in person and answer any questions.*

**Dynamicflow**
*Building Digital Ecosystems for Impact Organizations*
[dynamicflowit.com](https://dynamicflowit.com)
