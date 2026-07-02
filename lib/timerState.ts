export type TimerStatus = "idle" | "running" | "paused";

export interface TimerState {
  status: TimerStatus;
  duration_seconds: number;
  started_at: string | null;
  remaining_seconds: number;
}

export const DEFAULT_DURATION_SECONDS = 1500;

export function defaultTimerState(
  durationSeconds: number = DEFAULT_DURATION_SECONDS
): TimerState {
  return {
    status: "idle",
    duration_seconds: durationSeconds,
    started_at: null,
    remaining_seconds: durationSeconds,
  };
}

export function computeRemainingSeconds(timerState: TimerState): number {
  if (timerState.status !== "running" || !timerState.started_at) {
    return timerState.remaining_seconds;
  }
  const elapsedSeconds = Math.floor(
    (Date.now() - new Date(timerState.started_at).getTime()) / 1000
  );
  return Math.max(timerState.remaining_seconds - elapsedSeconds, 0);
}

export function formatSeconds(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
