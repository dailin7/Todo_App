import User from "../models/user.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import dotenv from "dotenv";

dotenv.config();
const JWTKey = process.env.JWTKey;

export const LoginOrCreateUser = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName: userName });
    if (user) {
      if (await argon2.verify(user.password, password)) {
        const token = jwt.sign({ userName: user.userName }, JWTKey, {
          expiresIn: "2h",
        });

        res.cookie("token", token, {
          maxAge: 1000 * 3600 * 2,
          httpOnly: true,
          sameSite: "Lax",
          secure: false,
        });

        return res.status(200).send({ message: "Logged in successfully" });
      } else {
        return res
          .status(404)
          .json({ msg: `duplicate username or wrong password` });
      }
    }
    const newUser = new User({
      userName: userName,
      password: await argon2.hash(password),
    });

    await newUser.save();
    const token = jwt.sign({ userName: newUser.userName }, JWTKey, {
      expiresIn: "2h",
    });
    res.cookie("token", token, {
      maxAge: 1000 * 3600 * 2,
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });

    return res.status(201).json({ newUser });
  } catch (err) {
    return res.status(500).json({ msg: `error creating new user: ${err}` });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Logout failed", error });
  }
};

export const checkLoginStatus = async (req, res) => {
  return res.status(200).send({ isLoggedIn: true });
};
