import { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";

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

    try {

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

    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  const openRazorpay = () => {

    const options = {
      key: "rzp_test_SJc8MDd9VpJqMh",
      amount: orderData.amount,
      currency: "INR",
      order_id: orderData.id,
      name: "Pakhi City Hospital",
      description: "Registration Fee ₹305",

      handler: async function (response) {

        try {

          const verifyRes = await axios.post(
            "https://pakhi-city-hospital.onrender.com/api/payment/verify-payment",
            { ...response, formData }
          );

          if (verifyRes.data.success) {

            const tokenNumber = verifyRes.data.tokenNumber;
            const paymentId = verifyRes.data.paymentId;

            setToken(tokenNumber);
            setShowPayment(false);

            // ✅ Open receipt in new tab
            const receiptUrl =
              `https://pakhi-city-hospital.onrender.com/api/payment/receipt/` +
              `${paymentId}/` +
              `${tokenNumber}/` +
              `${formData.name}/` +
              `${formData.phone}`;

            window.open(receiptUrl, "_blank");
          }

        } catch (err) {
          console.log(err);
          alert("Verification failed");
        }
      },

      theme: { color: "#15803d" }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center px-4 py-12">

      <div className="flex items-center gap-3 mb-10">
        <img src={logo} alt="Hospital Logo" className="w-14 h-14" />
        <div>
          <h1 className="text-2xl font-bold text-green-900">
            Pakhi City Hospital
          </h1>
          <p className="text-sm text-gray-500">
            Trusted Healthcare Services
          </p>
        </div>
      </div>

      <div className="bg-white w-full max-w-lg p-10 rounded-3xl shadow-2xl">

        <h2 className="text-2xl font-bold text-green-900 text-center">
          Book Appointment
        </h2>

        <p className="text-center text-gray-500 text-sm mt-2">
          Date: {today}
        </p>

        {!token && (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            <input name="name" placeholder="Full Name"
              value={formData.name} onChange={handleChange}
              required className="w-full px-4 py-3 rounded-xl border bg-gray-50"
            />

            <input name="address" placeholder="Address"
              value={formData.address} onChange={handleChange}
              required className="w-full px-4 py-3 rounded-xl border bg-gray-50"
            />

            <input type="number" name="age" placeholder="Age"
              value={formData.age} onChange={handleChange}
              required className="w-full px-4 py-3 rounded-xl border bg-gray-50"
            />

            <input name="phone" placeholder="Mobile Number"
              value={formData.phone} onChange={handleChange}
              required className="w-full px-4 py-3 rounded-xl border bg-gray-50"
            />

            <button type="submit"
              disabled={loading}
              className="w-full bg-green-700 text-white py-3 rounded-full"
            >
              {loading ? "Processing..." : "Continue"}
            </button>
          </form>
        )}

        {token && (
          <div className="mt-10 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-green-900">
              Appointment Confirmed
            </h2>
            <p className="mt-4 text-gray-600">
              Your token number is:
            </p>
            <div className="mt-6 bg-green-100 p-6 rounded-2xl">
              <h3 className="text-4xl font-bold text-green-900">
                {token}
              </h3>
              <p className="text-sm mt-2">
                Please visit hospital after 9:00 AM
              </p>
            </div>
          </div>
        )}

      </div>

      {showPayment && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-full max-w-sm p-8 rounded-3xl text-center">
            <h2 className="text-xl font-semibold text-green-900">
              Complete Payment
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Registration Fee: ₹305
            </p>
            <button
              onClick={openRazorpay}
              className="mt-6 w-full bg-green-700 text-white py-3 rounded-full"
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