const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");// import jwt 
const pool = require("../db");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "Username already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const newUser = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, hashedPassword]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: newUser.rows[0]
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const userResult = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({
        message: "Invalid username or password"
      });
    }

    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid username or password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

module.exports = router;