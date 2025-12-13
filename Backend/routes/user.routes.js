import express from "express";

import { getMe, setActiveSemester } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", getMe);
router.put("/active-semester", setActiveSemester);

export default router;
