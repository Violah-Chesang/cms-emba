const User = require("../models/user");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

// Register a new user
router.post("/backend/user/register", async (req, res) => {
  try {
    const { firstname, lastname, userName, email, password, role } = req.body;

    if (!(firstname && lastname && userName && email && password && role)) {
      return res
        .status(400)
        .json({ message: "Please enter all the required information" });
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).json({ message: "Member already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser = new User({
      firstname,
      lastname,
      userName,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "Member Registered!", data: newUser });
  } catch (err) {
    console.error("Error registering user: ", err);
    res.status(500).json({ message: "Error registering user!", error: err });
  }
});

// Login user
router.post("/backend/user/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!(userName && password)) {
      return res
        .status(400)
        .json({ message: "Please enter your Username and Password!" });
    }

    const userInDb = await User.findOne({ userName });
    if (!userInDb) {
      return res.status(404).json({ message: "User not found" });
    }

    const passInDb = userInDb.password;

    const isCorrectPass = await bcrypt.compare(password, passInDb);
    if (!isCorrectPass) {
      return res.status(401).json({ message: "Incorrect password!" });
    }

    const tokenData = {
      name: userInDb.userName,
      userType: userInDb.role,
    };
    const signedToken = jwt.sign(tokenData, process.env.jwt_secret, {
      expiresIn: "1h",
    });
    const data = {
      token: signedToken,
    };

    res.status(200).json({ message: "Successfully logged in", data: data });
  } catch (err) {
    console.error("Error during login: ", err);
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
});

// Get a user by username
router.post("/backend/get-user", async (req, res) => {
  try {
    const { userName } = req.body;

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user: ", err);
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
});

module.exports = router;
