import User from "../models/user.model.js";
import Semester from "../models/semester.model.js";

// GET LOGGED-IN USER
export const getMe = async (req, res) => {
  res.json({
    studentId: req.user.studentId,
    name: req.user.name,
    email: req.user.email,
    branch: req.user.branch,
    activeSemesterId: req.user.activeSemesterId
  });
};

// SET ACTIVE SEMESTER
export const setActiveSemester = async (req, res) => {
  const { semesterId } = req.body;

  const semester = await Semester.findById(semesterId);
  if (!semester) {
    return res.status(400).json({ message: "Invalid semester" });
  }

  req.user.activeSemesterId = semesterId;
  await req.user.save();

  res.json({
    message: "Active semester updated",
    activeSemesterId: semesterId
  });
};
