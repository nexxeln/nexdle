import { usePrevious } from "./usePrevious";
import { useState, useEffect, useRef } from "react";
import { useStore } from "../storage";
import { LETTER_LENGTH } from "../word-utils";

export function useGuess() {
  const guessState = useState("");
  const [guess, setGuess] = guessState;

  const handleKeyDown = (e: KeyboardEvent) => {
    setGuess((currentGuess) => {
      let letter = e.key;
      const newGuess =
        letter.length === 1 && currentGuess.length !== LETTER_LENGTH
          ? currentGuess + letter
          : currentGuess;

      switch (e.key) {
        case "Backspace":
          return newGuess.slice(0, -1);

        case "Enter":
          if (newGuess.length === LETTER_LENGTH) {
            return "";
          }
      }

      if (newGuess.length === LETTER_LENGTH) {
        return newGuess;
      }

      return newGuess;
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return guessState;
}
