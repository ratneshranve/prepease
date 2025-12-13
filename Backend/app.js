import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

const app = express();

// Import Routes
import authRoutes from "./routes/auth.routes.js";
import semesterRoutes from "./routes/semester.routes.js";
import userRoutes from "./routes/user.routes.js";

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/semesters", semesterRoutes);
app.use("/user", userRoutes);

// Connect to Database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
