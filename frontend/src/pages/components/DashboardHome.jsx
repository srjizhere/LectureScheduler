// src/components/DashboardHome.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchInstructors } from "../../redux/slices/instructorSlice";
import { fetchCourses } from "../../redux/slices/courseSlice";
import { fetchLectures } from "../../redux/slices/lectureSlice";
import { Grid, Paper, Typography } from "@mui/material";

const DashboardHome = () => {
  const dispatch = useDispatch();
  const { instructors } = useSelector((state) => state.instructors);
  const { courses } = useSelector((state) => state.courses);
  const { lectures } = useSelector((state) => state.lectures);

  useEffect(() => {
    dispatch(fetchInstructors());
    dispatch(fetchCourses());
    dispatch(fetchLectures());
  }, [dispatch]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6">Total Instructors</Typography>
          <Typography variant="h4">{instructors.length}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6">Total Courses</Typography>
          <Typography variant="h4">{courses.length}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6">Scheduled Lectures</Typography>
          <Typography variant="h4">{lectures.length}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DashboardHome;
