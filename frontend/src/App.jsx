import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateDeck from "./pages/CreateDeck";
import AIGenerator from "./pages/AIGenerator";
import Profile from "./pages/Profile";
import StudyMode from "./pages/StudyMode";
import DeckDetails from "./pages/DeckDetails";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Landing */}
      <Route path="/" element={<Landing />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Decks */}
      <Route path="/create-deck" element={<CreateDeck />} />
      <Route path="/deck/:id" element={<DeckDetails />} />

      {/* AI */}
      <Route path="/ai-generator" element={<AIGenerator />} />

      {/* Study */}
      <Route path="/study-mode" element={<StudyMode />} />

      {/* Profile */}
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;