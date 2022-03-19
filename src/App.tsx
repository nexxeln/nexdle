import { useState } from "react";
import WordRow from "./components/WordRow";

const App = () => {
  return (
    <div className="mx-auto w-96">
      <header className="pb-2 my-2 border-b border-gray-500">
        <h1 className="text-4xl text-center">wordle</h1>
      </header>

      <main>
        <WordRow letters="hel" />
        <WordRow letters="hell" />
        <WordRow letters="hello" />
      </main>
    </div>
  );
};

export default App;
