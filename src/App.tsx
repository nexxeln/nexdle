import { useState } from "react";
import WordRow from "./components/WordRow";
import { useStore } from "./store";
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

  let rows = [...state.guesses];

  if (rows.length < GUESS_LENGTH) {
    rows.push(guess);
  }

  const numOfGuessesRemaining = GUESS_LENGTH - rows.length;

  rows = rows.concat(Array(numOfGuessesRemaining).fill(""));

  return (
    <div className="mx-auto w-96">
      <header className="pb-2 my-2 border-b border-gray-500">
        <h1 className="text-4xl text-center">wordle</h1>

        <div>
          <input
            type="text"
            className="w-1/2 p-2 border-2 border-gray-500"
            value={guess}
            onChange={handleChange}
          />
        </div>
      </header>

      <main className="grid grid-rows-6 gap-4">
        {rows.map((word, index) => (
          <WordRow key={index} letters={word} />
        ))}
      </main>
    </div>
  );
};

export default App;

// useStore.persist.clearStorage();
