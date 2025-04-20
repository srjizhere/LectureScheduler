const ScheduledLecture = require("../models/ScheduledLecture");
const moment = require("moment");

exports.getLectures = async (req, res) => {
  try {
    const lectures = await ScheduledLecture.find()
      .populate("instructor")
      .populate("course");
    res.json(lectures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.scheduleLecture = async (req, res) => {
  try {
    const { instructor, date, time, duration } = req.body;

    const newStart = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm");
    const newEnd = moment(newStart).add(duration, "minutes");

    const lectures = await ScheduledLecture.find({ instructor, date });

    const conflict = lectures.find((lec) => {
      const existingStart = moment(`${lec.date} ${lec.time}`, "YYYY-MM-DD HH:mm");
      const existingEnd = moment(existingStart).add(lec.duration, "minutes");

      return newStart.isBefore(existingEnd) && existingStart.isBefore(newEnd);
    });

    if (conflict) {
      return res.status(400).json({
        error: "Lecture time overlaps for this instructor",
      });
    }

    const lecture = new ScheduledLecture(req.body);
    await lecture.save();
    res.json(lecture);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

