const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/instructorController");

router.get("/", instructorController.getInstructors);
router.post("/", instructorController.addInstructor);
router.put("/:id", instructorController.updateInstructor);

module.exports = router;
