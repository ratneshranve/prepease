import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getNotesBySubject, uploadNote } from "../controllers/note.controller.js";

const router = express.Router();

// GET notes / pyqs
router.get("/notes", authMiddleware, getNotesBySubject);

// UPLOAD note
router.post("/notes", authMiddleware, uploadNote);

export default router;
