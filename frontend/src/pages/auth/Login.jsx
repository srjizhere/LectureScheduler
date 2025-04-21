// src/pages/auth/Login.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import {
  Box, Button, Container, TextField, Typography, MenuItem
} from "@mui/material";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    type: "admin",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(formData));
    if (res.meta.requestStatus === "fulfilled") {
      const route = formData.type === "admin" ? "/admin" : "/instructor";
      navigate(route);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth margin="normal"
            label="Email" name="email" type="email"
            value={formData.email} onChange={handleChange}
          />
          <TextField
            fullWidth margin="normal"
            label="Password" name="password" type="password"
            value={formData.password} onChange={handleChange}
          />
          <TextField
            fullWidth margin="normal"
            select name="type" label="Login As"
            value={formData.type} onChange={handleChange}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="instructor">Instructor</MenuItem>
          </TextField>
          {error && <Typography color="error">{error}</Typography>}
          <Button
            fullWidth type="submit"
            variant="contained" color="primary"
            sx={{ mt: 2 }} disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
