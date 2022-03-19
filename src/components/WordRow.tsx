const LETTER_LENGTH = 5;

interface WordRowProps {
  letters: string;
}

const WordRow = ({ letters: lettersProp = "" }: WordRowProps) => {
  const lettersRemaining = LETTER_LENGTH - lettersProp.length;
  const letters = lettersProp
    .split("")
    .concat(Array(lettersRemaining).fill(""));

  return (
    <div className="grid grid-cols-5 gap-4">
      {letters.map((char) => (
        <CharacterBox key={char} value={char} />
      ))}
    </div>
  );
};

interface CharacterBoxProps {
  value: string;
}

const CharacterBox = ({ value }: CharacterBoxProps) => {
  return (
    <div className="inline-block p-4 text-2xl font-bold text-center uppercase border-2 border-gray-500">
      {value}
    </div>
  );
};

export default WordRow;
