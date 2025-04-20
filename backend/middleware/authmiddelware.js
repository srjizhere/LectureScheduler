const jwt = require("jsonwebtoken");
const Instructor = require("../models/Instructor");
const Admin = require("../models/Admin"); // Assuming you have a separate model

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const userType = req.headers.type || req.type; // check both header and internal use

  if (!token || !userType) {
    return res.status(401).json({ message: "Not authorized, missing token or user type" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (userType === "admin") {
      req.admin = await Admin.findById(decoded.id).select("-password");
      if (!req.admin) {
        return res.status(401).json({ message: "Admin not found" });
      }
    } else if (userType === "instructor") {
      req.instructor = await Instructor.findById(decoded.id).select("-password");
      if (!req.instructor) {
        return res.status(401).json({ message: "Instructor not found" });
      }
    } else {
      return res.status(400).json({ message: "Invalid user type" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Token failed", error: error.message });
  }
};

module.exports = protect;
