import { Flame, Zap } from "lucide-react";

interface Props {
  practised: number;
  total: number;
  xp: number;
  streak: number;
}

export function Header({ practised, total, xp, streak }: Props) {
  const pct = Math.round((practised / total) * 100);
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

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="glass min-w-[180px] rounded-xl px-3 py-1.5 shadow-none">
            <div className="flex items-baseline justify-between gap-3 text-xs">
              <span className="font-semibold">
                <span className="text-success">{practised}</span> / {total} Practised
              </span>
              <span className="font-bold text-success">{pct}%</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-success transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
          <div className="glass flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold text-primary shadow-none">
            <Zap className="h-4 w-4" /> {xp} XP
          </div>
          <div className="glass flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold shadow-none">
            <Flame className="h-4 w-4 text-primary" /> {streak} day{streak === 1 ? "" : "s"}
          </div>
        </div>
      </div>
    </header>
  );
}
