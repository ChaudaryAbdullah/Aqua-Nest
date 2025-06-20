import express from "express";
import { User } from "../models/userModel.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.userName ||
      !req.body.address ||
      !req.body.dob ||
      !req.body.email ||
      !req.body.password
      //   !req.body.isAdmin
    ) {
      return res.status(400).send({ message: "Please fill all the fields" });
    }
    const newUser = new User({
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      dob: req.body.dob,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin || false, // Default to false if not provided
    });
    await newUser.save();
    return res.status(201).send({ message: "New User created successfully!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const Users = await User.find();
    return res.status(200).send(Users);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/:userName", async (req, res) => {
  try {
    const User = await User.findOne({
      userName: req.params.userName,
    });

    if (!User) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send(User);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.userName ||
      !req.body.address ||
      !req.body.dob ||
      !req.body.email ||
      !req.body.password
    ) {
      return res.status(400).send({ message: "Please fill all the fields" });
    }

    const User = await User.findById(req.params.id);
    if (!User) {
      return res.status(404).send({ message: "User not found" });
    }
    User.userName = req.body.userName;
    User.firstName = req.body.firstName;
    User.lastName = req.body.lastName;
    User.address = req.body.address;
    User.dob = req.body.dob;
    User.email = req.body.email;
    User.password = req.body.password;
    User.isAdmin = req.body.isAdmin || false; // Default to false if not provided
    if (req.body.isAdmin !== undefined) {
      User.isAdmin = req.body.isAdmin;
    }
    await User.save();
    return res.status(200).send({ message: "User updated successfully!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const User = await User.findByIdAndDelete(id);
    if (!User) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send({ message: "User deleted successfully!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

export default router;
