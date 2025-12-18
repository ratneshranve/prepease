import StudyGoal from "../models/studyGoal.model.js";
import WeeklyPlan from "../models/weeklyPlan.model.js";
import Subject from "../models/subject.model.js";

export const buildAIContext = async (user) => {
  const semesterId = user.activeSemesterId;

  // Subjects
  const subjects = await Subject.find({ semesterId }).select("name");

  // Study goals
  const goals = await StudyGoal.find({
    userId: user._id,
    semesterId
  }).populate("subjectId", "name");

  // Current week plan
  const weeklyPlan = await WeeklyPlan.findOne({
    userId: user._id,
    semesterId
  }).sort({ createdAt: -1 });

  return {
    studentName: user.name,
    branch: user.branch,
    semesterId,
    subjects: subjects.map(s => s.name),
    goals: goals.map(g => ({
      subject: g.subjectId.name,
      hoursPerWeek: g.hoursPerWeek,
      priority: g.priority
    })),
    todayPlan: weeklyPlan
      ? weeklyPlan.sessions.filter(
          s => s.day === new Date().toLocaleString("en-US", { weekday: "long" })
        )
      : []
  };
};
