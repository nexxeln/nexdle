import { useGuess } from "./hooks/useGuess";
import WordRow from "./components/WordRow";
import { useStore, GUESS_LENGTH } from "./storage";

const App = () => {
  const state = useStore();
  const [guess, setGuess] = useGuess();

  let rows = [...state.rows];

  if (rows.length < GUESS_LENGTH) {
    rows.push({ guess });
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
