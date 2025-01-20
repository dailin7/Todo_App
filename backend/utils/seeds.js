import mongoose from "mongoose";
import connectDB from "../config/connectDB.js";
import Task from "../models/task.js";
import User from "../models/user.js";
import argon2 from "argon2";

const seedUsers = [
  { userName: "user1", password: "user1" },
  { userName: "user2", password: "user2" },
  { userName: "user3", password: "user3" },
];

const seedTasks = [
  { title: "cook", desc: "beef", author: "user1" },
  { title: "gym", desc: "lower body", author: "user2" },
  { title: "study", author: "user1" },
  { title: "exam", author: "user2" },
];

const hashPasswords = async (users) => {
  const hasedUsers = await Promise.all(
    users.map(async (user) => ({
      userName: user.userName,
      password: await argon2.hash(user.password),
    })),
  );
  return hasedUsers;
};

const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    console.log("Existing user data deleted successfully.");

    await Task.deleteMany({});
    console.log("Existing task data deleted successfully.");

    const createdUsers = await User.insertMany(await hashPasswords(seedUsers));
    console.log("Users seeded successfully");
    console.log(createdUsers);

    const createdTasks = await Task.insertMany(seedTasks);
    console.log("Tasks seeded successfully");
    console.log(createdTasks);
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

const sample = async () => {
  try {
    await connectDB();
    await seedDatabase();
  } catch (err) {
  } finally {
    mongoose.connection.close();
  }
};

sample();
