import { buildAIContext } from "../utils/aiPromptBuilder.js";
import { getAIResponse } from "../services/ai.service.js";

export const handleAIQuery = async (req, res) => {
  try {
    const user = req.user;
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    // 1️⃣ Build context from DB data
    const context = await buildAIContext(user);

    // 2️⃣ Ask AI
    const aiReply = await getAIResponse(query, context);

    // 3️⃣ Send response
    res.json({
      query,
      response: aiReply
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "AI assistant error" });
  }
};
