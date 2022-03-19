import { useStore } from "../storage";
import { computeGuess, LetterState, LETTER_LENGTH } from "../word-utils";

interface WordRowProps {
  letters: string;
}

const WordRow = ({ letters: lettersProp = "" }: WordRowProps) => {
  const answer = useStore((state) => state.answer);
  const lettersRemaining = LETTER_LENGTH - lettersProp.length;
  const letters = lettersProp
    .split("")
    .concat(Array(lettersRemaining).fill(""));

  const guessStates = computeGuess(lettersProp, answer);
  return (
    <div className="grid grid-cols-5 gap-4 bg-green">
      {letters.map((char, index) => (
        <CharacterBox key={index} value={char} state={guessStates[index]} />
      ))}
    </div>
  );
};

const characterStateStyles = {
  [LetterState.Miss]: "bg-gray-500 border-gray-500",
  [LetterState.Present]: "bg-yellow-500 border-yellow-500",
  [LetterState.Match]: "bg-green-500 border-green-500"
};

interface CharacterBoxProps {
  value: string;
  state?: LetterState;
}

const CharacterBox = ({ value, state }: CharacterBoxProps) => {
  const stateStyles = state == null ? "" : characterStateStyles[state];

  return (
    <span
      className={`inline-block p-4 text-2xl font-bold text-center uppercase border-2 border-gray-500 ${stateStyles}`}
    >
      {value}
    </span>
  );
};

export default WordRow;
