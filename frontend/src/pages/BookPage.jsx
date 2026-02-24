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
      "https://pakhi-city-hospital.onrender.com/api/payment/create-order",
      { phone: formData.phone }
    );

    if (res.data.existing) {
      const confirmRes = await axios.post(
        "https://pakhi-city-hospital.onrender.com/api/appointments/confirm",
        formData
      );
      setToken(confirmRes.data.tokenNumber);
      return;
    }

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
          "https://pakhi-city-hospital.onrender.com/api/payment/verify-payment",
          { ...response, formData }
        );

        if (verifyRes.data.success) {
          setToken(verifyRes.data.tokenNumber);
          setShowPayment(false);
        }
      },
      theme: { color: "#15803d" }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4 py-12">

      <div className="bg-white w-full max-w-md p-8 md:p-10 rounded-3xl shadow-2xl">

        <h1 className="text-2xl md:text-3xl font-bold text-green-900 text-center">
          Book Appointment
        </h1>

        <p className="text-center text-gray-500 text-sm mt-2">
          Date: {today}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:outline-none bg-gray-50"
          />

          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:outline-none bg-gray-50"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:outline-none bg-gray-50"
          />

          <input
            name="phone"
            placeholder="Mobile Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:outline-none bg-gray-50"
          />

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-full font-semibold transition shadow-lg"
          >
            Proceed to Payment
          </button>

        </form>

        {token && (
          <div className="mt-8 p-6 bg-green-100 border border-green-300 rounded-2xl text-center">
            <h2 className="text-green-800 font-semibold">
              Token Confirmed ✅
            </h2>
            <h3 className="text-3xl font-bold text-green-900 mt-2">
              {token}
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Please visit hospital after 9:00 AM
            </p>
          </div>
        )}
      </div>

      {/* PAYMENT MODAL */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4">

          <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-xl">

            <h2 className="text-lg font-semibold text-green-900 text-center">
              Select Payment Method
            </h2>

            <div className="mt-6 space-y-4">

              {["upi", "card", "netbanking"].map((method) => (
                <div
                  key={method}
                  onClick={() => setSelectedMethod(method)}
                  className={`cursor-pointer border rounded-xl p-4 transition ${
                    selectedMethod === method
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {method === "upi" && (
                    <>
                      <p className="font-medium">UPI</p>
                      <div className="flex gap-2 mt-2 text-xs text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded">GPay</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">PhonePe</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">Paytm</span>
                      </div>
                    </>
                  )}

                  {method === "card" && <p>Credit / Debit Card</p>}
                  {method === "netbanking" && <p>Net Banking</p>}
                </div>
              ))}

            </div>

            <button
              disabled={!selectedMethod}
              onClick={openRazorpay}
              className={`mt-6 w-full py-3 rounded-full font-semibold transition ${
                selectedMethod
                  ? "bg-green-700 hover:bg-green-800 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Pay ₹305
            </button>

          </div>

        </div>
      )}

    </section>
  );
}

export default BookPage;