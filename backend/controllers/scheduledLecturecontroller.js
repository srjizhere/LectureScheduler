const ScheduledLecture = require("../models/ScheduledLecture");

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

    const lectures = await ScheduledLecture.find({ instructor, date });

    const conflict = lectures.find((lec) => lec.time === time);

    if (conflict) {
      return res
        .status(400)
        .json({ error: "Lecture time overlaps for this instructor" });
    }

    const lecture = new ScheduledLecture(req.body);
    await lecture.save();
    res.json(lecture);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
