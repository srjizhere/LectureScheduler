// src/components/InstructorList.jsx
import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  CircularProgress,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructors } from "../../redux/slices/instructorSlice";
import {
  addInstructor,
  updateInstructor,
} from "../../services/instructorService";

const InstructorList = () => {
  const dispatch = useDispatch();
  const { instructors, loading } = useSelector((state) => state.instructors);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentInstructor, setCurrentInstructor] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    dispatch(fetchInstructors());
  }, [dispatch]);

  const handleOpen = (instructor = null) => {
    setEditMode(!!instructor);
    setCurrentInstructor(instructor || { name: "", email: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentInstructor({ name: "", email: "" });
  };

  const handleChange = (e) => {
    setCurrentInstructor({
      ...currentInstructor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const instructorData = { ...currentInstructor };
      if (!instructorData.password) delete instructorData.password; // avoid sending empty password
  
      if (editMode) {
        await updateInstructor(currentInstructor._id, instructorData);
      } else {
        await addInstructor(instructorData);
      }
  
      dispatch(fetchInstructors());
      handleClose();
    } catch (error) {
      console.error("Failed to save instructor", error);
    }
  };
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Instructor List</Typography>
        <Button variant="contained" onClick={() => handleOpen()}>
          Add Instructor
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Table sx={{ mt: 3, minWidth: 650 }} aria-label="instructors table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {instructors.map((instructor) => (
              <TableRow key={instructor._id}>
                <TableCell>{instructor.name}</TableCell>
                <TableCell>{instructor.email}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleOpen(instructor)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editMode ? "Edit Instructor" : "Add Instructor"}
        </DialogTitle>
     
<DialogContent>
  <TextField
    margin="dense"
    name="name"
    label="Name"
    fullWidth
    value={currentInstructor.name}
    onChange={handleChange}
  />
  <TextField
    margin="dense"
    name="email"
    label="Email"
    fullWidth
    value={currentInstructor.email}
    onChange={handleChange}
  />
  <TextField
    margin="dense"
    name="password"
    label={editMode ? "New Password (optional)" : "Password"}
    type="password"
    fullWidth
    value={currentInstructor.password}
    onChange={handleChange}
  />
</DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editMode ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default InstructorList;
