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
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Decks */}
      <Route
        path="/create-deck"
        element={
          <ProtectedRoute>
            <CreateDeck />
          </ProtectedRoute>
        }
      />

      <Route
        path="/deck/:id"
        element={
          <ProtectedRoute>
            <DeckDetails />
          </ProtectedRoute>
        }
      />

      {/* AI */}
      <Route
        path="/ai-generator"
        element={
          <ProtectedRoute>
            <AIGenerator />
          </ProtectedRoute>
        }
      />

      {/* Study */}
      <Route
        path="/study-mode/:id"
        element={
          <ProtectedRoute>
            <StudyMode />
          </ProtectedRoute>
        }
      />

      {/* Profile */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;