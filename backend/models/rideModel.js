const pool = require("../db");

const createRide = async (rider_id, pickup, destination, driver_id = null) => {
  const result = await pool.query(
    "INSERT INTO rides (rider_id, pickup, destination, driver_id, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [rider_id, pickup, destination, driver_id, "pending"]
  );
  return result.rows[0];
};

const getAllRides = async () => {
  const result = await pool.query(`
    SELECT r.*, u.name as rider_name, d.name as driver_name 
    FROM rides r 
    LEFT JOIN users u ON r.rider_id = u.id 
    LEFT JOIN drivers d ON r.driver_id = d.id
    ORDER BY r.created_at DESC
  `);
  return result.rows;
};

const getRideById = async (id) => {
  const result = await pool.query(`
    SELECT r.*, u.name as rider_name, d.name as driver_name 
    FROM rides r 
    LEFT JOIN users u ON r.rider_id = u.id 
    LEFT JOIN drivers d ON r.driver_id = d.id 
    WHERE r.id = $1
  `, [id]);
  return result.rows[0];
};

const getRidesByRiderId = async (rider_id) => {
  const result = await pool.query(`
    SELECT r.*, u.name as rider_name, d.name as driver_name 
    FROM rides r 
    LEFT JOIN users u ON r.rider_id = u.id 
    LEFT JOIN drivers d ON r.driver_id = d.id 
    WHERE r.rider_id = $1
    ORDER BY r.created_at DESC
  `, [rider_id]);
  return result.rows;
};

const getRidesByDriverId = async (driver_id) => {
  const result = await pool.query(`
    SELECT r.*, u.name as rider_name, d.name as driver_name 
    FROM rides r 
    LEFT JOIN users u ON r.rider_id = u.id 
    LEFT JOIN drivers d ON r.driver_id = d.id 
    WHERE r.driver_id = $1
    ORDER BY r.created_at DESC
  `, [driver_id]);
  return result.rows;
};

const deleteRide = async (id) => {
  await pool.query("DELETE FROM rides WHERE id = $1", [id]);
  return { message: "Ride deleted" };
};

const getPendingRides = async () => {
  const result = await pool.query(`
    SELECT r.*, u.name as rider_name 
    FROM rides r 
    LEFT JOIN users u ON r.rider_id = u.id 
    WHERE r.status='pending'
    ORDER BY r.created_at DESC
  `);
  return result.rows;
};

const updateRideStatus = async (id, status, driver_id = null) => {
  let query, values;
  if (driver_id) {
    query = "UPDATE rides SET status = $1, driver_id = $2 WHERE id = $3 RETURNING *";
    values = [status, driver_id, id];
  } else {
    query = "UPDATE rides SET status = $1 WHERE id = $2 RETURNING *";
    values = [status, id];
  }
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { 
  createRide, 
  getAllRides, 
  getRideById, 
  getRidesByRiderId,
  getRidesByDriverId,
  deleteRide, 
  getPendingRides, 
  updateRideStatus 
};