const express = require("express");

const router = express.Router();

const {
  createFlashcard,
  getFlashcards,
  updateFlashcard,
  deleteFlashcard,
} = require("../controllers/flashcardController");

// Create a new flashcard
router.post("/", createFlashcard);

// Get all flashcards
router.get("/", getFlashcards);

// Update flashcard
router.put("/:id", updateFlashcard);

// Delete flashcard
router.delete("/:id", deleteFlashcard);

module.exports = router;