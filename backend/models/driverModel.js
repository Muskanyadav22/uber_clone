const pool = require("../db");

const createDriver = async (name, car_number) => {
  const result = await pool.query(
    "INSERT INTO drivers (name, car_number, status) VALUES ($1,$2,$3) RETURNING *",
    [name, car_number, "available"]
  );
  return result.rows[0];
};

const findDriverById = async (id) => {
  const result = await pool.query("SELECT * FROM drivers WHERE id=$1", [id]);
  return result.rows[0];
};

const findDriverByCarNumber = async (car_number) => {
  const result = await pool.query("SELECT * FROM drivers WHERE car_number=$1", [car_number]);
  return result.rows[0];
};

const getAllDrivers = async () => {
  const result = await pool.query("SELECT id, name, car_number, status FROM drivers");
  return result.rows;
};

const updateDriverStatus = async (id, status) => {
  const result = await pool.query(
    "UPDATE drivers SET status=$1 WHERE id=$2 RETURNING *",
    [status, id]
  );
  return result.rows[0];
};

module.exports = { createDriver, findDriverById, findDriverByCarNumber, getAllDrivers, updateDriverStatus };