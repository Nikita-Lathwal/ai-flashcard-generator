const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const aiRoutes = require("./routes/aiRoutes");

const app = express();
//connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// AI Routes
app.use("/api/ai", aiRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("FlashMind AI Backend is Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});