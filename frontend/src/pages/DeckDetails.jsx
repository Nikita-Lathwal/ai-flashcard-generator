import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const DeckDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [deck, setDeck] = useState(null);
  const [flashcards, setFlashcards] = useState([]);

  // Add flashcard states
  const [showForm, setShowForm] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");

  // Edit flashcard states
  const [editId, setEditId] = useState(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");
  const [editDifficulty, setEditDifficulty] = useState("Medium");


  const fetchDeck = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/decks"
      );

      const selectedDeck = data.decks.find(
        (d) => d._id === id
      );

      setDeck(selectedDeck);

    } catch (error) {
      console.log(error);
    }
  };


  const fetchFlashcards = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/flashcards"
      );

      const filtered = data.filter(
        (card) => card.deckId?.toString() === id
      );

      setFlashcards(filtered);

    } catch (error) {
      console.log(error);
    }
  };


  // Add Flashcard
  const addFlashcard = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/flashcards",
        {
          question,
          answer,
          difficulty,
          deckId: id,
        }
      );

      setQuestion("");
      setAnswer("");
      setDifficulty("Medium");
      setShowForm(false);

      fetchFlashcards();

    } catch (error) {
      console.log(error);
    }
  };


  // Delete Flashcard
  const deleteFlashcard = async (flashcardId) => {
    const confirmDelete = window.confirm(
      "Delete this flashcard?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/flashcards/${flashcardId}`
      );

      fetchFlashcards();

    } catch (error) {
      console.log(error);
    }
  };


  // Start editing
  const startEdit = (card) => {
    setEditId(card._id);
    setEditQuestion(card.question);
    setEditAnswer(card.answer);
    setEditDifficulty(card.difficulty);
  };


  // Save edited flashcard
  const saveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/flashcards/${editId}`,
        {
          question: editQuestion,
          answer: editAnswer,
          difficulty: editDifficulty,
        }
      );

      setEditId(null);
      fetchFlashcards();

    } catch (error) {
      console.log(error);
    }
  };


  const deleteDeck = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this deck?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/decks/${id}`
      );

      navigate("/dashboard");

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchDeck();
    fetchFlashcards();
  }, []);


  if (!deck) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Loading...</h2>
      </div>
    );
  }


  return (
    <div style={{ padding: "30px" }}>

      <h1>{deck.title}</h1>

      <p>{deck.description}</p>

      <hr />

      <h2>Flashcards</h2>


      {flashcards.length === 0 ? (
        <p>No flashcards available.</p>
      ) : (

        flashcards.map((card) => (

          <div
            key={card._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
          >

            {editId === card._id ? (

              <>
                <input
                  value={editQuestion}
                  onChange={(e) =>
                    setEditQuestion(e.target.value)
                  }
                />

                <br /><br />

                <input
                  value={editAnswer}
                  onChange={(e) =>
                    setEditAnswer(e.target.value)
                  }
                />

                <br /><br />

                <select
                  value={editDifficulty}
                  onChange={(e) =>
                    setEditDifficulty(e.target.value)
                  }
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>

                <br /><br />

                <button onClick={saveEdit}>
                  Save
                </button>

                <button onClick={() => setEditId(null)}>
                  Cancel
                </button>
              </>

            ) : (

              <>
                <h3>Q. {card.question}</h3>

                <p>
                  <strong>Answer:</strong> {card.answer}
                </p>

                <p>
                  <strong>Difficulty:</strong> {card.difficulty}
                </p>

                <button onClick={() => startEdit(card)}>
                  Edit
                </button>

                <button
                  onClick={() => deleteFlashcard(card._id)}
                >
                  Delete
                </button>
              </>

            )}

          </div>

        ))
      )}


      {showForm && (
        <div>
          <h3>Add Flashcard</h3>

          <input
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <br /><br />

          <input
            placeholder="Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <br /><br />

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <br /><br />

          <button onClick={addFlashcard}>
            Save Flashcard
          </button>
        </div>
      )}


      <div style={{ marginTop: "20px" }}>

        <button onClick={() => setShowForm(!showForm)}>
          Add Flashcard
        </button>{" "}

        <button>
          Edit Deck
        </button>{" "}

        <button onClick={deleteDeck}>
          Delete Deck
        </button>{" "}

        <Link to="/study-mode">
          <button>
            Start Studying
          </button>
        </Link>

      </div>

    </div>
  );
};

export default DeckDetails;