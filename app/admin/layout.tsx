import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Admin Panel',
    template: '%s | Admin',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg">
      {children}
    </div>
  );
}
