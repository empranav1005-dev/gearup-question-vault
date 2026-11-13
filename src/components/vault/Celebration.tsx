export type CelebrationTone = "success" | "primary" | "highlight" | "calm";
export type CelebrationEvent = {
  key: number;
  emoji: string;
  title: string;
  message: string;
  xp?: number;
  tone: CelebrationTone;
  confetti?: boolean;
};

const COLORS = ["bg-primary", "bg-success", "bg-warning", "bg-chart-3", "bg-cream"];
const PIECES = Array.from({ length: 32 }, (_, i) => {
  const angle = (i / 32) * Math.PI * 2;
  const dist = 130 + ((i * 37) % 100);
  return {
    tx: `${Math.round(Math.cos(angle) * dist)}px`,
    ty: `${Math.round(Math.sin(angle) * dist - 40)}px`,
    rot: `${(i * 67) % 360}deg`,
    color: COLORS[i % COLORS.length],
    round: i % 3 === 0,
  };
});

const TONE: Record<CelebrationTone, { glow: string; text: string }> = {
  success: { glow: "glow-success", text: "text-success" },
  primary: { glow: "glow-primary", text: "text-primary" },
  highlight: { glow: "glow-primary", text: "text-warning" },
  calm: { glow: "", text: "text-warning" },
};

export function Celebration({ event }: { event: CelebrationEvent | null }) {
  if (!event) return null;
  const tone = TONE[event.tone];
  return (
    <div
      key={event.key}
      aria-live="polite"
      className="pointer-events-none fixed inset-0 z-[60] grid place-items-center px-4 print:hidden"
    >
      <div className="relative">
        {event.confetti !== false &&
          PIECES.map((p, i) => (
            <span
              key={i}
              className={`confetti-piece absolute left-1/2 top-1/2 h-2.5 w-2 ${p.color} ${p.round ? "rounded-full" : "rounded-[2px]"}`}
              style={{ "--tx": p.tx, "--ty": p.ty, "--rot": p.rot, animationDelay: `${(i % 4) * 30}ms` } as React.CSSProperties}
            />
          ))}
        <div className={`glass animate-pop-in relative max-w-xs rounded-2xl bg-popover px-7 py-5 text-center ${tone.glow}`}>
          <div className="text-4xl">{event.emoji}</div>
          <p className="mt-2 font-display text-xl font-extrabold">{event.title}</p>
          {event.xp ? <p className={`text-lg font-bold ${tone.text}`}>+{event.xp} XP!</p> : null}
          <p className="mt-1 text-sm text-muted-foreground">{event.message}</p>
        </div>
      </div>
    </div>
  );
}
