const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const deckRoutes = require("./routes/deckRoutes");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/decks", deckRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("FlashMind AI Backend is Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
