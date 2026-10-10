import { createServerSupabaseClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { SiteBlock, SectionName } from '@/lib/types';

export async function validatePreviewToken(token: string): Promise<boolean> {
  if (!token) return false;
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('preview_tokens')
      .select('id')
      .eq('token', token)
      .gt('expires_at', new Date().toISOString())
      .single();

    return !error && !!data;
  } catch {
    return false;
  }
}

export async function getPublishedBlocks(section?: SectionName): Promise<SiteBlock[]> {
  const supabase = await createServerSupabaseClient();

  let query = supabase
    .from('site_blocks')
    .select('*')
    .eq('is_published', true)
    .is('deleted_at', null)
    .order('sort_order', { ascending: true });

  if (section) {
    query = query.eq('section', section);
  }

  const { data, error } = await query;

  if (error) {
    console.error('[getPublishedBlocks]', error.message);
    return [];
  }

  return (data ?? []) as SiteBlock[];
}

export async function getBlocksBySection(options?: {
  includeUnpublished?: boolean;
}): Promise<Record<string, SiteBlock[]>> {
  let blocks: SiteBlock[] = [];

  if (options?.includeUnpublished) {
    // When previewing unpublished blocks, we use admin client to bypass the public-only RLS filter safely
    try {
      const adminClient = createAdminClient();
      const { data, error } = await adminClient
        .from('site_blocks')
        .select('*')
        .is('deleted_at', null)
        .order('sort_order', { ascending: true });

      if (!error && data) {
        blocks = data as SiteBlock[];
      }
    } catch {
      // If service role not configured, fallback to standard client
      blocks = await getAllBlocks();
    }
  } else {
    blocks = await getPublishedBlocks();
  }

  const grouped: Record<string, SiteBlock[]> = {};

  for (const block of blocks) {
    if (!grouped[block.section]) {
      grouped[block.section] = [];
    }
    grouped[block.section]!.push(block);
  }

  return grouped;
}

export async function getAllBlocks(): Promise<SiteBlock[]> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('site_blocks')
    .select('*')
    .is('deleted_at', null)
    .order('section')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getAllBlocks]', error.message);
    return [];
  }

  return (data ?? []) as SiteBlock[];
}

export async function getBlockById(id: string): Promise<SiteBlock | null> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('site_blocks')
    .select('*')
    .eq('id', id)
    .is('deleted_at', null)
    .single();

  if (error) {
    return null;
  }

  return data as SiteBlock;
}
