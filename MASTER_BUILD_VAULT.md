# Master Build Vault — Nahom Estifanos Toyota Website
**Repository:** `nahom121/Toyota-Marketing`  
**Branch:** `claude/install-uiux-pro-max-skill-2afxpk` (also mirrored to `main` for Vercel)  
**Live URL:** `https://www.drivewithnahom.com` (Vercel auto-deploys from `main`)  
**Last Updated:** June 28, 2026

---

## 1. Project Overview

A personal brand marketing website for **Nahom Estifanos**, Toyota Product Specialist based in Katy, TX. Built with Next.js 15 (App Router), Tailwind CSS v3, and Framer Motion. The site functions as a lead-generation tool — visitors browse vehicles, click one, and are pre-routed to the contact form with that vehicle pre-selected. Nahom receives lead emails via Resend.

**Core goal:** Build Nahom's personal brand. Minimal mention of the dealership name (Toyota of Katy) — every surface says "Nahom Estifanos, Toyota Specialist · Katy, TX."

---

## 2. Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 15.5.x (App Router, TypeScript) |
| Styling | Tailwind CSS v3 with custom design tokens |
| Animations | Framer Motion v12 |
| Icons | Lucide React |
| Fonts | DM Serif Display (display) + Inter (body) via next/font/google |
| Email | Resend SDK v6 (lazy-init inside handler, NOT module-level) |
| Hosting | Vercel (auto-deploy from `main`) |
| Images | next/image with `fill` + `object-contain` for transparent PNG vehicles |

---

## 3. Nahom's Personal Info

| Field | Value |
|---|---|
| Phone | (202) 553-1080 |
| SMS | (202) 553-1080 |
| Email | nahom.estifanos@drivetoyotaofkaty.com |
| Address | 21555 Katy Fwy, Katy, TX 77450 |
| Domain | https://www.drivewithnahom.com |
| Dealership | Toyota of Katy (minimize mentions — personal brand) |
| Serving | All of Texas |

---

## 4. File Map

```
Toyota-Marketing/
├── app/
│   ├── layout.tsx              # Metadata, fonts, JSON-LD schema, favicon
│   ├── page.tsx                # Main page — all sections assembled
│   ├── globals.css             # Design tokens, glass utilities, btn-primary, etc.
│   ├── thank-you/page.tsx      # Post-form submission confirmation page
│   └── api/
│       ├── contact/route.ts    # Lead form email → Resend
│       └── trade-in/route.ts   # Trade-in form email → Resend
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Sticky nav with mobile drawer
│   │   ├── Footer.tsx          # Brand column + links + warranty note + copyright
│   │   └── FloatingActions.tsx # Fixed bottom CTA bar (mobile)
│   └── sections/
│       ├── Hero.tsx            # Full-screen hero, stats row, trust badges
│       ├── TrustBar.tsx        # Horizontal scrolling trust stats bar
│       ├── WhyChooseMe.tsx     # Nahom's 5 differentiators
│       ├── Vehicles.tsx        # 16-vehicle grid, category filter, click → contact
│       ├── LifetimeWarranty.tsx# Animated shield + coverage explanation
│       ├── Testimonials.tsx    # Customer reviews
│       ├── About.tsx           # Nahom bio + headshot
│       ├── TradeIn.tsx         # Trade-in form
│       ├── Contact.tsx         # Lead form (pre-fillable via custom event)
│       ├── SpecialOffers.tsx   # (Hidden/unused — kept but not rendered)
│       └── ExitIntentPopup.tsx # Exit intent modal
├── public/
│   ├── favicon.svg             # SVG favicon: dark bg, red "N"
│   ├── headshot.jpg            # Nahom's photo
│   └── vehicles/               # 16 transparent PNG vehicle images
│       ├── rav4.png
│       ├── highlander.png
│       ├── grand-highlander.png
│       ├── camry.png
│       ├── corolla.png
│       ├── prius.png
│       ├── crown.png
│       ├── crown-signia.png
│       ├── bz4x.png
│       ├── chr.png
│       ├── 4runner.png
│       ├── sequoia.png
│       ├── sienna.png
│       ├── tacoma.png
│       ├── tundra.png
│       └── land-cruiser.png
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── MASTER_BUILD_VAULT.md       # This file
```

---

## 5. Section-by-Section Breakdown

### Header (`components/layout/Header.tsx`)
- Sticky, transparent when at top → frosted glass when scrolled
- Logo: red circle "T" + "Nahom Estifanos" / "Toyota Specialist · Katy, TX"
- Nav links: Why Nahom, Vehicles, Testimonials, Trade-In, About, Contact
- Desktop CTA: phone number + "Schedule Appointment" red button
- Mobile: slide-in drawer from right with all links

### Hero (`components/sections/Hero.tsx`)
- Full-screen dark background with grid + glow orbs
- Label badge: "Toyota Product Specialist · Katy, Texas"
- Headline: "Your Toyota Buying Experience Starts Here"
- Subhead: Transparent pricing. Personalized service. Lifetime powertrain protection. Serving Houston and Katy, Texas.
- Two CTAs: "Schedule My Appointment" (→ #contact) + "View Available Vehicles" (→ #vehicles)
- Trust badges: Lifetime Powertrain Warranty, Complimentary Service Loaners, 5-Star Customer Experience
- Stats row: 500+ Vehicles Sold · 5★ Google Rating · 100% Transparent Pricing · 0 Sales Pressure

### Vehicles (`components/sections/Vehicles.tsx`)
- 16 vehicles split into Cars / SUVs / Trucks
- No specs shown — just vehicle name and tagline
- Category filter tabs: All / Cars / SUVs / Trucks / Not sure yet
- Each vehicle card is a button — clicking dispatches `selectVehicle` custom event AND scrolls to #contact
- Floating bob animation (each car has unique duration + delay for organic feel)
- Animated ground shadow synced to bob
- Red glow on hover, name turns red, "Inquire about this model →" appears
- bZ4X and C-HR show blue ⚡ Electric badge

**Vehicle List:**
| Model | Category | Note |
|---|---|---|
| Prius | Cars | |
| Corolla | Cars | |
| Camry | Cars | |
| Crown | Cars | |
| C-HR | SUVs | Electric ⚡ |
| bZ4X | SUVs | Electric ⚡ |
| RAV4 | SUVs | |
| Crown Signia | SUVs | |
| 4Runner | SUVs | |
| Highlander | SUVs | |
| Grand Highlander | SUVs | |
| Sienna | SUVs | |
| Sequoia | SUVs | |
| Land Cruiser | SUVs | |
| Tacoma | Trucks | |
| Tundra | Trucks | |

### Lifetime Warranty (`components/sections/LifetimeWarranty.tsx`)
- Left: animated rotating rings + center shield graphic + 3 orbiting badges
- Orbiting badges: No Mileage Limit (Infinity icon), Exclusive Perk (Star icon), All Dealers (Wrench icon)
- Trust bullets:
  - No mileage limit — ever
  - Exclusive to my customers only
  - Valid at any Toyota dealership nationwide
  - No deductible on covered repairs
- Plain-language coverage box: "Covers your **engine and transmission**, plus your **front and back driving axle**."
- CTA: "Ask Me About the Warranty" → scrolls to #contact
- NOT transferable. NOT branded "Toyota of Katy" — personal brand only.

### Contact (`components/sections/Contact.tsx`)
**Left column:** 4 contact method cards (Call, Text, Email, Visit) + Business Hours card

**Hours:**
- Monday–Friday: 9:00 AM – 8:00 PM
- Saturday: 9:00 AM – 7:00 PM
- Sunday: Closed

**Form (right column):** 4 fields
1. Full Name (required)
2. Phone Number (required)
3. "What can I help you with?" — dropdown with 16 Toyota models + 4 general options, grouped with `<optgroup>`
4. Tell Me More — optional textarea

Response promise: "I'll reach out within **30 minutes**."

**Pre-fill system:** When a visitor clicks a vehicle card in the Vehicles section:
```js
window.dispatchEvent(new CustomEvent("selectVehicle", { detail: model }));
```
Contact.tsx listens via `useEffect`:
```js
window.addEventListener("selectVehicle", handler);
```
The handler finds the matching option in `interestOptions` and sets it in form state.

### TradeIn (`components/sections/TradeIn.tsx`)
- 7-field form: Name, Phone, Year, Make, Model, Mileage (optional), Condition (optional select)
- Sends to `nahom.estifanos@drivetoyotaofkaty.com` via Resend
- On success → redirects to `/thank-you`

### About (`components/sections/About.tsx`)
- Nahom's bio, headshot (`/public/headshot.jpg`), social links
- Social hrefs are currently `"#"` placeholder — update with real URLs when ready

### Thank You Page (`app/thank-you/page.tsx`)
- "You're All Set!" with green checkmark
- "I'll reach out within **30 minutes**"
- Call / Text links for faster contact
- Back to Home button

---

## 6. Email / Forms

### API Routes
Both routes use the same pattern — Resend is **lazy-initialized inside the POST handler** (not at module level, to avoid build errors).

**Contact form → `/api/contact/route.ts`**
- Accepts: `{ name, phone, interest, message }`
- Required: name, phone, interest
- Subject: `New Lead – [name] ([interest])`
- Sends to: `nahom.estifanos@drivetoyotaofkaty.com`

**Trade-in form → `/api/trade-in/route.ts`**
- Accepts: `{ name, phone, year, make, model, mileage, condition }`
- Required: name, phone, year, make, model
- Subject: `Trade-In Request – [year] [make] [model]`
- Sends to: `nahom.estifanos@drivetoyotaofkaty.com`

### Resend Setup (Required for emails to work)
1. Go to [resend.com](https://resend.com) → create account
2. API Keys → Create API Key → copy it
3. Go to Vercel → your project → Settings → Environment Variables
4. Add: `RESEND_API_KEY` = your key (all environments)
5. Redeploy (Vercel dashboard → Deployments → Redeploy)

The `from` address is currently `onboarding@resend.dev` (Resend's free sandbox domain). To send from a custom address like `hello@drivewithnahom.com`, add the domain in Resend → Domains and update the `from` field in both route files.

---

## 7. Design System

### Colors
| Token | Value | Use |
|---|---|---|
| `toyota-red` | `#EB0A1E` | Primary CTAs, accents |
| `toyota-red-dark` | `#C00817` | Hover state |
| `toyota-red-light` | `#FF1F30` | Active state |
| `gold` | `#C9A84C` | Warm accents |
| `ink-secondary` | `#A0A0B4` | Body text |
| `ink-muted` | `#5A5A72` | Placeholder, captions |
| Background | `#050507` | Page background |
| Surface | `#0D0D12` | Cards |

### Key CSS Classes (globals.css)
- `.glass` — semi-transparent frosted card
- `.glass-strong` — stronger glass for form containers
- `.glass-dark` — dark frosted glass for header
- `.btn-primary` — red pill button with glow + scale hover
- `.btn-secondary` — ghost pill button
- `.label-tag` — small red uppercase badge
- `.section-pad` — `py-24 md:py-32` section spacing
- `.text-gradient-red` — red gradient text fill
- `.grid-bg` — subtle grid line background

### Typography
- **Display font:** DM Serif Display (headings, stats)
- **Body font:** Inter (all other text)

### Mobile Fixes Applied
- `input, textarea, select { color-scheme: dark; color: white; }` — fixes invisible typed text on iOS/Android
- `html { overflow-x: hidden; max-width: 100%; }` — fixes horizontal drag-to-black on mobile

---

## 8. Branding Rules

| Surface | What to say |
|---|---|
| Header subtitle | "Toyota Specialist · Katy, TX" |
| Hero badge | "Toyota Product Specialist · Katy, Texas" |
| Footer subtitle | "Toyota Specialist · Katy, TX" |
| Footer warranty blurb | "through me includes an exclusive lifetime powertrain warranty" |
| Footer copyright | "Nahom Estifanos · Toyota Product Specialist · Katy, TX" |
| Warranty section | No mention of Toyota of Katy. "Exclusive to my customers only." |
| Contact card | "Visit the Dealership · Toyota of Katy · Katy, TX" (only place dealership name appears) |

---

## 9. SEO & Metadata (`app/layout.tsx`)

- **Tab title:** "Drive With Nahom" (template: `%s | Drive With Nahom`)
- **Meta description:** Transparent pricing, lifetime powertrain warranty, pressure-free experience
- **Keywords:** Toyota Katy TX, Toyota Houston, Nahom Estifanos Toyota, etc.
- **Open Graph:** Full og-image config pointing to `/og-image.jpg`
- **Twitter Card:** `summary_large_image`
- **Canonical:** `https://www.drivewithnahom.com`
- **JSON-LD schema:** Person schema — name, jobTitle, worksFor (AutoDealer), telephone, email, areaServed (Katy, Houston, Sugar Land, Cypress)

**TODO before launch:**
- Add Google Search Console verification code (line 77 in layout.tsx, commented out)
- Create `/public/og-image.jpg` — 1200×630px social preview image

---

## 10. Favicon (`public/favicon.svg`)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#050507"/>
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle"
        font-family="Georgia, serif" font-size="20" font-weight="700"
        fill="#EB0A1E" letter-spacing="-1">N</text>
</svg>
```
Referenced in `layout.tsx` as:
```tsx
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="alternate icon" href="/favicon.ico" />
```

---

## 11. Git Workflow

Every push goes to BOTH branches:
```bash
git push origin claude/install-uiux-pro-max-skill-2afxpk
git push origin claude/install-uiux-pro-max-skill-2afxpk:main
```
Vercel is connected to `main` → auto-deploys on every push.

---

## 12. Remaining To-Dos

| Item | Priority | Notes |
|---|---|---|
| Set `RESEND_API_KEY` in Vercel | **Critical** | Without this, no lead emails arrive |
| Add `drivewithnahom.com` domain in Vercel | High | Vercel → Settings → Domains |
| Create `/public/og-image.jpg` | Medium | 1200×630px, for social sharing preview |
| Update social media URLs in About.tsx | Medium | LinkedIn, Instagram, Facebook (currently `"#"`) |
| Google Search Console verification | Low | Uncomment line 77 in layout.tsx |
| Custom Resend from-address | Low | Add domain in Resend to send from `@drivewithnahom.com` |
| Calendly / booking link (optional) | Optional | If you want direct calendar scheduling |
| reCAPTCHA spam protection (optional) | Optional | Needs Google site key |

---

## 13. Known Bug Fixes Applied

| Bug | Root Cause | Fix |
|---|---|---|
| Build error: `Cannot find name 'submitted'` | Old ternary in TradeIn.tsx used `submitted` after it was renamed to `submitting` | Removed the ternary wrapper entirely |
| Resend build error | `new Resend(key)` at module level called before env vars were available | Moved instantiation inside the POST handler |
| Contact form emails not sending | `replyTo: email` in the contact route caused Resend to silently error | Removed `replyTo` field entirely |
| Invisible typed text in mobile forms | Browser CSS override on dark-bg inputs | `input, textarea, select { color-scheme: dark; color: white; }` |
| Mobile horizontal scroll / black area on drag | `overflow-x: hidden` on `body` only — mobile scrolls `html` element | Added `overflow-x: hidden; max-width: 100%` to `html` in globals.css |
