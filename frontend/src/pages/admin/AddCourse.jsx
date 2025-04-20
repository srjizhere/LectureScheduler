import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleVideoChange = (index, field, value) => {
    const updatedVideos = [...form.videos];
    updatedVideos[index][field] = value;
    setForm((prev) => ({ ...prev, videos: updatedVideos }));
  };

  const addVideoField = () => {
    setForm((prev) => ({
      ...prev,
      videos: [...prev.videos, { title: "", url: "" }],
    }));
  };

  const removeVideoField = (index) => {
    setForm((prev) => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCourse(form);
      dispatch(fetchCourses());
      setForm({
        name: "",
        level: "",
        description: "",
        image: "",
        videos: [{ title: "", url: "" }],
      });
    } catch (error) {
      console.error("Failed to add course", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 700, margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Add New Course
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {["name", "level", "description", "image"].map((field) => (
            <Grid item xs={12} key={field}>
              <TextField
                label={field === "image" ? "Image URL" : field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                fullWidth
                value={form[field]}
                onChange={handleChange}
                multiline={field === "description"}
                rows={field === "description" ? 4 : 1}
                required={field !== "description" && field !== "image"}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Lecture Videos
            </Typography>
            {form.videos.map((video, index) => (
              <Grid container spacing={1} key={index} alignItems="center" sx={{ mb: 1 }}>
                <Grid item xs={5}>
                  <TextField
                    label="Video Title"
                    fullWidth
                    value={video.title}
                    onChange={(e) => handleVideoChange(index, "title", e.target.value)}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    label="Video URL"
                    fullWidth
                    value={video.url}
                    onChange={(e) => handleVideoChange(index, "url", e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    onClick={() => removeVideoField(index)}
                    disabled={form.videos.length === 1}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={addVideoField}
              sx={{ mt: 1 }}
            >
              Add Video
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
