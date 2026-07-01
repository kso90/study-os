-- Rooms + room participants for the /social live-rooms feature.
--
-- Assumptions (adjust if wrong before running):
--   * "users.id" refers to Supabase's built-in auth.users(id). If this project
--     has its own public.users or public.profiles table mirroring auth users,
--     change the two `references auth.users (id)` lines below to point there.
--   * RLS is enabled on both tables with NO policies defined yet. Until you add
--     policies, these tables will be inaccessible via the Supabase API (safe
--     default) — add SELECT/INSERT/UPDATE/DELETE policies matching your app's
--     access model before relying on them from the client.

create table if not exists public.rooms (
  id integer generated always as identity primary key,
  name varchar(255) not null,
  subject varchar(255),
  created_at timestamptz not null default now(),
  created_by uuid references auth.users (id) on delete set null
);

create table if not exists public.room_participants (
  id integer generated always as identity primary key,
  room_id integer not null references public.rooms (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  joined_at timestamptz not null default now(),
  unique (room_id, user_id)
);

-- Foreign key columns aren't indexed automatically in Postgres.
create index if not exists idx_rooms_created_by on public.rooms (created_by);
create index if not exists idx_room_participants_room_id on public.room_participants (room_id);
create index if not exists idx_room_participants_user_id on public.room_participants (user_id);

alter table public.rooms enable row level security;
alter table public.room_participants enable row level security;
