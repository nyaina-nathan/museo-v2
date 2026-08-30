# Museo Frontend Design System & Implementation Guide

**For:** Next.js e-commerce application for vintage football jersey gallery  
**Brand:** Museo 2026 | Created by Harivelo Rakotoasimbola  
**Last Updated:** June 2026

---

## Table of Contents
1. [Color Palette](#color-palette)
2. [Typography System](#typography-system)
3. [Component Patterns](#component-patterns)
4. [Layout & Grid](#layout--grid)
5. [Imagery & Photography](#imagery--photography)
6. [Signature Elements](#signature-elements)
7. [Brand Voice & Microcopy](#brand-voice--microcopy)
8. [Next.js Implementation Notes](#nextjs-implementation-notes)

---

## Color Palette

### Primary Colors
```
Kenyan Copper (Primary Brand Color)
Hex: #781D0A
RGB: 120, 29, 10
Used for: Frames, borders, emphasis, CTAs, accents
Context: Represents heritage, craftsmanship, gallery sophistication

White (Context/Background)
Hex: #FFFFFF
RGB: 255, 255, 255
Used for: Backgrounds, cards, typography contrast, negative space
Context: Cleanliness, museum gallery aesthetic, premium positioning
```

### Contextual Colors
- **Dark Backgrounds:** Use #781D0A for dramatic, gallery-like sections
- **Card Backgrounds:** Exclusively white for premium feel
- **Text on White:** #781D0A for headings, dark grays for body copy
- **Text on Copper:** Only white for maximum legibility

### CSS Variables Example
```css
:root {
  --color-primary: #781D0A;      /* Kenyan Copper */
  --color-primary-light: #a8341d; /* Lighter copper for hover states */
  --color-primary-dark: #5a1507;  /* Darker copper for pressed states */
  --color-white: #FFFFFF;
  --color-text-dark: #2a2a2a;
  --color-text-light: #666666;
  --color-border: #e8e8e8;
}
```

**Rule:** Never introduce secondary colors. Restraint is the brand's strength. If you need visual hierarchy, use opacity and weight, never new hues.

---

## Typography System

### Typeface Stack

#### Museo Moderno (Display/Headlines)
- **Purpose:** Page titles, section heads, emphasis
- **Weight Hierarchy:** 400 (Regular) for most uses, 700 (Bold) for key moments
- **Line Height:** 1.2 for headlines, 1.1 for tight display text
- **Character:** Geometric, tubular curves evoke vintage jersey numbers and field lines; modern yet rooted in football heritage
- **Import:** `@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&display=swap');` *(use Archivo as fallback if Museo Moderno unavailable)*

#### Hanken Grotesk (Body Text)
- **Purpose:** Body copy, descriptions, metadata, UI labels
- **Weight Hierarchy:** 400 (Regular) for body, 500 (Medium) for emphasis, 700 (Bold) rarely used
- **Line Height:** 1.6 for paragraphs, 1.4 for UI text
- **Character:** Neutral, highly legible; supports minimalist gallery aesthetic; clarity over personality
- **Import:** `@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;700&display=swap');`

### Type Scale

```
Display (Museo Moderno)
  h1: 48px / 1.2 line-height
  h2: 36px / 1.2 line-height
  h3: 28px / 1.3 line-height

Headline (Hanken Grotesk)
  h4: 20px / 1.3 line-height
  h5: 18px / 1.4 line-height

Body
  p: 16px / 1.6 line-height (regular reading)
  small: 14px / 1.5 line-height (secondary info, metadata)
  caption: 12px / 1.4 line-height (exhibit labels, SKU numbers)
```

### Usage Rules

**Museo Moderno:**
- Page titles ("Les Fondations," "Identité Visuelle")
- Section headers
- Featured jersey names (e.g., "BRÉSIL 10, NEYMAR")
- Testimonials or gallery signage

**Hanken Grotesk:**
- All body copy
- Product descriptions
- Form labels and placeholder text
- Navigation and UI copy
- Jersey metadata (year, player, team)

**Art-Focused Language (Tone):**
- Use: "Curator," "Collection," "Archive," "Piece," "Iconic," "Patrimoine," "Chef-d'œuvre"
- Avoid: "Buy now," "Shop," "Deal," "Best seller," sports clichés
- Example: "Explore this legendary piece from our archive" not "Check out this jersey"

---

## Component Patterns

### Stamp/Ticket Border (Signature Element)

All major content cards and image containers use the scalloped stamp border inspired by the Museo mark.

**CSS Implementation:**
```css
.stamp-border {
  border: 3px solid var(--color-primary);
  border-radius: 12px;
  background: white;
  box-shadow: inset 0 0 0 8px white, 
              inset 0 0 0 11px var(--color-primary);
  /* Simulates stamp perforations via shadow layers */
  position: relative;
}

.stamp-border::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 0;
  right: 0;
  height: 8px;
  background: repeating-linear-gradient(
    90deg,
    var(--color-primary) 0px,
    var(--color-primary) 10px,
    transparent 10px,
    transparent 20px
  );
  -webkit-mask-image: radial-gradient(circle at center, transparent 6px, black 6px);
  mask-image: radial-gradient(circle at center, transparent 6px, black 6px);
  -webkit-mask-size: 20px 8px;
  mask-size: 20px 8px;
  -webkit-mask-repeat: repeat-x;
  mask-repeat: repeat-x;
}
/* Repeat for bottom, left, right edges */
```

**Use For:**
- Product cards (jersey displays)
- Image galleries
- CTA sections
- Featured collection highlights

**Don't use for:** Forms, navigation, utility buttons (too heavy-handed)

### Card Component

```jsx
export function JerseyCard({ 
  image, 
  title, 
  year, 
  player, 
  team,
  description 
}) {
  return (
    <div className="stamp-border jersey-card">
      <div className="jersey-card__image-container">
        <Image 
          src={image} 
          alt={`${player}, ${year}`}
          fill
          className="jersey-card__image"
        />
      </div>
      <div className="jersey-card__content">
        <h3 className="jersey-card__title">{team.toUpperCase()} {year}</h3>
        <p className="jersey-card__player">{player.toUpperCase()}</p>
        <p className="jersey-card__description">{description}</p>
        <span className="jersey-card__label">Explore this piece</span>
      </div>
    </div>
  );
}
```

**Styling:**
```css
.jersey-card {
  width: 100%;
  max-width: 320px;
  overflow: hidden;
}

.jersey-card__image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
}

.jersey-card__image {
  object-fit: contain;
  object-position: center;
}

.jersey-card__content {
  padding: 20px;
  background: white;
}

.jersey-card__title {
  font-family: 'Museo Moderno', serif;
  font-size: 20px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 8px;
}

.jersey-card__player {
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 14px;
  color: var(--color-text-light);
  font-weight: 500;
  margin-bottom: 12px;
}

.jersey-card__description {
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-dark);
  margin-bottom: 16px;
}

.jersey-card__label {
  font-size: 12px;
  color: var(--color-primary);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}
```

### Button Component

```jsx
export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) {
  const baseStyles = 'font-medium transition-colors focus:outline-none';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    secondary: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-primary hover:underline'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

**Usage:**
```jsx
// Primary action (explore, add to collection)
<Button variant="primary">Explore This Piece</Button>

// Secondary (learn more, view details)
<Button variant="secondary">View Archive</Button>

// Tertiary (skip, close, minimal)
<Button variant="ghost">Back to Collection</Button>
```

### Hero Section

```jsx
export function HeroSection({ title, subtitle, backgroundImage }) {
  return (
    <section className="hero">
      <div className="hero__background">
        <Image 
          src={backgroundImage} 
          alt={title}
          fill
          className="hero__image"
          priority
        />
      </div>
      <div className="hero__overlay" />
      <div className="hero__content">
        <h1 className="hero__title">{title}</h1>
        {subtitle && <p className="hero__subtitle">{subtitle}</p>}
      </div>
    </section>
  );
}
```

**Styling:**
```css
.hero {
  position: relative;
  width: 100%;
  height: 60vh;
  min-height: 400px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero__background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero__image {
  object-fit: cover;
  object-position: center;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: rgba(120, 29, 10, 0.3);
  z-index: 1;
}

.hero__content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 600px;
  padding: 0 20px;
}

.hero__title {
  font-family: 'Museo Moderno', serif;
  font-size: clamp(32px, 8vw, 56px);
  font-weight: 700;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.hero__subtitle {
  font-size: clamp(16px, 3vw, 24px);
  line-height: 1.4;
  font-weight: 300;
}
```

---

## Layout & Grid

### Container & Spacing

**Container:**
```css
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
}

@media (min-width: 768px) {
  .container {
    padding: 0 40px;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 60px;
  }
}
```

**Spacing Scale (8px base):**
```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
4xl: 80px
```

### Grid Layouts

**Collections Grid (Product listing):**
```css
.collections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
  padding: 48px 0;
}

@media (max-width: 768px) {
  .collections-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 24px;
  }
}

@media (max-width: 480px) {
  .collections-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
```

### Section Blocks

Each major section (Foundations, Pieces, Archive) should have:
- Clear visual separation (white bg or copper bg)
- Generous vertical padding (64px minimum)
- Centered container with restrained max-width
- Single-column or 2-column layouts only (no excessive columns)

```css
.section {
  padding: 64px 0;
}

.section--dark {
  background: var(--color-primary);
  color: white;
}

.section--light {
  background: white;
  color: var(--color-text-dark);
}

.section__header {
  text-align: center;
  margin-bottom: 48px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
```

---

## Imagery & Photography

### Photography Style Guidelines

#### Indoor Photography (Preferred)
- **Setting:** Gallery-like environments with minimalist backdrops
- **Backgrounds:** Neutral textures, wood paneling, muted tones, curated props (lamps, frames, shelves)
- **Lighting:** Soft, directional; creates gallery ambiance; occasional dramatic shadows for depth
- **Composition:** One subject (model) with jersey as central focus; composition on two planes (subject + environment)
- **Expression:** Stoic, confident, serious; avoiding sports clichés; treating wearer as curator of their own exhibition
- **Mood:** Intimate, museum-like; subject as if displaying a personal collection

#### Outdoor Photography (Secondary)
- **Setting:** Dynamic landscapes; stadiums, fields, urban environments
- **Composition:** Multi-layered (foreground, subject, background); jersey as connective element between two worlds
- **Energy:** Movement, action, vitality; but never static "sport poses"
- **Palette Alignment:** Environment colors should harmonize with brand copper and white
- **Example:** Multiple people on a field; one foreground, one mid-ground; jersey visible in each layer

### Image Display Rules

**Never:**
- Flat, plain-background product shots (like typical e-commerce)
- Generic "model against white wall" photography
- Sports photography clichés (action shots, triumph poses)
- Over-processed, hyper-saturated colors

**Always:**
- Frame images in white-space cards with stamp borders (on listing pages)
- Use full-bleed hero images with thoughtful overlays for major sections
- Treat the jersey as an artifact; photograph it with respect and context
- Ensure images breathe; use negative space generously

### Next.js Image Optimization

```jsx
import Image from 'next/image';

// Hero image (full-bleed, priority)
<Image 
  src="/images/hero-collection.jpg"
  alt="Brésil 10, Neymar - iconic piece from archive"
  fill
  className="object-cover"
  priority
/>

// Jersey card image (contained, lazy-loaded)
<Image 
  src={jerseyImage}
  alt={`${team} ${year}, ${player}`}
  width={320}
  height={320}
  className="object-contain"
/>

// S3 integration (using remotePatterns)
// In next.config.js:
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-bucket.s3.amazonaws.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};
```

---

## Signature Elements

### Iconic Mark (Secondary Logo)

**Use:** Social media avatars, small space integrations, favicon, badge on products

```jsx
export function IconicMark({ size = 'md' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`${sizes[size]} relative`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Stamp border outline */}
        <g stroke="#781D0A" strokeWidth="2" fill="none">
          {/* Scalloped border simulation */}
          <circle cx="50" cy="50" r="42" />
        </g>
        
        {/* MUSEO wordmark or jersey silhouette */}
        <text x="50" y="55" fontSize="28" fontWeight="bold" textAnchor="middle" fill="#781D0A">
          MUSEO
        </text>
      </svg>
    </div>
  );
}
```

### Stamp Border Variations

**Full Frame (for large content):**
- 3px border with inner double-line effect
- Scalloped top/bottom edges
- Used on cards, galleries, featured sections

**Minimal Frame (for inline content):**
- 2px border, no interior shadow
- Used for badges, labels, small images

**Decorative Divider:**
- Scalloped line only (no full border)
- Used between sections

---

## Brand Voice & Microcopy

### Tone Principles
1. **Knowledgeable but accessible** — Speak like an art curator, not a snob
2. **Passionate but measured** — Show love for the pieces without hyperbole
3. **Cultural, never commercial** — Use art vocabulary; avoid sales language
4. **Timeless, never trendy** — Avoid slang, memes, or dated references

### Vocabulary to Use
- Collection, Archive, Piece, Iconic, Legendary, Heritage, Patrimoine, Exhibition
- Curator, Collector, Commissary (of your own exhibition)
- Artisanal, Craftsmanship, Legacy, Testimony, Vintage
- Explore, Discover, Uncover, Preserve

### Vocabulary to Avoid
- Shop, Buy, Deal, Best seller, Limited offer, Sale
- Cop, Flex, Slay, Fire
- Stock, Inventory, Discount
- Sports clichés ("goal," "victory," "champion mindset")

### Microcopy Examples

**CTA Buttons:**
- ✅ "Explore This Piece"
- ✅ "Add to Collection"
- ✅ "View the Archive"
- ❌ "Shop Now"
- ❌ "Buy This Jersey"

**Descriptions:**
- ✅ "A 1998 testament to Brazilian craftsmanship, worn by legends at the peak of their careers."
- ✅ "This iconic number carries the weight of history. Every thread tells a story."
- ❌ "Cool vintage soccer jersey from the '90s. Great condition, must-have piece."
- ❌ "Limited edition! Grab yours before it's gone!"

**Empty States:**
- ✅ "Your collection awaits its first artifact."
- ✅ "Begin your archive. Explore our current pieces."
- ❌ "No items in your cart yet."

**Error Messages:**
- ✅ "This piece is no longer available in our archive."
- ✅ "We couldn't locate this artifact."
- ❌ "Error 404: Page not found."

---

## Next.js Implementation Notes

### Project Structure

```
/museo-store
├── /app
│   ├── /layout.tsx           (main layout with nav, footer)
│   ├── /page.tsx             (homepage)
│   ├── /collection
│   │   ├── /page.tsx         (collection listing)
│   │   └── /[id]/page.tsx    (individual jersey detail)
│   ├── /archive
│   │   └── /page.tsx
│   └── /admin                (CEO dashboard)
│
├── /components
│   ├── /ui
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── HeroSection.tsx
│   │   └── StampBorder.tsx
│   ├── /layout
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── ProductCard.tsx
│   └── CollectionGrid.tsx
│
├── /lib
│   ├── constants.ts          (colors, typography tokens)
│   ├── utils.ts
│   └── api.ts                (backend calls)
│
├── /public
│   ├── /images               (static assets)
│   └── /fonts                (if self-hosting typography)
│
├── /styles
│   ├── globals.css
│   ├── typography.css
│   └── components.css
│
└── next.config.js            (S3 remotePatterns config)
```

### CSS/Tailwind Configuration

If using Tailwind CSS, extend the config:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#781D0A',
        'primary-light': '#a8341d',
        'primary-dark': '#5a1507',
      },
      fontFamily: {
        display: ['Museo Moderno', 'serif'],
        body: ['Hanken Grotesk', 'sans-serif'],
      },
      fontSize: {
        '2xl': ['28px', '1.3'],
        'xl': ['20px', '1.3'],
      },
      spacing: {
        '4xs': '4px',
        '3xs': '8px',
        '2xs': '16px',
        'xs': '24px',
        'sm': '32px',
        'md': '48px',
        'lg': '64px',
        'xl': '80px',
      },
    },
  },
};
```

### Image Handling (S3 Integration)

```js
// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.AWS_S3_BUCKET,
        port: '',
        pathname: '/**',
      },
    ],
    deviceSizes: [320, 640, 750, 1080, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

module.exports = nextConfig;
```

```tsx
// lib/constants.ts
export const JERSEY_IMAGE_URL = (key: string) => 
  `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.amazonaws.com/jerseys/${key}`;
```

### Dark Mode (Discouraged)

**The Museo brand does NOT support dark mode.** The white and copper aesthetic is foundational. If users prefer dark OS settings, maintain the light theme within the app. No toggle needed.

```css
/* Force light mode */
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: light;
  }
}
```

### Responsive Breakpoints

```css
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

**Mobile-first approach:** Design for 375px (smallest phone), then add breakpoints upward.

### Performance Considerations

- **Images:** Always use Next.js `Image` component with `fill` or explicit dimensions
- **Fonts:** Self-host Google Fonts or specify `font-display: swap` for perceived performance
- **Bundle:** Keep stamp border SVG simple; use CSS where possible
- **Animations:** Use CSS transforms for GPU acceleration; avoid janky opacity changes

### Accessibility (a11y)

- **Color contrast:** Copper on white meets WCAG AA standard (7.2:1)
- **Typography:** Hanken Grotesk is highly legible; maintain minimum 16px for body text on mobile
- **Alt text:** Every product image needs descriptive alt text ("Brésil 10, Neymar, 1998, Nike")
- **Focus states:** All interactive elements need visible focus rings
- **Stamp borders:** Use `border-radius` for styling, not images, so they're accessible to screen readers

```css
.button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

---

## Summary Checklist

Before launching any page or component:

- [ ] Only using #781D0A (Kenyan Copper) and #FFFFFF (White) + neutral grays for text
- [ ] Museo Moderno used for headlines (h1–h3), Hanken Grotesk for body/UI
- [ ] All product images have stamp borders or gallery framing
- [ ] Microcopy uses art/curation language, no commercial/sports clichés
- [ ] Button variants align with action priority (primary, secondary, ghost)
- [ ] Responsive design tested on 375px, 768px, 1024px, 1536px
- [ ] All images optimized via Next.js Image component with S3 URLs
- [ ] Empty states, error messages, and edge cases use brand voice
- [ ] Navigation and footer are consistent across all pages
- [ ] No dark mode implemented; light theme enforced

---

**Questions or refinements?** Refer back to the original brand book for visual references, or contact the designer (Harivelo Rakotoasimbola, June 2026).