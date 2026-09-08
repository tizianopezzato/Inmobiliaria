-- Pegá este archivo completo en: Supabase > SQL Editor > New query > Run

create extension if not exists "pgcrypto";

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('venta', 'alquiler')),
  title text not null,
  description text not null,
  square_meters integer not null check (square_meters >= 0),
  bedrooms integer not null check (bedrooms >= 0),
  bathrooms integer not null check (bathrooms >= 0),
  garage boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.property_images (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  storage_path text not null,
  is_main boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists properties_type_idx on public.properties(type);
create index if not exists properties_created_at_idx on public.properties(created_at desc);
create index if not exists property_images_property_id_idx on public.property_images(property_id);

alter table public.properties enable row level security;
alter table public.property_images enable row level security;

drop policy if exists "properties_public_read" on public.properties;
create policy "properties_public_read"
  on public.properties for select
  using (true);

drop policy if exists "properties_auth_insert" on public.properties;
create policy "properties_auth_insert"
  on public.properties for insert
  to authenticated
  with check (true);

drop policy if exists "properties_auth_update" on public.properties;
create policy "properties_auth_update"
  on public.properties for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "properties_auth_delete" on public.properties;
create policy "properties_auth_delete"
  on public.properties for delete
  to authenticated
  using (true);

drop policy if exists "property_images_public_read" on public.property_images;
create policy "property_images_public_read"
  on public.property_images for select
  using (true);

drop policy if exists "property_images_auth_insert" on public.property_images;
create policy "property_images_auth_insert"
  on public.property_images for insert
  to authenticated
  with check (true);

drop policy if exists "property_images_auth_update" on public.property_images;
create policy "property_images_auth_update"
  on public.property_images for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "property_images_auth_delete" on public.property_images;
create policy "property_images_auth_delete"
  on public.property_images for delete
  to authenticated
  using (true);

insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict (id) do nothing;

drop policy if exists "property_images_public_select" on storage.objects;
create policy "property_images_public_select"
  on storage.objects for select
  using (bucket_id = 'property-images');

drop policy if exists "property_images_auth_insert" on storage.objects;
create policy "property_images_auth_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'property-images');

drop policy if exists "property_images_auth_update" on storage.objects;
create policy "property_images_auth_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'property-images')
  with check (bucket_id = 'property-images');

drop policy if exists "property_images_auth_delete" on storage.objects;
create policy "property_images_auth_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'property-images');
