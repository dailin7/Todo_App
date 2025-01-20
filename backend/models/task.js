import mongoose from "mongoose";
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    default: "",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  author: {
    type: String,
    required: true,
  },
});

export default model("Task", taskSchema);



