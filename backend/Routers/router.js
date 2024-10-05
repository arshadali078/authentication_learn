const express = require("express");
const router = new express.Router();
const User = require("../models/User"); // Assuming this is your user model
const bcrypt = require("bcryptjs"); // Use bcryptjs for simpler setup

// Register route
router.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Check for missing fields
  if (!name || !email || !password || !confirmPassword) {
    return res.status(422).json({ error: "Please fill all the details" });
  }

  try {
    // Normalize email to avoid case sensitivity issues
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const preUser = await User.findOne({ email: normalizedEmail });
    if (preUser) {
      return res.status(422).json({ error: "Email already exists" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(422).json({ error: "Password and confirmation do not match" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const finalUser = new User({
      name,
      email: normalizedEmail, // Store the normalized email
      password: hashedPassword,
    });

    // Save the user data
    const savedUser = await finalUser.save();
    console.log(savedUser);

    // Send a success response
    res.status(201).json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    // Catch block for errors
    console.log("Error during registration:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check for missing fields
  if (!email || !password) {
    return res.status(422).json({ error: "Please fill all the details" });
  }

  try {
    // Normalize email to avoid case sensitivity issues
    const normalizedEmail = email.toLowerCase().trim();

    // Find user by email
    const uservalid = await User.findOne({ email: normalizedEmail });

    if (!uservalid) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, uservalid.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate token
    const token = await uservalid.generateAuthToken(); // Ensure this method exists in the model

    // Send response with token and user details
    return res.status(200).json({
      message: "Login successful",
      token: token,
      user: { name: uservalid.name, email: uservalid.email },
    });

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Failed to login" });
  }
});

module.exports = router;
