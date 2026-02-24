import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-10" />
          <h2 className="text-green-800 font-bold text-lg">
            Pakhi Hospital
          </h2>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">

          <li>
            <Link to="/" className="hover:text-green-700 transition">
              Home
            </Link>
          </li>

          <li>
            <a href="#about" className="hover:text-green-700 transition">
              About Us
            </a>
          </li>

          <li>
            <a href="#contact" className="hover:text-green-700 transition">
              Contact
            </a>
          </li>

          <li>
            <Link
              to="/book"
              className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-full transition shadow-md"
            >
              Book Appointment
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-green-800 text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-4 text-gray-700 font-medium">

          <Link to="/" onClick={() => setIsOpen(false)} className="block">
            Home
          </Link>

          <a href="#about" onClick={() => setIsOpen(false)} className="block">
            About Us
          </a>

          <a href="#contact" onClick={() => setIsOpen(false)} className="block">
            Contact
          </a>

          <Link
            to="/book"
            onClick={() => setIsOpen(false)}
            className="block bg-green-700 text-white text-center py-2 rounded-full"
          >
            Book Appointment
          </Link>
        </div>
      )}

    </nav>
  );
}

export default Navbar;