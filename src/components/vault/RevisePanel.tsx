import { useState } from "react";
import { Check, ChevronDown, Sparkles, X } from "lucide-react";
import type { Question } from "@/data/questions";
import { MAX_PINNED } from "@/lib/vault";
import { cn } from "@/lib/utils";
import { DIFFICULTY_CLASS, SUBJECT_EMOJI } from "./meta";

interface Props {
  items: Question[];
  onPractise: (id: number) => void;
  onRemove: (id: number) => void;
  onClearAll: () => void;
}

export function RevisePanel({ items, onPractise, onRemove, onClearAll }: Props) {
  const [open, setOpen] = useState(true);
  const full = items.length >= MAX_PINNED;

  return (
    <div className="glass flex flex-col overflow-hidden rounded-2xl lg:h-full">
      <div className="border-b border-primary/30 bg-primary/15 px-4 py-2.5 text-center">
        <p className="flex items-center justify-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-primary">
          <Sparkles className="h-3.5 w-3.5" /> Minute 40 Twist - Weak-Topic Review
        </p>
      </div>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center justify-between gap-2 px-4 pt-4 text-left lg:pointer-events-none"
      >
        <h2 className="text-lg font-bold">
          📌 Revise Next - <span className={full ? "text-primary" : "text-success"}>{items.length}/{MAX_PINNED}</span>
        </h2>
        <ChevronDown className={cn("h-5 w-5 transition-transform lg:hidden", open && "rotate-180")} />
      </button>

      <div className={cn("min-h-0 flex-1 flex-col", open ? "flex" : "hidden", "lg:flex")}>
        <p className="px-4 pt-1 text-xs text-muted-foreground">
          Pin unpractised or difficult questions to revise next.
        </p>
        {full && (
          <p className="mx-4 mt-3 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-xs font-semibold text-primary">
            Queue is full - max 5
          </p>
        )}

        <div className="thin-scroll mt-3 min-h-0 flex-1 space-y-3 overflow-y-auto px-4 pb-4 max-lg:max-h-[60vh]">
          {items.length === 0 ? (
            <div className="grid place-items-center rounded-xl border border-dashed border-glass-border px-4 py-10 text-center">
              <span className="levitate text-4xl">🛰️</span>
              <p className="mt-3 text-sm font-semibold">Queue is empty</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Tap “Pin to Revise Next” on any unpractised question.
              </p>
            </div>
          ) : (
            items.map((q) => (
              <div key={q.id} className="rounded-xl border border-primary/30 bg-glass-strong p-3">
                <p className="text-sm font-semibold leading-snug">
                  <span className="text-primary">Q{q.id}.</span> {q.title}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
                  <span className="rounded-full border border-glass-border px-2 py-0.5">
                    {SUBJECT_EMOJI[q.subject]} {q.subject}
                  </span>
                  <span className={cn("rounded-full border px-2 py-0.5 font-semibold", DIFFICULTY_CLASS[q.difficulty])}>
                    {q.difficulty}
                  </span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => onPractise(q.id)}
                    className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg bg-success px-2 py-1.5 text-[11px] font-bold text-success-foreground hover:brightness-110 active:scale-95"
                  >
                    <Check className="h-3.5 w-3.5" /> Mark as Practised & Clear
                  </button>
                  <button
                    onClick={() => onRemove(q.id)}
                    aria-label={`Remove Q${q.id} from Revise Next`}
                    className="inline-flex items-center gap-1 rounded-lg border border-glass-border px-2 py-1.5 text-[11px] font-bold text-muted-foreground hover:border-destructive/50 hover:text-destructive"
                  >
                    Remove <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-glass-border p-4">
          <button
            onClick={onClearAll}
            disabled={items.length === 0}
            className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-all glow-primary hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            ✅ Clear All After Practice
          </button>
        </div>
      </div>
    </div>
  );
}
