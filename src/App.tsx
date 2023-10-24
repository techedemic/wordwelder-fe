import React from "react";
import SentenceList from "./components/SentenceList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateSentence from "./components/CreateSentence";

function App() {
  return (
    <div className="flex flex-col min-h-screen text-gray-900">
      <header className="p-4 bg-blue-500 text-white">
        <h1 className="font-bold text-xl">WordWelder</h1>
      </header>

      <main className="flex-grow p-4">
        <Router>
          <Routes>
            <Route path="/" element={<SentenceList />} />
            <Route path="/create" element={<CreateSentence />} />
          </Routes>
        </Router>
      </main>

      {/* Footer */}
      <footer className="p-4 bg-gray-200 text-center">
        &copy; Hendri Schoeman 2023
      </footer>
    </div>
  );
}

export default App;
