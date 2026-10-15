import { Merriweather, JetBrains_Mono, Great_Vibes } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from './components/SmoothScrollProvider';

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-merriweather',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-cursive',
  display: 'swap',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FDFBF7',
};

export const metadata = {
  title: 'Aniket Mishra | Full-Stack & AI Systems Engineer',
  description: 'Portfolio & engineering showcase of Aniket Mishra. Building high-performance full-stack web products, autonomous AI agent pipelines, and bespoke client architectures.',
  keywords: 'Aniket Mishra, Full-Stack Engineer, AI Systems, Next.js 15, FastAPI, React, Freelance Software Engineer, Autonomous Agents, RAG, Web Development, Prayagraj, India',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${merriweather.variable} ${jetbrainsMono.variable} ${greatVibes.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-[#FDFBF7] text-[#4A3B33]">
        <SmoothScrollProvider />
        {children}
      </body>
    </html>
  );
}
