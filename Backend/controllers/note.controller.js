import Note from "../models/note.model.js";

export const getNotesBySubject = async (req, res) => {
  try {
    const user = req.user;
    const { subjectId } = req.query;

    if (!user.activeSemesterId) {
      return res.status(400).json({
        message: "Please select semester first"
      });
    }

    if (!subjectId) {
      return res.status(400).json({
        message: "Subject is required"
      });
    }

    const notes = await Note.find({
      semesterId: user.activeSemesterId,
      subjectId,
      branch: user.branch,
      approved: true
    }).sort({ createdAt: -1 });

    res.json(notes);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};
export const uploadNote = async (req, res) => {
  try {
    const user = req.user;
    const { title, type, subjectId } = req.body;

    if (!user.activeSemesterId) {
      return res.status(400).json({
        message: "Select semester before uploading"
      });
    }

    const note = await Note.create({
      title,
      type,
      branch: user.branch,
      semesterId: user.activeSemesterId,
      subjectId,
      fileUrl: req.file.path,
      uploadedBy: user._id
    });

    res.status(201).json({
      message: "Uploaded successfully",
      note
    });

  } catch (error) {
    res.status(500).json({ message: "Upload failed" });
  }
};
