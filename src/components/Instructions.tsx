import { AiOutlineCloseCircle } from "react-icons/ai";

interface InstructionsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Instructions = ({ isOpen, onClose }: InstructionsProps) => {
  return isOpen ? (
    <div
      role="modal"
      className="absolute left-0 right-0 w-full h-auto bg-black border border-gray-500 rounded-lg my-28"
    >
      <div className="py-4 text-white">
        <h1 className="text-3xl font-bold text-center ">HOW TO PLAY</h1>
        <AiOutlineCloseCircle
          className="absolute top-0 right-0 text-3xl text-gray-400 transition-opacity duration-300 cursor-pointer hover:opacity-80"
          onClick={onClose}
          data-testid="close-instructions"
        />

        <p className="px-4 pt-2 text-xl text-left text-gray-200">
          The goal of the game is to guess the word within <strong>six</strong>{" "}
          tries. Each guess should be a <strong>valid five-letter</strong> word.
          Hit the enter button to submit your guess. After each guess the color
          of the tiles will change to indicate how close your guess was to the
          answer.
          <br />
          <br />
        </p>

        <div className="px-4 text-gray-200">
          <div className="flex items-center space-x-5">
            <span className="inline-block p-4 text-2xl font-bold text-center bg-green-500 border border-green-500 text-gray-50">
              W
            </span>
            <span className="text-xl">={">"}</span>
            <p className="text-xl">
              The letter <strong>W</strong> is <strong>in</strong> the word and
              in the <strong>correct spot</strong>.
            </p>
          </div>

          <div className="flex items-center py-3 space-x-5">
            <span className="inline-block p-4 text-2xl font-bold text-center bg-yellow-500 border border-yellow-500 text-gray-50">
              W
            </span>
            <span className="text-xl">={">"}</span>
            <p className="text-xl">
              The letter <strong>W</strong> is <strong>in</strong> the word but
              in the <strong>wrong spot</strong>.
            </p>
          </div>

          <div className="flex items-center pb-3 space-x-5">
            <span className="inline-block p-4 text-2xl font-bold text-center bg-gray-800 border border-gray-800 text-gray-50">
              W
            </span>
            <span className="text-xl">={">"}</span>
            <p className="text-xl">
              The letter <strong>W</strong> is <strong>not</strong> in the word
              in any spot.
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Instructions;
