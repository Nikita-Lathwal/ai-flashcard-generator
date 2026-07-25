import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import DeckCard from "../components/DeckCard";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deckResponse = await axios.get(
          "http://localhost:5000/api/decks"
        );

        const flashcardResponse = await axios.get(
          "http://localhost:5000/api/flashcards"
        );


        const flashcards = flashcardResponse.data;


        const updatedDecks = deckResponse.data.decks.map(
          (deck) => {

            const count = flashcards.filter(
              (card) =>
                card.deckId?.toString() === deck._id.toString()
            ).length;


            return {
              ...deck,
              cards: count,
            };
          }
        );


        setDecks(updatedDecks);


      } catch (error) {
        console.error(
          "Failed to fetch dashboard data:",
          error
        );
      }
    };


    fetchData();

  }, []);


  return (
    <div className="dashboard">

      <Sidebar />


      <main className="dashboard-content">

        <div className="dashboard-header">

          <div>
            <h1>
              Welcome Back 👋 {user?.name}
            </h1>

            <p>
              Continue your learning journey with FlashMind AI.
            </p>
          </div>


          <SearchBar />

        </div>



        <div className="dashboard-actions">

          <Link to="/create-deck">
            <button>
              Create Deck
            </button>
          </Link>


          <Link to="/ai-generator">
            <button>
              AI Generator
            </button>
          </Link>

        </div>



        <h2>
          Recent Decks
        </h2>



        <div className="dashboard-cards">

          {decks.length > 0 ? (

            decks.map((deck) => (

              <DeckCard
                key={deck._id}
                id={deck._id}
                title={deck.title}
                description={deck.description}
                cards={deck.cards}
              />

            ))

          ) : (

            <p>
              No decks available.
            </p>

          )}

        </div>


      </main>

    </div>
  );
};


export default Dashboard;