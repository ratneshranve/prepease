import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getMe, setActiveSemester } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", authMiddleware, getMe);
router.put("/active-semester", authMiddleware, setActiveSemester);

export default router;
