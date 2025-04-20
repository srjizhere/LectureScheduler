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

    const course = new Course({name,level,image,description,lectures:videos});
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
