import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { QUESTIONS } from "@/data/questions";
import {
  clearAllAfterPractice,
  initialVaultState,
  pin as pinFn,
  sanitizeState,
  togglePractised,
  unpin as unpinFn,
  markPractised,
  questDoneToday,
  react as reactFn,
  type Reaction,
  type VaultState,
} from "@/lib/vault";

const KEY = "papervault:v1";
const VALID = new Set(QUESTIONS.map((q) => q.id));

/** Progress is saved only in this browser (localStorage); there is no account or server. */
export function useVault() {
  const [state, setState] = useState<VaultState>(initialVaultState);
  const ref = useRef(state);
  // Only write after the saved progress has been read, so a remount never overwrites it with empty state.
  const [ready, setReady] = useState(false);

  const commit = useCallback((next: VaultState) => {
    ref.current = next;
    setState(next);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) commit(sanitizeState(JSON.parse(raw), VALID));
    } catch {
      /* ignore corrupt storage */
    }
    setReady(true);
  }, [commit]);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage full or blocked */
    }
  }, [state, ready]);

  /** `practised`: question became practised (false = unmarked). `quest`: Daily Quest just completed. */
  const toggle = useCallback(
    (id: number) => {
      const prev = ref.current;
      const next = togglePractised(prev, id);
      commit(next);
      return {
        practised: next.practised.length > prev.practised.length,
        quest: !questDoneToday(prev) && questDoneToday(next),
      };
    },
    [commit],
  );

  const react = useCallback((id: number, kind: Reaction) => commit(reactFn(ref.current, id, kind)), [commit]);

  const pin = useCallback(
    (id: number) => {
      const r = pinFn(ref.current, id);
      if (r.error === "full") toast.error("Queue is full - max 5");
      else if (r.error === "practised") toast.error("Already practised - can't pin");
      commit(r.state);
      return r.error === null;
    },
    [commit],
  );

  const unpin = useCallback((id: number) => commit(unpinFn(ref.current, id)), [commit]);

  /** `emptied`: this cleared the whole Revise Next queue. */
  const practiseAndClear = useCallback(
    (id: number) => {
      const prev = ref.current;
      const next = markPractised(prev, [id]);
      commit(next);
      return { emptied: next.pinned.length === 0, quest: !questDoneToday(prev) && questDoneToday(next) };
    },
    [commit],
  );

  /** `count`: how many pinned questions were practised and cleared. */
  const clearAll = useCallback(() => {
    const prev = ref.current;
    const next = clearAllAfterPractice(prev);
    commit(next);
    return { count: prev.pinned.length, quest: !questDoneToday(prev) && questDoneToday(next) };
  }, [commit]);

  return { state, toggle, pin, unpin, practiseAndClear, clearAll, react };
}
