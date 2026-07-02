"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

export default function RoomPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRoom() {
      try {
        const response = await fetch(`/api/room/${id}`);
        if (!response.ok) {
          setErrorMessage("Room not found.");
          return;
        }
        setRoom(await response.json());
      } catch (error) {
        console.error(error);
        setErrorMessage("Failed to load room.");
      } finally {
        setLoading(false);
      }
    }
    fetchRoom();
  }, [id]);

  if (loading) {
    return (
      <div className="animate-fade-up max-w-2xl mx-auto">
        <div className="bento-box rounded-[24px] bg-parchment p-8 text-center">
          <p className="font-nunito text-sm font-semibold text-ink/50">Loading room…</p>
        </div>
      </div>
    );
  }

  if (errorMessage || !room) {
    return (
      <div className="animate-fade-up max-w-2xl mx-auto">
        <div className="bento-box rounded-[24px] p-8 text-center" style={{ background: "#e2ab9a" }}>
          <p className="font-nunito text-sm font-bold text-ink">{errorMessage ?? "Room not found."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-up max-w-2xl mx-auto flex flex-col gap-6">
      <div className="bento-box rounded-[24px] bg-parchment p-6">
        <h1 className="font-gaegu text-3xl font-bold text-ink mb-1">{room.name}</h1>
        {room.subject && (
          <p className="font-nunito text-sm font-semibold text-ink/60">{room.subject}</p>
        )}
      </div>

      <div className="bento-box rounded-[20px] bg-parchment p-6">
        <h2 className="font-gaegu text-xl font-bold text-ink mb-3">
          Participants ({room.room_participants.length})
        </h2>
        {room.room_participants.length === 0 ? (
          <p className="font-nunito text-sm font-semibold text-ink/50">
            No one&apos;s joined yet — invite someone to get started.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {room.room_participants.map((participant) => (
              <li
                key={participant.id}
                className="font-nunito text-sm font-semibold text-ink bg-linen/60 rounded-xl px-3 py-2"
              >
                {participant.user_id}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bento-box rounded-[20px] bg-parchment p-6 text-center">
        <h2 className="font-gaegu text-xl font-bold text-ink mb-2">Pomodoro Timer</h2>
        <p className="font-nunito text-sm font-semibold text-ink/50">
          Synced timer coming soon — this is a placeholder.
        </p>
      </div>
    </div>
  );
}
