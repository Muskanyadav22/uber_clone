import { useEffect, useState } from "react";
import API from "../services/api";
import RideCard from "../components/RideCard";
import BookRide from "../components/BookRide";

export default function RiderDashboard() {
  const [rides, setRides] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const res = await API.get("/rides");
      setRides(res.data);
    } catch (err) {
      setError("Failed to load rides");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading your rides...</div>;

  return (
    <div className="dashboard">
      <h2>Rider Dashboard</h2>
      {error && <div className="error">{error}</div>}
      <BookRide />
      <div className="dashboard-section">
        <h3>Your Rides</h3>
        <div className="card-container">
          {rides.length > 0 ? (
            rides.map((ride) => (
              <RideCard key={ride.id} ride={ride} />
            ))
          ) : (
            <div className="card">
              <h3>No rides yet</h3>
              <p>Book your first ride to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}