"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function CreateRoomPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!supabase) {
      setErrorMessage(
        "Supabase isn't configured — add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local."
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const { data, error } = await supabase
      .from("rooms")
      .insert({ name: name.trim(), subject: subject.trim() || null })
      .select()
      .single();

    if (error) {
      console.error(error);
      setErrorMessage("Failed to create room");
      setIsSubmitting(false);
      return;
    }

    router.push(`/room/${data.id}`);
  }

  return (
    <div className="animate-fade-up max-w-lg mx-auto">
      <h1 className="font-gaegu text-3xl font-bold text-ink mb-1">Create a Room</h1>
      <p className="font-nunito text-sm font-semibold text-ink/60 mb-6">
        Start a live room and invite others to focus alongside you.
      </p>

      <form onSubmit={handleSubmit} className="bento-box rounded-[20px] bg-parchment p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="room-name" className="font-nunito text-xs font-bold text-ink/70">
            Room name
          </label>
          <input
            id="room-name"
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Late-night calc study"
            className="font-nunito text-sm rounded-xl px-3 py-2 bg-linen/60 border border-ink/15 text-ink placeholder:text-ink/40 focus:outline-none focus:border-ink/40"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="room-subject" className="font-nunito text-xs font-bold text-ink/70">
            Subject <span className="text-ink/40 font-semibold">(optional)</span>
          </label>
          <input
            id="room-subject"
            type="text"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            placeholder="e.g. Calculus II"
            className="font-nunito text-sm rounded-xl px-3 py-2 bg-linen/60 border border-ink/15 text-ink placeholder:text-ink/40 focus:outline-none focus:border-ink/40"
          />
        </div>

        {errorMessage && (
          <p className="font-nunito text-sm font-bold text-ink bg-blush rounded-xl px-3 py-2">
            {errorMessage}
          </p>
        )}

        <div className="flex items-center gap-3 mt-2">
          <button
            type="submit"
            disabled={isSubmitting || name.trim().length === 0}
            className="btn-primary font-gaegu font-bold text-sm px-5 py-2.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ border: "2px solid #333130", background: "#ff6445", color: "#fff8f0" }}
          >
            {isSubmitting ? "Creating…" : "Create Room"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/rooms")}
            className="btn-outline font-gaegu font-bold text-sm px-5 py-2.5 rounded-full"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
