const Instructor = require("../models/Instructor");
const bcrypt = require("bcryptjs");

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
    const { name, email, password } = req.body;

    
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }


    const existingInstructor = await Instructor.findOne({ email });
    if (existingInstructor) {
      return res.status(400).json({ error: "Instructor with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newInstructor = new Instructor({
      name,
      email,
      password: hashedPassword,
    });

    await newInstructor.save();
    res.json(newInstructor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



exports.updateInstructor = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    } else {
      delete updates.password; 
    }

    const instructor = await Instructor.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    res.json(instructor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
