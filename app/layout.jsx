import { Merriweather, JetBrains_Mono } from 'next/font/google';
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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FDFBF7',
};

export const metadata = {
  title: 'AI Context Layer for Business Knowledge | Aniket',
  description: 'Give AI agents access to your company knowledge and persistent memory through a single API. Aniket connects the context developers need with the shared, traceable knowledge enterprises rely on.',
  keywords: 'AI context layer, context arithmetic, institutional knowledge graph, context traces, AI memory API, semantic retrieval, agent memory, Aniket',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${merriweather.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300..800;1,300..800&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap"
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
