const Instructor = require("../models/Instructor");

exports.getInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addInstructor = async (req, res) => {
  try {
    const newInstructor = new Instructor(req.body);
    await newInstructor.save();
    res.json(newInstructor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(instructor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
