import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaUserEdit, FaTrashAlt, FaUserCheck, FaUserTimes } from "react-icons/fa";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionInProgress, setActionInProgress] = useState(false); // Track ongoing actions

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Set loading to true while fetching
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
        setUsers(data);  // Set the state with fetched users
      } catch (error) {
        setStatus("Error fetching users.");
      } finally {
        setLoading(false);  // Stop loading after fetching is done
      }
    };

    fetchUsers();
  }, []);

  const handleStatusChange = async (userId, action) => {
    setActionInProgress(true); // Set action in progress state
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/users/${userId}/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }), // Action can be "deactivate" or "activate"
      });
  
      // Debugging: Check the API response
      const data = await response.json();
      console.log("API Response:", data);
  
      if (!response.ok) {
        throw new Error(data.message || "Error changing user status.");
      }
  
      // Update the users list after successful status change
      setUsers((prevUsers) => 
        prevUsers.map((user) => 
          user._id === userId ? { ...user, status: action === "activate" ? "active" : "inactive" } : user
        )
      );
  
      setStatus(`User ${action}d successfully.`);
    } catch (error) {
      console.error("Error:", error); // Debugging error
      setStatus("Error updating user status.");
    } finally {
      setActionInProgress(false); // Reset action in progress
    }
  };
  
  

  // Handle user deletion
  const handleDelete = async (userId) => {
    setActionInProgress(true); // Set action in progress state
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error deleting user.");
      }

      setUsers(users.filter((user) => user._id !== userId));  // Remove the deleted user from the state
      setStatus("User deleted successfully.");
    } catch (error) {
      setStatus("Error deleting user.");
    } finally {
      setActionInProgress(false); // Reset action in progress
    }
  };

  return (
    <div className=" min-h-screen p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-semibold mb-8">User Management</h1>

        {/* Conditionally render status message */}
        {status && (
          <p className={`text-lg ${status.includes("Error") ? "text-red-600" : "text-green-600"}`}>{status}</p>
        )}

        {loading ? (
          <div className="text-center text-lg font-semibold">Loading users...</div> // Loading indicator
        ) : users.length === 0 ? (
          <div className="text-center text-lg text-gray-600">No users found.</div> // No users message
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user._id} className="flex justify-between items-center p-4 bg-white shadow-md rounded-md">
                <div>
                  <h3 className="font-semibold text-gray-800">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>

                <div className="flex space-x-4">
                  <NavLink
                    to={`/edit/${user._id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaUserEdit className="text-xl" />
                  </NavLink>

                  {/* Status change button */}
                  <button
                    onClick={() => handleStatusChange(user._id, user.status === "active" ? "deactivate" : "activate")}
                    className={`py-2 px-4 rounded-md ${user.status === "active" ? "bg-green-600 text-white" : " bg-red-600 text-white"} hover:bg-opacity-80 transition duration-300`}
                    disabled={actionInProgress} // Disable button during action
                  >
                    {user.status === "active" ? <FaUserCheck className="text-xl" /> : <FaUserTimes className="text-xl" />}
                  </button>

                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-opacity-80 transition duration-300"
                    disabled={actionInProgress} // Disable button during action
                  >
                    <FaTrashAlt className="text-xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
