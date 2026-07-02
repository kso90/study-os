"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import {
  computeRemainingSeconds,
  defaultTimerState,
  formatSeconds,
  type TimerState,
} from "@/lib/timerState";

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
  timer_state: TimerState | null;
  room_participants: RoomParticipant[];
}

export default function RoomPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [room, setRoom] = useState<Room | null>(null);
  const [timerState, setTimerState] = useState<TimerState>(defaultTimerState());
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [actionPending, setActionPending] = useState(false);
  const [, forceTick] = useState(0);

  useEffect(() => {
    if (!id) return;

    async function fetchRoom() {
      try {
        const response = await fetch(`/api/room/${id}`);
        if (!response.ok) {
          setErrorMessage("Room not found.");
          return;
        }
        const data: Room = await response.json();
        setRoom(data);
        setTimerState(data.timer_state ?? defaultTimerState());
      } catch (error) {
        console.error(error);
        setErrorMessage("Failed to load room.");
      } finally {
        setLoading(false);
      }
    }
    fetchRoom();
  }, [id]);

  // Subscribe to live timer updates broadcast by the /timer endpoint.
  useEffect(() => {
    if (!id || !supabase) return;
    const client = supabase;

    const channel = client.channel(`room:${id}`);
    channel
      .on("broadcast", { event: "timer_update" }, ({ payload }) => {
        setTimerState(payload as TimerState);
      })
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  }, [id]);

  // Re-render every second so the countdown ticks; started_at/remaining_seconds
  // from the server remain the actual source of truth.
  useEffect(() => {
    const interval = setInterval(() => forceTick((tick) => tick + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  async function sendTimerAction(action: "start" | "pause" | "reset") {
    if (!id || actionPending) return;
    setActionPending(true);
    try {
      const response = await fetch(`/api/room/${id}/timer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (response.ok) {
        setTimerState(await response.json());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setActionPending(false);
    }
  }

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

  const remainingSeconds = computeRemainingSeconds(timerState);

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
        <p className="font-gaegu text-5xl font-bold text-ink mb-5">
          {formatSeconds(remainingSeconds)}
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => sendTimerAction("start")}
            disabled={actionPending || timerState.status === "running"}
            className="btn-primary font-gaegu font-bold text-sm px-5 py-2.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ border: "2px solid #333130", background: "#ff6445", color: "#fff8f0" }}
          >
            Start
          </button>
          <button
            type="button"
            onClick={() => sendTimerAction("pause")}
            disabled={actionPending || timerState.status !== "running"}
            className="btn-outline font-gaegu font-bold text-sm px-5 py-2.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Pause
          </button>
          <button
            type="button"
            onClick={() => sendTimerAction("reset")}
            disabled={actionPending}
            className="btn-outline font-gaegu font-bold text-sm px-5 py-2.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
