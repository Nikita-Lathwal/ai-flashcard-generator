import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const DeckDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [deck, setDeck] = useState(null);
  const [flashcards, setFlashcards] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [editData, setEditData] = useState({
    question: "",
    answer: "",
    difficulty: "Easy",
  });


  useEffect(() => {
    const loadDeckData = async () => {
      try {
        const deckResponse = await axios.get(
          "http://localhost:5000/api/decks"
        );

        const selectedDeck = deckResponse.data.decks.find(
          (deck) => deck._id === id
        );

        setDeck(selectedDeck);


        const flashcardResponse = await axios.get(
          "http://localhost:5000/api/flashcards"
        );

        const filteredCards = flashcardResponse.data.filter(
          (card) => card.deckId?.toString() === id
        );

        setFlashcards(filteredCards);

      } catch (error) {
        console.log(error);
      }
    };


    loadDeckData();

  }, [id]);



  const deleteDeck = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this deck?"
    );

    if (!confirmDelete) return;


    try {
      await axios.delete(
        `http://localhost:5000/api/decks/${id}`
      );

      alert("Deck deleted successfully!");
      navigate("/dashboard");

    } catch (error) {
      console.log(error);
    }
  };



  const deleteFlashcard = async (flashcardId) => {

    const confirmDelete = window.confirm(
      "Delete this flashcard?"
    );

    if (!confirmDelete) return;


    try {

      await axios.delete(
        `http://localhost:5000/api/flashcards/${flashcardId}`
      );


      setFlashcards(
        flashcards.filter(
          (card) => card._id !== flashcardId
        )
      );


    } catch (error) {
      console.log(error);
    }
  };



  const startEdit = (card) => {

    setEditingId(card._id);

    setEditData({
      question: card.question,
      answer: card.answer,
      difficulty: card.difficulty,
    });

  };



  const cancelEdit = () => {

    setEditingId(null);

    setEditData({
      question: "",
      answer: "",
      difficulty: "Easy",
    });

  };



  const updateFlashcard = async (cardId) => {

    try {

      const { data } = await axios.put(
        `http://localhost:5000/api/flashcards/${cardId}`,
        editData
      );


      setFlashcards(
        flashcards.map((card) =>
          card._id === cardId
            ? data.flashcard
            : card
        )
      );


      setEditingId(null);


    } catch (error) {

      console.log(error);
      alert("Failed to update flashcard.");

    }

  };



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


      <h2>
        Flashcards ({flashcards.length})
      </h2>



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


            {editingId === card._id ? (

              <>

                <input
                  value={editData.question}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      question: e.target.value
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "10px"
                  }}
                />


                <textarea
                  value={editData.answer}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      answer: e.target.value
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "10px"
                  }}
                />


                <select
                  value={editData.difficulty}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      difficulty: e.target.value
                    })
                  }
                  style={{
                    marginTop: "10px",
                    padding: "8px"
                  }}
                >

                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>

                </select>


                <br />


                <button
                  onClick={() =>
                    updateFlashcard(card._id)
                  }
                  style={{
                    marginTop: "10px"
                  }}
                >
                  Save
                </button>


                <button
                  onClick={cancelEdit}
                  style={{
                    marginLeft: "10px"
                  }}
                >
                  Cancel
                </button>


              </>


            ) : (

              <>

                <h3>
                  Q. {card.question}
                </h3>


                <p>
                  <strong>
                    Answer:
                  </strong>{" "}
                  {card.answer}
                </p>


                <p>
                  <strong>
                    Difficulty:
                  </strong>{" "}
                  {card.difficulty}
                </p>


                <button
                  onClick={() => startEdit(card)}
                >
                  Edit
                </button>


                <button
                  onClick={() =>
                    deleteFlashcard(card._id)
                  }
                  style={{
                    marginLeft: "10px"
                  }}
                >
                  Delete
                </button>


              </>

            )}


          </div>

        ))

      )}



      <div style={{ marginTop: "20px" }}>

        <button>
          Add Flashcard
        </button>{" "}

        <button>
          Edit Deck
        </button>{" "}


        <button onClick={deleteDeck}>
          Delete Deck
        </button>{" "}


        <Link to={`/study-mode/${id}`}>
          <button>
            Start Studying
          </button>
        </Link>

      </div>


    </div>

  );

};


export default DeckDetails;