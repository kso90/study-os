-- Pomodoro timer state for the /room/[id] live timer. Server (service-role
-- key, via app/api/room/[id]/timer) is the only writer; clients read it
-- through the existing public-read policy on `rooms` and get live updates
-- via Supabase Realtime Broadcast on channel `room:${id}`, not Postgres
-- Changes, so no realtime publication changes are needed here.

alter table public.rooms
  add column if not exists timer_state jsonb not null default jsonb_build_object(
    'status', 'idle',
    'duration_seconds', 1500,
    'started_at', null,
    'remaining_seconds', 1500
  );
