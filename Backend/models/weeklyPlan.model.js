import mongoose from "mongoose";

const weeklyPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    semesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
      required: true
    },

    weekStartDate: {
      type: Date,
      required: true
    },

    sessions: [
      {
        subjectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject"
        },
        day: String, // Monday, Tuesday...
        hours: Number,
        completed: {
          type: Boolean,
          default: false
        }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("WeeklyPlan", weeklyPlanSchema);
