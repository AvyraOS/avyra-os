import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Newsletter | Avyra OS',
  description: 'Join the Freedom Founders newsletter and get weekly insights on building a profitable brand with automation, AI systems, and founder freedom strategies.',
  keywords: ['newsletter', 'freedom founders', 'business automation', 'AI systems', 'founder insights', 'profitable brand'],
  openGraph: {
    title: 'Newsletter | Avyra OS',
    description: 'Join the Freedom Founders newsletter and get weekly insights on building a profitable brand with automation, AI systems, and founder freedom strategies.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Newsletter | Avyra OS',
    description: 'Join the Freedom Founders newsletter and get weekly insights on building a profitable brand with automation, AI systems, and founder freedom strategies.',
  },
};

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

