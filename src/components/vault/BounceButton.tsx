import { useState, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Button that glows on hover and plays a one-shot bounce on every click. */
export function BounceButton({ className, onClick, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const [bouncing, setBouncing] = useState(false);
  return (
    <button
      {...props}
      className={cn("btn-fx", className, bouncing && "animate-bounce-once")}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget) setBouncing(false);
      }}
      onClick={(e) => {
        setBouncing(false);
        requestAnimationFrame(() => setBouncing(true));
        onClick?.(e);
      }}
    />
  );
}
