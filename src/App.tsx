import { useState } from "react";
import WordRow from "./components/WordRow";
import { useStore } from "./storage";
import { LETTER_LENGTH } from "./word-utils";

const GUESS_LENGTH = 6;

const App = () => {
  const state = useStore();
  const [guess, setGuess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGuess = e.target.value;

    if (newGuess.length === LETTER_LENGTH) {
      state.addGuess(newGuess);
      setGuess("");
      return;
    }

    setGuess(newGuess);
  };

  let rows = [...state.rows];

  if (rows.length < GUESS_LENGTH) {
    rows.push({ guess });
  }

  const numOfGuessesRemaining = GUESS_LENGTH - rows.length;

  const isGameOver = state.rows.length === GUESS_LENGTH;

  rows = rows.concat(Array(numOfGuessesRemaining).fill(""));

  return (
    <div className="relative mx-auto w-96">
      <header className="pb-2 my-2 border-b border-gray-500">
        <h1 className="text-4xl text-center">wordle</h1>

        <div>
          <input
            type="text"
            className="w-1/2 p-2 border-2 border-gray-500"
            value={guess}
            onChange={handleChange}
            disabled={isGameOver}
          />
        </div>
      </header>

      <main className="grid grid-rows-6 gap-4">
        {rows.map(({ guess, result }, index) => (
          <WordRow key={index} letters={guess} result={result} />
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
