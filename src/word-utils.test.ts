import { describe, expect, it } from "vitest";
import { computeGuess, getRandomWord, LetterState } from "./word-utils";

describe("getRandomWord", () => {
  it("random word", () => {
    expect(getRandomWord()).toBeTruthy();
    expect(getRandomWord().length).toEqual(5);
  });
});

describe("computeGuess", () => {
  it("works with match and present", () => {
    expect(computeGuess("great", "grass")).toEqual([
      LetterState.Match,
      LetterState.Match,
      LetterState.Miss,
      LetterState.Present,
      LetterState.Miss
    ]);
  });

  it("works with all matches", () => {
    expect(computeGuess("grass", "grass")).toEqual([
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match
    ]);
  });

  it("works with all misses", () => {
    expect(computeGuess("clone", "grass")).toEqual([
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss
    ]);
  });

  it("only returns one match when two letters are present", () => {
    expect(computeGuess("guest", "grass")).toEqual([
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Match,
      LetterState.Miss
    ]);
  });
});
