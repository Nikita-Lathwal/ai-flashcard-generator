import { useState } from "react";

const AIGenerator = () => {
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(5);
  const [difficulty, setDifficulty] = useState("Easy");
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);

  const generateFlashcards = () => {
    setLoading(true);

    setTimeout(() => {
      setCards([
        {
          question: `What is ${topic}?`,
          answer: `${topic} is an important concept used in computer science.`
        },
        {
          question: `Why is ${topic} important?`,
          answer: `${topic} helps solve real-world problems efficiently.`
        },
        {
          question: `Where is ${topic} used?`,
          answer: `${topic} is widely used in software development and AI.`
        }
      ]);

      setLoading(false);
    }, 1500);
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "30px"
      }}
    >
      <h1>🤖 AI Flashcard Generator</h1>

      <p>Generate flashcards instantly using AI.</p>

      <br />

      <label>Topic</label>

      <input
        type="text"
        placeholder="Example: Machine Learning"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "8px",
          marginBottom: "20px"
        }}
      />

      <label>Number of Flashcards</label>

      <select
        value={count}
        onChange={(e) => setCount(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "8px",
          marginBottom: "20px"
        }}
      >
        <option>5</option>
        <option>10</option>
        <option>15</option>
        <option>20</option>
      </select>

      <label>Difficulty</label>

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "8px",
          marginBottom: "30px"
        }}
      >
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <button onClick={generateFlashcards}>
        🚀 Generate Flashcards
      </button>

      <br />
      <br />

      {loading && <h3>Generating flashcards...</h3>}

      {!loading &&
        cards.map((card, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginTop: "20px"
            }}
          >
            <h3>Q. {card.question}</h3>

            <p>
              <strong>Answer:</strong> {card.answer}
            </p>
          </div>
        ))}

      {cards.length > 0 && (
        <button style={{ marginTop: "30px" }}>
          💾 Save to Deck
        </button>
      )}
    </div>
  );
};

export default AIGenerator;