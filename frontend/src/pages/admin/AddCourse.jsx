// src/components/AddCourse.jsx
import React, { useState } from "react";
import { TextField, Button, Typography, Box, Paper, Grid } from "@mui/material";
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
    videos: [{ title: "", url: "" }],
  });
  const handleVideoChange = (index, field, value) => {
    const updatedVideos = [...form.videos];
    updatedVideos[index][field] = value;
    setForm({ ...form, videos: updatedVideos });
  };

  const addVideoField = () => {
    setForm({ ...form, videos: [...form.videos, { title: "", url: "" }] });
  };

  const removeVideoField = (index) => {
    const updatedVideos = form.videos.filter((_, i) => i !== index);
    setForm({ ...form, videos: updatedVideos });
  };

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
            <Typography variant="h6">Lecture Videos</Typography>
            {form.videos.map((video, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <TextField
                  label="Video Title"
                  fullWidth
                  value={video.title}
                  onChange={(e) =>
                    handleVideoChange(index, "title", e.target.value)
                  }
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Video URL"
                  fullWidth
                  value={video.url}
                  onChange={(e) =>
                    handleVideoChange(index, "url", e.target.value)
                  }
                  sx={{ mb: 1 }}
                />
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => removeVideoField(index)}
                  disabled={form.videos.length === 1}
                >
                  Remove
                </Button>
              </Box>
            ))}
            <Button variant="outlined" onClick={addVideoField}>
              Add Another Video
            </Button>
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
