import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SentenceList from "./components/SentenceList";

function App() {
  return (
    <div>
      <SentenceList />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}

export default App;
