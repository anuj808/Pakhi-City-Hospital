import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {

  const [appointments, setAppointments] = useState([]);
  const [tests, setTests] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Data (declared BEFORE useEffect)
  const fetchData = async () => {
    try {
      setLoading(true);

      const apptRes = await axios.get(
        "https://pakhi-city-hospital.onrender.com/api/admin/appointments"
      );

      const testRes = await axios.get(
        "https://pakhi-city-hospital.onrender.com/api/admin/tests"
      );

      const statsRes = await axios.get(
        "https://pakhi-city-hospital.onrender.com/api/admin/stats"
      );

      setAppointments(apptRes.data);
      setTests(testRes.data);
      setStats(statsRes.data);

    } catch (err) {
      console.error("Error fetching admin data:", err);
      alert("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Mark Appointment Completed
  const markCompleted = async (id) => {
    try {
      await axios.put(
        `https://pakhi-city-hospital.onrender.com/api/admin/complete/${id}`
      );

      fetchData(); // refresh list
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update appointment");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-green-800">
        Loading Admin Panel...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 p-6">

      <h1 className="text-3xl font-bold text-green-900 mb-8">
        🏥 Admin Dashboard
      </h1>

      {/* ================= Stats Section ================= */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500 text-sm">Total Patients</h2>
          <p className="text-2xl font-bold text-green-800">
            {stats.totalPatients || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500 text-sm">Total Visits</h2>
          <p className="text-2xl font-bold text-green-800">
            {stats.totalVisits || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500 text-sm">Total Tests</h2>
          <p className="text-2xl font-bold text-green-800">
            {stats.totalTests || 0}
          </p>
        </div>

      </div>

      {/* ================= Appointments Table ================= */}
      <div className="bg-white rounded-2xl shadow p-6 mb-10 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-green-900">
          Appointments
        </h2>

        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="text-left border-b bg-green-50">
              <th className="py-2">Name</th>
              <th>Phone</th>
              <th>Token</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((item) => (
              <tr key={item._id} className="border-b">

                <td className="py-2">
                  {item.patientId?.name || "N/A"}
                </td>

                <td>
                  {item.patientId?.phone || "N/A"}
                </td>

                <td>
                  {item.tokenNumber}
                </td>

                <td>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    item.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {item.status || "Pending"}
                  </span>
                </td>

                <td>
                  {item.status !== "Completed" && (
                    <button
                      onClick={() => markCompleted(item._id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                    >
                      Complete
                    </button>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* ================= Test Bookings ================= */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-green-900">
          Test Bookings
        </h2>

        {tests.length === 0 ? (
          <p className="text-gray-500">No test bookings yet.</p>
        ) : (
          <ul className="space-y-3">
            {tests.map((test) => (
              <li
                key={test._id}
                className="border p-4 rounded-lg flex justify-between"
              >
                <span>
                  {test.name} — {test.phone}
                </span>
                <span className="text-green-700 font-semibold">
                  ₹{test.amount || 150}
                </span>
              </li>
            ))}
          </ul>
        )}

      </div>

    </section>
  );
}

export default Admin;