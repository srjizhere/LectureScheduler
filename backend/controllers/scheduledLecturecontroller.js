const ScheduledLecture = require("../models/ScheduledLecture");
const moment = require("moment");

exports.getLectures = async (req, res) => {
  try {
    let query = {}; 

    if (req.instructor) {
      query.instructor = req.instructor._id;
    }

    const lectures = await ScheduledLecture.find(query)
      .populate("instructor")
      .populate("course");

    res.json(lectures);
  } catch (err) {
    res.status(500).json({ error: err.message }); 
  }
};

exports.scheduleLecture = async (req, res) => {
  try {
    const { instructorId, courseId, date, time, duration } = req.body;

    const newStart = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm");
    const newEnd = moment(newStart).add(duration, "minutes");

    const existingLectures = await ScheduledLecture.find({
      instructor: instructorId
    });

    const conflict = existingLectures.find((lecture) => {
      const existingStart = moment(`${lecture.date} ${lecture.time}`, "YYYY-MM-DD HH:mm");
      const existingEnd = moment(existingStart).add(lecture.duration, "minutes");

      return newStart.isBefore(existingEnd) && existingStart.isBefore(newEnd);
    });

    if (conflict) {
      return res.status(400).json({
        error: "Lecture time overlaps for this instructor.",
      });
    }

    const newLecture = new ScheduledLecture({
      instructor: instructorId,
      course: courseId,
      date,
      time,
      duration,
    });

    await newLecture.save();
    res.status(201).json(newLecture);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




exports.deleteLecture = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await ScheduledLecture.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Lecture not found" });
    }

    res.json({ message: "Lecture deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error" });
  }
};


exports.MarkAsAttended = async (req, res) => {
  try {
    const lectureId = req.params.id;

    const updatedLecture = await ScheduledLecture.findByIdAndUpdate(
      lectureId,
      { attendanceStatus: "Attended" },
      { new: true }
    );

    if (!updatedLecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    res.status(200).json(updatedLecture);
  } catch (error) {
    res.status(500).json({ message: "Failed to mark lecture as attended", error: error.message });
  }
}