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
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch, useSelector } from "react-redux";
import { fetchLectures } from "../../redux/slices/lectureSlice";
import { fetchInstructors } from "../../redux/slices/instructorSlice";
import { fetchCourses } from "../../redux/slices/courseSlice";
import { deleteLecture } from "../../services/lectureService";

const LectureList = () => {
  const dispatch = useDispatch();
  const { lectures, loading } = useSelector((state) => state.lectures);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchLectures());
    dispatch(fetchInstructors());
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleView = (lecture) => {
    setSelectedLecture(lecture);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedLecture(null);
  };

  const handleDelete = async (lectureId) => {
    if (window.confirm("Are you sure you want to delete this lecture?")) {
      await deleteLecture(lectureId);
      dispatch(fetchLectures());
    }
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
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lectures.map((lecture) => (
                <TableRow key={lecture._id}>
                  <TableCell>{lecture.course?.name}</TableCell>
                  <TableCell>{lecture.instructor?.name}</TableCell>
                  <TableCell>{lecture.date}</TableCell>
                  <TableCell>{lecture.time}</TableCell>
                  <TableCell>{lecture.duration} min</TableCell>
                  <TableCell align="center">
                  
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(lecture._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
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
