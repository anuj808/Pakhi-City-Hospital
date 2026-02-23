import "../styles/contact.css";

function ContactSection() {
  return (
    <section id="contact" className="contact-section">

      <div className="contact-wrapper">

        {/* Left Side */}
        <div className="contact-left">
          <h1>Contact Us</h1>

          <p className="contact-desc">
            We are here to help you. Reach out to Pakhi Hospital
            for appointments, emergency support, or any inquiries.
          </p>

          <div className="contact-details">
            <p><strong>Address:</strong> Bareilly, Uttar Pradesh, India</p>
            <p><strong>Phone:</strong> +91 9876543210</p>
            <p><strong>Email:</strong> info@pakhihospital.com</p>
            <p><strong>Working Hours:</strong> 9:00 AM – 6:00 PM (Daily)</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="contact-right">
          <div className="map-placeholder">
            📍 Location Map
          </div>
        </div>

      </div>

    </section>
  );
}

export default ContactSection;