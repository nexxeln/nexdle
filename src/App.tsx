import { useGuess } from "./hooks/useGuess";
import WordRow from "./components/WordRow";
import { useStore, GUESS_LENGTH } from "./storage";
import { useEffect, useState } from "react";
import { usePrevious } from "./hooks/usePrevious";
import { isValidWord, LETTER_LENGTH } from "./word-utils";

const App = () => {
  const state = useStore();
  const [guess, setGuess] = useGuess();
  const addGuess = useStore((s) => s.addGuess);
  const previousGuess = usePrevious(guess);
  const [showInvalidGuess, setInvalidGuess] = useState(false);

  useEffect(() => {
    let id: any;
    if (showInvalidGuess) {
      id = setTimeout(() => setInvalidGuess(false), 2000);
    }

    return () => {
      clearTimeout(id);
    };
  }, [showInvalidGuess]);

  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === LETTER_LENGTH) {
      if (isValidWord(previousGuess)) {
        addGuess(previousGuess);
        setInvalidGuess(false);
      } else {
        setInvalidGuess(true);
        setGuess(previousGuess);
      }
    }
  }, [guess]);

  let rows = [...state.rows];
  let currentRow = 0;

  if (rows.length < GUESS_LENGTH) {
    currentRow = rows.push({ guess }) - 1;
  }

  const numOfGuessesRemaining = GUESS_LENGTH - rows.length;

  const isGameOver = state.gameState !== "playing";

  rows = rows.concat(Array(numOfGuessesRemaining).fill(""));

  return (
    <div className="relative mx-auto w-96">
      <header className="pb-2 my-2 border-b border-gray-500">
        <h1 className="text-4xl text-center">wordle</h1>
      </header>

      <main className="grid grid-rows-6 gap-4">
        {rows.map(({ guess, result }, index) => (
          <WordRow
            key={index}
            letters={guess}
            result={result}
            className={
              showInvalidGuess && currentRow === index ? `animate-bounce` : ``
            }
          />
        ))}
      </main>

      {isGameOver && (
        <div
          role="modal"
          className="absolute left-0 right-0 w-3/4 p-6 mx-auto text-center bg-white border border-gray-500 rounded top-1/4"
        >
          Game Over!
          <button
            className="block p-2 mx-auto mt-4 bg-green-500 border border-green-500 rounded shadow-md"
            onClick={() => {
              state.newGame();
              setGuess("");
            }}
          >
            New Game
          </button>
        </div>
      )}
    </div>
  );
};

export default App;

// useStore.persist.clearStorage();
