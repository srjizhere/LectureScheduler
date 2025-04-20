const jwt = require("jsonwebtoken");
const Instructor = require("../models/Instructor");
const Admin = require("../models/Admin"); 

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 
  
  if (!token) {
    return res.status(401).json({ message: "Not authorized, missing token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const { type, id } = decoded;
    
    if (type === "admin") {
      req.admin = await Admin.findById(id).select("-password");
      if (!req.admin) {
        return res.status(401).json({ message: "Admin not found" });
      }
    } else if (type === "instructor") {
      req.instructor = await Instructor.findById(id).select("-password");
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
