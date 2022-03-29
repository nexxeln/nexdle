import { useState, useEffect } from "react";
import { LETTER_LENGTH } from "../word-utils";

export function useGuess(): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (letter: string) => void
] {
  const guessState = useState("");
  const [guess, setGuess] = guessState;

  const addGuessLetter = (letter: string) => {
    setGuess((currentGuess) => {
      const newGuess =
        letter.length === 1 && currentGuess.length !== LETTER_LENGTH
          ? currentGuess + letter
          : currentGuess;

      switch (letter) {
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

  const handleKeyDown = (e: KeyboardEvent) => {
    let letter = e.key;
    addGuessLetter(letter);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return [guess, setGuess, addGuessLetter];
}
