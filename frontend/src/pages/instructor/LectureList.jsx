import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  CircularProgress,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchLectures } from "../../redux/slices/lectureSlice";
import { fetchCourses } from "../../redux/slices/courseSlice";

// Simulating logged-in instructor ID for now
const instructorId = "your-instructor-id"; // Replace with real logic if using auth

const InstructorLectureList = () => {
  const dispatch = useDispatch();
  const { lectures, loading } = useSelector((state) => state.lectures);
  const { courses } = useSelector((state) => state.courses);

  const [filterCourse, setFilterCourse] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    dispatch(fetchLectures());
    dispatch(fetchCourses());
  }, [dispatch]);

  const getCourseName = (id) => {
    const course = courses.find((c) => c._id === id);
    return course ? course.name : "Unknown";
  };

  const filteredLectures = lectures.filter(
    (lecture) =>
      lecture.instructorId === instructorId &&
      (filterCourse === "" || lecture.courseId === filterCourse) &&
      (filterStatus === "" || lecture.status === filterStatus)
  );

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        My Lectures
      </Typography>

      <Box display="flex" gap={2} mb={2}>
        <TextField
          select
          label="Filter by Course"
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          {courses.map((course) => (
            <MenuItem key={course._id} value={course._id}>
              {course.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Filter by Status"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Attended">Attended</MenuItem>
          <MenuItem value="Not Attended">Not Attended</MenuItem>
        </TextField>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLectures.map((lecture) => (
                <TableRow key={lecture._id}>
                  <TableCell>{getCourseName(lecture.courseId)}</TableCell>
                  <TableCell>{lecture.date}</TableCell>
                  <TableCell>{lecture.time}</TableCell>
                  <TableCell>{lecture.duration} min</TableCell>
                  <TableCell>{lecture.status || "Not Attended"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default InstructorLectureList;
