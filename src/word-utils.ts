import wordBank from "./word-bank.json";

export const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * wordBank.valid.length);
  // return wordBank.valid[randomIndex];
  return "fever";
};

export const LETTER_LENGTH = 5;

export enum LetterState {
  Miss,
  Present,
  Match
}

export const computeGuess = (guess: string, answer: string): LetterState[] => {
  const result: LetterState[] = [];

  if (guess.length !== answer.length) {
    return result;
  }

  // const answerArray = answer.split("");

  // const guessArray = guess.split("");

  // const answerLetterCount: Record<string, number> = {};

  // guessArray.forEach((letter, index) => {
  //   const currentAnswerLetter = answerArray[index];

  //   answerLetterCount[currentAnswerLetter] = answerLetterCount[
  //     currentAnswerLetter
  //   ]
  //     ? answerLetterCount[currentAnswerLetter] + 1
  //     : 1;

  //   if (currentAnswerLetter === letter) {
  //     result.push(LetterState.Match);
  //   } else if (answerArray.includes(letter)) {
  //     result.push(LetterState.Present);
  //   } else {
  //     result.push(LetterState.Miss);
  //   }
  // });

  // result.forEach((currentResult, resultIndex) => {
  //   if (currentResult !== LetterState.Present) {
  //     return;
  //   }

  //   const guessLetter = guessArray[resultIndex];

  //   answerArray.forEach((currentAnswerLetter, answerIndex) => {
  //     if (currentAnswerLetter !== guessLetter) {
  //       return;
  //     }

  //     if (result[answerIndex] === LetterState.Match) {
  //       result[resultIndex] = LetterState.Miss;
  //     }

  //     if (answerLetterCount[guessLetter] <= 0) {
  //       result[resultIndex] = LetterState.Miss;
  //     }
  //   });

  //   answerLetterCount[guessLetter]--;
  // });

  const guessArray = guess.split("");
  const answerArray = answer.split("");

  const match = guessArray.map((letter) => ({
    letter: letter,
    state: LetterState.Miss
  }));

  for (let i = guessArray.length - 1; i >= 0; i--) {
    if (answer[i] === guessArray[i]) {
      match[i].state = LetterState.Match;
      answerArray.splice(i, 1);
    }
  }

  guessArray.forEach((letter, i) => {
    if (answerArray.includes(letter) && match[i].state !== LetterState.Match) {
      match[i].state = LetterState.Present;
      answerArray.splice(answerArray.indexOf(letter), 1);
    }
  });

  match.forEach((letter) => {
    result.push(letter.state);
  });

  return result;
};

export const isValidWord = (guess: string): boolean => {
  return wordBank.valid.concat(wordBank.invalid).includes(guess);
};
