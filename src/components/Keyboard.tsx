import { useStore } from "../store";
import { LetterState } from "../word-utils";

interface KeyboardProps {
  onClick: (key: string) => void;
}
export default function Keyboard({ onClick: onClickProps }: KeyboardProps) {
  const keyboardLetterState = useStore((s) => s.keyboardLetterState);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { textContent, innerHTML } = e.currentTarget;

    let returnProps = textContent!;
    if (textContent !== innerHTML) {
      returnProps = "Backspace";
    }

    onClickProps(returnProps);
  };
  return (
    <div className={`flex flex-col`}>
      {keyboardKeys.map((keyboardRow, rowIndex) => (
        <div key={rowIndex} className="flex justify-center my-2 space-x-1">
          {keyboardRow.map((key, index) => {
            let styles = "rounded font-bold uppercase flex-1 py-2";

            const letterState = keyStateStyles[keyboardLetterState[key]];

            if (letterState) {
              styles += " text-white px-1 " + letterState;
            } else if (key !== "") {
              styles += " bg-gray-400";
            }

            if (key === "") {
              styles += " pointer-events-none";
            } else {
              styles += " px-1";
            }

            return (
              <button onClick={onClick} key={key + index} className={styles}>
                {key === "delete" ? backspace : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

const keyStateStyles = {
  [LetterState.Miss]: "bg-gray-600",
  [LetterState.Present]: "bg-yellow-500",
  [LetterState.Match]: "bg-green-500"
};

const keyboardKeys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["", "a", "s", "d", "f", "g", "h", "j", "k", "l", ""],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"]
];

const backspace = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
    ></path>
  </svg>
);
