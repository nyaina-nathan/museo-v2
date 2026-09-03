# Museo

A vintage football jersey gallery presented as a curated museum exhibition. Museo treats every jersey as an artifact — each piece is framed, catalogued, and displayed with gallery-grade presentation, backed by a full e-commerce admin for managing the collection.

**Brand:** Museo 2026 — Kenyan Copper & White · Created by Harivelo Rakotoasimbola

## Brand Snapshot

| Token | Value |
| --- | --- |
| Primary color | Kenyan Copper `#781D0A` |
| Background | White `#FFFFFF` |
| Display typeface | Museo Moderno (headlines) |
| Body typeface | Hanken Grotesk (body/UI) |
| Signature element | Scalloped stamp border on all major cards |

The aesthetic is museum-first: art/curation language ("collection", "archive", "piece") over commerce clichés, generous negative space, and no dark mode — the light copper-on-white theme is foundational. Full rules live in [`DESIGN.md`](./DESIGN.md).

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router) · React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Database | PostgreSQL via [Prisma 7](https://www.prisma.io) (driver adapter `@prisma/adapter-pg`) |
| Auth | JWT sessions ([jose](https://github.com/panva/jose)) in HttpOnly cookies · bcrypt password hashing |
| Media | [ImageKit](https://imagekit.io) (signed browser uploads, CDN delivery) |
| Linting | ESLint 9 + `eslint-config-next` |

## Getting Started

### Prerequisites

- Node.js (LTS) and npm
- A PostgreSQL database
- An [ImageKit](https://imagekit.io) account (for jersey image uploads)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Then fill in the values (see [Environment Variables](#environment-variables)):

- `DATABASE_URL` — your PostgreSQL connection string
- `JWT_SECRET` — a strong secret used to sign session cookies
- ImageKit URL endpoint, public key, and private key

### 3. Set up the database

Generate the Prisma client and push the schema (`prisma/schema.prisma`) to your database:

```bash
npx prisma generate
npx prisma db push
```

> Optionally, `museo_backup.sql` at the repo root contains a pre-built database dump, and `docs/db/` holds the incremental SQL migration scripts (`V1_table_init.sql`, `V2_image_primary.sql`) if you prefer to seed from those.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the root route redirects to `/home`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
├── app/
│   ├── (client)/            # Public gallery pages
│   │   ├── home/            # Homepage
│   │   ├── collection/      # Collection grid + jersey detail ([collectionId])
│   │   ├── about/           # About us
│   │   └── faq/             # FAQ
│   ├── admin/               # Admin dashboard (session required)
│   │   └── jerseys/         # Jersey management + image handling
│   ├── login/               # Login page
│   └── api/                 # REST API route handlers
├── components/
│   ├── client/              # Hero, Header, Footer, JerseyCard, JerseyFilters, FAQAccordion…
│   └── ui/                  # Shared UI primitives (Button)
├── services/                # Business logic (jersey.service, user.service)
├── validators/              # Request validation for API routes
├── libs/                    # prisma, jwt/session helpers, api-handler, ImageKit client
├── hooks/                   # useImageKitUpload, useDebouncedValue
├── types/                   # Shared TypeScript types
├── prisma/                  # schema.prisma + generated client
├── docs/                    # OpenAPI spec, brand docs, SQL migrations
├── proxy.ts                 # Edge middleware: session enforcement
└── DESIGN.md                # Full brand & design system guide
```

## Features

### Public gallery

- **Homepage** with hero section, featured selection, "why us", and social links
- **Collection** grid with filtering (filters are debounced) and jersey detail pages
- **About** and **FAQ** pages with an accordion component
- All imagery served and optimized through ImageKit

### Admin dashboard

- Session-gated jersey management at `/admin`
- Create, edit, and browse jerseys in the archive
- Upload multiple images per jersey via signed ImageKit uploads
- Choose the primary image for each jersey

### Authentication & security

- Register / login / logout endpoints with bcrypt-hashed passwords
- JWT session stored in an HttpOnly cookie, verified with `jose`
- [`proxy.ts`](./proxy.ts) middleware enforces:
  - `/admin/*` — requires a valid session cookie
  - `/api/*` — all non-`GET` requests require a valid session (login endpoint exempt)

## API Overview

The REST API lives under `app/api/`:

| Route | Methods | Description |
| --- | --- | --- |
| `/api/auth/register` | `POST` | Create a new user |
| `/api/auth/login` | `POST` | Log in, sets the session cookie |
| `/api/auth/logout` | `POST` | End the session |
| `/api/auth/me` | `GET` | Current authenticated user |
| `/api/jerseys` | `GET`, `POST` | List / create jerseys |
| `/api/jerseys/price-range` | `GET` | Min/max price for filter bounds |
| `/api/jerseys/[jerseyId]` | `GET`, `PATCH`, `DELETE` | Jersey detail operations |
| `/api/jerseys/[jerseyId]/images` | `GET`, `POST` | List / add images for a jersey |
| `/api/jerseys/[jerseyId]/images/[imageId]` | `GET`, `PATCH`, `DELETE` | Jersey image detail operations |
| `/api/jerseys/[jerseyId]/images/[imageId]/primary` | `PATCH` | Set the primary image |
| `/api/users` | `GET` | List users |
| `/api/users/[userId]` | `DELETE` | Delete a user |
| `/api/image-kit/auth` | `GET` | Signed upload parameters for ImageKit |

Full request/response schemas are documented in [`docs/openapi.yaml`](./docs/openapi.yaml).

## Environment Variables

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret used to sign JWT session cookies |
| `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT` | Public ImageKit CDN endpoint (e.g. `https://ik.imagekit.io/<id>`) |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit public API key |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private API key (server-side only) |

## Documentation

- [`DESIGN.md`](./DESIGN.md) — brand, design system, and implementation guide
- [`docs/openapi.yaml`](./docs/openapi.yaml) — OpenAPI 3.1 spec for the Museo API
- [`docs/ABOUT_US.md`](./docs/ABOUT_US.md) — about the brand
- [`docs/FAQ.md`](./docs/FAQ.md) — FAQ content
- [`docs/db/`](./docs/db/) — incremental SQL migration scripts
