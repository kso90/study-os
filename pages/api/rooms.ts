import type { NextApiRequest, NextApiResponse } from "next";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

interface RoomResponse {
  id: number;
  name: string;
  subject: string | null;
  participantCount: number;
}

interface RawRoomRow {
  id: number;
  name: string;
  subject: string | null;
  room_participants: { count: number }[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RoomResponse[] | { error: string }>
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  let supabase;
  try {
    supabase = getSupabaseServerClient();
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : "Supabase is not configured" });
    return;
  }

  const { data, error } = await supabase
    .from("rooms")
    .select("id, name, subject, room_participants(count)")
    .order("created_at", { ascending: false });

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  const rooms: RoomResponse[] = ((data ?? []) as unknown as RawRoomRow[]).map((room) => ({
    id: room.id,
    name: room.name,
    subject: room.subject,
    participantCount: room.room_participants?.[0]?.count ?? 0,
  }));

  res.status(200).json(rooms);
}
