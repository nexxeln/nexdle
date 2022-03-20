import { FaGithub } from "react-icons/fa";

const Header = () => {
  return (
    <header className="relative flex justify-center pb-2 my-2 border-b border-gray-500">
      <h1 className="text-4xl font-extrabold text-center text-gray-50">
        nexdle
      </h1>

      <a href="https://github.com/nexxeln/nexdle/" target="_blank">
        <FaGithub className="absolute text-3xl text-white right-3 top-2 hover:opacity-90" />
      </a>
    </header>
  );
};

export default Header;
