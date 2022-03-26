import { AiOutlineCloseCircle } from "react-icons/ai";

interface InstructionsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Instructions = ({ isOpen, onClose }: InstructionsProps) => {
  return isOpen ? (
    <div className="text-white">
      <div className="flex justify-center"> and im a subbbbb tag</div>
    </div>
  ) : null;
};

export default Instructions;
