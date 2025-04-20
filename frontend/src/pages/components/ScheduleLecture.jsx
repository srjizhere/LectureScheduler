// src/components/ScheduleLecture.jsx
import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../redux/slices/courseSlice";
import { fetchInstructors } from "../../redux/slices/instructorSlice";
import { fetchLectures } from "../../redux/slices/lectureSlice";
import { scheduleLecture } from "../../services/lectureService";

const ScheduleLecture = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.courses);
  const { instructors } = useSelector((state) => state.instructors);
  const { lectures } = useSelector((state) => state.lectures);

  const [lectureData, setLectureData] = useState({
    courseId: "",
    instructorId: "",
    date: "",
    time: "",
    duration: 60,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchInstructors());
    dispatch(fetchLectures());
  }, [dispatch]);

  const handleChange = (e) => {
    setLectureData({
      ...lectureData,
      [e.target.name]: e.target.value,
    });
  };

  const checkConflict = () => {
    const selectedDate = lectureData.date;
    const selectedTime = lectureData.time;
    const selectedInstructor = lectureData.instructorId;

    const selectedStart = new Date(`${selectedDate}T${selectedTime}`);
    const selectedEnd = new Date(selectedStart.getTime() + lectureData.duration * 60000);

    return lectures.some((lecture) => {
      if (lecture.instructorId !== selectedInstructor) return false;

      const lectureStart = new Date(`${lecture.date}T${lecture.time}`);
      const lectureEnd = new Date(lectureStart.getTime() + lecture.duration * 60000);

      return (
        selectedStart < lectureEnd && selectedEnd > lectureStart
      );
    });
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (checkConflict()) {
      setError("This instructor already has a lecture during the selected time.");
      return;
    }

    try {
      await scheduleLecture(lectureData);
      dispatch(fetchLectures());
      setSuccess("Lecture scheduled successfully!");
      setLectureData({
        courseId: "",
        instructorId: "",
        date: "",
        time: "",
        duration: 60,
      });
    } catch (err) {
      console.error(err);
      setError("Something went wrong while scheduling the lecture.");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Schedule a Lecture
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Course"
            name="courseId"
            value={lectureData.courseId}
            onChange={handleChange}
          >
            {courses.map((course) => (
              <MenuItem key={course._id} value={course._id}>
                {course.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Instructor"
            name="instructorId"
            value={lectureData.instructorId}
            onChange={handleChange}
          >
            {instructors.map((inst) => (
              <MenuItem key={inst._id} value={inst._id}>
                {inst.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Date"
            type="date"
            name="date"
            value={lectureData.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Time"
            type="time"
            name="time"
            value={lectureData.time}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Duration (minutes)"
            type="number"
            name="duration"
            value={lectureData.duration}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            Schedule Lecture
          </Button>
        </Grid>

        {error && (
          <Grid item xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}

        {success && (
          <Grid item xs={12}>
            <Alert severity="success">{success}</Alert>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default ScheduleLecture;
