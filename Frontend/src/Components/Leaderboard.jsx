import { useState, useEffect } from "react";

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching users.");
        }

        const data = await response.json();

        const usersWithScores = data
          .map((user) => ({
            ...user,
            score: Math.floor(Math.random() * 10), // Random score between 0 and 9
          }))
          .sort((a, b) => b.score - a.score);

        setUsers(usersWithScores);
      } catch (error) {
        setStatus("Error fetching users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Leaderboard</h1>
      {loading && <p className="text-gray-500 text-center">Loading...</p>}
      {status && <p className="text-red-500 text-center">{status}</p>}
      {!loading && users.length > 0 && (
        <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-300 px-6 py-3 text-left font-medium text-gray-700">Name</th>
              <th className="border border-gray-300 px-6 py-3 text-left font-medium text-gray-700">Jobs Applied</th>
              <th className="border border-gray-300 px-6 py-3 text-left font-medium text-gray-700">Badge</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-6 py-3">{user.name}</td>
                <td className="border border-gray-300 px-6 py-3">{user.score}</td>
                <td className="border border-gray-300 px-6 py-3">
                  {user.score > 5 ? (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Top Performer
                    </span>
                  ) : (
                    <span className="bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm">
                      Participant
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && users.length === 0 && (
        <p className="text-gray-500 text-center">No users available.</p>
      )}
    </div>
  );
}

export default Leaderboard;
