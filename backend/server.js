const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const authMiddleware = require("./middleware/authMiddleware");

const userRoutes = require("./routes/user");
const driverRoutes = require("./routes/driver");
const rideRoutes = require("./routes/rides");
const adminRoutes = require("./routes/admin");

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true
}));

app.use("/api/users", userRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!", timestamp: new Date() });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const pool = require("./db");

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection FAILED:', err);
  } else {
    console.log('Database connection SUCCESS:', res.rows[0]);
  }
});

app.get("/api/admin/users", authMiddleware("admin"), async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, email, role FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/admin/drivers", authMiddleware("admin"), async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, car_number, status FROM drivers");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/admin/rides", authMiddleware("admin"), async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.*, u.name as rider_name, d.name as driver_name 
      FROM rides r 
      LEFT JOIN users u ON r.rider_id = u.id 
      LEFT JOIN drivers d ON r.driver_id = d.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/drivers/rides", authMiddleware("driver"), async (req, res) => {
  try {
    const driverId = req.user.id;
    const result = await pool.query(`
      SELECT r.*, u.name as rider_name 
      FROM rides r 
      LEFT JOIN users u ON r.rider_id = u.id 
      WHERE r.driver_id = $1
    `, [driverId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/rides", authMiddleware(), async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    
    let query, params;
    
    if (userRole === "user") {
      query = `
        SELECT r.*, u.name as rider_name, d.name as driver_name 
        FROM rides r 
        LEFT JOIN users u ON r.rider_id = u.id 
        LEFT JOIN drivers d ON r.driver_id = d.id 
        WHERE r.rider_id = $1
      `;
      params = [userId];
    } else {
      query = `
        SELECT r.*, u.name as rider_name, d.name as driver_name 
        FROM rides r 
        LEFT JOIN users u ON r.rider_id = u.id 
        LEFT JOIN drivers d ON r.driver_id = d.id
      `;
      params = [];
    }
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
