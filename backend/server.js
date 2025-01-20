import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import connectDB from "./config/connectDB.js";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import taskRouter from "./routes/taskRouter.js";

dotenv.config();

const corsOptions = {
  origin: ["http://localhost:3001"],
  methods: "GET,PUT,POST,DELETE",
  credentials: true,
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan(":method :url :status :response-time ms"));
app.use(cors(corsOptions));

app.use("/user", userRouter);
app.use("/tasks", taskRouter);

app.all("*", (_req, res) => {
  return res.status(404).json({ message: "Not Found" });
});

const startServer = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to the database", err);
    process.exit(1);
  }
};

startServer();
