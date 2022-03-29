import create from "zustand";
import { persist } from "zustand/middleware";
import { computeGuess, getRandomWord, LetterState } from "./word-utils";

export const GUESS_LENGTH = 6;

interface GuessRow {
  guess: string;
  result?: LetterState[];
}

interface StoreState {
  answer: string;
  rows: GuessRow[];
  gameState: "playing" | "won" | "lost";
  keyboardLetterState: { [letter: string]: LetterState };
  addGuess: (guess: string) => void;
  newGame: (initialGuess?: string[]) => void;
}

export const useStore = create<StoreState>(
  persist(
    (set, get) => {
      const addGuess = (guess: string) => {
        const result = computeGuess(guess, get().answer);

        const didWin = result.every((l) => l === LetterState.Match);

        const rows = [...get().rows, { guess, result }];

        const keyboardLetterState = get().keyboardLetterState;

        result.forEach((r, index) => {
          const resultGuessLetter = guess[index];

          const currentLetterState = keyboardLetterState[resultGuessLetter];

          switch (currentLetterState) {
            case LetterState.Match:
              break;

            case LetterState.Present:
              if (r === LetterState.Miss) {
                break;
              }

            default:
              keyboardLetterState[resultGuessLetter] = r;
              break;
          }
        });

        set(() => ({
          rows,
          keyboardLetterState: keyboardLetterState,
          gameState: didWin
            ? "won"
            : rows.length === GUESS_LENGTH
            ? "lost"
            : "playing"
        }));
      };

      return {
        answer: getRandomWord(),
        rows: [],
        keyboardLetterState: {},
        gameState: "playing",
        addGuess,
        newGame: (initialRows = []) => {
          set({
            answer: getRandomWord(),
            rows: [],
            keyboardLetterState: {},
            gameState: "playing"
          });

          initialRows.forEach(addGuess);
        }
      };
    },
    {
      name: "nexdle" // unique name
    }
  )
);
