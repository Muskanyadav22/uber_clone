import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <Link to="/" className="navbar-brand">UberClone 🚖</Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {!token && (
          <>
            <Link to="/login-select">Login</Link>
            <Link to="/signup-select">Signup</Link>
          </>
        )}
        {token && (
          <>
            {role === "admin" && <Link to="/admin">Admin Dashboard</Link>}
            {role === "driver" && <Link to="/driver">Driver Dashboard</Link>}
            {role === "user" && <Link to="/rider">Rider Dashboard</Link>}
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}