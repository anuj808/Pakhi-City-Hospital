import { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";

function BookTest() {

  const availableTests = [
    "X-Ray",
    "Blood Test",
    "ECG",
    "Urine Test",
    "Thyroid Test"
  ];

  const [selectedTests, setSelectedTests] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: ""
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleTest = (test) => {
    setSelectedTests((prev) =>
      prev.includes(test)
        ? prev.filter((t) => t !== test)
        : [...prev, test]
    );
  };

  const totalAmount = selectedTests.length * 150;

  const handleSubmit = async () => {

    if (!formData.name || !formData.phone) {
      alert("Please fill all details");
      return;
    }

    if (selectedTests.length === 0) {
      alert("Please select at least one test");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://pakhi-city-hospital.onrender.com/api/tests/create-order",
        { tests: selectedTests }
      );

      openRazorpay(res.data.order);

    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  const openRazorpay = (order) => {

    const options = {
      key: "rzp_test_SJc8MDd9VpJqMh",
      amount: order.amount,
      currency: "INR",
      order_id: order.id,
      name: "Pakhi Hospital",
      description: "Diagnostic Test Booking",

      handler: async function (response) {

        try {
          const verifyRes = await axios.post(
            "https://pakhi-city-hospital.onrender.com/api/tests/verify-payment",
            {
              ...response,
              formData,
              tests: selectedTests
            }
          );

          if (verifyRes.data.success) {
            setSuccess(true);
          }

        } catch (err) {
          alert(err.response?.data?.message || "Payment verification failed");
        }
      },

      prefill: {
        name: formData.name,
        contact: formData.phone
      },

      theme: { color: "#15803d" }
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function () {
      alert("Payment Failed. Please try again.");
    });

    rzp.open();
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center py-12 px-4">

      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <img src={logo} alt="logo" className="w-12" />
        <h1 className="text-2xl md:text-3xl font-bold text-green-900">
          Book Diagnostic Tests
        </h1>
      </div>

      {!success && (
        <div className="bg-white w-full max-w-xl p-8 rounded-3xl shadow-2xl">

          {/* Patient Info */}
          <input
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full mb-4 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 bg-gray-50"
          />

          <input
            placeholder="Mobile Number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full mb-6 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 bg-gray-50"
          />

          {/* Test Selection */}
          <h2 className="font-semibold text-lg mb-4 text-green-900">
            Select Tests
          </h2>

          <div className="space-y-3">
            {availableTests.map((test) => (
              <div
                key={test}
                onClick={() => toggleTest(test)}
                className={`p-4 border rounded-xl cursor-pointer transition ${
                  selectedTests.includes(test)
                    ? "bg-green-100 border-green-600"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between">
                  <span>{test}</span>
                  <span>₹150</span>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-6 text-xl font-bold text-green-900">
            Total: ₹{totalAmount}
          </div>

          {/* Pay Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-6 w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-full font-semibold transition disabled:opacity-60"
          >
            {loading ? "Processing..." : `Pay ₹${totalAmount}`}
          </button>

          <p className="text-xs text-gray-400 text-center mt-4">
            🔒 Secure Payment via Razorpay
          </p>

        </div>
      )}

      {/* Success Screen */}
      {success && (
        <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md">

          <div className="text-6xl mb-4">🎉</div>

          <h2 className="text-2xl font-bold text-green-900">
            Test Booking Confirmed
          </h2>

          <p className="mt-4 text-gray-600">
            Please visit hospital for sample collection.
          </p>

        </div>
      )}

    </section>
  );
}

export default BookTest;