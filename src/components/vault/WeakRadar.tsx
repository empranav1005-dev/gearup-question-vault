import type { RadarRow, RadarStatus } from "@/lib/vault";
import { SUBJECT_EMOJI } from "./meta";

const BAR: Record<RadarStatus, string> = {
  weak: "bg-destructive",
  okay: "bg-warning",
  strong: "bg-success",
};
const LABEL: Record<RadarStatus, string> = { weak: "Weak", okay: "Getting there", strong: "Strong" };

export function WeakRadar({ rows }: { rows: RadarRow[] }) {
  return (
    <section aria-label="Know Your Weak Topics" className="glass rounded-2xl p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-bold">🎯 Know Your Weak Topics</h2>
        <div className="flex gap-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-destructive" /> &lt;30%</span>
          <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-warning" /> 30-70%</span>
          <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-success" /> &gt;70%</span>
        </div>
      </div>
      <div className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
        {rows.map((r) => (
          <div key={r.subject}>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold">
                {SUBJECT_EMOJI[r.subject]} {r.subject}
              </span>
              <span className="tabular-nums text-muted-foreground">
                <span className="font-bold text-foreground">{r.done}/{r.total}</span> · {LABEL[r.status]}
              </span>
            </div>
            <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all duration-700 ${BAR[r.status]}`}
                style={{ width: `${Math.max(r.pct, 3)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
