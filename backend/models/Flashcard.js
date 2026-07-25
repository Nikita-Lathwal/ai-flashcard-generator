const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    answer: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },

    deckId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deck",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Flashcard", flashcardSchema);
