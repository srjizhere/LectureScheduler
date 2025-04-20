const express = require("express");
const router = express.Router();
const scheduledLectureontroller = require("../controllers/scheduledLecturecontroller");

router.get("/", scheduledLectureontroller.getLectures);
router.post("/", scheduledLectureontroller.scheduleLecture);
router.delete("/:id", scheduledLectureontroller.deleteLecture);

module.exports = router;
