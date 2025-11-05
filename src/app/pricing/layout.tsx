import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | Avyra OS',
  description: 'Explore Avyra OS pricing plans. Get access to the Founder Freedom System, AI agents, proven systems, and an elite community of founders.',
  openGraph: {
    title: 'Pricing | Avyra OS',
    description: 'Explore Avyra OS pricing plans. Get access to the Founder Freedom System, AI agents, proven systems, and an elite community of founders.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing | Avyra OS',
    description: 'Explore Avyra OS pricing plans. Get access to the Founder Freedom System, AI agents, proven systems, and an elite community of founders.',
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

