import Semester from "../models/semester.model.js";

// GET ALL SEMESTERS
export const getSemesters = async (req, res) => {
  const semesters = await Semester.find().sort({ semNumber: 1 });
  res.json(semesters);
};

// SEED SEMESTERS (run once)
export const seedSemesters = async (req, res) => {
  const existing = await Semester.find();
  if (existing.length > 0) {
    return res.json({ message: "Semesters already exist" });
  }

  const data = [];
  for (let i = 1; i <= 8; i++) {
    data.push({ semNumber: i });
  }

  await Semester.insertMany(data);
  res.json({ message: "Semesters seeded" });
};
