import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QUESTIONS, type Question } from "@/data/questions";
import { BounceButton } from "./BounceButton";
import { SUBJECTS, SUBJECT_EMOJI } from "./meta";

const SEG = 360 / SUBJECTS.length;
const SEG_COLORS = ["var(--primary)", "var(--success)", "var(--warning)", "var(--chart-3)", "var(--chart-5)", "var(--cream)"];
const WHEEL_BG = `conic-gradient(${SUBJECTS.map((_, i) => `${SEG_COLORS[i]} ${i * SEG}deg ${(i + 1) * SEG}deg`).join(", ")})`;

export function SpinWheel({ onPick }: { onPick: (id: number) => void }) {
  const [open, setOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Question | null>(null);

  const spin = () => {
    if (spinning) return;
    const pick = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]!;
    // Land the pointer (top) on the picked question's subject segment.
    const seg = SUBJECTS.indexOf(pick.subject);
    const target = 360 - (seg * SEG + SEG / 2);
    const base = rotation - (rotation % 360);
    setResult(null);
    setSpinning(true);
    setRotation(base + 360 * 5 + target);
    setTimeout(() => {
      setSpinning(false);
      setResult(pick);
    }, 3300);
  };

  return (
    <>
      <div className="glass rounded-2xl p-4">
        <p className="font-bold">🎡 Lucky Draw</p>
        <p className="mt-1 text-xs text-muted-foreground">Can't decide? Let the wheel pick from all 50. 🍀</p>
        <BounceButton
          onClick={() => {
            setOpen(true);
            setResult(null);
          }}
          className="mt-3 w-full rounded-xl bg-warning px-3 py-2.5 text-sm font-bold text-warning-foreground"
        >
          🎯 Spin for a Question
        </BounceButton>
      </div>

      <Dialog open={open} onOpenChange={(o) => !spinning && setOpen(o)}>
        <DialogContent className="border-glass-border bg-popover sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">🎡 Spin for a Question</DialogTitle>
            <DialogDescription className="text-center">Your Lucky Question is...</DialogDescription>
          </DialogHeader>
          <div className="relative mx-auto mt-2 h-60 w-60">
            <div className="absolute left-1/2 top-[-6px] z-10 -translate-x-1/2 text-3xl drop-shadow" aria-hidden>
              🔻
            </div>
            <div
              className="animate-spin-wheel relative h-full w-full rounded-full border-4 border-cream shadow-2xl"
              style={{ background: WHEEL_BG, transform: `rotate(${rotation}deg)` }}
              aria-hidden
            >
              {SUBJECTS.map((s, i) => (
                <span
                  key={s}
                  className="absolute left-1/2 top-1/2 text-2xl"
                  style={{ transform: `translate(-50%, -50%) rotate(${i * SEG + SEG / 2}deg) translateY(-82px)` }}
                >
                  {SUBJECT_EMOJI[s]}
                </span>
              ))}
              <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-background text-2xl">
                🍀
              </span>
            </div>
          </div>
          <div className="min-h-24 text-center" aria-live="polite">
            {result ? (
              <div className="animate-pop-in rounded-xl border border-warning/50 bg-warning/10 p-3">
                <p className="text-xs font-semibold text-warning">Your Lucky Question is...</p>
                <p className="mt-1 font-bold">
                  Q{result.id}. {result.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {SUBJECT_EMOJI[result.subject]} {result.subject} · {result.marks}M · {result.difficulty}
                </p>
              </div>
            ) : (
              <p className="pt-6 text-sm text-muted-foreground">{spinning ? "Spinning... 🌀" : "Tap spin and trust your luck! ⭐"}</p>
            )}
          </div>
          <div className="flex gap-2">
            <BounceButton
              onClick={spin}
              disabled={spinning}
              className="flex-1 rounded-xl bg-primary px-3 py-2.5 text-sm font-bold text-primary-foreground disabled:opacity-50"
            >
              {result ? "🔄 Spin Again" : "🎡 Spin"}
            </BounceButton>
            {result && (
              <BounceButton
                onClick={() => {
                  setOpen(false);
                  onPick(result.id);
                }}
                className="flex-1 rounded-xl bg-success px-3 py-2.5 text-sm font-bold text-success-foreground"
              >
                🎯 Take me there
              </BounceButton>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
