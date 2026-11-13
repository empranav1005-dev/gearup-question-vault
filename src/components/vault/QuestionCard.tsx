import { BookOpen, Check, Pin, PinOff, RotateCcw } from "lucide-react";
import type { Question } from "@/data/questions";
import { cn } from "@/lib/utils";
import { DIFFICULTY_CLASS, SUBJECT_EMOJI, TAG_CLASS, TAG_EMOJI } from "./meta";

interface Props {
  q: Question;
  index: number;
  practised: boolean;
  pinned: boolean;
  onToggle: () => void;
  onPin: () => void;
  onUnpin: () => void;
  onGuide: () => void;
}

const chip = "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold";

export function QuestionCard({ q, index, practised, pinned, onToggle, onPin, onUnpin, onGuide }: Props) {
  return (
    <article
      className="levitate"
      style={{ animationDelay: `${-(index % 7) * 0.85}s` }}
      aria-label={`Question ${q.id}`}
    >
      <div
        className={cn(
          "glass group relative h-full rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 sm:p-5",
          practised && "border-success/50 bg-success/10 glow-success",
          pinned && !practised && "border-primary/50 glow-primary",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <span
            className={cn(
              "grid h-9 min-w-9 shrink-0 place-items-center rounded-lg px-2 font-display text-sm font-bold",
              practised ? "bg-success text-success-foreground" : "bg-primary/15 text-primary",
            )}
          >
            Q{q.id}
          </span>
          <div className="flex flex-wrap justify-end gap-1.5">
            {practised && (
              <span className={cn(chip, "border-success/50 bg-success/15 text-success")}>
                <Check className="h-3 w-3" /> Practised
              </span>
            )}
            {pinned && (
              <span className={cn(chip, "border-primary/50 bg-primary/15 text-primary")}>
                <Pin className="h-3 w-3" /> Pinned
              </span>
            )}
            <span className={cn(chip, TAG_CLASS[q.tag])}>
              {TAG_EMOJI[q.tag]} {q.tag}
            </span>
          </div>
        </div>

        <h3 className="mt-3 text-base font-semibold leading-snug sm:text-lg">{q.title}</h3>

        <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
          <span className={cn(chip, "border-glass-border bg-glass-strong text-foreground")}>
            {SUBJECT_EMOJI[q.subject]} {q.subject}
          </span>
          <span className={cn(chip, "border-glass-border bg-glass text-muted-foreground")}>{q.semester}</span>
          <span className={cn(chip, "border-glass-border bg-glass text-muted-foreground")}>📅 {q.year}</span>
          <span className={cn(chip, "border-glass-border bg-glass text-muted-foreground")}>📝 {q.marks}M</span>
          <span className={cn(chip, DIFFICULTY_CLASS[q.difficulty])}>{q.difficulty}</span>
        </div>

        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <BookOpen className="h-3.5 w-3.5 shrink-0" />
          <span>
            {q.book} · Chapter: {q.chapter}
          </span>
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            onClick={onToggle}
            aria-pressed={practised}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-all active:scale-95",
              practised
                ? "border border-success/50 bg-transparent text-success hover:bg-success/10"
                : "bg-success text-success-foreground hover:brightness-110",
            )}
          >
            {practised ? <RotateCcw className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
            {practised ? "Unmark Practised" : "Mark as Practised"}
          </button>
          {!practised &&
            (pinned ? (
              <button
                onClick={onUnpin}
                className="inline-flex items-center gap-1.5 rounded-lg border border-primary/50 px-3 py-2 text-xs font-bold text-primary transition-all hover:bg-primary/10 active:scale-95"
              >
                <PinOff className="h-3.5 w-3.5" /> Unpin
              </button>
            ) : (
              <button
                onClick={onPin}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground transition-all hover:brightness-110 active:scale-95"
              >
                <Pin className="h-3.5 w-3.5" /> Pin to Revise Next
              </button>
            ))}
          <button
            onClick={onGuide}
            className="ml-auto text-xs font-semibold text-primary underline-offset-4 hover:underline"
          >
            Answer guide →
          </button>
        </div>
      </div>
    </article>
  );
}
