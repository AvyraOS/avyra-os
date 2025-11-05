import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Avyra OS | Build a $1M+ Business on 80% Autopilot",
  description: "The Founder Freedom System. Scale your business with AI agents, proven systems, and an elite community of founders. Reclaim 20+ hours weekly.",
  openGraph: {
    title: 'Avyra OS | Build a $1M+ Business on 80% Autopilot',
    description: 'The Founder Freedom System. Scale your business with AI agents, proven systems, and an elite community of founders. Reclaim 20+ hours weekly.',
    type: 'website',
    images: [
      {
        url: '/images/Thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Avyra OS - Build a $1M+ Business on 80% Autopilot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avyra OS | Build a $1M+ Business on 80% Autopilot',
    description: 'The Founder Freedom System. Scale your business with AI agents, proven systems, and an elite community of founders. Reclaim 20+ hours weekly.',
    images: ['/images/Thumbnail.png'],
  },
  icons: {
    icon: [
      { url: '/icons/Favicon_Black16.svg', sizes: '16x16', type: 'image/svg+xml' },
      { url: '/icons/Favicon_Black32.svg', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/icons/Favicon_Black48.svg', sizes: '48x48', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icons/Favicon_Black180.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
    other: [
      { url: '/icons/Favicon_Black192.svg', sizes: '192x192', type: 'image/svg+xml' },
      { url: '/icons/Favicon_Black512.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${instrumentSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
