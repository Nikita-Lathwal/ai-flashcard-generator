const Deck = require("../models/Deck");

// Create a new deck
const createDeck = async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    // Check if title is provided
    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Deck title is required",
      });
    }

    const deck = await Deck.create({
      title: title.trim(),
      description,
      userId,
    });

    res.status(201).json({
      message: "Deck created successfully",
      deck,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to create deck",
      error: error.message,
    });
  }
};

// Get all decks
const getDecks = async (req, res) => {
  try {
    const decks = await Deck.find();

    if (decks.length === 0) {
      return res.status(200).json({
        message: "No decks found",
        decks: [],
      });
    }

    res.status(200).json({
      message: "Decks fetched successfully",
      decks,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch decks",
      error: error.message,
    });
  }
};

// Update a deck
const updateDeck = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedDeck = await Deck.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedDeck) {
      return res.status(404).json({
        message: "Deck not found",
      });
    }

    res.status(200).json({
      message: "Deck updated successfully",
      deck: updatedDeck,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update deck",
      error: error.message,
    });
  }
};

// Delete a deck
const deleteDeck = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDeck = await Deck.findByIdAndDelete(id);

    if (!deletedDeck) {
      return res.status(404).json({
        message: "Deck not found",
      });
    }

    res.status(200).json({
      message: "Deck deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete deck",
      error: error.message,
    });
  }
};

module.exports = {
  createDeck,
  getDecks,
  updateDeck,
  deleteDeck,
};
