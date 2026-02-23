import { useState } from "react";
import "../styles/about.css";

import doctorImg from "../assets/doctor.png";
import hospitalImg from "../assets/hospital.png";
import staffImg from "../assets/staff.png";
import servicesImg from "../assets/services.png";

function AboutSection() {

  const [activeCard, setActiveCard] = useState(null);

  const toggleCard = (cardName) => {
    setActiveCard((prev) => (prev === cardName ? null : cardName));
  };

  return (
    <section id="about" className="about-section">
      <h1 className="about-title">About Pakhi Hospital</h1>

      <div className="card-container">

        {/* Doctor */}
        <div className="about-card">
          <img src={doctorImg} alt="Doctor" />
          <h2>Dr. Promod Sharma</h2>
          <p>Experienced MBBS doctor providing quality healthcare.</p>

          {activeCard === "doctor" && (
            <div className="extra-content">
              <p>
                Dr. Promod Sharma has over 10 years of experience in
                general medicine and patient-focused treatment.
              </p>
            </div>
          )}

          <button
            className="card-btn"
            onClick={() => toggleCard("doctor")}
          >
            {activeCard === "doctor" ? "Show Less" : "Show More"}
          </button>
        </div>


        {/* Hospital */}
        <div className="about-card">
          <img src={hospitalImg} alt="Hospital" />
          <h2>Our Hospital</h2>
          <p>Clean and well-equipped healthcare facility.</p>

          {activeCard === "hospital" && (
            <div className="extra-content">
              <p>
                ICU facilities, operation theater, digital lab reports,
                and 24/7 emergency care.
              </p>
            </div>
          )}

          <button
            className="card-btn"
            onClick={() => toggleCard("hospital")}
          >
            {activeCard === "hospital" ? "Show Less" : "Show More"}
          </button>
        </div>


        {/* Staff */}
        <div className="about-card">
          <img src={staffImg} alt="Staff" />
          <h2>Our Staff</h2>
          <p>Dedicated and professional medical team.</p>

          {activeCard === "staff" && (
            <div className="extra-content">
              <p>
                Certified nurses, lab technicians, and reception team
                ensuring patient comfort and safety.
              </p>
            </div>
          )}

          <button
            className="card-btn"
            onClick={() => toggleCard("staff")}
          >
            {activeCard === "staff" ? "Show Less" : "Show More"}
          </button>
        </div>


        {/* Services */}
        <div className="about-card">
          <img src={servicesImg} alt="Services" />
          <h2>Our Services</h2>
          <p>Comprehensive diagnostic and treatment services.</p>

          {activeCard === "services" && (
            <div className="extra-content">
              <ul>
                <li>✔ X-Ray</li>
                <li>✔ Blood Test</li>
                <li>✔ ECG</li>
                <li>✔ Consultation</li>
              </ul>
            </div>
          )}

          <button
            className="card-btn"
            onClick={() => toggleCard("services")}
          >
            {activeCard === "services" ? "Show Less" : "Show More"}
          </button>
        </div>

      </div>
    </section>
  );
}

export default AboutSection;