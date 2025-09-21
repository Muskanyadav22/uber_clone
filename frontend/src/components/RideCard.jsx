export default function RideCard({ ride, onAccept, onReject, showActions = false }) {
  const getStatusClass = (status) => {
    switch (status) {
      case "pending": return "status-pending";
      case "accepted": return "status-accepted";
      case "rejected": return "status-rejected";
      case "completed": return "status-completed";
      default: return "";
    }
  };

  return (
    <div className="card">
      <h3>Ride #{ride.id}</h3>
      <p><strong>Pickup:</strong> {ride.pickup}</p>
      <p><strong>Destination:</strong> {ride.destination}</p>
      <p><strong>Status:</strong> <span className={getStatusClass(ride.status)}>{ride.status}</span></p>
      {ride.fare !== undefined && <p><strong>Fare:</strong> ₹{ride.fare}</p>}
      {ride.driver_name && <p><strong>Driver:</strong> {ride.driver_name}</p>}
      {ride.rider_name && <p><strong>Rider:</strong> {ride.rider_name}</p>}
      
      {showActions && ride.status === "pending" && (
        <div className="card-actions">
          <button 
            onClick={() => onAccept(ride.id)} 
            className="btn btn-success"
          >
            Accept
          </button>
          <button 
            onClick={() => onReject(ride.id)} 
            className="btn btn-danger"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}