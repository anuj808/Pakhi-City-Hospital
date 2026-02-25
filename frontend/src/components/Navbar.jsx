import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 md:px-16 py-4 flex justify-between items-center">

      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="w-10" />
        <h2 className="text-xl font-bold text-green-900">
          Pakhi Hospital
        </h2>
      </div>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8 font-medium text-gray-700">

        <Link to="/" className="hover:text-green-700 transition">
          Home
        </Link>

        <a href="#about" className="hover:text-green-700 transition">
          About
        </a>

        <a href="#contact" className="hover:text-green-700 transition">
          Contact
        </a>

        <Link
          to="/book-test"
          className="hover:text-green-700 transition"
        >
          Book Tests
        </Link>

        <Link
          to="/book"
          className="bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 transition"
        >
          Book Appointment
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;