"use client";

import { useEffect, useState } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a"
];

export default function useKonamiCode(onUnlock: () => void) {
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const nextKeys = [...keys, e.key];
      
      // Keep only last N inputs
      if (nextKeys.length > KONAMI_CODE.length) {
        nextKeys.shift();
      }

      setKeys(nextKeys);

      // Check match
      const isMatch = nextKeys.every((key, idx) => key.toLowerCase() === KONAMI_CODE[idx].toLowerCase());
      
      if (isMatch && nextKeys.length === KONAMI_CODE.length) {
        onUnlock();
        setKeys([]); // Reset keys
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keys, onUnlock]);

  return keys;
}
