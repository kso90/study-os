-- Allow the /create-room page (using the anon key, client-side) to insert
-- new rooms. Without this, the RLS-enabled `rooms` table silently rejects
-- inserts from the anon key (empty error, not a thrown exception).
--
-- Public-insert policy (no auth check) since this app has no login flow yet,
-- matching the public-read policies added in the previous migration.
-- Tighten to `with check (auth.uid() is not null)` and set `created_by` from
-- the session once authentication exists.

create policy "Public insert access on rooms"
  on public.rooms for insert
  with check (true);
