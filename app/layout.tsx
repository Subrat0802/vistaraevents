import type { Metadata, Viewport } from "next";
import { Cinzel, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

// Configure the fonts
const cinzel = Cinzel({ 
  subsets: ["latin"], 
  variable: "--font-cinzel" 
});
const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: "--font-montserrat" 
});
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair" 
});

export const viewport: Viewport = {
  themeColor: "#1A1A1A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Vistara Events | Best Event Management Company in Rewa, Satna, Sidhi & Jabalpur",
  description: "Vistara Events is the premier luxury event organiser in Rewa, Satna, Sidhi, and Jabalpur. We specialize in luxury weddings, corporate galas, and bespoke celebrations with a signature touch of excellence. Best event organiser near you.",
  keywords: [
    "event company near me", 
    "event organiser in Rewa", 
    "wedding planner in Satna", 
    "event management Jabalpur", 
    "best event company Sidhi", 
    "luxury weddings Rewa", 
    "corporate events MP", 
    "Vistara Events", 
    "event planner near Rewa",
    "top event organisers in Madhya Pradesh"
  ],
  authors: [{ name: "Vistara Events" }],
  openGraph: {
    title: "Vistara Events | Luxury Event Management in Rewa & MP",
    description: "Creating unforgettable echoes in Rewa, Satna, Sidhi, and Jabalpur. Specializing in luxury weddings and corporate excellence.",
    url: "https://vistaraevents.com", // Replace with actual domain if known
    siteName: "Vistara Events",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/next.svg", // Replace with a proper OG image
        width: 1200,
        height: 630,
        alt: "Vistara Events - Luxury Event Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vistara Events | Luxury Event Management",
    description: "Best event company in Rewa, Satna, Sidhi, and Jabalpur.",
    images: ["/next.svg"], // Replace with a proper Twitter card image
  },
  alternates: {
    canonical: "https://vistaraevents.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Vistara Events",
    "image": "https://vistaraevents.com/next.svg", // Replace with actual logo URL
    "@id": "https://vistaraevents.com",
    "url": "https://vistaraevents.com",
    "telephone": "+919179999927",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4th Floor, Sneh Aspire",
      "addressLocality": "Rewa",
      "addressRegion": "MP",
      "postalCode": "486001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 24.5363,
      "longitude": 81.3037
    },
    "servesCuisine": "",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "10:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://instagram.com/vistaraevents"
    ],
    "areaServed": [
      { "@type": "City", "name": "Rewa" },
      { "@type": "City", "name": "Satna" },
      { "@type": "City", "name": "Sidhi" },
      { "@type": "City", "name": "Jabalpur" }
    ],
    "description": "Premier event management company in Rewa, Satna, Sidhi, and Jabalpur specializing in luxury weddings and corporate events."
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${cinzel.variable} ${montserrat.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}