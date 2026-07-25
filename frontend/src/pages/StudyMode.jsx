import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const StudyMode = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [flashcards, setFlashcards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/flashcards"
        );

        const deckCards = data.filter(
          (card) => card.deckId?.toString() === id
        );

        setFlashcards(deckCards);

      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false);
      }
    };


    fetchFlashcards();

  }, [id]);



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


  if (loading) {
    return (
      <div style={{ padding: "30px", textAlign: "center" }}>
        <h2>Loading flashcards...</h2>
      </div>
    );
  }


  if (flashcards.length === 0) {
    return (
      <div style={{ padding: "30px", textAlign: "center" }}>
        <h2>No flashcards available for this deck.</h2>
      </div>
    );
  }


  const progress =
    ((current + 1) / flashcards.length) * 100;


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

        <h2>
          {flashcards[current].question}
        </h2>


        {showAnswer && (
          <>
            <hr />
            <p>
              {flashcards[current].answer}
            </p>
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

        <button
          onClick={previousCard}
          disabled={current === 0}
        >
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



      <p>
        {Math.round(progress)}% Completed
      </p>



      {current === flashcards.length - 1 && (
  <button
    style={{ marginTop: "20px" }}
    onClick={() => navigate(`/deck/${id}`)}
  >
    🎉 Finish Session
  </button>
)}

    </div>
  );
};


export default StudyMode;