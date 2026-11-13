const ITEMS = [
  { e: "⚙️", top: "8%", left: "6%", size: "text-4xl", delay: "0s" },
  { e: "🔧", top: "22%", left: "88%", size: "text-3xl", delay: "-3s" },
  { e: "📐", top: "48%", left: "3%", size: "text-3xl", delay: "-7s" },
  { e: "🔥", top: "70%", left: "92%", size: "text-4xl", delay: "-5s" },
  { e: "💧", top: "85%", left: "12%", size: "text-3xl", delay: "-10s" },
  { e: "🔩", top: "35%", left: "50%", size: "text-2xl", delay: "-2s" },
  { e: "📘", top: "12%", left: "62%", size: "text-3xl", delay: "-12s" },
  { e: "🌡️", top: "60%", left: "40%", size: "text-2xl", delay: "-8s" },
  { e: "🚀", top: "90%", left: "70%", size: "text-3xl", delay: "-14s" },
  { e: "🏗️", top: "4%", left: "35%", size: "text-2xl", delay: "-6s" },
];

export function FloatingEmojis() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {ITEMS.map((i) => (
        <span
          key={i.e + i.top}
          className={`drift absolute select-none opacity-[0.13] ${i.size}`}
          style={{ top: i.top, left: i.left, animationDelay: i.delay }}
        >
          {i.e}
        </span>
      ))}
    </div>
  );
}
