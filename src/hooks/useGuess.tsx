import { usePrevious } from "./usePrevious";
import { useState, useEffect, useRef } from "react";
import { useStore } from "../storage";
import { LETTER_LENGTH } from "../word-utils";

export function useGuess() {
  const addGuess = useStore((s) => s.addGuess);
  const guessState = useState("");
  const [guess, setGuess] = guessState;
  const previousGuess = usePrevious(guess);

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
  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === LETTER_LENGTH) {
      addGuess(previousGuess);
    }
  }, [guess]);
  return guessState;
}
