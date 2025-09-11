import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, driversRes, ridesRes] = await Promise.all([
        API.get("/admin/users"),
        API.get("/admin/drivers"),
        API.get("/admin/rides")
      ]);
      setUsers(usersRes.data);
      setDrivers(driversRes.data);
      setRides(ridesRes.data);
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard data...</div>;

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      {error && <div className="error">{error}</div>}

      <div className="dashboard-section">
        <h3>Users ({users.length})</h3>
        <div className="card-container">
          {users.map((user) => (
            <div key={user.id} className="card">
              <h3>{user.name}</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Drivers ({drivers.length})</h3>
        <div className="card-container">
          {drivers.map((driver) => (
            <div key={driver.id} className="card">
              <h3>{driver.name}</h3>
              <p><strong>Car Number:</strong> {driver.car_number}</p>
              <p><strong>Status:</strong> <span className={`status-${driver.status}`}>{driver.status}</span></p>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Rides ({rides.length})</h3>
        <div className="card-container">
          {rides.map((ride) => (
            <div key={ride.id} className="card">
              <h3>Ride #{ride.id}</h3>
              <p><strong>From:</strong> {ride.pickup}</p>
              <p><strong>To:</strong> {ride.destination}</p>
              <p><strong>Status:</strong> <span className={`status-${ride.status}`}>{ride.status}</span></p>
              {ride.driver_name && <p><strong>Driver:</strong> {ride.driver_name}</p>}
              {ride.rider_name && <p><strong>Rider:</strong> {ride.rider_name}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}