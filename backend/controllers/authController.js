const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Instructor = require("../models/Instructor");
const bcrypt = require("bcryptjs");

const generateToken = (id, type) => {
  return jwt.sign({ id, type }, process.env.JWT_SECRET, {
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
    let userType;

    if (type === "admin") {
      user = await Admin.findOne({ email });
      userType = "admin";
    } else if (type === "instructor") {
      user = await Instructor.findOne({ email });
      userType = "instructor";
    } else {
      return res.status(400).json({ message: "Invalid user type" });
    }

    if (!user) {
      return res.status(404).json({ message: `${userType} not found` });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      type: userType,
      token: generateToken(user._id, userType), // 👈 Use backend-validated type here
    });
  } catch (error) {
    return res.status(500).json({ message: "Login failed", error: error.message });
  }
};

module.exports = {
  loginUser,
};
