import { BookOpen, Check, Pin, PinOff, RotateCcw } from "lucide-react";
import type { MouseEvent } from "react";
import type { Question } from "@/data/questions";
import type { Reaction, ReactionCounts } from "@/lib/vault";
import { cn } from "@/lib/utils";
import { BounceButton } from "./BounceButton";
import { DIFFICULTY_INK, SUBJECT_EMOJI, TAG_EMOJI, TAG_INK } from "./meta";

interface Props {
  q: Question;
  index: number;
  practised: boolean;
  pinned: boolean;
  celebrate: boolean;
  highlighted: boolean;
  reactions: ReactionCounts | undefined;
  onToggle: () => void;
  onPin: () => void;
  onUnpin: () => void;
  onOpen: () => void;
  onReact: (r: Reaction) => void;
}

const chip = "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold";
const REACTIONS: { key: Reaction; emoji: string; label: string }[] = [
  { key: "easy", emoji: "😌", label: "Easy" },
  { key: "hard", emoji: "😤", label: "Hard" },
  { key: "confusing", emoji: "🤔", label: "Confusing" },
];

const stop = (fn: () => void) => (e: MouseEvent) => {
  e.stopPropagation();
  fn();
};

export function QuestionCard(p: Props) {
  const { q, index, practised, pinned } = p;
  return (
    <article
      id={`q-${q.id}`}
      className="levitate scroll-mt-6"
      style={{ animationDelay: `${-(index % 7) * 0.85}s` }}
      aria-label={`Question ${q.id}`}
    >
      <div
        onClick={p.onOpen}
        className={cn(
          "cream-card group relative h-full cursor-pointer rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl sm:p-5",
          practised && "border-success bg-mint! ring-2 ring-success/60",
          pinned && !practised && "ring-2 ring-primary/70",
          p.celebrate && "animate-card-pop",
          p.highlighted && "animate-highlight ring-4 ring-warning",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <span
            className={cn(
              "grid h-9 min-w-9 shrink-0 place-items-center rounded-lg px-2 font-display text-sm font-bold",
              practised ? "bg-success text-success-foreground" : "bg-background text-cream",
            )}
          >
            Q{q.id}
          </span>
          <div className="flex flex-wrap justify-end gap-1.5">
            {practised && (
              <span className={cn(chip, "border-success bg-success text-success-foreground")}>
                <Check className="h-3 w-3" /> Practised
              </span>
            )}
            {pinned && (
              <span className={cn(chip, "border-primary bg-primary text-primary-foreground")}>
                <Pin className="h-3 w-3" /> Pinned
              </span>
            )}
            <span className={cn(chip, TAG_INK[q.tag])}>
              {TAG_EMOJI[q.tag]} {q.tag}
            </span>
          </div>
        </div>

        <h3 className="mt-3 text-base font-semibold leading-snug sm:text-lg">
          <button onClick={stop(p.onOpen)} className="text-left hover:text-ink-primary hover:underline underline-offset-4">
            {q.title}
          </button>
        </h3>

        <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
          <span className={cn(chip, "border-cream-border bg-background/5 text-cream-foreground")}>
            {SUBJECT_EMOJI[q.subject]} {q.subject}
          </span>
          <span className={cn(chip, "border-cream-border text-cream-muted")}>🎓 {q.semester}</span>
          <span className={cn(chip, "border-cream-border text-cream-muted")}>📅 {q.year}</span>
          <span className={cn(chip, "border-warning/60 bg-warning/25 text-cream-foreground")}>⭐ {q.marks}M</span>
          <span className={cn(chip, DIFFICULTY_INK[q.difficulty])}>{q.difficulty}</span>
        </div>

        <p className="mt-3 flex items-center gap-1.5 text-xs text-cream-muted">
          <BookOpen className="h-3.5 w-3.5 shrink-0" />
          <span>
            📖 {q.book} · Chapter: {q.chapter}
          </span>
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <BounceButton
            onClick={stop(p.onToggle)}
            aria-pressed={practised}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold",
              practised
                ? "border border-ink-success/50 bg-cream text-ink-success"
                : "bg-success text-success-foreground",
            )}
          >
            {practised ? <RotateCcw className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
            {practised ? "Unmark Practised" : "Mark as Practised"}
          </BounceButton>
          {!practised &&
            (pinned ? (
              <BounceButton
                onClick={stop(p.onUnpin)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-ink-primary/50 px-3 py-2 text-xs font-bold text-ink-primary"
              >
                <PinOff className="h-3.5 w-3.5" /> Unpin
              </BounceButton>
            ) : (
              <BounceButton
                onClick={stop(p.onPin)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground"
              >
                <Pin className="h-3.5 w-3.5" /> Pin to Revise Next
              </BounceButton>
            ))}
          <button
            onClick={stop(p.onOpen)}
            className="ml-auto text-xs font-bold text-ink-primary underline-offset-4 hover:underline"
          >
            📘 Answer guide →
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-cream-border pt-3">
          <span className="mr-1 text-[11px] font-semibold text-cream-muted">How was it?</span>
          {REACTIONS.map((r) => (
            <BounceButton
              key={r.key}
              onClick={stop(() => p.onReact(r.key))}
              aria-label={`React ${r.label}`}
              className="inline-flex items-center gap-1 rounded-full border border-cream-border bg-cream px-2 py-0.5 text-[11px] font-semibold text-cream-foreground"
            >
              <span aria-hidden>{r.emoji}</span> {r.label}
              <span className="rounded-full bg-background/10 px-1.5 tabular-nums">{p.reactions?.[r.key] ?? 0}</span>
            </BounceButton>
          ))}
        </div>
      </div>
    </article>
  );
}
