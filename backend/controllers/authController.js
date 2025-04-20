const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Instructor = require("../models/Instructor");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const loginUser = async (req, res) => {
  const { email, password, type } = req.body;

  if (!email || !password || !type) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    let user;
    if (type === "admin") {
      user = await Admin.findOne({ email });
    } else if (type === "instructor") {
      user = await Instructor.findOne({ email });
    } else {
      return res.status(400).json({ message: "Invalid user type" });
    }

    if (!user) {
      return res.status(404).json({ message: `${type} not found` });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      type,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({ message: "Login failed", error: error.message });
  }
};

module.exports = {
  loginUser,
};
