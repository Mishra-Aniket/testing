-- Newsletter subscribers
create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz default now()
);

alter table subscribers enable row level security;

create policy "Anyone can subscribe"
  on subscribers for insert
  to anon, authenticated
  with check (true);
