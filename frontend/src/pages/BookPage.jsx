import { useState } from "react";
import axios from "axios";
import "../styles/book.css";

function BookPage() {

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    age: "",
    phone: ""
  });

  const [token, setToken] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);

  const today = new Date().toLocaleDateString();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:5000/api/payment/create-order",
      { phone: formData.phone }
    );

    // Existing patient
    if (res.data.existing) {
      const confirmRes = await axios.post(
        "http://localhost:5000/api/appointments/confirm",
        formData
      );
      setToken(confirmRes.data.tokenNumber);
      return;
    }

    // New patient → Show payment options
    setOrderData(res.data.order);
    setShowPayment(true);
  };

  const openRazorpay = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: orderData.amount,
      currency: "INR",
      order_id: orderData.id,
      name: "Pakhi Hospital",
      description: "Registration Fee ₹305",
      handler: async function (response) {

        const verifyRes = await axios.post(
          "http://localhost:5000/api/payment/verify-payment",
          { ...response, formData }
        );

        if (verifyRes.data.success) {
          setToken(verifyRes.data.tokenNumber);
          setShowPayment(false);
        }
      },
      method: selectedMethod, // pre-select method
      theme: { color: "#2e7d32" }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <section className="book-section">
      <div className="book-container">

        <h1>Book Appointment</h1>
        <p>Date: {today}</p>

        <form onSubmit={handleSubmit} className="book-form">

          <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
          <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
          <input name="phone" placeholder="Mobile Number" value={formData.phone} onChange={handleChange} required />

          <button type="submit">Proceed to Payment</button>
        </form>

        {/* PAYMENT MODAL */}
        {showPayment && (
          <div className="payment-modal">
            <div className="payment-box">
              <h2>Select Payment Method</h2>

              <div className="payment-options">

                <div
                  className={`option ${selectedMethod === "upi" ? "active" : ""}`}
                  onClick={() => setSelectedMethod("upi")}
                >
                  <p>UPI</p>
                  <div className="upi-icons">
                    <span>GPay</span>
                    <span>PhonePe</span>
                    <span>Paytm</span>
                  </div>
                </div>

                <div
                  className={`option ${selectedMethod === "card" ? "active" : ""}`}
                  onClick={() => setSelectedMethod("card")}
                >
                  <p>Credit / Debit Card</p>
                </div>

                <div
                  className={`option ${selectedMethod === "netbanking" ? "active" : ""}`}
                  onClick={() => setSelectedMethod("netbanking")}
                >
                  <p>Net Banking</p>
                </div>

              </div>

              <button
                disabled={!selectedMethod}
                onClick={openRazorpay}
                className="pay-btn"
              >
                Pay ₹305
              </button>

            </div>
          </div>
        )}

        {token && (
          <div className="token-box">
            <h2>Token Confirmed ✅</h2>
            <h3>Your Token: {token}</h3>
          </div>
        )}

      </div>
    </section>
  );
}

export default BookPage;