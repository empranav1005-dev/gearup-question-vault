import type { Question } from "@/data/questions";

export const MAX_PINNED = 5;
export const XP_PER_PRACTISE = 10;
export const DAILY_GOAL = 5;

export interface VaultState {
  practised: number[];
  pinned: number[];
  streak: { count: number; lastDate: string | null };
  /** Questions practised on `date` (local day), for the daily goal ring. */
  daily: { date: string | null; ids: number[] };
}

export const initialVaultState: VaultState = {
  practised: [],
  pinned: [],
  streak: { count: 0, lastDate: null },
  daily: { date: null, ids: [] },
};

export type PinResult = { state: VaultState; error: null | "full" | "practised" };

function dayKey(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function yesterday(now: Date) {
  const y = new Date(now);
  y.setDate(y.getDate() - 1);
  return y;
}

function bumpStreak(streak: VaultState["streak"], now: Date): VaultState["streak"] {
  const today = dayKey(now);
  if (streak.lastDate === today) return streak;
  const count = streak.lastDate === dayKey(yesterday(now)) ? streak.count + 1 : 1;
  return { count, lastDate: today };
}

/** Streak shown to the user: resets to 0 if the last practice day was before yesterday. */
export function currentStreak(streak: VaultState["streak"], now = new Date()): number {
  if (!streak.lastDate) return 0;
  return streak.lastDate === dayKey(now) || streak.lastDate === dayKey(yesterday(now))
    ? streak.count
    : 0;
}

export function markPractised(state: VaultState, ids: number[], now = new Date()): VaultState {
  const toAdd = ids.filter((id) => !state.practised.includes(id));
  if (toAdd.length === 0 && !ids.some((id) => state.pinned.includes(id))) return state;
  const today = dayKey(now);
  const todayIds = state.daily.date === today ? state.daily.ids : [];
  return {
    practised: [...state.practised, ...toAdd],
    pinned: state.pinned.filter((id) => !ids.includes(id)),
    streak: toAdd.length ? bumpStreak(state.streak, now) : state.streak,
    daily: toAdd.length ? { date: today, ids: [...todayIds, ...toAdd] } : state.daily,
  };
}

/** Questions practised today (unmarking one removes it). */
export function dailyCount(state: VaultState, now = new Date()): number {
  return state.daily.date === dayKey(now) ? state.daily.ids.length : 0;
}

export type Level = "Beginner" | "Pro" | "Master";

/** 0-50 XP = Beginner, 51-150 XP = Pro, 151+ XP = Master. */
export function levelFor(points: number): Level {
  if (points <= 50) return "Beginner";
  if (points <= 150) return "Pro";
  return "Master";
}

export function togglePractised(state: VaultState, id: number, now = new Date()): VaultState {
  if (state.practised.includes(id)) {
    return {
      ...state,
      practised: state.practised.filter((p) => p !== id),
      daily: { ...state.daily, ids: state.daily.ids.filter((p) => p !== id) },
    };
  }
  return markPractised(state, [id], now);
}

export function pin(state: VaultState, id: number): PinResult {
  if (state.practised.includes(id)) return { state, error: "practised" };
  if (state.pinned.includes(id)) return { state, error: null };
  if (state.pinned.length >= MAX_PINNED) return { state, error: "full" };
  return { state: { ...state, pinned: [...state.pinned, id] }, error: null };
}

export function unpin(state: VaultState, id: number): VaultState {
  return { ...state, pinned: state.pinned.filter((p) => p !== id) };
}

export function clearAllAfterPractice(state: VaultState, now = new Date()): VaultState {
  return markPractised(state, state.pinned, now);
}

export function xp(state: VaultState) {
  return state.practised.length * XP_PER_PRACTISE;
}

export interface Filters {
  subject: string;
  semester: string;
  year: string;
  tag: string;
  search: string;
}

export const ALL = "All";
export const emptyFilters: Filters = { subject: ALL, semester: ALL, year: ALL, tag: ALL, search: "" };

export function filterQuestions(list: Question[], f: Filters): Question[] {
  const q = f.search.trim().toLowerCase();
  return list.filter(
    (item) =>
      (f.subject === ALL || item.subject === f.subject) &&
      (f.semester === ALL || item.semester === f.semester) &&
      (f.year === ALL || String(item.year) === f.year) &&
      (f.tag === ALL || item.tag === f.tag) &&
      (!q ||
        [item.title, item.subject, item.chapter, item.book].some((s) => s.toLowerCase().includes(q))),
  );
}

export function sanitizeState(raw: unknown, validIds: Set<number>): VaultState {
  if (!raw || typeof raw !== "object") return initialVaultState;
  const r = raw as Partial<VaultState>;
  const ids = (v: unknown) =>
    Array.isArray(v) ? [...new Set(v.filter((n): n is number => typeof n === "number" && validIds.has(n)))] : [];
  const practised = ids(r.practised);
  const pinned = ids(r.pinned)
    .filter((id) => !practised.includes(id))
    .slice(0, MAX_PINNED);
  const s = r.streak;
  const streak =
    s && typeof s.count === "number" && (typeof s.lastDate === "string" || s.lastDate === null)
      ? { count: s.count, lastDate: s.lastDate }
      : initialVaultState.streak;
  const d = r.daily;
  const daily =
    d && (typeof d.date === "string" || d.date === null)
      ? { date: d.date, ids: ids(d.ids).filter((id) => practised.includes(id)) }
      : initialVaultState.daily;
  return { practised, pinned, streak, daily };
}
