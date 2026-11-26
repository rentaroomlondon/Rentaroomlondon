"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Index that advances by itself every `interval` ms.
 * Calling `goTo(i)` jumps there and pauses auto-advance for `pauseFor` ms.
 */
export default function useAutoAdvance(count, interval, pauseFor) {
  const [index, setIndex] = useState(0);
  const pausedUntil = useRef(0);

  useEffect(() => {
    if (count < 2) return undefined;
    const timer = setInterval(() => {
      if (Date.now() < pausedUntil.current) return;
      setIndex((i) => (i + 1) % count);
    }, interval);
    return () => clearInterval(timer);
  }, [count, interval]);

  const goTo = useCallback(
    (i) => {
      pausedUntil.current = Date.now() + pauseFor;
      setIndex(((i % count) + count) % count);
    },
    [count, pauseFor]
  );

  return [index, goTo];
}
