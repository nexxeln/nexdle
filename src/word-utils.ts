import wordBank from "./word-bank.json";

export const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * wordBank.length);
  return wordBank[randomIndex];
};
