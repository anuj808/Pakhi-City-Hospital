import Navbar from "../components/Navbar";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import doctorImg from "../assets/doctor.png";

function Home() {
  return (
    <>
      <Navbar />
<section className="bg-gradient-to-r from-green-50 to-green-100 py-20">

  <div className="max-w-7xl mx-auto px-6 md:px-12">

    <div className="grid md:grid-cols-2 gap-12 items-center">

      {/* LEFT SIDE */}
      <div className="space-y-6">

        <h1 className="text-4xl md:text-5xl font-bold text-green-900 leading-tight">
          Providing Quality <br />
          Healthcare Services
        </h1>

        <p className="text-gray-600 text-lg max-w-xl">
          Our hospital offers advanced medical facilities,
          expert doctors, and compassionate care to ensure
          the best treatment for every patient.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="#about"
            className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-full font-semibold shadow-md transition"
          >
            Learn More
          </a>

          <a
            href="#contact"
            className="border-2 border-green-700 text-green-700 hover:bg-green-100 px-8 py-3 rounded-full font-semibold transition"
          >
            Contact Us
          </a>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-center md:justify-end">
        <img
          src={doctorImg}
          alt="Doctor"
          className="w-80 md:w-[450px] rounded-3xl shadow-2xl"
        />
      </div>

    </div>

  </div>

</section>
      <AboutSection />
      <ContactSection />
    </>
  );
}

export default Home;