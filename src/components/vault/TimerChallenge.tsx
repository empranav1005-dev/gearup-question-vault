import { useEffect, useState } from "react";
import { Timer, X } from "lucide-react";
import { BounceButton } from "./BounceButton";

export const CHALLENGE_MS = 10 * 60 * 1000;
export const CHALLENGE_TARGET = 5;
export type Challenge = { endsAt: number; done: number };

const fmt = (ms: number) => {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
};

function useRemaining(challenge: Challenge | null, onTimeout: () => void) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!challenge) return;
    setNow(Date.now());
    const t = setInterval(() => {
      const n = Date.now();
      setNow(n);
      if (n >= challenge.endsAt) onTimeout();
    }, 250);
    return () => clearInterval(t);
  }, [challenge, onTimeout]);
  return challenge ? challenge.endsAt - now : CHALLENGE_MS;
}

interface Props {
  challenge: Challenge | null;
  onStart: () => void;
  onCancel: () => void;
  onTimeout: () => void;
}

export function TimerChallenge({ challenge, onStart, onCancel, onTimeout }: Props) {
  const remaining = useRemaining(challenge, onTimeout);
  const pct = challenge ? Math.min(100, (challenge.done / CHALLENGE_TARGET) * 100) : 0;

  return (
    <>
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="font-bold">⏱️ Timer Challenge</p>
          {challenge && (
            <span className="font-display text-xl font-extrabold tabular-nums text-warning">{fmt(remaining)}</span>
          )}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Mark {CHALLENGE_TARGET} questions practised in 10 minutes. 💪
        </p>
        {challenge ? (
          <>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-success transition-all" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="font-semibold">
                <span className="text-success">{challenge.done}</span>/{CHALLENGE_TARGET} done
              </span>
              <button onClick={onCancel} className="font-semibold text-muted-foreground hover:text-foreground">
                Cancel
              </button>
            </div>
          </>
        ) : (
          <BounceButton
            onClick={onStart}
            className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2.5 text-sm font-bold text-primary-foreground"
          >
            <Timer className="h-4 w-4" /> Start 10 Min Challenge
          </BounceButton>
        )}
      </div>

      {challenge && (
        <div className="glass animate-pop-in fixed bottom-4 left-4 z-40 flex items-center gap-3 rounded-2xl bg-popover px-4 py-2.5 print:hidden">
          <span className="text-xl">⏱️</span>
          <div className="leading-tight">
            <p className="font-display text-lg font-extrabold tabular-nums text-warning">{fmt(remaining)}</p>
            <p className="text-[11px] font-semibold">
              {challenge.done}/{CHALLENGE_TARGET} practised
            </p>
          </div>
          <button onClick={onCancel} aria-label="Cancel challenge" className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </>
  );
}
