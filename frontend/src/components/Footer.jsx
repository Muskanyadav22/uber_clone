import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span>© {new Date().getFullYear()} UrbanRide. All rights reserved.</span>
        <span>Made by your team</span>
      </div>
    </footer>
  );
}
