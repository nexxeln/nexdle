import { describe, expect, it } from "vitest";
import App from "./App";
import { render, screen } from "./test/test-utils";

describe("Simple working test", () => {
  it("the title is visible", () => {
    render(<App />);
    expect(screen.getByText(/wordle/i)).toBeInTheDocument();
  });
});
