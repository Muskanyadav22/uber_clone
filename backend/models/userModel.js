const pool = require("../db");

const createUser = async (name, email, password, role) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
    [name, email, password, role]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

const getAllUsers = async () => {
  const result = await pool.query("SELECT id, name, email, role FROM users");
  return result.rows;
};

module.exports = { createUser, findUserByEmail, getAllUsers };