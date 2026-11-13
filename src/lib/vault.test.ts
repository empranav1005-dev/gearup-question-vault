import { describe, expect, it } from "vitest";
import { QUESTIONS } from "@/data/questions";
import {
  clearAllAfterPractice,
  emptyFilters,
  filterQuestions,
  initialVaultState,
  pin,
  togglePractised,
  xp,
} from "./vault";

describe("PaperVault rules", () => {
  it("ships exactly the 50 fixed questions", () => {
    expect(QUESTIONS).toHaveLength(50);
    expect(QUESTIONS[0]!.title).toBe("Explain Iron-Carbon Diagram");
    expect(QUESTIONS[49]!.title).toBe("Explain LMTD Method for Heat Exchanger");
  });

  it("marking practised gives +10 XP and unmarking removes it", () => {
    const s1 = togglePractised(initialVaultState, 1);
    expect(xp(s1)).toBe(10);
    expect(xp(togglePractised(s1, 1))).toBe(0);
  });

  it("allows at most 5 pinned questions", () => {
    let s = initialVaultState;
    for (const id of [1, 2, 3, 4, 5]) s = pin(s, id).state;
    const r = pin(s, 6);
    expect(r.error).toBe("full");
    expect(r.state.pinned).toHaveLength(5);
  });

  it("a practised question cannot be pinned", () => {
    const s = togglePractised(initialVaultState, 7);
    expect(pin(s, 7).error).toBe("practised");
  });

  it("marking a pinned question practised removes it from Revise Next", () => {
    const s = togglePractised(pin(initialVaultState, 9).state, 9);
    expect(s.pinned).toEqual([]);
    expect(s.practised).toEqual([9]);
  });

  it("Clear All After Practice practises every pinned item and empties the queue", () => {
    let s = initialVaultState;
    for (const id of [11, 12, 13]) s = pin(s, id).state;
    s = clearAllAfterPractice(s);
    expect(s.pinned).toEqual([]);
    expect(s.practised.sort()).toEqual([11, 12, 13]);
    expect(xp(s)).toBe(30);
  });

  it("filters return no questions instead of inventing any", () => {
    expect(filterQuestions(QUESTIONS, { ...emptyFilters, search: "quantum" })).toEqual([]);
    expect(filterQuestions(QUESTIONS, { ...emptyFilters, subject: "Heat Transfer", year: "2022" }).map((q) => q.id)).toEqual([11, 39, 42]);
  });
});
