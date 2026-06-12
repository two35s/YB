-- Y/B — contact form storage
-- Run this in the Supabase SQL editor (or `supabase db push` if you use the CLI).

create table if not exists public.contact_messages (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null,
  email        text not null,
  project_type text,
  message      text not null,
  handled      boolean not null default false
);

-- Lock the table down: RLS on, no public policies.
-- Only the service-role key (used by the API route) can read/write.
alter table public.contact_messages enable row level security;

comment on table public.contact_messages is
  'Inbound messages from the Y/B website contact form. Written by the /api/contact route via service role.';
