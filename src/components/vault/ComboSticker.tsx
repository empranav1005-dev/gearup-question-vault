const STICKERS = ["You Can Do It! 💪", "One More! 🔥", "Almost There! 🚀"];

/** Pops up once the user practises 3+ questions in a row. */
export function ComboSticker({ combo, eventKey }: { combo: number; eventKey: number }) {
  if (combo < 3) return null;
  const text = STICKERS[(combo - 3) % STICKERS.length];
  return (
    <div
      key={eventKey}
      className="animate-sticker pointer-events-none fixed right-4 top-1/3 z-50 rounded-2xl border-2 border-background bg-warning px-4 py-2.5 font-display text-lg font-extrabold text-warning-foreground shadow-2xl print:hidden"
      aria-live="polite"
    >
      {text}
      <span className="ml-2 rounded-full bg-background px-2 py-0.5 text-xs text-cream">x{combo}</span>
    </div>
  );
}
