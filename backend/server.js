const express = require("express");
const cors = require("cors");


require('dotenv').config()
const connectDB = require("./config/db");
const instructorRoutes = require("./routes/instructorRoutes");
const courseRoutes = require("./routes/courseRoutes");
const lectureRoutes = require("./routes/ScheduledLectureRoutes.js");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authmiddelware.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(protect);

app.use("/api/instructors", instructorRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lectures", lectureRoutes);


const PORT = 5000;

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
