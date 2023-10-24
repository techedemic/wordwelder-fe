import React, { useEffect, useState } from "react";
import SentenceList from "./components/SentenceList";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateSentence from "./components/CreateSentence";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen text-gray-900">
        <header className="p-4 bg-blue-500 text-white flex justify-between items-center">
          <Link to="/" className="text-white hover:underline">
            <h1 className="font-bold text-xl">WordWelder</h1>
          </Link>
          <Link to="/create" className="text-white hover:underline">
            {isMobile ? "Create" : "Create new sentence"}
          </Link>
        </header>

        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<SentenceList />} />
            <Route path="/create" element={<CreateSentence />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="p-4 bg-gray-200 text-center">
          © Hendri Schoeman 2023
        </footer>
      </div>
    </Router>
  );
}

export default App;
