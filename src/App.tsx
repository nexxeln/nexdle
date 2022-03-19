import WordRow from "./components/WordRow";

const App = () => {
  return (
    <div className="mx-auto w-96">
      <header className="pb-2 my-2 border-b border-gray-500">
        <h1 className="text-4xl text-center">wordle</h1>
      </header>

      <main className="grid grid-rows-6 gap-4">
        <WordRow letters="hello" />
        <WordRow letters="sugar" />
        <WordRow letters="today" />
        <WordRow letters="colon" />
        <WordRow letters="grass" />
        <WordRow letters="fr" />
      </main>
    </div>
  );
};

export default App;
