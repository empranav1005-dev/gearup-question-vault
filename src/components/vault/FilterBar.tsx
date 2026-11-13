import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ALL, emptyFilters, type Filters } from "@/lib/vault";
import { SEMESTERS, SUBJECTS, SUBJECT_EMOJI, TAGS, YEARS } from "./meta";

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
}

function FilterSelect({
  label,
  value,
  options,
  onValue,
  render,
}: {
  label: string;
  value: string;
  options: string[];
  onValue: (v: string) => void;
  render?: (o: string) => string;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <Select value={value} onValueChange={onValue}>
        <SelectTrigger aria-label={label} className="w-full bg-glass">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {[ALL, ...options].map((o) => (
            <SelectItem key={o} value={o}>
              {o === ALL ? "All" : render ? render(o) : o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}

export function FilterBar({ filters, onChange }: Props) {
  const set = (k: keyof Filters) => (v: string) => onChange({ ...filters, [k]: v });
  const active =
    filters.subject !== ALL ||
    filters.semester !== ALL ||
    filters.year !== ALL ||
    filters.tag !== ALL ||
    filters.search !== "";

  return (
    <section className="glass rounded-2xl p-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={filters.search}
          onChange={(e) => set("search")(e.target.value)}
          placeholder="Search questions, chapters, books…"
          aria-label="Search questions"
          className="h-11 bg-glass pl-9"
        />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
        <FilterSelect
          label="Subject"
          value={filters.subject}
          options={SUBJECTS}
          onValue={set("subject")}
          render={(o) => `${SUBJECT_EMOJI[o as keyof typeof SUBJECT_EMOJI]} ${o}`}
        />
        <FilterSelect label="Semester" value={filters.semester} options={SEMESTERS} onValue={set("semester")} />
        <FilterSelect label="Year" value={filters.year} options={YEARS} onValue={set("year")} />
        <FilterSelect label="Tag" value={filters.tag} options={TAGS} onValue={set("tag")} />
      </div>
      {active && (
        <button
          onClick={() => onChange(emptyFilters)}
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
        >
          <X className="h-3 w-3" /> Reset filters
        </button>
      )}
    </section>
  );
}
