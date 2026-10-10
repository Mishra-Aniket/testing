'use server';

import { requireOwner } from '@/lib/auth';
import { blockSchemaRegistry } from '@/lib/block-schemas';
import { revalidatePath } from 'next/cache';
import type { BlockType, SectionName } from '@/lib/types';
import { checkRateLimit } from '@/lib/rate-limit';
import { headers } from 'next/headers';

// ── Rate Limiting Check for Login ─────────────────────────

export async function checkLoginRateLimit() {
  const headerList = await headers();
  const ip =
    headerList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headerList.get('x-real-ip') ||
    '127.0.0.1';

  return await checkRateLimit(`login:${ip}`, {
    interval: 60 * 1000,
    max: 5,
  });
}

// ── Create Block ──────────────────────────────────────────

export async function createBlock(input: {
  section: SectionName;
  type: BlockType;
  data: Record<string, unknown>;
}) {
  const { supabase } = await requireOwner();

  const schema = blockSchemaRegistry[input.type];
  if (!schema) {
    throw new Error(`Unknown block type: ${input.type}`);
  }

  const parsed = schema.safeParse(input.data);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  // Get the next sort order
  const { data: maxRow } = await supabase
    .from('site_blocks')
    .select('sort_order')
    .eq('section', input.section)
    .is('deleted_at', null)
    .order('sort_order', { ascending: false })
    .limit(1)
    .single();

  const nextOrder = (maxRow?.sort_order ?? -1) + 1;

  const { data, error } = await supabase
    .from('site_blocks')
    .insert({
      section: input.section,
      type: input.type,
      data: parsed.data,
      sort_order: nextOrder,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/');
  revalidatePath('/admin');
  return { data };
}

// ── Update Block ──────────────────────────────────────────

export async function updateBlock(input: {
  id: string;
  type: BlockType;
  data: Record<string, unknown>;
}) {
  const { supabase } = await requireOwner();

  const schema = blockSchemaRegistry[input.type];
  if (!schema) {
    throw new Error(`Unknown block type: ${input.type}`);
  }

  const parsed = schema.safeParse(input.data);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const { error } = await supabase
    .from('site_blocks')
    .update({ data: parsed.data })
    .eq('id', input.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

// ── Toggle Publish ────────────────────────────────────────

export async function togglePublish(id: string, isPublished: boolean) {
  const { supabase } = await requireOwner();

  const { error } = await supabase
    .from('site_blocks')
    .update({ is_published: isPublished })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

// ── Soft Delete ───────────────────────────────────────────

export async function softDeleteBlock(id: string) {
  const { supabase } = await requireOwner();

  const { error } = await supabase
    .from('site_blocks')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

// ── Undo Delete ───────────────────────────────────────────

export async function undoDeleteBlock(id: string) {
  const { supabase } = await requireOwner();

  const { error } = await supabase
    .from('site_blocks')
    .update({ deleted_at: null })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

// ── Reorder Blocks ────────────────────────────────────────

export async function reorderBlocks(
  section: SectionName,
  orderedIds: string[]
) {
  const { supabase } = await requireOwner();

  // Update each block's sort_order
  const updates = orderedIds.map((id, index) =>
    supabase
      .from('site_blocks')
      .update({ sort_order: index })
      .eq('id', id)
  );

  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);

  if (failed?.error) {
    throw new Error(failed.error.message);
  }

  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

// ── Mark Message as Read ──────────────────────────────────

export async function markMessageRead(id: string) {
  const { supabase } = await requireOwner();

  const { error } = await supabase
    .from('contact_messages')
    .update({ read: true })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/admin');
  return { success: true };
}

// ── Create Preview Token ─────────────────────────────────

export async function createPreviewToken() {
  const { supabase } = await requireOwner();

  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour

  const { error } = await supabase
    .from('preview_tokens')
    .insert({ token, expires_at: expiresAt });

  if (error) {
    throw new Error(error.message);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniket.one';
  return { url: `${siteUrl}?preview=${token}` };
}

// ── Upload Image ──────────────────────────────────────────

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
const MAX_SIZE = 2 * 1024 * 1024; // 2 MB

export async function uploadImage(formData: FormData) {
  const { supabase } = await requireOwner();

  const file = formData.get('file') as File | null;
  if (!file) {
    throw new Error('No file provided');
  }

  // Validate MIME type (server side, don't trust extension)
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(`File type ${file.type} is not allowed. Use JPG, PNG, WebP, or SVG.`);
  }

  if (file.size > MAX_SIZE) {
    throw new Error('File too large. Maximum size is 2 MB.');
  }

  // Read first bytes to verify file signature
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  if (!verifyMagicBytes(bytes, file.type)) {
    throw new Error('File content does not match the declared type.');
  }

  const ext = file.type.split('/')[1]?.replace('svg+xml', 'svg') ?? 'bin';
  const fileName = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from('media')
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data: urlData } = supabase.storage
    .from('media')
    .getPublicUrl(fileName);

  return { url: urlData.publicUrl };
}

function verifyMagicBytes(bytes: Uint8Array, mimeType: string): boolean {
  if (bytes.length < 4) return false;

  switch (mimeType) {
    case 'image/jpeg':
      return bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF;
    case 'image/png':
      return bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47;
    case 'image/webp':
      return (
        bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
        bytes.length > 11 && bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
      );
    case 'image/svg+xml': {
      // SVG is text, check for <?xml or <svg
      const text = new TextDecoder().decode(bytes.slice(0, 256));
      return text.includes('<svg') || text.includes('<?xml');
    }
    default:
      return false;
  }
}
