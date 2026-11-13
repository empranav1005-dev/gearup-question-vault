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

export const DIFFICULTY_CLASS: Record<Difficulty, string> = {
  Easy: "text-success border-success/40 bg-success/10",
  Medium: "text-warning border-warning/40 bg-warning/10",
  Hard: "text-destructive border-destructive/40 bg-destructive/10",
};

export const TAG_CLASS: Record<Tag, string> = {
  "Most Repeated": "text-primary border-primary/40 bg-primary/10",
  Conceptual: "text-chart-3 border-chart-3/40 bg-chart-3/10",
  Drawing: "text-chart-5 border-chart-5/40 bg-chart-5/10",
};

export const TAG_EMOJI: Record<Tag, string> = {
  "Most Repeated": "🔁",
  Conceptual: "💡",
  Drawing: "✏️",
};
