import './globals.css';
import SmoothScrollProvider from './components/SmoothScrollProvider';

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
    <html lang="en">
      <body className="min-h-screen bg-[#FDFBF7] text-[#4A3B33]">
        <SmoothScrollProvider />
        {children}
      </body>
    </html>
  );
}
