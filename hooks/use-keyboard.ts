"use client";

import { useEffect } from "react";

type KeyCombo = {
  key: string;
  meta?: boolean;
  ctrl?: boolean;
  shift?: boolean;
};

export function useKeyboard(combo: KeyCombo, handler: () => void) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === combo.key.toLowerCase() &&
        (combo.meta ? e.metaKey : true) &&
        (combo.ctrl ? e.ctrlKey : true) &&
        (combo.shift ? e.shiftKey : true)
      ) {
        e.preventDefault();
        handler();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [combo, handler]);
}
