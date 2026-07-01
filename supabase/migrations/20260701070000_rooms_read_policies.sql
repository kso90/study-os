-- Allow the /rooms page (using the anon key, client-side) to read room data.
-- RLS was enabled with zero policies in the previous migration, which means
-- the anon key currently gets an empty result set back, not an error.
--
-- These are public-read policies (no auth check) since this app has no login
-- flow yet. Tighten to `using (auth.uid() is not null)` or similar once
-- authentication exists.

create policy "Public read access on rooms"
  on public.rooms for select
  using (true);

create policy "Public read access on room_participants"
  on public.room_participants for select
  using (true);
