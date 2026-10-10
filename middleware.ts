import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  // Always refresh the session first
  const response = await updateSession(request);

  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') ?? '';

  const isAdminHost = hostname.startsWith('admin.') || hostname.startsWith('localhost');
  let effectivePath = pathname;

  // On admin subdomain (e.g. admin.aniket.one or admin.localhost:3000),
  // map root or subpaths to /admin route group if not already prefixed
  if (hostname.startsWith('admin.')) {
    if (!pathname.startsWith('/admin')) {
      effectivePath = `/admin${pathname === '/' ? '' : pathname}`;
    }
  }

  const isAdminRoute = effectivePath.startsWith('/admin');

  // In production, visiting /admin from non-admin host returns 404
  if (isAdminRoute && !isAdminHost && process.env.NODE_ENV === 'production') {
    return NextResponse.rewrite(new URL('/not-found', request.url));
  }

  // Protect admin routes (except login and auth callbacks)
  if (
    isAdminRoute &&
    effectivePath !== '/admin/login' &&
    !effectivePath.startsWith('/admin/auth')
  ) {
    const { createServerClient } = await import('@supabase/ssr');
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key',
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(
            cookiesToSet: Array<{
              name: string;
              value: string;
            }>
          ) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const ownerEmail = process.env.OWNER_EMAIL;

    if (!user || !ownerEmail || user.email !== ownerEmail) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', effectivePath);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If the host is admin.* and we rewritten the path, rewrite internally
  if (hostname.startsWith('admin.') && effectivePath !== pathname) {
    const rewriteUrl = new URL(effectivePath, request.url);
    return NextResponse.rewrite(rewriteUrl, {
      headers: response.headers,
    });
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
