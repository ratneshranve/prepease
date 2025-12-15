import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

const app = express();

// Import Routes
import studyPlannerRoutes from "./routes/studyPlanner.routes.js";
import authRoutes from "./routes/auth.routes.js";
import semesterRoutes from "./routes/semester.routes.js";
import userRoutes from "./routes/user.routes.js";
import subjectRoutes from "./routes/subject.routes.js";
import noteRoutes from "./routes/note.routes.js";

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/study-planner", studyPlannerRoutes);
app.use("/auth", authRoutes);
app.use("/semesters", semesterRoutes);
app.use("/user", userRoutes);
app.use("/subjects", subjectRoutes);
app.use("/notes", noteRoutes);

// Connect to Database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
