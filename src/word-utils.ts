import wordBank from "./word-bank.json";

export const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * wordBank.length);
  return wordBank[randomIndex];
};

export enum LetterState {
  Miss,
  Present,
  Match
}

export const computeGuess = (guess: string, answer: string): LetterState[] => {
  const guessArray = guess.split("");
  const answerArray = answer.split("");

  const result: LetterState[] = [];

  guessArray.forEach((letter, index) => {
    if (answerArray[index] === letter) {
      result.push(LetterState.Match);
    } else if (answerArray.includes(letter)) {
      result.push(LetterState.Present);
    } else {
      result.push(LetterState.Miss);
    }
  });

  return result;
};
