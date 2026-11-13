import { BookOpen, Youtube } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Question } from "@/data/questions";
import { cn } from "@/lib/utils";
import { DIFFICULTY_CLASS, SUBJECT_EMOJI } from "./meta";

/** Marks split per answer part, as given in the PaperVault brief. */
const SCHEME: Record<5 | 10, { part: string; marks: number }[]> = {
  10: [
    { part: "Definition", marks: 2 },
    { part: "Diagram", marks: 3 },
    { part: "Explanation", marks: 3 },
    { part: "Conclusion", marks: 2 },
  ],
  5: [
    { part: "Definition", marks: 1 },
    { part: "Diagram", marks: 2 },
    { part: "Explanation", marks: 2 },
  ],
};

const STEPS = [
  { emoji: "📌", title: "Definition", key: "Definition", tip: "Open with a clear 2-3 line definition of the topic in your own words." },
  { emoji: "✏️", title: "Diagram", key: "Diagram", tip: "Draw a neat, labelled diagram in pencil. Label every part and add a caption." },
  { emoji: "🧠", title: "Explanation", key: "Explanation", tip: "Explain the working or principle point-wise with short sub-headings." },
  { emoji: "🎯", title: "Conclusion / Formula + Example", key: "Conclusion", tip: "Finish with the key formula (with units) or a practical example and a one-line conclusion." },
];

export function youtubeSearchUrl(title: string) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(title)}`;
}

export function AnswerGuideDialog({ question, onClose }: { question: Question | null; onClose: () => void }) {
  const scheme = question ? SCHEME[question.marks] : [];
  const marksFor = (key: string) => scheme.find((s) => s.part === key)?.marks;

  return (
    <Dialog open={!!question} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-glass-border bg-popover sm:max-w-xl">
        {question && (
          <>
            <DialogHeader>
              <DialogTitle className="pr-6 text-left leading-snug">
                <span className="text-primary">Q{question.id}.</span> {question.title}
              </DialogTitle>
              <DialogDescription asChild>
                <div className="flex flex-wrap gap-1.5 pt-1 text-xs">
                  <span className="rounded-full border border-glass-border px-2 py-0.5">
                    {SUBJECT_EMOJI[question.subject]} {question.subject}
                  </span>
                  <span className="rounded-full border border-glass-border px-2 py-0.5">{question.semester}</span>
                  <span className="rounded-full border border-glass-border px-2 py-0.5">{question.year}</span>
                  <span className="rounded-full border border-warning/50 bg-warning/15 px-2 py-0.5 text-warning">⭐ {question.marks} Marks</span>
                  <span className={cn("rounded-full border px-2 py-0.5", DIFFICULTY_CLASS[question.difficulty])}>{question.difficulty}</span>
                </div>
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="write" className="mt-1">
              <TabsList className="grid h-auto w-full grid-cols-3 bg-muted/70">
                <TabsTrigger value="write" className="text-xs sm:text-sm">✍️ How to Write</TabsTrigger>
                <TabsTrigger value="scheme" className="text-xs sm:text-sm">📊 Evaluation</TabsTrigger>
                <TabsTrigger value="learn" className="text-xs sm:text-sm">🚀 Learn More</TabsTrigger>
              </TabsList>

              <TabsContent value="write" className="space-y-2.5 pt-2">
                <p className="text-sm font-semibold">How to Write Answer - 4 steps</p>
                {STEPS.map((s, i) => {
                  const m = marksFor(s.key);
                  return (
                    <div key={s.key} className="flex gap-3 rounded-xl border border-glass-border bg-glass p-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/15 text-base">{s.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-bold">
                            Step {i + 1}: {s.title}
                          </p>
                          {m ? <span className="shrink-0 text-xs font-bold text-warning">{m}M</span> : null}
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">{s.tip}</p>
                      </div>
                    </div>
                  );
                })}
                {question.tag === "Drawing" && (
                  <p className="rounded-lg border border-warning/40 bg-warning/10 p-2.5 text-xs font-semibold text-warning">
                    ✏️ Drawing question - give the diagram extra care.
                  </p>
                )}
              </TabsContent>

              <TabsContent value="scheme" className="space-y-3 pt-2">
                {([10, 5] as const).map((m) => {
                  const active = question.marks === m;
                  return (
                    <div
                      key={m}
                      className={cn(
                        "rounded-xl border p-3",
                        active ? "border-primary/50 bg-primary/10" : "border-glass-border bg-glass opacity-70",
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold">For {m} Marks</p>
                        {active && <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">This question</span>}
                      </div>
                      <div className="mt-2 grid gap-1.5">
                        {SCHEME[m].map((s) => (
                          <div key={s.part} className="flex items-center justify-between rounded-lg bg-muted/60 px-3 py-1.5 text-sm">
                            <span>{s.part}</span>
                            <span className="font-bold text-warning">{s.marks}M</span>
                          </div>
                        ))}
                        <div className="flex items-center justify-between px-3 pt-1 text-sm font-bold">
                          <span>Total</span>
                          <span>{SCHEME[m].reduce((n, s) => n + s.marks, 0)}M</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </TabsContent>

              <TabsContent value="learn" className="space-y-3 pt-2">
                <a
                  href={youtubeSearchUrl(question.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-fx flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"
                >
                  <Youtube className="h-5 w-5" /> Search on YouTube
                </a>
                <p className="text-center text-[11px] text-muted-foreground">
                  Opens YouTube search results for “{question.title}”.
                </p>
                <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 text-sm">
                  <div className="flex items-center gap-2 font-semibold text-primary">
                    <BookOpen className="h-4 w-4" /> 📖 Book Reference
                  </div>
                  <p className="mt-2">
                    <span className="text-muted-foreground">Book:</span> {question.book}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Chapter:</span> {question.chapter}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
