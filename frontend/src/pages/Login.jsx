import React, { useState } from "react";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import { Navigate } from "react-router-dom";
import { updateLogin } from "../store/userAuthSlice/userAuthSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [user, setUser] = useState({ userName: "", password: "" });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });

      if (!res.ok) {
        alert(`Incorrect credentials`);
        return;
      }
      dispatch(updateLogin(true));
      return <Navigate to="/home" />;
    } catch (err) {
      console.error(`Error login/create user: ${err}`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "25vh",
      }}
    >
      <Paper
        sx={{
          padding: "2vh",
          width: "30vw",
          boxShadow: 5,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="User Name"
            name="userName"
            variant="outlined"
            fullWidth
            required
            value={user.userName}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            label="Password"
            name="password"
            variant="outlined"
            type="password"
            fullWidth
            required
            value={user.password}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>

        <Typography
          variant="body2"
          sx={{ marginTop: 2, textAlign: "center", color: "gray" }}
        >
          *will create a new account if not registered
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
