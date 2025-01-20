import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../store/taskSlice/taskThunk";
import { deleteTask, updateTask } from "../store/taskSlice/taskSlice";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Panel = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [open, setOpen] = useState(false);
  const tasks = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleClose = () => {
    setForm({});
    setOpen(false);
  };

  const handleEdit = (id) => {
    setOpen(true);
    setForm(tasks[id]);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        console.error(res.status);
      }
      dispatch(deleteTask(id));
    } catch (err) {
      console.log(`error deleting task with id: ${id}, ${err}`);
    }
  };

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
      const res = await fetch(`http://localhost:3000/tasks/${form._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          desc: form.desc,
          completed: form.completed,
        }),
        credentials: "include",
      });
      if (!res.ok) {
        console.error(res.status);
      }
      dispatch(updateTask(form));
      handleClose();
    } catch (err) {
      console.log(`error creating task, ${err}`);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`editing task: ${form.title}`}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              name="title"
              value={form.title}
              onChange={handleUpdate}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Author"
              name="author"
              value={form.author}
              disabled
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              name="desc"
              value={form.desc}
              onChange={handleUpdate}
              fullWidth
              margin="normal"
            />
            <Checkbox
              name="completed"
              checked={form.completed}
              onChange={handleUpdate}
            />
            <label htmlFor="completed">Completed</label>
            <DialogActions>
              <Button onClick={handleClose} color="error">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <TableContainer
        component={Paper}
        sx={{
          margin: "10vh auto",
          width: "80vw",
          height: "55vh",
          overflow: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "15%", fontWeight: "bold" }}>
                Title
              </TableCell>
              <TableCell sx={{ width: "15%", fontWeight: "bold" }} l>
                By
              </TableCell>
              <TableCell sx={{ width: "30%", fontWeight: "bold" }} l>
                Description
              </TableCell>
              <TableCell
                sx={{ width: "10%", fontWeight: "bold", textAlign: "center" }}
              >
                Completed
              </TableCell>
              <TableCell
                sx={{ width: "30%", fontWeight: "bold", textAlign: "center" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(tasks).map((id) => (
              <TableRow key={id}>
                <TableCell>{tasks[id].title}</TableCell>
                <TableCell>{tasks[id].author}</TableCell>
                <TableCell>{tasks[id].desc}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Checkbox checked={tasks[id].completed} disabled />
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ marginRight: 2 }}
                    onClick={() => handleDelete(id)}
                  >
                    Delete
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(id)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Panel;
