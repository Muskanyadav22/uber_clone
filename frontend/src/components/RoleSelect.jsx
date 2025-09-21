import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelect({ type }) {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  const handleContinue = () => {
    if (!role) return;
    if (type === "login") {
      if (role === "user") navigate("/login");
      if (role === "driver") navigate("/driver-login");
    } else {
      if (role === "user") navigate("/signup");
      if (role === "driver") navigate("/driver-signup");
    }
  };

  return (
    <div className="form-container">
      <h2>Select Role for {type === "login" ? "Login" : "Signup"}</h2>
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="user">Rider</option>
        <option value="driver">Driver</option>
      </select>
      <button onClick={handleContinue} disabled={!role} style={{ marginTop: 16 }}>
        Continue
      </button>
    </div>
  );
}
