import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { QUESTIONS, type Question } from "@/data/questions";
import { currentStreak, emptyFilters, filterQuestions, xp, type Filters } from "@/lib/vault";
import { useVault } from "@/hooks/use-vault";
import { Header } from "@/components/vault/Header";
import { FilterBar } from "@/components/vault/FilterBar";
import { QuestionCard } from "@/components/vault/QuestionCard";
import { RevisePanel } from "@/components/vault/RevisePanel";
import { AnswerGuideDialog } from "@/components/vault/AnswerGuideDialog";
import { FloatingEmojis } from "@/components/vault/FloatingEmojis";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PaperVault - Mechanical Engineering PYQ Library" },
      {
        name: "description",
        content:
          "Filter 50 Mechanical Engineering previous year questions, mark them practised and pin weak topics to revise next.",
      },
      { property: "og:title", content: "PaperVault - Mechanical Engineering PYQ Library" },
      {
        property: "og:description",
        content: "One place to filter PYQs, track practice and revise weak topics.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { state, toggle, pin, unpin, practiseAndClear, clearAll } = useVault();
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [guide, setGuide] = useState<Question | null>(null);

  const visible = useMemo(() => filterQuestions(QUESTIONS, filters), [filters]);
  const pinnedItems = useMemo(
    () => state.pinned.map((id) => QUESTIONS.find((q) => q.id === id)).filter((q): q is Question => !!q),
    [state.pinned],
  );

  return (
    <div className="relative min-h-screen">
      <FloatingEmojis />
      <Header
        practised={state.practised.length}
        total={QUESTIONS.length}
        xp={xp(state)}
        streak={currentStreak(state.streak)}
      />

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:items-start">
        <aside className="order-first lg:order-last lg:sticky lg:top-5 lg:h-[80vh]" aria-label="Revise Next">
          <RevisePanel items={pinnedItems} onPractise={practiseAndClear} onRemove={unpin} onClearAll={clearAll} />
        </aside>

        <section aria-label="Question Library" className="min-w-0 space-y-5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Question <span className="text-gradient-brand">Library</span>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{visible.length}</span> of{" "}
              {QUESTIONS.length} questions
            </p>
          </div>

          <FilterBar filters={filters} onChange={setFilters} />

          {visible.length === 0 ? (
            <div className="glass grid place-items-center rounded-2xl px-6 py-16 text-center">
              <span className="levitate text-5xl">🔭</span>
              <p className="mt-4 text-lg font-semibold">No questions found</p>
              <p className="mt-1 text-sm text-muted-foreground">Try a different filter or search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {visible.map((q, i) => (
                <QuestionCard
                  key={q.id}
                  q={q}
                  index={i}
                  practised={state.practised.includes(q.id)}
                  pinned={state.pinned.includes(q.id)}
                  onToggle={() => toggle(q.id)}
                  onPin={() => pin(q.id)}
                  onUnpin={() => unpin(q.id)}
                  onGuide={() => setGuide(q)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="mx-auto max-w-7xl px-4 pb-8 pt-4 text-center text-xs text-muted-foreground sm:px-6">
        <div className="glass rounded-2xl px-4 py-4 shadow-none">
          📄 Sample fictional data for demo practice only - No AI-generated content
        </div>
      </footer>

      <AnswerGuideDialog question={guide} onClose={() => setGuide(null)} />
    </div>
  );
}
