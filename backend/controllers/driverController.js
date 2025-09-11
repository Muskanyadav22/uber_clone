const jwt = require("jsonwebtoken");
const { createDriver, findDriverById, getAllDrivers, updateDriverStatus } = require("../models/driverModel");
const { updateRideStatus, getRidesByDriverId } = require("../models/rideModel");
require("dotenv").config();

// Signup driver
const signupDriver = async (req, res) => {
  try {
    const { name, car_number } = req.body;
    const newDriver = await createDriver(name, car_number);
    res.json(newDriver);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login driver
const loginDriver = async (req, res) => {
  try {
    const { driver_id } = req.body;
    const driver = await findDriverById(driver_id);
    if (!driver) return res.status(404).json({ error: "Driver not found" });

    const token = jwt.sign({ id: driver.id, role: "driver", userType: "driver" }, process.env.JWT_SECRET, { expiresIn: "8h" });
    res.json({ message: "Login successful", token, driver });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get rides for a driver
const getDriverRides = async (req, res) => {
  try {
    const driver_id = req.user.id;
    const rides = await getRidesByDriverId(driver_id);
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Accept ride
const acceptRide = async (req, res) => {
  try {
    const ride_id = req.params.id;
    const driver_id = req.user.id;
    const updatedRide = await updateRideStatus(ride_id, "accepted", driver_id);
    if (!updatedRide) return res.status(404).json({ message: "Ride not found" });
    await updateDriverStatus(driver_id, "busy");
    res.json(updatedRide);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reject ride
const rejectRide = async (req, res) => {
  try {
    const ride_id = req.params.id;
    const updatedRide = await updateRideStatus(ride_id, "rejected");
    if (!updatedRide) return res.status(404).json({ message: "Ride not found" });
    res.json(updatedRide);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Logout
const logoutDriver = (req, res) => {
  res.json({ message: "Logout successful" });
};

module.exports = { signupDriver, loginDriver, getDriverRides, acceptRide, rejectRide, logoutDriver };