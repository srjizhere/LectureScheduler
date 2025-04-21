const Course = require("../models/Course");

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("lectures");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const  {name,level,image,description,videos} = req.body;
    const lectures = videos.map((v) => ({ title: v.title, video: v.url }));

    const course = new Course({name,level,image,description,lectures:lectures});
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
