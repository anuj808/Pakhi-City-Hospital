import { useState } from "react";
import axios from "axios";

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
  const [loading, setLoading] = useState(false);

  const today = new Date().toLocaleDateString();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await axios.post(
      "https://pakhi-city-hospital.onrender.com/api/payment/create-order",
      { phone: formData.phone }
    );

    if (res.data.existing) {
      const confirmRes = await axios.post(
        "https://pakhi-city-hospital.onrender.com/api/appointments/confirm",
        formData
      );
      setToken(confirmRes.data.tokenNumber);
      setLoading(false);
      return;
    }

    setOrderData(res.data.order);
    setShowPayment(true);
    setLoading(false);
  };

  const openRazorpay = () => {
    const options = {
      key: "rzp_test_SJc8MDd9VpJqMh",
      amount: orderData.amount,
      currency: "INR",
      order_id: orderData.id,
      name: "Pakhi Hospital",
      description: "Registration Fee ₹305",

      handler: async function (response) {
        const receiptRes = await axios.post(
          "https://pakhi-city-hospital.onrender.com/api/payment/verify-payment",
          { ...response, formData },
          { responseType: "blob" }
        );

        const url = window.URL.createObjectURL(
          new Blob([receiptRes.data], { type: "application/pdf" })
        );

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Pakhi_Hospital_Receipt.pdf");
        document.body.appendChild(link);
        link.click();

        window.URL.revokeObjectURL(url);

        setShowPayment(false);
        setToken("Confirmed");
      },

      theme: { color: "#15803d" }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4 py-12">

      <div className="bg-white w-full max-w-lg p-10 rounded-3xl shadow-2xl">

        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-8 text-sm font-medium text-gray-500">
          <span className={!showPayment && !token ? "text-green-700" : ""}>
            1. Details
          </span>
          <span className={showPayment ? "text-green-700" : ""}>
            2. Payment
          </span>
          <span className={token ? "text-green-700" : ""}>
            3. Confirmed
          </span>
        </div>

        <h1 className="text-3xl font-bold text-green-900 text-center">
          Book Appointment
        </h1>

        <p className="text-center text-gray-500 text-sm mt-2">
          Date: {today}
        </p>

        {!token && (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 bg-gray-50"
            />

            <input
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 bg-gray-50"
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 bg-gray-50"
            />

            <input
              name="phone"
              placeholder="Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 bg-gray-50"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-full font-semibold transition shadow-lg disabled:opacity-60"
            >
              {loading ? "Processing..." : "Continue"}
            </button>

            <p className="text-center text-xs text-gray-400 mt-3">
              🔒 Secure Payment powered by Razorpay
            </p>

          </form>
        )}

        {/* Success Screen */}
        {token && (
          <div className="mt-10 text-center">

            <div className="text-6xl mb-4">🎉</div>

            <h2 className="text-2xl font-bold text-green-900">
              Appointment Confirmed
            </h2>

            <p className="mt-4 text-gray-600">
              Your token has been generated successfully.
            </p>

            <div className="mt-6 bg-green-100 border border-green-300 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-green-900">
                Please visit hospital after 9:00 AM
              </h3>
            </div>

          </div>
        )}

      </div>

      {/* PAYMENT MODAL */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white w-full max-w-sm p-8 rounded-3xl shadow-2xl text-center">

            <h2 className="text-xl font-semibold text-green-900">
              Complete Payment
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Registration Fee: ₹305
            </p>

            <button
              onClick={openRazorpay}
              className="mt-6 w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-full font-semibold transition"
            >
              Pay ₹305
            </button>

            <p className="text-xs text-gray-400 mt-4">
              UPI | Cards | Net Banking supported
            </p>

          </div>

        </div>
      )}

    </section>
  );
}

export default BookPage;