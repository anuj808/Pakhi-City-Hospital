import { useState } from "react";
import doctorImg from "../assets/doctor.png";
import hospitalImg from "../assets/hospital.png";
import staffImg from "../assets/staff.png";
import servicesImg from "../assets/services.png";

function AboutSection() {

  const [activeCard, setActiveCard] = useState(null);

  const toggleCard = (cardName) => {
    setActiveCard((prev) => (prev === cardName ? null : cardName));
  };

  const cards = [
    {
      id: "doctor",
      title: "Dr. Promod Sharma",
      desc: "Experienced MBBS doctor providing quality healthcare.",
      extra:
        "Dr. Promod Sharma has over 10 years of experience in general medicine and patient-focused treatment.",
      img: doctorImg,
    },
    {
      id: "hospital",
      title: "Our Hospital",
      desc: "Clean and well-equipped healthcare facility.",
      extra:
        "ICU facilities, operation theater, digital lab reports, and 24/7 emergency care.",
      img: hospitalImg,
    },
    {
      id: "staff",
      title: "Our Staff",
      desc: "Dedicated and professional medical team.",
      extra:
        "Certified nurses, lab technicians, and reception team ensuring patient comfort and safety.",
      img: staffImg,
    },
    {
      id: "services",
      title: "Our Services",
      desc: "Comprehensive diagnostic and treatment services.",
      extraList: ["X-Ray", "Blood Test", "ECG", "Consultation"],
      img: servicesImg,
    },
  ];

  return (
    <section
      id="about"
      className="py-20 px-4 bg-gradient-to-b from-green-50 to-green-100"
    >
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-14">
          About Pakhi Hospital
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {cards.map((card) => {
            const isActive = activeCard === card.id;

            return (
              <div
                key={card.id}
                className={`bg-white rounded-2xl p-6 text-center shadow-md transition-all duration-300 ${
                  isActive
                    ? "scale-105 shadow-2xl z-10"
                    : "hover:-translate-y-2 hover:shadow-xl"
                }`}
              >

                <img
                  src={card.img}
                  alt={card.title}
                  className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-green-100"
                />

                <h2 className="mt-4 text-lg font-semibold text-green-800">
                  {card.title}
                </h2>

                <p className="text-gray-600 text-sm mt-2">
                  {card.desc}
                </p>

                {isActive && (
                  <div className="mt-4 text-sm text-gray-700 space-y-2">

                    {card.extra && <p>{card.extra}</p>}

                    {card.extraList && (
                      <ul className="space-y-1">
                        {card.extraList.map((item, index) => (
                          <li key={index}>✔ {item}</li>
                        ))}
                      </ul>
                    )}

                  </div>
                )}

                <button
                  onClick={() => toggleCard(card.id)}
                  className="mt-5 bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-full text-sm transition shadow"
                >
                  {isActive ? "Show Less" : "Show More"}
                </button>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default AboutSection;