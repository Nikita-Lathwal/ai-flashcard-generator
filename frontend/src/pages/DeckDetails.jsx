import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const DeckDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [deck, setDeck] = useState(null);
  const [flashcards, setFlashcards] = useState([]);


  useEffect(() => {
    const loadDeckData = async () => {
      try {
        // Fetch deck
        const deckResponse = await axios.get(
          "http://localhost:5000/api/decks"
        );

        const selectedDeck = deckResponse.data.decks.find(
          (deck) => deck._id === id
        );

        setDeck(selectedDeck);


        // Fetch flashcards
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
      alert("Failed to delete deck.");

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

        <p>
          No flashcards available.
        </p>

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