const express = require("express");
const router = express.Router();
const { listUsers, listDrivers, listRides } = require("../controllers/adminController");
const { adminLogin } = require("../controllers/adminAuthController");

router.post("/login", adminLogin);
const authMiddleware = require("../middleware/authMiddleware");

router.get("/users", authMiddleware("admin"), listUsers);
router.get("/drivers", authMiddleware("admin"), listDrivers);
router.get("/rides", authMiddleware("admin"), listRides);

module.exports = router;