import { useEffect, useState } from "react";
import { DAILY_GOAL } from "@/lib/vault";

const QUOTES = [
  "You are 1 question away from being exam-ready!",
  "Small steps = Big rank!",
  "Mechanical legends are made by practice!",
];

function vaultyLine(today: number) {
  if (today <= 0) return `Let's crush ${DAILY_GOAL} questions today!`;
  if (today >= DAILY_GOAL) return "Daily goal crushed! You're unstoppable! 🏆";
  const left = DAILY_GOAL - today;
  const lines = [
    `Nice start! ${today}/${DAILY_GOAL} done - keep the engine running! ⚙️`,
    `Smooth as a ball bearing! ${today}/${DAILY_GOAL} today 🔩`,
    `Full throttle! Only ${left} to go! 🚀`,
    "One more and today's goal is yours! 🔥",
  ];
  return lines[Math.min(today - 1, lines.length - 1)]!;
}

export function Vaulty({ today }: { today: number }) {
  const [quote, setQuote] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setQuote((q) => (q + 1) % QUOTES.length), 4500);
    return () => clearInterval(t);
  }, []);
  const line = vaultyLine(today);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 pt-5 sm:flex-row sm:items-center sm:px-6">
      <div className="flex items-center gap-3">
        <span className="levitate grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary/15 text-3xl glow-primary" aria-hidden>
          🤖
        </span>
        <div
          key={line}
          className="glass animate-pop-in relative rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-none"
          aria-live="polite"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Vaulty says</p>
          <p className="text-sm font-semibold">{line}</p>
        </div>
      </div>
      <div className="glass flex min-h-11 flex-1 items-center justify-center overflow-hidden rounded-2xl px-4 py-2 text-center shadow-none">
        <p key={quote} className="animate-fade-up text-sm font-semibold">
          <span aria-hidden>✨ </span>
          <span className="text-gradient-brand">{QUOTES[quote]}</span>
        </p>
      </div>
    </div>
  );
}
