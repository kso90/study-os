// Used for `created_by` / `room_participants.user_id` until real auth ships.
// See supabase/migrations/20260701100000_relax_room_user_fks.sql — the FK to
// auth.users was dropped on both columns so this fixed value can be written
// without a matching row existing there.
export const PLACEHOLDER_USER_ID = "00000000-0000-0000-0000-000000000000";
