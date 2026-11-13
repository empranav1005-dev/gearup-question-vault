import type { Question, Tag } from "@/data/questions";

/** Mock paper recipe: 5 Most Repeated + 3 Conceptual + 2 Drawing, 70 marks, 3 hours. */
export const MOCK_RECIPE: Record<Tag, number> = { "Most Repeated": 5, Conceptual: 3, Drawing: 2 };
export const MOCK_QUESTION_COUNT = 10;
export const MOCK_TOTAL_MARKS = 70;
export const MOCK_DURATION = "3 Hours";
export const MOCK_MIN_SUBJECTS = 4;

type Rng = () => number;

function shuffle<T>(arr: T[], rng: Rng): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

const TAGS = Object.keys(MOCK_RECIPE) as Tag[];

/** Each way to split the required 10-mark questions across tags that the data can satisfy. */
function feasibleSplits(questions: Question[]): Record<Tag, number>[] {
  const tensNeeded = (MOCK_TOTAL_MARKS - 5 * MOCK_QUESTION_COUNT) / 5;
  const avail = (tag: Tag, marks: number) =>
    questions.filter((q) => q.tag === tag && q.marks === marks).length;
  const out: Record<Tag, number>[] = [];
  const [a, b, c] = TAGS as [Tag, Tag, Tag];
  for (let ka = 0; ka <= MOCK_RECIPE[a]; ka++)
    for (let kb = 0; kb <= MOCK_RECIPE[b]; kb++) {
      const kc = tensNeeded - ka - kb;
      if (kc < 0 || kc > MOCK_RECIPE[c]) continue;
      const split = { [a]: ka, [b]: kb, [c]: kc } as Record<Tag, number>;
      if (TAGS.every((t) => avail(t, 10) >= split[t] && avail(t, 5) >= MOCK_RECIPE[t] - split[t]))
        out.push(split);
    }
  return out;
}

export function isValidMockPaper(paper: Question[]): boolean {
  if (paper.length !== MOCK_QUESTION_COUNT) return false;
  if (new Set(paper.map((q) => q.id)).size !== paper.length) return false;
  if (paper.reduce((s, q) => s + q.marks, 0) !== MOCK_TOTAL_MARKS) return false;
  if (!TAGS.every((t) => paper.filter((q) => q.tag === t).length === MOCK_RECIPE[t])) return false;
  return new Set(paper.map((q) => q.subject)).size >= MOCK_MIN_SUBJECTS;
}

const sameSet = (a: number[], b: number[]) =>
  a.length === b.length && a.every((id) => b.includes(id));

/**
 * Picks a valid mock paper from the fixed questions only. Short (5M) questions come first.
 * Pass the previous paper's ids to get a different set (Shuffle New Paper).
 */
export function generateMockPaper(questions: Question[], rng: Rng = Math.random, avoid: number[] = []): Question[] {
  const splits = feasibleSplits(questions);
  if (!splits.length) throw new Error("Question data cannot form a mock paper");
  let fallback: Question[] | null = null;
  for (let attempt = 0; attempt < 400; attempt++) {
    const split = splits[Math.floor(rng() * splits.length)]!;
    const picked = TAGS.flatMap((t) => {
      const pool = (m: number) => shuffle(questions.filter((q) => q.tag === t && q.marks === m), rng);
      return [...pool(10).slice(0, split[t]), ...pool(5).slice(0, MOCK_RECIPE[t] - split[t])];
    });
    if (!isValidMockPaper(picked)) continue;
    const ordered = [...picked].sort((x, y) => x.marks - y.marks);
    if (!sameSet(ordered.map((q) => q.id), avoid)) return ordered;
    fallback = ordered;
  }
  if (fallback) return fallback;
  throw new Error("Could not build a mixed-subject mock paper");
}

export const encodePaper = (paper: Question[]) => paper.map((q) => q.id).join("-");

export function decodePaper(set: string | undefined, questions: Question[]): Question[] | null {
  if (!set) return null;
  const ids = set.split("-").map(Number);
  const paper = ids.map((id) => questions.find((q) => q.id === id)).filter((q): q is Question => !!q);
  return paper.length === ids.length && isValidMockPaper(paper) ? paper : null;
}
