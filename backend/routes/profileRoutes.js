import { User } from "../models/userModel.js";
import express from "express";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", { email, password });
    // Find user by email
    let user = await User.findOne({
      $or: [{ userName: email }, { email: email }],
    });

    if (!user) {
      return res.status(404).send({ message: "Invalid credentials" });
    }

    // Check password
    if (user.password !== password) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    // if (!req.session) {
    //   return res
    //     .status(500)
    //     .send({ message: "Session not initialized correctly." });
    // }

    // req.session.user = {
    //   id: user._id,
    //   userName: user.userName,
    //   email: user.email,
    // };

    // console.log(req.session.user);
    // Login successful
    res.status(200).send({
      message: "Login successful",
      user: {
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
  }
  res.json({ user: req.session.user });
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid"); // Default session cookie name
    res.json({ message: "Logged out successfully" });
  });
});

export default router;
