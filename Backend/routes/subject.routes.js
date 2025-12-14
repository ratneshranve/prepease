import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getSubjectsBySemester } from "../controllers/subject.controller.js";

const router = express.Router();

// ADD authMiddleware HERE
router.get("/subjects", authMiddleware, getSubjectsBySemester);

export default router;
