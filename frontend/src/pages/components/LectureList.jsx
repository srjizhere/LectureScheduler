// src/components/LectureList.jsx
import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchLectures } from "../../redux/slices/lectureSlice";
import { fetchInstructors } from "../../redux/slices/instructorSlice";
import { fetchCourses } from "../../redux/slices/courseSlice";

const LectureList = () => {
  const dispatch = useDispatch();
  const { lectures, loading } = useSelector((state) => state.lectures);
  const { instructors } = useSelector((state) => state.instructors);
  const { courses } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchLectures());
    dispatch(fetchInstructors());
    dispatch(fetchCourses());
  }, [dispatch]);

  const getInstructorName = (id) => {
    const instructor = instructors.find((i) => i._id === id);
    return instructor ? instructor.name : "Unknown";
  };

  const getCourseName = (id) => {
    const course = courses.find((c) => c._id === id);
    return course ? course.name : "Unknown";
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Scheduled Lectures
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course</TableCell>
                <TableCell>Instructor</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lectures.map((lecture) => (
                <TableRow key={lecture._id}>
                  <TableCell>{lecture?.course?.name}</TableCell>
                  <TableCell>{lecture?.instructor?.name}</TableCell>
                  <TableCell>{lecture.date}</TableCell>
                  <TableCell>{lecture.time}</TableCell>
                  <TableCell>{lecture.duration} min</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default LectureList;
