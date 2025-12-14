import Subject from "../models/subject.model.js";

export const getSubjectsBySemester = async (req, res) => {
  try {
    const user = req.user;

    if (!user.activeSemesterId) {
      return res.status(400).json({
        message: "Please select semester first"
      });
    }

    const subjects = await Subject.find({
      semesterId: user.activeSemesterId,
      branch: user.branch
    }).sort({ name: 1 });

    res.json(subjects);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch subjects" });
  }
};
