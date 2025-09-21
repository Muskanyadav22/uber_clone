const { Pool } = require('pg');
const pool = require('../db');


const createAdminTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};


createAdminTable();

const createAdmin = async (username, hashedPassword) => {
  const result = await pool.query(
    'INSERT INTO admin (username, password) VALUES ($1, $2) RETURNING *',
    [username, hashedPassword]
  );
  return result.rows[0];
};

const findAdminByUsername = async (username) => {
  const result = await pool.query(
    'SELECT * FROM admin WHERE username = $1',
    [username]
  );
  return result.rows[0];
};

module.exports = {
  createAdmin,
  findAdminByUsername,
};
