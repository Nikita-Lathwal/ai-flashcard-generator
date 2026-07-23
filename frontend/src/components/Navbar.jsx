import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">
        FlashMind <span>AI</span>
      </h2>

      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#about">About</a>

        <Link to="/login">Login</Link>

        <Link to="/signup" className="signup-btn">
          Signup
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;