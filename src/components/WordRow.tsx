import { computeGuess, LetterState } from "../word-utils";

const LETTER_LENGTH = 5;

interface WordRowProps {
  letters: string;
}

const WordRow = ({ letters: lettersProp = "" }: WordRowProps) => {
  const lettersRemaining = LETTER_LENGTH - lettersProp.length;
  const letters = lettersProp
    .split("")
    .concat(Array(lettersRemaining).fill(""));

  const guessStates = computeGuess(lettersProp);
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
    <div
      className={`inline-block p-4 text-2xl font-bold text-center uppercase border-2 border-gray-500 ${stateStyles}`}
    >
      {value}
    </div>
  );
};

export default WordRow;
