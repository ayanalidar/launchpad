import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GuardianX Recruitment & Career Assistance Consultancy",
  description:
    "GuardianX is a premier technology recruitment and career assistance consultancy. We connect skilled professionals with leading roles across every domain of technology, cybersecurity, engineering, cloud, AI/ML, data, design, and more, through our consultancy network.",
  keywords: [
    "technology recruitment consultancy",
    "GuardianX Recruitment",
    "tech jobs India",
    "software engineering recruitment",
    "cybersecurity jobs",
    "cloud DevOps careers",
    "AI ML recruitment",
    "data science jobs",
    "career assistance consultancy",
    "IT recruitment agency",
  ],
  authors: [{ name: "GuardianX Recruitment & Career Assistance Consultancy" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "GuardianX Recruitment & Career Assistance Consultancy",
    description:
      "Premium technology recruitment and career assistance. Connecting skilled professionals with leading roles across every domain of technology.",
    siteName: "GuardianX Recruitment",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GuardianX Recruitment & Career Assistance Consultancy",
    description:
      "Premium technology recruitment and career assistance consultancy.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
