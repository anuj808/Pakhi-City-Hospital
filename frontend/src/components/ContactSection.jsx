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

          {/* RIGHT SIDE - EMBEDDED GOOGLE MAP */}
          <div className="rounded-3xl overflow-hidden shadow-2xl h-72 md:h-96">

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3497.425620238041!2d79.4906973!3d28.766561399999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0712250bf1aa3%3A0xc3889590daaa6c11!2sCITY%20HOSPITAL!5e0!3m2!1sen!2sin!4v1772009338822!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Pakhi Hospital Location"
            ></iframe>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ContactSection;