const { createRide, getAllRides, getRideById, getPendingRides, updateRideStatus, deleteRide, getRidesByRiderId } = require("../models/rideModel");
const { getAllDrivers, updateDriverStatus } = require("../models/driverModel");

const createRideController = async (req, res) => {
  try {
    const { pickup, destination } = req.body;
    const rider_id = req.user.id;

    const drivers = await getAllDrivers();
    const availableDriver = drivers.find(d => d.status === "available");

    let driver_id = null;
    if (availableDriver) {
      driver_id = availableDriver.id;
      await updateDriverStatus(driver_id, "busy");
    }

    const ride = await createRide(rider_id, pickup, destination, driver_id);
    res.status(201).json(ride);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllRidesController = async (req, res) => {
  try {
    if (req.user.role === "user") {
      const rides = await getRidesByRiderId(req.user.id);
      return res.json(rides);
    }
    
    const rides = await getAllRides();
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRideByIdController = async (req, res) => {
  try {
    const ride = await getRideById(req.params.id);
    if (!ride) return res.status(404).json({ message: "Ride not found" });
    
    if (req.user.role === "user" && ride.rider_id !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }
    
    if (req.user.role === "driver" && ride.driver_id !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }
    
    res.json(ride);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPendingRidesController = async (req, res) => {
  try {
    const rides = await getPendingRides();
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteRideController = async (req, res) => {
  try {
    const result = await deleteRide(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const acceptRideController = async (req, res) => {
  console.log("acceptRideController called", { rideId: req.params.id, driverId: req.user.id }); // Log request info
  try {
    const rideId = req.params.id;
    const driverId = req.user.id;
    const updatedRide = await updateRideStatus(rideId, "accepted", driverId);
    if (!updatedRide) return res.status(404).json({ message: "Ride not found" });
    
    await updateDriverStatus(driverId, "busy");
    res.json(updatedRide);
  } catch (err) {
    console.error("Error in acceptRideController:", err); 
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createRideController, getAllRidesController, getRideByIdController, getPendingRidesController, deleteRideController, acceptRideController };