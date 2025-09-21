const express = require("express");
const router = express.Router();
const { createRideController, getAllRidesController, getRideByIdController, getPendingRidesController, deleteRideController } = require("../controllers/ridesController");
const authMiddleware = require("../middleware/authMiddleware");

const { acceptRideController } = require("../controllers/ridesController");

router.post("/", authMiddleware("user"), createRideController);

router.get("/", authMiddleware(), getAllRidesController);
router.get("/:id", authMiddleware(), getRideByIdController);

router.get("/pending/all", authMiddleware("driver"), getPendingRidesController);

router.patch("/:id/accept", authMiddleware("driver"), acceptRideController);

router.delete("/:id", authMiddleware("admin"), deleteRideController);

module.exports = router;