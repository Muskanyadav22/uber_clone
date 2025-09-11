const { getAllUsers } = require("../models/userModel");
const { getAllDrivers } = require("../models/driverModel");
const { getAllRides } = require("../models/rideModel");

const listUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const listDrivers = async (req, res) => {
  try {
    const drivers = await getAllDrivers();
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const listRides = async (req, res) => {
  try {
    const rides = await getAllRides();
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { listUsers, listDrivers, listRides };