import { usePrevious } from "./usePrevious";
import { useState, useEffect, useRef } from "react";
import { useStore } from "../storage";
import { LETTER_LENGTH } from "../word-utils";

export function useGuess() {
  const addGuess = useStore((s) => s.addGuess);
  const guessState = useState("");
  const [guess, setGuess] = guessState;
  const previousGuess = usePrevious(guess);

  const onKeyDown = (e: KeyboardEvent) => {
    setGuess((curGuess) => {
      let letter = e.key;
      const newGuess =
        letter.length === 1 && curGuess.length !== LETTER_LENGTH
          ? curGuess + letter
          : curGuess;

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
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);
  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === LETTER_LENGTH) {
      addGuess(previousGuess);
    }
  }, [guess]);
  return guessState;
} // source https://usehooks.com/usePrevious/
