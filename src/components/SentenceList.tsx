import React, { useEffect, useState } from "react";

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
    console.log("fetching sentences");
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
    <div>
      <h2>List of Sentences</h2>
      {sentences.map((sentence) => (
        <p key={sentence.id}>{sentence.words.join(" ")}</p>
      ))}
    </div>
  );
};

export default SentenceList;
