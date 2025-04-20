// src/layouts/AdminLayout.jsx
import React from "react";
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  CssBaseline,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import { Link, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
const drawerWidth = 240;

const AdminLayout = () => {
  const navItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Instructors", path: "/admin/instructors" },
    { name: "Add Course", path: "/admin/add-course" },
    { name: "Schedule Lecture", path: "/admin/schedule-lecture" },
    { name: "All Lectures", path: "/admin/lectures" },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Admin Dashboard
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          {navItems.map((item) => (
            <ListItem button key={item.name} component={Link} to={item.path}>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
            <ListItem button onClick={handleLogout}>
    <ListItemText primary="Logout" />
  </ListItem>
        </List>
        
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
