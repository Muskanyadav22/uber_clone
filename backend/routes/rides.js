const express = require("express");
const router = express.Router();
const { createRideController, getAllRidesController, getRideByIdController, getPendingRidesController, deleteRideController } = require("../controllers/ridesController");
const authMiddleware = require("../middleware/authMiddleware");

const { acceptRideController } = require("../controllers/ridesController");

// Rider creates ride
router.post("/", authMiddleware("user"), createRideController);

// Get rides
router.get("/", authMiddleware(), getAllRidesController);
router.get("/:id", authMiddleware(), getRideByIdController);

// Pending rides for driver
router.get("/pending/all", authMiddleware("driver"), getPendingRidesController);

// Driver accepts ride
router.patch("/:id/accept", authMiddleware("driver"), acceptRideController);

// Delete ride
router.delete("/:id", authMiddleware("admin"), deleteRideController);

module.exports = router;