import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import DeckCard from "../components/DeckCard";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <h1>Welcome Back 👋 {user?.name}</h1>
            <p>Continue your learning journey with FlashMind AI.</p>
          </div>

          <SearchBar />
        </div>

        {/* Action Buttons */}
        <div className="dashboard-actions">
          <Link to="/create-deck">
            <button>Create Deck</button>
          </Link>

          <Link to="/ai-generator">
            <button>AI Generator</button>
          </Link>
        </div>

        <h2>Recent Decks</h2>

        <div className="dashboard-cards">
          <DeckCard
            id={1}
            title="Data Structures"
            description="Arrays, Linked Lists, Trees"
            cards={20}
          />

          <DeckCard
            id={2}
            title="Database Management"
            description="SQL, ER Model, Normalization"
            cards={15}
          />

          <DeckCard
            id={3}
            title="Artificial Intelligence"
            description="Machine Learning & Neural Networks"
            cards={30}
          />

          <DeckCard
            id={4}
            title="Operating Systems"
            description="Processes, Threads, Scheduling"
            cards={18}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;