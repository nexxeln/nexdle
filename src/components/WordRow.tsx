import { LetterState, LETTER_LENGTH } from "../word-utils";

interface WordRowProps {
  letters: string;
  result?: LetterState[];
  className?: string;
}

const WordRow = ({
  letters: lettersProp = "",
  result = [],
  className = ""
}: WordRowProps) => {
  const lettersRemaining = LETTER_LENGTH - lettersProp.length;
  const letters = lettersProp
    .split("")
    .concat(Array(lettersRemaining).fill(""));

  return (
    <div className={`grid grid-cols-5 gap-4 bg-green ${className}`}>
      {letters.map((char, index) => (
        <CharacterBox key={index} value={char} state={result[index]} />
      ))}
    </div>
  );
};

const characterStateStyles = {
  [LetterState.Miss]: "bg-gray-800 border-gray-800",
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
      className={`inline-block p-4 text-2xl font-bold text-gray-50 text-center before:inline-block before:content-['_'] uppercase border border-gray-500 ${stateStyles}`}
    >
      {value}
    </span>
  );
};

export default WordRow;
