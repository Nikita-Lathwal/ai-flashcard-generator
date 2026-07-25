import axios from "axios";

const API_URL = "http://localhost:5000/api/ai";

export const generateFlashcards = async (topic, count, difficulty) => {
  try {
    const response = await axios.post(`${API_URL}/generate`, {
      topic,
      count, difficulty,
    });

    return response.data;
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
};