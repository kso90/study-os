-- There's no auth flow yet, so `rooms.created_by` and
-- `room_participants.user_id` can't legitimately reference a real
-- auth.users row when a room is created. Drop the FK on both so the app can
-- write a fixed placeholder id (see lib/placeholderUser.ts) instead of every
-- room-creation request failing with a foreign-key violation.
--
-- Restore `references auth.users (id)` on both once real auth ships, and
-- backfill/replace placeholder rows with real user ids at that point.

alter table public.rooms
  drop constraint if exists rooms_created_by_fkey;

alter table public.room_participants
  drop constraint if exists room_participants_user_id_fkey;
