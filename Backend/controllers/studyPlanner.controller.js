import StudyGoal from "../models/studyGoal.model.js";
import WeeklyPlan from "../models/weeklyPlan.model.js";

/* 1️⃣ Set semester goals (ONE TIME) */
export const setStudyGoals = async (req, res) => {
  const userId = req.user._id;
  const semesterId = req.user.activeSemesterId;
  const { goals } = req.body; 
  // goals = [{ subjectId, hoursPerWeek, priority }]

  await StudyGoal.deleteMany({ userId, semesterId });
  const savedGoals = await StudyGoal.insertMany(
    goals.map(g => ({ ...g, userId, semesterId }))
  );

  res.json({ message: "Study goals saved", goals: savedGoals });
};

/* 2️⃣ Generate weekly plan */
export const generateWeeklyPlan = async (req, res) => {
  const userId = req.user._id;
  const semesterId = req.user.activeSemesterId;

  const goals = await StudyGoal.find({ userId, semesterId });

  if (!goals.length) {
    return res.status(400).json({ message: "Set goals first" });
  }

  // Simple distribution logic (can improve later)
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let sessions = [];

  goals.forEach(goal => {
    const perDay = goal.hoursPerWeek / days.length;
    days.forEach(day => {
      sessions.push({
        subjectId: goal.subjectId,
        day,
        hours: perDay
      });
    });
  });

  const plan = await WeeklyPlan.create({
    userId,
    semesterId,
    weekStartDate: new Date(),
    sessions
  });

  res.json({ message: "Weekly plan generated", plan });
};
