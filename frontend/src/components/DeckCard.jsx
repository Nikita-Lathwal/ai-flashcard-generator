import { Link } from "react-router-dom";

const DeckCard = ({ id, title, description, cards }) => {
  return (
    <div className="deck-card">
      <h3>{title}</h3>

      <p>{description}</p>

      <span>{cards} Flashcards</span>

      <br />
      <br />

      <Link to={`/deck/${id}`}>
        <button>Open Deck</button>
      </Link>
    </div>
  );
};

export default DeckCard;