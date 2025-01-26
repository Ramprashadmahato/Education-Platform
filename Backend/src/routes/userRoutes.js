const express = require("express");
const User = require("../models/User"); // Import the User model
const router = express.Router();

// GET: Get all users (ensure only admin can access this)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

// GET: Get a user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

// PUT: Update a user (e.g., name, email, password, role, profile)
router.put("/:id", async (req, res) => {
  const { name, email, password, role, profile } = req.body;

  try {
    // Find user by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Prepare the data to be updated
    const updates = {
      name,
      email,
      role,
      profile,
      password, // If password is provided, it will be hashed automatically
    };

    // Update the user using the custom updateUser method
    await user.updateUser(updates); // This calls the updateUser method to hash password if needed

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

// PATCH: Update the status of a user (activate/deactivate)
router.patch("/:id/status", async (req, res) => {
  try {
    const { action } = req.body; // action should be "activate" or "deactivate"
    
    if (!["activate", "deactivate"].includes(action)) {
      return res.status(400).json({ message: "Invalid action. Must be 'activate' or 'deactivate'." });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the user's status
    user.status = action === "activate" ? "active" : "inactive";
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user status." });
  }
});

// DELETE: Remove a user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User has been removed " });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to remove user" });
  }
});

module.exports = router;
