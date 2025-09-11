import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function DriverSignup() {
  const [form, setForm] = useState({ name: "", car_number: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await API.post("/drivers/signup", form);
      setSuccess("Driver registration successful! You can now login.");
      setForm({ name: "", car_number: "" });
      setTimeout(() => {
        setSuccess("");
        navigate("/driver-login"); // Redirect to driver login after signup
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register as driver");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Become a Driver</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Full Name" 
          value={form.name}
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="car_number" 
          placeholder="Car Number" 
          value={form.car_number}
          onChange={handleChange} 
          required 
        />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register as Driver"}
        </button>
      </form>
    </div>
  );
}