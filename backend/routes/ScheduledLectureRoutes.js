const express = require("express");
const router = express.Router();
const scheduledLectureontroller = require("../controllers/scheduledLecturecontroller");

router.get("/", scheduledLectureontroller.getLectures);
router.post("/", scheduledLectureontroller.scheduleLecture);

module.exports = router;
