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
  title: "GuardianX Academy — Cybersecurity Recruitment & Career Assistance",
  description:
    "GuardianX Academy is a premier cybersecurity recruitment and career assistance consultancy. We connect skilled professionals with leading cybersecurity roles through our consultancy network.",
  keywords: [
    "cybersecurity recruitment",
    "GuardianX Academy",
    "cybersecurity jobs",
    "SOC analyst jobs",
    "penetration testing careers",
    "GRC jobs",
    "cybersecurity consultancy India",
    "infosec careers",
  ],
  authors: [{ name: "GuardianX Academy" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "GuardianX Academy — Cybersecurity Recruitment & Career Assistance",
    description:
      "Premium cybersecurity recruitment and career assistance. Connect with leading roles through our consultancy network.",
    url: "https://academy.guardianx.cloud",
    siteName: "GuardianX Academy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GuardianX Academy — Cybersecurity Recruitment",
    description:
      "Premium cybersecurity recruitment and career assistance consultancy.",
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
