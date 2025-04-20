const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" },
  date: String,
  time: String,
  duration: Number,
  attendanceStatus: {
    type: String,
    enum: ["Attended", "Not Attended"],
    default: "Not Attended",
  },
});

module.exports = mongoose.model("Lecture", lectureSchema);
