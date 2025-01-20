import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../store/userAuthSlice/userAuthThunk";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { clearTask } from "../store/taskSlice/taskSlice";

const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();

  const handleRedirect = async (path) => {
    if (path === "/login" && isLoggedIn) {
      dispatch(logout());
      dispatch(clearTask());
    }
    return <Navigate to={path} />;
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          TO DO APP
        </Typography>
        <Box>
          <Button
            color="inherit"
            onClick={() => handleRedirect("/home")}
            sx={{ marginRight: 2 }}
          >
            Home
          </Button>
          <Button color="inherit" onClick={() => handleRedirect("/login")}>
            {isLoggedIn ? "Log out" : "Login"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
