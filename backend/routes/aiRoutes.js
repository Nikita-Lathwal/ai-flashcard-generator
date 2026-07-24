const express = require("express");
const { generateAIFlashcards } = require("../controllers/aiControllers");

const router = express.Router();

router.post("/generate", generateAIFlashcards);

module.exports = router;