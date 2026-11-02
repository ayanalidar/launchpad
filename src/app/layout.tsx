import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ServiceWorkerRegister } from "@/components/site/ui/ServiceWorkerRegister";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"], // reduced from 6 weights to 3, ~90KB saved
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "GuardianX Launchpad, Recruitment & Career Assistance Consultancy",
  description:
    "GuardianX Launchpad is a premier technology recruitment and career assistance consultancy. We connect skilled professionals with leading roles across every domain of technology, cybersecurity, engineering, cloud, AI/ML, data, design, and more, through our consultancy network.",
  keywords: [
    "technology recruitment consultancy",
    "GuardianX Launchpad",
    "tech jobs India",
    "software engineering recruitment",
    "cybersecurity jobs",
    "cloud DevOps careers",
    "AI ML recruitment",
    "data science jobs",
    "career assistance consultancy",
    "IT recruitment agency",
  ],
  authors: [{ name: "GuardianX Launchpad" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "GuardianX Launchpad, Recruitment & Career Assistance Consultancy",
    description:
      "Premium technology recruitment and career assistance. Connecting skilled professionals with leading roles across every domain of technology.",
    siteName: "GuardianX Launchpad",
    type: "website",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "GuardianX Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GuardianX Launchpad, Recruitment & Career Assistance Consultancy",
    description:
      "Premium technology recruitment and career assistance consultancy.",
    images: ["/logo.png"],
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#F59E0B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Preconnect to external services for faster initial connection
const preconnects = [
  "https://aws-0-ap-southeast-1.pooler.supabase.com",
  "https://fonts.googleapis.com",
  "https://fonts.gstatic.com",
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        {/* Preconnect to Supabase pooler for faster DB connections */}
        {preconnects.map((href) => (
          <link key={href} rel="preconnect" href={href} crossOrigin="anonymous" />
        ))}
        {/* Preload the hero logo (LCP element) */}
        <link rel="preload" as="image" href="/logo.png" fetchPriority="high" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        {children}
        <Toaster />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
