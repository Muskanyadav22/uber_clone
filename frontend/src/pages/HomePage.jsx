import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import FAQSection from "../components/FAQSection";


function HomePage() {
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  return (
    <div>
      
      <section
        className="hero"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 420,
          background: "#fff",
          padding: "32px 0 32px 0",
          gap: 32,
        }}
      >
        
        <div style={{ flex: 1, maxWidth: 520, padding: "0 32px", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: 700, marginBottom: 18, lineHeight: 1.1, textAlign: "center" }}>
            Welcome to UrbanRide
          </h1>
          <p style={{ fontSize: "1.15rem", marginBottom: 18, color: "#222", textAlign: "center", maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
            Book rides, become a driver, or manage with admin panel.
          </p>
          <div style={{ marginBottom: 18, textAlign: "center" }}>
            <span style={{ color: "#0a7d32", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 15, justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ display: "inline" }}><circle cx="10" cy="10" r="10" fill="#eafbe7"/><path d="M7.5 10.5l2 2 3-4" stroke="#0a7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Up to 50% off your first 5 rides.
            </span>
            <div style={{ fontSize: 13, color: "#444", marginTop: 2 }}>*Valid within 15 days of signup.</div>
          </div>
          {!token && (
            <div style={{ display: "flex", gap: 16, marginBottom: 24, justifyContent: "center", textAlign: "center" }}>
              <Link to="/signup-select">
                <button className="btn btn-primary" style={{ minWidth: 120 }}>Sign Up</button>
              </Link>
              <Link to="/login-select">
                <button className="btn btn-secondary" style={{ minWidth: 120 }}>Login</button>
              </Link>
            </div>
          )}
        </div>
        
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", minWidth: 320 }}>
          <img
            src="/image2.png"
            alt="UrbanRide illustration"
            style={{ width: 380, maxWidth: "100%", borderRadius: 24, boxShadow: "0 4px 32px rgba(0,0,0,0.10)" }}
          />
        </div>
      </section>

      
      <section
        style={{
          background: "#fff",
          color: "#111",
          padding: "40px 0",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: "2rem",
            marginBottom: 32,
          }}
        >
          Use UrbanRide to help you travel your way
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 32,
          }}
        >
          <div
            style={{
              background: "#fafafa",
              borderRadius: 16,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              maxWidth: 340,
              padding: 24,
              textAlign: "center",
            }}
          >
            <img
              src="/image3.png"
              alt="Ride options"
              style={{
                width: "100%",
                borderRadius: 12,
                marginBottom: 16,
              }}
            />
            <h3 style={{ fontWeight: 700 }}>Ride options</h3>
            <p>
              There’s more than one way to move with UrbanRide, no matter where
              you are or where you’re headed next.
            </p>
            <button
              className="btn btn-primary"
              style={{ marginTop: 16 }}
            >
              Search ride options
            </button>
          </div>
          <div
            style={{
              background: "#fafafa",
              borderRadius: 16,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              maxWidth: 340,
              padding: 24,
              textAlign: "center",
            }}
          >
            <img
              src="/image4.png"
              alt="Airports"
              style={{
                width: "100%",
                borderRadius: 12,
                marginBottom: 16,
              }}
            />
            <h3 style={{ fontWeight: 700 }}>700+ airports</h3>
            <p>
              You can request a ride to and from most major airports. Schedule a
              ride to the airport for one less thing to worry about.
            </p>
            <button
              className="btn btn-primary"
              style={{ marginTop: 16 }}
            >
              Search airports
            </button>
          </div>
          <div
            style={{
              background: "#fafafa",
              borderRadius: 16,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              maxWidth: 340,
              padding: 24,
              textAlign: "center",
            }}
          >
            <img
              src="/image.png"
              alt="Cities"
              style={{
                width: "100%",
                borderRadius: 12,
                marginBottom: 16,
              }}
            />
            <h3 style={{ fontWeight: 700 }}>15,000+ cities</h3>
            <p>
              The app is available in thousands of cities worldwide, so you can
              request a ride even when you’re far from home.
            </p>
            <button
              className="btn btn-primary"
              style={{ marginTop: 16 }}
            >
              Search cities
            </button>
          </div>
        </div>
      </section>

  

      <FAQSection />
      <Footer />
    </div>
  );
}

export default HomePage;