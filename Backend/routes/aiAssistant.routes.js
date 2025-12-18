import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { handleAIQuery } from "../controllers/aiAssistant.controller.js";

const router = express.Router();

/*
 POST /ai/ask
 body: { query: "What should I study today?" }
*/
router.post("/ask", authMiddleware, handleAIQuery);

export default router;
