import { QUEST_BONUS_XP, QUEST_TARGET } from "@/lib/vault";

export function DailyQuest({ hard, done }: { hard: number; done: boolean }) {
  const n = Math.min(hard, QUEST_TARGET);
  return (
    <div
      className={`glass flex flex-wrap items-center gap-3 rounded-2xl px-4 py-3 ${done ? "border-success/60 glow-success" : "border-warning/40"}`}
    >
      <span className="levitate text-2xl" aria-hidden>
        {done ? "🏆" : "🎯"}
      </span>
      <div className="min-w-0 flex-1">
        {done ? (
          <p className="text-sm font-bold">
            Quest Completed! <span className="text-success">+{QUEST_BONUS_XP} Bonus XP</span> 🎉
          </p>
        ) : (
          <p className="text-sm font-bold">
            <span className="text-warning">Daily Quest:</span> Practise {QUEST_TARGET} Hard questions today
            <span className="ml-2 text-muted-foreground">- Progress {n}/{QUEST_TARGET}</span>
          </p>
        )}
        <div className="mt-1.5 h-1.5 max-w-md overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full transition-all duration-500 ${done ? "bg-success" : "bg-warning"}`}
            style={{ width: `${(n / QUEST_TARGET) * 100}%` }}
          />
        </div>
      </div>
      {!done && <span className="text-xs font-semibold text-warning">🎁 +{QUEST_BONUS_XP} XP</span>}
    </div>
  );
}
