"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UsersIcon } from "../../components/icons";
import { supabase } from "@/lib/supabaseClient";

interface RoomParticipant {
  id: number;
  room_id: number;
  user_id: string;
  joined_at: string;
}

interface Room {
  id: number;
  name: string;
  subject: string | null;
  created_at: string;
  created_by: string | null;
  room_participants: RoomParticipant[];
}

export default function RoomsPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRooms() {
      if (!supabase) {
        setErrorMessage(
          "Supabase isn't configured — add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local."
        );
        setLoading(false);
        return;
      }

      const { data: rooms, error } = await supabase
        .from("rooms")
        .select("*, room_participants(*)");

      if (error) {
        console.error(error);
        setErrorMessage("Failed to load rooms");
      } else {
        setRooms(rooms ?? []);
      }
      setLoading(false);
    }
    fetchRooms();
  }, []);

  return (
    <div className="animate-fade-up max-w-2xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-gaegu text-3xl font-bold text-ink mb-1">Study Rooms</h1>
          <p className="font-nunito text-sm font-semibold text-ink/60">
            Jump into a live room and focus alongside other students.
          </p>
        </div>
        <button
          type="button"
          className="btn-primary font-gaegu font-bold text-sm px-5 py-2.5 rounded-full flex-shrink-0"
          style={{ border: "2px solid #333130", background: "#ff6445", color: "#fff8f0" }}
        >
          + Create Room
        </button>
      </div>

      {loading && (
        <div className="bento-box rounded-[20px] bg-parchment p-6 text-center">
          <p className="font-nunito text-sm font-semibold text-ink/50">Loading rooms…</p>
        </div>
      )}

      {!loading && errorMessage && (
        <div className="bento-box rounded-[20px] p-6 text-center" style={{ background: "#e2ab9a" }}>
          <p className="font-nunito text-sm font-bold text-ink">{errorMessage}</p>
        </div>
      )}

      {!loading && !errorMessage && rooms.length === 0 && (
        <div className="bento-box rounded-[20px] bg-parchment p-6 text-center">
          <p className="font-nunito text-sm font-semibold text-ink/50">
            No rooms yet — start one to get the first study session going.
          </p>
        </div>
      )}

      {!loading && !errorMessage && rooms.length > 0 && (
        <div className="flex flex-col gap-3">
          {rooms.map((room) => (
            <div key={room.id} className="bento-box rounded-[20px] bg-parchment p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="font-gaegu font-bold text-lg text-ink truncate">{room.name}</div>
                <div className="font-nunito text-xs font-semibold text-ink/55 flex items-center gap-3 mt-0.5">
                  <span>{room.subject}</span>
                  <span className="flex items-center gap-1">
                    <UsersIcon size={13} color="#333130" strokeWidth={2} />
                    {room.room_participants.length} studying
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => router.push(`/room/${room.id}`)}
                className="btn-primary font-gaegu font-bold text-sm px-5 py-2 rounded-full flex-shrink-0"
                style={{ border: "2px solid #333130", background: "#ff6445", color: "#fff8f0" }}
              >
                Join
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
