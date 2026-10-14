import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

const OWNER_EMAIL = process.env.OWNER_EMAIL;

if (!OWNER_EMAIL) {
  console.warn('[auth] OWNER_EMAIL env var is not set. Admin access will be denied to all users.');
}

export async function requireOwner() {
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  // Allow dev testing bypass only in development mode
  if (process.env.NODE_ENV === 'development') {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    if (cookieStore.get('dev_owner_session')?.value === 'true') {
      const mockOwner = {
        id: 'dev-owner-id',
        email: OWNER_EMAIL || 'owner@aniket.one',
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      };
      return { supabase, user: mockOwner as unknown as typeof user };
    }
  }

  if (error || !user || !OWNER_EMAIL || user.email !== OWNER_EMAIL) {
    redirect('/admin/login');
  }

  return { supabase, user };
}

export async function getOptionalUser() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  return { supabase, user };
}

export function isOwnerEmail(email: string | undefined): boolean {
  return !!OWNER_EMAIL && !!email && email === OWNER_EMAIL;
}
