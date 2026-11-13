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
  type VaultState,
} from "@/lib/vault";

const KEY = "papervault:v1";
const VALID = new Set(QUESTIONS.map((q) => q.id));

/** Progress is saved only in this browser (localStorage); there is no account or server. */
export function useVault() {
  const [state, setState] = useState<VaultState>(initialVaultState);
  const ref = useRef(state);
  const loaded = useRef(false);

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
    loaded.current = true;
  }, [commit]);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage full or blocked */
    }
  }, [state]);

  /** Returns true when the question became practised (false when unmarked). */
  const toggle = useCallback(
    (id: number) => {
      const prev = ref.current;
      const next = togglePractised(prev, id);
      commit(next);
      return next.practised.length > prev.practised.length;
    },
    [commit],
  );

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

  /** Returns true when this emptied the Revise Next queue. */
  const practiseAndClear = useCallback(
    (id: number) => {
      const next = markPractised(ref.current, [id]);
      commit(next);
      return next.pinned.length === 0;
    },
    [commit],
  );

  /** Returns how many pinned questions were practised and cleared. */
  const clearAll = useCallback(() => {
    const count = ref.current.pinned.length;
    commit(clearAllAfterPractice(ref.current));
    return count;
  }, [commit]);

  return { state, toggle, pin, unpin, practiseAndClear, clearAll };
}
