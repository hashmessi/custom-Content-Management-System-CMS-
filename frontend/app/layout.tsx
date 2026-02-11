import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Giakaa | Growth for All',
    template: '%s | Giakaa',
  },
  description: 'AI-first consulting firm delivering high-impact solutions that drive measurable growth across 40+ industries.',
  keywords: ['AI consulting', 'digital transformation', 'enterprise solutions', 'business growth', 'technology consulting'],
  authors: [{ name: 'Giakaa Team' }],
  creator: 'Giakaa',
  publisher: 'Giakaa',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Giakaa',
    title: 'Giakaa | Growth for All',
    description: 'AI-first consulting firm delivering high-impact solutions that drive measurable growth across 40+ industries.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Giakaa - Growth for All',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Giakaa | Growth for All',
    description: 'AI-first consulting firm delivering high-impact solutions.',
    images: ['/og-image.jpg'],
    creator: '@giakaa',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.variable, outfit.variable, "font-sans min-h-screen flex flex-col")}>
        {children}
      </body>
    </html>
  );
}
