import { useState } from "react";
import API from "../services/api";

export default function BookRide() {
  const [form, setForm] = useState({ pickup: "", destination: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await API.post("/rides", form);
      setSuccess("Ride booked successfully!");
      setForm({ pickup: "", destination: "" });
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to book ride");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Book a Ride</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="pickup" 
          placeholder="Pickup Location" 
          value={form.pickup}
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="destination" 
          placeholder="Destination" 
          value={form.destination}
          onChange={handleChange} 
          required 
        />
        <button type="submit" disabled={loading}>
          {loading ? "Booking Ride..." : "Book Ride"}
        </button>
      </form>
    </div>
  );
}