import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructors } from "../../redux/slices/instructorSlice";
import { fetchCourses } from "../../redux/slices/courseSlice";
import { fetchLectures } from "../../redux/slices/lectureSlice";
import { scheduleLecture } from "../../services/lectureService";

const ScheduleLecture = () => {
  const dispatch = useDispatch();
  const { instructors } = useSelector((state) => state.instructors);
  const { courses } = useSelector((state) => state.courses);
  const { lectures } = useSelector((state) => state.lectures);

  const [form, setForm] = useState({
    instructorId: "",
    courseId: "",
    date: "",
    time: "",
    duration: 60, // default 1 hour
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    dispatch(fetchInstructors());
    dispatch(fetchCourses());
    dispatch(fetchLectures());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const checkConflict = () => {
    const newStart = new Date(`${form.date}T${form.time}`);
    const newEnd = new Date(newStart.getTime() + form.duration * 60000);

    return lectures.some((lecture) => {
      if (lecture.instructorId !== form.instructorId) return false;
      const existingStart = new Date(`${lecture.date}T${lecture.time}`);
      const existingEnd = new Date(
        existingStart.getTime() + (lecture.duration || 60) * 60000
      );

      return (
        newStart < existingEnd &&
        newEnd > existingStart
      );
    });
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!form.instructorId || !form.courseId || !form.date || !form.time) {
      setError("Please fill all fields.");
      return;
    }

    if (checkConflict()) {
      setError("Schedule conflict: This instructor already has a lecture during this time.");
      return;
    }

    try {
      await scheduleLecture(form);
      dispatch(fetchLectures());
      setSuccess("Lecture scheduled successfully!");
      setForm({
        instructorId: "",
        courseId: "",
        date: "",
        time: "",
        duration: 60,
      });
    } catch (err) {
      setError(err?.response?.data?.error  || "cannot delete request");
    }
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Schedule Lecture
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Instructor"
            name="instructorId"
            value={form.instructorId}
            onChange={handleChange}
          >
            {instructors.map((instructor) => (
              <MenuItem key={instructor._id} value={instructor._id}>
                {instructor.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Course"
            name="courseId"
            value={form.courseId}
            onChange={handleChange}
          >
            {courses.map((course) => (
              <MenuItem key={course._id} value={course._id}>
                {course.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            type="date"
            label="Date"
            name="date"
            InputLabelProps={{ shrink: true }}
            value={form.date}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            type="time"
            label="Time"
            name="time"
            InputLabelProps={{ shrink: true }}
            value={form.time}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            type="number"
            label="Duration (mins)"
            name="duration"
            value={form.duration}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            Schedule
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ScheduleLecture;
