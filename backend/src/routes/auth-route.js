const express = require("express");
const router = express.Router();
const {
  createUser,
  getUserByEmail,
  getUserByID,
  deleteUser,
  getAllUsers,
  updateUser,
} = require("../service/auth-service");
const { checkPassword } = require("../security/encryption");
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await getUserByEmail(email);
  if (result.length !== 0) {
    const user = result[0];
    const matchedPassword = await checkPassword(password, user.password);
    if (matchedPassword) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "invalid password" });
    }
  } else {
    res.status(404).json({ message: "User not found!" });
  }
});

router.post("/signup", async (req, res) => {
  const user = req.body;
  console.log(user);
  const existingUser = await getUserByEmail(user.email);

  if (existingUser.length > 0) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }

  try {
    const success = await createUser(user);
    if (success) {
      res.status(201).json({ message: "User created successfully" });
    } else {
      res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/update", async (req, res) => {
  const userId = req.query.id;
  const updatedUser = req.body;
  try {
    console.log(userId);
    const existingUser = await getUserByID(userId);
    if (!existingUser || existingUser.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const success = await updateUser(userId, updatedUser);

    if (success) {
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res.status(500).json({ message: "Failed to update user" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  const result = await getAllUsers();
  res.status(200).json(result);
});

router.delete("/delete", async (req, res) => {
  const userId = req.query.id;

  try {
    const existingUser = await getUserByID(userId);
    if (!existingUser || existingUser.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const success = await deleteUser(userId);

    if (success) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(500).json({ message: "Failed to delete user" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
