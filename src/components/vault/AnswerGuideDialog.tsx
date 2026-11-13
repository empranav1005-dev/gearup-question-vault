import { BookOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Question } from "@/data/questions";
import { SUBJECT_EMOJI } from "./meta";

export function AnswerGuideDialog({
  question,
  onClose,
}: {
  question: Question | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!question} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="glass border-glass-border bg-popover">
        {question && (
          <>
            <DialogHeader>
              <DialogTitle className="pr-6 text-left">
                Q{question.id}. {question.title}
              </DialogTitle>
              <DialogDescription className="text-left">
                Answer guide - study from your textbook reference below.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 text-sm">
              <div className="rounded-xl border border-primary/30 bg-primary/10 p-4">
                <div className="flex items-center gap-2 font-semibold text-primary">
                  <BookOpen className="h-4 w-4" /> Book Reference
                </div>
                <p className="mt-2">
                  <span className="text-muted-foreground">Book:</span> {question.book}
                </p>
                <p>
                  <span className="text-muted-foreground">Chapter:</span> {question.chapter}
                </p>
              </div>
              <ul className="space-y-1 text-muted-foreground">
                <li>
                  {SUBJECT_EMOJI[question.subject]} {question.subject} · {question.semester} ·{" "}
                  {question.year}
                </li>
                <li>
                  📝 {question.marks} Marks · {question.difficulty} · {question.tag}
                </li>
              </ul>
              <p className="rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
                No answers are written here on purpose - this demo contains no AI-generated
                content. Write your own answer from the chapter above, then mark it as practised.
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
