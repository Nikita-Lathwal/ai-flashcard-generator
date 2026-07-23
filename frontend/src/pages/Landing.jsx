import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-left">
          <h1>Create • Organize • Learn with AI</h1>

          <p>
            FlashMind AI helps students create study decks, organize
            flashcards, and generate AI-powered flashcards using
            Google Gemini.
          </p>

          <div className="hero-buttons">
            <Link to="/signup">
              <button>Get Started</button>
            </Link>

            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        </div>

        <div className="hero-right">
          <div className="flashcard-preview">
            <h3>Flashcard Preview</h3>

            <div className="question">
              <strong>Question</strong>
              <p>What is Artificial Intelligence?</p>
            </div>

            <div className="answer">
              <strong>Answer</strong>
              <p>
                Artificial Intelligence enables machines to simulate
                human intelligence and learn from data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <h2>About FlashMind AI</h2>

        <p>
          FlashMind AI is an intelligent learning platform that helps
          students create personalized study decks, organize
          flashcards, and instantly generate AI-powered flashcards
          using Google Gemini. Our goal is to make studying smarter,
          faster, and more interactive.
        </p>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2>Why Choose FlashMind AI?</h2>

        <div className="cards">
          <div className="card">
            <h3>📚 Create Decks</h3>

            <p>
              Organize all your subjects into separate study decks for
              better learning and revision.
            </p>
          </div>

          <div className="card">
            <h3>🤖 AI Flashcards</h3>

            <p>
              Generate high-quality flashcards instantly using
              Google Gemini AI from any topic or notes.
            </p>
          </div>

          <div className="card">
            <h3>🎯 Study Mode</h3>

            <p>
              Learn efficiently using interactive flashcards with an
              engaging flip-and-study experience.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2026 FlashMind AI. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default Landing;