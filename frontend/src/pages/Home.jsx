import Navbar from "../components/Navbar";
import AboutSection from "../components/AboutSection";
import "../styles/home.css";
import doctorImg from "../assets/doctor.png";
import ContactSection from "../components/ContactSection";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-left">
          <h1>
            Providing Quality <br />
            Healthcare Services
          </h1>

          <p>
            Our hospital offers advanced medical facilities,
            expert doctors, and compassionate care.
          </p>

          <div className="hero-buttons">
            <a href="#about" className="primary-btn">
              Learn More
            </a>
          </div>
        </div>

        <div className="hero-right">
          <img src={doctorImg} alt="Doctor" />
        </div>
      </section>

      <AboutSection />
      <ContactSection />
    </>
  );
}

export default Home;