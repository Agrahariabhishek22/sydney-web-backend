const express = require("express");
const router = express.Router();
const User = require("../models/userDetail");
const {scrapeAndSave} =require('../controller/scrapeController')

// @route GET /api/events
router.get("/scrape", scrapeAndSave);

router.post("/details", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "Email already saved" });
    }
    // Save new email
    const newUser = new User({ email });
    await newUser.save();

    res.status(201).json({ message: "Email saved successfully" });
  } catch (error) {
    console.error("Error saving email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await User.find({}, 'email'); // Fetch only email field
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
