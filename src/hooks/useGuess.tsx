import { useEffect, useState, useRef } from "react";
import { useStore } from "../storage";
import { LETTER_LENGTH } from "../word-utils";
import usePrevious from "./usePrevious";

const useGuess = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const addGuess = useStore((s) => s.addGuess);
  const [guess, setGuess] = useState("");
  const previousGuess = usePrevious(guess);

  const handleKeyDown = (e: KeyboardEvent) => {
    let letter = e.key;

    setGuess((currentGuess) => {
      const newGuess =
        letter.length === 1 ? currentGuess + letter : currentGuess;

      switch (letter) {
        case "Backspace":
          return newGuess.slice(0, -1);

        case "Enter":
          if (newGuess.length === LETTER_LENGTH) {
            addGuess(newGuess);
            return "";
          }
      }

      if (currentGuess.length === LETTER_LENGTH) {
        return currentGuess;
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

  return [guess, setGuess];
};

export default useGuess;
