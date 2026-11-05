import type { Metadata } from "next";
import { DM_Serif_Display, Inter, Dancing_Script } from "next/font/google";
import { FORCE_SOLD_OUT } from "@/lib/slots";
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

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const SITE_URL = "https://www.houstonskateproject.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Houston Skate Project",
    template: "%s | Houston Skate Project",
  },
  description: FORCE_SOLD_OUT
    ? "Pop-up roller skating workshops in Houston, TX hosted by national champion skater Michaela. New dates coming soon — join the email list to be the first to know."
    : "A pop-up roller skating workshop in Houston, TX hosted by national champion skater Michaela. November 8th, 2026. All skill levels welcome. Register now.",
  keywords: [
    "Houston Skate Project",
    "roller skating Houston",
    "pop-up skate Houston",
    "roller skate workshop Houston TX",
    "Michaela skater Houston",
    "skating pop-up Houston 2026",
    "roller skating class Houston",
  ],
  authors: [{ name: "Michaela" }],
  creator: "Michaela",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: FORCE_SOLD_OUT ? "Houston Skate Project · New Classes Coming Soon" : "Houston Skate Project · Pop-Up Workshop · November 8, 2026",
    description: FORCE_SOLD_OUT
      ? "National champion skater Michaela brings pop-up roller skating workshops to Houston. New dates coming soon."
      : "National champion skater Michaela brings a pop-up roller skating workshop to Houston. All skill levels welcome. Register now.",
    siteName: "Houston Skate Project",
    images: [{ url: "/og-image.png", width: 1200, height: 1200, alt: "Houston Skate Project Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: FORCE_SOLD_OUT ? "Houston Skate Project · New Classes Coming Soon" : "Houston Skate Project · Pop-Up Workshop · November 8",
    description: FORCE_SOLD_OUT
      ? "Roll how you want. Express who you are. Houston, TX · New dates coming soon."
      : "Roll how you want. Express who you are. Houston, TX · November 8, 2026.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Houston Skate Project · Pop-Up Workshop",
  startDate: "2026-11-08",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Houston, TX",
    address: { "@type": "PostalAddress", streetAddress: "8800 W Sam Houston Pkwy S, Ste 107", addressLocality: "Houston", addressRegion: "TX", postalCode: "77047", addressCountry: "US" },
  },
  organizer: { "@type": "Person", name: "Michaela" },
  offers: {
    "@type": "Offer",
    price: "25",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: SITE_URL,
  },
  description:
    "A pop-up roller skating workshop hosted by national champion skater Michaela. Open to all skill levels. Express yourself on wheels.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${inter.variable} ${dancingScript.variable}`}>
      <head>
        {!FORCE_SOLD_OUT && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#F5EDD9" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-cream text-charcoal antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
