// src/components/AddCourse.jsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createCourse } from "../../services/courseService";
import { fetchCourses } from "../../redux/slices/courseSlice";

const AddCourse = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    level: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCourse(form);
      dispatch(fetchCourses());
      setForm({ name: "", level: "", description: "", image: "" });
    } catch (error) {
      console.error("Failed to add course", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Add New Course
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Course Name"
              name="name"
              fullWidth
              value={form.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Level"
              name="level"
              fullWidth
              value={form.level}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={4}
              value={form.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Image URL"
              name="image"
              fullWidth
              value={form.image}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Add Course
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default AddCourse;
