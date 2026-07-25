import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateDeck = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Data Structures");
  const [difficulty, setDifficulty] = useState("Easy");
  const [color, setColor] = useState("#2563eb");

const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Create Deck button clicked");

  if (!title.trim()) {
    alert("Please enter a deck title.");
    return;
  }

  try {
    console.log("Sending request...");

    const response = await axios.post(
      "http://localhost:5000/api/decks",
      {
        title,
        description,
      }
    );

    console.log(response.data);

    alert("Deck created successfully!");

    navigate("/dashboard");
  } catch (error) {
    console.log(error);
    console.log(error.response);

    alert(
      error.response?.data?.message ||
      "Failed to create deck."
    );
  }
};

  const colors = [
    "#2563eb",
    "#16a34a",
    "#dc2626",
    "#ca8a04",
    "#7c3aed",
    "#ea580c",
  ];

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "30px",
        background: "#fff",
        borderRadius: "15px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
      }}
    >
      <h1>📚 Create New Deck</h1>

      <form onSubmit={handleSubmit}>
        <label>Deck Title</label>

        <input
          type="text"
          placeholder="Enter deck title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />

        <label>Description</label>

        <textarea
          rows="4"
          placeholder="Enter deck description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={inputStyle}
        />

        <label>Category</label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyle}
        >
          <option>Data Structures</option>
          <option>Database</option>
          <option>Artificial Intelligence</option>
          <option>Operating Systems</option>
          <option>Computer Networks</option>
          <option>Programming</option>
        </select>

        <label>Difficulty</label>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          style={inputStyle}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <label>Choose Deck Color</label>

        <div
          style={{
            display: "flex",
            gap: "12px",
            margin: "15px 0 30px",
          }}
        >
          {colors.map((c) => (
            <div
              key={c}
              onClick={() => setColor(c)}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: c,
                cursor: "pointer",
                border:
                  color === c
                    ? "4px solid black"
                    : "2px solid #ddd",
              }}
            />
          ))}
        </div>

        <button type="submit">Create Deck</button>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          style={{
            marginLeft: "20px",
            background: "#6b7280",
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "20px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

export default CreateDeck;