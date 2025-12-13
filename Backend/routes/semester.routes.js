import express from "express";
import { getSemesters, seedSemesters } from "../controllers/semester.controller.js";

const router = express.Router();

router.get("/", getSemesters);
router.post("/seed", seedSemesters); // run once

export default router;
