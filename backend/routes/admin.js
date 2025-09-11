const express = require("express");
const router = express.Router();
const { listUsers, listDrivers, listRides } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

// Admin routes (JWT with role 'admin')
router.get("/users", authMiddleware("admin"), listUsers);
router.get("/drivers", authMiddleware("admin"), listDrivers);
router.get("/rides", authMiddleware("admin"), listRides);

module.exports = router;