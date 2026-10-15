import './globals.css';
import SmoothScrollProvider from './components/SmoothScrollProvider';

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen bg-[#FDFBF7] text-[#4A3B33]">
        <SmoothScrollProvider />
        {children}
      </body>
    </html>
  );
}
