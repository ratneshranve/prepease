import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    branch: {
      type: String,
      required: true
    },
    activeSemesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
