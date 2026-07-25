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

    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "40px"
      }}
    >

      {/* Deck Header */}

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "18px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          marginBottom: "30px"
        }}
      >

        {editingDeck ? (

          <>

            <h2>Edit Deck</h2>

            <input
              value={deckData.title}
              onChange={(e) =>
                setDeckData({
                  ...deckData,
                  title: e.target.value
                })
              }
              style={{
                width:"100%",
                padding:"12px",
                borderRadius:"8px",
                border:"1px solid #ddd"
              }}
            />


            <br /><br />


            <textarea
              value={deckData.description}
              onChange={(e) =>
                setDeckData({
                  ...deckData,
                  description:e.target.value
                })
              }
              style={{
                width:"100%",
                padding:"12px",
                borderRadius:"8px",
                border:"1px solid #ddd"
              }}
            />


            <br /><br />


            <button
              onClick={updateDeck}
              style={{
                background:"#2563eb",
                color:"white",
                border:"none",
                padding:"12px 20px",
                borderRadius:"8px",
                cursor:"pointer"
              }}
            >
              Save Deck
            </button>


            <button
              onClick={() => setEditingDeck(false)}
              style={{
                marginLeft:"10px",
                padding:"12px 20px",
                borderRadius:"8px",
                cursor:"pointer"
              }}
            >
              Cancel
            </button>


          </>


        ) : (

          <>

            <h1>
              📚 {deck.title}
            </h1>


            <p
              style={{
                color:"#64748b",
                fontSize:"17px"
              }}
            >
              {deck.description}
            </p>


            <button
              onClick={startDeckEdit}
              style={{
                marginTop:"15px",
                background:"#0f172a",
                color:"white",
                border:"none",
                padding:"12px 20px",
                borderRadius:"8px",
                cursor:"pointer"
              }}
            >
              Edit Deck
            </button>


            <button
              onClick={deleteDeck}
              style={{
                marginLeft:"10px",
                background:"#dc2626",
                color:"white",
                border:"none",
                padding:"12px 20px",
                borderRadius:"8px",
                cursor:"pointer"
              }}
            >
              Delete Deck
            </button>


          </>

        )}

      </div>





      {/* Add Flashcard */}

      <button
        onClick={() =>
          setShowAddForm(!showAddForm)
        }
        style={{
          background:"#16a34a",
          color:"white",
          border:"none",
          padding:"14px 22px",
          borderRadius:"10px",
          cursor:"pointer",
          fontSize:"16px"
        }}
      >
        + Add Flashcard
      </button>





      {showAddForm && (

        <div
          style={{
            background:"white",
            marginTop:"20px",
            padding:"25px",
            borderRadius:"15px",
            boxShadow:"0 4px 12px rgba(0,0,0,0.08)"
          }}
        >

          <h2>
            Create Flashcard
          </h2>


          <input
            placeholder="Question"
            value={newCard.question}
            onChange={(e)=>
              setNewCard({
                ...newCard,
                question:e.target.value
              })
            }
            style={{
              width:"100%",
              padding:"12px"
            }}
          />


          <br/><br/>


          <textarea
            placeholder="Answer"
            value={newCard.answer}
            onChange={(e)=>
              setNewCard({
                ...newCard,
                answer:e.target.value
              })
            }
            style={{
              width:"100%",
              padding:"12px"
            }}
          />


          <br/><br/>


          <select
            value={newCard.difficulty}
            onChange={(e)=>
              setNewCard({
                ...newCard,
                difficulty:e.target.value
              })
            }
            style={{
              padding:"10px"
            }}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>

          </select>


          <br/><br/>


          <button
            onClick={addFlashcard}
            style={{
              background:"#2563eb",
              color:"white",
              border:"none",
              padding:"12px 20px",
              borderRadius:"8px"
            }}
          >
            Save Flashcard
          </button>


        </div>

      )}






      <h2
        style={{
          marginTop:"35px"
        }}
      >
        Flashcards ({flashcards.length})
      </h2>





      <div
        style={{
          display:"grid",
          gap:"20px"
        }}
      >

      {flashcards.map((card)=>(

        <div
          key={card._id}
          style={{
            background:"white",
            padding:"25px",
            borderRadius:"15px",
            boxShadow:"0 4px 12px rgba(0,0,0,0.08)"
          }}
        >


        {editingId === card._id ? (

          <>

          <input
            value={editData.question}
            onChange={(e)=>
              setEditData({
                ...editData,
                question:e.target.value
              })
            }
            style={{
              width:"100%",
              padding:"10px"
            }}
          />


          <br/><br/>


          <textarea
            value={editData.answer}
            onChange={(e)=>
              setEditData({
                ...editData,
                answer:e.target.value
              })
            }
            style={{
              width:"100%",
              padding:"10px"
            }}
          />


          <br/><br/>


          <button
            onClick={()=>
              updateFlashcard(card._id)
            }
          >
            Save
          </button>


          </>


        ) : (

          <>

          <h3>
            ❓ {card.question}
          </h3>


          <p>
            <b>Answer:</b> {card.answer}
          </p>


          <p>
            <b>Difficulty:</b> {card.difficulty}
          </p>


          <button
            onClick={()=>
              startEdit(card)
            }
          >
            Edit
          </button>


          <button
            onClick={()=>
              deleteFlashcard(card._id)
            }
            style={{
              marginLeft:"10px",
              background:"#dc2626",
              color:"white"
            }}
          >
            Delete
          </button>


          </>

        )}

        </div>

      ))}

      </div>





      <Link to={`/study-mode/${id}`}>

        <button
          style={{
            marginTop:"30px",
            background:"#7c3aed",
            color:"white",
            border:"none",
            padding:"14px 25px",
            borderRadius:"10px",
            cursor:"pointer"
          }}
        >
          📖 Start Studying
        </button>

      </Link>


    </div>

  );

};


export default DeckDetails;