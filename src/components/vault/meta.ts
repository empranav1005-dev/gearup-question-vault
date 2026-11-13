import type { Difficulty, Subject, Tag } from "@/data/questions";

export const SUBJECT_EMOJI: Record<Subject, string> = {
  Thermodynamics: "🔥",
  "Fluid Mechanics": "💧",
  "Machine Design": "⚙️",
  Manufacturing: "🏭",
  "Strength of Materials": "🏗️",
  "Heat Transfer": "🌡️",
};

export const SUBJECTS = Object.keys(SUBJECT_EMOJI) as Subject[];
export const SEMESTERS = ["Sem 3", "Sem 4", "Sem 5"];
export const YEARS = ["2022", "2023", "2024"];
export const TAGS: Tag[] = ["Most Repeated", "Conceptual", "Drawing"];

/** Chip colours for use on dark glass surfaces. */
export const DIFFICULTY_CLASS: Record<Difficulty, string> = {
  Easy: "text-success border-success/40 bg-success/10",
  Medium: "text-warning border-warning/40 bg-warning/10",
  Hard: "text-primary border-primary/40 bg-primary/10",
};

/** Chip colours for use on cream study cards (high-contrast ink). */
export const DIFFICULTY_INK: Record<Difficulty, string> = {
  Easy: "text-ink-success border-ink-success/30 bg-success/10",
  Medium: "text-ink-warning border-ink-warning/30 bg-warning/20",
  Hard: "text-ink-danger border-ink-danger/30 bg-ink-danger/10",
};

export const TAG_INK: Record<Tag, string> = {
  "Most Repeated": "text-ink-primary border-ink-primary/30 bg-primary/10",
  Conceptual: "text-ink-info border-ink-info/30 bg-ink-info/10",
  Drawing: "text-ink-violet border-ink-violet/30 bg-ink-violet/10",
};

export const TAG_EMOJI: Record<Tag, string> = {
  "Most Repeated": "🔁",
  Conceptual: "💡",
  Drawing: "✏️",
};
