-- ============================================================
-- Aniket.one Portfolio – Database Migration
-- ============================================================

-- ── Tables ───────────────────────────────────────────────────

create table if not exists site_blocks (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  type text not null check (type in (
    'hero', 'project', 'service', 'job', 'skill',
    'testimonial', 'faq', 'text', 'cta', 'scene'
  )),
  data jsonb not null default '{}',
  sort_order int not null default 0,
  is_published boolean not null default true,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_site_blocks_section_order
  on site_blocks (section, sort_order);

create table if not exists site_blocks_log (
  id bigint generated always as identity primary key,
  block_id uuid,
  action text not null,
  before jsonb,
  after jsonb,
  changed_by text,
  changed_at timestamptz not null default now()
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  project_type text,
  budget text,
  timeline text,
  message text not null,
  created_at timestamptz default now(),
  read boolean default false
);

create table if not exists preview_tokens (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

-- ── Helper: owner check ──────────────────────────────────────
-- Replace 'OWNER_EMAIL_HERE' with the actual owner email.

create or replace function is_owner()
returns boolean
language sql
stable
security definer
as $$
  select coalesce(
    (auth.jwt() ->> 'email') = 'OWNER_EMAIL_HERE',
    false
  );
$$;

-- ── RLS: site_blocks ─────────────────────────────────────────

alter table site_blocks enable row level security;

create policy "Public can read published blocks"
  on site_blocks for select
  to anon, authenticated
  using (is_published = true and deleted_at is null);

create policy "Owner can read all blocks"
  on site_blocks for select
  to authenticated
  using (is_owner());

create policy "Owner can insert blocks"
  on site_blocks for insert
  to authenticated
  with check (is_owner());

create policy "Owner can update blocks"
  on site_blocks for update
  to authenticated
  using (is_owner())
  with check (is_owner());

create policy "Owner can delete blocks"
  on site_blocks for delete
  to authenticated
  using (is_owner());

-- ── RLS: site_blocks_log ─────────────────────────────────────

alter table site_blocks_log enable row level security;

create policy "Owner can read log"
  on site_blocks_log for select
  to authenticated
  using (is_owner());

create policy "Owner can insert log"
  on site_blocks_log for insert
  to authenticated
  with check (is_owner());

-- System trigger also inserts, so we allow service_role implicitly.
-- No update or delete policies: log is append-only.

-- ── RLS: contact_messages ────────────────────────────────────

alter table contact_messages enable row level security;

create policy "Anyone can submit contact message"
  on contact_messages for insert
  to anon, authenticated
  with check (true);

create policy "Owner can read messages"
  on contact_messages for select
  to authenticated
  using (is_owner());

create policy "Owner can update messages"
  on contact_messages for update
  to authenticated
  using (is_owner())
  with check (is_owner());

-- ── RLS: preview_tokens ──────────────────────────────────────

alter table preview_tokens enable row level security;

create policy "Owner can manage preview tokens"
  on preview_tokens for all
  to authenticated
  using (is_owner())
  with check (is_owner());

create policy "Anon can read valid tokens"
  on preview_tokens for select
  to anon
  using (expires_at > now());

-- ── Audit Log Trigger ────────────────────────────────────────

create or replace function log_site_block_changes()
returns trigger
language plpgsql
security definer
as $$
begin
  if tg_op = 'INSERT' then
    insert into site_blocks_log (block_id, action, after, changed_by)
    values (new.id, 'INSERT', to_jsonb(new), coalesce(auth.jwt() ->> 'email', 'system'));
    return new;
  elsif tg_op = 'UPDATE' then
    -- Update the updated_at timestamp
    new.updated_at = now();
    insert into site_blocks_log (block_id, action, before, after, changed_by)
    values (new.id, 'UPDATE', to_jsonb(old), to_jsonb(new), coalesce(auth.jwt() ->> 'email', 'system'));
    return new;
  elsif tg_op = 'DELETE' then
    insert into site_blocks_log (block_id, action, before, changed_by)
    values (old.id, 'DELETE', to_jsonb(old), coalesce(auth.jwt() ->> 'email', 'system'));
    return old;
  end if;
end;
$$;

create trigger trg_site_blocks_audit
  before insert or update or delete on site_blocks
  for each row execute function log_site_block_changes();

-- ── Storage Bucket ───────────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "Public can read media"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

create policy "Owner can upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media' and is_owner());

create policy "Owner can update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media' and is_owner());

create policy "Owner can delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media' and is_owner());
