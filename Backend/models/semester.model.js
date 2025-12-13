import mongoose from "mongoose";

const semesterSchema = new mongoose.Schema({
  semNumber: {
    type: Number,
    required: true,
    unique: true
  }
});

export default mongoose.model("Semester", semesterSchema);
