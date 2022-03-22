import { describe, expect, test } from "vitest";
import {
  computeGuess,
  getRandomWord,
  LetterState,
  isValidWord
} from "./word-utils";

describe("getRandomWord", () => {
  test("random word", () => {
    expect(getRandomWord()).toBeTruthy();
    expect(getRandomWord().length).toEqual(5);
  });
});

describe("computeGuess", () => {
  test("works with match and present", () => {
    expect(computeGuess("great", "grass")).toEqual([
      LetterState.Match,
      LetterState.Match,
      LetterState.Miss,
      LetterState.Present,
      LetterState.Miss
    ]);
  });

  test("works with all matches", () => {
    expect(computeGuess("grass", "grass")).toEqual([
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match
    ]);
  });

  test("works with all misses", () => {
    expect(computeGuess("clone", "grass")).toEqual([
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss
    ]);
  });

  test("only returns one match when two letters are present", () => {
    expect(computeGuess("guest", "grass")).toEqual([
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Match,
      LetterState.Miss
    ]);
  });

  test("if a letter is guessed multiple times and is in the answer multiple times", () => {
    expect(computeGuess("reeds", "fever")).toEqual([
      LetterState.Present,
      LetterState.Match,
      LetterState.Present,
      LetterState.Miss,
      LetterState.Miss
    ]);
  });

  test("when two letters are present but the answer has only one of those letters", () => {
    expect(computeGuess("berry", "grass")).toEqual([
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Present,
      LetterState.Miss,
      LetterState.Miss
    ]);
  });

  test("when one letter matches but the guess has more of that letter", () => {
    expect(computeGuess("berry", "birds")).toEqual([
      LetterState.Match,
      LetterState.Miss,
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss
    ]);
  });

  test("returns empty array when given incomplete word", () => {
    expect(computeGuess("g", "grass")).toEqual([]);
  });
});

describe("isValidWord", () => {
  test("works with a valid word in the word bank", () => {
    expect(isValidWord("grass")).toBe(true);
  });

  test("works with an invalid word in the word bank", () => {
    expect(isValidWord("hduoh")).toBe(false);
  });
});
