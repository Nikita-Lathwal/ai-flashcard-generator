import { useParams, Link } from "react-router-dom";

const dummyDecks = {
  1: {
    title: "Data Structures",
    description: "Arrays, Linked Lists, Trees",
    flashcards: [
      {
        question: "What is an Array?",
        answer: "A linear data structure that stores elements in contiguous memory."
      },
      {
        question: "What is a Linked List?",
        answer: "A collection of nodes connected using pointers."
      },
      {
        question: "What is a Binary Tree?",
        answer: "A hierarchical data structure where each node has at most two children."
      }
    ]
  },
  2: {
    title: "Database Management",
    description: "SQL, ER Model, Normalization",
    flashcards: [
      {
        question: "What is SQL?",
        answer: "Structured Query Language used to manage databases."
      }
    ]
  },
  3: {
    title: "Artificial Intelligence",
    description: "Machine Learning & Neural Networks",
    flashcards: [
      {
        question: "What is Machine Learning?",
        answer: "A subset of AI where systems learn from data."
      }
    ]
  },
  4: {
    title: "Operating Systems",
    description: "Processes, Threads, Scheduling",
    flashcards: [
      {
        question: "What is a Process?",
        answer: "A program in execution."
      }
    ]
  }
};

const DeckDetails = () => {
  const { id } = useParams();

  const deck = dummyDecks[id];

  if (!deck) {
    return <h2>Deck not found.</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>{deck.title}</h1>

      <p>{deck.description}</p>

      <hr />

      <h2>Flashcards</h2>

      {deck.flashcards.map((card, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px"
          }}
        >
          <h3>Q. {card.question}</h3>

          <p>
            <strong>Answer:</strong> {card.answer}
          </p>
        </div>
      ))}

      <div style={{ marginTop: "20px" }}>
        <button>Add Flashcard</button>{" "}
        <button>Edit Deck</button>{" "}
        <button>Delete Deck</button>{" "}
        <Link to="/study-mode">
          <button>Start Studying</button>
        </Link>
      </div>
    </div>
  );
};

export default DeckDetails;