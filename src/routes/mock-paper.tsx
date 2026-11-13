import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { ArrowLeft, Printer, Shuffle } from "lucide-react";
import { QUESTIONS } from "@/data/questions";
import {
  MOCK_DURATION,
  MOCK_TOTAL_MARKS,
  decodePaper,
  encodePaper,
  generateMockPaper,
} from "@/lib/mock-paper";
import { FloatingEmojis } from "@/components/vault/FloatingEmojis";
import { BounceButton } from "@/components/vault/BounceButton";
import { SUBJECT_EMOJI, TAG_EMOJI } from "@/components/vault/meta";

export const Route = createFileRoute("/mock-paper")({
  validateSearch: (s: Record<string, unknown>): { set?: string } =>
    typeof s["set"] === "string" ? { set: s["set"] } : {},
  head: () => ({
    meta: [
      { title: "Mock Paper - PaperVault" },
      {
        name: "description",
        content: "Printable 3-hour, 70-mark Mechanical Engineering mock paper built from PaperVault's previous year questions.",
      },
      { property: "og:title", content: "Mock Paper - PaperVault" },
      { property: "og:description", content: "Printable 3-hour, 70-mark Mechanical mock paper from real PYQ topics." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MockPaperPage,
});

const INSTRUCTIONS = [
  "Answer all 10 questions.",
  "Figures to the right indicate full marks.",
  "Draw neat, labelled diagrams wherever necessary.",
  "Write formulas with units and assume suitable data if required.",
];

function MockPaperPage() {
  const { set } = Route.useSearch();
  const navigate = useNavigate();
  const paper = useMemo(() => decodePaper(set, QUESTIONS), [set]);

  // No (or a tampered) paper in the link: build a fresh one in the browser.
  useEffect(() => {
    if (!paper) navigate({ to: "/mock-paper", search: { set: encodePaper(generateMockPaper(QUESTIONS)) }, replace: true });
  }, [paper, navigate]);

  const shuffle = () => {
    const next = generateMockPaper(QUESTIONS, Math.random, paper?.map((q) => q.id) ?? []);
    navigate({ to: "/mock-paper", search: { set: encodePaper(next) } });
  };

  const short = paper?.filter((q) => q.marks === 5) ?? [];
  const long = paper?.filter((q) => q.marks === 10) ?? [];

  return (
    <div className="relative min-h-screen px-4 py-6 sm:px-6 print:p-0">
      <div className="print:hidden">
        <FloatingEmojis />
      </div>

      <div className="mx-auto mb-5 flex max-w-3xl flex-wrap items-center justify-between gap-2 print:hidden">
        <Link to="/" className="btn-fx glass inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-sm font-bold shadow-none">
          <ArrowLeft className="h-4 w-4" /> Back to Library
        </Link>
        <div className="flex gap-2">
          <BounceButton
            onClick={shuffle}
            className="inline-flex items-center gap-1.5 rounded-xl bg-warning px-3.5 py-2.5 text-sm font-bold text-warning-foreground"
          >
            <Shuffle className="h-4 w-4" /> Shuffle New Paper
          </BounceButton>
          <BounceButton
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2.5 text-sm font-bold text-primary-foreground"
          >
            <Printer className="h-4 w-4" /> Print
          </BounceButton>
        </div>
      </div>

      <article className="cream-card mx-auto max-w-3xl rounded-2xl p-6 sm:p-10 print:rounded-none print:border-0 print:p-0">
        {!paper ? (
          <p className="py-20 text-center text-cream-muted">Building your mock paper... ⚙️</p>
        ) : (
          <>
            <header className="border-b-2 border-cream-foreground/80 pb-4 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-ink-primary">📚 PaperVault</p>
              <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">PaperVault Mock Paper</h1>
              <p className="mt-1 font-semibold">
                Mechanical - {MOCK_DURATION} - {MOCK_TOTAL_MARKS} Marks
              </p>
              <div className="mt-3 flex justify-between text-sm font-semibold">
                <span>⏱️ Duration: {MOCK_DURATION}</span>
                <span>⭐ Max Marks: {MOCK_TOTAL_MARKS}</span>
              </div>
            </header>

            <section className="mt-5">
              <h2 className="text-sm font-bold uppercase tracking-wider">Instructions</h2>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-cream-muted">
                {INSTRUCTIONS.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
            </section>

            {[
              { title: `Section A - Short Answer (${short.length} × 5 = ${short.length * 5} Marks)`, list: short, offset: 0 },
              { title: `Section B - Long Answer (${long.length} × 10 = ${long.length * 10} Marks)`, list: long, offset: short.length },
            ].map((sec) => (
              <section key={sec.title} className="mt-6">
                <h2 className="border-b border-cream-border pb-1 text-sm font-bold uppercase tracking-wider">{sec.title}</h2>
                <ol className="mt-3 space-y-3">
                  {sec.list.map((q, i) => (
                    <li key={q.id} className="flex gap-3 break-inside-avoid">
                      <span className="w-9 shrink-0 font-bold">Q{sec.offset + i + 1}.</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{q.title}</p>
                        <p className="mt-0.5 text-xs text-cream-muted">
                          {SUBJECT_EMOJI[q.subject]} {q.subject} · {q.semester} · PYQ {q.year} · {TAG_EMOJI[q.tag]} {q.tag}
                        </p>
                      </div>
                      <span className="shrink-0 font-bold">[{q.marks}M]</span>
                    </li>
                  ))}
                </ol>
              </section>
            ))}

            <footer className="mt-8 border-t border-cream-border pt-3 text-center text-[11px] text-cream-muted">
              Total: {paper.reduce((n, q) => n + q.marks, 0)} Marks · Sample fictional data for demo practice only - No AI-generated content
            </footer>
          </>
        )}
      </article>
    </div>
  );
}
