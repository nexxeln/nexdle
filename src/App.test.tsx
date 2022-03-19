import { describe, expect, it } from "vitest";
import App from "./App";
import { useStore } from "./storage";
import { render, screen, userEvent } from "./test/test-utils";

describe("Simple working test", () => {
  test("the title is visible", () => {
    render(<App />);
    expect(screen.getByText(/wordle/i)).toBeInTheDocument();
  });

  test("shows empty state", () => {
    useStore.setState({ guesses: [] });
    render(<App />);
    expect(screen.queryByText("Game Over!")).toBeNull();
    expect(document.querySelectorAll("main div")).toHaveLength(6);
    expect(document.querySelector("main")?.textContent).toEqual("");
  });

  test("shows one row of guesses", () => {
    useStore.setState({ guesses: ["touch"] });
    render(<App />);
    expect(document.querySelector("main")?.textContent).toEqual("touch");
  });

  test("shows game over state", () => {
    useStore.setState({ guesses: Array(6).fill("grass") });
    render(<App />);
    expect(screen.getByText("Game Over!")).toBeInTheDocument();
  });

  test("able to start new game", () => {
    useStore.setState({ guesses: Array(6).fill("grass") });
    render(<App />);
    expect(screen.getByText("Game Over!")).toBeInTheDocument();
    userEvent.click(screen.getByText("New Game"));
    expect(document.querySelector("main")?.textContent).toEqual("");
  });
});
