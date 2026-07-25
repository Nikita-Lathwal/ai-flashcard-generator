require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateFlashcards = async (topic, count, difficulty) => {
  try {
    const prompt = `
You are an AI Flashcard Generator.

Generate exactly ${count} flashcards on the topic "${topic}".

Difficulty level: ${difficulty}.

Return ONLY valid JSON in this format:

[
  {
    "question": "Question",
    "answer": "Answer"
  }
]

Rules:
- Generate exactly ${count} flashcards.
- Keep the difficulty ${difficulty}.
- No markdown.
- No explanations.
- No numbering.
- No extra text.
`;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });

    const text = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

module.exports = {
  generateFlashcards,
};
