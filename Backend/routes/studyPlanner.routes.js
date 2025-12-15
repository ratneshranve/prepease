import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  setStudyGoals,
  generateWeeklyPlan
} from "../controllers/studyPlanner.controller.js";

const router = express.Router();

router.post("/study-goals", authMiddleware, setStudyGoals);
router.post("/study-plans/generate", authMiddleware, generateWeeklyPlan);

export default router;
