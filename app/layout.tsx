import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Aniket Mishra – Full-Stack & AI Engineer',
    template: '%s | Aniket Mishra',
  },
  description:
    'Freelance full-stack and AI engineer. I build web applications, APIs, and AI-powered products. Open for freelance work.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniket.one'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Aniket Mishra',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="min-h-screen bg-bg text-text font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
