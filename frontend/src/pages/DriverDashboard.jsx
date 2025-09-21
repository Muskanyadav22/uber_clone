import { useEffect, useState } from "react";
import API from "../services/api";
import RideCard from "../components/RideCard";

export default function DriverDashboard() {
  const [pendingRides, setPendingRides] = useState([]);
  const [myRides, setMyRides] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const [pendingRes, myRidesRes] = await Promise.all([
        API.get("/rides/pending/all"),
        API.get("/drivers/rides")
      ]);
      setPendingRides(pendingRes.data);
      setMyRides(myRidesRes.data);
    } catch (err) {
      setError("Failed to load rides");
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (rideId) => {
    try {
      await API.patch(`/rides/${rideId}/accept`);
      setSuccess("Ride accepted successfully");
      fetchRides(); 
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to accept ride");
    }
  };

  const handleReject = async (rideId) => {
    try {
      await API.put(`/drivers/${rideId}/reject`);
      setSuccess("Ride rejected successfully");
      fetchRides(); 
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to reject ride");
    }
  };

  if (loading) return <div className="loading">Loading rides...</div>;

  return (
    <div className="dashboard">
      <h2>Driver Dashboard</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      
      <div className="dashboard-section">
        <h3>Available Rides</h3>
        <div className="card-container">
          {pendingRides.length > 0 ? (
            pendingRides.map((ride) => (
              <RideCard 
                key={ride.id} 
                ride={ride} 
                onAccept={handleAccept}
                onReject={handleReject}
                showActions={true}
              />
            ))
          ) : (
            <div className="card">
              <h3>No pending rides</h3>
              <p>Check back later for new ride requests.</p>
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Your Rides</h3>
        <div className="card-container">
          {myRides.length > 0 ? (
            myRides.map((ride) => (
              <RideCard key={ride.id} ride={ride} />
            ))
          ) : (
            <div className="card">
              <h3>No rides accepted yet</h3>
              <p>Accept a ride from the available rides above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}