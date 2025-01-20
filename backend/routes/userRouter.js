import express from "express";
import {
  LoginOrCreateUser,
  logout,
  checkLoginStatus,
} from "../controllers/userController.js";
import { isLoggedin } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter
  .post("/login", LoginOrCreateUser)
  .get("/checkLogin", isLoggedin, checkLoginStatus)
  .post("/logout", isLoggedin, logout);

export default userRouter;
