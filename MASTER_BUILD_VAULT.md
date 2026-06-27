# Master Build Vault — Nahom Estifanos Toyota Website
**Repository:** `nahom121/Toyota-Marketing`
**Branch:** `claude/install-uiux-pro-max-skill-2afxpk` (also mirrored to `main` for Vercel)
**Live URL:** `https://toyota-marketing.vercel.app` (Vercel auto-deploys from `main`)

---

## 1. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15.5.19 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 + custom design tokens |
| Animations | Framer Motion v12 |
| Icons | Lucide React |
| Fonts | DM Serif Display (headings) + Inter (body) via next/font/google |
| Email | Resend SDK v6 |
| Deployment | Vercel (auto-deploy from main branch) |
| Images | next/image with transparent PNG vehicle photos |

---

## 2. Contact & Identity

| Field | Value |
|---|---|
| Name | Nahom Estifanos |
| Title | Toyota Product Specialist |
| Dealership | Toyota of Katy |
| Address | 21555 Katy Fwy, Katy, TX 77450 |
| Phone | (202) 553-1080 / +12025531080 |
| Email | nahom.estifanos@drivetoyotaofkaty.com |
| Hours | Mon–Fri 9am–8pm · Sat 9am–7pm · Sun 12pm–5pm |
| Service Area | All of Texas (Katy, Houston, Sugar Land, Cypress, Richmond, Brookshire) |

---

## 3. Design System

### Colors
```
Toyota Red:   #EB0A1E  (--toyota-red)
Red Dark:     #C00817
Red Light:    #FF1F30
Gold:         #C9A84C
Background:   #050507
Surface:      #0D0D12
Surface+:     #141420
Text Primary: #FFFFFF
Text Sec:     #A0A0B4  (ink-secondary)
Text Muted:   #5A5A72  (ink-muted)
```

### Key CSS Classes
```
.glass          — frosted glass card (rgba white/4%, blur 20px)
.glass-strong   — stronger glass (rgba white/7%, blur 40px)
.btn-primary    — Toyota red pill button with glow shadow
.btn-secondary  — ghost glass pill button
.label-tag      — small red pill label (section tags)
.section-pad    — py-24 md:py-32
.text-gradient-red   — red gradient text
.text-gradient-gold  — gold gradient text
```

---

## 4. Page Structure & Section Order

```
Header (sticky nav)
├── Hero
├── TrustBar (animated ticker)
├── WhyChooseMe
├── Vehicles  ← qualifier grid, not a catalog
├── LifetimeWarranty
├── Testimonials
├── TradeIn
├── About
└── Contact
Footer
FloatingActions (sticky call/text buttons)
ExitIntentPopup (fires on mouse leave or after 45s)
```

> SpecialOffers section EXISTS in the codebase (`components/sections/SpecialOffers.tsx`) but is NOT imported or rendered — intentionally removed due to stale/expired incentive data.

---

## 5. All Sections — What Each Does

### Header (`components/layout/Header.tsx`)
- Sticky navigation with scroll-based background blur
- Links: Why Me · Vehicles · Warranty · Reviews · Trade-In · About
- CTA button: "Schedule Appointment" → scrolls to #contact
- Phone number: (202) 553-1080

### Hero (`components/sections/Hero.tsx`)
- Full-viewport dark hero with animated headline
- Primary CTA: "Schedule My Appointment" → #contact
- Secondary CTA: "Get Trade-In Value" → #trade-in
- Stat bar below headline

### TrustBar (`components/sections/TrustBar.tsx`)
- Auto-scrolling horizontal ticker
- Trust badges: Lifetime Warranty · Loaners · Fast Process · etc.
- Duplicates items for seamless infinite loop

### WhyChooseMe (`components/sections/WhyChooseMe.tsx`)
- 4 value proposition cards (transparency, no pressure, etc.)
- Personal differentiator section

### Vehicles (`components/sections/Vehicles.tsx`) ← QUALIFIER
- **Purpose:** Lead capture qualifier, NOT a brochure or catalog
- Category filter tabs: All | Cars | SUVs | Trucks | Not sure yet
- 16 vehicle cards with floating transparent PNG images + gentle bob animation
- Each car click → pre-fills the contact form dropdown AND scrolls to #contact
- EV models (bZ4X, C-HR) get a blue ⚡ Electric badge
- No specs, no MPG, no passenger counts — just model name + tagline
- "Ask me anyway →" fallback link at bottom

**Vehicle roster by category:**
```
Cars:   Prius · Corolla · Camry · Crown
SUVs:   C-HR · bZ4X · RAV4 · Crown Signia · 4Runner ·
        Highlander · Grand Highlander · Sienna · Sequoia · Land Cruiser
Trucks: Tacoma · Tundra
```

**Image files** (`public/vehicles/`):
```
prius.png · corolla.png · camry.png · crown.png
chr.png · bz4x.png · rav4.png · crown-signia.png · 4runner.png
highlander.png · grand-highlander.png · sienna.png · sequoia.png · land-cruiser.png
tacoma.png · tundra.png
```

### LifetimeWarranty (`components/sections/LifetimeWarranty.tsx`)
- Animated shield graphic with orbiting badges (No Mileage Limit · Transferable · All Dealers)
- Coverage explained in ONE plain-English sentence:
  > "Covers your engine and transmission, plus your front and back driving axle."
- 4 trust bullets: no mileage limit, transferable, any Toyota dealer, no deductible
- CTA → #contact

### Testimonials (`components/sections/Testimonials.tsx`)
- Customer review cards
- Star ratings, customer names

### TradeIn (`components/sections/TradeIn.tsx`)
- Form: Name · Phone · Year · Make · Model · Mileage · Condition
- Submits to `/api/trade-in` → Resend email → redirects to `/thank-you`
- Benefit list + stats ($0 appraisal fee · 24hr response · Any make/model)

### About (`components/sections/About.tsx`)
- Nahom's headshot photo (`public/headshot.jpg`) — transparent background PNG
- 4 value cards: People First · Purpose-Driven · Excellence Always · Community Rooted
- Social links: LinkedIn · Instagram · Facebook (currently #placeholder)
- Stats grid: Toyota · Katy TX · 100% · 5★

### Contact (`components/sections/Contact.tsx`)
- 4 contact method cards: Call · Text · Email · Visit
- Business hours card
- **Form — 4 fields:**
  1. Full Name *
  2. Phone Number *
  3. "What can I help you with?" * (dropdown — see below)
  4. Tell Me More (optional textarea)
- Submits to `/api/contact` → Resend email → redirects to `/thank-you`
- **Auto-fills from vehicle click** via `selectVehicle` custom event

**Contact form dropdown options:**
```
── Toyota Models ──
Toyota RAV4, Highlander, Grand Highlander, Camry, Corolla, Prius,
Crown, Crown Signia, bZ4X, C-HR, 4Runner, Sequoia, Sienna,
Tacoma, Tundra, Land Cruiser

── General ──
Not sure yet — need guidance
Trade-In Appraisal
Financing / Leasing Help
General Question
```

### Footer (`components/layout/Footer.tsx`)
- Quick Links · Toyota Models · Areas Served
- Contact info, social icons
- "Serving Texas families" language
- Address: 21555 Katy Fwy, Katy, TX 77450

### FloatingActions (`components/layout/FloatingActions.tsx`)
- Sticky bottom-right buttons: Call · Text
- Visible on all pages

### ExitIntentPopup (`components/ExitIntentPopup.tsx`)
- Fires when mouse leaves viewport (top) OR after 45 seconds
- Email capture form + Schedule Now + Call Me buttons
- One-time per session (dismissed state)

---

## 6. API Routes

### `/api/contact` — `app/api/contact/route.ts`
```
POST payload: { name, phone, interest, message? }
Validates: name + phone + interest required
Sends to: nahom.estifanos@drivetoyotaofkaty.com
Subject: "New Lead – [Name] ([Interest])"
Requires: RESEND_API_KEY env var
```

### `/api/trade-in` — `app/api/trade-in/route.ts`
```
POST payload: { name, phone, year, make, model, mileage?, condition? }
Validates: name + phone + year + make + model required
Sends to: nahom.estifanos@drivetoyotaofkaty.com
Subject: "Trade-In Request – [Year] [Make] [Model]"
Requires: RESEND_API_KEY env var
```

### `/thank-you` — `app/thank-you/page.tsx`
- Success page both forms redirect to after submission
- Links to call/text (202) 553-1080
- "Back to Home" button

---

## 7. Environment Variables

| Variable | Where to set | Value |
|---|---|---|
| `RESEND_API_KEY` | Vercel → Project Settings → Environment Variables | Get from resend.com |

**To get RESEND_API_KEY:**
1. Sign up at resend.com (free)
2. Go to API Keys → Create API Key
3. Copy the `re_...` key (shown only once)
4. Paste into Vercel env vars → Save → Redeploy

---

## 8. Deployment (Vercel)

- **Auto-deploys** every time `main` branch is pushed
- Build command: `npm run build` (Next.js)
- Framework detected automatically by Vercel
- Node version: 20+
- Must add `RESEND_API_KEY` env var manually in Vercel dashboard

**To trigger a redeploy manually:**
Vercel Dashboard → Deployments → ••• → Redeploy

---

## 9. Git Commit History (newest first)

```
74a42a1  Add Tell Me More textarea to contact form
41fb74f  P2-P4: Vehicles qualifier, warranty simplification, 3-field contact form
f44cb6f  Mark bZ4X and C-HR as electric vehicles with distinct EV styling
d7f0ec6  Add Sequoia vehicle photo
dfe7c6c  Add vehicle photos to public/vehicles/ (15 images)
9898163  Add bZ4X, Crown Signia, Prius, C-HR, 4Runner + Cars/SUVs/Trucks sections
79b872a  Redesign Vehicles section with floating car images
5cf1f5e  Fix input text visibility, address, serving area, contact form email
a418d81  Wire forms to Resend, update 2026-2027 lineup, fix contact info
e922d84  Downgrade to Next.js 15.5.19 for Vercel compatibility
0225c67  Wire up headshot photo in About section
7065270  Add Nahom headshot photo
48920e6  Initial build — world-class Toyota personal brand website
```

---

## 10. Known Pending Items

| Item | Status | Notes |
|---|---|---|
| `RESEND_API_KEY` in Vercel | ⚠️ Action required | Forms won't send email without this |
| Contact form delivery test | ⚠️ Verify | Submit the form and confirm email arrives |
| Real domain | ⚠️ Pending | Replace `YOUR-DOMAIN-HERE.com` in `app/layout.tsx` line 19 |
| Social media URLs | ⚠️ Pending | `About.tsx` line 96–98 has `href: "#"` placeholders for LinkedIn/Instagram/Facebook |
| Google Search Console | ⚠️ Pending | Uncomment verification in `app/layout.tsx` line 78 |
| Calendly booking link | Optional | Add a "Book a Time" button to contact section once you have a Calendly URL |
| reCAPTCHA spam protection | Optional | Needs Google site key from console.google.com |
| Lighthouse audit | Optional | Run in Chrome DevTools → check Performance + Accessibility scores |

---

## 11. Files That Should NOT Be Touched

| File | Reason |
|---|---|
| `components/sections/SpecialOffers.tsx` | Kept but not rendered — leave as-is |
| `public/headshot.jpg` | Nahom's photo — do not overwrite |
| `public/vehicles/*.png` | 16 transparent vehicle PNGs |
| `package-lock.json` | Auto-managed by npm |

---

## 12. How to Add/Change Things Later

### Change a vehicle photo
Replace the file in `public/vehicles/` with the same filename → push to main → Vercel redeploys.

### Add a new vehicle
1. Add PNG to `public/vehicles/newmodel.png`
2. Add entry to the `vehicles` array in `components/sections/Vehicles.tsx`
3. Add `"Toyota NewModel"` to `interestOptions` in `components/sections/Contact.tsx`

### Change contact info (phone/email/address)
Search the whole project for the old value and replace:
- Phone: `(202) 553-1080` / `+12025531080`
- Email: `nahom.estifanos@drivetoyotaofkaty.com`
- Address: `21555 Katy Fwy, Katy, TX 77450`

### Update business hours
Edit `components/sections/Contact.tsx` (hours card) and `components/layout/Footer.tsx`.

### Add a testimonial
Edit the testimonials array in `components/sections/Testimonials.tsx`.

### Set the real domain
1. Open `app/layout.tsx`
2. Line 19: change `YOUR-DOMAIN-HERE.com` to your real domain
3. Also update the `canonical` URL and JSON-LD schema

---

*Last updated: June 27, 2026*
