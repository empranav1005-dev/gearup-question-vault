export type CelebrationEvent = { key: number; kind: "practised" | "queue"; xp: number };

const COLORS = ["bg-primary", "bg-success", "bg-warning", "bg-chart-3", "bg-chart-5"];
const PIECES = Array.from({ length: 28 }, (_, i) => {
  const angle = (i / 28) * Math.PI * 2;
  const dist = 120 + ((i * 37) % 90);
  return {
    tx: `${Math.round(Math.cos(angle) * dist)}px`,
    ty: `${Math.round(Math.sin(angle) * dist - 40)}px`,
    rot: `${(i * 67) % 360}deg`,
    color: COLORS[i % COLORS.length],
    round: i % 3 === 0,
  };
});

export function Celebration({ event }: { event: CelebrationEvent | null }) {
  if (!event) return null;
  const queue = event.kind === "queue";
  return (
    <div
      key={event.key}
      aria-live="polite"
      className="pointer-events-none fixed inset-0 z-[60] grid place-items-center print:hidden"
    >
      <div className="relative">
        {PIECES.map((p, i) => (
          <span
            key={i}
            className={`confetti-piece absolute left-1/2 top-1/2 h-2.5 w-2 ${p.color} ${p.round ? "rounded-full" : "rounded-[2px]"}`}
            style={{ "--tx": p.tx, "--ty": p.ty, "--rot": p.rot, animationDelay: `${(i % 4) * 30}ms` } as React.CSSProperties}
          />
        ))}
        <div
          className={`glass animate-pop-in relative rounded-2xl bg-popover px-7 py-5 text-center ${queue ? "glow-primary" : "glow-success"}`}
        >
          <div className="text-4xl">{queue ? "🏆" : "🎉"}</div>
          <p className="mt-2 font-display text-xl font-extrabold">
            {queue ? "Queue Cleared!" : "Great Job!"}
          </p>
          <p className={`text-lg font-bold ${queue ? "text-primary" : "text-success"}`}>+{event.xp} XP!</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {queue ? "You conquered your weak topics!" : "You got this!"}
          </p>
        </div>
      </div>
    </div>
  );
}
