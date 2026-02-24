function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 px-4 bg-gradient-to-b from-green-50 to-white"
    >
      <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">
              Contact Us
            </h1>

            <p className="text-gray-600 mb-8 leading-relaxed">
              We are here to help you. Reach out to Pakhi Hospital
              for appointments, emergency support, or any inquiries.
            </p>

            <div className="space-y-4 text-gray-700">

              <p>
                <span className="font-semibold text-green-800">
                  Address:
                </span>{" "}
                Bareilly, Uttar Pradesh, India
              </p>

              <p>
                <span className="font-semibold text-green-800">
                  Phone:
                </span>{" "}
                +91 9876543210
              </p>

              <p>
                <span className="font-semibold text-green-800">
                  Email:
                </span>{" "}
                info@pakhihospital.com
              </p>

              <p>
                <span className="font-semibold text-green-800">
                  Working Hours:
                </span>{" "}
                9:00 AM – 6:00 PM (Daily)
              </p>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white rounded-3xl shadow-xl p-6 flex items-center justify-center h-72 md:h-80">

            <div className="text-green-700 text-lg font-medium">
              📍 Location Map
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ContactSection;