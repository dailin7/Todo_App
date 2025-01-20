import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWTKey = process.env.JWTKey;

export const isLoggedin = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .send({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWTKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).send({ message: "Invalid token" });
  }
};
