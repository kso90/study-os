"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UsersIcon } from "../../components/icons";

interface Room {
  id: number;
  name: string;
  subject: string;
  participantCount: number;
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/rooms")
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((data: Room[]) => {
        if (!cancelled) {
          setRooms(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="animate-fade-up max-w-2xl mx-auto">
      <h1 className="font-gaegu text-3xl font-bold text-ink mb-1">Study Rooms</h1>
      <p className="font-nunito text-sm font-semibold text-ink/60 mb-6">
        Jump into a live room and focus alongside other students.
      </p>

      {status === "loading" && (
        <p className="font-nunito text-sm font-semibold text-ink/50">Loading rooms…</p>
      )}

      {status === "error" && (
        <p className="font-nunito text-sm font-semibold text-coral">
          Couldn&apos;t load rooms right now. Try again shortly.
        </p>
      )}

      {status === "ready" && (
        <div className="flex flex-col gap-3">
          {rooms.map((room) => (
            <div key={room.id} className="bento-box rounded-[20px] bg-parchment p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="font-gaegu font-bold text-lg text-ink truncate">{room.name}</div>
                <div className="font-nunito text-xs font-semibold text-ink/55 flex items-center gap-3 mt-0.5">
                  <span>{room.subject}</span>
                  <span className="flex items-center gap-1">
                    <UsersIcon size={13} color="#333130" strokeWidth={2} />
                    {room.participantCount} studying
                  </span>
                </div>
              </div>

              <Link
                href={`/room/${room.id}`}
                className="btn-primary font-gaegu font-bold text-sm px-5 py-2 rounded-full flex-shrink-0"
                style={{ border: "2px solid #333130", background: "#ff6445", color: "#fff8f0" }}
              >
                Join
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
