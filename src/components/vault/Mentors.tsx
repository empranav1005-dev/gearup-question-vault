import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BounceButton } from "./BounceButton";

/** Only these supplied mentor quotes may be shown. */
const MENTORS = [
  { name: "APJ Abdul Kalam", role: "Rocket Man", emoji: "🚀", quote: "Dream, Dream, Dream", grad: "from-primary to-warning" },
  { name: "Ratan Tata", role: "Business Legend", emoji: "💼", quote: "Take the stones people throw at you and use them to build a monument", grad: "from-chart-3 to-success" },
  { name: "Elon Musk", role: "Innovator", emoji: "⚡", quote: "Failure is an option here. If things are not failing, you are not innovating enough", grad: "from-chart-5 to-chart-3" },
  { name: "Kalpana Chawla", role: "Space Star", emoji: "👩‍🚀", quote: "The path from dreams to success does exist", grad: "from-warning to-success" },
];

type Mentor = (typeof MENTORS)[number];

export function Mentors() {
  const [open, setOpen] = useState<Mentor | null>(null);
  return (
    <section aria-label="Meet Your Mentors">
      <h2 className="mb-3 text-lg font-bold">🌟 Meet Your Mentors</h2>
      <div className="thin-scroll -mx-1 flex snap-x gap-4 overflow-x-auto px-1 pb-3">
        {MENTORS.map((m, i) => (
          <div
            key={m.name}
            className="levitate cream-card w-64 shrink-0 snap-start rounded-2xl p-4"
            style={{ animationDelay: `${-i * 1.2}s` }}
          >
            <div className="flex items-center gap-3">
              <span className={`grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br ${m.grad} text-2xl shadow-md`}>
                {m.emoji}
              </span>
              <div>
                <p className="font-bold leading-tight">{m.name}</p>
                <p className="text-xs font-semibold text-ink-primary">{m.role}</p>
              </div>
            </div>
            <p className="mt-3 line-clamp-1 text-sm italic text-cream-muted">“{m.quote}”</p>
            <BounceButton
              onClick={() => setOpen(m)}
              className="mt-3 w-full rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground"
            >
              💪 Get Motivated
            </BounceButton>
          </div>
        ))}
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="border-glass-border bg-popover sm:max-w-md">
          {open && (
            <>
              <DialogHeader className="items-center text-center">
                <span className={`levitate grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br ${open.grad} text-4xl shadow-lg`}>
                  {open.emoji}
                </span>
                <DialogTitle className="pt-2 text-center">{open.name}</DialogTitle>
                <DialogDescription className="text-center font-semibold text-primary">{open.role}</DialogDescription>
              </DialogHeader>
              <blockquote className="animate-fade-up rounded-xl border border-warning/40 bg-warning/10 p-4 text-center text-lg font-semibold leading-relaxed">
                “{open.quote}”
              </blockquote>
              <BounceButton
                onClick={() => setOpen(null)}
                className="rounded-xl bg-success px-4 py-2.5 text-sm font-bold text-success-foreground"
              >
                🚀 Let's practise!
              </BounceButton>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
