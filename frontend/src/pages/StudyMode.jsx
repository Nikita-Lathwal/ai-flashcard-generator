import { useState } from "react";

const flashcards = [
  {
    question: "What is an Array?",
    answer: "A linear data structure that stores elements in contiguous memory."
  },
  {
    question: "What is a Linked List?",
    answer: "A collection of nodes connected using pointers."
  },
  {
    question: "What is a Stack?",
    answer: "A LIFO (Last In First Out) data structure."
  }
];

const StudyMode = () => {
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const nextCard = () => {
    if (current < flashcards.length - 1) {
      setCurrent(current + 1);
      setShowAnswer(false);
    }
  };

  const previousCard = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setShowAnswer(false);
    }
  };

  const progress = ((current + 1) / flashcards.length) * 100;

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        textAlign: "center",
        padding: "20px"
      }}
    >
      <h1>📖 Study Mode</h1>

      <h3>
        Question {current + 1} / {flashcards.length}
      </h3>

      <div
        style={{
          border: "2px solid #ddd",
          borderRadius: "15px",
          padding: "40px",
          minHeight: "180px",
          marginTop: "20px"
        }}
      >
        <h2>{flashcards[current].question}</h2>

        {showAnswer && (
          <>
            <hr />
            <p>{flashcards[current].answer}</p>
          </>
        )}
      </div>

      <button
        onClick={() => setShowAnswer(!showAnswer)}
        style={{ marginTop: "20px" }}
      >
        {showAnswer ? "Hide Answer" : "Flip Card"}
      </button>

      <div style={{ marginTop: "30px" }}>
        <button onClick={previousCard} disabled={current === 0}>
          ⬅ Previous
        </button>

        <button
          onClick={nextCard}
          disabled={current === flashcards.length - 1}
          style={{ marginLeft: "20px" }}
        >
          Next ➡
        </button>
      </div>

      <div
        style={{
          marginTop: "30px",
          background: "#ddd",
          height: "10px",
          borderRadius: "10px"
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#2563eb",
            borderRadius: "10px"
          }}
        />
      </div>

      <p>{Math.round(progress)}% Completed</p>

      {current === flashcards.length - 1 && (
        <button style={{ marginTop: "20px" }}>
          🎉 Finish Session
        </button>
      )}
    </div>
  );
};

export default StudyMode;