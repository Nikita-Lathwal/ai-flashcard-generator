import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const DeckDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [deck, setDeck] = useState(null);
  const [flashcards, setFlashcards] = useState([]);

  // Flashcard edit
  const [editingId, setEditingId] = useState(null);

  const [editData, setEditData] = useState({
    question: "",
    answer: "",
    difficulty: "Easy",
  });


  // Add flashcard
  const [showAddForm, setShowAddForm] = useState(false);

  const [newCard, setNewCard] = useState({
    question: "",
    answer: "",
    difficulty: "Easy",
  });


  // Edit deck
  const [editingDeck, setEditingDeck] = useState(false);

  const [deckData, setDeckData] = useState({
    title: "",
    description: "",
  });



  useEffect(() => {

    const loadDeckData = async () => {

      try {

        const deckResponse = await axios.get(
          "http://localhost:5000/api/decks"
        );


        const selectedDeck =
          deckResponse.data.decks.find(
            (deck) => deck._id === id
          );


        setDeck(selectedDeck);



        const flashcardResponse = await axios.get(
          "http://localhost:5000/api/flashcards"
        );


        const filteredCards =
          flashcardResponse.data.filter(
            (card) =>
              card.deckId?.toString() === id
          );


        setFlashcards(filteredCards);



      } catch (error) {

        console.log(error);

      }

    };


    loadDeckData();


  }, [id]);




  // Delete deck
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




  // Add flashcard
  const addFlashcard = async () => {

    try {

      const { data } = await axios.post(
        "http://localhost:5000/api/flashcards",
        {
          ...newCard,
          deckId: id,
        }
      );


      setFlashcards([
        ...flashcards,
        data.flashcard,
      ]);


      setNewCard({
        question: "",
        answer: "",
        difficulty: "Easy",
      });


      setShowAddForm(false);


    } catch (error) {

      console.log(error);
      alert("Failed to add flashcard");

    }

  };




  // Delete flashcard
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
          (card) =>
            card._id !== flashcardId
        )
      );


    } catch (error) {

      console.log(error);

    }

  };




  // Start flashcard edit
  const startEdit = (card) => {

    setEditingId(card._id);


    setEditData({
      question: card.question,
      answer: card.answer,
      difficulty: card.difficulty,
    });

  };





  // Update flashcard
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

    }

  };





  // Start deck edit
  const startDeckEdit = () => {

    setEditingDeck(true);


    setDeckData({
      title: deck.title,
      description: deck.description,
    });

  };





  // Update deck
  const updateDeck = async () => {

    try {

      const { data } = await axios.put(
        `http://localhost:5000/api/decks/${id}`,
        deckData
      );


      setDeck(data.deck);


      setEditingDeck(false);


    } catch (error) {

      console.log(error);
      alert("Failed to update deck");

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


      {editingDeck ? (

        <div>

          <input
            value={deckData.title}
            onChange={(e) =>
              setDeckData({
                ...deckData,
                title: e.target.value
              })
            }
            style={{
              width: "100%",
              padding: "10px"
            }}
          />


          <br /><br />


          <textarea
            value={deckData.description}
            onChange={(e) =>
              setDeckData({
                ...deckData,
                description: e.target.value
              })
            }
            style={{
              width: "100%",
              padding: "10px"
            }}
          />


          <br /><br />


          <button onClick={updateDeck}>
            Save Deck
          </button>


          <button
            onClick={() => setEditingDeck(false)}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>


        </div>


      ) : (

        <>

          <h1>{deck.title}</h1>

          <p>{deck.description}</p>

        </>

      )}



      <hr />



      <button
        onClick={() =>
          setShowAddForm(!showAddForm)
        }
      >
        Add Flashcard
      </button>



      <button
        onClick={startDeckEdit}
        style={{ marginLeft: "10px" }}
      >
        Edit Deck
      </button>




      {showAddForm && (

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "10px"
          }}
        >

          <h3>Add New Flashcard</h3>


          <input
            placeholder="Question"
            value={newCard.question}
            onChange={(e) =>
              setNewCard({
                ...newCard,
                question: e.target.value
              })
            }
          />


          <br /><br />


          <textarea
            placeholder="Answer"
            value={newCard.answer}
            onChange={(e) =>
              setNewCard({
                ...newCard,
                answer: e.target.value
              })
            }
          />


          <br /><br />


          <select
            value={newCard.difficulty}
            onChange={(e) =>
              setNewCard({
                ...newCard,
                difficulty: e.target.value
              })
            }
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




      <h2>
        Flashcards ({flashcards.length})
      </h2>



      {flashcards.map((card) => (

        <div
          key={card._id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px"
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
              />


              <br /><br />


              <textarea
                value={editData.answer}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    answer: e.target.value
                  })
                }
              />


              <br /><br />


              <button
                onClick={() =>
                  updateFlashcard(card._id)
                }
              >
                Save
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
                onClick={() =>
                  startEdit(card)
                }
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

      ))}




      <br />


      <button onClick={deleteDeck}>
        Delete Deck
      </button>



      <Link to={`/study-mode/${id}`}>
        <button
          style={{
            marginLeft: "10px"
          }}
        >
          Start Studying
        </button>
      </Link>


    </div>

  );

};


export default DeckDetails;