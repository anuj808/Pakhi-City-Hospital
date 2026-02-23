import { Link } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-section">
        <img src={logo} alt="Logo" />
        <h2>Pakhi Hospital</h2>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#contact">Contact</a></li>
        <li>
          <Link to="/book" className="nav-btn">
            Book Appointment
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;