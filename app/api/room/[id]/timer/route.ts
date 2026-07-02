import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { defaultTimerState, type TimerState } from "@/lib/timerState";

type TimerAction = "start" | "pause" | "reset";

function nextTimerState(current: TimerState, action: TimerAction): TimerState {
  const now = Date.now();

  if (action === "start") {
    if (current.status === "running") return current;
    return {
      ...current,
      status: "running",
      started_at: new Date(now).toISOString(),
      remaining_seconds:
        current.status === "paused" ? current.remaining_seconds : current.duration_seconds,
    };
  }

  if (action === "pause") {
    if (current.status !== "running" || !current.started_at) return current;
    const elapsedSeconds = Math.floor(
      (now - new Date(current.started_at).getTime()) / 1000
    );
    return {
      ...current,
      status: "paused",
      started_at: null,
      remaining_seconds: Math.max(current.remaining_seconds - elapsedSeconds, 0),
    };
  }

  return defaultTimerState(current.duration_seconds);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let action: TimerAction;
  try {
    const body = await request.json();
    if (body.action !== "start" && body.action !== "pause" && body.action !== "reset") {
      return Response.json({ error: "Invalid action" }, { status: 400 });
    }
    action = body.action;
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
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

  const { data: room, error: fetchError } = await supabase
    .from("rooms")
    .select("timer_state")
    .eq("id", id)
    .single();

  if (fetchError || !room) {
    return Response.json({ error: "Room not found" }, { status: 404 });
  }

  const currentState: TimerState = room.timer_state ?? defaultTimerState();
  const newState = nextTimerState(currentState, action);

  const { error: updateError } = await supabase
    .from("rooms")
    .update({ timer_state: newState })
    .eq("id", id);

  if (updateError) {
    console.error(updateError);
    return Response.json({ error: "Failed to update timer" }, { status: 500 });
  }

  const channel = supabase.channel(`room:${id}`);
  try {
    await channel.httpSend("timer_update", newState);
  } finally {
    await supabase.removeChannel(channel);
  }

  return Response.json(newState);
}
