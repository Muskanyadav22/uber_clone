import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");
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
      if (form.role === "driver") {
        setError("Please use the Driver Signup form to register as a driver.");
        setLoading(false);
        return;
      }
      await API.post("/users/register", form);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Create Your Account</h2>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Full Name" 
          onChange={handleChange} 
          required 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={handleChange} 
          required 
        />

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="user">Rider</option>
          <option value="driver">Driver</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
      
      <p className="text-center mt-2">
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
}

export default SignupPage;