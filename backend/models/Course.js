const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    title: String,
    video: String,
  },
);

const courseSchema = new mongoose.Schema({
  name: String,
  level: String,
  description: String,
  image: String,
  lectures: [lectureSchema],
});

module.exports = mongoose.model("Course", courseSchema);
