import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { QUESTIONS, type Question } from "@/data/questions";
import {
  QUEST_BONUS_XP,
  XP_PER_PRACTISE,
  currentStreak,
  dailyCount,
  emptyFilters,
  filterQuestions,
  hardToday,
  questDoneToday,
  subjectRadar,
  xp,
  type Filters,
} from "@/lib/vault";
import { encodePaper, generateMockPaper } from "@/lib/mock-paper";
import { useVault } from "@/hooks/use-vault";
import { Header } from "@/components/vault/Header";
import { FilterBar } from "@/components/vault/FilterBar";
import { QuestionCard } from "@/components/vault/QuestionCard";
import { RevisePanel } from "@/components/vault/RevisePanel";
import { AnswerGuideDialog } from "@/components/vault/AnswerGuideDialog";
import { FloatingEmojis } from "@/components/vault/FloatingEmojis";
import { Vaulty } from "@/components/vault/Vaulty";
import { Celebration, type CelebrationEvent } from "@/components/vault/Celebration";
import { DailyMotivation } from "@/components/vault/DailyMotivation";
import { Mentors } from "@/components/vault/Mentors";
import { CHALLENGE_MS, CHALLENGE_TARGET, TimerChallenge, type Challenge } from "@/components/vault/TimerChallenge";
import { SpinWheel } from "@/components/vault/SpinWheel";
import { WeakRadar } from "@/components/vault/WeakRadar";
import { DailyQuest } from "@/components/vault/DailyQuest";
import { ComboSticker } from "@/components/vault/ComboSticker";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PaperVault - Mechanical Engineering PYQ Library" },
      {
        name: "description",
        content:
          "Filter 50 Mechanical Engineering previous year questions, mark them practised, pin weak topics and generate mock papers.",
      },
      { property: "og:title", content: "PaperVault - Mechanical Engineering PYQ Library" },
      {
        property: "og:description",
        content: "One place to filter PYQs, track practice, revise weak topics and take mock papers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const COMBO_GAP_MS = 3 * 60 * 1000;

function Index() {
  const { state, toggle, pin, unpin, practiseAndClear, clearAll, react } = useVault();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [guide, setGuide] = useState<Question | null>(null);
  const [celebration, setCelebration] = useState<CelebrationEvent | null>(null);
  const [popId, setPopId] = useState<number | null>(null);
  const [luckyId, setLuckyId] = useState<number | null>(null);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [combo, setCombo] = useState({ count: 0, at: 0, key: 0 });
  const challengeRef = useRef(challenge);
  challengeRef.current = challenge;

  const visible = useMemo(() => filterQuestions(QUESTIONS, filters), [filters]);
  const pinnedItems = useMemo(
    () => state.pinned.map((id) => QUESTIONS.find((q) => q.id === id)).filter((q): q is Question => !!q),
    [state.pinned],
  );
  const radar = useMemo(() => subjectRadar(QUESTIONS, state.practised), [state.practised]);
  const today = dailyCount(state);
  const points = xp(state);

  useEffect(() => {
    if (!celebration) return;
    const t = setTimeout(() => setCelebration(null), 2400);
    return () => clearTimeout(t);
  }, [celebration]);

  const celebrate = (e: Omit<CelebrationEvent, "key">) => setCelebration({ ...e, key: Date.now() });

  /** Shared follow-up for every way a question becomes practised. */
  const afterPractised = (count: number, quest: boolean, base: Omit<CelebrationEvent, "key">) => {
    const now = Date.now();
    setCombo((c) => ({ count: now - c.at < COMBO_GAP_MS ? c.count + count : count, at: now, key: c.key + 1 }));
    const ch = challengeRef.current;
    if (ch) {
      const done = ch.done + count;
      if (done >= CHALLENGE_TARGET) {
        setChallenge(null);
        celebrate({ emoji: "⚡", title: "You are a Speed Master!", message: `${CHALLENGE_TARGET} questions practised in under 10 minutes! 🏆`, tone: "highlight" });
        return;
      }
      setChallenge({ ...ch, done });
    }
    if (quest) {
      celebrate({ emoji: "🏆", title: "Quest Completed!", xp: QUEST_BONUS_XP, message: "Bonus XP unlocked for 5 Hard questions! 💪", tone: "highlight" });
      return;
    }
    celebrate(base);
  };

  const handleToggle = (id: number) => {
    const r = toggle(id);
    if (!r.practised) {
      setCombo((c) => ({ ...c, count: 0 }));
      return;
    }
    setPopId(id);
    afterPractised(1, r.quest, { emoji: "🎉", title: "Great Job!", xp: XP_PER_PRACTISE, message: "You got this! 💪", tone: "success" });
  };

  const handlePractiseAndClear = (id: number) => {
    const r = practiseAndClear(id);
    setPopId(id);
    afterPractised(
      1,
      r.quest,
      r.emptied
        ? { emoji: "🏆", title: "Queue Cleared!", xp: XP_PER_PRACTISE, message: "You conquered your weak topics!", tone: "primary" }
        : { emoji: "🎉", title: "Great Job!", xp: XP_PER_PRACTISE, message: "You got this! 💪", tone: "success" },
    );
  };

  const handleClearAll = () => {
    const r = clearAll();
    if (!r.count) return;
    afterPractised(r.count, r.quest, {
      emoji: "🏆",
      title: "Queue Cleared!",
      xp: r.count * XP_PER_PRACTISE,
      message: "You conquered your weak topics!",
      tone: "primary",
    });
  };

  const handleTimeout = useCallback(() => {
    setChallenge(null);
    celebrate({ emoji: "💪", title: "Try Again, You Can Do It!", message: "Every attempt makes you faster. ⏱️", tone: "calm", confetti: false });
  }, []);

  const goToQuestion = (id: number) => {
    setFilters(emptyFilters);
    setLuckyId(id);
    setTimeout(() => document.getElementById(`q-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 250);
    setTimeout(() => setLuckyId((l) => (l === id ? null : l)), 4500);
  };

  const generateMock = () => {
    const paper = generateMockPaper(QUESTIONS);
    navigate({ to: "/mock-paper", search: { set: encodePaper(paper) } });
  };

  return (
    <div className="relative min-h-screen">
      <FloatingEmojis />
      <Header
        practised={state.practised.length}
        total={QUESTIONS.length}
        xp={points}
        streak={currentStreak(state.streak)}
        today={today}
        onGenerateMock={generateMock}
      />
      <Vaulty today={today} />

      <div className="mx-auto max-w-7xl space-y-5 px-4 pt-5 sm:px-6">
        <DailyQuest hard={hardToday(state)} done={questDoneToday(state)} />
        <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <DailyMotivation />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <TimerChallenge
              challenge={challenge}
              onStart={() => setChallenge({ endsAt: Date.now() + CHALLENGE_MS, done: 0 })}
              onCancel={() => setChallenge(null)}
              onTimeout={handleTimeout}
            />
            <SpinWheel onPick={goToQuestion} />
          </div>
        </div>
        <Mentors />
      </div>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:items-start">
        <aside className="order-first lg:order-last lg:sticky lg:top-5 lg:h-[80vh]" aria-label="Revise Next">
          <RevisePanel items={pinnedItems} onPractise={handlePractiseAndClear} onRemove={unpin} onClearAll={handleClearAll} />
        </aside>

        <section aria-label="Question Library" className="min-w-0 space-y-5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              📚 Question <span className="text-gradient-brand">Library</span>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{visible.length}</span> of {QUESTIONS.length}{" "}
              questions · tap a card for its Answer Guide 📘
            </p>
          </div>

          <WeakRadar rows={radar} />
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
                  celebrate={popId === q.id}
                  highlighted={luckyId === q.id}
                  reactions={state.reactions[q.id]}
                  onToggle={() => handleToggle(q.id)}
                  onPin={() => pin(q.id)}
                  onUnpin={() => unpin(q.id)}
                  onOpen={() => setGuide(q)}
                  onReact={(r) => react(q.id, r)}
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
      <Celebration event={celebration} />
      <ComboSticker combo={combo.count} eventKey={combo.key} />
    </div>
  );
}
