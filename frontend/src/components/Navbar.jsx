import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 md:px-16 py-4">

      <div className="flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-10" />
          <h2 className="text-xl font-bold text-green-900">
            Pakhi Hospital
          </h2>
        </div>

        {/* Desktop Menu */}
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

          <Link to="/book-test" className="hover:text-green-700 transition">
            Book Tests
          </Link>

          <Link
            to="/book"
            className="bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 transition"
          >
            Book Appointment
          </Link>
        </div>

        {/* Hamburger Button (Mobile Only) */}
        <button
          className="md:hidden text-green-900"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <span className="text-3xl">✖</span>
          ) : (
            <span className="text-3xl">☰</span>
          )}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 font-medium text-gray-700">

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-green-700"
          >
            Home
          </Link>

          <a
            href="#about"
            onClick={() => setMenuOpen(false)}
            className="hover:text-green-700"
          >
            About
          </a>

          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="hover:text-green-700"
          >
            Contact
          </a>

          <Link
            to="/book-test"
            onClick={() => setMenuOpen(false)}
            className="hover:text-green-700"
          >
            Book Tests
          </Link>

          <Link
            to="/book"
            onClick={() => setMenuOpen(false)}
            className="bg-green-700 text-white px-4 py-2 rounded-full text-center hover:bg-green-800"
          >
            Book Appointment
          </Link>
        </div>
      )}

    </nav>
  );
}

export default Navbar;