create extension if not exists "pgcrypto";

create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  nickname text not null check (char_length(nickname) between 1 and 24),
  title text not null check (char_length(title) between 1 and 80),
  content text not null check (char_length(content) between 1 and 1000),
  answer text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists wishes_set_updated_at on public.wishes;

create trigger wishes_set_updated_at
before update on public.wishes
for each row
execute function public.set_updated_at();

alter table public.wishes enable row level security;

create policy "Public can read approved wishes"
on public.wishes
for select
using (status = 'approved');

create policy "Service role manages wishes"
on public.wishes
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');
