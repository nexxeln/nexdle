import { useGuess } from "./hooks/useGuess";
import WordRow from "./components/WordRow";
import { useStore, GUESS_LENGTH } from "./store";
import { useEffect, useState } from "react";
import { usePrevious } from "./hooks/usePrevious";
import { isValidWord, LETTER_LENGTH } from "./word-utils";
import Keyboard from "./components/Keyboard";
import Header from "./components/Header";

const App = () => {
  const state = useStore();
  const [guess, setGuess, addGuessLetter] = useGuess();
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
      <Header />
      <main className="grid grid-rows-6 gap-4 mb-4">
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

      <Keyboard
        onClick={(letter) => {
          addGuessLetter(letter);
        }}
      />

      {isGameOver && (
        <div
          role="modal"
          className="absolute left-0 right-0 grid w-11/12 grid-rows-4 p-6 mx-auto text-center bg-white border border-gray-500 rounded-lg h-1/2 top-1/4"
        >
          {state.gameState === "won" ? (
            <span className="text-2xl">You Won!</span>
          ) : (
            <span className="text-2xl">Game Over!</span>
          )}
          <WordRow
            letters={state.answer}
            className="items-center justify-items-center"
          />
          <button
            className="absolute left-0 right-0 top-56 block p-2 mx-auto mt-4 bg-green-500 border border-green-500 rounded shadow-md hover:opacity-[95] transition-shadow duration-300 hover:shadow-xl"
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
