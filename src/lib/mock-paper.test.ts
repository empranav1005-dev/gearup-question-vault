import { describe, expect, it } from "vitest";
import { QUESTIONS } from "@/data/questions";
import { decodePaper, encodePaper, generateMockPaper } from "./mock-paper";

describe("Mock paper generator", () => {
  it("picks 10 questions: 5 Most Repeated + 3 Conceptual + 2 Drawing totalling 70 marks", () => {
    for (let i = 0; i < 30; i++) {
      const paper = generateMockPaper(QUESTIONS);
      expect(paper).toHaveLength(10);
      expect(new Set(paper.map((q) => q.id)).size).toBe(10);
      expect(paper.filter((q) => q.tag === "Most Repeated")).toHaveLength(5);
      expect(paper.filter((q) => q.tag === "Conceptual")).toHaveLength(3);
      expect(paper.filter((q) => q.tag === "Drawing")).toHaveLength(2);
      expect(paper.reduce((s, q) => s + q.marks, 0)).toBe(70);
      expect(new Set(paper.map((q) => q.subject)).size).toBeGreaterThanOrEqual(4);
      expect(paper.every((q) => QUESTIONS.includes(q))).toBe(true);
    }
  });

  it("Shuffle New Paper gives a different set", () => {
    let prev = generateMockPaper(QUESTIONS);
    for (let i = 0; i < 20; i++) {
      const next = generateMockPaper(QUESTIONS, Math.random, prev.map((q) => q.id));
      expect(next.map((q) => q.id).sort()).not.toEqual(prev.map((q) => q.id).sort());
      prev = next;
    }
  });

  it("round-trips through the link and rejects tampered sets", () => {
    const paper = generateMockPaper(QUESTIONS);
    expect(decodePaper(encodePaper(paper), QUESTIONS)).toEqual(paper);
    expect(decodePaper("1-2-3", QUESTIONS)).toBeNull();
    expect(decodePaper("999", QUESTIONS)).toBeNull();
  });
});
