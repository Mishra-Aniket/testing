'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Layers,
  MessageSquare,
  History,
  Eye,
  LogOut,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Sections', href: '/admin/sections', icon: Layers },
  { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { label: 'Audit Log', href: '/admin/audit', icon: History },
  { label: 'Preview', href: '/admin/preview', icon: Eye },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-bg-card border-r border-border flex flex-col z-40">
      <div className="p-6 border-b border-border">
        <Link href="/admin" className="text-lg font-bold text-text">
          Admin Panel
        </Link>
        <p className="text-text-dim text-xs mt-1">aniket.one</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary-light font-medium'
                  : 'text-text-muted hover:text-text hover:bg-bg-elevated'
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2 text-sm text-text-muted hover:text-text transition-colors"
        >
          <Eye className="w-4 h-4" />
          View Site
        </a>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-text-muted hover:text-red-400 transition-colors mt-1"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
