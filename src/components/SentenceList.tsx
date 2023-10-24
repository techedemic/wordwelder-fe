import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Props = {};

type Sentence = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  words: string[];
};

const SentenceList = (props: Props) => {
  const [sentences, setSentences] = useState<Sentence[]>([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_HOST}/sentences`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => setSentences(data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Previous Sentences</h2>
      {sentences.length > 0 ? (
        sentences.map((sentence) => (
          <div
            key={sentence.id}
            className="p-4 m-2 bg-white rounded shadow-md w-full md:w-1/2"
          >
            <p>{sentence.words.join(" ")}</p>
            <p className="text-right text-gray-500">
              {new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date(sentence.createdAt))}
            </p>
          </div>
        ))
      ) : (
        <p>
          No sentences saved (yet). Click <Link to="/create">here</Link> to
          create your first sentence.
        </p>
      )}
    </div>
  );
};

export default SentenceList;
