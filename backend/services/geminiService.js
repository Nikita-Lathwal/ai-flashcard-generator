const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateFlashcards = async (topic) => {
  try {
    const prompt = `
You are an AI Flashcard Generator.

Generate exactly 10 flashcards on the topic "${topic}".

Return ONLY valid JSON in this format:

[
  {
    "question": "Question",
    "answer": "Answer"
  }
]

Rules:
- Exactly 10 flashcards
- No markdown
- No explanations
- No numbering
- No extra text
`;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });

    const text = response.text
     .replace(/```json/g, "")
     .replace(/```/g, "")
     .trim();

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

module.exports = {
  generateFlashcards,
};