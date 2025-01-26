import { useState, useEffect } from "react";

const Analytics = () => {
  const [activityLogs, setActivityLogs] = useState([]);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch platform activity logs
  useEffect(() => {
    const fetchActivityLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/activity", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching activity logs.");
        }

        const data = await response.json();
        setActivityLogs(data);
      } catch (error) {
        setStatus("Error fetching activity logs.");
      } finally {
        setLoading(false); // Stop loading after fetching is done
      }
    };

    fetchActivityLogs();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-semibold mb-8">Platform Activity Logs</h1>

        {loading ? (
          <div className="text-center text-lg font-semibold">Loading activity logs...</div>
        ) : status ? (
          <div className="text-center text-red-600">{status}</div>
        ) : activityLogs.length === 0 ? (
          <div className="text-center text-gray-600">No activity logs available.</div>
        ) : (
          <div className="space-y-4">
            {activityLogs.map((log, index) => (
              <div key={index} className="bg-white p-4 shadow-md rounded-md">
                <h3 className="font-semibold text-gray-800">{log.action}</h3>
                <p className="text-gray-600">User: {log.userId.name} ({log.userId.email})</p>
                <p className="text-sm text-gray-500">Time: {new Date(log.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
