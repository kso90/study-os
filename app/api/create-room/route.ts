import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { PLACEHOLDER_USER_ID } from "@/lib/placeholderUser";

export async function POST(request: Request) {
  let name: string;
  let subject: string;
  try {
    const body = await request.json();
    if (typeof body.name !== "string" || body.name.trim().length === 0) {
      return Response.json({ error: "Room name is required." }, { status: 400 });
    }
    if (typeof body.subject !== "string" || body.subject.trim().length === 0) {
      return Response.json({ error: "Subject is required." }, { status: 400 });
    }
    name = body.name.trim();
    subject = body.subject.trim();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  let supabase;
  try {
    supabase = getSupabaseServerClient();
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Supabase isn't configured on the server." },
      { status: 500 }
    );
  }

  // TODO: once auth exists, use the authenticated user's id in place of the placeholder.
  const userId = PLACEHOLDER_USER_ID;

  const { data: room, error: roomError } = await supabase
    .from("rooms")
    .insert({ name, subject, created_by: userId })
    .select()
    .single();

  if (roomError || !room) {
    console.error(roomError);
    return Response.json({ error: "Failed to create room." }, { status: 500 });
  }

  const { error: participantError } = await supabase
    .from("room_participants")
    .insert({ room_id: room.id, user_id: userId });

  if (participantError) {
    console.error(participantError);
    await supabase.from("rooms").delete().eq("id", room.id);
    return Response.json({ error: "Failed to create room." }, { status: 500 });
  }

  return Response.json({ id: room.id });
}
