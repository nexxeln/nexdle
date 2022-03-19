import { describe, expect, it } from "vitest";
import { getRandomWord } from "./word-utils";

describe("word-utils", () => {
  it("random word", () => {
    expect(getRandomWord()).toBeTruthy();
    expect(getRandomWord().length).toEqual(5);
  });
});
