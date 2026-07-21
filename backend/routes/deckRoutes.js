const express = require("express");

const router = express.Router();

const {
  createDeck,
  getDecks,
  updateDeck,
  deleteDeck,
} = require("../controllers/deckController");

// Create deck
router.post("/", createDeck);

// Get all decks
router.get("/", getDecks);

// Update deck
router.put("/:id", updateDeck);

// Delete deck
router.delete("/:id", deleteDeck);

module.exports = router;
