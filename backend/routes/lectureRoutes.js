const express = require("express");
const router = express.Router();
const lectureController = require("../controllers/lectureController");

router.get("/", lectureController.getLectures);
router.post("/", lectureController.scheduleLecture);

module.exports = router;
