const express = require("express");
const router = express.Router();
const { registerUser, loginUser, listUsers, logoutUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Public
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected
router.get("/", authMiddleware("admin"), listUsers);
router.post("/logout", authMiddleware(), logoutUser);

module.exports = router;