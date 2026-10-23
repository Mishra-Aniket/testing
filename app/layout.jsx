import './globals.css';
import './fonts.css';
import SmoothScrollProvider from './components/SmoothScrollProvider';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FDFBF7',
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniket.one';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Aniket Mishra | Full-Stack & AI Systems Engineer',
    template: '%s | Aniket Mishra',
  },
  description: 'Portfolio & engineering showcase of Aniket Mishra. Building high-performance full-stack web products, autonomous AI agent pipelines, and bespoke client architectures.',
  keywords: 'Aniket Mishra, Full-Stack Engineer, AI Systems, Next.js 15, FastAPI, React, Freelance Software Engineer, Autonomous Agents, RAG, Web Development, Prayagraj, India',
  authors: [{ name: 'Aniket Mishra', url: siteUrl }],
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Aniket Mishra',
    title: 'Aniket Mishra | Full-Stack & AI Systems Engineer',
    description: 'High-performance full-stack web products, autonomous AI agent pipelines, and bespoke client architectures.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aniket Mishra — Full-Stack & AI Systems Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aniket Mishra | Full-Stack & AI Systems Engineer',
    description: 'High-performance full-stack web products, autonomous AI agent pipelines, and bespoke client architectures.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FDFBF7] text-[#4A3B33]">
        <SmoothScrollProvider />
        {children}
      </body>
    </html>
  );
}
