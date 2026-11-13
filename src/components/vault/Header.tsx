import { FileText, Flame, Zap } from "lucide-react";
import { DAILY_GOAL, levelFor } from "@/lib/vault";
import { BounceButton } from "./BounceButton";

interface Props {
  practised: number;
  total: number;
  xp: number;
  streak: number;
  today: number;
  onGenerateMock: () => void;
}

const LEVEL_EMOJI = { Beginner: "🌱", Pro: "⚡", Master: "👑" } as const;

function GoalRing({ today }: { today: number }) {
  const done = Math.min(today, DAILY_GOAL);
  const r = 15;
  const c = 2 * Math.PI * r;
  return (
    <div className="glass flex items-center gap-2 rounded-xl px-2.5 py-1.5 shadow-none" title="Daily Goal">
      <svg viewBox="0 0 36 36" className="h-8 w-8 -rotate-90" aria-hidden>
        <circle cx="18" cy="18" r={r} fill="none" strokeWidth="4" className="stroke-muted" />
        <circle
          cx="18"
          cy="18"
          r={r}
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          className="stroke-success transition-all duration-700"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - done / DAILY_GOAL)}
        />
      </svg>
      <div className="leading-tight">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Daily Goal</p>
        <p className="text-xs font-bold">
          <span className="text-success">{done}</span>/{DAILY_GOAL} questions today
        </p>
      </div>
    </div>
  );
}

export function Header({ practised, total, xp, streak, today, onGenerateMock }: Props) {
  const pct = Math.round((practised / total) * 100);
  const level = levelFor(xp);
  return (
    <header className="glass relative z-30 rounded-none border-x-0 border-t-0 sm:rounded-b-2xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="levitate grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-xl glow-primary">
            📚
          </span>
          <div>
            <h1 className="text-xl font-bold leading-none tracking-tight sm:text-2xl">
              Paper<span className="text-gradient-brand">Vault</span>
            </h1>
            <p className="mt-1 text-[11px] text-muted-foreground">Mechanical PYQ Library</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="glass min-w-[170px] rounded-xl px-3 py-1.5 shadow-none">
            <div className="flex items-baseline justify-between gap-3 text-xs">
              <span className="font-semibold">
                <span className="text-success">{practised}</span> / {total} Practised
              </span>
              <span className="font-bold text-success">{pct}%</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-success transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <div className="glass flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold shadow-none">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-primary">{xp} XP</span>
            <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-[11px] text-primary">
              {LEVEL_EMOJI[level]} {level}
            </span>
          </div>
          <div className="glass flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold shadow-none">
            <Flame className="h-4 w-4 text-primary" /> {streak} day{streak === 1 ? "" : "s"}
          </div>
          <GoalRing today={today} />
          <BounceButton
            onClick={onGenerateMock}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2.5 text-sm font-bold text-primary-foreground glow-primary transition hover:brightness-110"
          >
            <FileText className="h-4 w-4" /> Generate Mock Paper
          </BounceButton>
        </div>
      </div>
    </header>
  );
}
