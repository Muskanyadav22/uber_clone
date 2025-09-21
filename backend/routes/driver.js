const express = require("express");
const router = express.Router();
const { signupDriver, loginDriver, getDriverRides, acceptRide, rejectRide, logoutDriver } = require("../controllers/driverController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", signupDriver);
router.post("/login", loginDriver);

router.get("/rides", authMiddleware("driver"), getDriverRides);
router.put("/:id/accept", authMiddleware("driver"), acceptRide);
router.put("/:id/reject", authMiddleware("driver"), rejectRide);
router.post("/logout", authMiddleware("driver"), logoutDriver);

module.exports = router;