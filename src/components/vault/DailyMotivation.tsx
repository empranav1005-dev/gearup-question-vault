import { useEffect, useState } from "react";
import { BounceButton } from "./BounceButton";

/** Only these supplied quotes may be shown. */
const QUOTES = [
  { who: "APJ Abdul Kalam", emoji: "🚀", text: "Dream is not that which you see while sleeping, it is something that does not let you sleep." },
  { who: "APJ Abdul Kalam", emoji: "🚀", text: "If you want to shine like a sun, first burn like a sun." },
  { who: "Thomas Edison", emoji: "💡", text: "Genius is 1% inspiration and 99% perspiration." },
  { who: "Albert Einstein", emoji: "💡", text: "Imagination is more important than knowledge." },
  { who: "Elon Musk", emoji: "🚀", text: "When something is important enough, you do it even if the odds are not in your favour." },
  { who: "Sachin Tendulkar", emoji: "🏏", text: "People throw stones at you and you convert them into milestones." },
];

const ROTATE_MS = 10_000;

export function DailyMotivation() {
  const [i, setI] = useState(0);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setI((n) => (n + 1) % QUOTES.length), ROTATE_MS);
    return () => clearTimeout(t);
  }, [i, tick]);
  const q = QUOTES[i]!;

  return (
    <section aria-label="Daily Motivation" className="glass relative overflow-hidden rounded-2xl p-5">
      <div className="pointer-events-none absolute -right-6 -top-6 text-8xl opacity-10" aria-hidden>
        ⭐
      </div>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold">🔥 Daily Motivation</h2>
        <div className="flex gap-1" aria-hidden>
          {QUOTES.map((_, n) => (
            <span key={n} className={`h-1.5 rounded-full transition-all ${n === i ? "w-5 bg-warning" : "w-1.5 bg-muted"}`} />
          ))}
        </div>
      </div>
      <div key={i} className="animate-fade-up mt-4 flex items-start gap-4" aria-live="polite">
        <span className="levitate grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-brand)] text-3xl shadow-lg">
          {q.emoji}
        </span>
        <blockquote className="min-w-0">
          <p className="text-base font-semibold leading-relaxed sm:text-lg">“{q.text}”</p>
          <footer className="mt-2 text-sm font-bold text-warning">- {q.who}</footer>
        </blockquote>
      </div>
      <div className="mt-4 flex justify-end">
        <BounceButton
          onClick={() => {
            setI((n) => (n + 1) % QUOTES.length);
            setTick((t) => t + 1);
          }}
          className="rounded-lg border border-warning/50 bg-warning/10 px-3 py-1.5 text-xs font-bold text-warning"
        >
          Next Quote ➜
        </BounceButton>
      </div>
    </section>
  );
}
