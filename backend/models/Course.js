const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: String,
  level: String,
  description: String,
  image: String,
  lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }],
});

module.exports = mongoose.model("Course", courseSchema);
