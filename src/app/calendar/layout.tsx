import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schedule Your Discovery Call | Avyra OS',
  description: 'Ready to scale your business on autopilot? Book a call to discover how the Founder Freedom System can help you reclaim 20+ hours weekly.',
  keywords: [
    'founder freedom',
    'business automation',
    'AI agents',
    'scale business',
    'founder systems',
    'business operating system',
    'productivity',
    'automation'
  ],
  openGraph: {
    title: 'Schedule Your Discovery Call | Avyra OS',
    description: 'Ready to scale your business on autopilot? Book a call to discover how the Founder Freedom System can help you reclaim 20+ hours weekly.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schedule Your Discovery Call | Avyra OS',
    description: 'Ready to scale your business on autopilot? Book a call to discover how the Founder Freedom System can help you reclaim 20+ hours weekly.',
  },
};

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
