import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../store/taskSlice/taskThunk";
import {
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";

const TaskForm = () => {
  const [form, setForm] = useState({ title: "", desc: "", completed: false });

  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    const value =
      e.target.name === "completed" ? e.target.checked : e.target.value;
    setForm((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        credentials: "include",
      });
      if (!res.ok) {
        console.error(res.status, await res.json());
      }
      dispatch(fetchTasks());
      setForm({ title: "", desc: "", completed: false });
    } catch (err) {
      console.log(`error creating task, ${err}`);
    }
  };

  return (
    <Box
      sx={{
        width: "80vw",
        marginLeft: "10vw",
        marginTop: "10vh",
        boxShadow: 3,
        padding: 2,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <TextField
          label="Title"
          name="title"
          value={form.title}
          onChange={handleUpdate}
          fullWidth
          required
          sx={{ width: "30%" }}
        />
        <TextField
          label="Description"
          name="desc"
          value={form.desc}
          onChange={handleUpdate}
          fullWidth
          sx={{ width: "30%" }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={form.completed}
              onChange={handleUpdate}
              name="completed"
            />
          }
          label="Completed"
          sx={{ width: "10%" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "10%" }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default TaskForm;
