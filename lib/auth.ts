import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

const OWNER_EMAIL = process.env.OWNER_EMAIL;

if (!OWNER_EMAIL) {
  console.warn('[auth] OWNER_EMAIL env var is not set. Admin access will be denied to all users.');
}

export async function requireOwner() {
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser();

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
