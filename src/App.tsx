import React from "react";
import SentenceList from "./components/SentenceList";

function App() {
  return (
    <div className="flex flex-col min-h-screen text-gray-900">
      <header className="p-4 bg-blue-500 text-white">
        <h1 className="font-bold text-xl">WordWelder</h1>
      </header>

      <main className="flex-grow p-4">
        <SentenceList />
      </main>

      {/* Footer */}
      <footer className="p-4 bg-gray-200 text-center">
        &copy; Hendri Schoeman 2023
      </footer>
    </div>
  );
}

export default App;
