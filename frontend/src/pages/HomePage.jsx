import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to UberClone 🚖</h1>
        <p>Book rides, become a driver, or manage with admin panel.</p>
        {/* Removed admin login and restored previous homepage buttons */}
        <div className="hero-buttons">
          <Link to="/signup-select">
            <button className="btn btn-primary">Sign Up</button>
          </Link>
          <Link to="/login-select">
            <button className="btn btn-secondary">Login</button>
          </Link>
        </div>
      </section>
      {/* Services Section */}
      <section className="services">
        <h2>Our Services</h2>
        <div className="card-container">
          <div className="card">
            <h3>🚖 Book a Ride</h3>
            <p>Get where you need to go with our reliable ride service.</p>
          </div>
          <div className="card">
            <h3>👨‍✈️ Become a Driver</h3>
            <p>Earn money on your schedule as a driver partner.</p>
          </div>
          <div className="card">
            <h3>📍 Track Your Ride</h3>
            <p>Real-time tracking so you know exactly when your ride will arrive.</p>
          </div>
          <div className="card">
            <h3>🛠 Admin Dashboard</h3>
            <p>Manage users, drivers, and rides with our admin tools.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;