import { getSupabaseServerClient } from "@/lib/supabaseServer";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

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

  const { data: room, error } = await supabase
    .from("rooms")
    .select("*, room_participants(*)")
    .eq("id", id)
    .single();

  if (error || !room) {
    return Response.json({ error: "Room not found" }, { status: 404 });
  }

  return Response.json(room);
}
