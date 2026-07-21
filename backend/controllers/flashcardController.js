const Flashcard = require("../models/Flashcard");
const Deck = require("../models/Deck");

// Create a new flashcard
const createFlashcard = async (req, res) => {
  try {
    const { question, answer, difficulty, deckId } = req.body;

    if (!question || !answer || !deckId) {
      return res.status(400).json({
        message: "Question, answer and deckId are required",
      });
    }

    const deck = await Deck.findById(deckId);

    if (!deck) {
      return res.status(404).json({
        message: "Deck not found",
      });
    }

    const flashcard = await Flashcard.create({
      question: question.trim(),
      answer: answer.trim(),
      difficulty,
      deckId,
    });

    res.status(201).json({
      message: "Flashcard created successfully",
      flashcard,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create flashcard",
      error: error.message,
    });
  }
};

// Get all flashcards
const getFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find();

    res.status(200).json(flashcards);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch flashcards",
      error: error.message,
    });
  }
};

// Update flashcard
const updateFlashcard = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedFlashcard = await Flashcard.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedFlashcard) {
      return res.status(404).json({
        message: "Flashcard not found",
      });
    }

    res.status(200).json({
      message: "Flashcard updated successfully",
      flashcard: updatedFlashcard,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update flashcard",
      error: error.message,
    });
  }
};

// Delete flashcard
const deleteFlashcard = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFlashcard = await Flashcard.findByIdAndDelete(id);

    if (!deletedFlashcard) {
      return res.status(404).json({
        message: "Flashcard not found",
      });
    }

    res.status(200).json({
      message: "Flashcard deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete flashcard",
      error: error.message,
    });
  }
};

module.exports = {
  createFlashcard,
  getFlashcards,
  updateFlashcard,
  deleteFlashcard,
};
