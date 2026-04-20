# KrishiYantra — Agricultural Equipment Sharing Platform
## Complete Project Documentation

> **Every aspect of the platform explained in extreme detail — technical and non-technical.**

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Problem Statement & Motivation](#2-problem-statement--motivation)
3. [Project Name & Branding](#3-project-name--branding)
4. [Stakeholders & Target Audience](#4-stakeholders--target-audience)
5. [Key Features Summary](#5-key-features-summary)
6. [Non-Technical Walkthrough (How It Works)](#6-non-technical-walkthrough-how-it-works)
7. [System Architecture](#7-system-architecture)
8. [Folder & File Structure](#8-folder--file-structure)
9. [Tech Stack — Every Library Explained](#9-tech-stack--every-library-explained)
10. [Database Design & Schema](#10-database-design--schema)
11. [Backend — Server Deep Dive](#11-backend--server-deep-dive)
    - 11.1 [Entry Point — `server/index.js`](#111-entry-point--serverindexjs)
    - 11.2 [Database Configuration](#112-database-configuration)
    - 11.3 [Authentication Middleware](#113-authentication-middleware)
    - 11.4 [Auth Routes — `/api/register`, `/api/login`, `/api/admin/login`](#114-auth-routes)
    - 11.5 [Equipment Routes — CRUD + Image Upload](#115-equipment-routes)
    - 11.6 [Data Seeding — `seed.js`](#116-data-seeding--seedjs)
12. [Frontend — React App Deep Dive](#12-frontend--react-app-deep-dive)
    - 12.1 [Application Entry — `main.jsx`](#121-application-entry--mainjsx)
    - 12.2 [Root Component — `App.jsx`](#122-root-component--appjsx)
    - 12.3 [Design System — `styles.jsx`](#123-design-system--stylesjsx)
    - 12.4 [Shared Data — `data.js`](#124-shared-data--datajs)
    - 12.5 [Navbar — `Navbar.jsx`](#125-navbar--navbarjsx)
    - 12.6 [Home Page — `HomePage.jsx`](#126-home-page--homepagejsx)
    - 12.7 [Equipment Page — `EquipmentPage.jsx`](#127-equipment-page--equipmentpagejsx)
    - 12.8 [Booking Page — `BookingPage.jsx`](#128-booking-page--bookingpagejsx)
    - 12.9 [Farmer Dashboard — `FarmerDashboard.jsx`](#129-farmer-dashboard--farmerdashboardjsx)
    - 12.10 [Admin Dashboard — `AdminDashboard.jsx`](#1210-admin-dashboard--admindashboardjsx)
    - 12.11 [Insurance Page — `InsurancePage.jsx`](#1211-insurance-page--insurancepagejsx)
    - 12.12 [Login Page — `LoginPage.jsx`](#1212-login-page--loginpagejsx)
    - 12.13 [Admin Login Page — `AdminLoginPage.jsx`](#1213-admin-login-page--adminloginpagejsx)
    - 12.14 [Utility Components — `Utilities.jsx`](#1214-utility-components--utilitiesjsx)
13. [Authentication & Security Flow](#13-authentication--security-flow)
14. [Equipment Approval Workflow](#14-equipment-approval-workflow)
15. [Booking & Pricing System](#15-booking--pricing-system)
16. [Trust Score System](#16-trust-score-system)
17. [Insurance & Protection System](#17-insurance--protection-system)
18. [Image Upload System](#18-image-upload-system)
19. [State Management Approach](#19-state-management-approach)
20. [UI/UX Design Decisions](#20-uiux-design-decisions)
21. [Responsive Design](#21-responsive-design)
22. [Deployment](#22-deployment)
23. [Environment Variables](#23-environment-variables)
24. [Local Development Setup](#24-local-development-setup)
25. [Seed Data — Default Users & Equipment](#25-seed-data--default-users--equipment)
26. [Business Model](#26-business-model)
27. [Expected Real-World Impact](#27-expected-real-world-impact)
28. [Feasibility Analysis](#28-feasibility-analysis)
29. [Future Enhancements](#29-future-enhancements)
30. [Known Limitations](#30-known-limitations)
31. [Academic Context](#31-academic-context)

---

## 1. Project Overview

**KrishiYantra** (Sanskrit: *Krishi* = Agriculture, *Yantra* = Machine/Tool) is a full-stack web application that functions as a **digital marketplace for agricultural equipment rental** in India. It directly connects equipment owners (farmers who own machinery) with equipment borrowers (farmers who need machinery) through a transparent, fee-based online platform.

The platform eliminates the need for middlemen, removes exploitation in informal rental markets, and provides a structured, verified system where every piece of equipment goes through an inspection process before it can be rented out.

At its core, the platform solves three simultaneous problems:
1. **Equipment owners** have machines sitting idle for 60–70% of the year — costing them money rather than earning it.
2. **Small and marginal farmers** cannot afford to purchase modern mechanized equipment (prices range from ₹8 lakh for a basic tractor to ₹50 lakh for a combine harvester).
3. **The informal rental market** is unregulated, exploitative, and full of disputes over equipment condition, pricing, and availability.

---

## 2. Problem Statement & Motivation

### The Real-World Crisis

India has approximately **146 million farming households**. Of these:
- Only **10–15%** own any form of mechanized agricultural equipment.
- The remaining **85–90%** depend on either manual labour or informal rental networks.
- Equipment costs are prohibitively high: a mid-range tractor costs ₹8–12 lakh, a combine harvester ₹25–50 lakh.
- Agricultural equipment sits **idle for 60–70% of the year** because crop cycles are seasonal.

### Consequences of This Gap

| Problem | Impact |
|---|---|
| High purchase cost | Small farmers cannot mechanize → lower productivity |
| Informal rental markets | No fixed pricing → exploitation by middlemen |
| No availability tracking | Farmers travel long distances only to find equipment booked |
| Double bookings | Two farmers claim the same slot → disputes and crop loss |
| Equipment condition disputes | No pre/post inspection → owners blame renters unfairly |
| No payment protection | Cash-only transactions → fraud risk on both sides |
| Idle equipment | Owners earn nothing during off-season |

### What KrishiYantra Solves

- **Centralized availability calendar** → No double bookings, no wasted trips.
- **Admin-verified listings** → Every piece of equipment is inspected before appearing on the platform.
- **Transparent pricing** → Fixed daily and hourly rates visible to all users.
- **Digital booking records** → Disputes have a paper trail.
- **Insurance system** → Equipment damage is covered, not blamed informally.
- **Trust Score** → Repeated misuse leads to automatic account suspension.

---

## 3. Project Name & Branding

| Attribute | Value |
|---|---|
| Platform name | **KrishiYantra** |
| Tagline | *Fair. Transparent. Accessible.* |
| Brand colour (primary) | Forest green (`#2D6A4F`) |
| Brand colour (accent) | Warm gold (`#C9A97A`) |
| Background | Cream (`#FAF3E0`) — evokes natural, agricultural warmth |
| Logo / Icon | 🌾 (sheaf of rice emoji) — universally understood farming symbol |
| Heading font | **Playfair Display** (serif) — conveys tradition, trust, gravitas |
| Body font | **Lato** (sans-serif) — clean, modern, readable at all sizes |
| Domain (contact info in UI) | `support@krishiyantra.in` |
| Toll-free number (placeholder) | `1800-XXX-XXXX` |

The branding was chosen deliberately: green and gold together signify **growth and harvest**, while the serif headline font echoes the gravity of an institution that farmers can trust.

---

## 4. Stakeholders & Target Audience

### Primary Users

#### 🌱 Borrower Farmers
- Small and marginal farmers (0–5 acres of land).
- Do not own mechanized equipment.
- Need equipment seasonally (ploughing, planting, harvesting).
- Register as **Borrower** type.
- Use the platform to browse, discover, and book available equipment near their location.

#### 🚜 Lender Farmers (Equipment Owners)
- Medium to large farmers (5–20+ acres) who own machinery.
- Equipment idle during off-season (60–70% of the year).
- Register as **Lender** type.
- Use the Farmer Dashboard to list their equipment, upload photos, set pricing.
- Equipment only goes live after Admin approval.

#### 🔄 Both (Borrower + Lender)
- A farmer can simultaneously list their own equipment **and** rent equipment from others.
- Registered with **farmerType = "Both"**.

#### 🛡️ Platform Administrator
- A special user with `role = "admin"` in the database.
- Monitors all listings, approves or rejects equipment, manages users, tracks bookings.
- Accesses a dedicated Admin Dashboard not visible to regular users.
- Cannot be self-registered — must be seeded directly into the database.

### Secondary Stakeholders
- **Mechanics**: Assigned by the platform for equipment inspection (tracked in adminNote, future feature).
- **Insurance assessors**: Evaluate damage claims (tracked in insurance module).
- **Banks / Payment gateways**: Future integration for secure online payments.

---

## 5. Key Features Summary

| Feature | Description |
|---|---|
| User registration | Name, email, phone, password, land size, district, state, farmer type |
| Farmer login | JWT-based authentication, session persisted via localStorage |
| Admin login | Separate login endpoint (`/api/admin/login`), role-checked server-side |
| Equipment listing | Owners list equipment with full specs, photos, and pricing |
| Equipment approval | Every listing requires admin approval before going live |
| Equipment browsing | Public page with filters by type, location, max price per day |
| Equipment detail modal | Full spec sheet — rating, age, condition, attachments, last serviced |
| Booking calendar | Interactive calendar for date-range selection |
| Price breakdown | Rental fee + refundable security deposit + 6% platform fee |
| Booking management | View, track status, cancel bookings from Farmer Dashboard |
| Admin equipment management | Change status through a defined workflow (Inspection → Approved → In Use → Returned) |
| User management | Admin can view user profiles, damage history, suspend/reinstate accounts |
| Insurance plans | Three-tier subscription (Basic / Standard / Premium) |
| Dynamic premium calculator | Premium adjusted by land size, usage frequency, and damage history |
| Damage claims tracking | Admin can see all open claims with status, amount, evidence count |
| Trust Score | 0–100 score per user, visual gauge, drives insurance premium multiplier |
| Toast notifications | Real-time slide-in/out feedback for all user actions |
| Offline fallback | If API unavailable, app falls back to local static data seamlessly |
| Responsive UI | Mobile-friendly — hamburger menu, single-column grids on small screens |
| GitHub Pages deployment | Frontend deployed as a static site |

---

## 6. Non-Technical Walkthrough (How It Works)

This section explains the platform entirely without technical jargon, as if explaining to a farmer or policy maker.

### Step 1 — Register

A farmer visits the website and registers by filling in their name, mobile number, email address, and a password. They also tell the platform:
- How much land they own (in acres).
- Whether they want to **borrow** equipment, **lend** their equipment, or **both**.
- Their district and state (so the platform can show nearby equipment).

Once registered, they are automatically logged in.

### Step 2 — Browse Available Equipment

The **Equipment page** shows a grid of all verified, available machinery. Each card shows:
- A photo of the machine.
- Its type (Tractor, Harvester, Rotavator, etc.).
- Its condition (Excellent / Good / Fair).
- Its location (district level).
- Price per day.
- Star rating from previous users.

Filters let the farmer narrow down by: equipment type, location, and maximum price per day.

### Step 3 — View Details

Clicking any equipment card opens a **detail popup (modal)** showing everything about that machine:
- Brand, year of manufacture, age.
- Engine hours (how much it has been used in its lifetime).
- Horsepower.
- Last serviced date.
- Fuel type (Diesel / Petrol / Electric).
- Attachments included (Plough, Harrow, Trailer, etc.).
- Whether delivery to the farm is available.
- Full address (village, taluka, district, state).

### Step 4 — Book Equipment

Clicking **"Book Now"** takes the farmer to the **Booking page**, where they:
1. Use an **interactive calendar** to select start and end dates.
2. Enter their land size (in acres) and crop type.
3. See an instant **price breakdown**:
   - Rental fee (price per day × number of days).
   - Security deposit (50% of one day's price, fully refundable).
   - Platform fee (6% of rental).
   - **Grand total**.
4. Click **"Confirm Booking"**.

The booking then appears in their **Farmer Dashboard** with a "Pending" status.

### Step 5 — Pre-Inspection

Before the equipment is handed over, the Admin dispatches a mechanic to inspect the machine and confirm its condition matches the listing. The Admin updates the equipment status through:
`Inspection Pending → Mechanic Dispatched → Approved & Ready`

### Step 6 — Equipment in Use

Once the farmer collects the equipment, the Admin marks it as **"In Use"**. The equipment disappears from the public browse page during this period (not available for booking).

### Step 7 — Return & Post-Inspection

After the rental period:
1. The farmer returns the equipment.
2. A mechanic inspects it again: `Return Inspection Pending → Mechanic Dispatched for Return Check`.
3. If no damage: `Returned & Cleared` → Security deposit is refunded.
4. If damage found: Owner files a damage claim through the **Insurance system**.

### Step 8 — Damage Claims

If the equipment comes back damaged:
1. The owner logs a claim on the Insurance page, describing the damage and uploading photos.
2. The Admin reviews the claim.
3. A mechanic estimates the repair cost.
4. The **insurance fund** pays out to the owner (up to the plan's coverage limit).
5. The borrower's **Trust Score** is reduced and their insurance premium increases for future rentals.

### Step 9 — Payment Settlement

Currently tracked in the system but displayed as a future integration. The platform fee (6%) and deposit handling are computed and shown to users, ready for payment gateway integration.

---

## 7. System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          USER'S BROWSER                             │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │              React Single-Page Application (SPA)            │   │
│  │   Vite build tool  │  JSX components  │  In-memory state    │   │
│  │   Hosted on GitHub Pages (static site)                      │   │
│  └────────────────────────┬─────────────────────────────────────┘   │
└───────────────────────────│─────────────────────────────────────────┘
                            │  HTTP/REST (JSON)
                            │  fetch() API calls to http://localhost:5000/api
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     NODE.JS / EXPRESS SERVER                        │
│                          (server/index.js)                          │
│                                                                     │
│  ┌──────────────┐  ┌─────────────────┐  ┌─────────────────────┐    │
│  │  /api/auth   │  │  /api/equipment  │  │  /uploads (static)  │    │
│  │  (routes/    │  │  (routes/        │  │  served by express   │    │
│  │   auth.js)   │  │   equipment.js)  │  │  for uploaded images │    │
│  └──────┬───────┘  └────────┬─────────┘  └─────────────────────┘    │
│         │                   │                                       │
│  ┌──────▼───────────────────▼─────────────────────────────────┐     │
│  │                  Sequelize ORM Layer                        │     │
│  │   User model  │  Equipment model  │  Auto-sync schemas      │     │
│  └───────────────────────────┬────────────────────────────────┘     │
└──────────────────────────────│──────────────────────────────────────┘
                               │  mysql2 driver
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        MySQL DATABASE                               │
│                    (krishiyantra — default DB name)                 │
│                                                                     │
│     ┌──────────────────┐        ┌──────────────────────────┐        │
│     │   users table    │        │    equipment table        │        │
│     │  (id, name,      │        │  (id, name, type, brand,  │        │
│     │   email, phone,  │        │   pricePerDay, ownerId,   │        │
│     │   password hash, │        │   adminStatus, photos,    │        │
│     │   role, etc.)    │        │   available, etc.)        │        │
│     └──────────────────┘        └──────────────────────────┘        │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

| Decision | Rationale |
|---|---|
| SPA (single-page app) | No full page reloads; fast, app-like experience for rural users on slow connections |
| Client-side routing (state-based) | `page` state in `App.jsx` replaces URL routing; simpler for static deployment |
| REST API (not GraphQL) | Simpler for academic scope; easy to extend |
| Sequelize ORM | Prevents raw SQL injection risks; `alter: true` auto-migrates schema changes |
| JWT (stateless auth) | No server-side sessions; scales horizontally; token stored in localStorage |
| Offline fallback | API calls wrapped in try/catch; if server is down, static data still renders the UI |
| Multer for file uploads | Multipart form data; images stored on disk in `/server/uploads/` |

---

## 8. Folder & File Structure

```
Agricultural-Equipment-Sharing-Platform/
│
├── README.md                        ← Brief overview (GitHub landing page)
├── PROJECT_DOCUMENTATION.md         ← This file (full documentation)
├── package.json                     ← Root package (only gh-pages dependency)
├── package-lock.json
│
├── mpr1/                            ← Project report assets (images, PDFs)
│   ├── *.jpg / *.webp / *.png       ← Equipment and farm stock photos
│   └── EXPERIMENT LIST_DBMS_SEM_IV_JAN_APR_26.pdf
│
├── my-app/                          ← React Frontend (Vite project)
│   ├── index.html                   ← HTML shell; loads Google Fonts, sets viewport
│   ├── vite.config.ts               ← Vite config; base URL for GitHub Pages
│   ├── package.json                 ← Frontend dependencies & scripts
│   ├── tsconfig.json                ← TypeScript config (JSX files use TS checks)
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── eslint.config.js             ← ESLint config (react-hooks + refresh rules)
│   └── src/
│       ├── main.jsx                 ← React DOM entry point
│       ├── App.jsx                  ← Root component; page routing state; auth guard
│       ├── styles.jsx               ← Global colour palette, shared input styles, GlobalStyles
│       ├── data.js                  ← Static fallback data; equipment constants; sample records
│       ├── App.css                  ← Minimal global CSS (mostly overridden by styles.jsx)
│       ├── index.css                ← Root body CSS
│       └── components/
│           ├── Navbar.jsx           ← Sticky navigation bar; role-based links; mobile menu
│           ├── HomePage.jsx         ← Hero, stats, how-it-works, about, contact, footer
│           ├── EquipmentPage.jsx    ← Browse & filter equipment; equipment detail modal
│           ├── BookingPage.jsx      ← Calendar date picker; price breakdown; booking form
│           ├── FarmerDashboard.jsx  ← Bookings tab; list equipment tab; damage claim tab
│           ├── AdminDashboard.jsx   ← Users tab; equipment tab; claims tab; bookings tab
│           ├── InsurancePage.jsx    ← Insurance plans; premium calculator; claim workflow
│           ├── LoginPage.jsx        ← Farmer login + registration (combined form)
│           ├── AdminLoginPage.jsx   ← Admin-only login form
│           └── Utilities.jsx        ← Shared: Stars, Badge, StatusBadge, Toast, TrustScoreBadge
│
└── server/                          ← Node.js + Express Backend
    ├── index.js                     ← App entry; middleware; routes; DB init; server start
    ├── seed.js                      ← One-time seed script; creates admin + 6 equipment rows
    ├── package.json                 ← Backend dependencies
    ├── package-lock.json
    ├── config/
    │   └── database.js              ← Sequelize instance; reads DB credentials from .env
    ├── middleware/
    │   └── auth.js                  ← JWT verification; authMiddleware + adminMiddleware
    ├── models/
    │   ├── User.js                  ← Sequelize User model definition
    │   └── Equipment.js             ← Sequelize Equipment model definition
    └── routes/
        ├── auth.js                  ← POST /register, /login, /admin/login
        └── equipment.js             ← GET/POST/PATCH/DELETE /equipment
```

---

## 9. Tech Stack — Every Library Explained

### Frontend

| Library / Tool | Version | Purpose |
|---|---|---|
| **React** | `^19.2.0` | UI component library; manages the view layer; uses hooks (`useState`, `useEffect`) for all state and side effects |
| **React DOM** | `^19.2.0` | Renders the React component tree into the browser's `#root` div |
| **Vite** | `^7.2.4` | Next-generation build tool; hot module replacement (HMR) during development; produces an optimised static bundle for production |
| **@vitejs/plugin-react** | `^5.1.1` | Vite plugin that enables JSX transform and React Fast Refresh |
| **TypeScript** | `~5.9.3` | Type-checking for `.tsx`/`.ts` files; used only for build-time type safety, not strict runtime enforcement |
| **typescript-eslint** | `^8.46.4` | Integrates TypeScript with ESLint for linting TypeScript-flavoured JSX |
| **ESLint** | `^9.39.1` | Static code analysis; catches bugs and style violations |
| **eslint-plugin-react-hooks** | `^7.0.1` | Enforces Rules of Hooks (no conditional hook calls, etc.) |
| **eslint-plugin-react-refresh** | `^0.4.24` | Warns when component exports would break Fast Refresh |
| **gh-pages** | `^6.3.0` | CLI tool that pushes the `dist/` build folder to the `gh-pages` branch on GitHub, enabling GitHub Pages hosting |
| **Google Fonts (CDN)** | N/A | **Playfair Display** (headings) and **Lato** (body) loaded from Google's CDN in `index.html` |

No external React UI framework (no Material UI, no Ant Design, no Tailwind) was used. All styling is done with **inline React styles** and a centralized `styles.jsx` design token file. This is intentional: it avoids adding large dependencies and makes every style decision explicit and visible in the component code.

### Backend

| Library / Tool | Version | Purpose |
|---|---|---|
| **Node.js** | (runtime) | JavaScript runtime that executes the server code |
| **Express** | `^4.21.2` | Minimal web framework; handles HTTP routing, middleware chaining, request/response lifecycle |
| **Sequelize** | `^6.37.5` | Promise-based ORM (Object-Relational Mapper); defines JavaScript model classes that map to MySQL tables; handles CREATE TABLE, ALTER TABLE, and all CRUD queries |
| **mysql2** | `^3.12.0` | MySQL database driver for Node.js; used both directly (to create the database if not exists) and as Sequelize's underlying dialect driver |
| **bcryptjs** | `^2.4.3` | Password hashing library; uses the bcrypt algorithm with salting; never stores plain-text passwords |
| **jsonwebtoken** | `^9.0.2` | Signs and verifies JSON Web Tokens (JWT); the token encodes user ID, email, name, and role; expires after 24 hours |
| **multer** | `^2.1.1` | Middleware for handling `multipart/form-data` (file uploads); stores images in `/server/uploads/` with unique timestamped filenames |
| **dotenv** | `^16.4.7` | Loads environment variables from a `.env` file into `process.env`; keeps secrets out of source code |
| **cors** | `^2.8.5` | Adds `Access-Control-Allow-Origin` headers so the frontend (different port/domain) can call the API |

---

## 10. Database Design & Schema

### Database Name
`krishiyantra` (configurable via `DB_NAME` environment variable)

### `users` Table

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | INTEGER | PK, AUTO_INCREMENT | Unique identifier |
| `name` | VARCHAR(100) | NOT NULL | Full name of the user |
| `email` | VARCHAR(150) | NOT NULL, UNIQUE | Login email; validated as email format |
| `phone` | VARCHAR(15) | NOT NULL | Mobile number (Indian format) |
| `password` | VARCHAR(255) | NOT NULL | bcrypt-hashed password (never plain text) |
| `role` | ENUM('farmer','admin') | DEFAULT 'farmer' | Determines access level and which dashboard is shown |
| `landSize` | FLOAT | NULL allowed | Farm size in acres; used for insurance premium calculation |
| `district` | VARCHAR(100) | NULL allowed | User's district; used for location-based matching |
| `state` | VARCHAR(100) | NULL allowed | User's state |
| `farmerType` | ENUM('Borrower','Lender','Both') | NULL allowed | Describes the user's intent on the platform |
| `trustScore` | INTEGER | DEFAULT 100 | Starts at 100; decremented for damage incidents |
| `createdAt` | DATETIME | Auto-managed | Sequelize timestamp |
| `updatedAt` | DATETIME | Auto-managed | Sequelize timestamp |

**Notes:**
- No `owner` role exists — equipment owners are regular `farmer` role users with `farmerType = 'Lender'` or `'Both'`.
- Admin users cannot self-register via the API — they must be seeded directly.
- `trustScore` is the foundation of the insurance risk multiplier.

---

### `equipment` Table

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | INTEGER | PK, AUTO_INCREMENT | Unique identifier |
| `name` | VARCHAR(150) | NOT NULL | Full model name (e.g., "Mahindra Tractor 575 DI") |
| `type` | ENUM | NOT NULL | One of: Tractor, Harvester, Rotavator, Seed Drill, Thresher, Tiller, Other |
| `brand` | VARCHAR(100) | NULL | Manufacturer brand name |
| `yearOfMfg` | INTEGER | NULL | Year of manufacture |
| `condition` | ENUM | DEFAULT 'Good' | Excellent / Good / Fair / Poor |
| `engineHours` | INTEGER | DEFAULT 0 | Total engine runtime hours (indicates wear) |
| `lastServiced` | DATEONLY | NULL | Date of most recent service |
| `fuelType` | ENUM | DEFAULT 'Diesel' | Diesel / Petrol / Electric |
| `hp` | INTEGER | DEFAULT 0 | Engine horsepower |
| `attachments` | JSON | DEFAULT [] | Array of strings: ['Plough', 'Cultivator', etc.] |
| `pricePerHour` | FLOAT | NULL | Hourly rental price in INR |
| `pricePerDay` | FLOAT | NOT NULL | Daily rental price in INR |
| `location` | VARCHAR(100) | NULL | General location label (city name) |
| `village` | VARCHAR(100) | NULL | Village name |
| `taluka` | VARCHAR(100) | NULL | Sub-district (taluka/tehsil) |
| `district` | VARCHAR(100) | NULL | District name |
| `state` | VARCHAR(100) | DEFAULT 'Maharashtra' | State |
| `deliveryAvailable` | BOOLEAN | DEFAULT false | Whether owner delivers to the farmer's farm |
| `rating` | FLOAT | DEFAULT 4.0 | Average star rating (1–5) |
| `available` | BOOLEAN | DEFAULT true | Whether equipment is currently bookable |
| `adminStatus` | VARCHAR(60) | DEFAULT 'Inspection Pending' | Current workflow status |
| `adminNote` | TEXT | NULL | Admin's note (e.g., "Inspected by Rajan Patil") |
| `photos` | JSON | DEFAULT [] | Array of file paths for uploaded images |
| `ownerId` | INTEGER | NULL, FK → users.id | Which farmer owns/listed this equipment |
| `createdAt` | DATETIME | Auto-managed | |
| `updatedAt` | DATETIME | Auto-managed | |

**`adminStatus` values (workflow):**
1. `Inspection Pending` — just listed, awaiting review
2. `Mechanic Dispatched` — mechanic sent to inspect
3. `Approved & Ready` — inspected, ready to be made available
4. `Available` — live and bookable on public page
5. `In Use` — currently rented out
6. `Return Inspection Pending` — farmer has returned it; awaiting post-rental inspection
7. `Mechanic Dispatched for Return Check` — mechanic checking return condition
8. `Returned & Cleared` — all clear; deposit can be refunded

Only statuses `Available` and `Approved & Ready` make `available = true`, which controls visibility on the public Equipment page.

---

## 11. Backend — Server Deep Dive

### 11.1 Entry Point — `server/index.js`

The server entry point does the following in order:

1. **Loads `dotenv`** — reads `.env` file into `process.env`.
2. **Creates Express app** — attaches CORS middleware (allows all origins in development), JSON body parser, and static file serving from `/uploads`.
3. **Mounts routes** — all auth routes and equipment routes are mounted under `/api`.
4. **Health check endpoint** — `GET /api/health` returns `{ status: 'ok' }` — useful for monitoring and CI checks.
5. **Async `start()` function**:
   a. Connects to MySQL using `mysql2` directly and runs `CREATE DATABASE IF NOT EXISTS`.
   b. Calls `sequelize.sync({ alter: true })` — compares existing MySQL schema with model definitions and applies minimal changes (adds missing columns, modifies types) without dropping data.
   c. Starts listening on `PORT` (default: 5000).

```
Flow:
Load .env → Create Express app → Mount middleware → Mount routes
→ Connect MySQL → CREATE DB if missing → Sync Sequelize models
→ Listen on port 5000
```

### 11.2 Database Configuration

`server/config/database.js` creates and exports a single **Sequelize instance**:
- Dialect: `mysql`
- Reads `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME` from environment.
- Defaults: `localhost`, `root`, `''`, `krishiyantra`.
- `logging: false` — suppresses SQL query logs in the console (keeps output clean).

This singleton is imported by both models (`User.js`, `Equipment.js`) to define their table associations.

### 11.3 Authentication Middleware

`server/middleware/auth.js` exports two middleware functions:

**`authMiddleware`:**
- Checks for `Authorization: Bearer <token>` header.
- Returns 401 if header is missing or malformed.
- Calls `jwt.verify(token, process.env.JWT_SECRET)`.
- On success, attaches decoded payload `{ id, email, role, name }` to `req.user`.
- On failure (expired, tampered), returns 401.

**`adminMiddleware`:**
- Must be chained after `authMiddleware` (which sets `req.user`).
- Checks `req.user.role === 'admin'`.
- Returns 403 if not admin.
- Passes through if admin.

Usage example:
```
router.patch('/equipment/:id/status', authMiddleware, adminMiddleware, handler)
```

### 11.4 Auth Routes

**`POST /api/register`**
- Validates required fields: `name`, `email`, `phone`, `password`.
- Checks if email already exists in DB.
- Hashes password with `bcrypt.genSalt(10)` + `bcrypt.hash()`.
- Creates User row with `role = 'farmer'`.
- Signs a JWT with `{ id, email, role, name }`, expiry `24h`.
- Returns `{ message, token, user }` with HTTP 201.
- Returned `user` object **never includes the password hash**.

**`POST /api/login`**
- Validates `email` and `password` present.
- Fetches user by email.
- Compares password with stored hash using `bcrypt.compare()`.
- Rejects if `role === 'admin'` (farmers must use `/login`, admins must use `/admin/login`).
- Signs JWT, returns token + user object.

**`POST /api/admin/login`**
- Same flow as `/login` but **only** succeeds if `role === 'admin'`.
- Returns 403 if a farmer tries to use this endpoint.

### 11.5 Equipment Routes

**`GET /api/equipment`** *(public — no auth required)*
- Fetches all equipment rows, ordered by `createdAt DESC`.
- Returns all fields including `adminStatus` (frontend uses this to filter what's shown publicly).

**`GET /api/equipment/:id`** *(public)*
- Fetches a single equipment by primary key.
- Returns 404 if not found.

**`POST /api/equipment`** *(requires authMiddleware)*
- Accepts `multipart/form-data` (because it includes image files).
- Multer processes up to **10 photos**, max **10 MB each**.
- Allowed image formats: JPEG, JPG, PNG, WebP, GIF.
- Files saved to `server/uploads/` with unique `timestamp-random.ext` filenames.
- Extracts all equipment fields from `req.body`.
- Parses `attachments` as JSON string (since FormData only allows strings).
- Creates Equipment row with:
  - `available: false` (must be approved by admin first).
  - `adminStatus: 'Inspection Pending'`.
  - `ownerId: req.user.id` (links equipment to the logged-in farmer).
  - `photos: ['/uploads/filename.jpg', ...]` (relative paths served as static files).

**`PATCH /api/equipment/:id/status`** *(requires authMiddleware + adminMiddleware)*
- Admin-only route.
- Accepts `{ adminStatus, adminNote }` in request body.
- Updates the equipment's status and note.
- Automatically sets `available = true` only if `adminStatus` is `'Available'` or `'Approved & Ready'`.
- Otherwise `available = false` (hides from public browse page).

**`DELETE /api/equipment/:id`** *(requires authMiddleware + adminMiddleware)*
- Admin-only.
- Hard-deletes the equipment row from the database.

### 11.6 Data Seeding — `seed.js`

`server/seed.js` is a standalone script run via `npm run seed`. It:

1. Creates the database if it doesn't exist (same logic as `start()`).
2. Syncs Sequelize models.
3. **Seeds the admin user**:
   - Email: `admin@krishiyantra.in`
   - Password: `admin123` (bcrypt-hashed before storing)
   - Role: `admin`
   - Skips if the email already exists.
4. **Seeds 6 equipment rows** (only if the table is empty):
   - Mahindra Tractor 575 DI — Pune — ₹1,200/day
   - John Deere 5310 — Nashik — ₹1,500/day
   - Kubota Harvester DC-93 — Aurangabad — ₹2,800/day (In Use)
   - Shaktiman Rotavator — Nagpur — ₹800/day
   - Honda Power Tiller FJ500 — Kolhapur — ₹600/day
   - Paddy Thresher PT-200 — Pune — ₹900/day

---

## 12. Frontend — React App Deep Dive

### 12.1 Application Entry — `main.jsx`

```
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

Mounts the root `App` component into the `<div id="root">` element in `index.html`. Uses React 19's new root API.

### 12.2 Root Component — `App.jsx`

`App.jsx` is the single most important file in the frontend. It:

**State managed at root level:**

| State | Type | Purpose |
|---|---|---|
| `page` | string | Current page name (routing). Possible values: `'Home'`, `'Equipment'`, `'Booking'`, `'Insurance'`, `'Dashboard'`, `'Admin Dashboard'`, `'Login'`, `'AdminLogin'` |
| `user` | object / null | Currently logged-in user. Initialized from `localStorage` on first render. |
| `selectedEquip` | object / null | Equipment selected for booking; passed to `BookingPage` |
| `bookings` | array | List of all bookings (initialized from `data.js` static sample, new bookings prepended at runtime) |
| `equipmentData` | array | List of all equipment (initialized from `data.js`, overwritten by API response on mount) |
| `toasts` | array | Queue of toast notification objects `{ id, msg, type, removing }` |

**`useEffect` hooks:**

1. **Scroll to top** whenever `page` changes — `window.scrollTo({ top: 0, behavior: 'smooth' })`.
2. **Fetch equipment from API** on mount:
   - Calls `GET /api/equipment`.
   - If response is a non-empty array, replaces `equipmentData` with live DB data.
   - If API fails (server offline), catches the error silently and uses static data from `data.js`.
3. **Access control** whenever `page` or `user` changes:
   - If user is not logged in and tries to access `Dashboard`, `Booking`, `Insurance`, or `Admin Dashboard` → redirects to `Login`.
   - If user is an admin and tries to go to `Dashboard` → redirects to `Admin Dashboard`.

**Toast system:**
- `addToast(msg, type)` — creates a toast `{ id: Date.now(), msg, type }`, auto-removes after 3.5 seconds.
- Removal is smooth: first marks `removing: true` (triggers CSS slideOut animation), then removes from array 350 ms later.

**Rendering:**
- Uses simple conditional rendering (`{page === 'Home' && <HomePage .../>}`).
- All state update functions are passed down as props.

### 12.3 Design System — `styles.jsx`

All UI styling flows from a single file. It exports:

**`C` (colour palette object):**
```
green: '#2D6A4F'       — Primary brand green
greenLight: '#40916C'  — Lighter green (gradients)
greenDark: '#1B4332'   — Darkest green (headings, navbar)
cream: '#FAF3E0'       — Background colour
brown: '#8B5E3C'       — Accent / badge colour
gold: '#C9A97A'        — Accent / navbar highlight
goldLight: '#E8D5B0'   — Lighter gold
white: '#FFFFFF'
dark: '#1A1A2E'        — Near-black
gray: '#6B7280'        — Body text / labels
lightGray: '#E5E7EB'   — Borders / disabled states
red: '#E63946'         — Errors / cancelled status
orange: '#F4845F'      — Warnings / pending status
blue: '#2196F3'        — Info / good condition
purple: '#9C27B0'      — Mechanic dispatched status
```

**`inputS`** — base input/select style object (padding, border, border-radius, font-size).

**`labelS`** — base label style (small, bold, dark green).

**`GlobalStyles`** — a React component that injects a `<style>` tag with:
- CSS reset (`*` box-sizing border-box, zero margins).
- Font families applied to `body`, `h1–h5`, form elements.
- CSS `@keyframes`: `fadeIn`, `slideIn`, `slideOut`, `barGrow`, `float`, `modalIn`, `pulse`.
- Utility classes: `.card-hover`, `.btn-pop`, `.nav-link` (with animated underline).
- Media query breakpoints at 768px for responsive grid collapses.

**`API_URL`** — `'http://localhost:5000/api'` — the base URL for all API calls.

### 12.4 Shared Data — `data.js`

`data.js` is the static data store and constants file. It exports:

- **`EQUIP_NAME_IMAGES`** — maps exact equipment names to stock photo URLs (relative to GitHub Pages base path).
- **`EQUIP_TYPE_IMAGES`** — maps equipment types to fallback images.
- **`getEquipImage(type, name, photos)`** — image resolution priority:
  1. Use first server-uploaded photo if it starts with `/uploads/`.
  2. Fall back to name-based image mapping.
  3. Fall back to type-based image mapping.
  4. Final fallback: Mahindra tractor image.
- **`EQUIP_DESC`** — marketing descriptions for each of the 6 seed equipment items.
- **`ADMIN_STATUSES`** — array of all 8 valid workflow status strings.
- **`LOCATIONS`**, **`TYPES`**, **`CROPS`**, **`FUEL_TYPES`**, **`CONDITIONS`**, **`ATTACHMENTS`** — dropdown option arrays.
- **`EQUIPMENT`** — 6 full static equipment objects (used as fallback when API is unavailable).
- **`initBookings`** — 4 sample booking records shown by default.
- **`SAMPLE_USERS`** — 5 sample farmer profiles used in Admin Dashboard's Users tab.
- **`SAMPLE_CLAIMS`** — 4 sample insurance claims for the Admin's Claims tab.

### 12.5 Navbar — `Navbar.jsx`

The sticky top navigation bar. Features:

- **Gradient background**: `greenDark → green` (135°).
- **Logo**: 🌾 icon + "KrishiYantra" in Playfair Display gold.
- **Conditional navigation links**:
  - Logged-out visitor: `Home`, `Equipment`.
  - Logged-in farmer: `Home`, `Equipment`, `Insurance`, `Dashboard`.
  - Logged-in admin: `Home`, `Admin Dashboard`.
- **Active page highlighting**: Active link is gold-coloured with a subtle gold background.
- **Animated underline**: CSS `nav-link::after` pseudo-element slides in on hover.
- **User display**: Shows "👤 {user.name}" and a **Logout** button when logged in.
- **Mobile menu**: Hidden by default; appears on screens ≤768px. Hamburger button (☰) toggles a dropdown overlay.
- **Logout action**: Clears `localStorage` (`token`, `user`), sets `user` to `null`, navigates to `Home`.

### 12.6 Home Page — `HomePage.jsx`

The public landing page visible to all visitors. Five sections:

**Hero Section:**
- Full-width gradient banner (dark green to light green).
- Animated 🌾 emoji (CSS `float` keyframe — subtle up-down motion).
- H1 headline in Playfair Display, 3rem.
- Subtitle paragraph in light white.
- Radial gradient overlay for depth.

**Statistics Section:**
- Three stat cards overlapping the bottom of the hero (negative top margin, z-index: 2).
- Stats: `146M` Farmers in India | `85%` Lack Equipment Access | `30–50%` Cost Savings.
- Each card has hover lift effect (`card-hover` class).

**How It Works Section:**
- 8-step process grid (4 columns on desktop, 2 on mobile).
- Steps: Register → List Equipment → Search → Book → Pre-Inspect → Use → Return → Pay.
- Each step has a circular numbered badge, an emoji icon, title, and description.

**About KrishiYantra Section:**
- White background section.
- 3 feature cards: "125M+ Farmers Served", "Verified Equipment Only", "Transparent Pricing".

**Contact Us Section:**
- Two-column layout: contact form (left) and contact details (right).
- Form validation: all three fields (name, mobile, message) required.
- On submit: shows success toast, resets form. (No backend implementation — future enhancement.)
- Contact details: email, phone, address.

**Footer:**
- Dark green background.
- KrishiYantra logo + copyright line.

### 12.7 Equipment Page — `EquipmentPage.jsx`

The public equipment browsing experience. Two components:

**`EquipmentPage` (list view):**
- Filter bar (white card, 2px shadow):
  - Text search input (matches equipment name, case-insensitive).
  - Type dropdown (All Types / Tractor / Harvester / etc.).
  - Location dropdown (All Locations / Pune / Nashik / etc.).
  - Price range slider (₹300 – ₹5000/day, step ₹100).
- Filtering logic:
  1. Only shows equipment where `adminStatus` is `'Available'` or `'Approved & Ready'` — hides pending/in-use items from public.
  2. Applies search, type, location, and price filters.
- 3-column grid of equipment cards on desktop (1 column on mobile).
- Each card: photo, name, verified badge, star rating, type badge, condition badge, HP badge, age badge, location, available/booked badge, price per day, Book Now button.
- Clicking a card opens the **EquipmentModal**.
- Clicking "Book Now" on card or modal → checks auth → navigates to Booking page.
- Empty state: magnifying glass icon + "No equipment matches your filters."

**`EquipmentModal` (detail popup):**
- Full-screen overlay (rgba black background).
- Clicking overlay closes modal; inner card stops propagation.
- Modal card: equipment photo (240px height), name, type badge, verified badge, brand badge, star rating, description text.
- 9-cell info grid: Price/Day, Price/Hour, Location, Age, Condition, Engine Hours, HP, Fuel Type, Delivery.
- Attachments row (if any).
- Last serviced date + full village/taluka/district/state address.
- Book Now button (or "currently booked" message if unavailable).
- Animation: `modalIn` keyframe scales from 0.92 to 1.0.

### 12.8 Booking Page — `BookingPage.jsx`

The booking flow for a selected piece of equipment. Two-column layout:

**Left column:**

*Equipment summary card:*
- Equipment photo (160px height).
- Name, star rating, price per day.

*Interactive calendar:*
- Renders a month-by-month calendar grid.
- Previous months are blocked (can't select past dates — buttons disabled with `cursor: not-allowed`).
- Date selection: first click = start date; second click (after start) = end date.
- Selected range highlighted in green; start/end dates are fully green circles.
- Month navigation arrows (◁ ▷) — can't go before current month.
- Selected range text below calendar: "15 Apr 2026 → 18 Apr 2026 (4 days)".

*Booking details form:*
- Pre-filled with logged-in user's name, district, phone.
- Land size input (number, in acres) — required.
- Crop type dropdown (Rice, Wheat, Sugarcane, Cotton, Soybean, Jowar, Bajra, Groundnut).

**Right column (sticky):**

*Price breakdown card:*
- **Rental Fee**: `pricePerDay × days`.
- **Security Deposit**: `pricePerDay × 0.5` (refundable on equipment return).
- **Platform Fee**: `rental × 0.06` (6% platform commission).
- **Total**: sum of the three above.
- All values formatted with Indian locale (₹1,200 → "₹1,200").
- Confirm Booking button → validates inputs → creates booking object → prepends to `bookings` array → shows toast → navigates to Farmer Dashboard.

### 12.9 Farmer Dashboard — `FarmerDashboard.jsx`

The personal hub for logged-in farmers. Three tabs:

**Stat cards (always visible):**
- Active Bookings (Pending + Confirmed + In Use count).
- Completed bookings count.
- Total Equipment Listed (length of `equipmentData`).
- Total Spent (sum of non-cancelled booking totals).
- Trust Score badge (TrustScoreBadge component, visual gauge).

**Tab 1: My Bookings**
- Table of all bookings: Equipment name, Farmer name, Location, Dates, Days, Crop, Status, Total, Actions.
- `StatusBadge` colour-codes each status.
- Cancel button appears for `Pending` or `Confirmed` bookings.
- Cancel action changes status to `'Cancelled'` in local state (no API call — future enhancement).

**Tab 2: My Equipment**
- Lists all equipment in `equipmentData`.
- Each row: photo thumbnail, name, type badge, condition, HP, price/day, admin status, admin note.
- "List New Equipment" button opens an inline form.
- **Add Equipment form**:
  - Equipment name (required).
  - Type (ENUM dropdown).
  - Brand name.
  - Year of manufacture.
  - Condition (Excellent / Good / Fair / Poor).
  - Engine hours.
  - Fuel type.
  - Horsepower.
  - Attachments (multi-select checkboxes).
  - Price per hour and price per day (required).
  - Location.
  - Delivery available toggle.
  - Photo upload (multi-file input).
  - Submit sends `multipart/form-data` `POST /api/equipment` with JWT.
  - On API success: adds returned equipment object to state.
  - On API failure: creates a local-only equipment object with `adminStatus: 'Inspection Pending'`.

**Tab 3: Damage Claims**
- "File a Claim" button opens a form.
- Claim form: equipment name, description, photo evidence placeholder.
- Submit shows success toast (no backend persistence — UI demonstration).

### 12.10 Admin Dashboard — `AdminDashboard.jsx`

The administration control panel — visible only to users with `role = 'admin'`. Four tabs:

**Stat cards:**
- Total Users | Active Listings | Claims This Month | Suspended Users.

**Tab 1: All Users**
- Table of all users (from `SAMPLE_USERS` static data).
- Each row: name, email, phone, district, land size, farmer type, trust score badge, status, join date, damage history count.
- Expandable row: click user to see full damage history (date, type, equipment, description).
- Suspend / Reinstate button toggles `status` between `'Active'` and `'Suspended'`.

**Tab 2: Equipment**
- Status filter dropdown (All / by each status value).
- Table of all equipment (from live `equipmentData` state).
- Each row: photo thumbnail, name, type, condition, location, HP, price/day, current admin status, admin note.
- "Change Status" link opens an inline edit form:
  - Dropdown to select new status (from `ADMIN_STATUSES` array).
  - Textarea for admin note.
  - Confirm button calls `PATCH /api/equipment/:id/status` with JWT.
  - On API success: updates `equipmentData` state with returned object.
  - On API failure: updates state locally (offline-friendly).
- Delete button calls `DELETE /api/equipment/:id` with JWT.

**Tab 3: Insurance Claims**
- Table of `SAMPLE_CLAIMS`.
- Shows: claimant name, equipment, date, damage type, description, photo count, status, payout amount.
- Status colour-coded with `StatusBadge`.

**Tab 4: Bookings**
- Status filter.
- Table of all bookings.
- Each row: equipment, farmer, location, dates, days, crop, total, status.

### 12.11 Insurance Page — `InsurancePage.jsx`

A detailed insurance and risk-management page.

**Plan Cards (3 tiers):**

| Plan | Monthly Premium | Max Coverage | Target |
|---|---|---|---|
| Basic 🌿 | ₹1,000 | ₹50,000 | Occasional borrowers |
| Standard 🛡️ | ₹3,000 | ₹2,00,000 | Regular borrowers |
| Premium 👑 | ₹5,000 | ₹5,00,000 | Frequent/large farmers |

All plans include: damage assessment, 24/7 claim support.

**Dynamic Premium Calculator:**
- Formula: `Base Price × Land Factor × Usage Factor × Risk Multiplier`
- **Land Factor**: ≤2 acres → 0.8× | 2–5 acres → 1.0× | 5–10 acres → 1.2× | >10 acres → 1.5×
- **Usage Factor**: Low → 0.8× | Medium → 1.0× | High → 1.3× | Very High → 1.6×
- **Risk Multiplier**: 0 incidents → 1.0× | 1 incident → 1.15× | 2 → 1.4× | 3+ → 1.8×
- Live recalculation as any input changes.
- Visual breakdown of each factor.

**Trust Score Display (for logged-in users):**
- Circular gauge showing score out of 100.
- Score band: 90–100 = Excellent (green) | 70–89 = Good (blue) | 50–69 = Fair (orange) | <50 = High-Risk (red).

**Misuse Rules Panel:**
- 1st damage incident → logged in record.
- 2nd incident within 6 months → 40% premium increase.
- 3rd incident within 12 months → account suspended for admin review.

**Claim Process (6-step flow):**
Owner files claim → Upload evidence → Mechanic assigned → Platform review → Claim approved → Fund pays out.

### 12.12 Login Page — `LoginPage.jsx`

A combined login and registration form. Two modes, toggled by tab buttons:

**Login mode:**
- Email input.
- Password input.
- Calls `POST /api/login`, stores token + user in `localStorage`, sets `user` state, navigates to `Dashboard`.

**Register mode:**
- Full name, email, phone, password (all required).
- Land size (optional), farmer type (required dropdown).
- District and state (optional).
- Calls `POST /api/register`, same token/user handling as login.

**Error handling:**
- Field validation before API call (shows error toast).
- API error responses shown as error toasts.
- Network failures: "Server unavailable. Please try again." toast.
- Loading state: button text changes to "Please wait..." and becomes disabled.

### 12.13 Admin Login Page — `AdminLoginPage.jsx`

A separate, identical-looking form specifically for admins. Calls `POST /api/admin/login`. On success, sets `user` (with `role: 'admin'`), navigates to `Admin Dashboard`.

### 12.14 Utility Components — `Utilities.jsx`

Reusable presentational components:

**`Stars({ rating })`:**
- Renders filled stars (★), a half-star (⬪) if remainder ≥ 0.3, and empty stars (☆).
- Shows numeric rating next to stars in gray.

**`Badge({ text, color })`:**
- Pill-shaped label with 22% opacity background of the given colour.
- Font: 11px, bold, letter-spaced.
- Used everywhere: equipment types, conditions, status labels.

**`StatusBadge({ status })`:**
- Maps each booking/equipment status string to a specific colour.
- Renders a `Badge` with the appropriate colour.
- Covers all 14 status values including booking and equipment workflow states.

**`Toast({ toasts, removeToast })`:**
- Fixed position (top: 20px, right: 20px, z-index: 9999).
- Each toast slides in from the right (`slideIn` keyframe) and slides out (`slideOut`) when removed.
- Success = green background ✅ | Error = red ❌ | Info = brown ℹ️.
- Manual close ×, or auto-dismissed after 3.5 seconds.

**`TrustScoreBadge({ score })`:**
- Visual circular gauge using CSS `conic-gradient`.
- Outer ring fills proportionally to score (out of 100 → `score × 3.6` degrees).
- Inner circle shows numeric score.
- Colour changes dynamically based on score band.

---

## 13. Authentication & Security Flow

### Registration Flow
```
Client fills form
     │
     ▼
Frontend validation (non-empty required fields)
     │
     ▼
POST /api/register { name, email, phone, password, ... }
     │
     ▼
Server: Check email uniqueness in DB
     │ (duplicate) → 400 error
     │ (unique)
     ▼
bcrypt.genSalt(10) → bcrypt.hash(password, salt)
     │
     ▼
User.create({ ..., password: hashedPassword, role: 'farmer' })
     │
     ▼
jwt.sign({ id, email, role, name }, JWT_SECRET, { expiresIn: '24h' })
     │
     ▼
Response: { token, user: { id, name, email, ... } }
     │
     ▼
Client: localStorage.setItem('token', token)
         localStorage.setItem('user', JSON.stringify(user))
         setUser(user) — triggers re-render and access unlock
```

### Login Flow (similar; skips creation and hash check instead)

### Token Usage on Protected Routes
```
Client has token in localStorage
     │
     ▼
fetch('/api/equipment', {
  headers: { Authorization: `Bearer ${token}` }
})
     │
     ▼
authMiddleware: extract token from Authorization header
     │
     ▼
jwt.verify(token, JWT_SECRET)
     │ (invalid/expired) → 401
     │ (valid)
     ▼
req.user = decoded payload
next()
     │
     ▼
Route handler executes with req.user available
```

### Security Measures
- Passwords are **never stored in plain text**; always bcrypt-hashed with a salt factor of 10.
- JWTs are signed with a secret (`JWT_SECRET` from `.env`) — tampered tokens are rejected.
- Admin routes are double-protected: `authMiddleware` (valid JWT) **and** `adminMiddleware` (role check).
- File uploads are type-filtered (images only) and size-limited (10 MB).
- CORS allows all origins in development — should be restricted to the frontend domain in production.

---

## 14. Equipment Approval Workflow

Every piece of equipment listed by a farmer goes through a mandatory admin review before it can be rented. This prevents broken, dangerous, or fraudulently described equipment from reaching farmers.

```
Farmer lists equipment
        │
        ▼
adminStatus = "Inspection Pending"
available = false
(NOT visible on public Equipment page)
        │
        ▼ Admin action
adminStatus = "Mechanic Dispatched"
        │ (mechanic goes to owner's location)
        ▼ Admin action
adminStatus = "Approved & Ready"
available = true
(NOW visible on Equipment page — can be booked)
        │
        ▼ (booking confirmed)
adminStatus = "In Use"
available = false
(Hidden from Equipment page during rental)
        │
        ▼ (farmer returns equipment)
adminStatus = "Return Inspection Pending"
        │
        ▼ Admin action
adminStatus = "Mechanic Dispatched for Return Check"
        │ (mechanic inspects returned machine)
        ▼ Admin action (if no damage)
adminStatus = "Returned & Cleared"
available = true
(Back on Equipment page — ready for next booking)
```

If damage is found during return inspection, the Admin can add a detailed note and leave the equipment in a non-available status while the insurance claim is processed.

---

## 15. Booking & Pricing System

### Calendar Implementation

The booking calendar is built entirely from scratch (no third-party date-picker library):
- `daysInMonth` computed using `new Date(year, month + 1, 0).getDate()`.
- `firstDay` = day of week of the 1st of the month (0=Sunday).
- Empty `<span>` elements push the first day to the correct column.
- Past dates are computed by comparing to today's date and disabled.
- Date range selection: first click sets `startDate`, second click (must be after start) sets `endDate`.
- Day cells have conditional styling:
  - Range cells: semi-transparent green rectangle.
  - Start/end cells: solid green circle.
  - Past cells: light gray, disabled.

### Pricing Formula

```
Number of Days  = (endDate - startDate) / 86400000 + 1   (minimum 1)
Rental Fee      = pricePerDay × days
Security Deposit = pricePerDay × 0.5  (refundable)
Platform Fee    = Rental Fee × 0.06   (6% commission)
────────────────────────────────────────
Total Amount    = Rental Fee + Security Deposit + Platform Fee
```

**Example** (Mahindra Tractor 575 DI, 3 days):
```
Rental Fee      = ₹1,200 × 3 = ₹3,600
Security Deposit = ₹1,200 × 0.5 = ₹600
Platform Fee    = ₹3,600 × 0.06 = ₹216
────────────────
Total           = ₹4,416
```

### Booking Data Structure
```javascript
{
  id: Date.now(),              // Unique ID (timestamp)
  equipment: 'Mahindra Tractor 575 DI',
  farmer: 'Rajesh Patil',
  location: 'Pune',
  dates: 'Apr 15 – Apr 17',
  days: 3,
  total: 4416,
  status: 'Pending',           // Pending → Confirmed → In Use → Completed
  crop: 'Wheat',
  landSize: 5
}
```

Bookings are currently stored **in React state only** (not persisted to the database). Database persistence of bookings is listed as a future enhancement.

---

## 16. Trust Score System

The **Trust Score** is a 0–100 integer assigned to every user at registration (defaulting to 100). It is displayed:
- In the Farmer Dashboard header.
- In the Insurance page.
- In the Admin Dashboard's user table.

### Score Bands

| Score Range | Label | Colour |
|---|---|---|
| 90–100 | Excellent | Green |
| 70–89 | Good | Blue |
| 50–69 | Fair | Orange |
| <50 | High-Risk | Red |

### Impact on Insurance

The trust score drives the **Risk Multiplier** in the dynamic premium calculator:
- 0 damage incidents → multiplier = 1.0×
- 1 incident → 1.15× (15% premium increase)
- 2 incidents → 1.4× (40% premium increase)
- 3+ incidents → 1.8× (80% premium increase)

### Account Suspension Rules (displayed in Insurance page)
1. First damage incident → logged to user's damage history.
2. Second incident within 6 months → premium increases 40%.
3. Third incident within 12 months → account suspended; admin review required.

---

## 17. Insurance & Protection System

### Why Insurance?

Agricultural equipment is expensive. A combine harvester costs ₹25–50 lakh. Without insurance, a damage dispute between a borrower and owner can escalate into a village-level conflict. The insurance system:
- Protects equipment owners from financial losses due to borrower misuse.
- Gives borrowers confidence that they won't be falsely blamed for pre-existing damage (since equipment is inspected before and after rental).
- Creates a fair, data-driven claims process.

### Three-Tier Subscription Plans

| Feature | Basic (₹1,000/mo) | Standard (₹3,000/mo) | Premium (₹5,000/mo) |
|---|---|---|---|
| Max coverage | ₹50,000 | ₹2,00,000 | ₹5,00,000 |
| Damage assessment | ✅ | ✅ | ✅ |
| 24/7 claim support | ✅ | ✅ | ✅ |
| Target user | Occasional borrowers | Regular borrowers | Frequent / large farmers |

### Dynamic Premium Calculator (full formula)

```
Premium = BasePlanPrice × LandFactor × UsageFactor × RiskMultiplier
```

All four factors update live in the UI as the user adjusts sliders/dropdowns, giving an instant premium estimate.

### Claim Lifecycle (tracked in Admin Dashboard)

| Status | Meaning |
|---|---|
| Pending | Claim filed, not yet reviewed |
| Under Review | Admin is investigating |
| Approved | Claim accepted; payout amount set |
| Settled | Payment made to owner |
| Rejected | Claim denied (insufficient evidence, misuse ruled out) |

---

## 18. Image Upload System

Equipment owners can upload up to **10 photos** per equipment listing.

### Technical Flow

1. User selects image files via `<input type="file" multiple accept="image/*">` in Farmer Dashboard.
2. Files stored in a `photoFiles` React state array.
3. On form submit, files are appended to a `FormData` object under the key `photos`.
4. The `FormData` is sent with `fetch()` as a `POST /api/equipment` request with `Authorization` header (no explicit `Content-Type` — the browser sets `multipart/form-data` automatically with the correct boundary).
5. **Multer** on the server intercepts the multipart body:
   - Validates file extension and MIME type (jpeg, jpg, png, webp, gif only).
   - Rejects files over 10 MB.
   - Saves each file to `server/uploads/` with a filename like `1714123456789-823456789.jpg`.
6. The server returns photo paths as `['/uploads/filename.jpg', ...]`.
7. These paths are stored in the `photos` JSON column of the `equipment` table.
8. On the frontend, `getEquipImage()` checks if a photo starts with `/uploads/` and prefixes `http://localhost:5000` to form a complete image URL.

### Static File Serving

```javascript
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
```

The `/uploads` route in Express serves files from the `server/uploads/` directory directly, so any image at `/uploads/filename.jpg` is accessible at `http://localhost:5000/uploads/filename.jpg`.

---

## 19. State Management Approach

The application uses **React's built-in state system only** — no Redux, Zustand, Context API, or other external state manager.

### Why No External State Manager?

The application's data flow is relatively simple:
- There is one root of truth: `App.jsx`.
- All shared state lives in `App.jsx` and is passed down as props.
- Components that need to update state receive setter functions as props (`setBookings`, `setEquipmentData`, etc.).

### State Distribution

| State | Owned by | Passed to |
|---|---|---|
| `page` | `App` | `Navbar` (to highlight active link), all page components |
| `user` | `App` | All page components; `Navbar` |
| `equipmentData` | `App` | `EquipmentPage`, `FarmerDashboard`, `AdminDashboard` |
| `bookings` | `App` | `BookingPage`, `FarmerDashboard`, `AdminDashboard` |
| `selectedEquip` | `App` | `BookingPage` |
| `toasts` | `App` | `Toast` (Utilities) |
| Form states | Each page component | Local only |
| Filter states | `EquipmentPage` | Local only |
| Calendar state | `BookingPage` | Local only |

### LocalStorage Persistence

Two items are persisted across browser sessions:
- `localStorage.token` — JWT string (used in Authorization headers).
- `localStorage.user` — JSON-stringified user object (used to restore session on page reload).

On `App.jsx` mount, `user` state initializes from `localStorage.getItem('user')`.

---

## 20. UI/UX Design Decisions

### No External UI Library

All styles are hand-crafted using inline React styles and the `styles.jsx` design token file. This makes styles explicit, avoids CSS class name collisions, and eliminates a large external dependency (e.g., Material UI adds ~300 KB to bundle size).

### Animation Strategy

All animations are defined in CSS `@keyframes` inside the `GlobalStyles` component and applied as className attributes:
- `fadeIn` — most page sections and cards appear with a slight upward drift.
- `slideIn/slideOut` — toast notifications.
- `modalIn` — equipment detail popup (scales from 92% to 100%).
- `float` — hero emoji gentle hover.
- `pulse` — loading states.

Cards use the `.card-hover` class which adds `translateY(-6px)` on hover with a shadow deepening effect — gives a physical, "liftable" feeling to clickable cards.

### Staggered Animations

Cards in grids are animated with increasing delays (e.g., `animation: fadeIn .5s ease ${i * .08}s both`), so they appear to cascade in from left to right as the page loads.

### Typography Scale

- Page titles (H2): 2–2.2rem, Playfair Display.
- Card headings (H3/H4): 1rem–1.4rem, Playfair Display.
- Body text: 13–16px, Lato.
- Small labels: 10–12px, Lato.
- Large stat numbers: 24–32px, Lato Bold 800 weight.

### Color Meaning

Every colour has a semantic meaning used consistently throughout:
- **Green** → Available / Success / Positive.
- **Red** → Cancelled / Error / Danger / Booked.
- **Orange** → Pending / Warning.
- **Blue** → In Use / Good condition / Info.
- **Purple** → Mechanic Dispatched (intermediate workflow step).
- **Gray** → Completed / Cleared / Neutral.
- **Gold** → Brand accent / Active nav link.

---

## 21. Responsive Design

The application is mobile-friendly through CSS media queries defined in `GlobalStyles` at the 768px breakpoint:

| CSS Class | Desktop | Mobile (≤768px) |
|---|---|---|
| `.resp-grid` | 2 columns | 1 column |
| `.stat-grid` | 3 columns | 1 column |
| `.step-grid` | 4 columns | 2 columns |
| `.dash-grid` | 4 columns | 1 column |
| `.about-grid` | 3 columns | 1 column |
| `.filter-bar` | horizontal flex | vertical flex (stacked) |
| `.nav-links` | visible | hidden |
| `.mobile-menu` | hidden | visible (hamburger) |
| `.hero-title` | 3rem | 2rem |

The hamburger menu reveals a floating dropdown with all navigation links and login/logout options.

---

## 22. Deployment

### Frontend — GitHub Pages

The frontend is deployed as a **static site** to GitHub Pages.

**Configuration:**
- `vite.config.ts` sets `base: "/Agricultural-Equipment-Sharing-Platform/"` — all asset paths are relative to this subpath.
- `data.js` uses `const BASE = '/Agricultural-Equipment-Sharing-Platform'` for all static image references.
- `package.json` (root) has `gh-pages` as a dependency.
- `my-app/package.json` scripts:
  - `"predeploy": "npm run build"` — builds the Vite app first.
  - `"deploy": "gh-pages -d dist"` — pushes the `dist/` folder to the `gh-pages` branch.
- `my-app/package.json` `homepage` field: `"https://ShreehariMB28.github.io/Agricultural-Equipment-Sharing-Platform/"`.

**Deploy command:**
```bash
cd my-app && npm run deploy
```

**Live URL:** `https://ShreehariMB28.github.io/Agricultural-Equipment-Sharing-Platform/`

### Backend — Local Only (as of current version)

The Express server runs locally on `http://localhost:5000`. The frontend makes API calls to this address. In production, the backend would need to be deployed to a cloud provider (e.g., Railway, Render, Heroku, AWS EC2) and the `API_URL` in `styles.jsx` would need to be updated.

---

## 23. Environment Variables

Create a `.env` file in the `server/` directory with the following keys:

| Variable | Default | Description |
|---|---|---|
| `DB_HOST` | `localhost` | MySQL server hostname |
| `DB_USER` | `root` | MySQL username |
| `DB_PASS` | `''` | MySQL password |
| `DB_NAME` | `krishiyantra` | Database name (auto-created if missing) |
| `JWT_SECRET` | *(required)* | Secret key for signing/verifying JWTs — must be a long random string in production |
| `PORT` | `5000` | Port number for Express server |

**Example `.env`:**
```
DB_HOST=localhost
DB_USER=root
DB_PASS=mypassword
DB_NAME=krishiyantra
JWT_SECRET=my_super_secret_jwt_key_change_in_production
PORT=5000
```

⚠️ **Never commit `.env` to version control.** It is excluded via `.gitignore`.

---

## 24. Local Development Setup

### Prerequisites

| Tool | Required Version | Purpose |
|---|---|---|
| Node.js | ≥ 18.x | Runtime for both frontend and backend |
| npm | ≥ 9.x | Package manager |
| MySQL | ≥ 8.x | Database server |
| Git | Any recent | Version control |

### Step-by-Step

```bash
# 1. Clone the repository
git clone https://github.com/ShreehariMB28/Agricultural-Equipment-Sharing-Platform.git
cd Agricultural-Equipment-Sharing-Platform

# 2. Set up the backend
cd server
npm install
# Create a .env file with your DB credentials and JWT secret (see Section 23)

# 3. Seed the database (creates DB, tables, admin user, and 6 sample equipment)
npm run seed
# Output should show:
# ✅ Admin user seeded successfully!
#    Email: admin@krishiyantra.in
#    Password: admin123
# ✅ 6 equipment items seeded successfully!

# 4. Start the backend server
npm start
# Output: ✅ Database connected & synced
#         🚀 KrishiYantra API running on http://localhost:5000

# 5. In a new terminal, set up the frontend
cd ../my-app
npm install

# 6. Start the frontend development server
npm run dev
# Output: VITE v7.x.x  ready in X ms
#         ➜  Local:   http://localhost:5173/Agricultural-Equipment-Sharing-Platform/

# 7. Open the app in your browser:
# http://localhost:5173/Agricultural-Equipment-Sharing-Platform/
```

### Default Admin Credentials
- **Email**: `admin@krishiyantra.in`
- **Password**: `admin123`
- Login via the **Admin** button on the Navbar → Admin Login page.

---

## 25. Seed Data — Default Users & Equipment

### Seeded Admin User

| Field | Value |
|---|---|
| Name | KrishiYantra Admin |
| Email | admin@krishiyantra.in |
| Password | admin123 (bcrypt-hashed in DB) |
| Role | admin |
| Trust Score | 100 |

### Seeded Equipment (6 items)

| # | Name | Type | Brand | Location | ₹/Day | Status |
|---|---|---|---|---|---|---|
| 1 | Mahindra Tractor 575 DI | Tractor | Mahindra | Pune, Khed | 1,200 | Available |
| 2 | John Deere 5310 | Tractor | John Deere | Nashik, Sinnar | 1,500 | Available |
| 3 | Kubota Harvester DC-93 | Harvester | Kubota | Aurangabad, Kannad | 2,800 | In Use |
| 4 | Shaktiman Rotavator | Rotavator | Shaktiman | Nagpur, Hingna | 800 | Approved & Ready |
| 5 | Honda Power Tiller FJ500 | Tiller | Honda | Kolhapur, Panhala | 600 | Available |
| 6 | Paddy Thresher PT-200 | Thresher | Local | Pune, Baramati | 900 | Available |

### Static Sample Data (in `data.js`, not in DB)

**5 sample users** (displayed in Admin Dashboard Users tab):
- Rajesh Patil (Borrower, Pune, trust: 92, Active)
- Sunil Jadhav (Both, Aurangabad, trust: 78, Active, 1 damage incident)
- Anita Deshmukh (Borrower, Kolhapur, trust: 100, Active)
- Manoj Shinde (Lender, Pune, trust: 45, Suspended, 3 damage incidents)
- Priya Kulkarni (Both, Nashik, trust: 65, Active, 1 minor damage)

**4 sample bookings** (displayed in dashboards):
- Mahindra Tractor — Rajesh Patil — Mar 5–8 — Confirmed
- Kubota Harvester — Sunil Jadhav — Mar 10–12 — In Use
- Power Tiller — Anita Deshmukh — Feb 20–22 — Completed
- Paddy Thresher — Manoj Shinde — Mar 15–17 — Pending

**4 sample insurance claims** (displayed in Admin Claims tab):
- Rotavator blade damage — ₹8,500 — Approved
- Tractor engine failure — ₹45,000 — Settled
- Seed drill crack — ₹3,200 — Under Review
- Power tiller handle bent — ₹5,000 — Pending

---

## 26. Business Model

### Revenue Streams

**1. Platform Fee (Currently Implemented)**
- 6% of every rental transaction.
- Auto-calculated and displayed at booking time.
- Example: ₹3,600 rental → ₹216 platform fee.

**2. Insurance Subscriptions (Implemented as UI, payment TBD)**
- Monthly recurring subscription per user:
  - Basic: ₹1,000/month
  - Standard: ₹3,000/month
  - Premium: ₹5,000/month
- Dynamic pricing based on risk profile.

**3. Future Revenue (Planned)**
- Equipment owner subscriptions (priority listing, analytics dashboard).
- Premium farmer subscriptions (lower platform fees, priority booking).
- GPS tracking services (₹X/month per equipment).
- Insurance fund interest income.
- Advertising from agricultural input companies (fertilizer, seed brands).

### Three-Phase Business Growth

**Phase 1 — Trust Building (0–12 months)**
- Free registration for all users.
- Low platform fee (2–3%) to attract early adopters.
- Focus on building verified equipment inventory.
- Partnerships with agricultural cooperatives (mandals) for outreach.

**Phase 2 — Growth (12–36 months)**
- Standard 6% platform fee.
- Introduce equipment owner subscription plans.
- Launch insurance product actively.
- Expand beyond Maharashtra to other states.

**Phase 3 — Maturity (36+ months)**
- Tiered subscription plans for power users.
- Insurance fund fully operational.
- Mobile app (Android, iOS).
- Government partnership integration (PM-KISAN beneficiary database cross-reference).
- Full payment gateway integration (UPI, NEFT, credit/debit cards).

### Cost Structure
- **Technology**: Cloud hosting, domain, SSL certificates, CDN for image delivery.
- **Operations**: Admin team salaries, mechanic network coordination.
- **Marketing**: Agricultural mela advertisements, radio campaigns in rural areas.
- **Insurance Fund**: Reserve capital to cover claims pending premium collection.

---

## 27. Expected Real-World Impact

### For Farmers (Borrowers)

| Metric | Without Platform | With KrishiYantra |
|---|---|---|
| Equipment access | Limited to local informal market | Verified equipment across the district |
| Rental cost | Informal/exploitative pricing | Transparent, fixed pricing |
| Booking confidence | Risk of double-booking | Calendar-based slot guarantee |
| Equipment condition | Unknown; often disputed | Pre-inspected and certified |
| Cost savings | — | 30–50% reduction in equipment costs |

### For Equipment Owners (Lenders)

| Metric | Without Platform | With KrishiYantra |
|---|---|---|
| Equipment utilization | 30–40% (idle 60–70%) | 60–80% (platform finds renters) |
| Annual rental income | ₹20,000–50,000 informal | ₹50,000–2,00,000 digital + insured |
| Payment security | Cash; risk of non-payment | Digital record; platform mediates |
| Damage protection | None | Insurance fund covers repair |

### Social & National Impact

- Reduces rural disputes over equipment (a major source of village-level conflict).
- Promotes digital literacy among farmers (smartphone-based booking).
- Supports the Government of India's **Digital India** and **PM-KISAN** initiatives.
- Reduces food wastage caused by delayed harvests due to equipment unavailability.
- Democratizes access to modern mechanization — what was once available only to large landowners becomes accessible to 0.5-acre smallholders.

---

## 28. Feasibility Analysis

### Technical Feasibility ✅

- All technologies (React, Node.js, Express, MySQL, Sequelize) are mature, widely-used, open-source frameworks with large communities and long-term support.
- The application has been built and runs successfully in a local development environment.
- The architecture is simple enough for a small team to maintain.
- Sequelize's `alter: true` sync makes schema changes non-destructive.

### Economic Feasibility ✅

- **Development cost**: Minimal for MVP — open-source stack, no licensing fees.
- **Hosting cost**: A basic cloud server (e.g., AWS t3.small) costs ~₹1,500/month. MySQL on RDS ~₹2,000/month. GitHub Pages is free.
- **Break-even**: At 6% platform fee, the platform reaches break-even at ~₹500,000 in monthly transaction value (roughly 400 bookings at ₹1,200 average).

### Operational Feasibility ✅

- Web interface is straightforward enough for users with basic smartphone literacy.
- Admin panel requires no technical knowledge — pure point-and-click status management.
- Insurance claims follow a structured step-by-step process visible to all parties.
- The mechanic dispatch system can be managed via WhatsApp groups initially before a formal app.

### Social Feasibility ✅

- India has 750+ million active internet users (2024), and smartphone penetration in rural areas is growing rapidly.
- Government subsidy schemes (PM-KISAN) have familiarized rural populations with digital platforms.
- Agricultural cooperatives (PACs, FPOs) can serve as onboarding partners.

---

## 29. Future Enhancements

These features are designed and planned but not yet implemented:

| Enhancement | Description |
|---|---|
| **Database-backed bookings** | Currently bookings exist only in React state; persist to a `bookings` MySQL table |
| **Payment gateway** | Integrate Razorpay / PayU / UPI for real money transactions |
| **GPS tracking** | Integrate GPS device data to track equipment location in real time |
| **Mobile app** | React Native or Flutter version for Android/iOS |
| **AI damage detection** | Use computer vision on uploaded photos to classify damage severity automatically |
| **Multi-state expansion** | Add more location options beyond Maharashtra |
| **Push notifications** | Browser/app push notifications for booking confirmations and status changes |
| **Rating & review system** | Allow borrowers to rate equipment post-rental; owners to rate borrowers |
| **Advanced analytics** | Revenue graphs, utilization heatmaps, district-wise demand analysis |
| **SMS integration** | Send booking confirmations via SMS for users without internet |
| **Multilingual support** | Marathi, Hindi, and other regional language UI |
| **Equipment depreciation calculator** | Help owners set fair prices based on age, hours, and market data |
| **FPO/Cooperative accounts** | Group accounts for Farmer Producer Organizations to pool equipment |
| **Government integration** | Verify farmer identity via Aadhaar or PM-KISAN beneficiary database |
| **Insurance fund dashboard** | Real-time reserve capital tracking and actuarial reporting |

---

## 30. Known Limitations

| Limitation | Impact | Mitigation |
|---|---|---|
| Bookings not persisted to DB | Bookings reset on server restart | Planned database-backed bookings table |
| No real payment | Platform fee computed but not collected | Razorpay integration planned |
| API URL hardcoded to localhost | Frontend on GitHub Pages cannot call local backend | Need backend cloud deployment + env-based API URL |
| No token refresh | JWT expires in 24h; user must re-login | Refresh token system planned |
| CORS allows all origins | Security risk in production | Restrict CORS to frontend domain in prod |
| Admin seeded only, not self-registerable | Cannot have multiple admins without DB access | Admin creation UI planned for super-admin role |
| No email verification | Fake accounts can be created | OTP/email verification planned |
| No password reset | Forgotten password requires DB intervention | Forgot password + email reset flow planned |
| Damage claims UI only | No backend persistence of claims | Planned `claims` table in MySQL |
| Equipment images stored on local disk | Not suitable for production (no CDN, not scalable) | Plan to integrate AWS S3 or Cloudinary |
| No booking conflict prevention at DB level | Multiple users could simultaneously book the same slot | Needs date-range overlap query in DB |

---

## 31. Academic Context

**Project Type:** Major Project (Mini Project Report 1 — MPR1)

**Academic Programme:** Bachelor of Engineering (B.E.) — Computer Engineering

**Semester:** Semester IV (January – April 2026)

**Subject:** Database Management Systems (DBMS)

**Key DBMS Concepts Demonstrated:**

| Concept | Implementation |
|---|---|
| Relational Database Design | `users` and `equipment` tables with foreign key relationship (`ownerId`) |
| Entity-Relationship Mapping | Sequelize models define entities; Sequelize handles the ER-to-table mapping |
| Normalization | Separate tables for users and equipment; no redundant data duplication |
| Constraints | NOT NULL, UNIQUE, ENUM, DEFAULT, AUTO_INCREMENT constraints in model definitions |
| ORM Queries | `findAll`, `findOne`, `findByPk`, `create`, `bulkCreate`, `save`, `destroy` |
| Schema Migration | `sequelize.sync({ alter: true })` applies schema changes without data loss |
| Database Security | Password hashing (bcrypt), JWT auth, parameterized ORM queries (no raw SQL injection risk) |
| CRUD Operations | Full Create, Read, Update, Delete on both user and equipment entities |
| Transactions (conceptual) | Booking creation atomically records all booking details |
| Role-Based Access | Different database query sets exposed per user role |

---

*This documentation was generated for the KrishiYantra — Agricultural Equipment Sharing Platform project.*
*© 2026 KrishiYantra — Empowering Indian Agriculture. Fair. Transparent. Accessible.*
