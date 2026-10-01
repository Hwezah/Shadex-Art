"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type TypedWordItem = { word: string; color: string };

const TYPE_MS = 85;
const DELETE_MS = 45;
const HOLD_MS = 2200;
const GAP_MS = 350;
/** Let the headline's own reveal finish before the first word is deleted. */
const START_MS = 2600;

/**
 * Typewriter that cycles through `items`, each in its own colour.
 * - Renders the first word fully on the server, so first paint reads normally.
 * - The slot reserves the width of the longest word (stacked invisible copies),
 *   so the headline never re-wraps or shifts content as words change.
 * - Screen readers get the first word only; reduced-motion users see it static.
 */
export function TypedWord({ items, className }: { items: TypedWordItem[]; className?: string }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(items[0].word.length);
  const [phase, setPhase] = useState<"hold" | "delete" | "type">("hold");

  useEffect(() => {
    if (reduce || items.length < 2) return;
    const word = items[index].word;
    let t: ReturnType<typeof setTimeout>;
    if (phase === "hold") {
      t = setTimeout(() => setPhase("delete"), index === 0 && count === word.length ? START_MS : HOLD_MS);
    } else if (phase === "delete") {
      t =
        count > 0
          ? setTimeout(() => setCount((c) => c - 1), DELETE_MS)
          : setTimeout(() => {
              setIndex((i) => (i + 1) % items.length);
              setPhase("type");
            }, GAP_MS);
    } else {
      t =
        count < word.length
          ? setTimeout(() => setCount((c) => c + 1), TYPE_MS)
          : setTimeout(() => setPhase("hold"), 0);
    }
    return () => clearTimeout(t);
  }, [reduce, items, index, count, phase]);

  const { word, color } = items[index];
  const typing = phase !== "hold";

  return (
    <span className={cn("relative inline-grid align-baseline", className)}>
      <span className="sr-only">{items[0].word}</span>
      {/* Width reservation: every word stacked invisibly in the same cell. */}
      {items.map((it) => (
        <span key={it.word} aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {it.word}
        </span>
      ))}
      <span
        aria-hidden
        className="col-start-1 row-start-1 justify-self-start whitespace-nowrap max-sm:justify-self-center"
        style={{ color }}
      >
        {word.slice(0, count)}
        <span
          className={cn(
            "ml-[0.04em] inline-block h-[0.85em] w-[0.06em] translate-y-[0.1em] bg-current",
            !typing && "animate-[caret_1s_steps(1)_infinite]",
            reduce && "hidden",
          )}
        />
      </span>
    </span>
  );
}
