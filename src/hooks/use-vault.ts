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
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState(sanitizeState(JSON.parse(raw), VALID));
    } catch {
      /* ignore corrupt storage */
    }
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage full or blocked */
    }
  }, [state]);

  const toggle = useCallback((id: number) => {
    setState((s) => {
      const next = togglePractised(s, id);
      if (next.practised.length > s.practised.length) toast.success("Practised! +10 XP");
      return next;
    });
  }, []);

  const pin = useCallback((id: number) => {
    setState((s) => {
      const r = pinFn(s, id);
      if (r.error === "full") toast.error("Queue is full - max 5");
      else if (r.error === "practised") toast.error("Already practised - can't pin");
      return r.state;
    });
  }, []);

  const unpin = useCallback((id: number) => setState((s) => unpinFn(s, id)), []);
  const practiseAndClear = useCallback((id: number) => {
    setState((s) => markPractised(s, [id]));
    toast.success("Practised & cleared! +10 XP");
  }, []);
  const clearAll = useCallback(() => {
    setState((s) => {
      if (s.pinned.length) toast.success(`Cleared queue! +${s.pinned.length * 10} XP`);
      return clearAllAfterPractice(s);
    });
  }, []);

  return { state, toggle, pin, unpin, practiseAndClear, clearAll };
}
