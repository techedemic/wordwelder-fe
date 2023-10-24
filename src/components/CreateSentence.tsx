import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

type Word = {
  id: number;
  word: string;
  word_type:
    | "noun"
    | "verb"
    | "adjective"
    | "adverb"
    | "pronoun"
    | "preposition"
    | "conjunction"
    | "determiner"
    | "exclamation";
};

const CreateSentence = (props: Props) => {
  const [words, setWords] = useState<Word[]>([]);
  const [selectedWords, setSelectedWords] = useState<{ [key: string]: number }>(
    {}
  );
  const [sentence, setSentence] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_HOST}/words`)
      .then((response) => response.json())
      .then((data) => setWords(data))
      .catch((error) => console.error(error));
  }, []);

  const wordTypes = [
    "noun",
    "verb",
    "adjective",
    "adverb",
    "pronoun",
    "preposition",
    "conjunction",
    "determiner",
    "exclamation",
  ];

  const handleSelectWord = (wordId: number, type: string) => {
    setSelectedWords({ ...selectedWords, [type]: wordId });
  };

  const handleAddWord = (type: string) => {
    if (selectedWords[type]) {
      setSentence([...sentence, selectedWords[type]]);
      setSelectedWords({});
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    // Here you would send a POST request to the /sentence endpoint with the selected word IDs
    fetch(`${process.env.REACT_APP_API_HOST}/sentence`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sentence),
    })
      .then((response) => response.json())
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Create a Sentence</h2>
      {sentence.length !== 0 && (
        <div className="mb-4 p-4 w-full md:w-1/2 bg-white rounded shadow-md">
          {sentence.map((word) => {
            return (
              <span key={word}>{words.find((w) => w.id === word)?.word} </span>
            );
          })}
        </div>
      )}
      <form onSubmit={handleSubmit} className="w-full md:w-1/2">
        {wordTypes.map((type) => (
          <div key={type} className="flex items-center mb-2">
            <label className="w-1/3">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
            <select
              value={selectedWords[type] || ""}
              className="w-1/2 mr-2"
              onChange={(e) => handleSelectWord(+e.target.value, type)}
            >
              <option value="">Select a {type}</option>
              {words
                .filter((word) => word.word_type === type)
                .map(({ id, word }) => (
                  <option key={id} value={id}>
                    {word}
                  </option>
                ))}
            </select>
            <button
              type="button"
              className={`p-2 rounded bg-blue-500 text-white ${
                !selectedWords[type] && "opacity-50 cursor-not-allowed"
              }`}
              disabled={!selectedWords[type]}
              onClick={() => handleAddWord(type)}
            >
              +
            </button>
          </div>
        ))}
        <button
          type="submit"
          className="p-2 rounded bg-blue-500 text-white"
          disabled={loading}
        >
          {loading ? "Loading..." : "Create Sentence"}
        </button>
      </form>
    </div>
  );
};

export default CreateSentence;
