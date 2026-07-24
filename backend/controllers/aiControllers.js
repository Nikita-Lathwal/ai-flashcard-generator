const { generateFlashcards } = require("../services/geminiService");

const generateAIFlashcards = async (req, res) => {
  try {
    const { topic, count, difficulty, } = req.body;

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }

    const flashcards = await generateFlashcards(topic, count, difficulty);

    res.status(200).json({
      success: true,
      flashcards,
    });
  } catch (error) {
    console.error("AI Controller Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate flashcards",
    });
  }
};

module.exports = {
  generateAIFlashcards,
};