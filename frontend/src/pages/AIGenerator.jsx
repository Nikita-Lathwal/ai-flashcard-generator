import { useState } from "react";
import { generateFlashcards as generateAICards } from "../services/aiService";

const AIGenerator = () => {
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(5);
  const [difficulty, setDifficulty] = useState("Easy");
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);

  const generateFlashcards = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic.");
      return;
    }

    try {
      setLoading(true);

      const data = await generateAICards(topic, count, difficulty);

      setCards(data.flashcards);
    } catch (error) {
      console.error(error);
      alert("Failed to generate flashcards.");
    } finally {
      setLoading(false);
    }
  };
    const handleSave = () => {
    alert("Save to Deck feature will be available after Deck & Flashcard APIs are integrated.");
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
        <button 
          style={{ marginTop: "30px" }}
          onClick={handleSave}>
          💾 Save to Deck
        </button>
      )}
    </div>
  );
};

export default AIGenerator;