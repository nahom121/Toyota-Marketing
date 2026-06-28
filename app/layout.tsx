import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// TODO: Replace YOUR-DOMAIN-HERE.com with your real domain before launch
const SITE_URL = "https://YOUR-DOMAIN-HERE.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Drive With Nahom",
    template: "%s | Drive With Nahom",
  },
  description:
    "Buy your next Toyota with confidence. Nahom Estifanos is a trusted Toyota Product Specialist at Toyota of Katy, TX. Transparent pricing, lifetime powertrain warranty, and a pressure-free experience. Serving Houston, Katy, and surrounding communities.",
  keywords: [
    "Toyota Katy TX",
    "Toyota Sales Katy TX",
    "Toyota Houston",
    "Toyota RAV4 Katy",
    "Toyota Camry Katy",
    "Toyota Tacoma Katy",
    "Toyota Highlander Houston",
    "Toyota Tundra Katy",
    "Best Toyota Salesperson Katy",
    "Toyota Deals Houston",
    "Toyota of Katy",
    "Buy Toyota Katy",
    "Toyota Lease Katy",
    "New Toyota Houston",
    "Nahom Estifanos Toyota",
  ],
  authors: [{ name: "Nahom Estifanos" }],
  creator: "Nahom Estifanos",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Nahom Estifanos | Your Trusted Toyota Advisor in Katy & Houston",
    description:
      "Experience a stress-free, transparent car buying journey. Lifetime powertrain warranty, complimentary service loaners, and a dedicated advisor from start to finish.",
    siteName: "Nahom Estifanos – Toyota of Katy",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nahom Estifanos – Toyota Product Specialist at Toyota of Katy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nahom Estifanos | Toyota Product Specialist – Katy, TX",
    description:
      "Transparent pricing. Lifetime powertrain warranty. Pressure-free buying. Serving Houston & Katy.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // TODO: Add your Google Search Console verification code here before launch
  // verification: { google: "your-code-from-search-console" },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nahom Estifanos",
  jobTitle: "Toyota Product Specialist",
  worksFor: {
    "@type": "AutoDealer",
    name: "Toyota of Katy",
    address: {
      "@type": "PostalAddress",
      streetAddress: "21555 Katy Fwy",
      addressLocality: "Katy",
      addressRegion: "TX",
      postalCode: "77450",
      addressCountry: "US",
    },
    telephone: "+12813940700",
    url: "https://www.toyotaofkaty.com",
  },
  telephone: "+12025531080",
  email: "nahom.estifanos@drivetoyotaofkaty.com",
  url: SITE_URL,
  sameAs: [
    "https://www.linkedin.com/in/nahomestifanos",
    "https://www.facebook.com/nahomtoyota",
    "https://www.instagram.com/nahomtoyota",
  ],
  knowsAbout: [
    "Toyota vehicles",
    "Automotive sales",
    "Vehicle financing",
    "Trade-in appraisals",
    "Lifetime powertrain warranty",
  ],
  areaServed: [
    { "@type": "City", name: "Katy", containedIn: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Houston", containedIn: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Sugar Land", containedIn: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Cypress", containedIn: { "@type": "State", name: "Texas" } },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <meta name="theme-color" content="#050507" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-[#050507] text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
