import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>FlashMind AI</h2>
      </div>

      <nav className="sidebar-nav">
        <Link
          to="/dashboard"
          className={isActive("/dashboard") ? "active" : ""}
        >
          🏠 Dashboard
        </Link>

        <Link
          to="/create-deck"
          className={isActive("/create-deck") ? "active" : ""}
        >
          📚 Create Deck
        </Link>

        <Link
          to="/ai-generator"
          className={isActive("/ai-generator") ? "active" : ""}
        >
          🤖 AI Generator
        </Link>

        <Link
          to="/profile"
          className={isActive("/profile") ? "active" : ""}
        >
          👤 Profile
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;